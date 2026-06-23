"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** strong glass background */
  strong?: boolean;
  /** hover lift + border brighten + deeper shadow */
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, strong, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass overflow-hidden",
          strong && "glass-strong",
          interactive &&
            "transition-[transform,box-shadow,background] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:[background:var(--glass-bg-strong)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
