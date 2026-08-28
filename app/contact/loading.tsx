export default function Loading() {
  return (
    <div className="container-page py-16 sm:py-20" role="status" aria-label="Loading contact page">
      <section className="mx-auto max-w-3xl animate-pulse space-y-4 text-center"><div className="mx-auto h-3 w-20 rounded bg-muted" /><div className="mx-auto h-9 w-2/3 rounded bg-muted" /><div className="mx-auto h-4 w-4/5 rounded bg-muted" /></section>
      <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-48 animate-pulse rounded-2xl border border-border bg-card p-6"><div className="size-10 rounded-xl bg-muted" /><div className="mt-6 h-4 w-24 rounded bg-muted" /><div className="mt-2 h-4 w-36 rounded bg-muted" /></div>)}</section>
      <section className="mt-14 h-115 animate-pulse rounded-3xl border border-border bg-card p-6 sm:p-10"><div className="h-6 w-40 rounded bg-muted" /><div className="mt-3 h-4 w-64 rounded bg-muted" /></section>
    </div>
  );
}
