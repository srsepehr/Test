import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  body,
  children,
  subtle,
  align = "start",
  className,
  containerClassName,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  body?: string;
  children?: ReactNode;
  subtle?: boolean;
  align?: "start" | "center";
  className?: string;
  containerClassName?: string;
}) {
  const hasHeader = eyebrow || title || body;
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-[clamp(96px,12vw,160px)]",
        subtle && "bg-[var(--bg-subtle)]",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1200px] px-6 sm:px-8",
          containerClassName
        )}
      >
        {hasHeader && (
          <Reveal
            className={cn(
              "mb-12 sm:mb-16 max-w-[760px]",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
            {title && (
              <h2 className="text-headline text-[var(--text-primary)] text-balance">
                {title}
              </h2>
            )}
            {body && <p className="text-body mt-5">{body}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
