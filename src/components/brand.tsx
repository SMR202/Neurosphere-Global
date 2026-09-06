import Link from "next/link";
import { Atom } from "lucide-react";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="NeuroSphere Global — Home">
      <Atom aria-hidden="true" strokeWidth={1.15} />
      <span>NeuroSphere Global</span>
    </Link>
  );
}
