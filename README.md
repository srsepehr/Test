# بازنما — Baznama

Marketing homepage for a **Persian-first (RTL) knowledge platform** whose core
feature is **AI video translation** (paste a link or upload → translated
subtitles → watch). Apple-style, scroll-driven, glass / monochrome aesthetic.

## Stack

- **Next.js 16** (App Router, TypeScript) + **React 19**
- **Tailwind CSS v4** (CSS-first, `@theme` tokens in `app/globals.css`)
- **shadcn/ui** foundation (`components.json`, `lib/utils.ts`) — restyled to the design system
- **framer-motion** (scroll + entrance animation)
- **next-themes** (light/dark, default dark, `class` strategy)
- Fonts via `next/font`: **Geist** (Latin) + **Vazirmatn** (Persian)

## Scripts

```bash
npm run dev     # local dev
npm run build   # production build (passes clean)
npm run lint    # eslint
```

## Status

This is a **scaffold + Magic-ready canvas checkpoint**:

- ✅ Next.js project, Tailwind v4, shadcn token canvas, dark theme, RTL Persian layout, both fonts wired.
- ✅ `next build` and `tsc` pass clean.
- ⏳ Section components are intended to be generated with the **Magic MCP**
  (`@21st-dev/magic`) — hero, CTAs, demo, pricing, etc.

### ⚠️ Magic MCP + network policy

The Magic MCP needs outbound access to **`*.21st.dev`** (`api.21st.dev`,
`magic.21st.dev`). In a restricted Claude Code on the web environment these are
blocked by the network policy, so Magic cannot reach its backend.

**To build with Magic:** use a web environment whose network policy allows
`*.21st.dev`, or run this repo in local Claude Code (no proxy). See
<https://code.claude.com/docs/en/claude-code-on-the-web>.
