"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

export function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const initial = searchParams.get("query")?.toString() ?? "";

  const pushQuery = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) params.set("query", term);
    else params.delete("query");
    replace(`${pathname}?${params.toString()}#work`);
  }, 300);

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full sm:max-w-md"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
        <Search className="size-4" aria-hidden />
      </div>
      <input
        key={initial}
        ref={inputRef}
        type="search"
        inputMode="search"
        defaultValue={initial}
        placeholder="Search projects by name, tech, or description…"
        onChange={(e) => pushQuery(e.target.value)}
        aria-label="Search projects"
        className={cn(
          "h-11 w-full rounded-full border border-neutral-200 bg-white pl-10 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400",
          "transition-colors focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 [&::-webkit-search-cancel-button]:appearance-none [&::-ms-clear]:hidden"
        )}
      />
      {initial && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            pushQuery("");
            inputRef.current?.focus();
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </form>
  );
}