import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MotionDirector } from "@/components/site/motion";
import { copy } from "@/content/client";
import { siteOrigin } from "@/lib/metadata";
import type { Locale } from "@/lib/locale";
import "./globals.css";
import "./neurozehn.css";

const sans = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  weight: "200 800",
  variable: "--font-reading",
  display: "swap",
});
const urdu = localFont({
  src: "./fonts/noto-naskh-arabic-variable.woff2",
  weight: "400 600",
  variable: "--font-urdu",
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: copy(38), template: "%s" },
  description: copy(40),
  metadataBase: new URL(siteOrigin() ?? "http://localhost:3000"),
  openGraph: {
    siteName: "NeuroZehn",
    type: "website",
    title: copy(38),
    description: copy(40),
  },
  robots: { index: false, follow: false },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale: Locale =
    (await headers()).get("x-neurozehn-locale") === "ur" ? "ur" : "en";
  return (
    <html
      lang={locale}
      dir={locale === "ur" ? "rtl" : "ltr"}
      className={`${sans.variable} ${urdu.variable}`}
    >
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header locale={locale} />
        {locale === "ur" ? (
          <aside className="translation-preview" lang="en" dir="ltr">
            <span lang="ur" dir="rtl">
              مینو اور اہم بٹن اردو میں ہیں۔ تفصیلی معلومات انگریزی میں ہیں۔
            </span>
            <span>
              Menus and key buttons are in Urdu. Detailed information is in
              English.
            </span>
          </aside>
        ) : null}
        <main id="main" tabIndex={-1} lang="en">
          {children}
        </main>
        <Footer locale={locale} />
        <MotionDirector />
      </body>
    </html>
  );
}
