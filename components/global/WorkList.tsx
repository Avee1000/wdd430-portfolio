import WorkHistory from "./workHistory";
import type { Work } from "@/data/workHistory";

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