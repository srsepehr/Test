'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedVideos } from '../lib/seedData';
import { UserSession, VideoItem } from '../lib/types';

interface AppContextShape {
  user: UserSession | null;
  videos: VideoItem[];
  hydrated: boolean;
  login: (phone: string) => void;
  logout: () => void;
  addVideo: (input: Omit<VideoItem, 'id'>) => VideoItem;
}

const AppContext = createContext<AppContextShape | undefined>(undefined);

const uniqueVideos = (list: VideoItem[]): VideoItem[] => {
  const map = new Map<string, VideoItem>();
  list.forEach((video) => {
    map.set(video.id, video);
  });
  return Array.from(map.values());
};

const buildId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `video-${Date.now()}`;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>(seedVideos);
  const [hydrated, setHydrated] = useState(false);

  // Load state from localStorage once the app mounts on the client.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedVideos = window.localStorage.getItem('videos');
    const storedSession = window.localStorage.getItem('session');

    if (storedVideos) {
      try {
        const parsed = JSON.parse(storedVideos) as VideoItem[];
        setVideos(uniqueVideos([...seedVideos, ...parsed]));
      } catch (error) {
        setVideos(seedVideos);
      }
    } else {
      setVideos(seedVideos);
    }

    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession) as UserSession;
        setUser(parsedSession);
      } catch (error) {
        setUser(null);
      }
    }
    setHydrated(true);
  }, []);

  // Persist videos to localStorage.
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    window.localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos, hydrated]);

  // Persist session to localStorage.
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    if (user) {
      window.localStorage.setItem('session', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('session');
    }
  }, [user, hydrated]);

  const login = (phone: string) => setUser({ phone });
  const logout = () => setUser(null);

  const addVideo = (input: Omit<VideoItem, 'id'>): VideoItem => {
    const video: VideoItem = {
      ...input,
      id: buildId(),
      createdAt: input.createdAt || new Date().toISOString().slice(0, 10)
    };
    setVideos((prev) => [...prev, video]);
    return video;
  };

  const value = useMemo(
    () => ({
      user,
      videos,
      hydrated,
      login,
      logout,
      addVideo
    }),
    [user, videos, hydrated]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within Providers');
  }
  return context;
};
