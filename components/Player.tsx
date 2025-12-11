'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { VideoItem } from '../lib/types';
import { useAppContext } from './Providers';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface PlayerProps {
  video: VideoItem;
  onReady?: () => void;
}

export default function Player({ video, onReady }: PlayerProps) {
  const { setLoading } = useAppContext();
  const [isReady, setIsReady] = useState(false);

  const url = video.type === 'youtube' && video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : video.fileUrl || '';

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-lg">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 text-white">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-blue-400" />
        </div>
      )}
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        playing={false}
        onReady={() => {
          setIsReady(true);
          setLoading(false);
          onReady?.();
        }}
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
        style={{ aspectRatio: '16 / 9' }}
      />
    </div>
  );
}
