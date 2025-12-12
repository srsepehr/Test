'use client';

import { useState } from 'react';
import { VideoItem } from '../lib/types';
import { useTranslations } from '../lib/useTranslations';

interface DownloadProps {
  video: VideoItem;
}

export default function DownloadButton({ video }: DownloadProps) {
  const t = useTranslations();
  const [progress, setProgress] = useState<number>(0);
  const [state, setState] = useState<'idle' | 'downloading' | 'done' | 'error'>('idle');

  const handleDownload = async () => {
    if (!video.fileUrl) {
      setState('error');
      return;
    }
    try {
      setState('downloading');
      setProgress(0);
      const response = await fetch(video.fileUrl);
      if (!response.ok || !response.body) throw new Error('download error');
      const reader = response.body.getReader();
      const contentLength = Number(response.headers.get('Content-Length')) || 0;
      let receivedLength = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedLength += value.length;
          if (contentLength) {
            setProgress(Math.round((receivedLength / contentLength) * 100));
          }
        }
      }

      const blob = new Blob(chunks);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${video.title || 'video'}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setState('done');
      setProgress(100);
    } catch (error) {
      setState('error');
    }
  };

  const disabled = video.type === 'youtube' && !video.fileUrl;

  return (
    <div className="space-y-2">
      <button
        onClick={handleDownload}
        disabled={disabled || state === 'downloading'}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 disabled:bg-slate-400"
      >
        {state === 'downloading'
          ? `${t('downloading')}... ${progress ? progress + '%' : ''}`
          : disabled
          ? t('downloadNotAvailable')
          : t('download')}
      </button>
      {state !== 'idle' && (
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden dark:bg-slate-700">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {t('downloadProgress')}: {progress}%
          </p>
          {state === 'done' && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">{t('downloadReady')}</p>
          )}
          {state === 'error' && (
            <p className="text-xs text-red-500">{t('downloadFailed')}</p>
          )}
        </div>
      )}
    </div>
  );
}
