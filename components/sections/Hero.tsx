"use client";

/**
 * Hero — 21st.dev "Illuminated Hero" (efferd/illuminated-hero), restyled to the
 * project system: dark cinematic stage, illuminated glow headline (SVG glow-4
 * filter), Persian/RTL content, project CTAs + glass URL field.
 */

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/primitives/CTAButton";

export function Hero() {
  const { t, dir } = useLocale();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: STAGGER, delayChildren: 0.15 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT } },
  };

  // glow duplicate text can't contain line breaks — use a single line
  const titleGlow = t.hero.title.replace("\n", " ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-white sm:px-8"
    >
      {/* illuminated background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full max-w-[44em] -translate-x-1/2 -translate-y-1/2">
        <div className="shadow-bgt absolute size-full translate-[0_-70%] scale-[1.2] animate-[onloadbgt_1.2s_ease-in-out_forwards] rounded-[100em] opacity-60" />
        <div className="shadow-bgb absolute size-full translate-[0_-70%] scale-[1.2] animate-[onloadbgb_1.2s_ease-in-out_forwards] rounded-[100em] opacity-60" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center text-center"
      >
        {/* eyebrow */}
        <motion.div variants={item}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-[#fcd9a8]" aria-hidden />
            {t.hero.eyebrow}
          </span>
        </motion.div>

        {/* illuminated glow headline */}
        <motion.h1
          variants={item}
          className="text-display mt-8 max-w-[16ch] text-balance"
        >
          <span
            className={cn(
              "relative inline-block",
              "before:absolute before:animate-[onloadopacity_1s_ease-out_forwards] before:opacity-0 before:content-[attr(data-text)]",
              "before:bg-[linear-gradient(0deg,#dfe5ee_0%,#fffaf6_50%)] before:bg-clip-text before:text-[#fffaf6]",
              "filter-[url(#glow-4)]"
            )}
            data-text={titleGlow}
          >
            {titleGlow}
          </span>
        </motion.h1>

        {/* subhead */}
        <motion.p variants={item} className="mt-7 max-w-[600px] text-balance text-lg text-white/65">
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
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
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
          <CTAButton size="sm" type="submit" className="shrink-0 gap-1.5">
            {t.demo.translate}
            <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
          </CTAButton>
        </motion.form>
      </motion.div>

      {/* glow-4 SVG filter (from the 21st.dev component) */}
      <svg
        className="absolute -z-1 h-0 w-0"
        width="1440"
        height="300"
        viewBox="0 0 1440 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="glow-4"
            colorInterpolationFilters="sRGB"
            x="-50%"
            y="-200%"
            width="200%"
            height="500%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur4" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur19" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur9" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur30" />
            <feColorMatrix
              in="blur4"
              result="color-0-blur"
              type="matrix"
              values="1 0 0 0 0  0 0.9803921568627451 0 0 0  0 0 0.9647058823529412 0 0  0 0 0 0.8 0"
            />
            <feOffset in="color-0-blur" result="layer-0-offsetted" dx="0" dy="0" />
            <feColorMatrix
              in="blur19"
              result="color-1-blur"
              type="matrix"
              values="0.8156862745098039 0 0 0 0  0 0.49411764705882355 0 0 0  0 0 0.2627450980392157 0 0  0 0 0 1 0"
            />
            <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2" />
            <feColorMatrix
              in="blur9"
              result="color-2-blur"
              type="matrix"
              values="1 0 0 0 0  0 0.6666666666666666 0 0 0  0 0 0.36470588235294116 0 0  0 0 0 0.65 0"
            />
            <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2" />
            <feColorMatrix
              in="blur30"
              result="color-3-blur"
              type="matrix"
              values="1 0 0 0 0  0 0.611764705882353 0 0 0  0 0 0.39215686274509803 0 0  0 0 0 1 0"
            />
            <feOffset in="color-3-blur" result="layer-3-offsetted" dx="0" dy="2" />
            <feColorMatrix
              in="blur30"
              result="color-4-blur"
              type="matrix"
              values="0.4549019607843137 0 0 0 0  0 0.16470588235294117 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
            <feOffset in="color-4-blur" result="layer-4-offsetted" dx="0" dy="16" />
            <feColorMatrix
              in="blur30"
              result="color-5-blur"
              type="matrix"
              values="0.4235294117647059 0 0 0 0  0 0.19607843137254902 0 0 0  0 0 0.11372549019607843 0 0  0 0 0 1 0"
            />
            <feOffset in="color-5-blur" result="layer-5-offsetted" dx="0" dy="64" />
            <feColorMatrix
              in="blur30"
              result="color-6-blur"
              type="matrix"
              values="0.21176470588235294 0 0 0 0  0 0.10980392156862745 0 0 0  0 0 0.07450980392156863 0 0  0 0 0 1 0"
            />
            <feOffset in="color-6-blur" result="layer-6-offsetted" dx="0" dy="64" />
            <feColorMatrix
              in="blur30"
              result="color-7-blur"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.68 0"
            />
            <feOffset in="color-7-blur" result="layer-7-offsetted" dx="0" dy="64" />
            <feMerge>
              <feMergeNode in="layer-0-offsetted" />
              <feMergeNode in="layer-1-offsetted" />
              <feMergeNode in="layer-2-offsetted" />
              <feMergeNode in="layer-3-offsetted" />
              <feMergeNode in="layer-4-offsetted" />
              <feMergeNode in="layer-5-offsetted" />
              <feMergeNode in="layer-6-offsetted" />
              <feMergeNode in="layer-7-offsetted" />
              <feMergeNode in="layer-0-offsetted" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </section>
  );
}
