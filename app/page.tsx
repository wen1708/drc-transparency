// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">DragonCoin Transparency</h1>
      <p className="text-slate-600 mb-6">
        Welcome to the DragonCoin project. Click the button below to view the live transparency dashboard.
      </p>
      <Link
        href="/transparency"
        className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-5 py-3 shadow"
      >
        View Live Data
      </Link>
    </main>
  );
}
