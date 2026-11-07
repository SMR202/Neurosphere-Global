import { ProgrammeFigure } from "./institute-figures";
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
import { formDeliveryConfiguration } from "@/lib/form-delivery";
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
          Prepared by Dr. Shahid Bashir, PhD, neuroscientist. Last updated
          October 2026.
        </Pending>
      </Intro>
      <Emergency />
      <Section title="Brain-health guides">
        <EditorialCards
          locale={locale}
          items={healthTopics
            .filter((topic) => topic.paragraphs.length)
            .map((topic) => ({
              title: topic.title,
              description: topic.description,
              href: `/brain-health/${topic.slug}`,
              status: topic.paragraphs.length ? undefined : topic.status,
              note: topic.paragraphs.length
                ? "Read the guide"
                : "Guide in planning",
            }))}
        />
      </Section>
      <Section title="More guides in preparation" className="planned-guides">
        <ul>
          {healthTopics
            .filter((topic) => !topic.paragraphs.length)
            .map((topic) => (
              <li key={topic.slug}>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </li>
            ))}
        </ul>
        <TextLink href="/join?interests=Brain-health%20guides" locale={locale}>
          Choose your updates
        </TextLink>
      </Section>
      <section className="partner-band">
        <div className="container">
          <h2>{copy(329).replace(/^Free\s+/, "")}</h2>
          <div>
            <p>{copy(330).replace(/^Free\s+/, "")}</p>
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
    </>
  );
}
function Programmes({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro compact title={copy(343)} description={copy(344)} />
      <Section>
        <ProgrammeFigure locale={locale} programmes={programmes} />
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
          intent={query.request === "brief" ? "brief" : undefined}
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
      <Intro title="About NeuroZehn" description={copy(510)} />
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
      <Section title="About the name">
        <p className="section-lead">
          Zehn (ذہن) means mind in Urdu. NeuroZehn joins neuroscience and the
          mind: science that serves how people think, learn, feel and recover.
        </p>
      </Section>
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
            <p>Each service starts only when it is approved and ready.</p>
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
      <Section title="Coming next" className="planned-articles">
        <p className="section-lead">
          These articles are being prepared. Choose brain-health updates to hear
          when they are published.
        </p>
        <ul>
          {insights.map((title) => (
            <li key={title}>
              <h3>{title}</h3>
              <span>In preparation</span>
            </li>
          ))}
        </ul>
        <TextLink href="/join?interests=Brain-health%20guides" locale={locale}>
          Choose your updates
        </TextLink>
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
          <h2>One team. A direct conversation.</h2>
          <a className="contact-email" href="mailto:NeuroZehn@outlook.com">
            NeuroZehn@outlook.com
          </a>
          <p>We reply within two working days.</p>
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
        <p className="contact-boundary">
          NeuroZehn is not a clinic. For medical emergencies, contact local
          emergency services.
        </p>
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
          <Intro
            title="Stay informed."
            description={copy(81).replace("Stay informed. ", "")}
            compact
          />
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
          description="For questions about this information, please contact the institute."
        />
        <Section>
          <Pending>
            {legalPages[path as keyof typeof legalPages]} information is being
            prepared.
          </Pending>
          {path === "/privacy-policy" &&
          formDeliveryConfiguration()?.provider === "web3forms" ? (
            <div className="prose">
              <h2>Website enquiries</h2>
              <p>
                When you submit a website form, the details you enter are sent
                to Web3Forms to process the request and email it to
                NeuroZehn@outlook.com. The website application does not save a
                separate copy of your submission. Web3Forms and the receiving
                email service may retain it under their own settings and
                policies.
              </p>
              <p>
                Please do not include personal medical information. For
                questions about your submitted details, email
                NeuroZehn@outlook.com.
              </p>
              <a
                href="https://web3forms.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web3Forms privacy policy
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          ) : null}
          <p className="section-lead">
            Our ethics and privacy page explains the institute’s current
            commitments.
          </p>
          <TextLink href="/ethics-privacy" locale={locale}>
            Ethics and privacy
          </TextLink>
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
