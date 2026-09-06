import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { projects } from "../src/data/projects";
import { domains } from "../src/data/resources";
import { team } from "../src/data/team";
import { mission, introduction } from "../src/data/site";
import { datasets } from "../src/data/datasets";
import { filterDomains } from "../src/lib/discovery";
const brief = readFileSync(
  "NEUROSPHERE_GLOBAL_PHASE1_MASTER_BUILD_BRIEF.md",
  "utf8",
);
test("every approved project heading is present with exact title and status", () => {
  const projectSection = brief
    .split("# 23. Published Projects")[1]
    .split("# 28. TEAM PAGE")[0];
  const approved = [...projectSection.matchAll(/^###? (.+)$/gm)]
    .map((m) => m[1].trim())
    .filter((title) => !title.startsWith("A ") || title.includes("Connectome"));
  assert.equal(approved.length, 15);
  for (const title of approved)
    assert.ok(
      projects.some((p) => p.title === title),
      `Missing: ${title}`,
    );
  assert.deepEqual(
    Object.fromEntries(
      [
        "Published",
        "Submitted",
        "Drafting",
        "Ongoing",
        "Manuscript in progress",
      ].map((s) => [s, projects.filter((p) => p.status === s).length]),
    ),
    {
      Published: 6,
      Submitted: 3,
      Drafting: 4,
      Ongoing: 1,
      "Manuscript in progress": 1,
    },
  );
  for (const project of projects) {
    const after = projectSection.split(project.title)[1];
    if (project.doi) assert.ok(after.split("###")[0].includes(project.doi));
    else assert.ok(after.split(/\n##? /)[0].includes(project.status));
  }
});
test("approved prose is preserved and unknown content remains unknown", () => {
  for (const text of [mission, ...introduction, team[0].bio!])
    assert.ok(brief.includes(text));
  assert.equal(datasets.length, 0);
  assert.equal(team[1].role, undefined);
  assert.equal(team[1].bio, undefined);
  assert.equal(domains.length, 6);
  assert.equal(domains.flatMap((d) => d.resources).length, 21);
  for (const d of domains) {
    assert.ok(brief.includes(d.description));
    for (const g of d.guidance) assert.ok(brief.includes(g));
  }
});
test("resource search finds specific tools, topics, empty results and respects selected domain", () => {
  assert.equal(filterDomains(domains, "all", "eeglab")[0].resources.length, 1);
  assert.equal(filterDomains(domains, "neuroimaging", "eeglab").length, 0);
  assert.equal(
    filterDomains(domains, "all", "BOLD")[0].guidance[0],
    "BOLD signal basics",
  );
  assert.equal(filterDomains(domains, "all", "nothing-matches").length, 0);
  assert.equal(filterDomains(domains, "all", "  ").length, 6);
});
