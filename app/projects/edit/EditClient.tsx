"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import SearchComp from "@/components/projects/edit/EditSearch";

export default function EditClient() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["edit-projects", page],
    queryFn: async () => {
      const res = await fetch(`/api/projects?mode=edit&page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  if (isLoading) {
    return (
      <main className="mx-auto flex w-full min-h-dvh max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-neutral-200 animate-pulse" />
            <div className="h-3 w-48 rounded bg-neutral-200 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto flex w-full min-h-dvh max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-neutral-900">Unable to load projects</p>
            <p className="mt-1 text-sm text-neutral-500">
              Something went wrong. Please check your connection and try again.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <SearchComp
      initialProjects={data?.projects ?? []}
      pages={data?.pages ?? 0}
      currentPage={page}
    />
  );
}
