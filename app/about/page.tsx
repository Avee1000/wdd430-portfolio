import Link from "next/link";
import { ArrowRight, Code2, GraduationCap, Lightbulb, User } from "lucide-react";
import WorkList from "@/components/global/WorkList";
import type { Work } from "@/data/workHistory";
import { workHistory } from "@/data/workHistory";

const works: Work[] = workHistory;

const highlights = [
  {
    Icon: Code2,
    title: "Full‑stack by default",
    body: "Comfortable from database schema to pixel‑perfect React UIs.",
  },
  {
    Icon: GraduationCap,
    title: "Continuously learning",
    body: "Currently deepening distributed systems and platform engineering.",
  },
  {
    Icon: Lightbulb,
    title: "Craft‑minded",
    body: "I sweat accessibility, performance, and the small details that compound.",
  },
];

export default async function About() {
  return (
    <div className="container-page py-16 sm:py-20">
      {/* Hero */}
      <section
        aria-labelledby="about-heading"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
          <User className="size-3.5" aria-hidden />
          About
        </span>
        <h1
          id="about-heading"
          className="mt-5 text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-6xl"
        >
          Virtual assistant, builder, and curious generalist.
        </h1>
        {/* <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-600 sm:text-base">
          I build web products that feel inevitable — fast, accessible, and
          quietly polished. My work spans Next.js applications, design systems,
          and the data and infrastructure that holds them together.
        </p> */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            See my work
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section
        aria-label="Highlights"
        className="mt-14 grid gap-4 sm:grid-cols-3"
      >
        {highlights.map(({ Icon, title, body }) => (
          <article
            key={title}
            className="rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <Icon className="size-5 text-neutral-900" aria-hidden />
            <h2 className="mt-4 text-base font-semibold text-neutral-900">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {body}
            </p>
          </article>
        ))}
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mt-16">
        <header className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
            >
              Where I&apos;ve worked
            </h2>
          </div>
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            View full resume
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </header>
        <div className="mt-6">
          <WorkList works={works} />
        </div>
      </section>
    </div>
  );
}
