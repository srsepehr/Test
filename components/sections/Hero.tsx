"use client";

/**
 * Hero — 21st.dev "Glassmorphism Trust Hero" (easemize/glassmorphism-trust-hero),
 * restyled to the project system: theme-aware (ambient mesh, not a dark photo),
 * GlassCard surfaces, Persian/RTL content, project CTAs, real stats + a marquee
 * of source "logos". formatNumber for every number.
 */

import { motion, useReducedMotion } from "framer-motion";
import { Target, Crown, Play, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { stats, newsSources } from "@/lib/data";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { CTAButton } from "@/components/primitives/CTAButton";
import { GlassCard } from "@/components/primitives/GlassCard";

export function Hero() {
  const { t, fmt } = useLocale();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: STAGGER, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT } },
  };

  const lines = t.hero.title.split("\n");
  const tr = t.hero.trust;

  return (
    <section
      id="top"
      className="ambient-mesh relative flex min-h-[100svh] w-full items-center overflow-hidden px-6 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* LEFT — headline + CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-7 lg:col-span-6"
        >
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
              {t.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-display text-balance text-[var(--text-primary)]"
          >
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="text-body max-w-[560px]">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#pricing">{t.hero.ctaPrimary}</CTAButton>
            <CTAButton href="#demo" variant="secondary" className="gap-2">
              <Play className="h-4 w-4 fill-current" aria-hidden />
              {t.hero.ctaSecondary}
            </CTAButton>
          </motion.div>
        </motion.div>

        {/* RIGHT — glass trust cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-5 lg:col-span-6"
        >
          {/* stats card */}
          <motion.div variants={item}>
            <GlassCard className="p-7">
              <div className="flex items-center gap-4">
                <span className="glass flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]">
                  <Target className="h-6 w-6 text-[var(--text-primary)]" aria-hidden />
                </span>
                <div>
                  <div className="text-3xl font-semibold tabular-nums text-[var(--text-primary)]">
                    {fmt(250000)}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">{tr.bigLabel}</div>
                </div>
              </div>

              {/* satisfaction progress */}
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">{tr.satisfaction}</span>
                  <span className="font-medium tabular-nums text-[var(--text-primary)]">
                    {fmt(98)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--glass-border)]">
                  <div
                    className="h-full rounded-full bg-[var(--text-primary)]"
                    style={{ width: "98%" }}
                  />
                </div>
              </div>

              <div className="my-6 h-px w-full bg-[var(--glass-border)]" />

              {/* mini stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { v: `${fmt(40)}+`, l: tr.langs },
                  { v: `${fmt(24)}/${fmt(7)}`, l: tr.support },
                  { v: `${fmt(4)}K`, l: tr.quality },
                ].map((m) => (
                  <div key={m.l}>
                    <div className="text-xl font-semibold tabular-nums text-[var(--text-primary)]">
                      {m.v}
                    </div>
                    <div className="text-eyebrow mt-1">{m.l}</div>
                  </div>
                ))}
              </div>

              {/* tag pills */}
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {tr.active}
                </span>
                <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                  <Crown className="h-3 w-3 text-[var(--accent)]" aria-hidden />
                  {tr.premium}
                </span>
              </div>
            </GlassCard>
          </motion.div>

          {/* marquee card */}
          <motion.div variants={item}>
            <GlassCard className="py-7">
              <h3 className="text-eyebrow mb-6 px-7">{tr.trustedBy}</h3>
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                }}
              >
                <div className="animate-marquee flex w-max gap-10 whitespace-nowrap px-5">
                  {[...newsSources, ...newsSources].map((s, i) => (
                    <span
                      key={i}
                      className="text-lg font-semibold text-[var(--text-tertiary)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
