// app/projects/layout.tsx

import Link from 'next/link';

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/projects/opensource", label: "Opensource" },
  { href: "/projects/school", label: "School" },
  { href: "/projects/settings", label: "Settings" },
];

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <section className='w-full h-auto bg-gray-800 flex items-center text-white '>
        <nav>
          <ul className="flex items-center gap-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block md px-4 py-4 text-sm font-medium text-white-600 transition duration-300   hover:text-gray-900 m-0 hover:bg-orange-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
        {children}
    </div>
  );
}