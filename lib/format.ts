export type Locale = "fa" | "en";

/**
 * Format any number for display. Persian (Eastern-Arabic) digits + grouping
 * in `fa`, Latin in `en`. Every number on screen routes through this.
 */
export function formatNumber(
  n: number,
  locale: Locale = "fa",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", options).format(n);
}

/** Currency-ish price formatting (no decimals by default). */
export function formatPrice(
  n: number,
  locale: Locale = "fa",
  options?: Intl.NumberFormatOptions
): string {
  return formatNumber(n, locale, { maximumFractionDigits: 0, ...options });
}
