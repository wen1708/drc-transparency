import { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`rounded-2xl bg-brand text-white px-4 py-2 hover:opacity-95 shadow ${className}`} />;
}
