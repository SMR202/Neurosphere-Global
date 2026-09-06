import { EnquiryForm } from "@/components/enquiry-form";
import { deliveryConfiguration } from "@/lib/enquiry-delivery";
import { enquiryTypes } from "@/lib/enquiry";
import { domains } from "@/data/resources";
import { explore } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contact / Research Enquiry",
  explore[4].description,
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const type =
    typeof params.type === "string" &&
    enquiryTypes.includes(params.type as (typeof enquiryTypes)[number])
      ? params.type
      : "Research guidance";
  const area =
    typeof params.area === "string" &&
    domains.some((d) => d.slug === params.area)
      ? params.area
      : "";
  const topic =
    typeof params.topic === "string" ? params.topic.slice(0, 200) : "";
  return (
    <div className="container contact-layout">
      <div className="contact-intro">
        <h1>Contact / Research Enquiry</h1>
        <p>{explore[4].description}</p>
        <div className="contact-help">
          <h2>Before you write</h2>
          <p>
            Tell us about your research area and the guidance or collaboration
            you have in mind.
          </p>
        </div>
      </div>
      <EnquiryForm
        key={`${type}-${area}-${topic}`}
        deliveryEnabled={!!deliveryConfiguration()}
        initialType={type}
        initialArea={area}
        initialTopic={topic}
      />
    </div>
  );
}
