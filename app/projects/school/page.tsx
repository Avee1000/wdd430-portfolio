import ProjectCard from "@/components/projects";
import { ProjectProps as pro } from "@/components/projects";

async function getProjects() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects?type=school`, { cache: 'no-store' });

    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
}

interface ProjectCardProps {
  projects: pro[];
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
    const projects = await getProjects();

    return (
        <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
            <section className="text-center py-4">
                <h1 className="text-black text-4xl font-bold mb-4">My Projects</h1>
            </section>
            <ProjectList projects={projects} />
        </main>
    );
}