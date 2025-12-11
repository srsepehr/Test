'use client';

import { useAppContext } from './Providers';
import { useTranslations } from '../lib/useTranslations';
import { ThemeMode } from '../lib/types';

export default function ThemeToggle() {
  const { theme, setTheme, setLoading } = useAppContext();
  const t = useTranslations();

  const options: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: t('themeLight') },
    { value: 'dark', label: t('themeDark') },
    { value: 'system', label: t('themeSystem') }
  ];

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="hidden sm:inline text-slate-500">{t('theme')}:</span>
      <div className="flex rounded-xl border border-slate-200 bg-white/70 shadow-sm overflow-hidden dark:border-slate-700 dark:bg-slate-800">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              setLoading(true);
              setTheme(opt.value);
              setTimeout(() => setLoading(false), 300);
            }}
            className={`px-3 py-2 text-xs sm:text-sm transition-colors ${
              opt.value === theme
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
