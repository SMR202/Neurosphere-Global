import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  libraryDomains,
  researchAreas,
  externalDataSources,
  restoredPages,
} from "../src/content/reconciled";
import { domains } from "../src/data/resources";
import { projects } from "../src/data/projects";
import { team } from "../src/data/team";
import { publicPaths, getPageInfo, copy } from "../src/content/client";
import { editorialText } from "../src/lib/editorial";

test("the combined library retains all original resources and restores Google Doc additions", () => {
  const doc = readFileSync(
    "content/source/Neurosphere_Global_Google_Doc_2026-10-22.txt",
    "utf8",
  );
  for (const domain of domains) {
    const merged = libraryDomains.find((d) => d.slug === domain.slug)!;
    assert.ok(merged);
    for (const resource of domain.resources)
      assert.ok(
        merged.resources.some(
          (r) => r.title === resource.title && r.url === resource.url,
        ),
        resource.title,
      );
  }
  for (const name of [
    "BrainVision Analyzer",
    "DECIPHER",
    "ISRCTN registry",
    "OpenNeuro",
    "PhysioNet",
    "Zotero",
    "EndNote",
    "Mendeley",
  ]) {
    assert.ok(doc.includes(name), name);
    assert.ok(
      libraryDomains.some((d) => d.resources.some((r) => r.title === name)),
      name,
    );
  }
  for (const area of researchAreas)
    assert.ok(
      doc.includes(area.title) && doc.includes(area.description),
      area.title,
    );
  assert.equal(researchAreas.length, 8);
  assert.equal(projects.length, 15);
  assert.equal(projects.filter((p) => p.doi).length, 6);
  assert.equal(team.length, 2);
});

test("restored destinations have metadata and owned data is not invented", () => {
  for (const route of Object.keys(restoredPages)) {
    assert.ok(publicPaths.includes(route), route);
    assert.ok(getPageInfo(route)?.title, route);
  }
  assert.equal(externalDataSources.length, 3);
  assert.ok(
    externalDataSources.every(
      (d) =>
        new URL(d.url).protocol === "https:" &&
        new URL(d.source).protocol === "https:",
    ),
  );
  assert.equal(team[1].role, undefined);
  assert.equal(team[1].bio, undefined);
});

test("unanswered fields get honest presentation without altering approved source or implying review", () => {
  assert.ok(copy(96).includes("[hours]"));
  assert.ok(!editorialText(copy(96)).includes("["));
  assert.match(editorialText(copy(317)), /will be published when confirmed/);
  assert.ok(!editorialText(copy(31)).includes("Registered name"));
  assert.ok(!editorialText(copy(33)).includes("["));
});
