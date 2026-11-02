import {
  copy,
  healthTopics,
  methods,
  programmes,
  roadmap,
  type Course,
} from "@/content/client";
import type { Locale } from "@/lib/locale";
import {
  Action,
  Breadcrumb,
  Emergency,
  Intro,
  Pending,
  Section,
  StatusLabel,
  TextLink,
} from "./primitives";
import { InterestForm } from "./interest-form";
import { editorialText } from "@/lib/editorial";

export function CourseDetail({
  course,
  locale,
  deliveryEnabled,
}: {
  course: Course;
  locale: Locale;
  deliveryEnabled: boolean;
}) {
  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[{ title: "Learn", href: "/learn" }, { title: course.title }]}
      />
      <section className="container course-hero">
        <div>
          <StatusLabel status={course.status} locale={locale} />
          <h1>{course.title}</h1>
          <p className="page-lead">{course.audience}</p>
        </div>
        <aside className="course-summary">
          <h2>At a glance</h2>
          <dl>
            <div>
              <dt>Certificate</dt>
              <dd>Certificate of completion</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>
                {course.format?.match(/\d+ hours over \d+ weeks/)?.[0] ||
                  "6–12 hours over 3–6 weeks"}
              </dd>
            </div>
            <div>
              <dt>First-intake fees</dt>
              <dd>
                Students PKR 2,000 · Professionals PKR 5,000 · Scholarship
                places free
              </dd>
            </div>
            <div>
              <dt>Start dates</dt>
              <dd>
                {course.status === "Opening soon"
                  ? "First intake: early 2027"
                  : "To be announced"}
              </dd>
            </div>
            <div>
              <dt>Prepared by</dt>
              <dd>Dr. Shahid Bashir, PhD</dd>
            </div>
          </dl>
          <Action href="#interest" locale={locale}>
            {course.status === "Opening soon"
              ? "Join the waitlist"
              : "Register interest"}
          </Action>
        </aside>
      </section>
      <Section className="detail-layout">
        <nav aria-label="On this page" className="page-index">
          <a href="#overview">Overview</a>
          {course.outcomes.length ? (
            <a href="#outcomes">What you will learn</a>
          ) : null}
          <a href="#format">Format and assessment</a>
          <a href="#interest">Register interest</a>
        </nav>
        <div className="prose">
          <section id="overview">
            <h2>About this micro-credential</h2>
            <p>{course.description}</p>
          </section>
          {course.outcomes.length ? (
            <section id="outcomes">
              <h2>What you will learn</h2>
              <ol className="outcome-list">
                {course.outcomes.map((item) => (
                  <li key={item}>{editorialText(item)}</li>
                ))}
              </ol>
            </section>
          ) : null}
          <section id="format">
            <h2>Format and assessment</h2>
            {course.format ? (
              <p>{editorialText(course.format)}</p>
            ) : (
              <>
                <p>
                  Format, duration and assessment details will be announced
                  before enrolment.
                </p>
                <p>
                  You receive a certificate of completion. Fees will be
                  announced before enrolment.
                </p>
              </>
            )}
            <p>{copy(100)}</p>
            <Pending>{editorialText(copy(317))}</Pending>
          </section>
        </div>
      </Section>
      <Section className="form-section" id="interest">
        <div>
          <h2>
            {course.status === "Opening soon"
              ? "Join the waitlist"
              : "Register interest"}
          </h2>
          <p>
            Hear when enrolment opens and the start date is confirmed.
            Registering interest does not commit you to a place.
          </p>
        </div>
        <InterestForm
          kind="course"
          locale={locale}
          deliveryEnabled={deliveryEnabled}
          initial={{ course: course.title }}
        />
      </Section>
    </>
  );
}

