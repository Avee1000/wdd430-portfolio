import WorkList from "@/components/WorkList";
import type { Work } from "@/data/workHistory";
import { workHistory } from "@/data/workHistory";

const works: Work[] = workHistory;

export default async function About() {
  return (
    <main className="bg-white container mx-auto px-4 py-12 text-center">
      <h2 className="text-black text-4xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700">
        This about page shares more information about my background and work.
      </p>
        <div className="mt-8 text-left">
          <WorkList works={works} />
        </div>
    </main>
  );
}
