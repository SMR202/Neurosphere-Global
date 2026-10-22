"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { libraryDomains, type LibraryDomain } from "@/content/reconciled";
import { localHref, type Locale } from "@/lib/locale";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ResearchLibrary({
  locale,
  initialDomain = "all",
}: {
  locale: Locale;
  initialDomain?: string;
}) {
  const [selected, setSelected] = useState(
    libraryDomains.some((d) => d.slug === initialDomain)
      ? initialDomain
      : "all",
  );
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const visible = libraryDomains
    .filter((d) => selected === "all" || selected === d.slug)
    .flatMap((domain) => {
      if (
        !term ||
        `${domain.title} ${domain.description}`.toLowerCase().includes(term)
      )
        return [domain];
      const result: LibraryDomain = {
        ...domain,
        resources: domain.resources.filter((r) =>
          `${r.title} ${r.type} ${r.parent ?? ""}`.toLowerCase().includes(term),
        ),
        guidance: domain.guidance.filter((t) => t.toLowerCase().includes(term)),
        journals: domain.journals.filter((t) => t.toLowerCase().includes(term)),
        reading: domain.reading.filter((r) =>
          r.title.toLowerCase().includes(term),
        ),
      };
      return result.resources.length +
        result.guidance.length +
        result.journals.length +
        result.reading.length
        ? [result]
        : [];
    });
  return (
    <div className="container research-library">
      <div className="research-search">
        <label htmlFor="research-search">
          <span className="sr-only">Search research resources</span>
          <Search aria-hidden="true" />
        </label>
        <Input
          id="research-search"
          type="search"
          placeholder="Search tools, methods, journals or topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query ? (
          <Button variant="ghost" onClick={() => setQuery("")}>
            Clear
          </Button>
        ) : null}
      </div>
      <div className="research-library-layout">
        <aside className="research-domains">
          <fieldset>
            <legend>Research domains</legend>
            {[{ slug: "all", title: "All domains" }, ...libraryDomains].map(
              (domain) => (
                <label
                  key={domain.slug}
                  data-selected={selected === domain.slug}
                >
                  <input
                    type="radio"
                    name="research-domain"
                    value={domain.slug}
                    checked={selected === domain.slug}
                    onChange={() => setSelected(domain.slug)}
                  />
                  <span>{domain.title}</span>
                </label>
              ),
            )}
          </fieldset>
          <p>Find a starting point for your next research question.</p>
          <Link className="text-link" href={localHref("/datasets", locale)}>
            Explore datasets <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
        <div className="research-library-results">
          <p className="result-count" role="status" aria-live="polite">
            {visible.length} {visible.length === 1 ? "domain" : "domains"}
            {query ? ` matching “${query}”` : ""}
          </p>
          {visible.map((domain) => (
            <section
              className="research-domain"
              key={domain.slug}
              id={domain.slug}
              aria-labelledby={`${domain.slug}-title`}
            >
              <h2 id={`${domain.slug}-title`}>{domain.title}</h2>
              <p className="domain-description">{domain.description}</p>
              {(
                ["Tool", "Database", "Framework", "Trial registry"] as const
              ).map((type) => {
                const items = domain.resources.filter((r) => r.type === type);
                return items.length ? (
                  <div className="research-resource-group" key={type}>
                    <h3>
                      {
                        {
                          Tool: "Tools",
                          Database: "Databases & repositories",
                          Framework: "Frameworks & standards",
                          "Trial registry": "Trial registries",
                        }[type]
                      }
                    </h3>
                    <ul>
                      {items.map((resource) => (
                        <li key={resource.title}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              {resource.parent ? (
                                <small>{resource.parent} / </small>
                              ) : null}
                              {resource.title}
                            </span>
                            <span className="resource-host">
                              {new URL(resource.url).hostname.replace(
                                /^www\./,
                                "",
                              )}
                            </span>
                            <ArrowUpRight aria-hidden="true" />
                            <span className="sr-only">
                              {" "}
                              (opens in a new tab)
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null;
              })}
              {domain.guidance.length ? (
                <div className="research-resource-group guidance-topics">
                  <h3>
                    {domain.slug === "general-research"
                      ? "Research questions"
                      : "Guidance topics"}
                  </h3>
                  <p>
                    Discuss a topic with the team. These links prepare an
                    enquiry; they are not clinical protocols.
                  </p>
                  <ul>
                    {domain.guidance.map((topic) => (
                      <li key={topic}>
                        <Link
                          href={localHref(
                            `/contact?topic=Research%20guidance&message=${encodeURIComponent(`I would like guidance on ${topic} (${domain.title}).`)}`,
                            locale,
                          )}
                        >
                          <span>{topic}</span>
                          <ArrowRight aria-hidden="true" />
                          <span className="sr-only"> — prepare an enquiry</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {domain.journals.length ? (
                <div className="journal-reading">
                  <h3>Key journals</h3>
                  <p>{domain.journals.join(" · ")}</p>
                </div>
              ) : null}
              {domain.reading.length ? (
                <div className="research-resource-group">
                  <h3>Funding resources</h3>
                  <p>
                    Explore official programmes and eligibility. Listing a
                    resource does not imply funding or affiliation.
                  </p>
                  <ul>
                    {domain.reading.map((r) => (
                      <li key={r.title}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{r.title}</span>
                          <ArrowUpRight aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ))}
          {!visible.length ? (
            <div className="research-empty">
              <h2>No matching resources</h2>
              <p>Try another term or search across all six domains.</p>
              <Button
                onClick={() => {
                  setQuery("");
                  setSelected("all");
                }}
              >
                Reset search
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
