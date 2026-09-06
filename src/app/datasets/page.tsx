import Link from "next/link";
import { Database } from "lucide-react";
import { datasets } from "@/data/datasets";
import { coreDomains } from "@/data/resources";
import { explore } from "@/data/site";
import { PageIntro, TextLink, ExternalResource } from "@/components/editorial";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Neuroscience Datasets",
  explore[1].description,
  "/datasets",
);
export default function DatasetsPage() {
  return (
    <>
      <PageIntro title="Neuroscience datasets">
        <p>{explore[1].description}</p>
      </PageIntro>
      {datasets.length ? (
        <section
          className="container dataset-list"
          aria-label="Dataset catalogue"
        >
          {datasets.map((dataset) => (
            <article key={dataset.slug}>
              <h2>{dataset.name}</h2>
              <p>{dataset.description}</p>
              <dl>
                {dataset.domain ? (
                  <div>
                    <dt>Research domain</dt>
                    <dd>{dataset.domain}</dd>
                  </div>
                ) : null}
                {dataset.modality ? (
                  <div>
                    <dt>Modality</dt>
                    <dd>{dataset.modality}</dd>
                  </div>
                ) : null}
                {dataset.source ? (
                  <div>
                    <dt>Source</dt>
                    <dd>{dataset.source}</dd>
                  </div>
                ) : null}
                {dataset.accessRequirements ? (
                  <div>
                    <dt>Access requirements</dt>
                    <dd>{dataset.accessRequirements}</dd>
                  </div>
                ) : null}
              </dl>
              {dataset.accessUrl ? (
                <ExternalResource href={dataset.accessUrl}>
                  Access dataset
                </ExternalResource>
              ) : (
                <p>Access details to be provided.</p>
              )}
            </article>
          ))}
        </section>
      ) : (
        <section className="dataset-empty">
          <div className="container">
            <Database
              className="dataset-symbol"
              aria-hidden="true"
              strokeWidth={1}
            />
            <Empty>
              <EmptyHeader>
                <EmptyTitle>The dataset catalogue is coming soon.</EmptyTitle>
                <EmptyDescription>
                  Dataset entries and access details have not yet been provided.
                  Explore the research resources in the meantime, or prepare a
                  dataset enquiry.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button asChild>
                  <Link href="/research">Browse Resources</Link>
                </Button>
                <TextLink href="/contact?type=Dataset%2Fresource%20enquiry">
                  Dataset enquiry
                </TextLink>
              </EmptyContent>
            </Empty>
          </div>
        </section>
      )}
      <section className="container dataset-domains">
        <h2>Research domains</h2>
        <div>
          <p>Explore our core areas of neuroscience research.</p>
          <div className="domain-links">
            {coreDomains.map((d) => (
              <Link key={d.slug} href={`/research?domain=${d.slug}`}>
                {d.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
