import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import paragraphs from "../content/source/neurozehn/aligned.json";
import { courses, programmes, partnerTypes } from "../src/content/client";
import { Home } from "../src/components/site/home";
import { Learn } from "../src/components/site/learn";
import { CourseDetail } from "../src/components/site/detail-pages";
import { formDefinitions } from "../src/content/forms";
import { draftText, emailHref, submissionSchema } from "../src/lib/submission";

test("initial-phase learning pages and course forms publish no pricing or payment requests", () => {
  const pricing =
    /\bfees?\b|\bpayments?\b|\bPKR\b|\bscholarships?\b|2,000|5,000/i;
  for (const locale of ["en", "ur"] as const) {
    const learning = renderToStaticMarkup(createElement(Learn, { locale }));
    assert.ok(!pricing.test(learning), locale + " Learn page");
    assert.ok(learning.includes("Early 2027"));
    assert.ok(learning.includes("Certificate of completion"));
    for (const course of courses) {
      const html = renderToStaticMarkup(
        createElement(CourseDetail, {
          course,
          locale,
          deliveryEnabled: false,
        }),
      );
      assert.ok(!pricing.test(html), locale + " " + course.slug);
      assert.ok(html.includes(course.title));
      assert.ok(html.includes("Register interest") || html.includes("انتظار"));
    }
  }
  assert.ok(
    !formDefinitions.course.fields.some((field) => pricing.test(field.label)),
  );
  assert.ok(
    !partnerTypes.some((partner) =>
      pricing.test(partner.ask + " " + partner.offer),
    ),
  );
  // Retain the original supplied figures in the archive, without publishing them.
  assert.ok(paragraphs.some((paragraph) => paragraph.includes("PKR 2,000")));
});

test("homepage renders twelve separate, named programme destinations", () => {
  const html = renderToStaticMarkup(createElement(Home, { locale: "en" }));
  const links = [
    ...html.matchAll(
      /<a\b[^>]*href="(\/programmes\/[^\"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    ),
  ];
  assert.equal(links.length, 12);
  assert.ok(links.every((link) => /<h3>[^<]+<\/h3>/.test(link[2])));
  for (const programme of programmes) {
    const link = links.find(
      (link) => link[1] === `/programmes/${programme.slug}`,
    );
    assert.ok(link);
    assert.ok(link[2].includes(programme.title));
  }
});

test("imported client copy contains no broken UTF-8 punctuation", () => {
  for (const text of paragraphs)
    assert.ok(!/\u00c2[\u0080-\u00bf]|\ufffd/.test(text), text);
  assert.ok(
    !formDefinitions.contact.fields
      .find((f) => f.name === "consent")
      ?.label.includes("(link to"),
  );
});

test("course and updates interest can be expressed without professional background fields", () => {
  assert.ok(
    submissionSchema.safeParse({
      form: "course",
      values: {
        email: "reader@example.org",
        course: "Brain Health Essentials",
        consent: "yes",
      },
    }).success,
  );
  assert.ok(
    submissionSchema.safeParse({
      form: "waitlist",
      values: {
        email: "reader@example.org",
        interests: ["Courses"],
        consent: "yes",
      },
    }).success,
  );
  assert.equal(
    submissionSchema.safeParse({
      form: "course",
      values: {
        email: "reader@example.org",
        course: "Brain Health Essentials",
      },
    }).success,
    false,
  );
});

test("a brief request is short while a full partner enquiry retains its required fields", () => {
  const values = {
    name: "A reader",
    email: "reader@example.org",
    message: "Please send the partner brief.",
    consent: "yes",
  };
  assert.ok(
    submissionSchema.safeParse({ form: "partner", intent: "brief", values })
      .success,
  );
  assert.equal(
    submissionSchema.safeParse({ form: "partner", values }).success,
    false,
  );
  assert.equal(
    submissionSchema.safeParse({ form: "contact", intent: "brief", values })
      .success,
    false,
  );
});

test("email handoff preserves punctuation and never claims delivery", () => {
  const text = draftText("contact", {
    name: "A & B",
    email: "reader+test@example.org",
    topic: "General",
    message: "Research + education? Yes & more.",
    consent: "yes",
  });
  const link = new URL(emailHref("contact", text));
  assert.equal(link.pathname, "NeuroZehn@outlook.com");
  assert.ok(
    link.searchParams
      .get("body")
      ?.includes("Research + education? Yes & more."),
  );
  assert.ok(link.searchParams.get("body")?.includes("reader+test@example.org"));
  assert.ok(text.includes("DRAFT — NOT SENT"));
});
