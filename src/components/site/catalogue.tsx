"use client";
import { useDeferredValue, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import type { Course } from "@/content/client";
import type { Locale } from "@/lib/locale";
import { EditorialCards } from "./primitives";
export function Catalogue({
  courses,
  locale,
}: {
  courses: Course[];
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [status, setStatus] = useState("All courses");
  const visible = courses.filter(
    (c) =>
      (status === "All courses" || c.status === status) &&
      `${c.title} ${c.audience} ${c.description}`
        .toLocaleLowerCase()
        .includes(deferred.trim().toLocaleLowerCase()),
  );
  return (
    <section className="container section catalogue" id="catalogue">
      <div className="catalogue-heading">
        <h2>Catalogue</h2>
        <div className="catalogue-controls">
          <label className="search-field">
            <span className="sr-only">Search courses</span>
            <Search aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search courses, topics or audiences…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <ToggleGroup
            type="single"
            value={status}
            onValueChange={(value) => value && setStatus(value)}
            aria-label="Filter courses by status"
            className="course-filters"
          >
            {["All courses", "Opening soon", "In planning"].map((label) => (
              <ToggleGroupItem key={label} value={label}>
                {label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <p className="results-announcement" role="status">
        {visible.length} {visible.length === 1 ? "course" : "courses"}
        {query ? ` matching “${query}”` : ""}
      </p>
      {visible.length ? (
        <EditorialCards
          items={visible.map((c) => ({
            title: c.title,
            description: c.audience,
            status: c.status,
            href: `/learn/${c.slug}`,
          }))}
          locale={locale}
        />
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No matching courses</EmptyTitle>
            <EmptyDescription>
              Try a different term or view all courses.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => {
                setQuery("");
                setStatus("All courses");
              }}
            >
              Reset search
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </section>
  );
}
