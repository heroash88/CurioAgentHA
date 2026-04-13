import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import type {
  Card,
  CardAction,
  CardEvent,
  CardManagerContextValue,
  CardTypeRegistration,
} from '../services/cardTypes';
import { useResponseCardsEnabled } from '../utils/settingsStorage';
import { getCardEnabled } from '../utils/settingsStorage';
import { restoreTimers, persistTimers, clearPersistedTimers } from '../services/timerPersistence';
import DeviceCard from '../components/cards/DeviceCard';
import WeatherCard from '../components/cards/WeatherCard';
import TimerCard from '../components/cards/TimerCard';
import MediaCard from '../components/cards/MediaCard';
import CalculationCard from '../components/cards/CalculationCard';
import ReminderCard from '../components/cards/ReminderCard';
import ImageCard from '../components/cards/ImageCard';
import YouTubeCard from '../components/cards/YouTubeCard';
import MusicCard from '../components/cards/MusicCard';
import NewsCard from '../components/cards/NewsCard';
import FunFactCard from '../components/cards/FunFactCard';
import DefinitionCard from '../components/cards/DefinitionCard';
import ListCard from '../components/cards/ListCard';
import QuoteCard from '../components/cards/QuoteCard';
import SportsScoreCard from '../components/cards/SportsScoreCard';
import RecipeCard from '../components/cards/RecipeCard';
import TranslationCard from '../components/cards/TranslationCard';
import { FinanceCard } from '../components/cards/FinanceCard';
import StopwatchCard from '../components/cards/StopwatchCard';
import CalendarCard from '../components/cards/CalendarCard';
import AlarmCard from '../components/cards/AlarmCard';
import MapCard from '../components/cards/MapCard';
import PlacesCard from '../components/cards/PlacesCard';
import AirQualityCard from '../components/cards/AirQualityCard';
import JokeCard from '../components/cards/JokeCard';
import TriviaCard from '../components/cards/TriviaCard';
import UnitConversionCard from '../components/cards/UnitConversionCard';
import AstronomyCard from '../components/cards/AstronomyCard';
import CommuteCard from '../components/cards/CommuteCard';
import CameraCard from '../components/cards/CameraCard';
import ThermostatCard from '../components/cards/ThermostatCard';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_CARDS = 5;
const DEFAULT_AUTO_DISMISS_MS = 15000;
const STAGGER_WINDOW_MS = 200;
const STAGGER_DELAY_MS = 100;

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------
interface CardManagerState {
  cards: Card[];
}

const initialState: CardManagerState = { cards: [] };

