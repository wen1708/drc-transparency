import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">DragonCoin Transparency</h1>
      <p className="text-slate-600 mb-6">欢迎来到 DRC 透明页模板。点击下方进入透明页示例。</p>
      <Link className="inline-flex items-center gap-2 rounded-2xl bg-brand text-white px-5 py-3 shadow-card" href="/transparency">
        打开透明页
        <span aria-hidden>→</span>
      </Link>
    </main>
  );
}
