import type { MusicCardData, MusicPlaybackState } from './cardTypes';

export const MUSIC_PLAYER_ID = 'curio-youtube-music-player';
const YOUTUBE_IFRAME_API_URL = 'https://www.youtube.com/iframe_api';
const MUSIC_VOLUME_STORAGE_KEY = 'curio_youtube_music_volume';
const DEFAULT_MUSIC_VOLUME = 70;

type PlaybackListener = (snapshot: MusicPlaybackSnapshot) => void;

type YouTubePlayerStateMap = {
  UNSTARTED: number;
  ENDED: number;
  PLAYING: number;
  PAUSED: number;
  BUFFERING: number;
  CUED: number;
};

interface YouTubePlayerConstructorOptions {
  width?: string;
  height?: string;
  videoId?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: () => void;
    onStateChange?: (event: { data: number }) => void;
    onError?: (event: { data: number }) => void;
  };
}

interface YouTubePlayerInstance {
  destroy?: () => void;
  getCurrentTime?: () => number;
  getDuration?: () => number;
  getPlayerState?: () => number;
  getVolume?: () => number;
  loadVideoById?: (videoId: string) => void;
  pauseVideo?: () => void;
  playVideo?: () => void;
  seekTo?: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume?: (volume: number) => void;
  stopVideo?: () => void;
}

interface YouTubeIframeApi {
  Player: new (element: HTMLElement, options: YouTubePlayerConstructorOptions) => YouTubePlayerInstance;
  PlayerState: YouTubePlayerStateMap;
}

