'use client'

import {
  Briefcase,
  HeartHandshake,
  GraduationCap,
  Code,
  CodeXml,
  Database,
  GitBranch,
  Layers,
  Timer,
  TimelineIcon,
  TrendingUp,
  Zap,
  Globe,
  Smartphone,
  Wrench,
} from "lucide-react"
import { type WorkEntry, type EducationEntry, type VolunteerEntry, type SkillCategoryEntry } from "@/lib/resume/schema"

interface ResumePreviewProps {
  work: WorkEntry[]
  education: EducationEntry[]
  volunteer: VolunteerEntry[]
  skills: SkillCategoryEntry[]
}

const iconFor = (name: string | undefined) => {
  if (!name) return Code
  const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    Briefcase,
    HeartHandshake,
    GraduationCap,
    Code,
    CodeXml,
    Database,
    GitBranch,
    Layers,
    Timer,
    TimelineIcon,
    TrendingUp,
    Zap,
    Globe,
    Smartphone,
    Wrench,
  }
  return icons[name] ?? Code
}

export default function ResumePreview({ work, education, volunteer, skills }: ResumePreviewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <section aria-labelledby="resume-heading" className="flex flex-col items-center text-center">
        <h1 id="resume-heading" className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Resume Preview
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
          This is how your resume will look. Review it below before submitting.
        </p>
      </section>

      {work.length > 0 && (
        <section aria-labelledby="experience-heading" className="mt-14">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Experience</p>
            <h2 id="experience-heading" className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Recent roles
            </h2>
          </header>
          <ol className="mt-6 space-y-3">
            {work.map((role, i) => (
              <li key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300">
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">{role.title}</h3>
                    <p className="text-sm font-medium text-neutral-600">{role.company}</p>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    {role.startDate} — {role.endDate}
                  </p>
                </div>
                <ul className="mt-3 text-sm leading-relaxed text-neutral-600 pl-4 list-[circle]">
                  {role.description.map((desc, j) => (
                    <li key={j} className="marker:text-foreground"><span>{desc}</span></li>
                  ))}
                </ul>
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
      )}

      {skills.length > 0 && (
        <section aria-labelledby="skills-heading" className="mt-14">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Skills</p>
            <h2 id="skills-heading" className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Tools I reach for
            </h2>
          </header>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((category) => {
              const Icon = iconFor(category.icon)
              return (
                <article key={category.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <div className="flex items-center gap-2 text-neutral-900">
                    <Icon className="size-4" aria-hidden />
                    <h3 className="text-sm font-semibold capitalize">{category.title}</h3>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {category.skills.map((s) => (
                      <li key={s}>
                        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {volunteer.length > 0 && (
        <section aria-labelledby="volunteer-heading" className="mt-14">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Service</p>
            <h2 id="volunteer-heading" className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Volunteer work
            </h2>
          </header>
          <ol className="mt-6 space-y-3">
          {volunteer.map((role, i) => {
            const Icon = HeartHandshake
            return (
                <li key={i} className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <div className="flex items-start gap-3">
                    <span aria-hidden className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-900 text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                        {role.startDate} — {role.endDate}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-neutral-900">{role.title}</h3>
                      <p className="text-sm font-medium text-neutral-600">{role.subtitle} · {role.location}</p>
                    </div>
                  </div>
                  <ul className="mt-4 text-sm leading-relaxed text-neutral-600 list-disc pl-4">
                    {role.description.map((desc, j) => (
                      <li key={j} className="marker:text-foreground"><span>{desc}</span></li>
                    ))}
                  </ul>
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
              )
            })}
          </ol>
        </section>
      )}

      {education.length > 0 && (
        <section aria-labelledby="education-heading" className="mt-14">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Education</p>
            <h2 id="education-heading" className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Academic background
            </h2>
          </header>
          <ol className="mt-6 space-y-3">
            {education.map((edu, i) => (
              <li key={i} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="size-5 text-neutral-900 mt-0.5" aria-hidden />
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">{edu.title}</h3>
                    <p className="text-sm text-neutral-600">{edu.subtitle}</p>
                    {edu.location && <p className="text-sm text-neutral-500">{edu.location}</p>}
                    <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      {edu.startDate} — {edu.endDate}
                    </p>
                  </div>
                </div>
                {edu.description && edu.description.length > 0 && (
                  <ul className="mt-4 text-sm leading-relaxed text-neutral-600 list-disc pl-4">
                    {edu.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}
