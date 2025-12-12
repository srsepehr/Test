// Parse YouTube video ID from a full URL or raw ID.
export const parseYouTubeId = (url: string): string | null => {
  try {
    // If the input is already an 11 char ID, accept it.
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return url;
    }
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.substring(1);
    }
    if (parsed.searchParams.get('v')) {
      return parsed.searchParams.get('v');
    }
    const parts = parsed.pathname.split('/');
    return parts[parts.length - 1] || null;
  } catch (error) {
    return null;
  }
};

// Build a YouTube thumbnail url.
export const youtubeThumbnail = (id?: string): string => {
  if (!id) return '/placeholder-thumb.svg';
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
};
