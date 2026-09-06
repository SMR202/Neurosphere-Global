import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { explore } from "@/data/site";
import type { ReactNode } from "react";
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}
export function ExternalResource({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`external-link ${className}`}
    >
      {children}
      <ExternalLink aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
export function PageIntro({
  title,
  children,
  className = "",
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`container page-intro ${className}`}>
      <h1>{title}</h1>
      <div className="page-intro-copy">{children}</div>
    </div>
  );
}
export function EnquiryBand() {
  return (
    <section className="enquiry-band" aria-labelledby="enquiry-title">
      <div className="container enquiry-inner">
        <h2 id="enquiry-title">
          Contact /<br />
          Research Enquiry
        </h2>
        <p>{explore[4].description}</p>
        <Button asChild variant="outline">
          <Link href="/contact">
            Research Enquiry
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
