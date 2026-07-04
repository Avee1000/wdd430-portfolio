import WorkHistory from "./workHistory";

interface Work {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

interface WorkListProps {
  works: Work[];
}

export default function WorkList({ works }: WorkListProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {works.map((work) => (
        <WorkHistory key={work.title} {...work} />
      ))}
    </section>
  );
}