import { Code2Icon, HeartHandshake } from "lucide-react";
import { volunteerWork } from "@/data/volunteer";

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "lds-missionary": HeartHandshake,
};

export default function ResumeVolunteer() {
  return (
    <section aria-labelledby="volunteer-heading" className="mt-14">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Service
        </p>
        <h2
          id="volunteer-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
        >
          Volunteer work
        </h2>
      </header>
      <ol className="mt-6 space-y-3">
        {volunteerWork.map((role) => {
          const Icon = iconFor[role.id] ?? Code2Icon;
          return (
            <li
              key={role.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-900 text-white"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      {role.startDate} — {role.endDate}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-neutral-900">
                      {role.title}
                    </h3>
                    <p className="text-sm font-medium text-neutral-600">
                      {role.organization} · {role.location}
                    </p>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-600"
                >
                  <span className="font-mono text-xs font-bold">
                    {role.organization.charAt(0).toUpperCase()}
                  </span>
                </span>
              </div>
              <ul className="mt-4 text-sm leading-relaxed text-neutral-600 list-[circle] pl-4">
                {role.description.map((desc) => (
                  <li key={desc} className="marker:text-foreground">
                    <span className="">
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
          );
        })}
      </ol>
    </section>
  );
}
