"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-9 rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "glass text-[var(--text-secondary)] hover:[background:var(--glass-bg-strong)]",
        className
      )}
    >
      {children}
    </button>
  );
}
