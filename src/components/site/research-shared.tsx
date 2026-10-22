import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { mission, introduction } from "@/data/site";
import { projects } from "@/data/projects";
import { libraryDomains } from "@/content/reconciled";
import { localHref, type Locale } from "@/lib/locale";
import { Section, TextLink } from "./primitives";
const researchLinks = [
  {
    title: "Projects & publications",
    description:
      "Published work, ongoing studies and manuscripts from the research team.",
    href: "/projects",
  },
  {
    title: "Guidance & resources",
    description:
      "Tools, methods, journals and research questions across six domains.",
    href: "/research/resources",
  },
  {
    title: "Datasets",
    description:
      "External data sources with clear provider and access information.",
    href: "/datasets",
  },
  {
    title: "Meet the team",
    description:
      "The people and research experience behind NeuroSphere Global.",
    href: "/people",
  },
];

export function ResearchNavigation({
  path,
  locale,
}: {
  path: string;
  locale: Locale;
}) {
  return (
    <nav
      className="container research-navigation"
      aria-label="Research sections"
    >
      {[
        ["Research overview", "/research"],
        ["Resources", "/research/resources"],
        ["Projects & publications", "/projects"],
        ["Datasets", "/datasets"],
      ].map(([label, href]) => (
        <Link
          key={href}
          href={localHref(href, locale)}
          aria-current={path === href ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function ResearchDoors({ locale }: { locale: Locale }) {
  return (
    <div className="research-doors">
      {researchLinks.map((link, i) => (
        <Link key={link.href} href={localHref(link.href, locale)}>
          <span className="index-number" aria-hidden="true">
            0{i + 1}
          </span>
          <div>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
          </div>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export function ResearchFoundation({ locale }: { locale: Locale }) {
  return (
    <Section
      className="research-foundation"
      title="Research, resources and open collaboration"
    >
      <p className="section-lead">{mission}</p>
      <div className="research-facts" aria-label="Research collection">
        <p>
          <strong>{projects.length}</strong> project records
        </p>
        <p>
          <strong>
            {projects.filter((p) => p.status === "Published").length}
          </strong>{" "}
          published papers
        </p>
        <p>
          <strong>{libraryDomains.length}</strong> resource domains
        </p>
      </div>
      <ResearchDoors locale={locale} />
    </Section>
  );
}

export function ResearchBackground({ locale }: { locale: Locale }) {
  return (
    <Section title="Our research foundations">
      <div className="prose">
        {introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="hero-actions">
        <TextLink href="/projects" locale={locale}>
          Explore the team’s work
        </TextLink>
        <TextLink href="/people" locale={locale}>
          Meet the team
        </TextLink>
      </div>
    </Section>
  );
}

export function ResearchEnquiry({ locale }: { locale: Locale }) {
  return (
    <section className="partner-band">
      <div className="container">
        <h2>Let’s move research forward.</h2>
        <div>
          <p>
            Reach out for research guidance, collaboration, or general
            enquiries.
          </p>
          <Link
            className="text-link"
            href={localHref("/contact?topic=Research%20guidance", locale)}
          >
            Prepare a research enquiry
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
