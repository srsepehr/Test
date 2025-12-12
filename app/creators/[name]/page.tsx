'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import { useAppContext } from '../../../components/Providers';
import VideoCard from '../../../components/VideoCard';
import { useTranslations } from '../../../lib/useTranslations';

export default function CreatorPage() {
  const { name } = useParams<{ name: string }>();
  const { videos, setLoading } = useAppContext();
  const router = useRouter();
  const t = useTranslations();
  const decoded = decodeURIComponent(name);

  const creatorVideos = useMemo(
    () => videos.filter((v) => (v.creator || '').toLowerCase() === decoded.toLowerCase()),
    [videos, decoded]
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{decoded}</h1>
          <p className="text-slate-600 dark:text-slate-200">{t('speakerVideos')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creatorVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={(v) => {
                setLoading(true);
                router.push(`/videos/${v.id}`);
              }}
            />
          ))}
          {creatorVideos.length === 0 && (
            <p className="text-slate-500 dark:text-slate-300">ویدیویی برای این سخنران یافت نشد.</p>
          )}
        </div>
      </main>
    </div>
  );
}
