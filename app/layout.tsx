'use client'

import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ProjectSearch } from "@/components/ProjectSearch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const home = pathname === '/';

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <Header />
        {home && <ProjectSearch />}
        {children}
        <Footer />
      </body>
    </html>
  );
}
