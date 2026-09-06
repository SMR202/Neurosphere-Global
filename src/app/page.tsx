import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextLink, EnquiryBand } from "@/components/editorial";
import { FeaturedProjects } from "@/components/featured-projects";
import { coreDomains } from "@/data/resources";
import { featuredProjects } from "@/data/projects";
import { mission, introduction, explore } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Neuroscience Research & Resources",
  mission,
  "/",
);
export default function HomePage() {
  return (
    <>
      <section className="container hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>Neuroscience</span> <span>research, practical</span>{" "}
            <span>resources, and open</span> <span>collaboration.</span>
          </h1>
          <p>
            For researchers, clinicians, and students working across EEG,
            neuroimaging, neurogenetics, and neuromodulation.
          </p>
          <div className="hero-actions">
            <Button asChild>
              <Link href="/research">
                Explore Research
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <TextLink href="/projects">View Projects</TextLink>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/images/fiber-sphere.png"
            alt=""
            fill
            sizes="(max-width: 700px) 340px, (max-width: 1100px) 46vw, 650px"
            preload
          />
        </div>
      </section>
      <section
        className="container domains-section"
        aria-labelledby="domains-title"
      >
        <h2 id="domains-title">Our research domains</h2>
        <div className="domain-rail">
          {coreDomains.map((domain, index) => (
            <Link
              key={domain.slug}
              href={`/research?domain=${domain.slug}`}
              className="domain-item"
            >
              <span className="domain-number" aria-hidden="true">
                0{index + 1}
              </span>
              <span>{domain.shortTitle}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <section className="container about-section">
        <div>
          <h2>NeuroSphere Global</h2>
          <p className="mission-label">Our mission</p>
          <p className="mission-copy">{mission}</p>
        </div>
        <div className="about-copy">
          <p className="editorial-lead">{introduction[0]}</p>
          <p>{introduction[1]}</p>
        </div>
      </section>
      <section className="research-band" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 id="featured-title">Research in progress</h2>
              <p>{explore[2].description}</p>
            </div>
            <TextLink href="/projects">All Projects</TextLink>
          </div>
          <FeaturedProjects projects={featuredProjects} />
        </div>
      </section>
      <section
        className="container explore-section"
        aria-labelledby="explore-title"
      >
        <h2 id="explore-title">Explore the Site</h2>
        {explore.slice(0, 2).map((entry, index) => (
          <article className="explore-row" key={entry.href}>
            <div className="entry-icon">
              {index === 0 ? (
                <BookOpen aria-hidden="true" />
              ) : (
                <Database aria-hidden="true" />
              )}
            </div>
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              {index === 1 ? (
                <p className="quiet-note">Dataset catalogue coming soon</p>
              ) : null}
            </div>
            <TextLink href={entry.href}>{entry.action}</TextLink>
          </article>
        ))}
      </section>
      <section className="container home-team">
        <div>
          <h2>
            The people behind
            <br />
            NeuroSphere Global
          </h2>
          <p>{explore[3].description}</p>
          <TextLink href="/team">Meet the Team</TextLink>
        </div>
        <div className="team-preview">
          <span className="initials" aria-hidden="true">
            SB
          </span>
          <div>
            <p className="project-status">Lead, NeuroSphere Global</p>
            <h3>Dr. Shahid Bashir, PhD</h3>
            <p>20+ years of international neuroscience research experience.</p>
            <p>210+ peer-reviewed publications.</p>
          </div>
        </div>
      </section>
      <EnquiryBand />
    </>
  );
}
