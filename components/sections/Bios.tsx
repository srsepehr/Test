"use client";

import { useLocale } from "@/lib/i18n";
import { bios } from "@/lib/data";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Parallax } from "@/components/primitives/Parallax";

export function Bios() {
  const { t, locale } = useLocale();

  return (
    <Section id="stories" eyebrow={t.bios.eyebrow} title={t.bios.title} body={t.bios.body} subtle>
      <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:-mx-8 sm:px-8 [scrollbar-width:none]">
        {bios.map((b, i) => (
          <div key={b.id} className="w-[260px] shrink-0 snap-start sm:w-[300px]">
            <Parallax distance={i % 2 === 0 ? 26 : 14}>
              <GlassCard interactive className="h-full">
                <div
                  className="aspect-[3/4] w-full"
                  style={{ background: b.gradient }}
                />
                <div className="p-6">
                  <h3 className="text-title text-[var(--text-primary)]">
                    {b.name[locale]}
                  </h3>
                  <p className="text-eyebrow mt-1">{b.role[locale]}</p>
                  <p className="text-body mt-4">{b.hook[locale]}</p>
                </div>
              </GlassCard>
            </Parallax>
          </div>
        ))}
      </div>
    </Section>
  );
}
