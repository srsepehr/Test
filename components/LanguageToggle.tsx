'use client';

import { useAppContext } from './Providers';
import { useTranslations } from '../lib/useTranslations';
import { Language } from '../lib/types';

export default function LanguageToggle() {
  const { language, setLanguage, setLoading } = useAppContext();
  const t = useTranslations();

  const options: { value: Language; label: string; flag: string }[] = [
    { value: 'fa', label: t('languageFa'), flag: '🇮🇷' },
    { value: 'en', label: t('languageEn'), flag: '🇺🇸' }
  ];

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="hidden sm:inline text-slate-500">{t('language')}:</span>
      <div className="flex rounded-xl border border-slate-200 bg-white/70 shadow-sm overflow-hidden dark:border-slate-700 dark:bg-slate-800">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              setLoading(true);
              setLanguage(opt.value);
              setTimeout(() => setLoading(false), 300);
            }}
            className={`px-3 py-2 flex items-center gap-1 text-xs sm:text-sm transition-colors ${
              language === opt.value
                ? 'bg-blue-600 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <span>{opt.flag}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
