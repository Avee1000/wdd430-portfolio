"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent bg-white/80 backdrop-blur-md transition-colors",
        scrolled && "border-neutral-200/80"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
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
          </ul>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-900 transition-colors hover:bg-neutral-50 md:hidden"
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
          "md:hidden overflow-hidden border-t border-neutral-200 bg-white transition-[max-height,opacity] duration-300 ease-out",
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
          <p className="mt-4 px-3 text-xs text-neutral-400">
            Press <kbd className="rounded border border-neutral-200 px-1.5 py-0.5">Esc</kbd> to close.
          </p>
        </nav>
      </div>
    </header>
  );
}
