"use client";

import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cta = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "cta-highlight rounded-full h-[50px] px-7 bg-black text-white dark:bg-white dark:text-black transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "glass rounded-full h-[50px] px-7 text-[var(--text-primary)] transition-colors duration-150 hover:[background:var(--glass-bg-strong)]",
        ghost:
          "inline-flex items-center gap-1.5 h-[44px] text-[var(--text-primary)] [&>svg]:transition-transform [&>svg]:duration-150 hover:[&>svg]:translate-x-1 rtl:hover:[&>svg]:-translate-x-1",
      },
      size: {
        default: "",
        sm: "h-[44px] px-5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

type CTAVariants = VariantProps<typeof cta>;

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CTAVariants {
  href?: string;
  children: ReactNode;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant, size, href, children, type, ...props }, ref) => {
    const classes = cn(cta({ variant, size }), className);

    if (href) {
      return (
        <a href={href} className={classes} aria-label={props["aria-label"]}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} type={type ?? "button"} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";
