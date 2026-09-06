import { PageIntro, EnquiryBand } from "@/components/editorial";
import { ResourceLibrary } from "@/components/resource-library";
import { overview } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Research Guidance & Resources",
  overview.resources,
  "/research",
);
export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialDomain =
    typeof params.domain === "string" ? params.domain : "all";
  return (
    <>
      <PageIntro title="Research Guidance & Resources">
        <p>{overview.resources}</p>
      </PageIntro>
      <ResourceLibrary initialDomain={initialDomain} />
      <EnquiryBand />
    </>
  );
}
