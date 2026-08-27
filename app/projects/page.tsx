import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectCard, {
  type ProjectProps as Project,
} from "@/components/projects";

async function getProjects(): Promise<Project[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(new URL("/api/projects", baseUrl), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch projects");
  const json = await res.json();
  return (json?.data ?? json) as Project[];
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="container-page py-16 sm:py-20">
      <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Projects
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          A complete index of my work
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
          Open‑source projects and school work — every project is sourced from
          the database.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects/create"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Plus className="size-4" aria-hidden />
            New project
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section
        aria-label="All projects"
        className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </section>
    </div>
  );
}
