"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fa } from "@/messages/fa";
import { en } from "@/messages/en";
import { formatNumber, formatPrice, type Locale } from "@/lib/format";

const dictionaries = { fa, en } as const;
type Dir = "rtl" | "ltr";

interface LocaleContextValue {
  locale: Locale;
  dir: Dir;
  t: typeof fa;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  fmt: (n: number, options?: Intl.NumberFormatOptions) => string;
  price: (n: number, options?: Intl.NumberFormatOptions) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "vira-locale";

export function LocaleProvider({
  children,
  initialLocale = "fa",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // hydrate persisted choice
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      // Intentional: read persisted locale post-hydration to avoid SSR/client
      // markup mismatch (server always renders the default `fa`).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "fa" || stored === "en") setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  // keep <html> lang/dir + persistence in sync
  useEffect(() => {
    const dir: Dir = locale === "fa" ? "rtl" : "ltr";
    const el = document.documentElement;
    el.lang = locale;
    el.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggleLocale = useCallback(
    () => setLocaleState((p) => (p === "fa" ? "en" : "fa")),
    []
  );
  const fmt = useCallback(
    (n: number, options?: Intl.NumberFormatOptions) => formatNumber(n, locale, options),
    [locale]
  );
  const price = useCallback(
    (n: number, options?: Intl.NumberFormatOptions) => formatPrice(n, locale, options),
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: locale === "fa" ? "rtl" : "ltr",
      t: dictionaries[locale],
      setLocale,
      toggleLocale,
      fmt,
      price,
    }),
    [locale, setLocale, toggleLocale, fmt, price]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}

/** Convenience: just the active dictionary. */
export function useT() {
  return useLocale().t;
}
