// components/ui/switch.tsx
"use client";

import * as React from "react";

type Props = {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export function Switch({ checked, onCheckedChange, className = "", disabled }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      className={
        "inline-flex h-6 w-11 items-center rounded-full transition-colors " +
        (checked ? "bg-green-500" : "bg-gray-300") +
        (disabled ? " opacity-60 cursor-not-allowed" : " cursor-pointer") +
        (className ? " " + className : "")
      }
    >
      <span
        className={
          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform " +
          (checked ? "translate-x-5" : "translate-x-1")
        }
      />
    </button>
  );
}
