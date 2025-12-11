'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import { useAppContext } from '../../components/Providers';
import { parseYouTubeId } from '../../lib/youtube';
import { VideoItem } from '../../lib/types';
import VideoModal from '../../components/VideoModal';
import VideoCard from '../../components/VideoCard';

export default function ProfilePage() {
  const router = useRouter();
  const { user, hydrated, videos, addVideo } = useAppContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('تکنولوژی');
  const [customCategory, setCustomCategory] = useState('');
  const [type, setType] = useState<'youtube' | 'file'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace('/login?msg=برای%20دسترسی%20به%20پروفایل%20ابتدا%20وارد%20حساب%20خود%20شوید.');
    }
  }, [hydrated, user, router]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => set.add(v.category));
    return Array.from(set);
  }, [videos]);

  const myVideos = useMemo(() => {
    if (!user) return [] as VideoItem[];
    return videos.filter((v) => v.createdByPhone === user.phone);
  }, [videos, user]);

  const handleFileChange = (file?: File) => {
    if (!file) {
      setFileUrl('');
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!user) {
      setError('برای ثبت ویدیو باید وارد شوید.');
      return;
    }
    if (!title.trim() || !description.trim()) {
      setError('عنوان و توضیحات ضروری هستند.');
      return;
    }
    const finalCategory = category === 'custom' ? customCategory.trim() : category;
    if (!finalCategory) {
      setError('دسته‌بندی را مشخص کنید.');
      return;
    }

    let youtubeId: string | undefined;
    let localFileUrl: string | undefined;

    if (type === 'youtube') {
      const parsed = parseYouTubeId(youtubeUrl);
      if (!parsed) {
        setError('لینک یوتیوب معتبر نیست.');
        return;
      }
      youtubeId = parsed;
    } else if (type === 'file') {
      if (!fileUrl) {
        setError('لطفاً یک فایل ویدیویی انتخاب کنید.');
        return;
      }
      localFileUrl = fileUrl;
    }

    addVideo({
      title: title.trim(),
      description: description.trim(),
      category: finalCategory,
      type,
      youtubeId,
      fileUrl: localFileUrl,
      createdByPhone: user.phone
    });

    setTitle('');
    setDescription('');
    setYoutubeUrl('');
    setFileUrl('');
    setCustomCategory('');
    setCategory('تکنولوژی');
    setType('youtube');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-2 text-right">
          <p className="text-sm text-slate-600">پروفایل کاربر</p>
          <h1 className="text-3xl font-bold text-slate-900">سلام {user?.phone ?? ''}</h1>
          <p className="text-slate-600">در این صفحه می‌توانید ویدیوهای خود را اضافه کنید و آن‌ها را مدیریت نمایید.</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">افزودن ویدیو جدید</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-800">
                  عنوان ویدیو
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً معرفی محصول" className="mt-1 w-full" />
                </label>
                <label className="text-sm font-semibold text-slate-800">
                  دسته‌بندی
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="custom">دسته جدید...</option>
                  </select>
                </label>
              </div>
              {category === 'custom' && (
                <label className="text-sm font-semibold text-slate-800">
                  نام دسته جدید
                  <input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="مثلاً آشپزی"
                    className="mt-1 w-full"
                  />
                </label>
              )}
              <label className="text-sm font-semibold text-slate-800 block">
                توضیحات کوتاه
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="چند جمله در مورد ویدیو"
                  className="mt-1 w-full"
                  rows={3}
                />
              </label>
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-800">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    checked={type === 'youtube'}
                    onChange={() => setType('youtube')}
                  />
                  لینک یوتیوب
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    checked={type === 'file'}
                    onChange={() => setType('file')}
                  />
                  آپلود فایل ویدیو
                </label>
              </div>
              {type === 'youtube' && (
                <label className="text-sm font-semibold text-slate-800 block">
                  لینک یوتیوب
                  <input
                    dir="ltr"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="mt-1 w-full"
                  />
                </label>
              )}
              {type === 'file' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800 block">
                    انتخاب فایل
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0])}
                      className="mt-1 block w-full border-none p-0"
                    />
                  </label>
                  {fileUrl && (
                    <video controls className="mt-2 w-full rounded-xl border border-slate-200">
                      <source src={fileUrl} />
                    </video>
                  )}
                </div>
              )}
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full md:w-auto rounded-lg bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700"
              >
                ذخیره ویدیو
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">ویدیوهای من</h3>
            {myVideos.length === 0 && (
              <p className="text-sm text-slate-500">هنوز ویدیویی اضافه نکرده‌اید.</p>
            )}
            <div className="space-y-3">
              {myVideos.map((video) => (
                <VideoCard key={video.id} video={video} onClick={(v) => setSelected(v)} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
