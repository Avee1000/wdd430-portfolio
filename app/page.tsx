import ProjectList from "@/components/ProjectList";


async function getProjects() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(new URL('/api', baseUrl), { cache: 'no-store' });


    if (!res.ok) throw new Error("Failed to fetch projects");

  const json = await res.json();
  return json?.data ?? json;
}

export  default async function Home() { 

  const projects = await getProjects();
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
      <section className="text-center py-12">
        <h1 className="text-black text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I&apos;m a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}