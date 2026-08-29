"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/lib/action";

const channels = [
  {
    Icon: Mail,
    label: "Email",
    value: "Flourish.idahosasunny@gmail.com",
    href: "mailto:hello@example.com",
    description: "Best for project inquiries and offers.",
  },
    {
    Icon: FaWhatsapp,
    label: "Phone",
    value: "+234 913 619 6176",
    href: "tel:+2349136196176",
    description: "Best for phone calls and quick messages",
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "@Avee1000",
    href: "https://github.com/Avee1000",
    description: "Open‑source work, side projects, and contributions.",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "in/Osamagumwende Flourish Idahosa-Sunny",
    href: "https://www.linkedin.com/in/idahosa-eddy-a044551a6/",
    description: "Professional experience and recommendations.",
  },
] as const;

const initialState: ContactState = {
  message: null,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type={pending ? "button" : "submit"}
      variant="default"
      className="inline-flex w-auto cursor-pointer bg-foreground text-background hover:opacity-85"
    >
      {pending ? (
        <>
          <LoaderIcon className="animate-spin" /> Sending...
        </>
      ) : (
        <>
          Send message
          <Send className="size-4" aria-hidden />
        </>
      )}
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

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
          Available · Mountain Time (UTC−7) / West Africa Time (GMT +1) / Eastern Standard Time (UTC -5)
        </div>
      </section>

      {/* Channels */}
      <section aria-labelledby="channels-heading" className="mt-14">
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

      {/* Contact form */}
      <section
        aria-labelledby="form-heading"
        className="mt-14 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10"
      >
        <div className="grid gap-8 sm:grid-cols-[1fr_1.4fr]">
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
                <span>flourish.idahosasunny@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-neutral-400" aria-hidden />
                <span>eddyidahosa01@gmail.com</span>
              </div>
            </dl>
          </div>
          <form
            ref={formRef}
            action={formAction}
            id="userForm"
            className="flex flex-col gap-5"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                <span>Name</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  aria-describedby="name-error"
                  className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </label>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error) => (
                    <p key={error} className="mt-1 text-sm text-red-600">
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                <span>Email</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  required
                  aria-describedby="email-error"
                  className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </label>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error) => (
                    <p key={error} className="mt-1 text-sm text-red-600">
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium">
                <span>Subject</span>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry"
                  aria-describedby="subject-error"
                  className="mt-2.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </label>
              <div id="subject-error" aria-live="polite" aria-atomic="true">
                {state.errors?.subject &&
                  state.errors.subject.map((error) => (
                    <p key={error} className="mt-1 text-sm text-red-600">
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                <span>Message</span>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, timeline, and goals…"
                  required
                  aria-describedby="message-error"
                  className="mt-2.5 block min-h-28 w-full resize-y rounded-xl border border-input bg-background px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </label>
              <div id="message-error" aria-live="polite" aria-atomic="true">
                {state.errors?.message &&
                  state.errors.message.map((error) => (
                    <p key={error} className="mt-1 text-sm text-red-600">
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {state.message && (
              <div
                aria-live="polite"
                className={`rounded-xl border p-3 text-sm ${
                  state.success
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {state.message}
              </div>
            )}

            <SubmitButton />
          </form>
        </div>
      </section>
    </div>
  );
}
