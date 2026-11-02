import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { localHref, translate, type Locale } from "@/lib/locale";
import { emergency, type Status } from "@/content/client";
import { editorialText } from "@/lib/editorial";

export { Brand } from "./brand";
export function Action({
  href,
  children,
  locale = "en",
  secondary = false,
}: {
  href: string;
  children: string;
  locale?: Locale;
  secondary?: boolean;
}) {
  const text = translate(children, locale);
  return (
    <Button asChild variant={secondary ? "outline" : "default"}>
      <Link href={localHref(href, locale)}>
        <span lang={text === children ? "en" : locale}>{text}</span>
        <ArrowRight data-icon="inline-end" aria-hidden="true" />
      </Link>
    </Button>
  );
}
export function TextLink({
  href,
  children,
  locale = "en",
}: {
  href: string;
  children: string;
  locale?: Locale;
}) {
  const text = translate(children, locale);
  return (
    <Link className="text-link" href={localHref(href, locale)}>
      <span lang={text === children ? "en" : locale}>{text}</span>
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}
export function StatusLabel({
  status,
  locale = "en",
}: {
  status: Status;
  locale?: Locale;
}) {
  return (
    <span className="status-label" data-status={status} lang={locale}>
      <span aria-hidden="true" />
      {translate(status, locale)}
    </span>
  );
}
export function Intro({
  title,
  description,
  children,
  compact = false,
  summary,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  compact?: boolean;
  summary?: string;
}) {
  return (
    <section className={`container page-intro ${compact ? "compact" : ""}`}>
      <h1>{title}</h1>
      {description ? (
        <p className="page-lead">{summary || description}</p>
      ) : null}
      {summary && description ? (
        <details className="intro-details">
          <summary>About this collection</summary>
          <p>{description}</p>
        </details>
      ) : null}
      {children}
    </section>
  );
}
export function Section({
  title,
  children,
  className = "",
  id,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`container section ${className}`} id={id} data-reveal>
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}
export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>;
}
export function Pending({
  children = "Details are being confirmed.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="pending-note">
      <span aria-hidden="true" /> {children}
    </p>
  );
}
export function Emergency() {
  return (
    <section
      className="container emergency"
      aria-label="Emergency and support contacts"
    >
      <div className="emergency-heading">
        <CircleAlert aria-hidden="true" />
        <h2>In an emergency</h2>
      </div>
      <p>{editorialText(emergency).split(" Emergency: ")[0]}</p>
      <div className="emergency-numbers">
        <a href="tel:1122">
          <strong>
            Rescue <b>1122</b>
          </strong>
          <span>Ambulance, where available</span>
        </a>
        <a href="tel:115">
          <strong>
            Edhi ambulance <b>115</b>
          </strong>
          <span>Ambulance service</span>
        </a>
        <a href="tel:15">
          <strong>
            Police <b>15</b>
          </strong>
          <span>Emergency assistance</span>
        </a>
      </div>
      <details className="support-contacts">
        <summary>Mental health support contacts</summary>
        <dl>
          <div>
            <dt>Rozan</dt>
            <dd>
              <a href="tel:080022444">0800-22-444</a>
              <span>Mon to Fri, 9:30 AM to 5 PM</span>
            </dd>
          </div>
          <div>
            <dt>Taskeen</dt>
            <dd>
              <a href="tel:+923168275336">+92 316 827 5336</a>
              <span>Mon to Sat, 11 AM to 11 PM</span>
            </dd>
          </div>
          <div>
            <dt>Humraaz</dt>
            <dd>
              <a href="tel:1166">Through 1166</a>
            </dd>
          </div>
        </dl>
      </details>
    </section>
  );
}
export function EditorialCards({
  items,
  locale = "en",
  columns = 3,
}: {
  items: {
    title: string;
    description: string;
    href: string;
    status?: Status;
    note?: string;
    metadata?: string[];
  }[];
  locale?: Locale;
  columns?: number;
}) {
  return (
    <div
      className="editorial-grid"
      data-columns={columns}
      style={{ "--columns": columns } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <Link
          className="editorial-card"
          href={localHref(item.href, locale)}
          key={`${item.href}-${item.title}`}
          data-reveal
        >
          <div className="card-top">
            {item.status ? (
              <StatusLabel status={item.status} locale={locale} />
            ) : item.note ? (
              <span className="card-note">{item.note}</span>
            ) : (
              <span className="index-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <ArrowUpRight aria-hidden="true" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.metadata?.length ? (
            <ul className="course-card-meta">
              {item.metadata.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
export function Breadcrumb({
  items,
  locale,
}: {
  items: { title: string; href?: string }[];
  locale: Locale;
}) {
  return (
    <nav className="container breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href={localHref("/", locale)}>{translate("Home", locale)}</Link>
        </li>
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? (
              <Link href={localHref(item.href, locale)}>{item.title}</Link>
            ) : (
              <span aria-current="page">{item.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
