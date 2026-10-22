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
              className="mobile-menu"
              dir={locale === "ur" ? "rtl" : "ltr"}
            >
              <DialogTitle>Explore NeuroSphere</DialogTitle>
              <DialogDescription>
                Brain health, learned and built together.
              </DialogDescription>
              <nav aria-label="Mobile navigation" lang={locale}>
                {[
                  ["Home", "/"],
                  ...navigation,
                  ["Research resources", "/research/resources"],
                  ["Projects & publications", "/projects"],
                  ["Datasets", "/datasets"],
                  ["People", "/people"],
                  ["Join the waitlist", "/join"],
                ].map(([label, href]) => (
                  <Link
                    href={localHref(href, locale)}
                    key={href}
                    onClick={() => setOpen(false)}
                    aria-current={current === href ? "page" : undefined}
                  >
                    {translate(label, locale)}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="reading-progress" aria-hidden="true" />
    </header>
  );
}
