"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/primitives/CTAButton";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";

export function Navbar() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#courses", label: t.nav.courses },
    { href: "#news", label: t.nav.news },
    { href: "#stories", label: t.nav.stories },
    { href: "#pricing", label: t.nav.pricing },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "glass !rounded-none border-x-0 border-t-0"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6 sm:px-8">
        {/* logo — inline-start */}
        <a
          href="#top"
          className="text-lg font-semibold tracking-tight text-[var(--text-primary)]"
        >
          {t.brand}
        </a>

        {/* links — center */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* actions — inline-end */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleToggle />
          <a
            href="#"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-[var(--text-primary)] sm:inline-block"
          >
            {t.nav.signIn}
          </a>
          <CTAButton href="#pricing" size="sm" className="hidden sm:inline-flex">
            {t.nav.startFree}
          </CTAButton>
        </div>
      </nav>
    </header>
  );
}
