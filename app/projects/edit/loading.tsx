export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading project editor"
    >
      <section className="animate-pulse">
        <div className="w-full flex flex-row justify-between">
          <div className="h-11 w-11 rounded-full bg-muted"/>
          <div className="mb-8 h-11 w-full max-w-md rounded-full bg-muted" />
        </div>
        <div className="py-5">
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <article
                key={index}
                className="min-h-59 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="size-9 shrink-0 rounded-lg bg-muted" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/4 rounded bg-muted" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-3 w-5/6 rounded bg-muted" />
                  <div className="h-3 w-2/3 rounded bg-muted" />
                </div>
                <div className="mt-5 flex gap-1.5">
                  <div className="h-6 w-16 rounded-full bg-muted" />
                  <div className="h-6 w-20 rounded-full bg-muted" />
                  <div className="h-6 w-14 rounded-full bg-muted" />
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="flex justify-center py-8">
          <div className="h-10 w-48 rounded-full bg-muted" />
        </div>
      </section>
    </main>
  );
}
