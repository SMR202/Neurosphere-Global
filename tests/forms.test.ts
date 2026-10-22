import test from "node:test";
import assert from "node:assert/strict";
import { formDefinitions, type FormKind } from "../src/content/forms";
import { draftText, submissionSchema } from "../src/lib/submission";
import { handleSubmission } from "../src/lib/submission-delivery";
const valid = (form: FormKind) => ({
  form,
  website: "",
  values: Object.fromEntries(
    formDefinitions[form].fields.map((field) => [
      field.name,
      field.type === "email"
        ? "qa@example.org"
        : field.type === "checkbox"
          ? "yes"
          : field.type === "checkboxes"
            ? [field.options![0]]
            : field.type === "select"
              ? field.options![0]
              : "Local QA test",
    ]),
  ),
});

test("all six forms validate their supplied fields and explicitly unsent drafts", () => {
  for (const form of Object.keys(formDefinitions) as FormKind[]) {
    const data = valid(form);
    assert.ok(submissionSchema.safeParse(data).success, form);
    assert.ok(draftText(form, data.values).includes("DRAFT — NOT SENT"));
    assert.equal(
      submissionSchema.safeParse({
        ...data,
        values: { ...data.values, consent: "" },
      }).success,
      false,
      form + " requires consent",
    );
    assert.equal(
      submissionSchema.safeParse({
        ...data,
        values: { ...data.values, email: "bad-email" },
      }).success,
      false,
    );
  }
});
test("forms reject unapproved options, excess fields, missing checkbox selections and honeypots", () => {
  const data = valid("waitlist");
  for (const values of [
    { ...data.values, interests: [] },
    { ...data.values, role: "invented" },
    { ...data.values, extra: "not approved" },
    { ...data.values, city: "a".repeat(121) },
  ])
    assert.equal(
      submissionSchema.safeParse({ ...data, values }).success,
      false,
    );
  assert.equal(
    submissionSchema.safeParse({ ...data, website: "spam" }).success,
    false,
  );
});
test("delivery distinguishes unavailable, accepted, rejected and network failure without false success", async () => {
  const oldUrl = process.env.CONTACT_WEBHOOK_URL,
    oldToken = process.env.CONTACT_WEBHOOK_TOKEN;
  const request = (origin = "http://localhost:3000") =>
    new Request("http://localhost:3000/api/forms", {
      method: "POST",
      headers: { origin, "content-type": "application/json" },
      body: JSON.stringify(valid("waitlist")),
    });
  try {
    delete process.env.CONTACT_WEBHOOK_URL;
    delete process.env.CONTACT_WEBHOOK_TOKEN;
    assert.equal(
      (await handleSubmission(request("https://foreign.example"))).status,
      403,
    );
    assert.equal((await handleSubmission(request())).status, 503);
    process.env.CONTACT_WEBHOOK_URL = "https://delivery.example.test/forms";
    process.env.CONTACT_WEBHOOK_TOKEN = "test-token";
    let body = "";
    const response = await handleSubmission(request(), async (_url, init) => {
      body = String(init?.body);
      return new Response(null, { status: 202 });
    });
    assert.equal(response.status, 200);
    assert.ok((await response.json()).message.includes("You are on the list"));
    assert.ok(!body.includes("website"));
    assert.equal(
      (
        await handleSubmission(
          request(),
          async () => new Response(null, { status: 500 }),
        )
      ).status,
      502,
    );
    assert.equal(
      (
        await handleSubmission(request(), async () => {
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
