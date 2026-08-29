export default function Loading() {
  return (
    <div
      className="container-page min-h-225 py-16 sm:py-20"
      role="status"
      aria-label="Loading about"
    >
      <section className="mx-auto mb-12 max-w-3xl animate-pulse space-y-4 text-center">
        <div className="mx-auto h-3 w-24 rounded-full bg-muted" />
        <div className="mx-auto h-9 w-2/3 rounded-md bg-muted" />
        <div className="mx-auto h-4 w-4/5 rounded-md bg-muted" />
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-border bg-card p-6"
          >
            <div className="size-5 rounded bg-muted" />
            <div className="mt-4 h-4 w-1/2 rounded bg-muted" />
            <div className="mt-2 h-3 w-full rounded bg-muted" />
            <div className="mt-1 h-3 w-4/5 rounded bg-muted" />
          </div>
        ))}
      </section>
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
              <div className="size-9 rounded-lg bg-muted" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-5/6 rounded bg-muted" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
