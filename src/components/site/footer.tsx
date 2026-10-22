import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clinicalDisclaimer, copy, footerLinks } from "@/content/client";
import { localHref, translate, type Locale } from "@/lib/locale";
import { Brand, TextLink } from "./primitives";
import { editorialText } from "@/lib/editorial";
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer" lang="en">
      <div className="container footer-newsletter">
        <div>
          <h2>Stay informed.</h2>
          <p>{copy(29).replace("Newsletter: Stay informed. ", "")}</p>
        </div>
        <form action={localHref("/join", locale)} method="get">
          <label htmlFor="footer-email">Email address</label>
          <div className="newsletter-input">
            <input
              id="footer-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
            <button type="submit">
              {translate("Subscribe", locale)}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <p>Choose your interests and confirm consent on the next page.</p>
        </form>
      </div>
      <div className="container footer-main">
        <div>
          <Brand locale={locale} />
          <p>{translate(copy(3), locale)}</p>
          <TextLink href="/ethics-privacy" locale={locale}>
            Ethics and privacy
          </TextLink>
        </div>
        <nav aria-label="Footer" lang={locale}>
          {footerLinks.map(([label, href]) => (
            <Link href={localHref(href, locale)} key={href}>
              {translate(label, locale)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>{editorialText(clinicalDisclaimer)}</p>
        <a className="back-top" href="#main">
          {translate("Back to top", locale)}
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
