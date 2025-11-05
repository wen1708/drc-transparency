import { ReactNode } from "react";

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "muted" | "success" }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const toneMap = {
    default: "bg-brand/10 text-brand",
    muted: "bg-slate-100 text-slate-600",
    success: "bg-success/10 text-success"
  } as const;
  return <span className={`${base} ${toneMap[tone]}`}>{children}</span>;
}
