import Link from "next/link";
import { Atom } from "lucide-react";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="NeuroZehn — Home">
      <Atom aria-hidden="true" strokeWidth={1.15} />
      <span>NeuroZehn</span>
    </Link>
  );
}
