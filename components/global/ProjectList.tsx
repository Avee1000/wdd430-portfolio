import ProjectCard, { type ProjectCardProps } from "./ProjectCard";

interface ProjectListProps {
  projects: ProjectCardProps[];
  emptyState?: React.ReactNode;
}

export default function ProjectList({ projects, emptyState }: ProjectListProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-neutral-900">No projects yet</p>
        <p className="mt-1 text-sm text-neutral-500">
          Try a different search, or check back soon.
        </p>
        {emptyState}
      </div>
    );
  }

  return (
    <section
      aria-label="Projects"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id ?? project.title}
          {...project}
        />
      ))}
    </section>
  );
}
