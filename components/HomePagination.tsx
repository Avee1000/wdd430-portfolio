import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchProjectsPages } from "@/app/api/route";

interface PaginationProps {
  searchParams?: Promise<{ query?: string; page?: string; type?: string }>;
}

export default async function Pagination({ searchParams }: PaginationProps) {
  const params = (await searchParams) ?? {};
  const query = params.query ?? "";
  const type = params.type === "opensource" || params.type === "school" ? params.type : undefined;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const pages = await fetchProjectsPages(query, type);

  if (!pages || pages <= 1) return null;

  const pageHref = (n: number) =>
    `/?page=${n}${query ? `&query=${encodeURIComponent(query)}` : ""}${type ? `&type=${type}` : ""}#work`;

  return (
    <nav
      aria-label="Pagination"
      className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-sm"
    >
      <Link
        aria-label="Previous page"
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage <= 1}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
          currentPage <= 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </Link>
      {Array.from({ length: pages }).map((_, i) => {
        const n = i + 1;
        const active = currentPage === n;
        return (
          <Link
            key={n}
            href={pageHref(n)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
              active
                ? "bg-neutral-900 text-white"
                : "text-neutral-700 hover:bg-neutral-100"
            )}
          >
            {n}
          </Link>
        );
      })}
      <Link
        aria-label="Next page"
        href={pageHref(Math.min(pages, currentPage + 1))}
        aria-disabled={currentPage >= pages}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
          currentPage >= pages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" aria-hidden />
      </Link>
    </nav>
  );
}
