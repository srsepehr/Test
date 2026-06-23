"use client";

import { useLocale } from "@/lib/i18n";

export function LocaleToggle() {
  const { toggleLocale, t } = useLocale();
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.nav.toggleLocale}
      className="glass inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:[background:var(--glass-bg-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      {t.nav.toggleLocale}
    </button>
  );
}
