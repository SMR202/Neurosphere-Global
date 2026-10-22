import test from "node:test";
import assert from "node:assert/strict";
import paragraphs from "../content/source/copy-paragraphs.json";
import {
  copy,
  courses,
  programmes,
  healthTopics,
  pageCopy,
  researchStudies,
  studentTracks,
  partnerTypes,
  methods,
  publicPaths,
  getPageInfo,
} from "../src/content/client";
import { localHref, routeLocale, urdu } from "../src/lib/locale";

test("every page-specific browser title and meta description matches the client DOCX", () => {
  for (const [path, info] of Object.entries(pageCopy)) {
    const index = paragraphs.findIndex(
      (line, i) => line === path && paragraphs[i - 1] === "Page URL",
    );
    assert.ok(index >= 0, `Missing source URL ${path}`);
    assert.equal(info.title, paragraphs[index + 2], path + " title");
    assert.equal(
      info.description,
      paragraphs[index + 4],
      path + " description",
    );
  }
});
test("approved catalogues retain exact titles, descriptions, statuses and complete counts", () => {
  assert.equal(courses.length, 11);
  assert.equal(courses.filter((c) => c.status === "Opening soon").length, 5);
  assert.equal(programmes.length, 12);
  assert.equal(researchStudies.length, 8);
  assert.equal(healthTopics.length, 10);
  assert.equal(studentTracks.length, 9);
  assert.equal(partnerTypes.length, 7);
  assert.equal(methods.length, 6);
  for (const item of [
    ...courses,
    ...programmes,
    ...researchStudies,
    ...healthTopics,
  ]) {
    assert.ok(paragraphs.includes(item.title), item.title);
    assert.ok(
      paragraphs.includes(item.description),
      item.title + " description",
    );
    assert.ok(
      ["Open now", "Opening soon", "In planning"].includes(item.status),
    );
  }
  assert.deepEqual(healthTopics[0].bullets, [
    copy(311),
    copy(312),
    copy(313),
    copy(314),
  ]);
  assert.equal(
    courses.find((c) => c.slug === "research-methods-and-ethics")?.outcomes
      .length,
    5,
  );
});
test("all approved routes have metadata, unique addresses and usable locale variants", () => {
  assert.equal(new Set(publicPaths).size, publicPaths.length);
  for (const path of publicPaths) {
    assert.ok(getPageInfo(path), path);
    assert.equal(routeLocale(localHref(path, "ur")).path, path);
  }
  assert.equal(localHref("/learn#catalogue", "ur"), "/ur/learn#catalogue");
  assert.equal(localHref("#interest", "ur"), "#interest");
  assert.equal(routeLocale("/urgent").locale, "en");
  assert.equal(urdu["Learn"], "سیکھیں");
});
test("missing scientific and operational details stay explicit and unapproved", () => {
  assert.ok(copy(33).includes("[Emergency and crisis numbers for Pakistan]"));
  assert.ok(copy(317).includes("[reviewer name and role]"));
  assert.ok(courses[0].format?.includes("[fee]"));
  assert.ok(copy(31).includes("[Registered name and number, once registered]"));
});
