import DeleteProjects from "@/components/EditProjects";
import { ProjectProps } from "@/components/projects";
import { fetchFilteredSchoolProjects } from "@/app/api/route";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";


type PageProps = {
    searchParams?: Promise<{ query?: string; page?: string }>;
};

async function getProjects(props: PageProps): Promise<ProjectProps[]> {
    // 1. Read the URL search parameters
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    // 2. Fetch only the projects that match the search query and page number
    const projects = await fetchFilteredSchoolProjects(query, currentPage);
    return projects as ProjectProps[];
}

async function ProjectList(props: PageProps) {
    const projects = await getProjects(props);
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
                <DeleteProjects key={project.id} {...project} />
            ))}
        </section>
    );
}

export default async function Projects(props: { searchParams?: Promise<{ query?: string; page?: string }>; }) {

    return (
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex-1 py-5">
                <ProjectList searchParams={props.searchParams} />
            </div>
            <div className="flex w-full justify-center my-8">
                <Pagination searchParams={props.searchParams} />
            </div>
        </main>
    );
}