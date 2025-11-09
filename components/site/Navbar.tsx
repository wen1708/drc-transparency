// components/site/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const active = pathname === "/";
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-sky-300">DragonCoin</Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={
              "text-sm text-slate-200 hover:text-sky-300 transition-colors" +
              (active ? " font-medium text-sky-300" : "")
            }
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
