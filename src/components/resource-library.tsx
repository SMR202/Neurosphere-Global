"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { domains } from "@/data/resources";
import { filterDomains } from "@/lib/discovery";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./ui/empty";
import { ExternalResource } from "./editorial";
export function ResourceLibrary({ initialDomain }: { initialDomain: string }) {
  const router = useRouter();
  const raw = initialDomain;
  const selected = domains.some((d) => d.slug === raw) ? raw : "all";
  const [query, setQuery] = useState("");
  const filtered = filterDomains(domains, selected, query);
  function select(value: string) {
    router.replace(
      value === "all" ? "/research" : `/research?domain=${value}`,
      { scroll: false },
    );
  }
  return (
    <div className="container library">
      <div className="search-row">
        <label className="search-field">
          <span className="sr-only">Search resources</span>
          <Search aria-hidden="true" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources"
          />
        </label>
        {query ? (
          <Button variant="ghost" onClick={() => setQuery("")}>
            Clear search
          </Button>
        ) : null}
      </div>
      <div className="library-layout">
        <aside className="domain-sidebar">
          <fieldset>
            <legend>Research domains</legend>
            {[{ slug: "all", title: "All domains" }, ...domains].map(
              (domain) => (
                <label className="domain-choice" key={domain.slug}>
                  <input
                    type="radio"
                    name="domain"
                    checked={selected === domain.slug}
                    onChange={() => select(domain.slug)}
                  />
                  <span>{domain.title}</span>
                </label>
              ),
            )}
          </fieldset>
          <p>Choose a domain or search by tool, framework, or topic.</p>
        </aside>
        <div className="mobile-domain-select">
          <label htmlFor="domain-select">Research domain</label>
          <select
            id="domain-select"
            value={selected}
            onChange={(e) => select(e.target.value)}
          >
            <option value="all">All domains</option>
            {domains.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.title}
              </option>
            ))}
          </select>
        </div>
        <div className="library-content">
          <p className="results-announcement" role="status">
            {filtered.length} {filtered.length === 1 ? "domain" : "domains"}
            {query ? ` matching “${query}”` : ""}
          </p>
          {filtered.length ? (
            filtered.map((domain) => (
              <section
                className="resource-domain"
                key={domain.slug}
                id={domain.slug}
              >
                <h2>{domain.title}</h2>
                <p>{domain.description}</p>
                {(
                  ["Tool", "Database", "Framework", "Trial registry"] as const
                ).map((type) => {
                  const items = domain.resources.filter((r) => r.type === type);
                  return items.length ? (
                    <div className="resource-group" key={type}>
                      <h3>
                        {
                          {
                            Tool: "Tools",
                            Database: "Databases",
                            Framework: "Frameworks",
                            "Trial registry": "Trial registries",
                          }[type]
                        }
                      </h3>
                      <ul>
                        {items.map((resource) => (
                          <li key={resource.title}>
                            <ExternalResource href={resource.url}>
                              <span className="resource-name">
                                {resource.parent ? (
                                  <small>{resource.parent} / </small>
                                ) : null}
                                {resource.title}
                              </span>
                              <span className="resource-source">
                                {new URL(resource.url).hostname.replace(
                                  /^www\./,
                                  "",
                                )}
                              </span>
                            </ExternalResource>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null;
                })}
                {domain.guidance.length ? (
                  <div className="guidance-group">
                    <h3>
                      {domain.slug === "general-research"
                        ? "Early-career researcher FAQ topics"
                        : "Guidance topics"}
                    </h3>
                    <p className="guidance-note">
                      {domain.slug === "general-research"
                        ? "Detailed FAQ answers are forthcoming. You can prepare an enquiry about any topic below."
                        : "Guidance notes are forthcoming. Prepare an enquiry to discuss these topics with the team."}
                    </p>
                    <ul>
                      {domain.guidance.map((topic) => (
                        <li key={topic}>
                          <Link
                            href={`/contact?type=Research%20guidance&area=${domain.slug}&topic=${encodeURIComponent(topic)}`}
                          >
                            <span>{topic}</span>
                            <ArrowRight aria-hidden="true" />
                            <span className="sr-only">
                              {" "}
                              — prepare a research enquiry
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            ))
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No matching resources</EmptyTitle>
                <EmptyDescription>
                  Try a different term or search across all research domains.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  onClick={() => {
                    setQuery("");
                    select("all");
                  }}
                >
                  Reset search
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </div>
    </div>
  );
}
