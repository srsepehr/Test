export type VideoType = 'youtube' | 'file';

export type Language = 'fa' | 'en';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: VideoType;
  youtubeId?: string;
  fileUrl?: string;
  createdByPhone?: string;
  createdAt?: string;
  creator?: string;
  hook?: string;
}

export interface UserSession {
  phone: string;
}

export interface UserNote {
  id: string;
  videoId: string;
  videoTitle: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
}
