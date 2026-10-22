import Link from "next/link";
import { Atom } from "lucide-react";
import { localHref, type Locale } from "@/lib/locale";
export function Brand({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link
      href={localHref("/", locale)}
      className="brand"
      aria-label="NeuroSphere — Home"
    >
      <Atom aria-hidden="true" strokeWidth={1.25} />
      <span lang="en" dir="ltr">
        NeuroSphere
      </span>
    </Link>
  );
}
