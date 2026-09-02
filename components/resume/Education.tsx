import { GraduationCap } from "lucide-react";

export default function ResumeEducation() {
  return (
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
              Brigham Young University—Idaho{" "}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
