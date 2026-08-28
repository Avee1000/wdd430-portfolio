"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pages: number;
  currentPage: number;
  query?: string;
  type?: string;
  hrefPrefix?: string;
}

export default function Pagination({
  pages,
  currentPage,
  query = "",
  type = "",
  hrefPrefix = "/",
}: PaginationProps) {
  if (!pages || pages <= 1) return null;

  // Safe URL generator that correctly handles existing query parameters
  const pageHref = (n: number) => {
    const hasParams = hrefPrefix.includes("?");
    const separator = hasParams ? "&" : "?";
    const params = new URLSearchParams();

    params.set("page", n.toString());
    if (query.trim()) params.set("query", query.trim());
    if (type.trim()) params.set("type", type.trim());

    // If hrefPrefix already has query params, append using '&'
    if (hasParams) {
      return `${hrefPrefix}&${params.toString()}`;
    }
    return `${hrefPrefix}?${params.toString()}`;
  };

  // Helper to generate a truncated page list with dynamic ranges
  const getVisiblePages = () => {
    const total = pages;
    const current = currentPage;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }

    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pages;

  return (
    <nav
      aria-label="Pagination"
      className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-sm"
    >
      {/* Previous Button */}
      <Link
        aria-label="Previous page"
        href={isFirstPage ? "#" : pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : undefined}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
          isFirstPage && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </Link>

      {/* Page Numbers */}
      {getVisiblePages().map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex size-9 items-center justify-center text-neutral-400"
            >
              <MoreHorizontal className="size-4" aria-hidden />
            </span>
          );
        }

        const pageNum = page as number;
        const active = currentPage === pageNum;

        return (
          <Link
            key={pageNum}
            href={pageHref(pageNum)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
              active
                ? "bg-neutral-900 text-white"
                : "text-neutral-700 hover:bg-neutral-100"
            )}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next Button */}
      <Link
        aria-label="Next page"
        href={isLastPage ? "#" : pageHref(Math.min(pages, currentPage + 1))}
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : undefined}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
          isLastPage && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" aria-hidden />
      </Link>
    </nav>
  );
}