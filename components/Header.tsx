"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Pencil, Plus, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/components/auth-provider";

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authRoutes = pathname === "/signup" || pathname === "/login"

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    const onScroll = () => setScrolled(main.scrollTop > 8);
    onScroll();
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeMenu = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(closeMenu);
  }, [pathname, open]);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  const navItems = isAuthenticated
    ? [...publicNavItems, { href: "/projects", label: "Projects" }]
    : publicNavItems;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isProjectsPage = pathname.startsWith("/projects");
  
  if (authRoutes) return null;

  return (
    <header
      className={cn(
        "relative z-40 w-full shrink-0 border-b border-transparent bg-background/80 backdrop-blur-md transition-colors",
        scrolled && "border-border"
      )}
    >
      <div className="mx-auto flex h-16 w-full md:max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:gap-30 md:overflow-x-auto scrollbar-thin">
        <Link
          href="/"
          className="group inline-flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight text-neutral-955 dark:text-white"
          aria-label="OFI-S — Home"
        >
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-neutral-900 text-white! text-xs font-bold"
          >
            O
          </span>
          <span className="text-[15px] dark:text-foreground">OFI‑S</span>
          <span className="hidden text-xs font-medium text-neutral-400 sm:inline whitespace-nowrap">
            / portfolio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-neutral-100 dark:bg-neutral-800"
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {isAuthenticated && isProjectsPage && (
              <>
                <li className="ml-2 shrink-0 border-l border-border pl-3">
                  <Link href="/projects/create" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground whitespace-nowrap">
                    <Plus className="size-3.5" aria-hidden />Create
                  </Link>
                </li>
                <li className="shrink-0">
                  <Link href="/projects/edit" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-sm font-medium text-background whitespace-nowrap">
                    <Pencil className="size-3.5" aria-hidden />Edit
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className="ml-2 shrink-0 border-l border-border pl-3 flex items-center gap-2">
                <span className="text-sm text-neutral-600">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted whitespace-nowrap"
                >
                  <LogOut className="size-3.5" aria-hidden />
                  Sign out
                </button>
              </li>
            )}
            {!isAuthenticated && (
              <li className="ml-2 shrink-0 border-l border-border pl-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 whitespace-nowrap"
                >
                  Sign in <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            )}
            <li className="ml-2 shrink-0 border-l border-border pl-3">
              <ThemeToggle />
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
          open ? "max-h-120 opacity-100" : "max-h-0 opacity-0"
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
                        ? "bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900"
                        : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className={cn(
                        "size-4",
                        active ? "text-white/70 dark:text-neutral-900/70" : "text-neutral-400"
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          {isAuthenticated && isProjectsPage && (
            <div className="mt-4 grid grid-cols-2 gap-2 px-3">
              <Link href="/projects/create" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground">
                <Plus className="size-3.5" aria-hidden />Create
              </Link>
              <Link href="/projects/edit" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-sm font-medium text-background">
                <Pencil className="size-3.5" aria-hidden />Edit
              </Link>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between px-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          {isAuthenticated && (
            <div className="mt-4 px-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                <LogOut className="size-4" aria-hidden />
                Sign out
              </button>
            </div>
          )}
          <p className="mt-4 px-3 text-xs text-neutral-400">
            Press <kbd className="rounded border border-neutral-200 px-1.5 py-0.5">Esc</kbd> to close.
          </p>
        </nav>
      </div>
    </header>
  );
}
