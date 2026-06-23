"use client";

/**
 * How It Works — 21st.dev "How It Works" step-cards, restyled to the project
 * system: GlassCard surfaces, icon tile, numbered steps, benefits list with
 * checks, Persian/RTL + i18n, staggered reveal.
 */

import { ClipboardPaste, Sparkles, NotebookPen, Check } from "lucide-react";
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
              <GlassCard interactive className="h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="glass flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]">
                    <Icon className="h-5 w-5 text-[var(--text-primary)]" aria-hidden />
                  </span>
                  <span className="text-2xl font-semibold tabular-nums text-[var(--text-tertiary)]">
                    {fmt(i + 1)}
                  </span>
                </div>

                <h3 className="text-title mt-6 text-[var(--text-primary)]">{step.title}</h3>
                <p className="text-body mt-2">{step.body}</p>

                <ul className="mt-6 space-y-3 border-t border-[var(--glass-border)] pt-6">
                  {step.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)]">
                        <Check className="h-2.5 w-2.5 text-[var(--accent)]" aria-hidden />
                      </span>
                      <span className="text-[var(--text-secondary)]">{b}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
