"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { CTAButton } from "@/components/primitives/CTAButton";

export function Hero() {
  const { t, dir } = useLocale();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: STAGGER, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASE_OUT },
    },
  };

  const lines = t.hero.title.split("\n");

  return (
    <section
      id="top"
      className="ambient-mesh relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 pt-24 pb-16 sm:px-8"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-[920px] flex-col items-center text-center"
      >
        {/* eyebrow */}
        <motion.div variants={item}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
            {t.hero.eyebrow}
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          variants={item}
          className="text-display mt-7 text-balance text-[var(--text-primary)]"
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        {/* subhead */}
        <motion.p
          variants={item}
          className="text-body mt-6 max-w-[620px] text-balance"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <CTAButton href="#pricing">{t.hero.ctaPrimary}</CTAButton>
          <CTAButton href="#demo" variant="secondary">
            {t.hero.ctaSecondary}
          </CTAButton>
        </motion.div>

        {/* product hint: glass "paste a link" field */}
        <motion.form
          variants={item}
          onSubmit={(e) => e.preventDefault()}
          className="glass mt-12 flex w-full max-w-[560px] items-center gap-2 rounded-full p-2 ps-5"
        >
          <input
            type="url"
            inputMode="url"
            dir={dir}
            aria-label={t.demo.urlPlaceholder}
            placeholder={t.demo.urlPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
          />
          <CTAButton size="sm" type="submit" className="shrink-0 gap-1.5">
            {t.demo.translate}
            <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
          </CTAButton>
        </motion.form>
      </motion.div>
    </section>
  );
}
