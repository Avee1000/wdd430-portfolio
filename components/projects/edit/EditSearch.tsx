"use client";

import { useState } from "react";
import DeleteProjects, {
  ProjectProps,
} from "@/components/projects/edit/EditProjects";
import SearchInput from "@/components/global/SearchInput";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Pagination from "@/components/global/HomePagination";

interface SearchCompProps {
  initialProjects: ProjectProps[];
  pages: number;
  currentPage: number;
}

export default function SearchComp({ initialProjects, pages, currentPage }: SearchCompProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const filteredProjects = initialProjects.filter((project) =>
    Object.values(project).some((val) =>
      String(val).toLowerCase().includes(query.trim().toLowerCase()),
    ),
  );
console.log(currentPage)
  return (
    <main className="mx-auto flex w-full min-h-dvh max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full flex flex-row justify-between">
        <Link
          href="/projects"
          className="hover:bg-foreground/20 h-full p-2 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="mb-8 w-full max-w-md">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search projects to edit..."
          />
        </div>
      </div>

      <div className="flex-1 py-5">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-neutral-500 py-10">
            No projects found matching "{query}".
          </p>
        ) : (
          <section className="grid gap-4 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <DeleteProjects key={project.id} {...project} />
            ))}
          </section>
        )}
      </div>

      <div className="flex w-full justify-center my-8">
        <Pagination pages={pages} currentPage={currentPage} hrefPrefix="/projects/edit" />
      </div>
    </main>
  );
}
