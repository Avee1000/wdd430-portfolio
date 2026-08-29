import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/modern-ui/tooltip";

export interface ProjectCardProps {
  id?: string | number;
  title: string;
  description: string;
  technologies: string[];
  type?: "opensource" | "school";
  link?: string;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  type,
  link,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_0_0_rgba(10,10,10,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.12)]",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-lg bg-neutral-900 text-white"
          >
            <span className="font-mono text-xs font-bold">
              {title.charAt(0).toUpperCase()}
            </span>
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-neutral-900">
              {title}
            </h3>
            {type && (
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                {type === "opensource" ? "Open source" : "School"}
              </p>
            )}
          </div>
        </div>

        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title}`}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors group-hover:border-neutral-900 group-hover:text-neutral-900"
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        )}
      </header>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="mt-4 min-h-10 h-11 line-clamp-2 text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-background border border-muted-foreground/50"
          >
            <p className="wrap-break-word max-w-md h-auto text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {technologies?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <li key={tech}>
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      )}

      {link && (
        <div className="mt-6 pt-2">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            View project
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </article>
  );
}
