import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { mission } from "@/data/site";
import { siteOrigin } from "@/lib/metadata";
import "./globals.css";
const serif = Cormorant_Garamond({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-reading",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "NeuroSphere Global | Neuroscience Research & Resources",
    template: "%s | NeuroSphere Global",
  },
  description: mission,
  metadataBase: new URL(siteOrigin() ?? "http://localhost:3000"),
  openGraph: {
    siteName: "NeuroSphere Global",
    type: "website",
    title: "NeuroSphere Global",
    description: mission,
  },
  robots: { index: !!siteOrigin(), follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
