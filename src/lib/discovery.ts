import type { ResearchDomain } from "@/data/types";
export function filterDomains(
  domains: ResearchDomain[],
  selected: string,
  query: string,
) {
  const term = query.trim().toLowerCase();
  return domains
    .filter((d) => selected === "all" || d.slug === selected)
    .map((domain) => {
      if (
        !term ||
        `${domain.title} ${domain.description}`.toLowerCase().includes(term)
      )
        return domain;
      return {
        ...domain,
        resources: domain.resources.filter((r) =>
          `${r.title} ${r.type} ${r.parent ?? ""} ${r.url}`
            .toLowerCase()
            .includes(term),
        ),
        guidance: domain.guidance.filter((g) => g.toLowerCase().includes(term)),
      };
    })
    .filter((d) => d.resources.length > 0 || d.guidance.length > 0);
}
