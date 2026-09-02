import {
  Code,
  CodeXml,
  Database,
  GitBranch,
  Layers,
  TimelineIcon,
  Timer,
  TrendingUp,
} from "lucide-react";

interface SkillCategory {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Code,
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    icon: Layers,
    label: "Frameworks",
    items: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express"],
  },
  {
    icon: Database,
    label: "Data",
    items: [
      "PostgreSQL",
      "Supabase",
      "Redis",
      "Vercel Postgres",
      "Neon",
      "Firebase",
      "MySQL",
      "PowerBI",
    ],
  },
  {
    icon: GitBranch,
    label: "Tooling",
    items: ["Git", "Vercel", "Figma"],
  },
  {
    icon: Timer,
    label: "Time Tracking",
    items: ["Clockify"],
  },
  {
    icon: TimelineIcon,
    label: "Collaboration & Project Management",
    items: ["Monday", "Trello", "Slack", "Microsoft Teams"],
  },
  {
    icon: CodeXml,
    label: "Development",
    items: ["Git/GitHub", "Netlify", "Render"],
  },
  {
    icon: TrendingUp,
    label: "Productiviy Tools",
    items: ["Microsoft Office Suite (Excel, Word, PowerPoint)", "Google Workspace (Docs, Sheets, Slides)", "Clay"],
  },
];

export default function ResumeSkills() {
  return (
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
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <article
              key={category.label}
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <div className="flex items-center gap-2 text-neutral-900">
                <Icon className="size-4" aria-hidden />
                <h3 className="text-sm font-semibold capitalize">
                  {category.label}
                </h3>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {category.items.map((s) => (
                  <li key={s}>
                    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
