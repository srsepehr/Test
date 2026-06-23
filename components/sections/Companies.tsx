"use client";

import { useLocale } from "@/lib/i18n";
import { companies } from "@/lib/data";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";

export function Companies() {
  const { t, locale, fmt } = useLocale();

  return (
    <Section eyebrow={t.companies.eyebrow} title={t.companies.title} body={t.companies.body}>
      <div className="-mx-6 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:none]">
        <div className="relative flex min-w-max gap-6">
          {/* baseline */}
          <div className="absolute inset-x-0 top-[7px] h-px bg-[var(--glass-border)]" />
          {companies.map((m) => (
            <div key={m.id} className="relative w-[220px] shrink-0">
              <span className="block h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]" />
              <div className="mt-5">
                <span className="text-2xl font-semibold tabular-nums text-[var(--text-primary)]">
                  {fmt(m.year)}
                </span>
                <GlassCard className="mt-3 p-5">
                  <p className="text-body !text-[var(--text-primary)]">
                    {m.milestone[locale]}
                  </p>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
