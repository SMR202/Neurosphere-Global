"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import type { ProjectStatus } from "@/data/types";
import { FeaturedProjects } from "./featured-projects";
import { ExternalResource } from "./editorial";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
const statuses: ("All projects" | ProjectStatus)[] = [
  "All projects",
  "Published",
  "Submitted",
  "Drafting",
  "Ongoing",
  "Manuscript in progress",
];
export function ProjectIndex() {
  const [selected, setSelected] = useState("All projects");
  const visible = projects.filter(
    (p) => selected === "All projects" || p.status === selected,
  );
  const featured = visible.filter((p) => p.summary);
  return (
    <div className="container project-index">
      <ToggleGroup
        type="single"
        value={selected}
        onValueChange={(v) => v && setSelected(v)}
        className="status-filters"
        aria-label="Filter projects by status"
      >
        {statuses.map((status) => (
          <ToggleGroupItem key={status} value={status}>
            {status}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p role="status" className="results-announcement">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      {featured.length ? (
        <div className="featured-surface">
          <h2 className="sr-only">Featured research</h2>
          <FeaturedProjects projects={featured} />
        </div>
      ) : null}
      {(["Published", "Submitted", "Drafting"] as const).map((status) => {
        const items = visible.filter((p) => p.status === status);
        return items.length ? (
          <section className="publication-section" key={status}>
            <div className="publication-heading">
              <h2>
                {status === "Published"
                  ? "Published research"
                  : `${status} projects`}
              </h2>
              <span>{String(items.length).padStart(2, "0")}</span>
            </div>
            <ul>
              {items.map((project) => (
                <li className="publication-row" key={project.slug}>
                  <h3>{project.title}</h3>
                  {project.doi ? (
                    <ExternalResource href={`https://doi.org/${project.doi}`}>
                      <span className="doi">
                        <span className="sr-only">DOI: </span>
                        {project.doi}
                      </span>
                    </ExternalResource>
                  ) : (
                    <span className="publication-status">{project.status}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null;
      })}
    </div>
  );
}
