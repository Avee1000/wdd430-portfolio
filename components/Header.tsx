import Link from "next/link";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    return (
        <header className=" bg-black shadow-sm text-gray-100" >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                <Link
                    href="/"
                    id="header-title"
                    className="text-xl p-2 rounded-md font-semibold tracking-tight text-white-900 transition hover:bg-white-100 hover:text-gray-900 hover:bg-orange-100">
                    OFI-S
                </Link>

                <nav aria-label="Primary">
                    <ul className="flex items-center gap-1 sm:gap-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-white-600 transition hover:bg-orange-100  hover:text-gray-900"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}