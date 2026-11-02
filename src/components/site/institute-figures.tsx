"use client";
import { useState } from "react";
import Link from "next/link";
import type { Status } from "@/content/client";
import { localHref, type Locale } from "@/lib/locale";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
  Activity,
  GraduationCap,
  ScanLine,
} from "lucide-react";
const steps = [
  {
    title: "Understand",
    icon: BookOpen,
    text: "Clear, reliable information about brain health, in plain language.",
    href: "/brain-health",
    action: "Explore Brain Health",
    status: "Guides and education",
  },
  {
    title: "Protect",
    icon: ShieldCheck,
    text: "Education about brain health, everyday risks and prevention.",
    href: "/brain-health",
    action: "Explore Brain Health",
    status: "Guides and education",
  },
  {
    title: "Treat",
    icon: HeartHandshake,
    text: "Care navigation is planned through approved, licensed partners.",
    href: "/about/roadmap",
    action: "See the full roadmap",
    status: "In planning",
  },
  {
    title: "Rebuild",
    icon: Activity,
    text: "Rehabilitation and family support connect different professions.",
    href: "/programmes/rehabilitation-and-allied-health",
    action: "Explore the programme",
    status: "Opening soon",
  },
  {
    title: "Learn",
    icon: GraduationCap,
    text: "Practical micro-credentials and supervised student tracks.",
    href: "/learn",
    action: "Explore Learn",
    status: "First intake: early 2027",
  },
  {
    title: "Discover",
    icon: ScanLine,
    text: "Locally relevant research, with ethics approval and partners.",
    href: "/research",
    action: "Explore research",
    status: "Existing work and future studies",
  },
];
export function JourneyFigure({ locale = "en" }: { locale?: Locale }) {
  const [selected, setSelected] = useState(0);
  return (
    <figure
      className="journey-figure"
      aria-label="Six connected steps in the brain-health journey"
    >
      <div
        className="journey-controls"
        role="group"
        aria-label="Explore the journey"
      >
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            aria-pressed={selected === i}
            aria-controls="journey-detail"
            onClick={() => setSelected(i)}
          >
            <span className="journey-node" aria-hidden="true">
              <step.icon aria-hidden="true" />
            </span>
            <span>{step.title}</span>
            <span className="journey-step" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <figcaption id="journey-detail" aria-live="polite">
        <div>
          <span className="journey-availability">{steps[selected].status}</span>
          <strong>{steps[selected].title}</strong>
        </div>
        <div>
          <p>{steps[selected].text}</p>
          <Link
            className="text-link"
            href={localHref(steps[selected].href, locale)}
          >
            {steps[selected].action}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </figcaption>
    </figure>
  );
}
export function ProgrammeFigure({
  locale,
  programmes,
}: {
  locale: Locale;
  programmes: {
    slug: string;
    title: string;
    description: string;
    status: Status;
  }[];
}) {
  const [status, setStatus] = useState("All programmes");
  const visible = programmes.filter(
    (p) => status === "All programmes" || p.status === status,
  );
  return (
    <section
      className="programme-atlas"
      aria-label="Explore twelve connected programmes"
    >
      <fieldset>
        <legend>Explore by availability</legend>
        {["All programmes", "Open now", "Opening soon", "In planning"].map(
          (s) => (
            <label key={s} data-selected={status === s}>
              <input
                type="radio"
                name="programme-status"
                checked={status === s}
                onChange={() => setStatus(s)}
              />
              <span>{s}</span>
              <small>
                {s === "All programmes"
                  ? 12
                  : programmes.filter((p) => p.status === s).length}
              </small>
            </label>
          ),
        )}
      </fieldset>
      <p role="status">
        {visible.length} {visible.length === 1 ? "programme" : "programmes"}
      </p>
      <div>
        {visible.map((p) => (
          <Link key={p.slug} href={localHref(`/programmes/${p.slug}`, locale)}>
            <span className="atlas-status" data-status={p.status}>
              {p.status}
            </span>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
