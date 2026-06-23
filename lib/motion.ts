import type { Variants } from "framer-motion";

/* 3.5 Motion constants */
export const DURATION = { fast: 0.15, base: 0.3, slow: 0.6 } as const;
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const STAGGER = 0.08;

/** entrance: opacity 0→1 + translateY(24→0), 600ms, ease-out, once */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/** reduced-motion: keep opacity only, drop transforms */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const viewportOnce = { once: true, margin: "-15% 0px" } as const;
