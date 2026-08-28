export default function Loading() {
  return (
    <main className="container-page flex-1 py-12 sm:py-20" role="status" aria-label="Loading projects">
      <section className="mx-auto animate-pulse space-y-4 text-center"><div className="mx-auto h-3 w-20 rounded bg-muted" /><div className="mx-auto h-9 w-2/3 max-w-md rounded bg-muted" /><div className="mx-auto h-4 w-4/5 max-w-xl rounded bg-muted" /><div className="mx-auto h-10 w-56 rounded-full bg-muted" /></section>
      <section className="mt-12 animate-pulse"><div className="mb-5 flex justify-between"><div className="h-3 w-24 rounded bg-muted" /><div className="h-3 w-20 rounded bg-muted" /></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <article key={index} className="h-52 rounded-2xl border border-border bg-card p-6"><div className="flex items-center gap-3"><div className="size-9 rounded-lg bg-muted" /><div className="space-y-2"><div className="h-4 w-32 rounded bg-muted" /><div className="h-3 w-20 rounded bg-muted" /></div></div><div className="mt-5 space-y-2"><div className="h-3 w-full rounded bg-muted" /><div className="h-3 w-4/5 rounded bg-muted" /></div></article>)}</div></section>
    </main>
  );
}
