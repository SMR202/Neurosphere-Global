"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { navigation } from "@/content/navigation";
import { localHref, routeLocale, translate, type Locale } from "@/lib/locale";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Brand } from "./brand";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const current = routeLocale(pathname).path;
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container utility-bar">
        <div className="language-switch" aria-label="Language">
          <a
            href={current}
            aria-current={locale === "en" ? "true" : undefined}
            lang="en"
          >
            English
          </a>
          <span aria-hidden="true">/</span>
          <a
            href={localHref(current, "ur")}
            aria-current={locale === "ur" ? "true" : undefined}
            lang="ur"
            dir="rtl"
          >
            اردو
          </a>
        </div>
        <Link href={localHref("/join", locale)}>
          {translate("Join the waitlist", locale)}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="container header-inner">
        <Brand locale={locale} />
        <nav className="desktop-nav" aria-label="Main navigation" lang={locale}>
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={localHref(href, locale)}
              lang={translate(label, locale) === label ? "en" : locale}
              aria-current={
                current === href ||
                current.startsWith(href + "/") ||
                (href === "/research" &&
                  ["/projects", "/datasets"].includes(current))
                  ? "page"
                  : undefined
              }
            >
              {translate(label, locale)}
            </Link>
          ))}
        </nav>
        <div className="mobile-nav">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label="Open navigation"
              >
                <Menu aria-hidden="true" />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="mobile-menu top-0 right-0 left-auto translate-x-0 translate-y-0"
              dir={locale === "ur" ? "rtl" : "ltr"}
            >
              <DialogTitle>Explore NeuroZehn</DialogTitle>
              <DialogDescription>
                Find your way to learning, research and the institute.
              </DialogDescription>
              <nav aria-label="Mobile navigation" lang={locale}>
                {[
                  {
                    title: "Explore",
                    links: [
                      ["Home", "/"],
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
                      ["Contact", "/contact"],
                    ],
                  },
                ].map((group) => (
                  <div className="menu-group" key={group.title}>
                    <h3 lang="en">{group.title}</h3>
                    {group.links.map(([label, href]) => (
                      <Link
                        href={localHref(href, locale)}
                        key={href}
                        lang={
                          translate(label, locale) === label ? "en" : locale
                        }
                        onClick={() => setOpen(false)}
                        aria-current={current === href ? "page" : undefined}
                      >
                        {translate(label, locale)}
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  className="menu-cta"
                  href={localHref("/join", locale)}
                  onClick={() => setOpen(false)}
                >
                  {translate("Join the waitlist", locale)}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="reading-progress" aria-hidden="true" />
    </header>
  );
}
