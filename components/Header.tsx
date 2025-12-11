'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAppContext } from './Providers';
import { useEffect, useState } from 'react';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export default function Header({ searchTerm = '', onSearchChange }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAppContext();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleAuthClick = () => {
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
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
            ▶
          </div>
          <div>
            <p className="text-xl font-semibold">کتابخانه ویدیو و پادکست</p>
            <p className="text-sm text-slate-500">پخش آنلاین و مدیریت ساده</p>
          </div>
        </div>
        {onSearchChange && (
          <div className="flex-1 sm:max-w-xl">
            <input
              aria-label="جستجو"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                onSearchChange(e.target.value);
              }}
              placeholder="جستجوی عنوان یا توضیحات..."
              className="w-full"
            />
          </div>
        )}
        <div className="flex items-center gap-3 justify-end">
          {user && (
            <span className="text-sm text-slate-600">{user.phone}</span>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300"
            >
              خروج از حساب
            </button>
          )}
          <button
            onClick={handleAuthClick}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            {user ? 'پروفایل من' : 'ورود / ثبت‌نام'}
          </button>
        </div>
      </div>
    </header>
  );
}
