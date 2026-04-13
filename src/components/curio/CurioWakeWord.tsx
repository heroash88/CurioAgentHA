import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLiveAPI } from '../../contexts/LiveAPIContext';
import {
  getWakeWordDefinition,
  WAKE_WORD_DETECTED_EVENT,
  type WakeWordDetectedDetail
} from '../../services/wakeWordCatalog';
import {
  preloadWakeWordModel,
  startListening,
  stopListening,
  takePreparedMediaStream
} from '../../services/wakeWordService';
import { useLiveApiVoiceId, useSelectedWakeWordId, useWakeWordEnabled } from '../../utils/settingsStorage';
import { createGlobalMascotHandler } from '../../utils/appPageCatalog';
import { SUBJECT_CONFIG, type LiveModuleMode } from '../../services/liveSessionConfig';
import { playCurioGreeting } from '../../services/audioService';
import { useSettingsStore } from '../../utils/settingsStorage';
import { getCurioSystemPrompt } from './curioSystemPrompt';
import { musicPlaybackService } from '../../services/musicPlaybackService';

const WAKE_WORD_IDLE_TIMEOUT_MS = 60_000;
const RECHECK_IDLE_MS = 1_000;

const DISCONNECT_COMMAND_PATTERNS = [
  /^stop$/,
  /^stop now$/,
  /^stop listening$/,
  /^disconnect$/,
  /^disconnect now$/,
  /^hang up$/,
  /^go offline$/,
  /^go away$/,
  /^goodbye$/,
  /^bye$/,
  /^end call$/,
  /^close connection$/,
  /^stop the connection$/
];

