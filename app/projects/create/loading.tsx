export default function Loading() {
  return (
    <main className="container-page flex flex-1 items-start justify-center py-10 sm:py-16" role="status" aria-label="Loading project form">
      <div className="w-full max-w-2xl animate-pulse rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="border-b border-border pb-6">
          <div className="h-3 w-32 rounded bg-muted" />
          <div className="mt-3 h-8 w-56 rounded bg-muted" />
          <div className="mt-3 h-4 w-full max-w-md rounded bg-muted" />
        </div>
        <div className="mt-8 space-y-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-11 w-full rounded-xl bg-muted" />
            </div>
          ))}
          <div className="flex justify-end pt-2"><div className="h-10 w-32 rounded-full bg-muted" /></div>
        </div>
      </div>
    </main>
  );
}
