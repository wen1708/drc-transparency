// components/site/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next"; // 鉁?寮曞叆 Route 绫诲瀷浠ラ€傞厤 typedRoutes

export function Navbar() {
  const pathname = usePathname();
  const onTransparency = pathname?.startsWith("/transparency");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          DragonCoin
        </Link>

        <nav className="flex items-center gap-3">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/transparency">Transparency</NavLink>
          

          {!onTransparency ? (
            // Non-transparency pages: CTA -> View Live Data
            <Link
              href="/transparency"
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-primary-foreground hover:opacity-90"
            >
              View Live Data
            </Link>
          ) : (
            // On transparency page: Back to Home
            <Link
              href="/"
              className="inline-flex h-9 items-center rounded-md bg-secondary px-4 text-secondary-foreground hover:opacity-90"
            >
              Back to Home
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: Route; // 鉁?鐢?Route锛岃€屼笉鏄?string
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
  const base = "text-sm opacity-80 hover:opacity-100 transition";
  const activeCls = active ? " opacity-100 font-medium" : "";
  return (
    <Link href={href} className={base + activeCls}>
      {children}
    </Link>
  );
}
