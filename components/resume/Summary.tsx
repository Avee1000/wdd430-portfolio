const focusItems = [
  "Full-stack TypeScript",
  "Design systems & accessibility",
  "Data modeling & APIs",
  "Virtual assistance",
  "Quality Assurance",
  "Personal Assistance",
];

export default function ResumeSummary() {
  return (
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
          I build web products that feel fast, accessible, and
          quietly polished. My work spans Next.js applications, design systems,
          and the data and infrastructure that holds them together. I care
          deeply about accessibility, scalability, performance, and code that stays readable
          long after it ships.
        </p>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-semibold text-neutral-900">Focus</h2>
        <ul className="mt-2 grid grid-cols-1 gap-2 sm:gap-x-5 sm:grid-cols-2 list-disc! pl-4">
          {focusItems.map((item) => (
            <li
              key={item}
              className=" items-start text-sm text-neutral-600"
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