export function cardReducer(state: CardManagerState, action: CardAction): CardManagerState {
  switch (action.type) {
    case 'ADD_CARD': {
      const event = action.payload;
      const entityId =
        event.type === 'device' || event.type === 'media'
          ? typeof event.data?.entityId === 'string'
            ? event.data.entityId
            : ''
          : event.type === 'music'
            ? typeof event.data?.playerId === 'string'
              ? event.data.playerId
              : ''
          : '';
      const nextAutoDismissMs = event.autoDismissMs ?? DEFAULT_AUTO_DISMISS_MS;

      // Singleton card types — only one of these should exist at a time
      const SINGLETON_TYPES = new Set(['joke', 'trivia', 'unitConversion', 'calculation', 'definition', 'quote', 'funFact', 'camera', 'alarm']);

      if (entityId) {
        const existing = state.cards.find((card) => {
          if (card.type !== event.type) return false;
          
          const cardId = 
            (card.type === 'music')
              ? card.data.playerId
              : card.data.entityId;
          
          return cardId === entityId;
        });

        if (existing) {
          const updated: Card = {
            ...existing,
            data: event.data,
            createdAt: Date.now(),
            autoDismissMs: nextAutoDismissMs,
            persistent: event.persistent ?? existing.persistent,
            animationState: 'visible',
          };

          const next = [
            updated,
            ...state.cards.filter((card) => card.id !== existing.id),
          ].slice(0, MAX_CARDS);

          return { ...state, cards: next };
        }
      }

      const newCard: Card = {
        id: crypto.randomUUID(),
        type: event.type,
        data: event.data,
        createdAt: Date.now(),
        autoDismissMs: nextAutoDismissMs,
        persistent: event.persistent ?? false,
        animationState: 'entering',
      };
      // Remove existing cards of the same singleton type
      let baseCards = state.cards;
      if (SINGLETON_TYPES.has(event.type)) {
        baseCards = baseCards.filter(c => c.type !== event.type);
      }
      // Newest-first: prepend
      let next = [newCard, ...baseCards];
      // Enforce max — evict oldest (last in array)
      if (next.length > MAX_CARDS) {
        next = next.slice(0, MAX_CARDS);
      }
      return { ...state, cards: next };
    }

    case 'REMOVE_CARD': {
      return {
        ...state,
        cards: state.cards.filter((c) => c.id !== action.payload.id),
      };
    }

    case 'UPDATE_CARD': {
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload.id
            ? { ...c, data: { ...c.data, ...action.payload.data } }
            : c,
        ),
      };
    }

    case 'SET_ANIMATION_STATE': {
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload.id
            ? { ...c, animationState: action.payload.state }
            : c,
        ),
      };
    }

    case 'DISMISS_ALL': {
      return { ...state, cards: [] };
    }

    case 'DISMISS_CAMERA': {
      return { ...state, cards: state.cards.filter(c => c.type !== 'camera') };
    }

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const CardManagerContext = createContext<CardManagerContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export const CardManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const enabled = useResponseCardsEnabled();
  const [state, dispatch] = useReducer(cardReducer, initialState);

  // Card type registry
  const registryRef = useRef<Map<string, CardTypeRegistration>>(new Map());

  const registerCardType = useCallback(
    (type: string, registration: CardTypeRegistration) => {
      registryRef.current.set(type, registration);
    },
    [],
  );

  // Register all built-in card types on mount
  useEffect(() => {
    registerCardType('device', { component: DeviceCard, defaultAutoDismissMs: 15000 });
    registerCardType('weather', { component: WeatherCard, defaultAutoDismissMs: 15000 });
    registerCardType('timer', { component: TimerCard, defaultAutoDismissMs: 0 }); // persistent
    registerCardType('media', { component: MediaCard, defaultAutoDismissMs: 0 }); // persistent when playing
    registerCardType('calculation', { component: CalculationCard, defaultAutoDismissMs: 15000 });
    registerCardType('reminder', { component: ReminderCard, defaultAutoDismissMs: 15000 });
    registerCardType('image',       { component: ImageCard,       defaultAutoDismissMs: 15000 });
    registerCardType('youtube',     { component: YouTubeCard,     defaultAutoDismissMs: 15000 });
    registerCardType('music',       { component: MusicCard,       defaultAutoDismissMs: 0 });
    registerCardType('news',        { component: NewsCard,        defaultAutoDismissMs: 20000 });
    registerCardType('funFact',     { component: FunFactCard,     defaultAutoDismissMs: 15000 });
    registerCardType('definition',  { component: DefinitionCard,  defaultAutoDismissMs: 15000 });
    registerCardType('list',        { component: ListCard,        defaultAutoDismissMs: 15000 });
    registerCardType('quote',       { component: QuoteCard,       defaultAutoDismissMs: 15000 });
    registerCardType('sportsScore', { component: SportsScoreCard, defaultAutoDismissMs: 15000 });
    registerCardType('recipe',      { component: RecipeCard,      defaultAutoDismissMs: 0 }); // persistent until user asks for another
    registerCardType('translation', { component: TranslationCard, defaultAutoDismissMs: 15000 });
    registerCardType('finance', { component: FinanceCard, defaultAutoDismissMs: 20000 });
    registerCardType('stopwatch', { component: StopwatchCard, defaultAutoDismissMs: 0 });
    registerCardType('calendar', { component: CalendarCard, defaultAutoDismissMs: 20000 });
    registerCardType('alarm', { component: AlarmCard, defaultAutoDismissMs: 0 });
    registerCardType('map', { component: MapCard, defaultAutoDismissMs: 20000 });
    registerCardType('places', { component: PlacesCard, defaultAutoDismissMs: 20000 });
    registerCardType('airQuality', { component: AirQualityCard, defaultAutoDismissMs: 15000 });
    registerCardType('joke', { component: JokeCard, defaultAutoDismissMs: 20000 });
    registerCardType('trivia', { component: TriviaCard, defaultAutoDismissMs: 0 }); // persistent until answered
    registerCardType('unitConversion', { component: UnitConversionCard, defaultAutoDismissMs: 15000 });
    registerCardType('astronomy', { component: AstronomyCard, defaultAutoDismissMs: 15000 });
    registerCardType('commute', { component: CommuteCard, defaultAutoDismissMs: 15000 });
    registerCardType('camera', { component: CameraCard, defaultAutoDismissMs: 0 }); // persistent until dismissed
    registerCardType('thermostat', { component: ThermostatCard, defaultAutoDismissMs: 15000 });
    registerCardType('ha', { component: DeviceCard, defaultAutoDismissMs: 10000 });
  }, [registerCardType]);

  // ---------------------------------------------------------------------------
  // Auto-dismiss timers
  // ---------------------------------------------------------------------------
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  // Track remaining time for interaction hold
  const timerMetaRef = useRef<
    Map<string, { startedAt: number; remaining: number }>
  >(new Map());

  const clearCardTimer = useCallback((cardId: string) => {
    const timer = timersRef.current.get(cardId);
    if (timer !== undefined) {
      clearTimeout(timer);
      timersRef.current.delete(cardId);
    }
    timerMetaRef.current.delete(cardId);
  }, []);

  const startCardTimer = useCallback(
    (cardId: string, durationMs: number) => {
      clearCardTimer(cardId);
      const now = Date.now();
      timerMetaRef.current.set(cardId, { startedAt: now, remaining: durationMs });
      const handle = setTimeout(() => {
        timersRef.current.delete(cardId);
        timerMetaRef.current.delete(cardId);
        dispatch({ type: 'SET_ANIMATION_STATE', payload: { id: cardId, state: 'exiting' } });
        // Remove after exit animation completes (~250ms)
        setTimeout(() => {
          dispatch({ type: 'REMOVE_CARD', payload: { id: cardId } });
        }, 300);
      }, durationMs);
      timersRef.current.set(cardId, handle);
    },
    [clearCardTimer],
  );

  // ---------------------------------------------------------------------------
  // Interaction hold: pause / resume
  // ---------------------------------------------------------------------------
  const holdStartRef = useRef<Map<string, number>>(new Map());

  const pauseTimer = useCallback(
    (cardId: string) => {
      // User physically interacted with the card — permanently cancel auto-dismiss
      clearCardTimer(cardId);
      holdStartRef.current.set(cardId, Date.now());
    },
    [clearCardTimer],
  );

  const resumeTimer = useCallback(
    (cardId: string) => {
      // After user interaction, the card stays on screen until manually dismissed.
      // Just clean up the hold tracking — do NOT restart any timer.
      holdStartRef.current.delete(cardId);
    },
    [],
  );

  // ---------------------------------------------------------------------------
  // Stagger entrance animations
  // ---------------------------------------------------------------------------
  const lastEmitTimeRef = useRef<number>(0);
  const pendingStaggerCountRef = useRef<number>(0);

  // ---------------------------------------------------------------------------
  // emitCardEvent
  // ---------------------------------------------------------------------------
  const emitCardEvent = useCallback(
    (event: CardEvent) => {
      if (!enabled) return;

      // Check per-card-type toggle
      if (typeof event.type === 'string' && !getCardEnabled(event.type as any)) return;

      // Special case: CLOSE_CARDS
      if (event.type === 'close_all') {
        dispatch({ type: 'DISMISS_ALL' });
        // Also clear all timers
        for (const [id] of timersRef.current) {
          clearCardTimer(id);
        }
        timerMetaRef.current.clear();
        holdStartRef.current.clear();
        return;
      }

      // Special case: close camera cards
      if (event.type === 'close_camera') {
        // Use dispatch to remove all camera cards — avoids stale state.cards closure
        dispatch({ type: 'DISMISS_CAMERA' });
        // Notify liveApiLive that the camera card is gone
        window.dispatchEvent(new CustomEvent('ha-camera-closed'));
        return;
      }

      const now = Date.now();
      const gap = now - lastEmitTimeRef.current;
      lastEmitTimeRef.current = now;

      if (gap < STAGGER_WINDOW_MS) {
        pendingStaggerCountRef.current += 1;
      } else {
        pendingStaggerCountRef.current = 0;
      }

      const staggerDelay = pendingStaggerCountRef.current * STAGGER_DELAY_MS;

      if (staggerDelay > 0) {
        setTimeout(() => {
          dispatch({ type: 'ADD_CARD', payload: event });
        }, staggerDelay);
      } else {
        dispatch({ type: 'ADD_CARD', payload: event });
      }
    },
    [enabled, clearCardTimer],
  );

  // ---------------------------------------------------------------------------
  // Alarm checker — fires alarms and emits ringing card
  // ---------------------------------------------------------------------------
  useEffect(() => {
    import('../services/alarmChecker').then(({ startAlarmChecker, setAlarmCallback }) => {
      setAlarmCallback((alarmId, label, time) => {
        emitCardEvent({
          type: 'alarm',
          data: {
            alarms: [{ id: alarmId, label, time, enabled: true }],
            mode: 'ringing',
            ringingAlarmId: alarmId,
          },
          persistent: true,
        });
      });
      startAlarmChecker();
    });
    return () => {
      import('../services/alarmChecker').then(({ stopAlarmChecker }) => {
        stopAlarmChecker();
      });
    };
  }, [emitCardEvent]);

  // ---------------------------------------------------------------------------
  // Start auto-dismiss timers for newly added cards
  // ---------------------------------------------------------------------------
  const prevCardIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const currentIds = new Set(state.cards.map((c) => c.id));
    // Detect newly added cards
    for (const card of state.cards) {
      if (!prevCardIdsRef.current.has(card.id) && !card.persistent) {
        // Resolve auto-dismiss duration from registry or card itself
        const registration = registryRef.current.get(card.type);
        const duration = card.autoDismissMs
          ?? registration?.defaultAutoDismissMs
          ?? DEFAULT_AUTO_DISMISS_MS;
        startCardTimer(card.id, duration);
      }
    }
    // Clean up timers for removed cards and clear persistence for timer cards
    for (const oldId of prevCardIdsRef.current) {
      if (!currentIds.has(oldId)) {
        clearCardTimer(oldId);
        // Clear from localStorage if it was a timer/alarm
        try {
          const existing = restoreTimers().filter(t => t.id !== oldId);
          if (existing.length > 0) {
            persistTimers(existing);
          } else {
            clearPersistedTimers();
          }
        } catch {}
      }
    }
    prevCardIdsRef.current = currentIds;
  }, [state.cards, startCardTimer, clearCardTimer]);

  // ---------------------------------------------------------------------------
  // Restore persisted timers on mount (with guard against double-mount in strict mode)
  // ---------------------------------------------------------------------------
  const hasRestoredRef = useRef(false);
  useEffect(() => {
    if (!enabled || hasRestoredRef.current) return;
    hasRestoredRef.current = true;
    const persisted = restoreTimers();
    for (const timer of persisted) {
      const event: CardEvent = {
        type: 'timer',
        data: {
          label: timer.label,
          isAlarm: timer.isAlarm,
          targetTime: timer.targetTime,
          duration: timer.duration,
          completionState: 'running',
        },
        persistent: true,
      };
      dispatch({ type: 'ADD_CARD', payload: event });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // When disabled, dismiss all cards and cancel timers
  // ---------------------------------------------------------------------------
  const prevEnabledRef = useRef(enabled);
  useEffect(() => {
    if (prevEnabledRef.current && !enabled) {
      // Transitioned from enabled → disabled
      dispatch({ type: 'DISMISS_ALL' });
      for (const [id] of timersRef.current) {
        clearCardTimer(id);
      }
      timerMetaRef.current.clear();
      holdStartRef.current.clear();
    }
    prevEnabledRef.current = enabled;
  }, [enabled, clearCardTimer]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      for (const [, handle] of timersRef.current) {
        clearTimeout(handle);
      }
      timersRef.current.clear();
      timerMetaRef.current.clear();
      holdStartRef.current.clear();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Context value
  // ---------------------------------------------------------------------------
  const contextValue = useMemo<CardManagerContextValue>(
    () => ({
      cards: state.cards,
      dispatch,
      emitCardEvent,
      registerCardType,
      enabled,
      registry: registryRef.current,
      pauseTimer,
      resumeTimer,
    }),
    [state.cards, emitCardEvent, registerCardType, enabled, pauseTimer, resumeTimer],
  );

  return React.createElement(CardManagerContext.Provider, { value: contextValue }, children);
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export const useCardManager = (): CardManagerContextValue => {
  const ctx = useContext(CardManagerContext);
  if (!ctx) {
    throw new Error('useCardManager must be used within a CardManagerProvider');
  }
  return ctx;
};

