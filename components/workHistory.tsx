import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface WorkHistoryProps {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export default function WorkHistory({
  title,
  company,
  startDate,
  endDate,
  description,
  skills,
}: WorkHistoryProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.12)]">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            {startDate} — {endDate}
          </p>
          <h3 className="mt-1 text-base font-semibold text-neutral-900">
            {title}
          </h3>
          <p className="text-sm font-medium text-neutral-600">{company}</p>
        </div>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-900 text-white"
        >
          <span className="font-mono text-xs font-bold">
            {company.charAt(0).toUpperCase()}
          </span>
        </span>
      </header>

      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>

      {skills?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <li key={skill}>
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 pt-2">
        <Link
          href="/resume"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
        >
          View full resume
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
