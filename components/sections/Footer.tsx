"use client";

import { Send, AtSign, MessageCircle, Mail } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/nav/ThemeToggle";
import { LocaleToggle } from "@/components/nav/LocaleToggle";

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-eyebrow mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { t, fmt } = useLocale();
  const year = fmt(new Date().getFullYear(), { useGrouping: false });

  const socials = [
    { Icon: AtSign, label: "X" },
    { Icon: Send, label: "Telegram" },
    { Icon: MessageCircle, label: "Discord" },
    { Icon: Mail, label: "Email" },
  ];

  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-subtle)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <span className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
              {t.brand}
            </span>
            <p className="text-body mt-3 max-w-[280px]">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-2">
              <ThemeToggle />
              <LocaleToggle />
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title={t.footer.product}
            links={[
              { label: t.footer.links.courses, href: "#courses" },
              { label: t.footer.links.news, href: "#news" },
              { label: t.footer.links.pricing, href: "#pricing" },
            ]}
          />
          <FooterCol
            title={t.footer.company}
            links={[
              { label: t.footer.links.about, href: "#" },
              { label: t.footer.links.blog, href: "#" },
              { label: t.footer.links.careers, href: "#" },
            ]}
          />
          <FooterCol
            title={t.footer.legal}
            links={[
              { label: t.footer.links.terms, href: "#" },
              { label: t.footer.links.privacy, href: "#" },
            ]}
          />
        </div>

        <div className="mt-12 border-t border-[var(--glass-border)] pt-6">
          <p className="text-sm text-[var(--text-tertiary)]">
            © {year} {t.brand}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
