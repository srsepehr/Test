"use client";

/**
 * Testimonials layout adapted from the 21st.dev "Testimonials" bento block
 * (sourced via the Magic MCP inspiration endpoint), restyled onto the project
 * design system: GlassCard surfaces, semantic tokens, RTL + i18n, formatNumber.
 */

import { useLocale } from "@/lib/i18n";
import { stats, testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "@/components/primitives/Section";
import { Stat } from "@/components/primitives/Stat";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Reveal } from "@/components/primitives/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/Stagger";

export function Proof() {
  const { t, locale } = useLocale();
  const [featured, ...rest] = testimonials;

  return (
    <Section
      eyebrow={t.proof.eyebrow}
      title={t.proof.title}
      body={t.proof.body}
      align="center"
    >
      <Reveal className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.id} value={s.value} suffix={s.suffix} label={s.label[locale]} />
        ))}
      </Reveal>

      <h3 className="text-title mt-24 mb-8 text-center text-[var(--text-secondary)]">
        {t.proof.testimonialsTitle}
      </h3>

      {/* bento grid (21st.dev-derived, restyled) */}
      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        <StaggerItem className="sm:col-span-2 lg:row-span-2">
          <GlassCard className="flex h-full flex-col justify-between p-8">
            <p className="text-2xl font-medium leading-relaxed text-[var(--text-primary)] sm:text-3xl">
              “{featured.quote[locale]}”
            </p>
            <div className="mt-8">
              <p className="font-medium text-[var(--text-primary)]">
                {featured.author[locale]}
              </p>
              <p className="text-sm text-[var(--text-tertiary)]">
                {featured.role[locale]}
              </p>
            </div>
          </GlassCard>
        </StaggerItem>

        {rest.map((tt, i) => (
          <StaggerItem
            key={tt.id}
            className={cn(i === 0 || i === 3 ? "sm:col-span-2 lg:col-span-2" : "")}
          >
            <GlassCard className="flex h-full flex-col justify-between p-6">
              <p className="leading-relaxed text-[var(--text-primary)]">
                “{tt.quote[locale]}”
              </p>
              <div className="mt-6">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {tt.author[locale]}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">{tt.role[locale]}</p>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
