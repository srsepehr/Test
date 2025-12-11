'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAppContext } from './Providers';
import { useEffect, useState } from 'react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useTranslations } from '../lib/useTranslations';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export default function Header({ searchTerm = '', onSearchChange }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, setLoading } = useAppContext();
  const t = useTranslations();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleAuthClick = () => {
    setLoading(true);
    if (user) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    logout();
    if (pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-700">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="flex items-center gap-3 text-right"
          onClick={() => {
            setLoading(true);
            router.push('/');
          }}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow">
            KN
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-slate-900 dark:text-white">Knoverse</p>
            <p className="text-xs text-slate-500 dark:text-slate-300">{t('tagline')}</p>
          </div>
        </button>
        {onSearchChange && (
          <div className="flex-1 sm:max-w-xl">
            <input
              aria-label={t('searchPlaceholder')}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                onSearchChange(e.target.value);
              }}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-white dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}
        <div className="flex items-center gap-3 justify-end flex-wrap">
          <LanguageToggle />
          <ThemeToggle />
          {user && (
            <span className="text-sm text-slate-600 dark:text-slate-200">{user.phone}</span>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-500"
            >
              {t('logout')}
            </button>
          )}
          <button
            onClick={handleAuthClick}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {user ? t('profile') : t('login')}
          </button>
        </div>
      </div>
    </header>
  );
}
