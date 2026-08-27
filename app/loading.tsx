export default function Loading() {
  return (
    <div
      className="container-page py-16 sm:py-20"
      role="status"
      aria-label="Loading content"
    >
      <section className="mx-auto mb-12 max-w-3xl animate-pulse space-y-4 text-center">
        <div className="mx-auto h-3 w-24 rounded-full bg-neutral-200" />
        <div className="mx-auto h-9 w-2/3 rounded-md bg-neutral-200" />
        <div className="mx-auto h-4 w-4/5 rounded-md bg-neutral-200" />
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="animate-pulse rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-neutral-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 rounded bg-neutral-200" />
                <div className="h-3 w-1/3 rounded bg-neutral-200" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded bg-neutral-200" />
              <div className="h-3 w-5/6 rounded bg-neutral-200" />
              <div className="h-3 w-4/6 rounded bg-neutral-200" />
            </div>
            <div className="mt-5 flex gap-1.5">
              <div className="h-6 w-16 rounded-full bg-neutral-200" />
              <div className="h-6 w-12 rounded-full bg-neutral-200" />
              <div className="h-6 w-20 rounded-full bg-neutral-200" />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
