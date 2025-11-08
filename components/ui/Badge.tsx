// components/ui/Badge.tsx
import type { ReactNode } from "react";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "neutral" | "success" | "warning" | "danger";

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    neutral:
      "bg-gray-100 text-gray-800 border border-gray-200",
    success:
      "bg-green-100 text-green-800 border border-green-200",
    warning:
      "bg-yellow-100 text-yellow-800 border border-yellow-200",
    danger:
      "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
