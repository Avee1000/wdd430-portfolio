export default function Loading() {
  return (
    <div role="status" aria-label="Loading content">
      <section className="border-b border-border bg-background">
        <div className="container-page py-16 sm:py-24">
          <div className="mx-auto flex max-w-3xl animate-pulse flex-col items-center gap-5 text-center">
            <div className="h-6 w-64 rounded-full bg-muted" />
            <div className="h-20 w-full max-w-2xl rounded-lg bg-muted" />
            <div className="h-12 w-full max-w-xl rounded bg-muted" />
            <div className="h-10 w-64 rounded-full bg-muted" />
            <div className="mt-8 h-28 w-full max-w-3xl rounded-2xl bg-muted" />
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-background">
        <div className="container-page py-16 sm:py-20">
          <div className="mb-8 flex animate-pulse flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <div className="h-3 w-28 rounded bg-muted" />
              <div className="h-8 w-56 rounded bg-muted" />
              <div className="h-4 w-72 rounded bg-muted" />
            </div>
            <div className="h-8 w-36 rounded-full bg-muted" />
          </div>
          <div className="mb-8 h-11 w-full max-w-md animate-pulse rounded-full bg-muted" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="h-52 animate-pulse rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-muted" />
                    <div className="h-3 w-20 rounded bg-muted" />
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-3 w-4/5 rounded bg-muted" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
