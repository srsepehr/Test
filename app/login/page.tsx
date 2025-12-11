'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import { useAppContext } from '../../components/Providers';
import { useTranslations } from '../../lib/useTranslations';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, hydrated, setLoading } = useAppContext();
  const t = useTranslations();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [error, setError] = useState('');

  useEffect(() => {
    if (hydrated && user) {
      router.push('/profile');
    }
  }, [hydrated, user, router]);

  const infoMessage = searchParams.get('msg');

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const pattern = /^09\d{9}$/;
    if (!pattern.test(phone)) {
      setError('شماره موبایل باید با 09 شروع شود و 11 رقم باشد.');
      return;
    }
    setStep('code');
  };

  const handleCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('ابتدا شماره موبایل را وارد کنید.');
      return;
    }
    login(phone);
    setLoading(true);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10 text-right space-y-6">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-4 dark:bg-slate-800 dark:ring-slate-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('login')}</h1>
          <p className="text-slate-600 dark:text-slate-200">{t('enterPhone')}</p>
          {infoMessage && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-amber-700 text-sm">
              {infoMessage}
            </div>
          )}
          {step === 'phone' && (
            <form className="space-y-3" onSubmit={handlePhoneSubmit}>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t('enterPhone')}
                <input
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xxxxxxxxx"
                  className="mt-1 w-full dark:bg-slate-900 dark:text-white"
                  inputMode="tel"
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
              >
                {t('sendCode')}
              </button>
            </form>
          )}
          {step === 'code' && (
            <form className="space-y-3" onSubmit={handleCodeSubmit}>
              <p className="text-sm text-slate-600 dark:text-slate-200">{t('enterCode')}</p>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t('confirm')}
                <input
                  dir="ltr"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="1234"
                  className="mt-1 w-full dark:bg-slate-900 dark:text-white"
                  inputMode="numeric"
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
              >
                {t('profile')}
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                {t('enterPhone')}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
