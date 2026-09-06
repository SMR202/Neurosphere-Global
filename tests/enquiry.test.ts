import test from "node:test";
import assert from "node:assert/strict";
import { enquirySchema, enquiryDraft } from "../src/lib/enquiry";
import { allowEnquiry, handleEnquiry } from "../src/lib/enquiry-delivery";
const valid = {
  name: "Test Researcher",
  email: "researcher@example.org",
  type: "Research guidance",
  area: "neuroimaging",
  institution: "",
  message: "A local test of the research enquiry workflow.",
  website: "",
};
const request = (body: unknown, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/enquiry", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });

test("server rejects unsupported format and oversized request bodies", async () => {
  const base = "http://localhost:3000/api/enquiry";
  const origin = "http://localhost:3000";
  const unsupported = new Request(base, {
    method: "POST",
    headers: { origin },
    body: "plain text",
  });
  assert.equal((await handleEnquiry(unsupported)).status, 415);
  const declared = new Request(base, {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
      "content-length": "24001",
    },
    body: "{}",
  });
  assert.equal((await handleEnquiry(declared)).status, 413);
  const previous = process.env.TRUST_PROXY;
  try {
    process.env.TRUST_PROXY = "true";
    const streamed = new Request(base, {
      method: "POST",
      headers: {
        origin,
        "content-type": "application/json",
        "x-forwarded-for": "body-limit-test",
      },
      body: JSON.stringify({ message: "a".repeat(25000) }),
    });
    assert.equal((await handleEnquiry(streamed)).status, 413);
  } finally {
    if (previous === undefined) delete process.env.TRUST_PROXY;
    else process.env.TRUST_PROXY = previous;
  }
});
test("validation rejects bad email, unapproved domain, oversized message and honeypot", () => {
  for (const patch of [
    { email: "bad" },
    { area: "invented" },
    { message: "short" },
    { message: "a".repeat(5001) },
    { website: "spam" },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
  assert.ok(
    enquiryDraft(enquirySchema.parse(valid)).includes("DRAFT — NOT SENT"),
  );
});
test("rate limits stop the sixth request and expire", () => {
  for (let i = 0; i < 5; i++) assert.ok(allowEnquiry("test-limit", 100));
  assert.equal(allowEnquiry("test-limit", 100), false);
  assert.ok(allowEnquiry("test-limit", 100 + 900001));
});
test("server enforces origin, validation, missing delivery, success and provider failure", async () => {
  const oldUrl = process.env.CONTACT_WEBHOOK_URL,
    oldToken = process.env.CONTACT_WEBHOOK_TOKEN;
  try {
    delete process.env.CONTACT_WEBHOOK_URL;
    delete process.env.CONTACT_WEBHOOK_TOKEN;
    assert.equal(
      (await handleEnquiry(request(valid, "https://foreign.example"))).status,
      403,
    );
    assert.equal(
      (await handleEnquiry(request({ ...valid, email: "bad" }))).status,
      422,
    );
    assert.equal((await handleEnquiry(request(valid))).status, 503);
    process.env.CONTACT_WEBHOOK_URL = "https://delivery.example.test/enquiry";
    process.env.CONTACT_WEBHOOK_TOKEN = "local-test-token";
    let captured = "";
    const success = await handleEnquiry(
      request(valid),
      async (_input, init) => {
        captured = String(init?.body);
        return new Response(null, { status: 202 });
      },
    );
    assert.equal(success.status, 200);
    assert.ok(captured.includes(valid.message));
    assert.ok(!captured.includes("website"));
    assert.equal(
      (
        await handleEnquiry(
          request(valid),
          async () => new Response(null, { status: 500 }),
        )
      ).status,
      502,
    );
    assert.equal(
      (
        await handleEnquiry(request(valid), async () => {
          throw new Error("network");
        })
      ).status,
      502,
    );
  } finally {
    if (oldUrl === undefined) delete process.env.CONTACT_WEBHOOK_URL;
    else process.env.CONTACT_WEBHOOK_URL = oldUrl;
    if (oldToken === undefined) delete process.env.CONTACT_WEBHOOK_TOKEN;
    else process.env.CONTACT_WEBHOOK_TOKEN = oldToken;
  }
});
