"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Globe, Play, Check, Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import { Reveal } from "@/components/primitives/Reveal";
import { CTAButton } from "@/components/primitives/CTAButton";

const SAMPLE_URL = "https://video.world/watch?v=learn-2026";

/* ---------------- scrubbed (pinned) version ---------------- */
function ScrubbedDemo() {
  const { t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"paste" | "translating" | "done">("paste");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPhase(v < 0.28 ? "paste" : v < 0.58 ? "translating" : "done");
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const shimmerOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.36, 0.52, 0.58],
    [0, 1, 1, 0]
  );
  const beforeOpacity = useTransform(scrollYProgress, [0.55, 0.66], [1, 0.4]);
  const afterOpacity = useTransform(scrollYProgress, [0.58, 0.7], [0, 1]);
  const afterY = useTransform(scrollYProgress, [0.58, 0.72], [14, 0]);
  const watchOpacity = useTransform(scrollYProgress, [0.8, 0.92], [0, 1]);
  const watchScale = useTransform(scrollYProgress, [0.8, 0.92], [0.96, 1]);

  const statusLabel =
    phase === "paste"
      ? t.demo.statusPaste
      : phase === "translating"
        ? t.demo.statusTranslating
        : t.demo.statusDone;

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-6">
        <div className="glass glass-strong w-full max-w-[860px] overflow-hidden rounded-[var(--radius-xl)]">
          {/* top progress line */}
          <motion.div
            style={{ width: progressWidth }}
            className="h-0.5 bg-[var(--accent)]"
          />

          {/* URL bar */}
          <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-4 py-3 sm:px-5">
            <Globe className="h-4 w-4 shrink-0 text-[var(--text-tertiary)]" aria-hidden />
            <span
              dir="ltr"
              className="min-w-0 flex-1 truncate text-start text-xs text-[var(--text-secondary)] sm:text-sm"
            >
              {SAMPLE_URL}
            </span>
            <span className="glass inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
              {phase === "translating" ? (
                <Loader2 className="h-3 w-3 animate-spin text-[var(--accent)]" aria-hidden />
              ) : phase === "done" ? (
                <Check className="h-3 w-3 text-[var(--accent)]" aria-hidden />
              ) : null}
              {statusLabel}
            </span>
          </div>

          {/* video stage */}
          <div className="relative aspect-video w-full overflow-hidden bg-[linear-gradient(135deg,#0c0c10,#23232c)]">
            {/* title overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <span className="text-eyebrow !text-white/55">{t.demo.sampleSource}</span>
              <span className="px-6 text-xl font-semibold text-white/90 sm:text-2xl">
                {t.demo.sampleTitle}
              </span>
            </div>

            {/* play */}
            <motion.div
              style={{ opacity: watchOpacity, scale: watchScale }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="glass glass-strong flex h-16 w-16 items-center justify-center rounded-full">
                <Play className="h-6 w-6 fill-white text-white ltr:ml-1 rtl:mr-1" aria-hidden />
              </span>
            </motion.div>

            {/* translating shimmer */}
            <motion.div
              style={{ opacity: shimmerOpacity }}
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden
            >
              <motion.div
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(41,151,255,0.18),transparent)]"
              />
            </motion.div>

            {/* caption track */}
            <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 sm:p-6">
              <motion.p
                style={{ opacity: beforeOpacity }}
                dir="ltr"
                className="text-center text-sm text-white/55 sm:text-base"
              >
                {t.demo.captionBefore}
              </motion.p>
              <motion.p
                style={{ opacity: afterOpacity, y: afterY }}
                dir="rtl"
                className="glass mx-auto inline-block w-full rounded-[var(--radius-md)] px-4 py-2 text-center text-base font-medium text-white sm:text-lg"
              >
                {t.demo.captionAfter}
              </motion.p>
            </div>
          </div>

          {/* footer */}
          <motion.div
            style={{ opacity: watchOpacity }}
            className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
          >
            <span className="text-xs text-[var(--text-tertiary)]">{t.demo.afterLabel}</span>
            <CTAButton size="sm">{t.demo.watch}</CTAButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- before/after slider (fallback) ---------------- */
function SliderDemo() {
  const { t } = useLocale();
  const [pos, setPos] = useState(50);

  return (
    <div className="mx-auto max-w-[860px] px-6 sm:px-8">
      <div className="glass glass-strong overflow-hidden rounded-[var(--radius-xl)]">
        <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-4 py-3 sm:px-5">
          <Globe className="h-4 w-4 text-[var(--text-tertiary)]" aria-hidden />
          <span dir="ltr" className="flex-1 truncate text-start text-xs text-[var(--text-secondary)] sm:text-sm">
            {SAMPLE_URL}
          </span>
          <span className="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
            <Check className="h-3 w-3 text-[var(--accent)]" aria-hidden />
            {t.demo.statusDone}
          </span>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-[linear-gradient(135deg,#0c0c10,#23232c)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-eyebrow !text-white/55">{t.demo.sampleSource}</span>
            <span className="px-6 text-xl font-semibold text-white/90 sm:text-2xl">
              {t.demo.sampleTitle}
            </span>
          </div>

          {/* after caption (base) */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <p dir="rtl" className="glass rounded-[var(--radius-md)] px-4 py-2 text-center text-base font-medium text-white sm:text-lg">
              {t.demo.captionAfter}
            </p>
          </div>

          {/* before caption (clipped overlay) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <p dir="ltr" className="rounded-[var(--radius-md)] bg-black/40 px-4 py-2 text-center text-base text-white/70 sm:text-lg">
                {t.demo.captionBefore}
              </p>
            </div>
          </div>

          {/* divider */}
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-white/70"
            style={{ insetInlineStart: `${pos}%` }}
          />

          {/* labels */}
          <span className="absolute start-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[11px] text-white/80">
            {t.demo.beforeLabel}
          </span>
          <span className="absolute end-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[11px] text-white/80">
            {t.demo.afterLabel}
          </span>
        </div>

        <div className="px-4 py-4 sm:px-5">
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`${t.demo.beforeLabel} / ${t.demo.afterLabel}`}
            className="w-full accent-[var(--accent)]"
          />
        </div>
      </div>
    </div>
  );
}

export function Demo() {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  return (
    <section id="demo" className="relative">
      <div className="mx-auto max-w-[1200px] px-6 pt-[clamp(96px,12vw,160px)] sm:px-8">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <p className="text-eyebrow mb-4">{t.demo.eyebrow}</p>
          <h2 className="text-headline text-balance text-[var(--text-primary)]">
            {t.demo.title}
          </h2>
          <p className="text-body mt-5">{t.demo.body}</p>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="mt-12 sm:mt-16"
      >
        {reduce ? <SliderDemo /> : <ScrubbedDemo />}
      </motion.div>
    </section>
  );
}
