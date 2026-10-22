import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  return (
    <Button asChild variant={secondary ? "outline" : "default"}>
      <Link href={localHref(href, locale)}>
        <span lang={locale}>{translate(children, locale)}</span>
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
  return (
    <Link className="text-link" href={localHref(href, locale)}>
      <span lang={locale}>{translate(children, locale)}</span>
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
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`container page-intro ${compact ? "compact" : ""}`}>
      <h1>{title}</h1>
      {description ? <p className="page-lead">{description}</p> : null}
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
    <div className="container emergency">
      <Alert>
        <CircleAlert aria-hidden="true" />
        <AlertTitle>In an emergency</AlertTitle>
        <AlertDescription>
          <p>{editorialText(emergency)}</p>
        </AlertDescription>
      </Alert>
    </div>
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
            ) : (
              <span className="index-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <ArrowUpRight aria-hidden="true" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
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
