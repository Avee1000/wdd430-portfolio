import { Suspense } from 'react';
import ProjectCard from "@/components/projects";
import { ProjectProps as pro } from "@/components/projects";
import SchoolProjectList from "@/components/ui/school-project-list";

async function getProjects() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/projects?type=school`, { cache: 'no-store' });

  if (!res.ok) throw new Error("Failed to fetch projects");


  const json = await res.json();
  return json?.data ?? json;
}

// 1. Move the data fetching into this child component
async function FetchedProjectList() {
  const projects: pro[] = await getProjects();

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {projects.map((project: pro) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  );
}

export default async function Projects() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
      <section className="text-center py-4">
        <h1 className="text-black text-4xl font-bold mb-4">My Projects</h1>
      </section>
      <Suspense fallback={<SchoolProjectList />}>
        <FetchedProjectList />            
      </Suspense>
    </main>
  );
}