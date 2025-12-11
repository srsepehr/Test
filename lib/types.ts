export type VideoType = 'youtube' | 'file';

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
}

export interface UserSession {
  phone: string;
}
