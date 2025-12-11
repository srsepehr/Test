import { VideoItem } from './types';

// Initial videos to make the homepage lively on first load.
export const seedVideos: VideoItem[] = [
  {
    id: 'yt-tech-1',
    title: 'معرفی جدیدترین فناوری‌های هوش مصنوعی',
    description: 'نگاهی سریع به ترندهای هوش مصنوعی در سال جاری',
    category: 'تکنولوژی',
    type: 'youtube',
    youtubeId: 'dQw4w9WgXcQ',
    createdAt: '2024-01-10'
  },
  {
    id: 'yt-podcast-1',
    title: 'پادکست: گفت‌وگو درباره استارتاپ‌ها',
    description: 'مصاحبه با بنیان‌گذار یک استارتاپ موفق',
    category: 'پادکست',
    type: 'youtube',
    youtubeId: '3JZ_D3ELwOQ',
    createdAt: '2024-02-18'
  },
  {
    id: 'yt-edu-1',
    title: 'آموزش نکات اساسی جاوااسکریپت',
    description: 'درس کوتاه برای تازه‌کارها',
    category: 'آموزشی',
    type: 'youtube',
    youtubeId: 'PkZNo7MFNFg',
    createdAt: '2024-03-05'
  },
  {
    id: 'yt-art-1',
    title: 'الهام از طراحی مینیمال',
    description: 'ویدیو کوتاه درباره اصول طراحی مینیمال',
    category: 'هنر',
    type: 'youtube',
    youtubeId: 'V-_O7nl0Ii0',
    createdAt: '2024-04-12'
  }
];
