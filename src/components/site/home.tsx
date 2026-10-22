import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy, lines, programmes, sourceLinks } from "@/content/client";
import { localHref, translate, type Locale } from "@/lib/locale";
import { Action, Section, TextLink } from "./primitives";
import { ResearchFoundation } from "./research-shared";

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
  const programmeNames = copy(71)
    .replace("Twelve connected programmes: ", "")
    .split(" · ");
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
            src="/images/fiber-sphere.png"
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
              body: "first micro-credentials; dates to be announced",
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
      <section
        className="container three-doors"
        aria-label="Explore NeuroSphere"
      >
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
          <p>{copy(61)}</p>
          <p className="journey">{copy(62)}</p>
          <p>{copy(63)}</p>
        </div>
      </Section>
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
                  <p>{i === 2 ? claim.replace("20.6", "20.8") : claim}</p>
                  {i === 3 ? (
                    <div className="fact-source">
                      <p>Source: {source}</p>
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
        <div className="programme-index">
          {programmes.map((programme, i) => (
            <Link
              key={programme.slug}
              href={localHref(`/programmes/${programme.slug}`, locale)}
            >
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{programmeNames[i]}</h3>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
        <TextLink href="/programmes" locale={locale}>
          See all programmes
        </TextLink>
      </Section>
      <section className="partner-band">
        <div className="container" data-reveal>
          <h2>{copy(74)}</h2>
          <div>
            <p>{copy(75)}</p>
            <Action href="/partner" locale={locale}>
              Become a founding partner
            </Action>
          </div>
        </div>
      </section>
      <Section className="home-roadmap">
        <div className="section-heading">
          <h2>Opening in stages.</h2>
          <TextLink href="/about/roadmap" locale={locale}>
            See the full roadmap
          </TextLink>
        </div>
        <div className="roadmap-teaser">
          {[
            { title: "Now", body: "micro-credentials and public education." },
            {
              title: "Next",
              body: "first research survey and student programmes.",
            },
            {
              title: "Later",
              body: "brain-health hub, care navigation and a wider research programme.",
            },
          ].map((item) => (
            <article key={item.title} data-reveal>
              <span className="timeline-dot" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <section className="container waitlist-band" data-reveal>
        <div>
          <h2>Stay informed.</h2>
          <p>{copy(81)}</p>
        </div>
        <Action href="/join" locale={locale}>
          Join the waitlist
        </Action>
      </section>
    </>
  );
}
