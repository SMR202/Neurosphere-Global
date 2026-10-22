import { ArrowUpRight } from "lucide-react";
import { team } from "@/data/team";
import { overview } from "@/data/site";

import { researchAreas, externalDataSources } from "@/content/reconciled";
import { copy } from "@/content/client";
import { type Locale } from "@/lib/locale";
import { Intro, Section, TextLink, Action } from "./primitives";
import { ResearchLibrary } from "./research-library";
import { PublicationList } from "./publication-list";
import { ResearchEnquiry } from "./research-shared";

export function ResourcesPage({
  locale,
  initialDomain,
}: {
  locale: Locale;
  initialDomain?: string;
}) {
  return (
    <>
      <Intro
        title="Research Guidance & Resources"
        description={overview.resources}
      />
      <ResearchLibrary locale={locale} initialDomain={initialDomain} />
      <ResearchEnquiry locale={locale} />
    </>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro title="Projects & Publications" description={overview.projects}>
        <p className="research-context">
          The research team’s existing work is listed here. New institute
          studies and services retain their separate planning status.
        </p>
      </Intro>
      <PublicationList />
      <Section title="Areas of research" className="research-areas">
        <p className="section-lead">
          The research areas NeuroSphere Global is actively engaged in —
          spanning brain stimulation, genetics, imaging, and population health,
          all aimed at turning neuroscience discovery into real clinical impact.
        </p>
        <div>
          {researchAreas.map((area, i) => (
            <article key={area.title} data-reveal>
              <span className="index-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </Section>
      <ResearchEnquiry locale={locale} />
    </>
  );
}

export function PeoplePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro title="The people building NeuroSphere" description={copy(553)} />
      <Section className="team-profiles">
        <h2 className="sr-only">Research team</h2>
        {team.map((person) => (
          <article className="team-profile" key={person.slug} id={person.slug}>
            <div className="team-monogram">
              {person.role ? <p>{person.role}</p> : null}
              <span aria-hidden="true">{person.initials}</span>
            </div>
            <div>
              <h2>{person.name}</h2>
              {person.bio ? (
                <div className="team-biography">
                  {person.bio
                    .split(/ (?=PhD in|210\+|Research spans)/)
                    .map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
              ) : (
                <p className="team-bio-pending">
                  Further profile details will be added when confirmed.
                </p>
              )}
            </div>
          </article>
        ))}
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>Clinicians. Educators. Scientists.</h2>
          <div>
            <p>{copy(553)}</p>
            <Action href="/contact?topic=Collaboration" locale={locale}>
              Contact us
            </Action>
          </div>
        </div>
      </section>
    </>
  );
}

export function DatasetsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro
        title="Neuroscience datasets"
        description="Discover external neuroscience data sources for research and learning, with provider links and access information."
      >
        <p className="research-context">
          These resources are hosted by independent providers. No
          NeuroSphere-owned dataset release is currently listed.
        </p>
      </Intro>
      <Section title="Explore the data" className="dataset-collection">
        {externalDataSources.map((source) => (
          <article key={source.name}>
            <div>
              <span className="research-status">
                {source.kind} · {source.focus}
              </span>
              <h3>{source.name}</h3>
            </div>
            <div>
              <p>{source.description}</p>
              <p className="dataset-access">
                <strong>Access</strong> {source.access}
              </p>
              <a
                className="text-link"
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.kind === "Dataset"
                  ? "View dataset"
                  : "Browse repository"}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        ))}
      </Section>
      <Section className="dataset-reuse" title="Use data responsibly">
        <div className="prose">
          <p>
            Check the provider’s licence, access requirements and citation
            instructions before downloading or reusing data. Follow your
            institution’s ethics and data-governance requirements.
          </p>
          <TextLink
            href="/research/resources?domain=general-research"
            locale={locale}
          >
            Research methods and ethics resources
          </TextLink>
        </div>
      </Section>
      <ResearchEnquiry locale={locale} />
    </>
  );
}