declare global {
  interface Window {
    YT?: YouTubeIframeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface MusicPlaybackSnapshot {
  playerId: string;
  videoId: string | null;
  query: string;
  title: string;
  artistOrChannel: string;
  thumbnailUrl: string;
  playbackState: MusicPlaybackState;
  currentTimeSeconds: number;
  durationSeconds: number;
  volume: number;
  source: 'youtube';
  error?: string;
  autoplayBlocked?: boolean;
}

export interface MusicPlaybackTrack {
  videoId: string;
  query: string;
  title: string;
  artistOrChannel: string;
  thumbnailUrl: string;
}

const clampVolume = (value: number): number => {
  if (!Number.isFinite(value)) {
    return DEFAULT_MUSIC_VOLUME;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
};

const getStoredVolume = (): number => {
  if (typeof window === 'undefined') {
    return DEFAULT_MUSIC_VOLUME;
  }

  try {
    const raw = window.localStorage.getItem(MUSIC_VOLUME_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_MUSIC_VOLUME;
    }

    return clampVolume(Number(raw));
  } catch {
    return DEFAULT_MUSIC_VOLUME;
  }
};

const persistVolume = (value: number) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(MUSIC_VOLUME_STORAGE_KEY, String(clampVolume(value)));
  } catch {
    // Ignore storage failures.
  }
};

const createIdleSnapshot = (): MusicPlaybackSnapshot => ({
  playerId: MUSIC_PLAYER_ID,
  videoId: null,
  query: '',
  title: '',
  artistOrChannel: '',
  thumbnailUrl: '',
  playbackState: 'idle',
  currentTimeSeconds: 0,
  durationSeconds: 0,
  volume: getStoredVolume(),
  source: 'youtube',
  error: undefined,
  autoplayBlocked: false,
});

export const toMusicCardData = (snapshot: MusicPlaybackSnapshot): MusicCardData | null => {
  if (!snapshot.videoId) {
    return null;
  }

  return {
    playerId: snapshot.playerId,
    videoId: snapshot.videoId,
    query: snapshot.query,
    title: snapshot.title,
    artistOrChannel: snapshot.artistOrChannel,
    thumbnailUrl: snapshot.thumbnailUrl,
    playbackState: snapshot.playbackState,
    currentTimeSeconds: snapshot.currentTimeSeconds,
    durationSeconds: snapshot.durationSeconds,
    volume: snapshot.volume,
    source: snapshot.source,
    error: snapshot.error,
    autoplayBlocked: snapshot.autoplayBlocked,
  };
};

export class MusicPlaybackService {
  private listeners = new Set<PlaybackListener>();
  private snapshot: MusicPlaybackSnapshot = createIdleSnapshot();
  private apiReadyPromise: Promise<YouTubeIframeApi> | null = null;
  private playerReadyPromise: Promise<YouTubePlayerInstance> | null = null;
  private player: YouTubePlayerInstance | null = null;
  private hostElement: HTMLDivElement | null = null;
  private autoplayCheckTimer: number | null = null;
  private progressSyncTimer: number | null = null;
  private visibilityHandler: (() => void) | null = null;

  subscribe(listener: PlaybackListener) {
    this.listeners.add(listener);
    listener(this.getState());

    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): MusicPlaybackSnapshot {
    return { ...this.snapshot };
  }

  async play(track: MusicPlaybackTrack): Promise<MusicPlaybackSnapshot> {
    const api = await this.ensureIframeApi();
    const player = await this.ensurePlayer(api);

    this.setSnapshot({
      playerId: MUSIC_PLAYER_ID,
      videoId: track.videoId,
      query: track.query,
      title: track.title,
      artistOrChannel: track.artistOrChannel,
      thumbnailUrl: track.thumbnailUrl,
      playbackState: 'loading',
      currentTimeSeconds: 0,
      durationSeconds: 0,
      volume: this.snapshot.volume,
      source: 'youtube',
      error: undefined,
      autoplayBlocked: false,
    });

    player.setVolume?.(this.snapshot.volume);
    player.loadVideoById?.(track.videoId);
    this.scheduleAutoplayFallback(track.videoId, api);
    return this.getState();
  }

  async pause(): Promise<MusicPlaybackSnapshot> {
    if (!this.snapshot.videoId || !this.player) {
      return this.getState();
    }

    this.player.pauseVideo?.();
    this.setSnapshot({
      ...this.snapshot,
      playbackState: 'paused',
      error: undefined,
    });
    return this.getState();
  }

  async resume(): Promise<MusicPlaybackSnapshot> {
    if (!this.snapshot.videoId) {
      return this.getState();
    }

    const api = await this.ensureIframeApi();
    const player = await this.ensurePlayer(api);
    player.playVideo?.();
    this.setSnapshot({
      ...this.snapshot,
      playbackState: 'loading',
      error: undefined,
    });
    this.scheduleAutoplayFallback(this.snapshot.videoId, api);
    return this.getState();
  }

  async seekTo(seconds: number): Promise<MusicPlaybackSnapshot> {
    if (!this.snapshot.videoId || !this.player) {
      return this.getState();
    }

    const duration = this.player.getDuration?.() ?? this.snapshot.durationSeconds;
    const nextTime = Math.max(0, Math.min(Number.isFinite(duration) && duration > 0 ? duration : seconds, seconds));

    try {
      this.player.seekTo?.(nextTime, true);
    } catch {
      // Ignore seek errors and preserve previous playback state.
    }

    this.setSnapshot({
      ...this.snapshot,
      currentTimeSeconds: nextTime,
      durationSeconds: Number.isFinite(duration) && duration > 0 ? duration : this.snapshot.durationSeconds,
    });

    return this.getState();
  }

  async setVolume(volume: number): Promise<MusicPlaybackSnapshot> {
    const nextVolume = clampVolume(volume);
    persistVolume(nextVolume);

    try {
      this.player?.setVolume?.(nextVolume);
    } catch {
      // Ignore player volume failures and still persist local state.
    }

    this.setSnapshot({
      ...this.snapshot,
      volume: nextVolume,
    });

    return this.getState();
  }

  async stop(): Promise<MusicPlaybackSnapshot> {
    this.clearAutoplayFallback();
    this.stopProgressSync();
    try {
      this.player?.stopVideo?.();
    } catch {
      // Ignore stop errors during teardown.
    }
    this.destroyPlayer();
    this.setSnapshot(createIdleSnapshot());
    return this.getState();
  }

  private syncProgressFromPlayer() {
    if (!this.player || !this.snapshot.videoId) {
      return;
    }

    const duration = this.player.getDuration?.();
    const currentTime = this.player.getCurrentTime?.();
    const nextDuration =
      typeof duration === 'number' && Number.isFinite(duration) && duration > 0
        ? duration
        : this.snapshot.durationSeconds;
    const nextCurrentTime =
      typeof currentTime === 'number' && Number.isFinite(currentTime) && currentTime >= 0
        ? Math.min(currentTime, nextDuration || currentTime)
        : this.snapshot.currentTimeSeconds;

    if (
      nextDuration === this.snapshot.durationSeconds &&
      Math.abs(nextCurrentTime - this.snapshot.currentTimeSeconds) < 0.25
    ) {
      return;
    }

    this.setSnapshot({
      ...this.snapshot,
      currentTimeSeconds: nextCurrentTime,
      durationSeconds: nextDuration,
    });
  }

  private startProgressSyncTimer() {
    if (typeof window === 'undefined' || this.progressSyncTimer !== null) {
      return;
    }

    this.progressSyncTimer = window.setInterval(() => {
      this.syncProgressFromPlayer();
    }, 500) as unknown as number;
  }

  private stopProgressSyncTimer() {
    if (this.progressSyncTimer !== null) {
      window.clearInterval(this.progressSyncTimer);
      this.progressSyncTimer = null;
    }
  }

  private startProgressSync() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    this.startProgressSyncTimer();

    if (!this.visibilityHandler) {
      this.visibilityHandler = () => {
        if (document.hidden) {
          this.stopProgressSyncTimer();
        } else if (this.snapshot.playbackState === 'playing') {
          this.startProgressSyncTimer();
        }
      };
      document.addEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  private stopProgressSync() {
    this.stopProgressSyncTimer();

    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      this.visibilityHandler = null;
    }
  }

  private setSnapshot(nextSnapshot: MusicPlaybackSnapshot) {
    this.snapshot = { ...nextSnapshot };
    const current = this.getState();
    this.listeners.forEach((listener) => listener(current));
  }

  private createHostElement() {
    if (typeof document === 'undefined') {
      throw new Error('YouTube playback requires a browser document.');
    }

    if (!this.hostElement) {
      const host = document.createElement('div');
      host.id = MUSIC_PLAYER_ID;
      host.style.position = 'fixed';
      host.style.left = '-10000px';
      host.style.top = '0';
      host.style.width = '1px';
      host.style.height = '1px';
      host.style.opacity = '0';
      host.style.pointerEvents = 'none';
      host.setAttribute('aria-hidden', 'true');
      document.body.appendChild(host);
      this.hostElement = host;
    }

    return this.hostElement;
  }

  private ensureIframeApi(): Promise<YouTubeIframeApi> {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return Promise.reject(new Error('YouTube playback requires a browser window.'));
    }

    if (window.YT?.Player) {
      return Promise.resolve(window.YT);
    }

    if (this.apiReadyPromise) {
      return this.apiReadyPromise;
    }

    this.apiReadyPromise = new Promise<YouTubeIframeApi>((resolve, reject) => {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        if (window.YT?.Player) {
          resolve(window.YT);
          return;
        }
        reject(new Error('YouTube IFrame API loaded without a Player constructor.'));
      };

      let script = document.querySelector<HTMLScriptElement>('script[data-curio-youtube-iframe="true"]');
      if (!script) {
        script = document.createElement('script');
        script.src = YOUTUBE_IFRAME_API_URL;
        script.async = true;
        script.dataset.curioYoutubeIframe = 'true';
        script.onerror = () => reject(new Error('Failed to load the YouTube IFrame API.'));
        document.head.appendChild(script);
      }
    });

    return this.apiReadyPromise;
  }

  private ensurePlayer(api: YouTubeIframeApi): Promise<YouTubePlayerInstance> {
    if (this.player && this.playerReadyPromise) {
      return this.playerReadyPromise;
    }

    this.playerReadyPromise = new Promise<YouTubePlayerInstance>((resolve) => {
      const host = this.createHostElement();
      let playerInstance: YouTubePlayerInstance | null = null;
      let readyBeforeAssign = false;

      playerInstance = new api.Player(host, {
        width: '1',
        height: '1',
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (playerInstance) {
              resolve(playerInstance);
            } else {
              readyBeforeAssign = true;
            }
          },
          onStateChange: (event) => {
            this.handlePlayerStateChange(event.data, api);
          },
          onError: () => {
            if (!this.snapshot.videoId) {
              return;
            }
            this.setSnapshot({
              ...this.snapshot,
              playbackState: 'error',
              error: 'YouTube playback failed for this track.',
            });
          },
        },
      });
      this.player = playerInstance;
      this.player?.setVolume?.(this.snapshot.volume);

      if (readyBeforeAssign && playerInstance) {
        resolve(playerInstance);
      }
    });

    return this.playerReadyPromise;
  }

  private handlePlayerStateChange(state: number, api: YouTubeIframeApi) {
    if (!this.snapshot.videoId) {
      return;
    }

    switch (state) {
      case api.PlayerState.PLAYING:
        this.clearAutoplayFallback();
        this.startProgressSync();
        this.syncProgressFromPlayer();
        this.setSnapshot({
          ...this.snapshot,
          playbackState: 'playing',
          error: undefined,
          autoplayBlocked: false,
        });
        return;
      case api.PlayerState.PAUSED:
        this.clearAutoplayFallback();
        this.stopProgressSync();
        this.syncProgressFromPlayer();
        this.setSnapshot({
          ...this.snapshot,
          playbackState: 'paused',
          error: undefined,
        });
        return;
      case api.PlayerState.BUFFERING:
        this.syncProgressFromPlayer();
        this.setSnapshot({
          ...this.snapshot,
          playbackState: 'loading',
          error: undefined,
        });
        return;
      case api.PlayerState.CUED:
        this.clearAutoplayFallback();
        this.stopProgressSync();
        this.syncProgressFromPlayer();
        this.setSnapshot({
          ...this.snapshot,
          playbackState: 'ready',
          error: undefined,
          autoplayBlocked: true,
        });
        return;
      case api.PlayerState.ENDED:
        this.clearAutoplayFallback();
        this.stopProgressSync();
        void this.stop();
        return;
      default:
        return;
    }
  }

  private scheduleAutoplayFallback(videoId: string, api: YouTubeIframeApi) {
    if (typeof window === 'undefined') {
      return;
    }

    this.clearAutoplayFallback();
    this.autoplayCheckTimer = window.setTimeout(() => {
      if (!this.player || this.snapshot.videoId !== videoId) {
        return;
      }

      const playerState = this.player.getPlayerState?.();
      if (playerState === api.PlayerState.PLAYING || playerState === api.PlayerState.BUFFERING) {
        return;
      }

      this.setSnapshot({
        ...this.snapshot,
        playbackState: 'ready',
        autoplayBlocked: true,
        error: undefined,
      });
    }, 1500) as unknown as number;
  }

  private clearAutoplayFallback() {
    if (this.autoplayCheckTimer !== null) {
      window.clearTimeout(this.autoplayCheckTimer);
      this.autoplayCheckTimer = null;
    }
  }

  private destroyPlayer() {
    this.stopProgressSync();

    try {
      this.player?.destroy?.();
    } catch {
      // Ignore destroy errors during cleanup.
    }

    this.player = null;
    this.playerReadyPromise = null;

    if (this.hostElement?.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
    this.hostElement = null;
  }
}

export const musicPlaybackService = new MusicPlaybackService();
