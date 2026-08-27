import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin} from "react-icons/fa";

const channels = [
  {
    Icon: Mail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    description: "Best for project inquiries and offers.",
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "@your-handle",
    href: "https://github.com",
    description: "Open‑source work, side projects, and contributions.",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "in/your-handle",
    href: "https://linkedin.com",
    description: "Professional experience and recommendations.",
  },
] as const;

export default function Contact() {
  return (
    <div className="container-page py-16 sm:py-20">
      <section
        aria-labelledby="contact-heading"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Contact
        </p>
        <h1
          id="contact-heading"
          className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          Let&apos;s build something together
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
          I&apos;m currently open to full‑time software engineering roles and
          select contract work. The fastest way to reach me is by email.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Available · Mountain Time (UTC−7)
        </div>
      </section>

      {/* Channels */}
      <section
        aria-labelledby="channels-heading"
        className="mt-14"
      >
        <h2 id="channels-heading" className="sr-only">
          Contact channels
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ Icon, label, value, href, description }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.12)]"
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-xl bg-neutral-900 text-white"
                >
                  <Icon className="size-5" />
                </span>
                <ArrowUpRight
                  className="size-4 text-neutral-400 transition-colors group-hover:text-neutral-900"
                  aria-hidden
                />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {label}
              </p>
              <p className="mt-1 text-base font-semibold text-neutral-900">
                {value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick form (static, presentational) */}
      <section
        aria-labelledby="form-heading"
        className="mt-14 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2
              id="form-heading"
              className="text-xl font-semibold text-neutral-900"
            >
              Send a message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Drop a note and I&apos;ll get back within a couple of business
              days.
            </p>
            <dl className="mt-6 space-y-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-neutral-400" aria-hidden />
                <span>Remote · Global</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-neutral-400" aria-hidden />
                <span>hello@example.com</span>
              </div>
            </dl>
          </div>
          <form
            id="userForm"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            aria-label="Contact form"
          >
            <label className="block text-sm">
              <span className="font-medium text-neutral-700">Name</span>
              <input type="text" name="name" placeholder="Jane Doe" required />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-neutral-700">Email</span>
              <input
                type="email"
                name="email"
                placeholder="jane@example.com"
                required
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-neutral-700">Subject</span>
              <input
                type="text"
                name="subject"
                placeholder="Project inquiry"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-neutral-700">Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project, timeline, and goals…"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800"
              >
                Send message
                <ArrowUpRight className="size-4" aria-hidden />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
