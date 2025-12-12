'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Player from '../../../components/Player';
import DownloadButton from '../../../components/DownloadButton';
import NotesPanel from '../../../components/NotesPanel';
import { useAppContext } from '../../../components/Providers';
import { useTranslations } from '../../../lib/useTranslations';

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const { videos, setLoading } = useAppContext();
  const router = useRouter();
  const t = useTranslations();

  const video = useMemo(() => videos.find((v) => v.id === id), [videos, id]);

  useEffect(() => {
    setLoading(false);
  }, [id, setLoading]);

  if (!video) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-10 text-center text-slate-600 dark:text-slate-200">
          <p>ویدیو یافت نشد.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            بازگشت به خانه
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Player video={video} />
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <div className="flex flex-col gap-2 text-right">
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-700">{video.category}</span>
                  {video.creator && (
                    <button
                      onClick={() => {
                        setLoading(true);
                        router.push(`/creators/${encodeURIComponent(video.creator)}`);
                      }}
                      className="text-blue-600 hover:underline dark:text-blue-300"
                    >
                      {video.creator}
                    </button>
                  )}
                  {video.createdAt && <span>{video.createdAt}</span>}
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{video.title}</h1>
                {video.hook && (
                  <p className="text-sm text-slate-600 dark:text-slate-200">{video.hook}</p>
                )}
                <p className="text-slate-700 leading-7 dark:text-slate-100">{video.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <DownloadButton video={video} />
            <NotesPanel video={video} />
          </div>
        </div>
      </main>
    </div>
  );
}
