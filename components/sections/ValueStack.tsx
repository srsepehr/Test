"use client";

/**
 * Value/Features — 21st.dev "Bento Product Features" asymmetric bento layout
 * (one tall card + four small + one wide), restyled to GlassCard + tokens, i18n.
 */

import { Infinity as InfinityIcon, Languages, Library, NotebookPen, MonitorPlay, ShieldCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";
import { StaggerGroup, StaggerItem } from "@/components/primitives/Stagger";

const icons = [InfinityIcon, Languages, Library, NotebookPen, MonitorPlay, ShieldCheck];
// bento placement matching the 21st.dev layout: tall, small, small, small, small, wide
const spans = [
  "md:col-span-1 md:row-span-3",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
];

export function ValueStack() {
  const { t } = useLocale();

  return (
    <Section eyebrow={t.value.eyebrow} title={t.value.title} body={t.value.body} subtle>
      <StaggerGroup className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
        {t.value.items.map((item, i) => {
          const Icon = icons[i];
          const tall = i === 0;
          return (
            <StaggerItem key={i} className={cn(spans[i], "h-full")}>
              <GlassCard
                interactive
                className={cn(
                  "flex h-full flex-col p-6",
                  tall ? "justify-between" : "justify-start"
                )}
              >
                <span
                  className={cn(
                    "glass flex items-center justify-center rounded-[var(--radius-md)]",
                    tall ? "h-14 w-14" : "h-11 w-11"
                  )}
                >
                  <Icon
                    className={cn("text-[var(--text-primary)]", tall ? "h-7 w-7" : "h-5 w-5")}
                    aria-hidden
                  />
                </span>
                <div className={tall ? "mt-auto pt-6" : "mt-4"}>
                  <h3
                    className={cn(
                      "font-semibold text-[var(--text-primary)]",
                      tall ? "text-2xl tracking-tight" : "text-base"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-body mt-1.5">{item.body}</p>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
