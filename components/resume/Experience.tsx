import { workHistory } from "@/data/workHistory";

export default function ResumeExperience() {
  return (
    <section aria-labelledby="experience-heading" className="mt-14">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Experience
        </p>
        <h2
          id="experience-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
        >
          Recent roles
        </h2>
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
            <ul className="mt-3 text-sm leading-relaxed text-neutral-600 pl-4 list-[circle]">
              {role.description.map((desc) => (
                <li key={desc} className="marker:text-foreground">
                  <span>
                    {desc}
                  </span>
                </li>
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
  );
}
