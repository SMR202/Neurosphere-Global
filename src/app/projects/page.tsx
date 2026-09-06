import { PageIntro, EnquiryBand } from "@/components/editorial";
import { ProjectIndex } from "@/components/project-index";
import { overview } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Projects & Activities",
  overview.projects,
  "/projects",
);
export default function ProjectsPage() {
  return (
    <>
      <PageIntro title="Projects & Activities">
        <p>{overview.projects}</p>
      </PageIntro>
      <ProjectIndex />
      <EnquiryBand />
    </>
  );
}
