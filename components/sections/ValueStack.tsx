"use client";

import { Check } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";
import { StaggerGroup, StaggerItem } from "@/components/primitives/Stagger";

export function ValueStack() {
  const { t } = useLocale();

  return (
    <Section
      eyebrow={t.value.eyebrow}
      title={t.value.title}
      body={t.value.body}
      subtle
    >
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {t.value.items.map((item, i) => (
          <StaggerItem key={i}>
            <GlassCard className="flex h-full items-start gap-4 p-6">
              <span className="glass mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                <Check className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-body mt-1">{item.body}</p>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
