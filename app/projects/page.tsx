import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectCard, { type ProjectCardProps as Project } from "@/components/ProjectCard";
import { fetchFilteredSchoolProjects } from "@/app/api/route";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";

async function getProjects(query: string, page: number): Promise<Project[]> {
  return fetchFilteredSchoolProjects(query, page);
}

export default async function Projects({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const page = Math.max(1, Number(params?.page) || 1);
  const projects = await getProjects(query, page);

  return (
    <div className="container-page py-16 sm:py-20">
      <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Projects
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Work worth exploring
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
            Edit projects
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-10 w-full max-w-md">
        <SearchInput defaultValue={query} placeholder="Search projects..." actionPath="/projects" />
      </div>

      <section aria-label="All projects" className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id ?? project.title} {...project} />
          ))}
        </div>
      </section>

      <div className="mt-10 flex justify-center">
        <Pagination searchParams={searchParams} />
      </div>
    </div>
  );
}
