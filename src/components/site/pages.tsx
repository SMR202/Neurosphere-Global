import { notFound } from "next/navigation";
import {
  copy,
  lines,
  programmes,
  researchStudies,
  partnerTypes,
  healthTopics,
  insights,
  legalPages,
  courses,
} from "@/content/client";
import { type Locale } from "@/lib/locale";
import { contactTopics } from "@/content/forms";
import {
  Action,
  Breadcrumb,
  EditorialCards,
  Emergency,
  Intro,
  Pending,
  Section,
  StatusLabel,
  TextLink,
} from "./primitives";
import { InterestForm } from "./interest-form";
import { editorialText } from "@/lib/editorial";
import { Home } from "./home";
import { Learn, StudentTable } from "./learn";
import {
  ResearchDoors,
  ResearchBackground,
  ResearchNavigation,
} from "./research-shared";
import {
  ResourcesPage,
  ProjectsPage,
  PeoplePage,
  DatasetsPage,
} from "./research-pages";
import {
  CourseDetail,
  HealthDetail,
  MethodsTable,
  ProgrammeDetail,
  Roadmap,
} from "./detail-pages";

function BrainHealth({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro title={copy(275)} description={copy(276)}>
        <Pending>
          Health guides are drafts. Physician reviewers and local emergency
          contacts have not yet been confirmed.
        </Pending>
      </Intro>
      <Emergency />
      <Section title="Brain-health guides">
        <EditorialCards
          locale={locale}
          items={healthTopics.map((topic) => ({
            title: topic.title,
            description: topic.description,
            href: `/brain-health/${topic.slug}`,
            status: topic.status,
          }))}
        />
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>{copy(329)}</h2>
          <div>
            <p>{copy(330)}</p>
            <Action
              href="/join?interests=Brain-health%20guides"
              locale={locale}
            >
              Register interest
            </Action>
          </div>
        </div>
      </section>
      <Section title="Find help">
        <StatusLabel status="In planning" locale={locale} />
        <p className="section-lead">{copy(333)}</p>
      </Section>
      <Emergency />
    </>
  );
}
function Programmes({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro title={copy(343)} description={copy(344)} />
      <Section>
        <h2 className="sr-only">Explore the programmes</h2>
        <EditorialCards
          locale={locale}
          items={programmes.map((programme) => ({
            ...programme,
            href: `/programmes/${programme.slug}`,
          }))}
        />
      </Section>
    </>
  );
}
function Research({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro title={copy(392)} description={copy(393)} />
      <Section title="Explore the team's research" className="research-hub">
        <p className="section-lead">
          Discover the research team’s publications, active projects and
          practical resources alongside the institute’s planned studies.
        </p>
        <ResearchDoors locale={locale} />
      </Section>
      <Section title="What we plan to study">
        <EditorialCards
          columns={2}
          locale={locale}
          items={researchStudies.map((study) => ({
            ...study,
            href: "/research/participate",
          }))}
        />
      </Section>
      <Section title="How we do research" className="integrity-section">
        <ol className="principle-list">
          {lines(420, 424).map((item, i) => (
            <li key={item}>
              <span aria-hidden="true">0{i + 1}</span>
              <p>{editorialText(item)}</p>
            </li>
          ))}
        </ol>
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>{copy(426)}</h2>
          <div>
            <p>{copy(427)}</p>
            <Action href="/research/participate" locale={locale}>
              Register interest
            </Action>
          </div>
        </div>
      </section>
      <Section title="Methods we teach and plan to use">
        <p className="section-lead">{copy(430)}</p>
        <MethodsTable />
      </Section>
      <Section title="Trial readiness">
        <StatusLabel status="In planning" locale={locale} />
        <p className="section-lead">{copy(453)}</p>
      </Section>
    </>
  );
}
function Partner({
  locale,
  deliveryEnabled,
  query,
}: {
  locale: Locale;
  deliveryEnabled: boolean;
  query: Record<string, string>;
}) {
  return (
    <>
      <Intro title={copy(463)} description={copy(464)}>
        <div className="hero-actions">
          <Action href="/partner?request=brief#enquiry" locale={locale}>
            Request the partner brief
          </Action>
          <TextLink href="#enquiry" locale={locale}>
            Send an enquiry
          </TextLink>
        </div>
      </Intro>
      <Section title="What we offer, and what we ask">
        <div className="partner-offers">
          {partnerTypes.map((partner, i) => (
            <article key={partner.type} data-reveal>
              <div>
                <span className="index-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{partner.type}</h3>
              </div>
              <div>
                <h4>What you get</h4>
                <p>{partner.offer}</p>
              </div>
              <div>
                <h4>What we ask</h4>
                <p>{partner.ask}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>{copy(493)}</h2>
          <p>{copy(494)}</p>
        </div>
      </section>
      <Section title="How to start">
        <ol className="principle-list">
          {lines(496, 499).map((item, i) => (
            <li key={item}>
              <span aria-hidden="true">0{i + 1}</span>
              <p>{editorialText(item)}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="form-section" id="enquiry">
        <div>
          <h2>Let’s build together.</h2>
          <p>Tell us who you are and what you would like to do together.</p>
          {query.request === "brief" ? (
            <Pending>Your enquiry is set to request the partner brief.</Pending>
          ) : null}
        </div>
        <InterestForm
          key={query.request || "partner"}
          kind="partner"
          locale={locale}
          deliveryEnabled={deliveryEnabled}
          initial={
            query.request === "brief"
              ? { message: "I would like to request the partner brief." }
              : {}
          }
        />
      </Section>
    </>
  );
}
function About({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro title="About NeuroSphere" description={copy(510)} />
      <Section className="mission-section">
        <div>
          <h2>Vision</h2>
          <p>{copy(512)}</p>
        </div>
        <div>
          <h2>Mission</h2>
          <p>{copy(514)}</p>
        </div>
      </Section>
      <ResearchBackground locale={locale} />
      <Section title="Our values">
        <ol className="principle-list">
          {lines(516, 521).map((item, i) => (
            <li key={item}>
              <span aria-hidden="true">0{i + 1}</span>
              <p>{editorialText(item)}</p>
            </li>
          ))}
        </ol>
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>Growing step by step.</h2>
          <div>
            <p>{copy(544)}</p>
            <TextLink href="/about/roadmap" locale={locale}>
              See the full roadmap
            </TextLink>
          </div>
        </div>
      </section>
      <Section title="Governance">
        <p className="section-lead">{copy(539)}</p>
      </Section>
      <Section title="Our premises">
        <StatusLabel status="In planning" locale={locale} />
        <p className="section-lead">{editorialText(copy(541))}</p>
      </Section>
      <Section title="Our commitments">
        <p className="section-lead">{copy(544)}</p>
      </Section>
    </>
  );
}
function Insights({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro title="Insights" description={copy(562)} />
      <Section title="First articles">
        <EditorialCards
          locale={locale}
          columns={2}
          items={insights.map((title, i) => ({
            title,
            description: "Article content is being prepared.",
            href: `/insights/${i + 1}`,
            status: "In planning",
          }))}
        />
      </Section>
    </>
  );
}
function Ethics() {
  return (
    <>
      <Intro
        title="Ethics, privacy and responsible use"
        description={copy(577)}
      />
      <Section>
        <ol className="principle-list">
          {lines(578, 585).map((item, i) => (
            <li key={item}>
              <span aria-hidden="true">0{i + 1}</span>
              <p>{editorialText(item)}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
function Contact({
  locale,
  deliveryEnabled,
  query,
}: {
  locale: Locale;
  deliveryEnabled: boolean;
  query: Record<string, string>;
}) {
  return (
    <>
      <Intro title={copy(595)} description={copy(596)} />
      <div className="container contact-layout">
        <aside className="contact-directory">
          <h2>Contact NeuroSphere</h2>
          <dl>
            {[
              "General",
              "Learning and enrolment",
              "Partnerships",
              "Research participation",
              "Media",
            ].map((topic) => (
              <div key={topic}>
                <dt>{topic}</dt>
                <dd>Choose this topic in the enquiry form.</dd>
              </div>
            ))}
          </dl>
          <p>
            NeuroSphere is not a clinic. For medical emergencies, contact local
            emergency services.
          </p>
        </aside>
        <InterestForm
          kind="contact"
          locale={locale}
          deliveryEnabled={deliveryEnabled}
          initial={{
            topic: contactTopics.includes(query.topic)
              ? query.topic
              : contactTopics.includes(query.type)
                ? query.type
                : "General",
            message:
              query.message ||
              (query.type === "Research guidance"
                ? `Research guidance enquiry${query.area ? ` — ${query.area}` : ""}${query.topic ? `: ${query.topic}` : ""}`
                : ""),
          }}
        />
      </div>
    </>
  );
}

export function PageContent({
  path,
  locale,
  deliveryEnabled,
  query,
}: {
  path: string;
  locale: Locale;
  deliveryEnabled: boolean;
  query: Record<string, string>;
}) {
  switch (path) {
    case "/":
      return <Home locale={locale} />;
    case "/learn":
      return <Learn locale={locale} />;
    case "/brain-health":
      return <BrainHealth locale={locale} />;
    case "/programmes":
      return <Programmes locale={locale} />;
    case "/research":
      return (
        <>
          <ResearchNavigation path={path} locale={locale} />
          <Research locale={locale} />
        </>
      );
    case "/research/resources":
      return (
        <>
          <ResearchNavigation path={path} locale={locale} />
          <ResourcesPage locale={locale} initialDomain={query.domain} />
        </>
      );
    case "/projects":
      return (
        <>
          <ResearchNavigation path={path} locale={locale} />
          <ProjectsPage locale={locale} />
        </>
      );
    case "/datasets":
      return (
        <>
          <ResearchNavigation path={path} locale={locale} />
          <DatasetsPage locale={locale} />
        </>
      );
    case "/partner":
      return (
        <Partner
          locale={locale}
          deliveryEnabled={deliveryEnabled}
          query={query}
        />
      );
    case "/about":
      return <About locale={locale} />;
    case "/about/roadmap":
      return <Roadmap locale={locale} />;
    case "/people":
      return <PeoplePage locale={locale} />;
    case "/insights":
      return <Insights locale={locale} />;
    case "/ethics-privacy":
      return (
        <>
          <Ethics />
          <Section>
            <div className="related-links">
              {Object.entries(legalPages).map(([href, title]) => (
                <TextLink href={href} key={href} locale={locale}>
                  {title}
                </TextLink>
              ))}
            </div>
          </Section>
        </>
      );
    case "/contact":
      return (
        <Contact
          locale={locale}
          deliveryEnabled={deliveryEnabled}
          query={query}
        />
      );
    case "/join":
      return (
        <>
          <Intro title="Stay informed." description={copy(81)} />
          <Section className="form-section">
            <div>
              <h2>Join the waitlist</h2>
              <p>Choose what you want to hear about.</p>
            </div>
            <InterestForm
              kind="waitlist"
              locale={locale}
              deliveryEnabled={deliveryEnabled}
              initial={{
                email: query.email || "",
                interests: query.interests || "",
              }}
            />
          </Section>
        </>
      );
    case "/learn/student-tracks":
      return (
        <>
          <Breadcrumb
            locale={locale}
            items={[
              { title: "Learn", href: "/learn" },
              { title: "Student tracks" },
            ]}
          />
          <Intro title={copy(136)} description={copy(137)} />
          <Section>
            <StudentTable />
          </Section>
          <Section className="form-section">
            <div>
              <h2>Apply for a student track</h2>
              <p>A defined period, a named supervisor and a written plan.</p>
            </div>
            <InterestForm
              kind="student"
              locale={locale}
              deliveryEnabled={deliveryEnabled}
            />
          </Section>
        </>
      );
    case "/research/participate":
      return (
        <>
          <Breadcrumb
            locale={locale}
            items={[
              { title: "Research", href: "/research" },
              { title: "Take part" },
            ]}
          />
          <Intro title={copy(426)} description={copy(427)} />
          <Section className="form-section">
            <div>
              <h2>Register your interest</h2>
              <p>{copy(670).replace("Thank you. ", "")}</p>
            </div>
            <InterestForm
              kind="research"
              locale={locale}
              deliveryEnabled={deliveryEnabled}
            />
          </Section>
        </>
      );
  }
  const course = courses.find((c) => path === `/learn/${c.slug}`);
  if (course)
    return (
      <CourseDetail
        course={course}
        locale={locale}
        deliveryEnabled={deliveryEnabled}
      />
    );
  const programme = programmes.find((p) => path === `/programmes/${p.slug}`);
  if (programme)
    return <ProgrammeDetail programme={programme} locale={locale} />;
  const topic = healthTopics.find((p) => path === `/brain-health/${p.slug}`);
  if (topic) return <HealthDetail topic={topic} locale={locale} />;
  if (path in legalPages)
    return (
      <>
        <Intro
          title={legalPages[path as keyof typeof legalPages]}
          description="This page is awaiting approved text."
        />
        <Section>
          <Pending>
            {legalPages[path as keyof typeof legalPages]} information is being
            prepared.
          </Pending>
          <p className="section-lead">
            This placeholder is part of the local content preview. The final
            policy must be approved before publication.
          </p>
          <TextLink href="/contact" locale={locale}>
            Contact us
          </TextLink>
        </Section>
      </>
    );
  const article = /^\/insights\/([1-6])$/.exec(path);
  if (article)
    return (
      <>
        <Breadcrumb
          locale={locale}
          items={[
            { title: "Insights", href: "/insights" },
            { title: "Article in planning" },
          ]}
        />
        <Intro title={insights[Number(article[1]) - 1]} />
        <Section>
          <StatusLabel status="In planning" locale={locale} />
          <Pending>
            This article will be published once its content and review are
            complete.
          </Pending>
          <TextLink href="/join" locale={locale}>
            Join the waitlist
          </TextLink>
        </Section>
      </>
    );
  notFound();
}
