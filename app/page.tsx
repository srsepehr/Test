'use client';

import { useMemo, useState } from 'react';
import Header from '../components/Header';
import CategorySection from '../components/CategorySection';
import { useAppContext } from '../components/Providers';
import { useTranslations } from '../lib/useTranslations';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { videos, setLoading } = useAppContext();
  const [search, setSearch] = useState('');
  const t = useTranslations();
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!search.trim()) return videos;
    const query = search.toLowerCase();
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
    );
  }, [search, videos]);

  const categories = useMemo(() => {
    const map: Record<string, VideoItem[]> = {};
    filtered.forEach((video) => {
      if (!map[video.category]) map[video.category] = [];
      map[video.category].push(video);
    });
    return map;
  }, [filtered]);

  const activeSections = search.trim()
    ? { [t('heroTitle')]: filtered }
    : categories;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header searchTerm={search} onSearchChange={setSearch} />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 text-right space-y-3 dark:bg-slate-800 dark:ring-slate-700">
          <p className="text-sm text-blue-600 font-semibold">{t('heroGreeting')}</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('heroTitle')}</h1>
          <p className="text-slate-600 leading-7 dark:text-slate-200">
            {t('heroDescription')}
          </p>
        </section>

        <div className="space-y-8">
          {Object.keys(activeSections).length === 0 && (
            <p className="text-center text-slate-500 dark:text-slate-300">{t('noResults')}</p>
          )}
          {Object.entries(activeSections).map(([category, list]) => (
            <CategorySection
              key={category}
              title={category}
              videos={list}
              onVideoClick={(video) => {
                setLoading(true);
                router.push(`/videos/${video.id}`);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
