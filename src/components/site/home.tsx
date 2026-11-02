import Image from "next/image";
import { copy, lines, roadmap, sourceLinks } from "@/content/client";
import { translate, type Locale } from "@/lib/locale";
import { Action, Section, TextLink } from "./primitives";
import { JourneyFigure } from "./institute-figures";
import { ResearchFoundation } from "./research-shared";
import { ProgrammeNetwork } from "./programme-network";

export function Home({ locale }: { locale: Locale }) {
  const doors = [
    {
      title: copy(50),
      body: copy(51),
      action: "Explore Learn",
      href: "/learn",
    },
    {
      title: copy(53),
      body: copy(54),
      action: "Explore Brain Health",
      href: "/brain-health",
    },
    {
      title: copy(56),
      body: copy(57),
      action: "Partner With Us",
      href: "/partner",
    },
  ];
  return (
    <>
      <section className="container home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title" lang={locale}>
            {locale === "en" ? (
              <>
                <span>Brain health,</span> <span>learned and built</span>{" "}
                <span>together.</span>
              </>
            ) : (
              translate(copy(43), locale)
            )}
          </h1>
          <p lang="en" dir="ltr">
            {copy(44)}
          </p>
          <div className="hero-actions">
            <Action href="/learn#catalogue" locale={locale}>
              Explore micro-credentials
            </Action>
            <Action href="/partner" locale={locale} secondary>
              Become a founding partner
            </Action>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/images/neurozehn-connection.webp"
            alt=""
            fill
            sizes="(max-width: 700px) 320px, (max-width: 1100px) 43vw, 650px"
            preload
          />
        </div>
      </section>
      <div className="status-strip">
        <div className="container">
          {[
            { title: "Open now", body: "founding network and waitlist" },
            {
              title: "Opening soon",
              body: "first micro-credentials, early 2027",
            },
            {
              title: "In planning",
              body: "brain-health hub, research programme, care navigation",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2>
                {translate(item.title, locale)}
                <span aria-hidden="true">:</span>
              </h2>
              <p lang="en" dir="ltr">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <section className="container three-doors" aria-label="Explore NeuroZehn">
        {doors.map((door) => (
          <article key={door.href} data-reveal>
            <h2>{translate(door.title, locale)}</h2>
            <p>{door.body}</p>
            <TextLink href={door.href} locale={locale}>
              {door.action}
            </TextLink>
          </article>
        ))}
      </section>
      <Section className="building-section">
        <h2>{copy(60)}</h2>
        <div className="prose">
          <p>{copy(63)}</p>
          <details className="institute-story">
            <summary>Why we are building NeuroZehn</summary>
            <p>{copy(61)}</p>
          </details>
        </div>
      </Section>
      <section className="container journey-section">
        <JourneyFigure locale={locale} />
      </section>
      <ResearchFoundation locale={locale} />
      <section className="facts-band" aria-labelledby="facts-title">
        <div className="container">
          <div className="section-heading">
            <h2 id="facts-title">Why it matters</h2>
          </div>
          <div className="facts-grid">
            {lines(65, 68).map((fact, i) => {
              const [claim, source] = fact.split(" Source: ");
              return (
                <article key={fact} data-reveal>
                  <span className="fact-number" aria-hidden="true">
                    {["0.19", "0.4%", "260 million", "2026–2035"][i]}
                  </span>
                  <p>{claim}</p>
                  {i === 3 ? (
                    <div className="fact-source">
                      <p>As reported by {source}</p>
                      <a
                        href={sourceLinks[i]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read the government announcement
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  ) : (
                    <a
                      href={sourceLinks[i]}
                      aria-label={
                        i === 3
                          ? "Read the government announcement (opens in a new tab)"
                          : undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source: {source}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </article>
              );
            })}
          </div>
          <p className="facts-summary">{copy(69)}</p>
        </div>
      </section>
      <Section title="Twelve connected programmes" className="programme-home">
        <ProgrammeNetwork locale={locale} />
        <TextLink href="/programmes" locale={locale}>
          See all programmes
        </TextLink>
      </Section>
      <Section className="home-roadmap">
        <div className="section-heading">
          <h2>Opening in stages.</h2>
          <TextLink href="/about/roadmap" locale={locale}>
            See the full roadmap
          </TextLink>
        </div>
        <div className="roadmap-teaser">
          {roadmap.map((stage) => {
            const item = { title: stage.stage, body: stage.description };
            return (
              <article key={item.title} data-reveal>
                <span className="timeline-dot" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>{copy(74)}</h2>
          <div>
            <p>{copy(75)}</p>
            <Action href="/partner" locale={locale}>
              Become a founding partner
            </Action>
          </div>
        </div>
      </section>
    </>
  );
}
