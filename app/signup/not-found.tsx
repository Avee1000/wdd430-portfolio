import Link from "next/link";
import { Home, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] h-full items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900"
        >
          <Home className="size-4" aria-hidden />
          Back to home
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <ShieldAlert className="size-8 text-neutral-500" aria-hidden />
            </div>
            <h1 className="mt-6 text-6xl font-bold tracking-tight text-neutral-900 sm:text-7xl">
              403
            </h1>
            <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-900">
              Access Denied
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              This area is restricted. Only administrators can access this
              page.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Home className="size-4" aria-hidden />
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}
