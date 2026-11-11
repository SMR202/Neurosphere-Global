import { ArrowUpRight } from "lucide-react";
import { team } from "@/data/team";
import { overview } from "@/data/site";

import { researchAreas, externalDataSources } from "@/content/reconciled";
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
        compact
        title="Research Guidance & Resources"
        description={overview.resources}
        summary="Curated tools, methods and reading across six research domains."
      />
      <ResearchLibrary locale={locale} initialDomain={initialDomain} />
      <ResearchEnquiry locale={locale} />
    </>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro
        compact
        title="Projects & Publications"
        description={overview.projects}
        summary="Published papers, active studies and manuscripts from the research team."
      >
        <p className="research-context">
          The research team’s existing work is listed here. New institute
          studies and services retain their separate planning status.
        </p>
      </Intro>
      <PublicationList />
      <Section title="Areas of research" className="research-areas">
        <p className="section-lead">
          The research areas NeuroZehn is actively engaged in — spanning brain
          stimulation, genetics, imaging, and population health, all aimed at
          turning neuroscience discovery into real clinical impact.
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
      <Intro
        title="Our people"
        description="NeuroZehn brings together a growing, multidisciplinary network of neuroscientists, neurologists, clinicians, rehabilitation specialists and computational scientists. The team combines expertise in clinical neuroscience, neurotechnology, brain stimulation, neurological disorders, artificial intelligence and translational research. We are at the founding stage, and our team and advisers will keep growing."
      />
      <Section className="team-profiles">
        <h2 className="sr-only">Scientific team</h2>
        {team.map((person) => (
          <article className="team-profile" key={person.slug} id={person.slug}>
            <div className="team-monogram">
              <span className="team-role">{person.role}</span>
              <span className="team-initials" aria-hidden="true">
                {person.initials}
              </span>
            </div>
            <div>
              <h2>{person.name}</h2>
              <p className="team-expertise">{person.expertise}</p>
              <div className="team-biography">
                <p>{person.bio}</p>
                {person.biography?.length ? (
                  <details>
                    <summary>Read full profile</summary>
                    {person.biography.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </details>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </Section>
      <Section title="An international research network">
        <div className="prose team-network-copy">
          <p>
            NeuroZehn is building an international network of scientific
            collaborators, academic institutions, clinical researchers and
            technology specialists. This structure is intended to support
            collaborative projects, joint publications, research grants,
            student mentorship, clinical studies and new approaches to brain
            health.
          </p>
          <p>
            Additional collaborators and scientific advisers will be
            introduced as the network grows. Members of the scientific team
            take part as individuals. Institutions are named only to identify
            each person and do not mean that the institution endorses
            NeuroZehn.
          </p>
        </div>
      </Section>
      <Section title="Scientific advice and research integrity">
        <div className="prose team-network-copy">
          <p>
            We are developing a Scientific Advisory Board and an Ethics and
            Research Integrity Committee to support NeuroZehn’s scientific
            direction, research quality, responsible innovation and
            international collaborations.
          </p>
          <p>
            We welcome expressions of interest from experienced
            neuroscientists, neurologists, clinicians, biomedical scientists,
            neurotechnology specialists, AI researchers, and experts in
            research ethics and governance who wish to contribute to our
            mission.
          </p>
        </div>
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>Interested in joining our scientific network?</h2>
          <div>
            <p>
              We welcome collaborations, advisory contributions and
              opportunities for joint research.
            </p>
            <div className="hero-actions">
              <Action href="/contact?topic=Collaboration" locale={locale}>
                Contact us
              </Action>
              <TextLink
                href="/contact?topic=Website%20feedback"
                locale={locale}
              >
                Share feedback
              </TextLink>
            </div>
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
        compact
        title="Neuroscience datasets"
        description="Discover external neuroscience data sources for research and learning, with provider links and access information."
      >
        <p className="research-context">
          These resources are hosted by independent providers. No
          NeuroZehn-owned dataset release is currently listed.
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
