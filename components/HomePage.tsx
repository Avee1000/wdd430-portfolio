"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight, Code2, Activity, Zap } from "lucide-react";
import ProjectList from "@/components/ProjectList";
import { ProjectSearch } from "@/components/ProjectSearch";
import Pagination from "@/components/HomePagination";
import { FaGithub as Github } from "react-icons/fa";
import Image from "next/image";

export default function HomePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const rawType = searchParams.get("type");
  const type: "opensource" | "school" | undefined =
    rawType === "opensource" || rawType === "school" ? rawType : undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["home-projects", query, currentPage, type],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("mode", "home");
      if (query) params.set("query", query);
      params.set("page", String(currentPage));
      if (type) params.set("type", type);

      const res = await fetch(`/api/projects?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  const projects = data?.projects ?? [];
  const pages = data?.pages ?? 0;

  return (
    <div className="flex flex-col">
      <section className="relative isolate overflow-hidden border-b border-neutral-200 bg-white">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
        <div className="container-page pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="flex items-center gap-3 self-start bottom-8 relative">
            <span className="relative inline-flex size-12 shrink-0 overflow-hidden rounded-full bg-neutral-100 shadow-sm ring-1 ring-black/5">
              <Image
                src={"/dp.jpeg"}
                width={48}
                height={48}
                alt="Profile Photo"
                className="size-full object-cover"
                priority
              />
              <span className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-neutral-900 to-neutral-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold leading-tight tracking-tight text-neutral-900 [font-family:var(--font-brand)]">
                Osamagumwende Flourish Idahosa‑Sunny
              </span>
              <span className="text-xs font-medium text-neutral-500">
                Software Engineer · Full‑Stack
              </span>
            </div>
          </div>
          <div className="mx-auto max-w-3xl text-center">
            {/* <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities · 2026
            </span> */}
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              Engineering{" "}
              <span className="relative inline-block">
                <span className="relative z-10">reliable</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 z-0 h-3 bg-neutral-200/70 sm:h-4"
                />
              </span>{" "}
              web products end‑to‑end.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
              I&apos;m a full‑stack engineer focused on building thoughtful,
              well‑designed software with Next.js, React, and TypeScript. Below
              is a curated set of recent work.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800"
              >
                View all projects
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                Get in touch
              </Link>
              <Link
                href="https://github.com/Avee1000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <Github className="size-4" aria-hidden />
                GitHub
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          <dl className="mx-auto mt-14 grid max-w-220 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-4">
            {[
              { k: "Projects shipped", v: "5+" },
              { k: "Years coding", v: "2+" },
              {
                k: "Primary stack",
                v: "Next.js/React, PostgreSQL/MongoDB, Node, Express, Python",
              },
              { k: "Status", v: "Open to work" },
            ].map((s) => (
              <div
                key={s.k}
                className="flex flex-col gap-1 bg-white p-5 text-left"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {s.k}
                </dt>
                <dd className="font-mono text-lg  font-semibold text-neutral-900">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="work"
        aria-labelledby="work-heading"
        className="border-b border-neutral-200 bg-background"
      >
        <div className="container-page py-16 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <Code2 className="size-3.5" aria-hidden />
                Selected work
              </p>
              <h2
                id="work-heading"
                className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
              >
                Recent projects
              </h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-600">
                A live snapshot from the database. Search, filter, or browse the
                latest work below.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-500 shadow-sm">
              <Activity className="size-3.5" aria-hidden />
              <span>Updated continuously</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <ProjectSearch />
            <nav
              aria-label="Filter projects"
              className="flex shrink-0 gap-1 rounded-full border border-neutral-200 bg-white p-1"
            >
              {[
                { label: "All", value: "" },
                { label: "Open source", value: "opensource" },
                { label: "School", value: "school" },
              ].map((filter) => {
                const params = new URLSearchParams();
                if (filter.value) params.set("type", filter.value);
                if (query) params.set("query", query);
                return (
                  <Link
                    key={filter.label}
                    href={`/?${params.toString()}#work`}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${type === filter.value || (!type && !filter.value) ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"}`}
                  >
                    {filter.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8">
            {isLoading ? (
              <section
                aria-label="Projects"
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <article
                    key={i}
                    className="min-h-59 rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-9 shrink-0 rounded-lg bg-muted" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-3/4 rounded bg-muted" />
                        <div className="h-3 w-1/4 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-5/6 rounded bg-muted" />
                      <div className="h-3 w-2/3 rounded bg-muted" />
                    </div>
                    <div className="mt-5 flex gap-1.5">
                      <div className="h-6 w-16 rounded-full bg-muted" />
                      <div className="h-6 w-20 rounded-full bg-muted" />
                      <div className="h-6 w-14 rounded-full bg-muted" />
                    </div>
                  </article>
                ))}
              </section>
            ) : error ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
                <p className="text-sm font-medium text-neutral-900">
                  Unable to load projects
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Something went wrong. Please check your connection and try
                  again.
                </p>
              </div>
            ) : (
              <ProjectList projects={projects} />
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <Pagination
              pages={pages}
              currentPage={currentPage}
              query={query}
              type={type}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="bg-white">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="capabilities-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
            >
              What I work on
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              End‑to‑end product engineering — from interface to data layer.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Product Engineering",
                body: "Design and ship full‑stack features with TypeScript, React, and server‑side rendering.",
              },
              {
                title: "Design Systems",
                body: "Build accessible, token‑driven UI systems with Tailwind and Radix primitives.",
              },
              {
                title: "Data & APIs",
                body: "Design resilient data layers with PostgreSQL, REST, and modern auth.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
              >
                <Zap className="size-5 text-neutral-900" aria-hidden />
                <h3 className="mt-4 text-base font-semibold text-neutral-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
