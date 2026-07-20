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
        <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
            <div className="py-5">
            <ProjectList searchParams={props.searchParams} />
            </div>
            <div className="w-full flex justify-center my-8">
                <Pagination searchParams={props.searchParams} />
            </div>
        </main>
    );
}