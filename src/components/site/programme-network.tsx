import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programmes } from "@/content/client";
import { localHref, type Locale } from "@/lib/locale";

export function ProgrammeNetwork({ locale }: { locale: Locale }) {
  return (
    <figure
      className="programme-network"
      aria-label="Twelve programmes connected through NeuroZehn"
    >
      <svg
        className="programme-connections"
        viewBox="0 0 1200 480"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[40, 120, 200, 280, 360, 440].map((y) => (
          <g key={y}>
            <path d={`M 465 ${y} C 535 ${y}, 520 240, 600 240`} />
            <path d={`M 735 ${y} C 665 ${y}, 680 240, 600 240`} />
          </g>
        ))}
      </svg>
      <div className="programme-network-hub">
        <strong>NeuroZehn</strong>
        <span>
          Shared education,
          <br />
          data and ethics
        </span>
      </div>
      {[programmes.slice(0, 6), programmes.slice(6)].map((group, i) => (
        <div className="network-side" key={i}>
          {group.map((programme) => (
            <Link
              href={localHref(`/programmes/${programme.slug}`, locale)}
              key={programme.slug}
            >
              <h3>{programme.title}</h3>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      ))}
      <figcaption>
        One institute. Twelve connected programmes, opening in stages.
      </figcaption>
    </figure>
  );
}
