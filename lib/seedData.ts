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
    createdAt: '2024-01-10',
    creator: 'دانشکده فناوری',
    hook: 'در چند دقیقه تازه‌ترین دستاوردهای AI را مرور کنید.'
  },
  {
    id: 'yt-podcast-1',
    title: 'پادکست: گفت‌وگو درباره استارتاپ‌ها',
    description: 'مصاحبه با بنیان‌گذار یک استارتاپ موفق',
    category: 'پادکست',
    type: 'youtube',
    youtubeId: '3JZ_D3ELwOQ',
    createdAt: '2024-02-18',
    creator: 'رادیو استارتاپ',
    hook: 'در این گفت‌وگو تجربیات رشد سریع را می‌شنوید.'
  },
  {
    id: 'yt-edu-1',
    title: 'آموزش نکات اساسی جاوااسکریپت',
    description: 'درس کوتاه برای تازه‌کارها',
    category: 'آموزشی',
    type: 'youtube',
    youtubeId: 'PkZNo7MFNFg',
    createdAt: '2024-03-05',
    creator: 'کلاس برنامه‌نویسی',
    hook: 'شروع سریع و کاربردی برای ورود به دنیای JS.'
  },
  {
    id: 'yt-art-1',
    title: 'الهام از طراحی مینیمال',
    description: 'ویدیو کوتاه درباره اصول طراحی مینیمال',
    category: 'هنر',
    type: 'youtube',
    youtubeId: 'V-_O7nl0Ii0',
    createdAt: '2024-04-12',
    creator: 'استودیو هنر مینیمال',
    hook: 'سه قانون طلایی طراحی مینیمال را یاد بگیرید.'
  },
  {
    id: 'file-story-1',
    title: 'داستان کوتاه با انیمیشن',
    description: 'ویدیو نمونه برای تست پخش و دانلود',
    category: 'سرگرمی',
    type: 'file',
    fileUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    creator: 'Knoverse',
    hook: 'انیمیشن کوتاه و جذاب برای آشنایی با پخشگر.',
    createdAt: '2024-05-20'
  }
];
