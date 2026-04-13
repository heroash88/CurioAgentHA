import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import type { CardComponentProps, YouTubeCardData } from '../../services/cardTypes';
import { musicPlaybackService } from '../../services/musicPlaybackService';
import { resolveYouTubeApiKey } from '../../services/youtubeApi';
import { useCardTheme } from '../../hooks/useCardTheme';

const DESIGN_TOKEN = 'card-glass';

const YouTubeCard: React.FC<CardComponentProps> = ({ card, onInteractionStart, onInteractionEnd }) => {
  const t = useCardTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [resolvedVideoId, setResolvedVideoId] = useState<string | null>(null);
  const [isLoadingVideoId, setIsLoadingVideoId] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const data = card.data as unknown as YouTubeCardData;

  useEffect(() => {
    if (data.videoId) {
      setResolvedVideoId(data.videoId);
    }
  }, [data.videoId]);

  const handlePlayClick = async () => {
    if (resolvedVideoId) {
      await musicPlaybackService.stop();
      setIsPlaying(true);
      return;
    }

    if (!data.searchQuery) {
        setApiError("No video or search query provided.");
        return;
    }

    const { key: youTubeApiKey } = await resolveYouTubeApiKey();
    if (!youTubeApiKey) {
        setApiError("No YouTube API key found. Add a Google API Key in Settings.");
        return;
    }

    setIsLoadingVideoId(true);
    setApiError(null);

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(data.searchQuery)}&type=video&key=${youTubeApiKey}`
        );

        if (!response.ok) {
            const errData = await response.json().catch(() => null);
            throw new Error(errData?.error?.message || "YouTube Data API request failed. Ensure 'YouTube Data API v3' is enabled on your Google API key.");
        }

        const json = await response.json();
        
        if (json.items && json.items.length > 0) {
            setResolvedVideoId(json.items[0].id.videoId);
            await musicPlaybackService.stop();
            setIsPlaying(true);
        } else {
            setApiError(`No videos found for query: "${data.searchQuery}"`);
        }
    } catch (error: any) {
        setApiError(error.message);
    } finally {
        setIsLoadingVideoId(false);
    }
  };

  // Auto-play on mount when the AI provides a search query
  const hasAutoTriggered = useRef(false);
  useEffect(() => {
    if (!hasAutoTriggered.current && data.searchQuery && !data.videoId) {
      hasAutoTriggered.current = true;
      handlePlayClick();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const thumbnailUrl = resolvedVideoId 
    ? `https://img.youtube.com/vi/${resolvedVideoId}/hqdefault.jpg`
    : 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800'; 

  const iframeSrc = resolvedVideoId
    ? `https://www.youtube.com/embed/${resolvedVideoId}?autoplay=1&rel=0&modestbranding=1&controls=0&enablejsapi=1`
    : '';



  useEffect(() => {
    if (isPlaying) {
      onInteractionStart();
      window.dispatchEvent(new CustomEvent('curio:media-playing'));
    } else {
      onInteractionEnd();
    }
  }, [isPlaying, onInteractionStart, onInteractionEnd]);

  // Let the AI close the video
  useEffect(() => {
    const handleClose = () => setIsPlaying(false);
    window.addEventListener('curio:close-video', handleClose);
    return () => window.removeEventListener('curio:close-video', handleClose);
  }, []);

  return (
    <>
      <div className={DESIGN_TOKEN}>
        {data.title && (
          <p className={`${t.text} font-bold font-headline text-base mb-3 leading-tight`}>{data.title}</p>
        )}
        
        {apiError && (
            <div className="mb-4 bg-red-500/20 text-red-100 border border-red-500/50 p-3 rounded-xl flex items-start gap-2 text-sm leading-tight">
                <AlertCircle className="shrink-0 mt-0.5" size={16} />
                <span>{apiError}</span>
            </div>
        )}

        <button
          onClick={handlePlayClick}
          disabled={isLoadingVideoId}
          className={`block relative group w-full text-left touch-manipulation overflow-hidden rounded-xl border ${t.panelBorder} shadow-inner disabled:opacity-50`}
        >
            <div className="aspect-video bg-slate-900 relative">
                <img
                    src={thumbnailUrl}
                    alt={data.title || 'YouTube video'}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] backdrop-blur-sm">
                {isLoadingVideoId ? (
                    <Loader2 className="animate-spin text-white drop-shadow-md" size={24} />
                ) : (
                    <span className="text-white text-2xl pl-1 drop-shadow-md">▶</span>
                )}
            </div>
          </div>
        </button>
      </div>

      {isPlaying && resolvedVideoId && createPortal(
        // Backdrop is pointer-events-none so underlying settings/buttons remain clickable
        <div 
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in duration-300 pointer-events-none"
        >
          {/* Controls and video are pointer-events-auto */}
          <div className="w-full max-w-5xl flex justify-end mb-4 pointer-events-auto">
            <button 
              onClick={() => setIsPlaying(false)}
              className="text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all touch-manipulation scale-100 hover:scale-110 active:scale-95"
              aria-label="Close video"
            >
              <X size={36} strokeWidth={2.5} />
            </button>
          </div>
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10 animate-in zoom-in-95 duration-300 pointer-events-auto" 
          >
            <iframe
              src={iframeSrc}
              title={data.title || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0 pointer-events-auto"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default React.memo(YouTubeCard);
