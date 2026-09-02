"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { useAuth } from "@/components/global/auth-provider";
import { usePathname } from "next/navigation";

const socialLinks = [
  {
    href: "https://github.com/Avee1000",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/idahosa-eddy-a044551a6/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "mailto:flourish.idahosasunny@gmail.com",
    label: "Email",
    Icon: Mail,
  },
] as const;

const publicNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const authRoutes = pathname === "/signup" || pathname === "/login";

  if (authRoutes) return null;

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="grid size-7 place-items-center rounded-md bg-neutral-900 text-xs font-bold text-white"
              >
                O
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
                OFI‑S
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
              Software engineer building reliable, well‑designed products on the
              modern web.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Pages
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {publicNavLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {!isAuthenticated && (
                <li>
                  <Link
                    href="/login"
                    className="text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    Admin login
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Connect
            </h3>
            <ul className="mt-3 flex items-center gap-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target={href.startsWith("https") ? "_blank" : undefined}
                    rel={href.startsWith("https") ? "noreferrer" : undefined}
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                  >
                    <Icon className="size-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} OFI‑S. All rights reserved.</p>
          <p className="font-mono tracking-tight">
            Built with Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>
      <div>
        <p className="text-neutral-400 text-center text-xs">Built by Flourish (Avee1000)</p>
      </div>
    </footer>
  );
}
