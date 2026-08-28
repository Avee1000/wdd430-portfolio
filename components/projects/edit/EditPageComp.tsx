import { allSchoolProjects, fetchSchoolProjectsPages } from "@/app/api/route";
import { ProjectProps } from "@/components/projects/edit/EditProjects";
import SearchComp from "./EditSearch";

type PageProps = {
  searchParams?: Promise<{ page?: string }>;
};

async function getProjects(page: number): Promise<ProjectProps[]> {
  const projects = await allSchoolProjects(page);
  return (projects as ProjectProps[]) || [];
}

export default async function Projects(props: PageProps) {
  const searchParams = await props.searchParams;
  console.log(searchParams)
  const page = Number(searchParams?.page) || 1;
  console.log(page)

  const projects = await getProjects(page);
  const pages = await fetchSchoolProjectsPages("");

  return <SearchComp initialProjects={projects} pages={pages} currentPage={page} />;
}