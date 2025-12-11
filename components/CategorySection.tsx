'use client';

import { VideoItem } from '../lib/types';
import VideoCard from './VideoCard';

interface CategorySectionProps {
  title: string;
  videos: VideoItem[];
  onVideoClick: (video: VideoItem) => void;
}

export default function CategorySection({ title, videos, onVideoClick }: CategorySectionProps) {
  if (videos.length === 0) return null;
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={onVideoClick} />
        ))}
      </div>
    </section>
  );
}
