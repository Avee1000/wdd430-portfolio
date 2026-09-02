"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteProjects, { ProjectProps } from "@/components/projects/edit/EditProjects";
import Pagination from "@/components/global/Pagination";

export default function Projects() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["delete-projects", query, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("mode", "projects");
      if (query) params.set("query", query);
      params.set("page", String(currentPage));

      const res = await fetch(`/api/projects?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  const projects = (data?.projects ?? []) as ProjectProps[];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex-1 py-5">
        {isLoading ? (
          <section className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <article key={i} className="h-40 animate-pulse rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="space-y-2">
                  <div className="h-4 w-48 rounded bg-neutral-200" />
                  <div className="h-3 w-32 rounded bg-neutral-200" />
                </div>
              </article>
            ))}
          </section>
        ) : error ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-sm font-medium text-neutral-900">Unable to load projects</p>
            <p className="mt-1 text-sm text-neutral-500">
              Something went wrong. Please check your connection and try again.
            </p>
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <DeleteProjects key={project.id} {...project} />
            ))}
          </section>
        )}
      </div>
      <div className="flex w-full justify-center my-8">
        <Pagination pages={data?.pages ?? 0} currentPage={currentPage} query={query} />
      </div>
    </main>
  );
}
