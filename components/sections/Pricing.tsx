"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { plans } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";
import { CTAButton } from "@/components/primitives/CTAButton";
import { Badge } from "@/components/primitives/Badge";
import { Reveal } from "@/components/primitives/Reveal";

export function Pricing() {
  const { t, locale, price } = useLocale();
  const [annual, setAnnual] = useState(false);

  const priceLabel = (amount: number) => {
    if (amount === 0) return locale === "fa" ? "رایگان" : "Free";
    return locale === "fa"
      ? price(amount)
      : `${t.pricing.currency}${price(amount)}`;
  };

  return (
    <Section
      id="pricing"
      eyebrow={t.pricing.eyebrow}
      title={t.pricing.title}
      body={t.pricing.body}
      align="center"
    >
      {/* billing toggle */}
      <Reveal className="mb-12 flex justify-center">
        <div className="glass inline-flex items-center rounded-full p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={cn(
              "h-10 rounded-full px-5 text-sm font-medium transition-colors",
              !annual
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-[var(--text-secondary)]"
            )}
          >
            {t.pricing.monthly}
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
              annual
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-[var(--text-secondary)]"
            )}
          >
            {t.pricing.annual}
            <span className="text-[var(--accent)]">{t.pricing.saveBadge}</span>
          </button>
        </div>
      </Reveal>

      {/* plans */}
      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
        {plans.map((plan) => {
          const amount = annual ? plan.priceAnnual : plan.priceMonthly;
          return (
            <GlassCard
              key={plan.id}
              className={cn(
                "relative flex h-full flex-col p-7",
                plan.recommended &&
                  "ring-2 ring-[var(--accent)] shadow-[0_0_60px_-12px_color-mix(in_srgb,var(--accent)_55%,transparent)]"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-3 start-7">
                  <Badge accent>{t.common.recommended}</Badge>
                </div>
              )}

              <h3 className="text-title text-[var(--text-primary)]">
                {plan.name[locale]}
              </h3>
              <p className="text-sm text-[var(--text-tertiary)]">
                {plan.tagline[locale]}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold tabular-nums text-[var(--text-primary)]">
                  {priceLabel(amount)}
                </span>
                {amount > 0 && (
                  <span className="mb-1 text-sm text-[var(--text-tertiary)]">
                    {t.pricing.perMonth}
                  </span>
                )}
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                      aria-hidden
                    />
                    <span className="text-[var(--text-secondary)]">{f[locale]}</span>
                  </li>
                ))}
              </ul>

              <CTAButton
                variant={plan.recommended ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {t.pricing.cta}
              </CTAButton>
            </GlassCard>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-24 max-w-[760px]">
        <h3 className="text-title mb-6 text-center text-[var(--text-primary)]">
          {t.pricing.faqTitle}
        </h3>
        <div className="space-y-3">
          {t.pricing.faqs.map((f, i) => (
            <details
              key={i}
              className="glass group rounded-[var(--radius-md)] px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[var(--text-primary)]">
                {f.q}
                <span className="text-[var(--text-tertiary)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-body mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
