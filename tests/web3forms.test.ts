import test from "node:test";
import assert from "node:assert/strict";
import { formDefinitions, type FormKind } from "../src/content/forms";
import { submissionSchema, type Submission } from "../src/lib/submission";
import { formDeliveryConfiguration } from "../src/lib/form-delivery";
import { handleSubmission } from "../src/lib/submission-delivery";
import { submitInterest, FormSubmissionError } from "../src/lib/form-client";
import { hasSameOrigin } from "../src/lib/request-origin";
import {
  WEB3FORMS_ENDPOINT,
  web3FormsPayload,
  emailSubmissionConfirmation,
} from "../src/lib/web3forms";

// Synthetic public form alias for mocks only. Never sent to the real provider.
const accessKey = "674c0bb2-8e0b-4ea1-84d8-b0820e9cfc97";

test("origin validation uses the incoming host while rejecting foreign or forged origins", () => {
  const request = (origin: string, host = "127.0.0.1:3002") =>
    new Request("http://localhost:3002/api/forms", {
      headers: { origin, host, "x-forwarded-host": "foreign.example" },
    });
  assert.ok(hasSameOrigin(request("http://127.0.0.1:3002")));
  assert.equal(hasSameOrigin(request("http://localhost:3002")), false);
  assert.equal(hasSameOrigin(request("https://127.0.0.1:3002")), false);
  assert.equal(hasSameOrigin(request("http://foreign.example")), false);
  assert.equal(hasSameOrigin(request("null")), false);
  assert.equal(hasSameOrigin(request("http://127.0.0.1:3002/path")), false);
  assert.equal(
    hasSameOrigin(new Request("http://localhost:3002/api/forms")),
    false,
  );
});
const envNames = [
  "WEB3FORMS_ACCESS_KEY",
  "CONTACT_WEBHOOK_URL",
  "CONTACT_WEBHOOK_TOKEN",
  "TRUST_PROXY",
  "VERCEL",
] as const;
function preserveEnvironment() {
  const previous = envNames.map((name) => [name, process.env[name]] as const);
  return () => {
    for (const [name, value] of previous)
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
  };
}
function valid(form: FormKind): Submission {
  return submissionSchema.parse({
    form,
    values: Object.fromEntries(
      formDefinitions[form].fields.map((field) => [
        field.name,
        field.type === "email"
          ? "qa+forms@example.org"
          : field.type === "checkbox"
            ? "yes"
            : field.type === "checkboxes"
              ? [field.options![0]]
              : field.type === "select"
                ? field.options![0]
                : "A & B — local QA",
      ]),
    ),
  });
}
function request(data: unknown, ip: string, origin = "https://site.example") {
  return new Request("https://site.example/api/forms", {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(data),
  });
}
function handoff(data = valid("contact")) {
  return {
    delivery: {
      provider: "web3forms",
      payload: web3FormsPayload(data, accessKey),
    },
    confirmation: emailSubmissionConfirmation(data.form, data.intent),
  };
}

test("form delivery requires a valid form key or an authenticated HTTPS webhook", () => {
  const restore = preserveEnvironment();
  try {
    for (const name of envNames) delete process.env[name];
    assert.equal(formDeliveryConfiguration(), null);
    process.env.WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY";
    assert.equal(formDeliveryConfiguration(), null);
    process.env.CONTACT_WEBHOOK_URL = "https://receiver.example/forms";
    process.env.CONTACT_WEBHOOK_TOKEN = "private-webhook-token";
    assert.equal(formDeliveryConfiguration()?.provider, "webhook");
    process.env.WEB3FORMS_ACCESS_KEY = ` ${accessKey} `;
    assert.deepEqual(formDeliveryConfiguration(), {
      provider: "web3forms",
      accessKey,
    });
  } finally {
    restore();
  }
});

test("all six form emails retain approved fields, consent, reply-to and punctuation", () => {
  for (const form of Object.keys(formDefinitions) as FormKind[]) {
    const data = valid(form);
    const payload = web3FormsPayload(data, accessKey);
    assert.equal(payload.email, "qa+forms@example.org");
    assert.equal(payload.from_name, "NeuroZehn website");
    assert.equal(payload.subject, `NeuroZehn — ${formDefinitions[form].title}`);
    assert.ok(payload.message.includes("Consent\nYes — "));
    for (const field of formDefinitions[form].fields)
      assert.ok(
        payload.message.includes(field.label),
        `${form}: ${field.name}`,
      );
    assert.equal(payload.botcheck, false);
    assert.ok(!("website" in payload));
    assert.ok(!payload.message.includes("DRAFT — NOT SENT"));
  }
  const minimal = submissionSchema.parse({
    form: "waitlist",
    values: {
      email: "qa@example.org",
      interests: ["Courses", "Partnerships"],
      consent: "yes",
    },
  });
  const payload = web3FormsPayload(minimal, accessKey);
  assert.equal(payload.name, undefined);
  assert.ok(payload.message.includes("Courses, Partnerships"));
  assert.ok(!payload.message.includes("Not provided"));
  assert.ok(
    !emailSubmissionConfirmation("waitlist").includes("You are on the list"),
  );
});

test("brief requests have a distinct email subject and an accurate confirmation", () => {
  const data = submissionSchema.parse({
    form: "partner",
    intent: "brief",
    values: {
      name: "A reader",
      email: "qa@example.org",
      message: "Please send the partner brief.",
      consent: "yes",
    },
  });
  assert.equal(
    web3FormsPayload(data, accessKey).subject,
    "NeuroZehn — Request the partner brief",
  );
  assert.ok(
    emailSubmissionConfirmation("partner", "brief").includes(
      "request for the partner brief",
    ),
  );
});

