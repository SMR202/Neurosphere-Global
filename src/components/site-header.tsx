"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import { Brand } from "./brand";
import { navigation } from "@/data/site";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={path === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="outline">
            <Link
              href="/contact"
              aria-current={path === "/contact" ? "page" : undefined}
            >
              Research Enquiry
            </Link>
          </Button>
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
            <DialogContent className="mobile-menu">
              <DialogTitle>Explore NeuroSphere</DialogTitle>
              <DialogDescription>
                Research, resources, and open collaboration.
              </DialogDescription>
              <nav aria-label="Mobile navigation">
                {[
                  { href: "/", label: "Home" },
                  ...navigation,
                  { href: "/contact", label: "Research Enquiry" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={path === item.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
