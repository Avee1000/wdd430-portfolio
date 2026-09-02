"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectCard, { type ProjectCardProps as Project } from "@/components/global/ProjectCard";
import Pagination from "@/components/global/Pagination";
import SearchInput from "@/components/global/SearchInput";

export default function Projects() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["school-projects", query, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("mode", "projects");
      if (query) params.set("query", query);
      params.set("page", String(page));

      const res = await fetch(`/api/projects?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  const projects = (data?.projects ?? []) as Project[];
  const pages = data?.pages ?? 0;

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
          Open‑source projects and school work. Every project is sourced from
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
            href="/projects/edit"
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
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="h-52 animate-pulse rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-neutral-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-neutral-200" />
                    <div className="h-3 w-20 rounded bg-neutral-200" />
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="h-3 w-full rounded bg-neutral-200" />
                  <div className="h-3 w-4/5 rounded bg-neutral-200" />
                </div>
              </article>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-sm font-medium text-neutral-900">Unable to load projects</p>
            <p className="mt-1 text-sm text-neutral-500">
              Something went wrong. Please check your connection and try again.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id ?? project.title} {...project} />
            ))}
          </div>
        )}
      </section>

      <div className="mt-10 flex justify-center">
        <Pagination pages={pages} currentPage={page} query={query} />
      </div>
    </div>
  );
}
