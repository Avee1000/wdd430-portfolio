import { redirect } from "next/navigation";

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
  redirect("/?type=school#work");
}