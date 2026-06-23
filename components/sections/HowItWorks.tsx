"use client";

import { ClipboardPaste, Sparkles, NotebookPen } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";
import { StaggerGroup, StaggerItem } from "@/components/primitives/Stagger";

const icons = [ClipboardPaste, Sparkles, NotebookPen];

export function HowItWorks() {
  const { t, fmt } = useLocale();

  return (
    <Section
      eyebrow={t.how.eyebrow}
      title={t.how.title}
      body={t.how.body}
      align="center"
      subtle
    >
      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {t.how.steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={i}>
              <GlassCard className="h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="glass flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]">
                    <Icon className="h-5 w-5 text-[var(--text-primary)]" aria-hidden />
                  </span>
                  <span className="text-2xl font-semibold tabular-nums text-[var(--text-tertiary)]">
                    {fmt(i + 1)}
                  </span>
                </div>
                <h3 className="text-title mt-6 text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-body mt-2">{step.body}</p>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
