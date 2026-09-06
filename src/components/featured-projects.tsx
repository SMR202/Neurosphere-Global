import type { Project } from "@/data/types";
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="featured-projects">
      {projects.map((project) => (
        <article key={project.slug} id={project.slug}>
          <p className="project-status">{project.status}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </article>
      ))}
    </div>
  );
}
