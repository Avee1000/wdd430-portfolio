// app/projects/layout.tsx
'use client'

import Link from 'next/link';
import { ProjectSearch } from "@/components/ProjectSearch";
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

const navItems = [
  { href: "/projects", label: "Overview" },
  { href: "/projects/opensource", label: "Opensource" },
  { href: "/projects/school", label: "School" },
  { href: "/projects/create", label: "Create" },
];

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className='flex-1 flex flex-col '>
      <section className='w-full h-auto bg-gray-800 flex items-center text-white '>
        <nav>
          <ul className="flex items-center gap-0">
            {navItems.map((item) => (
              <li key={item.href}>
                {(() => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      href={item.href}
                      className={`block px-4 py-4 text-sm font-medium text-gray-100 transition duration-300 hover:bg-orange-100 hover:text-gray-900 ${isActive ? 'bg-orange-100 text-gray-950' : ''}`}>
                      {item.label}
                    </Link>
                  )
                })()}

              </li>
            ))}
          </ul>
        </nav>
      </section>
      {pathname !== '/projects/create' && <ProjectSearch />}
      {children}
    </div>
  );
}