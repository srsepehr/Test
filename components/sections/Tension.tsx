"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { DURATION, EASE_OUT, viewportOnce } from "@/lib/motion";
import { Reveal } from "@/components/primitives/Reveal";

export function Tension() {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full py-[clamp(120px,18vw,220px)]">
      <div className="mx-auto max-w-[1000px] px-6 text-center sm:px-8">
        <motion.h2
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
          className="text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-balance text-[var(--text-primary)]"
        >
          {t.tension.statement}
        </motion.h2>
        <Reveal delay={0.15}>
          <p className="mt-7 text-lg text-[var(--text-tertiary)] sm:text-xl">
            {t.tension.sub}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
