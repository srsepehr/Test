'use client';

import { useMemo, useState } from 'react';
import Header from '../components/Header';
import CategorySection from '../components/CategorySection';
import VideoModal from '../components/VideoModal';
import { useAppContext } from '../components/Providers';
import { VideoItem } from '../lib/types';

export default function HomePage() {
  const { videos } = useAppContext();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<VideoItem | null>(null);

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
    ? { 'نتایج جستجو': filtered }
    : categories;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header searchTerm={search} onSearchChange={setSearch} />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 text-right space-y-3">
          <p className="text-sm text-blue-600 font-semibold">سلام! آماده تماشا هستید؟</p>
          <h1 className="text-3xl font-bold text-slate-900">کلکسیونی از ویدیو و پادکست‌های جذاب</h1>
          <p className="text-slate-600 leading-7">
            در اینجا می‌توانید جدیدترین ویدیوها و پادکست‌ها را ببینید و هر زمان که خواستید ویدیوی جدیدی اضافه کنید.
            با جستجو یا مرور دسته‌بندی‌ها، محتوای مورد علاقه خود را پیدا کنید.
          </p>
        </section>

        <div className="space-y-8">
          {Object.keys(activeSections).length === 0 && (
            <p className="text-center text-slate-500">موردی یافت نشد.</p>
          )}
          {Object.entries(activeSections).map(([category, list]) => (
            <CategorySection
              key={category}
              title={category}
              videos={list}
              onVideoClick={(video) => setSelected(video)}
            />
          ))}
        </div>
      </main>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
