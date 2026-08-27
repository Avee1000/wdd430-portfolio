"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

export function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(
    searchParams.get("query")?.toString() ?? ""
  );

  // Keep controlled value in sync if URL changes externally
  useEffect(() => {
    const external = searchParams.get("query")?.toString() ?? "";
    if (external !== value) setValue(external);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const pushQuery = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) params.set("query", term);
    else params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
        <Search className="size-4" aria-hidden />
      </div>
      <input
        ref={inputRef}
        type="search"
        inputMode="search"
        placeholder="Search projects by name, tech, or description…"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          pushQuery(e.target.value);
        }}
        aria-label="Search projects"
        className={cn(
          "h-11 w-full rounded-full border border-neutral-200 bg-white pl-10 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400",
          "transition-colors focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        )}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue("");
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
