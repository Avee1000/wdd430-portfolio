import ProjectList from "@/components/ProjectList";
import { fetchFilteredProjects } from "./api/route";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";


// async function getProjects() {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(new URL('/api', baseUrl), { cache: 'no-store' });

//   if (!res.ok) throw new Error("Failed to fetch projects");

//   const json = await res.json();
//   return json?.data ?? json;
// }


// The Page component itself receives the searchParams props!
export default async function Home(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  // 1. Read the URL search parameters
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // 2. Fetch only the projects that match the search query and page number
  const projects = await fetchFilteredProjects(query, currentPage);

  // 3. Render the page using those filtered projects
  return (
    <div className="flex-1 ">

      <main className="max-w-4xl mx-auto px-4 py-12 w-full">
        <section className="text-center py-12">
          <h1 className="text-black text-4xl font-bold mb-4">My Portfolio</h1>
          <p className="text-lg text-gray-700">
            I&apos;m a full-stack developer learning Next.js and React. Here are some of my recent projects.
          </p>
        </section>

        {/* The ProjectList now receives the filtered data! */}
        <ProjectList projects={projects} />
        <div className="w-full flex justify-center my-8">
          <Suspense fallback={<Spinner data-icon='inline-end' className="text-black" />}>
            <Pagination searchParams={props.searchParams} />
          </Suspense>        </div>
      </main>
    </div>
  );
}