const normalizeTranscript = (value: string): string =>
  String(value || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const isDisconnectCommand = (value: string): boolean => {
  const normalized = normalizeTranscript(value);
  if (!normalized) return false;
  return DISCONNECT_COMMAND_PATTERNS.some((pattern) => pattern.test(normalized));
};

const isWakeWordStartAbort = (error: unknown): boolean =>
  error instanceof Error && error.message === 'Wake word start aborted';

// We now use getCurioSystemPrompt for the fallback too

export const CurioWakeWord: React.FC = () => {
  const enableWakeWord = useWakeWordEnabled();
  const selectedWakeWordId = useSelectedWakeWordId();
  const liveApiVoiceId = useLiveApiVoiceId();
  const { userName, weatherCity, tempUnit, homeLocation, workLocation } = useSettingsStore();
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    connect,
    disconnect,
    globalMode,
    globalNavigate,
    unlockAudio,
    toggleCamera,
    transcriptHistory
  } = useLiveAPI();

  const lastWakeHandledAtRef = useRef(0);
  const lastUserSpeechAtRef = useRef(0);
  const lastObservedUserTranscriptRef = useRef('');
  const idleTimerRef = useRef<number | null>(null);

  const selectedWakeWord = useMemo(
    () => getWakeWordDefinition(selectedWakeWordId),
    [selectedWakeWordId]
  );

  const buildHandler = useCallback(
    () => createGlobalMascotHandler(globalNavigate, toggleCamera),
    [globalNavigate, toggleCamera]
  );

  const connectionConfig = useMemo(() => {
    if (globalMode !== null) {
      const config = SUBJECT_CONFIG[globalMode];
      if (config) {
        return {
          mode: config.modeStr,
          systemInstruction: `You are Curio, acting as a guide for ${config.name}. ${config.context}`
        };
      }
    }

    return {
      mode: 'global' as LiveModuleMode,
      systemInstruction: getCurioSystemPrompt(userName, weatherCity, tempUnit, undefined, undefined, true, undefined, homeLocation, workLocation)
    };
  }, [globalMode, userName, weatherCity, tempUnit, homeLocation, workLocation]);

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const scheduleIdleCheck = useCallback(() => {
    clearIdleTimer();

    if (!isConnected) {
      return;
    }

    const remainingMs = lastUserSpeechAtRef.current
      ? Math.max(RECHECK_IDLE_MS, WAKE_WORD_IDLE_TIMEOUT_MS - (Date.now() - lastUserSpeechAtRef.current))
      : WAKE_WORD_IDLE_TIMEOUT_MS;

    idleTimerRef.current = window.setTimeout(() => {
      if (!isConnected || isConnecting) {
        return;
      }

      const idleForMs = Date.now() - lastUserSpeechAtRef.current;
      if (isSpeaking || idleForMs < WAKE_WORD_IDLE_TIMEOUT_MS) {
        scheduleIdleCheck();
        return;
      }

      console.log('[CurioWakeWord] Disconnecting Live API after one minute of user silence.');
      void disconnect();
    }, remainingMs);
  }, [clearIdleTimer, disconnect, isConnected, isConnecting, isSpeaking]);

  const noteUserSpeech = useCallback(() => {
    lastUserSpeechAtRef.current = Date.now();
    if (isConnected) {
      scheduleIdleCheck();
    }
  }, [isConnected, scheduleIdleCheck]);

  const connectFromWakeWord = useCallback(async () => {
    if (isConnected || isConnecting) {
      return;
    }

    try {
      const wasPlaying = musicPlaybackService.getState().playbackState === 'playing';
      noteUserSpeech();
      window.dispatchEvent(new CustomEvent('curio:wake', { detail: { wasPlaying } }));

      // Pause immediately to clear the air for connection
      if (wasPlaying) {
        void musicPlaybackService.pause();
      }

      window.dispatchEvent(new Event('curio:media-playing')); // Ensure vision/other triggers know content is handled

      // Keep the wake-word connect path lean so the first spoken command is not delayed.
      await unlockAudio();

      const preparedMicStream = takePreparedMediaStream() ?? undefined;

      // Stop wake word listening to free up the microphone for Live API
      stopListening();
      
      await connect(
        connectionConfig.mode,
        buildHandler(),
        connectionConfig.systemInstruction,
        liveApiVoiceId || 'Aoede',
        preparedMicStream
      );

      // Defer greeting to avoid competing with audio graph construction
      setTimeout(() => playCurioGreeting(), 150);
    } catch (error) {
      console.error('[CurioWakeWord] Failed to connect after wake word:', error);
    }
  }, [
    buildHandler,
    connect,
    connectionConfig.mode,
    connectionConfig.systemInstruction,
    isConnected,
    isConnecting,
    liveApiVoiceId,
    noteUserSpeech,
    unlockAudio
  ]);

  useEffect(() => {
    console.log('[CurioWakeWord] Component mounted.');
  }, []);

  useEffect(() => {
    if (!enableWakeWord) {
      return;
    }

    let isCancelled = false;

    const preloadRuntime = async () => {
      try {
        await preloadWakeWordModel({ wakeWordId: selectedWakeWord.id });
      } catch (error) {
        if (!isCancelled) {
          console.warn(`[CurioWakeWord] Failed to preload "${selectedWakeWord.phrase}" runtime:`, error);
        }
      }
    };

    void preloadRuntime();

    return () => {
      isCancelled = true;
    };
  }, [enableWakeWord, selectedWakeWord.id, selectedWakeWord.phrase]);

  useEffect(() => {
    if (!enableWakeWord || isConnected || isConnecting) {
      stopListening();
      return;
    }

    let isCancelled = false;
    let retryTimeout: number | undefined;

    const startWithRetry = async () => {
      try {
        await startListening({
          wakeWordId: selectedWakeWord.id,
          detectionThreshold: selectedWakeWord.threshold
        });
      } catch (error) {
        if (!isCancelled && !isWakeWordStartAbort(error)) {
          console.warn(`[CurioWakeWord] Failed to start "${selectedWakeWord.phrase}" listener:`, error);
          retryTimeout = window.setTimeout(startWithRetry, 3000);
        }
      }
    };

    void startWithRetry();

    return () => {
      isCancelled = true;
      if (retryTimeout) window.clearTimeout(retryTimeout);
      stopListening();
    };
  }, [enableWakeWord, isConnected, isConnecting, selectedWakeWord.id, selectedWakeWord.phrase, selectedWakeWord.threshold]);

  useEffect(() => {
    const handleWakeWord = (event: Event) => {
      const detail = (event as CustomEvent<WakeWordDetectedDetail>).detail;
      const now = Date.now();

      if (now - lastWakeHandledAtRef.current < 1500) {
        return;
      }

      lastWakeHandledAtRef.current = now;
      console.log(`[CurioWakeWord] Wake word detected: ${detail?.phrase || selectedWakeWord.phrase}`);
      void connectFromWakeWord();
    };

    window.addEventListener(WAKE_WORD_DETECTED_EVENT, handleWakeWord);
    return () => window.removeEventListener(WAKE_WORD_DETECTED_EVENT, handleWakeWord);
  }, [connectFromWakeWord, selectedWakeWord.phrase]);

  const latestUserTranscript = useMemo(() => {
    const history = transcriptHistory ?? [];
    for (let index = history.length - 1; index >= 0; index -= 1) {
      const item = history[index];
      if (item.speaker === 'user' && item.text) {
        return item.text;
      }
    }

    return '';
  }, [transcriptHistory]);

  useEffect(() => {
    const normalizedTranscript = normalizeTranscript(latestUserTranscript);
    if (!isConnected || !normalizedTranscript) {
      return;
    }

    if (normalizedTranscript === lastObservedUserTranscriptRef.current) {
      return;
    }

    lastObservedUserTranscriptRef.current = normalizedTranscript;
    noteUserSpeech();

    if (isDisconnectCommand(normalizedTranscript)) {
      console.log('[CurioWakeWord] Disconnect command heard from user transcript.');
      void disconnect();
    }
  }, [disconnect, isConnected, latestUserTranscript, noteUserSpeech]);


  useEffect(() => {
    if (isConnected) {
      noteUserSpeech();
      return;
    }

    lastObservedUserTranscriptRef.current = '';
    clearIdleTimer();
  }, [clearIdleTimer, isConnected, noteUserSpeech]);

  useEffect(() => clearIdleTimer, [clearIdleTimer]);

  return <></>;
};
