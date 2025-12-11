'use client';

import { VideoItem } from '../lib/types';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-full bg-white shadow px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
        >
          بستن
        </button>
        <div className="grid gap-4 p-6 md:grid-cols-5">
          <div className="md:col-span-3 aspect-video bg-slate-100 rounded-xl overflow-hidden">
            {video.type === 'youtube' && video.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                allowFullScreen
                className="h-full w-full"
              />
            ) : video.type === 'file' && video.fileUrl ? (
              <video controls className="h-full w-full object-cover">
                <source src={video.fileUrl} />
              </video>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">
                پخش‌کننده در دسترس نیست
              </div>
            )}
          </div>
          <div className="md:col-span-2 space-y-3 text-right">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {video.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">{video.title}</h2>
            <p className="text-sm text-slate-600 leading-7">{video.description}</p>
            {video.createdAt && <p className="text-xs text-slate-500">تاریخ: {video.createdAt}</p>}
            {video.createdByPhone && (
              <p className="text-xs text-slate-500">ثبت شده توسط: {video.createdByPhone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
