"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import type { ProjectStatus } from "@/data/types";

const statuses: ("All projects" | ProjectStatus)[] = [
  "All projects",
  "Published",
  "Submitted",
  "Drafting",
  "Ongoing",
  "Manuscript in progress",
];
export function PublicationList() {
  const [selected, setSelected] =
    useState<(typeof statuses)[number]>("All projects");
  const visible = projects.filter(
    (p) => selected === "All projects" || p.status === selected,
  );
  const featured = visible.filter((p) => p.summary);
  return (
    <div className="container publication-catalogue" id="publications">
      <fieldset className="publication-filters">
        <legend className="sr-only">Filter projects by status</legend>
        {statuses.map((status) => (
          <label key={status} data-selected={selected === status}>
            <input
              type="radio"
              name="project-status"
              value={status}
              checked={selected === status}
              onChange={() => setSelected(status)}
            />
            <span>{status}</span>
          </label>
        ))}
      </fieldset>
      <p role="status" aria-live="polite" className="result-count">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      {featured.length ? (
        <section className="research-featured" aria-label="Featured research">
          {featured.map((project) => (
            <article key={project.slug}>
              <span className="research-status">{project.status}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </article>
          ))}
        </section>
      ) : null}
      {(["Published", "Submitted", "Drafting"] as const).map((status) => {
        const records = visible.filter((p) => p.status === status);
        return records.length ? (
          <section
            className="research-publications"
            key={status}
            aria-labelledby={`publication-${status}`}
          >
            <div className="publication-section-title">
              <h2 id={`publication-${status}`}>
                {status === "Published"
                  ? "Published research"
                  : `${status} projects`}
              </h2>
              <span>{String(records.length).padStart(2, "0")}</span>
            </div>
            <ol>
              {records.map((project) => (
                <li key={project.slug}>
                  <h3>{project.title}</h3>
                  {project.doi ? (
                    <a
                      href={`https://doi.org/${project.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{project.doi}</span>
                      <ArrowUpRight aria-hidden="true" />
                      <span className="sr-only">
                        {" "}
                        — read paper (opens in a new tab)
                      </span>
                    </a>
                  ) : (
                    <span className="research-status">{project.status}</span>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ) : null;
      })}
    </div>
  );
}
