export default function Loading() {
  return (
    <main className="container-page flex min-h-[600px] flex-1 items-center justify-center py-16" role="status" aria-label="Loading project filter">
      <div className="flex animate-pulse flex-col items-center gap-3"><div className="size-8 rounded-full bg-muted" /><div className="h-4 w-40 rounded bg-muted" /></div>
    </main>
  );
}