test("the server prepares browser delivery after validation without sending or claiming success", async () => {
  const restore = preserveEnvironment();
  try {
    process.env.WEB3FORMS_ACCESS_KEY = accessKey;
    process.env.CONTACT_WEBHOOK_URL = "https://receiver.example/forms";
    process.env.CONTACT_WEBHOOK_TOKEN = "must-stay-private";
    process.env.VERCEL = "1";
    let serverFetches = 0;
    const noOutbound: typeof fetch = async () => {
      serverFetches++;
      throw new Error("The free plan must submit in the browser");
    };
    for (const form of Object.keys(formDefinitions) as FormKind[]) {
      const response = await handleSubmission(
        request(valid(form), `mock-${form}`),
        noOutbound,
      );
      assert.equal(response.status, 202);
      assert.equal(response.headers.get("cache-control"), "no-store");
      const body = await response.json();
      assert.equal(body.delivery.provider, "web3forms");
      assert.equal(body.message, undefined);
      assert.ok(!JSON.stringify(body).includes("must-stay-private"));
    }
    assert.equal(serverFetches, 0);
    const invalid = await handleSubmission(
      request({ ...valid("contact"), values: {} }, "mock-invalid"),
      noOutbound,
    );
    assert.equal(invalid.status, 422);
    assert.ok(!(await invalid.text()).includes(accessKey));
    assert.equal(
      (
        await handleSubmission(
          request(valid("contact"), "mock-origin", "https://foreign.example"),
          noOutbound,
        )
      ).status,
      403,
    );
    const spam = await handleSubmission(
      request({ ...valid("contact"), website: "bot" }, "mock-bot"),
      noOutbound,
    );
    assert.equal(spam.status, 422);
    assert.equal(serverFetches, 0);
  } finally {
    restore();
  }
});

test("the browser waits for explicit provider acceptance before returning confirmation", async () => {
  const data = valid("contact");
  const calls: string[] = [];
  let release!: () => void;
  const providerReady = new Promise<void>((resolve) => {
    release = resolve;
  });
  let providerStarted!: () => void;
  const started = new Promise<void>((resolve) => {
    providerStarted = resolve;
  });
  let settled = false;
  const completion = submitInterest(data, async (url, init) => {
    calls.push(String(url));
    if (url === "/api/forms")
      return Response.json(handoff(data), { status: 202 });
    assert.equal(url, WEB3FORMS_ENDPOINT);
    assert.equal(init?.credentials, "omit");
    assert.equal(init?.redirect, "error");
    const payload = JSON.parse(String(init?.body));
    assert.equal(payload.email, data.values.email);
    assert.equal(payload.access_key, accessKey);
    assert.equal(new Headers(init?.headers).get("authorization"), null);
    providerStarted();
    await providerReady;
    return Response.json({ success: true });
  }).then((message) => {
    settled = true;
    return message;
  });
  await started;
  assert.equal(settled, false);
  release();
  assert.equal(await completion, formDefinitions.contact.confirmation);
  assert.deepEqual(calls, ["/api/forms", WEB3FORMS_ENDPOINT]);
});

test("HTTP 200 alone, rejection, quota, malformed responses and network failure never become success", async () => {
  const data = valid("course");
  const before = JSON.stringify(data);
  const failures = [
    async () => Response.json({ success: false }, { status: 200 }),
    async () => Response.json({ success: "true" }, { status: 200 }),
    async () => Response.json({ message: "not accepted" }, { status: 200 }),
    async () => Response.json({ success: true }, { status: 400 }),
    async () => Response.json({ success: false }, { status: 429 }),
    async () => new Response("<html>Unavailable</html>", { status: 200 }),
    async () => new Response(null, { status: 503 }),
    async () => {
      throw new DOMException("Timed out", "TimeoutError");
    },
  ];
  for (const fail of failures) {
    let calls = 0;
    await assert.rejects(() =>
      submitInterest(data, async () => {
        calls++;
        return calls === 1
          ? Response.json(handoff(data), { status: 202 })
          : fail();
      }),
    );
    assert.equal(calls, 2, "no automatic resubmission");
    assert.equal(
      JSON.stringify(data),
      before,
      "entered details remain available",
    );
  }
});

test("validation errors stop before the provider and preserve field-specific recovery", async () => {
  let calls = 0;
  await assert.rejects(
    () =>
      submitInterest(valid("contact"), async () => {
        calls++;
        return Response.json(
          {
            error: "Please review your email.",
            fields: { email: "Invalid email" },
          },
          { status: 422 },
        );
      }),
    (error: unknown) =>
      error instanceof FormSubmissionError &&
      error.fields?.email === "Invalid email",
  );
  assert.equal(calls, 1);
  let requests = 0;
  const forged = handoff();
  await assert.rejects(() =>
    submitInterest(valid("contact"), async () => {
      requests++;
      return Response.json(
        {
          ...forged,
          delivery: {
            ...forged.delivery,
            payload: {
              ...forged.delivery.payload,
              webhook: "https://elsewhere.example",
            },
          },
        },
        { status: 202 },
      );
    }),
  );
  assert.equal(requests, 1, "unexpected provider controls are rejected");
});

test("the existing authenticated webhook response remains supported", async () => {
  let calls = 0;
  assert.equal(
    await submitInterest(valid("contact"), async () => {
      calls++;
      return Response.json({ message: "Your enquiry has been submitted." });
    }),
    "Your enquiry has been submitted.",
  );
  assert.equal(calls, 1);
});
