'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedVideos } from '../lib/seedData';
import {
  Language,
  ThemeMode,
  UserNote,
  UserSession,
  VideoItem
} from '../lib/types';
import { getDirection } from '../lib/i18n';

interface AppContextShape {
  user: UserSession | null;
  videos: VideoItem[];
  hydrated: boolean;
  language: Language;
  theme: ThemeMode;
  loading: boolean;
  notes: UserNote[];
  login: (phone: string) => void;
  logout: () => void;
  addVideo: (input: Omit<VideoItem, 'id'>) => VideoItem;
  setLanguage: (lang: Language) => void;
  setTheme: (mode: ThemeMode) => void;
  setLoading: (val: boolean) => void;
  addNote: (payload: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => UserNote;
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
  const [language, setLanguageState] = useState<Language>('fa');
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<UserNote[]>([]);

  // Load state from localStorage once the app mounts on the client.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedVideos = window.localStorage.getItem('videos');
    const storedSession = window.localStorage.getItem('session');
    const storedLanguage = window.localStorage.getItem('language') as Language | null;
    const storedTheme = window.localStorage.getItem('theme') as ThemeMode | null;
    const storedNotes = window.localStorage.getItem('notes');

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

    if (storedLanguage) {
      setLanguageState(storedLanguage);
    }

    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }

    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes) as UserNote[];
        setNotes(parsedNotes);
      } catch (error) {
        setNotes([]);
      }
    }

    setHydrated(true);
  }, []);

  // sync HTML direction + lang
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = language;
    document.documentElement.dir = getDirection(language);
  }, [language]);

  // apply theme class
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const desired = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    root.classList.remove('light', 'dark');
    root.classList.add(desired);
  }, [theme]);

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

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    window.localStorage.setItem('language', language);
  }, [language, hydrated]);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    window.localStorage.setItem('theme', theme);
  }, [theme, hydrated]);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes, hydrated]);

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

  const addNote: AppContextShape['addNote'] = (payload) => {
    const now = new Date().toISOString();
    const newNote: UserNote = {
      id: payload.id || buildId(),
      createdAt: payload.id ? payload.createdAt ?? now : now,
      updatedAt: now,
      ...payload
    };
    setNotes((prev) => {
      const filtered = prev.filter((n) => n.id !== newNote.id);
      return [...filtered, newNote];
    });
    return newNote;
  };

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setTheme = (mode: ThemeMode) => setThemeState(mode);

  const value = useMemo(
    () => ({
      user,
      videos,
      hydrated,
      language,
      theme,
      loading,
      notes,
      login,
      logout,
      addVideo,
      setLanguage,
      setTheme,
      setLoading,
      addNote
    }),
    [user, videos, hydrated, language, theme, loading, notes]
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
