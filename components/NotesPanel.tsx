'use client';

import { useEffect, useState } from 'react';
import { VideoItem } from '../lib/types';
import { useAppContext } from './Providers';
import { useTranslations } from '../lib/useTranslations';

interface NotesPanelProps {
  video: VideoItem;
}

export default function NotesPanel({ video }: NotesPanelProps) {
  const { user, addNote, notes } = useAppContext();
  const [text, setText] = useState('');
  const t = useTranslations();

  useEffect(() => {
    if (!user) return;
    const existing = notes.find((n) => n.videoId === video.id && n.owner === user.phone);
    if (existing) {
      setText(existing.text);
    }
  }, [video.id, user, notes]);

  const handleSave = () => {
    if (!user) return;
    addNote({
      videoId: video.id,
      videoTitle: video.title,
      text: text.trim(),
      owner: user.phone
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-slate-800 dark:text-slate-50">{t('notesHeading')}</h3>
        {!user && <span className="text-xs text-amber-600">{t('loginRequired')}</span>}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('notesPlaceholder')}
        disabled={!user}
        rows={5}
        className="w-full bg-white dark:bg-slate-900"
      />
      <button
        onClick={handleSave}
        disabled={!user}
        className="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-slate-500"
      >
        {t('saveNote')}
      </button>
    </div>
  );
}
