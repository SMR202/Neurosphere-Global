import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clinicalDisclaimer, copy } from "@/content/client";
import { localHref, translate, type Locale } from "@/lib/locale";
import { Brand, TextLink } from "./primitives";
import { editorialText } from "@/lib/editorial";
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer" lang="en">
      <div className="container footer-newsletter">
        <div>
          <h2>Stay connected.</h2>
          <p>{copy(81).replace("Stay informed. ", "")}</p>
        </div>
        <TextLink href="/join" locale={locale}>
          Choose your updates
        </TextLink>
      </div>
      <div className="container footer-main">
        <div>
          <Brand locale={locale} />
          <p>Brain health, learned and built together.</p>
          <a className="footer-email" href="mailto:NeuroZehn@outlook.com">
            NeuroZehn@outlook.com
          </a>
        </div>
        <nav aria-label="Footer" lang={locale}>
          {[
            {
              title: "Explore",
              links: [
                ["Learn", "/learn"],
                ["Brain Health", "/brain-health"],
                ["Programmes", "/programmes"],
                ["Partner With Us", "/partner"],
              ],
            },
            {
              title: "Research",
              links: [
                ["Research overview", "/research"],
                ["Research resources", "/research/resources"],
                ["Projects & publications", "/projects"],
                ["Datasets", "/datasets"],
              ],
            },
            {
              title: "Institute",
              links: [
                ["About", "/about"],
                ["People", "/people"],
                ["Insights", "/insights"],
                ["Contact", "/contact"],
              ],
            },
          ].map((group) => (
            <div key={group.title}>
              <h3 lang="en">{group.title}</h3>
              {group.links.map(([label, href]) => (
                <Link
                  href={localHref(href, locale)}
                  key={href}
                  lang={translate(label, locale) === label ? "en" : locale}
                >
                  {translate(label, locale)}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <nav className="container footer-policies" aria-label="Policies">
        {[
          ["Ethics and privacy", "/ethics-privacy"],
          ["Privacy Policy", "/privacy-policy"],
          ["Terms of Use", "/terms-of-use"],
          ["Cookie notice", "/cookies"],
          ["Accessibility", "/accessibility"],
        ].map(([label, href]) => (
          <Link
            href={localHref(href, locale)}
            key={href}
            lang={translate(label, locale) === label ? "en" : locale}
          >
            {translate(label, locale)}
          </Link>
        ))}
      </nav>
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
