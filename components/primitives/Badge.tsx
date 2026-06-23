import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  accent,
  className,
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-5 tracking-wide",
        accent
          ? "bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent)]"
          : "glass text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
