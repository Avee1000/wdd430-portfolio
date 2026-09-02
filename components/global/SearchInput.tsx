'use client'

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  actionPath?: string;
  onSearch?: (query: string) => void; // 1. Changed from string to a callback function
}

export default function SearchInput({
  defaultValue = "",
  placeholder = "Search projects...",
  className,
  actionPath = "/projects/edit",
  onSearch
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("query") as string;
    
    startTransition(() => {
      if (searchQuery.trim()) {
        router.push(`${actionPath}?query=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        router.push(actionPath);
      }
    });
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch(""); // Clear parent data as well if needed
    startTransition(() => {
      router.push(actionPath);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
          aria-hidden
        />
        <input
          type="text"
          name="query"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-10 w-full rounded-full border border-neutral-200 bg-white pl-10 pr-16 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
        {isPending ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner className="size-4" />
          </div>
        ) : query ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </div>
    </form>
  );
}