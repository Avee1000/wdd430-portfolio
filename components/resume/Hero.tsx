import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const summaryBlurb =
  "Full-stack software engineer who ships complete web products from a single idea to production. I design databases, build APIs, and create accessible user interfaces I pay close attention to accessibility, performance, and clean, maintainable code. Today I focus on full-stack TypeScript, design systems, and data-driven products.";

export default function ResumeHero() {
  return (
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
        A snapshot of my experiences and skills
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
        {summaryBlurb}
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
  );
}
