import Projects from "@/components/projects/edit/EditPageComp";

export default async function Edit({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  return <Projects searchParams={searchParams} />;
}