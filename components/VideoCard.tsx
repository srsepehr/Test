'use client';

import Image from 'next/image';
import { VideoItem } from '../lib/types';
import { youtubeThumbnail } from '../lib/youtube';

interface VideoCardProps {
  video: VideoItem;
  onClick: (video: VideoItem) => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const thumb = video.type === 'youtube' ? youtubeThumbnail(video.youtubeId) : '/placeholder-thumb.svg';
  return (
    <button
      onClick={() => onClick(video)}
      className="group text-right w-full rounded-xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-md transition dark:bg-slate-800 dark:ring-slate-700"
    >
      <div className="relative h-40 w-full bg-slate-100 dark:bg-slate-700">
        <Image
          src={thumb}
          alt={video.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 flex flex-col gap-1 text-right">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-700">{video.category}</span>
          {video.createdAt && <span>{video.createdAt}</span>}
        </div>
        <p className="font-semibold text-slate-900 line-clamp-2 dark:text-white">{video.title}</p>
        <p className="text-sm text-slate-600 line-clamp-2 dark:text-slate-200">{video.description}</p>
        {video.creator && (
          <p className="text-xs text-blue-600 dark:text-blue-300">{video.creator}</p>
        )}
      </div>
    </button>
  );
}
