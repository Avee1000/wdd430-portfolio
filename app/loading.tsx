export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
      <section className="space-y-4 mb-10">
        <div className="h-10 w-3/5 rounded-md bg-slate-200" />
        <div className="h-4 w-full rounded-md bg-slate-200" />
        <div className="h-4 w-5/6 rounded-md bg-slate-200" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <article key={index} className="space-y-4 rounded-3xl bg-slate-200 p-6">
            <div className="h-6 w-2/3 rounded-md bg-slate-300" />
            <div className="h-4 w-full rounded-md bg-slate-300" />
            <div className="h-4 w-4/5 rounded-md bg-slate-300" />
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 rounded-full bg-slate-300" />
              <div className="h-8 w-16 rounded-full bg-slate-300" />
              <div className="h-8 w-24 rounded-full bg-slate-300" />
            </div>
            <div className="h-10 w-full rounded-full bg-slate-300" />
          </article>
        ))}
      </section>
    </main>
  );
}
