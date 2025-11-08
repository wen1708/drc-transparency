// componen../ui/Button.tsx
"use client";
import * as React from "react";

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Variant = "default" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "underline underline-offset-4 hover:opacity-80",
};
const sizes: Record<Size, string> = {
  default: "h-9 px-4",
  sm: "h-8 px-3 rounded-md",
  lg: "h-10 px-6 rounded-md",
  icon: "h-9 w-9",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
