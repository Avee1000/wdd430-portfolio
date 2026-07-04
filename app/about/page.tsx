import WorkList from "@/components/WorkList";
import type { Work } from "@/data/workHistory";


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;

async function getWorkHistory(): Promise<Work[]> {
  const res = await fetch(`${baseUrl}/api/work-history`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return (await res.json()) as Work[];
}

export default async function About() {
  let works: Work[] = [];
  let errorMessage: string | null = null;

  try {
    works = await getWorkHistory();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <main className="bg-white container mx-auto px-4 py-12 text-center">
      <h2 className="text-black text-4xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700">
        This about page shares more information about my background and work.
      </p>

      {errorMessage ? (
        <p className="mt-8 text-red" role="alert">
          Could not load work history: {errorMessage}
        </p>
      ) : (
        <div className="mt-8 text-left">
          <WorkList works={works} />
        </div>
      )}
    </main>
  );
}
