'use client';

import { VideoItem } from '../lib/types';
import Player from './Player';
import { useTranslations } from '../lib/useTranslations';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const t = useTranslations();
  if (!video) return null;
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden dark:bg-slate-800 dark:ring-slate-700">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-full bg-white shadow px-3 py-1 text-sm text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100"
        >
          {t('close')}
        </button>
        <div className="grid gap-4 p-6 md:grid-cols-5">
          <div className="md:col-span-3 aspect-video bg-slate-100 rounded-xl overflow-hidden dark:bg-slate-700">
            <Player video={video} />
          </div>
          <div className="md:col-span-2 space-y-3 text-right">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {video.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{video.title}</h2>
            <p className="text-sm text-slate-600 leading-7 dark:text-slate-200">{video.description}</p>
            {video.createdAt && <p className="text-xs text-slate-500 dark:text-slate-300">تاریخ: {video.createdAt}</p>}
            {video.createdByPhone && (
              <p className="text-xs text-slate-500 dark:text-slate-300">ثبت شده توسط: {video.createdByPhone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
