import { ReactNode } from "react";

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-2xl border border-[var(--border)] bg-white shadow-card ${className}`}>{children}</div>;
}