export function ProgrammeDetail({
  programme,
  locale,
}: {
  programme: (typeof programmes)[number];
  locale: Locale;
}) {
  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[
          { title: "Programmes", href: "/programmes" },
          { title: programme.title },
        ]}
      />
      <Intro title={programme.title} description={programme.description}>
        <StatusLabel status={programme.status} locale={locale} />
      </Intro>
      <Section className="programme-detail-actions">
        <div>
          <h2>What you can do now</h2>
          <p>
            Register your interest or explore a partnership with the institute.
          </p>
          <div className="hero-actions">
            <Action href="/join" locale={locale}>
              Register interest
            </Action>
            <TextLink href="/partner" locale={locale}>
              Partner With Us
            </TextLink>
          </div>
        </div>
        <div>
          <h2>Opening step by step</h2>
          <p>
            Further programme details and confirmed partners will be published
            as planning progresses. Services start only when approved and ready.
          </p>
          <TextLink href="/about/roadmap" locale={locale}>
            See the full roadmap
          </TextLink>
          <TextLink href="/contact" locale={locale}>
            Contact us
          </TextLink>
        </div>
      </Section>
    </>
  );
}

export function HealthDetail({
  topic,
  locale,
}: {
  topic: (typeof healthTopics)[number];
  locale: Locale;
}) {
  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[
          { title: "Brain Health", href: "/brain-health" },
          { title: topic.title },
        ]}
      />
      <Intro
        title={
          topic.slug === "stroke"
            ? "Stroke: know the signs and act fast"
            : topic.slug === "epilepsy"
              ? "Epilepsy: seizure first aid"
              : topic.title
        }
        description={topic.description}
      >
        <Pending>
          {topic.paragraphs.length
            ? "Prepared by Dr. Shahid Bashir, PhD, neuroscientist. Last updated October 2026."
            : "This guide is in planning."}
        </Pending>
      </Intro>
      <Emergency />
      {topic.paragraphs.length ? (
        <Section className="guide-body">
          <div className="prose">
            {topic.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="guide-steps">
              {topic.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {topic.after
              .filter((item) => !item.startsWith("Prepared by "))
              .map((item) => (
                <p key={item}>{editorialText(item)}</p>
              ))}
            <p className="education-note">
              This is education, not a diagnosis or a replacement for your
              doctor.
            </p>
          </div>
        </Section>
      ) : (
        <Section>
          <Pending>
            This guide will be published following content review.
          </Pending>
          <TextLink
            href="/join?interests=Brain-health%20guides"
            locale={locale}
          >
            Register interest
          </TextLink>
        </Section>
      )}
      <section className="container waitlist-band">
        <div>
          <h2>Keep learning.</h2>
          <p>Clear, careful guidance for families, teachers and communities.</p>
        </div>
        <TextLink href="/brain-health" locale={locale}>
          Explore Brain Health
        </TextLink>
      </section>
    </>
  );
}

export function Roadmap({ locale }: { locale: Locale }) {
  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[{ title: "About", href: "/about" }, { title: "Roadmap" }]}
      />
      <Intro
        title="Our roadmap"
        description="Each service starts only when it is approved and ready."
      />
      <Section className="roadmap-detail">
        {roadmap.map((stage, i) => (
          <article key={stage.stage} data-reveal>
            <span className="index-number" aria-hidden="true">
              0{i + 1}
            </span>
            <h2>{stage.stage}</h2>
            <div>
              <p>{stage.description}</p>
              <span className="roadmap-status">{stage.status}</span>
            </div>
          </article>
        ))}
      </Section>
      <section className="container waitlist-band">
        <div>
          <h2>{copy(74)}</h2>
          <p>{copy(75)}</p>
        </div>
        <Action href="/partner" locale={locale}>
          Become a founding partner
        </Action>
      </section>
    </>
  );
}

export function MethodsTable() {
  return (
    <div
      className="table-scroll"
      role="region"
      aria-label="Methods and their current status"
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">What it is used for</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method) => (
            <tr key={method.name}>
              <th scope="row">{method.name}</th>
              <td>{method.purpose}</td>
              <td>{method.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
