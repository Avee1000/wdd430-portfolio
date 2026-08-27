import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCardProps } from "./ProjectCard";

export type ProjectProps = ProjectCardProps;

export default function ProjectCard(p: ProjectProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_0_0_rgba(10,10,10,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.12)]">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-lg bg-neutral-900 text-white"
          >
            <span className="font-mono text-xs font-bold">
              {p.title.charAt(0).toUpperCase()}
            </span>
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-neutral-900">
              {p.title}
            </h3>
            {p.type && (
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                {p.type === "opensource" ? "Open source" : "School"}
              </p>
            )}
          </div>
        </div>

        {p.link && (
          <Link
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${p.title}`}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors group-hover:border-neutral-900 group-hover:text-neutral-900"
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        )}
      </header>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-600">
        {p.description}
      </p>

      {p.technologies?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {p.technologies.map((tech) => (
            <li key={tech}>
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      )}

      {p.link && (
        <div className="mt-6 pt-2">
          <Link
            href={p.link}
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
