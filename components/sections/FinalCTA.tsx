"use client";

import { useLocale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { CTAButton } from "@/components/primitives/CTAButton";

export function FinalCTA() {
  const { t } = useLocale();

  return (
    <section className="ambient-mesh relative w-full py-[clamp(120px,16vw,200px)]">
      <div className="mx-auto max-w-[900px] px-6 text-center sm:px-8">
        <Reveal>
          <h2 className="text-display text-balance text-[var(--text-primary)]">
            {t.finalCta.title}
          </h2>
          <p className="text-body mx-auto mt-6 max-w-[560px]">{t.finalCta.body}</p>
          <div className="mt-10 flex justify-center">
            <CTAButton href="#pricing">{t.finalCta.cta}</CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
