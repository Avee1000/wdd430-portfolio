export default function Loading() {
  return (
    <div className="container-page py-16 sm:py-20" role="status" aria-label="Loading resume">
      <section className="mx-auto max-w-3xl animate-pulse space-y-4 text-center"><div className="mx-auto h-3 w-20 rounded bg-muted" /><div className="mx-auto h-9 w-2/3 rounded bg-muted" /><div className="mx-auto h-4 w-4/5 rounded bg-muted" /></section>
      <section className="mt-14 grid gap-4 lg:grid-cols-3"><div className="h-36 animate-pulse rounded-2xl border border-border bg-card p-6 lg:col-span-2" /><div className="h-36 animate-pulse rounded-2xl border border-border bg-card p-6" /></section>
      <section className="mt-14 space-y-3">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-2xl border border-border bg-card p-6" />)}</section>
    </div>
  );
}
