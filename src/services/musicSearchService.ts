import { resolveYouTubeApiKey } from './youtubeApi';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const MIN_ACCEPTABLE_SCORE = 12;

export interface MusicSearchCandidate {
  videoId: string;
  title: string;
  artistOrChannel: string;
  thumbnailUrl: string;
  liveBroadcastContent?: string;
}

export interface MusicSearchMatch extends MusicSearchCandidate {
  query: string;
  score: number;
  source: 'youtube';
}

export interface MusicSearchResult {
  success: boolean;
  track?: MusicSearchMatch;
  error?: string;
}

interface YouTubeSearchResponseItem {
  id?: {
    kind?: string;
    videoId?: string;
  };
  snippet?: {
    title?: string;
    channelTitle?: string;
    liveBroadcastContent?: string;
    thumbnails?: {
      default?: { url?: string };
      medium?: { url?: string };
      high?: { url?: string };
    };
  };
}

const MUSIC_FILLER_PATTERN = /\b(play|music|song|songs|track|listen to|on youtube|on youtube music|please|for me)\b/gi;
const WHITESPACE_PATTERN = /\s+/g;

const toSearchableText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const tokenize = (value: string) =>
  toSearchableText(value)
    .split(' ')
    .filter(Boolean);

export const cleanMusicQuery = (query: string): string => {
  const trimmed = query.trim();
  if (!trimmed) return '';

  const quotedMatch = trimmed.match(/"([^"]+)"/);
  if (quotedMatch?.[1]?.trim()) {
    return quotedMatch[1].trim();
  }

  return trimmed
    .replace(MUSIC_FILLER_PATTERN, ' ')
    .replace(WHITESPACE_PATTERN, ' ')
    .trim();
};

const selectThumbnail = (item: YouTubeSearchResponseItem): string =>
  item.snippet?.thumbnails?.high?.url
  || item.snippet?.thumbnails?.medium?.url
  || item.snippet?.thumbnails?.default?.url
  || '';

const extractCandidate = (item: YouTubeSearchResponseItem): MusicSearchCandidate | null => {
  const videoId = item.id?.videoId?.trim();
  if (!videoId) return null;

  return {
    videoId,
    title: item.snippet?.title?.trim() || 'YouTube Track',
    artistOrChannel: item.snippet?.channelTitle?.trim() || 'Unknown Artist',
    thumbnailUrl: selectThumbnail(item),
    liveBroadcastContent: item.snippet?.liveBroadcastContent,
  };
};

export const scoreMusicCandidate = (query: string, candidate: MusicSearchCandidate): number => {
  const normalizedQuery = toSearchableText(query);
  const queryTokens = tokenize(query);
  const title = toSearchableText(candidate.title);
  const channel = toSearchableText(candidate.artistOrChannel);
  const combined = `${title} ${channel}`;

  let score = 0;

  if (title === normalizedQuery) score += 120;
  if (title.includes(normalizedQuery)) score += 55;
  if (channel.includes(normalizedQuery)) score += 25;

  for (const token of queryTokens) {
    if (title.includes(token)) score += 12;
    if (channel.includes(token)) score += 7;
  }

  if (/\bofficial\b/.test(title)) score += 24;
  if (/\baudio\b/.test(title)) score += 20;
  if (/\blyric\b/.test(title)) score += 10;
  if (/\btopic\b/.test(channel)) score += 22;
  if (/\bvevo\b/.test(channel)) score += 10;
  if (candidate.liveBroadcastContent && candidate.liveBroadcastContent !== 'none') score -= 30;

  const penaltyTerms = ['live', 'cover', 'reaction', 'karaoke', 'shorts', 'short', 'nightcore'];
  for (const term of penaltyTerms) {
    if (combined.includes(term)) score -= 18;
  }

  return score;
};

export const rankMusicCandidates = (query: string, candidates: MusicSearchCandidate[]): MusicSearchMatch[] =>
  candidates
    .map((candidate) => ({
      ...candidate,
      query,
      score: scoreMusicCandidate(query, candidate),
      source: 'youtube' as const,
    }))
    .sort((left, right) => right.score - left.score);

const fetchInvidiousCandidates = async (query: string): Promise<MusicSearchCandidate[]> => {
  const instances = [
    'https://invidious.jing.rocks/api/v1',
    'https://invidious.namazso.eu/api/v1',
    'https://inv.tux.pizza/api/v1'
  ];

  for (const baseUrl of instances) {
    try {
      const params = new URLSearchParams({ q: query, type: 'video' });
      const response = await fetch(`${baseUrl}/search?${params.toString()}`);
      if (!response.ok) continue;

      const items = await response.json();
      if (!Array.isArray(items)) continue;

      const mapped: Array<MusicSearchCandidate | null> = items.map((item: any) => {
        if (item.type !== 'video' || !item.videoId) return null;
        return {
          videoId: item.videoId,
          title: item.title || 'YouTube Track',
          artistOrChannel: item.author || 'Unknown Artist',
          thumbnailUrl: item.videoThumbnails?.find((t: any) => t.quality === 'high')?.url ||
                        item.videoThumbnails?.[0]?.url || '',
          liveBroadcastContent: item.liveNow ? 'live' : 'none',
        } satisfies MusicSearchCandidate;
      });
      return mapped.filter((item): item is MusicSearchCandidate => item !== null);
    } catch {
      continue;
    }
  }
  return [];
};

const fetchMusicCandidates = async (query: string, apiKey: string): Promise<MusicSearchCandidate[]> => {
  if (!apiKey) {
    return fetchInvidiousCandidates(query);
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: '5',
    key: apiKey,
  });

  const response = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('[YouTube API Error]', errorData || response.statusText);
    
    if (response.status === 403) {
      return fetchInvidiousCandidates(query);
    }
    throw new Error(errorData?.error?.message || `YouTube search failed with status ${response.status}`);
  }

  const payload = await response.json() as { items?: YouTubeSearchResponseItem[] };
  return Array.isArray(payload.items)
    ? payload.items.map(extractCandidate).filter((item): item is MusicSearchCandidate => Boolean(item))
    : [];
};

export const searchMusicCandidates = async (query: string): Promise<MusicSearchMatch[]> => {
  const apiKey = await resolveYouTubeApiKey();
  const sanitizedQuery = cleanMusicQuery(query) || query.trim();
  if (!sanitizedQuery) return [];

  try {
    const candidates = await fetchMusicCandidates(sanitizedQuery, apiKey.key);
    return rankMusicCandidates(sanitizedQuery, candidates);
  } catch {
    return [];
  }
};

export const searchMusic = async (query: string): Promise<MusicSearchResult> => {
  const apiKey = await resolveYouTubeApiKey();

  const sanitizedQuery = cleanMusicQuery(query) || query.trim();
  if (!sanitizedQuery) {
    return {
      success: false,
      error: 'A song name is required to search for music.',
    };
  }

  const attempts = Array.from(new Set([sanitizedQuery, query.trim()].filter(Boolean)));

  try {
    for (const attempt of attempts) {
      const candidates = await fetchMusicCandidates(attempt, apiKey.key);
      const ranked = rankMusicCandidates(attempt, candidates);
      const bestMatch = ranked[0];

      if (bestMatch && bestMatch.score >= MIN_ACCEPTABLE_SCORE) {
        return { success: true, track: bestMatch };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'YouTube music search failed.',
    };
  }

  return {
    success: false,
    error: `I could not find a playable YouTube result for "${sanitizedQuery}".`,
  };
};
