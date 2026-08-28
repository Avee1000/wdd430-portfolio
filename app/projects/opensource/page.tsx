import { redirect } from "next/navigation";

async function getProjects() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects?type=opensource`, { cache: 'no-store' });

    if (!res.ok) throw new Error("Failed to fetch projects");
    const json = await res.json();
    return json?.data ?? json;
}

export function ProjectList({ projects }: { projects: pro[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  );
}

export default async function Projects() {
  redirect("/?type=opensource#work");
}