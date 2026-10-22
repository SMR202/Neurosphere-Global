import Image from "next/image";
import { Plus } from "lucide-react";
import { copy, lines, courses, studentTracks } from "@/content/client";
import type { Locale } from "@/lib/locale";
import { Action, Section, TextLink } from "./primitives";
import { Catalogue } from "./catalogue";
import { editorialText } from "@/lib/editorial";
export function StudentTable() {
  return (
    <div
      className="table-scroll"
      role="region"
      aria-label="Student track disciplines and examples"
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            <th scope="col">Discipline</th>
            <th scope="col">What you do</th>
            <th scope="col">Example</th>
          </tr>
        </thead>
        <tbody>
          {studentTracks.map((track) => (
            <tr key={track.discipline}>
              <th scope="row">{track.discipline}</th>
              <td>{track.work}</td>
              <td>{track.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Learn({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="container learning-hero">
        <div className="hero-copy">
          <h1>
            Learn brain <br />
            health in practice.
          </h1>
          <p>{copy(92)}</p>
          <div className="hero-actions">
            <Action href="#catalogue" locale={locale}>
              See the catalogue
            </Action>
            <TextLink href="/join" locale={locale}>
              Join the waitlist
            </TextLink>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/images/fiber-sphere.png"
            alt=""
            fill
            sizes="(max-width: 700px) 1px, 43vw"
            preload
          />
        </div>
      </section>
      <Section title="How micro-credentials work" className="credential-how">
        <div className="principles-grid">
          {lines(96, 100).map((item, i) => {
            const split = item.indexOf(". ");
            return (
              <article key={item} data-reveal>
                <span className="index-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{item.slice(0, split)}</h3>
                <p>{editorialText(item.slice(split + 2))}</p>
              </article>
            );
          })}
        </div>
      </Section>
      <Catalogue courses={courses} locale={locale} />
      <Section title={copy(136)} id="student-tracks">
        <p className="section-lead">{copy(137)}</p>
        <StudentTable />
        <TextLink href="/learn/student-tracks" locale={locale}>
          Apply for a student track
        </TextLink>
      </Section>
      <section className="partner-band">
        <div className="container" data-reveal>
          <h2>{copy(170)}</h2>
          <p>{copy(171)}</p>
        </div>
      </section>
      <Section title="Fees and scholarships">
        <p className="section-lead">{editorialText(copy(173))}</p>
      </Section>
      <Section title="Questions and answers" className="faq-section">
        {[
          [175, 176],
          [177, 178],
          [179, 180],
          [181, 182],
          [184, 185],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {copy(q)}
              <Plus aria-hidden="true" />
            </summary>
            <div>
              <p>{copy(a)}</p>
              {q === 181 ? (
                <TextLink href="/partner" locale={locale}>
                  Partner With Us
                </TextLink>
              ) : null}
            </div>
          </details>
        ))}
      </Section>
      <section className="container waitlist-band">
        <div>
          <h2>Join the waitlist.</h2>
          <p>Join the waitlist for the first micro-credentials.</p>
        </div>
        <Action href="/join" locale={locale}>
          Join the waitlist
        </Action>
      </section>
    </>
  );
}
