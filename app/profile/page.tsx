'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import { useAppContext } from '../../components/Providers';
import { parseYouTubeId } from '../../lib/youtube';
import { VideoItem } from '../../lib/types';
import VideoCard from '../../components/VideoCard';
import { useTranslations } from '../../lib/useTranslations';

export default function ProfilePage() {
  const router = useRouter();
  const { user, hydrated, videos, addVideo, setLoading, notes } = useAppContext();
  const t = useTranslations();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('تکنولوژی');
  const [customCategory, setCustomCategory] = useState('');
  const [type, setType] = useState<'youtube' | 'file'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [creator, setCreator] = useState('');
  const [hook, setHook] = useState('');
  const [error, setError] = useState('');

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
      setError(t('loginRequired'));
      return;
    }
    if (!title.trim() || !description.trim()) {
      setError(t('titleLabel'));
      return;
    }
    const finalCategory = category === 'custom' ? customCategory.trim() : category;
    if (!finalCategory) {
      setError(t('categoryLabel'));
      return;
    }

    let youtubeId: string | undefined;
    let localFileUrl: string | undefined;

    if (type === 'youtube') {
      const parsed = parseYouTubeId(youtubeUrl);
      if (!parsed) {
        setError(t('youtubeLink'));
        return;
      }
      youtubeId = parsed;
    } else if (type === 'file') {
      if (!fileUrl) {
        setError(t('fileUpload'));
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
      createdByPhone: user.phone,
      creator: creator || user.phone,
      hook
    });

    setTitle('');
    setDescription('');
    setYoutubeUrl('');
    setFileUrl('');
    setCustomCategory('');
    setCategory('تکنولوژی');
    setType('youtube');
    setCreator('');
    setHook('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-2 text-right dark:bg-slate-800 dark:ring-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-200">پروفایل کاربر</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">سلام {user?.phone ?? ''}</h1>
          <p className="text-slate-600 dark:text-slate-200">در این صفحه می‌توانید ویدیوهای خود را اضافه کنید و آن‌ها را مدیریت نمایید.</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-4 dark:bg-slate-800 dark:ring-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('addVideo')}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {t('titleLabel')}
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً معرفی محصول" className="mt-1 w-full dark:bg-slate-900 dark:text-white" />
                </label>
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {t('categoryLabel')}
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full dark:bg-slate-900 dark:text-white"
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
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  نام دسته جدید
                  <input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="مثلاً آشپزی"
                    className="mt-1 w-full dark:bg-slate-900 dark:text-white"
                  />
                </label>
              )}
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-100 block">
                {t('descriptionLabel')}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="چند جمله در مورد ویدیو"
                  className="mt-1 w-full dark:bg-slate-900 dark:text-white"
                  rows={3}
                />
              </label>
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-100 block">
                {t('creatorLabel')}
                <input
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  placeholder="نام سخنران یا صاحب محتوا"
                  className="mt-1 w-full dark:bg-slate-900 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-100 block">
                {t('hookLabel')}
                <input
                  value={hook}
                  onChange={(e) => setHook(e.target.value)}
                  placeholder="یک جمله جذاب"
                  className="mt-1 w-full dark:bg-slate-900 dark:text-white"
                />
              </label>
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
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
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-100 block">
                  {t('youtubeLink')}
                  <input
                    dir="ltr"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder={t('youtubePlaceholder')}
                    className="mt-1 w-full dark:bg-slate-900 dark:text-white"
                  />
                </label>
              )}
              {type === 'file' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-100 block">
                    {t('fileUpload')}
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0])}
                      className="mt-1 block w-full border-none p-0 text-slate-600"
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
                {t('submit')}
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-3 dark:bg-slate-800 dark:ring-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('myVideos')}</h3>
            {myVideos.length === 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-300">هنوز ویدیویی اضافه نکرده‌اید.</p>
            )}
            <div className="space-y-3">
              {myVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={(v) => {
                    setLoading(true);
                    router.push(`/videos/${v.id}`);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-3 dark:bg-slate-800 dark:ring-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('myNotesHeading')}</h3>
          {user ? (
            <div className="space-y-2">
              {notes.filter((n) => n.owner === user.phone).map((note) => (
                <div key={note.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-600">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
                    <span>{note.videoTitle}</span>
                    <span>{new Date(note.updatedAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-100">{note.text}</p>
                  <button
                    onClick={() => {
                      setLoading(true);
                      router.push(`/videos/${note.videoId}`);
                    }}
                    className="mt-2 text-xs text-blue-600 hover:underline dark:text-blue-300"
                  >
                    {t('playVideo')}
                  </button>
                </div>
              ))}
              {notes.filter((n) => n.owner === user.phone).length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-300">یادداشتی ثبت نشده است.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">{t('loginRequired')}</p>
          )}
        </section>
      </main>
    </div>
  );
}
