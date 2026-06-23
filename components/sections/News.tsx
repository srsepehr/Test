"use client";

import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { news, newsSources } from "@/lib/data";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Badge } from "@/components/primitives/Badge";
import { Reveal } from "@/components/primitives/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/Stagger";

export function News() {
  const { t, locale, fmt } = useLocale();
  const ago = (m: number) =>
    locale === "fa" ? `${fmt(m)} دقیقه پیش` : `${fmt(m)} min ago`;

  return (
    <Section id="news" eyebrow={t.news.eyebrow} title={t.news.title} body={t.news.body}>
      {/* source "logos" (text placeholders) */}
      <Reveal className="mb-10 flex flex-wrap items-center gap-2">
        {newsSources.map((s) => (
          <span
            key={s}
            className="glass rounded-full px-4 py-2 text-sm font-medium text-[var(--text-secondary)]"
          >
            {s}
          </span>
        ))}
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {news.map((n) => (
          <StaggerItem key={n.id}>
            <GlassCard interactive className="h-full p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {n.source}
                </span>
                <Badge>{n.category[locale]}</Badge>
              </div>
              <h3 className="text-title mt-4 text-[var(--text-primary)]">
                {n.headline[locale]}
              </h3>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-[var(--text-tertiary)]">
                  {ago(n.minutesAgo)}
                </span>
                <ArrowLeft
                  className="h-4 w-4 text-[var(--text-tertiary)] ltr:rotate-180"
                  aria-hidden
                />
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
