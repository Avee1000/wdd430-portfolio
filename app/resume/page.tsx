export default function Resume() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-black text-4xl font-bold mb-4">Resume</h1>
        <p className="text-lg text-gray-700">A clean overview of experience, skills, and education.</p>
      </section>

      <section className="space-y-8">
        <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Summary</h2>
          <p className="text-gray-700">This section will cover professional summary, strengths, and career goals.</p>
        </article>

        <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Experience</h2>
          <ul className="space-y-4 text-gray-700">
            <li>Position, Company, Date range</li>
            <li>Position, Company, Date range</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Skills</h2>
          <p className="text-gray-700">A list of technical skills and tools used across projects and work history.</p>
        </article>
      </section>
    </main>
  );
}
