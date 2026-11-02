import Link from "next/link";
import { localHref, type Locale } from "@/lib/locale";
export function Brand({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link
      href={localHref("/", locale)}
      className="brand"
      lang="en"
      aria-label="NeuroZehn — Home"
    >
      <span lang="en" dir="ltr">
        Neuro<span className="brand-accent">Zehn</span>
        <small>
          Institute for Brain Health
          <br />
          &amp; Neuroscience
        </small>
      </span>
    </Link>
  );
}
