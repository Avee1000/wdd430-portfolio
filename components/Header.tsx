"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    const onScroll = () => setScrolled(main.scrollTop > 8);
    onScroll();
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile sheet is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    if (!open) return;
    const closeMenu = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(closeMenu);
  }, [pathname, open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "relative z-40 w-full shrink-0 border-b border-transparent bg-background/80 backdrop-blur-md transition-colors",
        scrolled && "border-border"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-md font-semibold tracking-tight text-neutral-900"
          aria-label="OFI-S — Home"
        >
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-neutral-900 text-white text-xs font-bold"
          >
            O
          </span>
          <span className="text-[15px]">OFI‑S</span>
          <span className="hidden text-xs font-medium text-neutral-400 sm:inline">
            / portfolio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-900"
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-neutral-100"
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Hire me <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </li>
            {pathname.startsWith("/projects") && <><li className="ml-2 border-l border-border pl-3"><Link href="/projects/create" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground"><Plus className="size-3.5" aria-hidden />Create</Link></li><li><Link href="/projects/edit" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-sm font-medium text-background"><Pencil className="size-3.5" aria-hidden />Edit</Link></li></>}
            <li className="ml-2 border-l border-border pl-3"><ThemeToggle /></li>
          </ul>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="px-4 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-100"
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className={cn(
                        "size-4",
                        active ? "text-white/70" : "text-neutral-400"
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          {pathname.startsWith("/projects") && <div className="mt-4 grid grid-cols-2 gap-2 px-3"><Link href="/projects/create" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground"><Plus className="size-3.5" aria-hidden />Create</Link><Link href="/projects/edit" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-sm font-medium text-background"><Pencil className="size-3.5" aria-hidden />Edit</Link></div>}
          <div className="mt-4 flex items-center justify-between px-3"><span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Theme</span><ThemeToggle /></div>
          <p className="mt-4 px-3 text-xs text-neutral-400">
            Press <kbd className="rounded border border-neutral-200 px-1.5 py-0.5">Esc</kbd> to close.
          </p>
        </nav>
      </div>
    </header>
  );
}
