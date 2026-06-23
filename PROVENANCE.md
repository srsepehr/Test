# Component provenance

An honest record of where the UI in this project comes from, since the build
goal was to maximize use of **21st.dev** (via the Magic MCP).

## Important reality

The Magic MCP `21st_magic_component_builder` (the tool that _generates_ a
tailored component) **timed out on every call (60s cap)** in the build
environment and could not be used. The `21st_magic_component_inspiration`
endpoint worked and returns **real 21st.dev library components** — but those
come back as generic shadcn blocks (their own `Card`/`Switch`/`Badge` styling,
blue toggles, `$` pricing, English-only, no glassmorphism, no RTL).

The project spec (Section 3) requires a specific glass / monochrome / RTL-first
design system and "consistency through shared primitives." Shipping 21st.dev
blocks verbatim would violate that, so any 21st.dev component used here was
**restyled onto the design system** (tokens, `.glass`, `CTAButton`/`GlassCard`,
i18n, `formatNumber`, RTL).

## 21st.dev-derived (sourced via Magic, then restyled to spec)

- `components/sections/Proof.tsx` — testimonials use the layout of the 21st.dev
  **"Testimonials"** bento block, rebuilt with `GlassCard` + tokens + RTL/i18n.
- `components/sections/Hero.tsx` — entrance/stagger pattern follows the 21st.dev
  **"Animated Hero Section"** (framer-motion staggered reveal), rebuilt on the
  design system with a glass URL field.

## Foundation — cannot come from 21st.dev (must be written)

Magic generates component snippets only; it cannot produce app architecture:

- Design tokens + `.glass` recipe + typography scale — `app/globals.css`
- Theme/locale providers — `components/providers.tsx`, `lib/i18n.tsx`
- Persian-digit number formatting — `lib/format.ts`
- Motion constants/variants — `lib/motion.ts`
- Typed mock content — `lib/data.ts`
- Shared primitives — `components/primitives/*`
  (`CTAButton`, `GlassCard`, `Section`, `Reveal`, `Stagger`, `Stat`, `Badge`,
  `Chip`, `Parallax`)
- The pinned, scroll-scrubbed translation demo — `components/sections/Demo.tsx`
  (`useScroll`/`useTransform` logic + before/after slider fallback)
- Page assembly + nav — `app/page.tsx`, `components/nav/*`

## Bottom line

A genuinely "100% from 21st.dev" build is not achievable with this tool: it
produces individual components, not a design system, i18n/RTL layer, or
scroll-driven page logic — and its output must be restyled to satisfy the spec.
