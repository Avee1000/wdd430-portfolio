import Link from "next/link";
import { ArrowRight, Download, GraduationCap, Wrench } from "lucide-react";
import { workHistory } from "@/data/workHistory";

const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  frameworks: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express"],
  data: ["PostgreSQL", "Supabase", "Redis", "Vercel Postgres"],
  tooling: ["Git", "Vercel", "Figma", "Linear", "Playwright"],
};

export default function Resume() {
  return (
    <div className="container-page py-16 sm:py-20">
      <section
        aria-labelledby="resume-heading"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Resume
        </p>
        <h1
          id="resume-heading"
          className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          A snapshot of experience and skills
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
          Engineering experience with a focus on the modern web, design
          systems, and data‑backed products.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Download className="size-4" aria-hidden />
            Request a copy
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            See projects
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Summary */}
      <section
        aria-labelledby="summary-heading"
        className="mt-14 grid gap-4 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2
            id="summary-heading"
            className="text-base font-semibold text-neutral-900"
          >
            Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Software engineer with experience shipping full‑stack web
            applications. I enjoy working across the stack — from product UI to
            data models — and care deeply about accessibility, performance, and
            maintainability.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold text-neutral-900">Focus</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
            <li>Full‑stack TypeScript</li>
            <li>Design systems &amp; accessibility</li>
            <li>Data modeling &amp; APIs</li>
          </ul>
        </div>
      </section>

      {/* Experience timeline */}
      <section aria-labelledby="experience-heading" className="mt-14">
        <header className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
            >
              Recent roles
            </h2>
          </div>
        </header>
        <ol className="mt-6 space-y-3">
          {workHistory.map((role) => (
            <li
              key={role.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
            >
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    {role.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-600">
                    {role.company}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {role.startDate} — {role.endDate}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {role.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {role.skills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-heading" className="mt-14">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
          >
            Tools I reach for
          </h2>
        </header>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items]) => (
            <article
              key={category}
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <div className="flex items-center gap-2 text-neutral-900">
                <Wrench className="size-4" aria-hidden />
                <h3 className="text-sm font-semibold capitalize">
                  {category}
                </h3>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <li key={s}>
                    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Education placeholder */}
      <section aria-labelledby="education-heading" className="mt-14">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Education
          </p>
          <h2
            id="education-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
          >
            Academic background
          </h2>
        </header>
        <article className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-5 text-neutral-900" aria-hidden />
            <div>
              <h3 className="text-base font-semibold text-neutral-900">
                BS in Software Engineering (in progress)
              </h3>
              <p className="text-sm text-neutral-600">
                BYU–Idaho · Online Pathway
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
