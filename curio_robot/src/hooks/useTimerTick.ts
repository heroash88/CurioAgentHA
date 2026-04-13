import { createContext, useContext, useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import React from 'react';

type TickCallback = (now: number) => void;

interface TimerTickContextValue {
  subscribe: (callback: TickCallback) => () => void;
}

const TimerTickContext = createContext<TimerTickContextValue | undefined>(undefined);

export const TimerTickProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const subscribersRef = useRef<Set<TickCallback>>(new Set());
  const rafIdRef = useRef<number | null>(null);

  const tick = useCallback((_rafTimestamp: number) => {
    // Defensive: stop immediately if no subscribers remain (edge-case guard)
    if (subscribersRef.current.size === 0) {
      rafIdRef.current = null;
      return;
    }
    const now = Date.now();
    subscribersRef.current.forEach((cb) => {
      try {
        cb(now);
      } catch {
        // Ignore errors from individual subscribers
      }
    });
    if (subscribersRef.current.size > 0) {
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      rafIdRef.current = null;
    }
  }, []);

  const subscribe = useCallback(
    (callback: TickCallback): (() => void) => {
      subscribersRef.current.add(callback);
      // Start the RAF loop if this is the first subscriber
      if (subscribersRef.current.size === 1 && rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
      return () => {
        subscribersRef.current.delete(callback);
        // Stop the RAF loop when no subscribers remain
        if (subscribersRef.current.size === 0 && rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      };
    },
    [tick],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      subscribersRef.current.clear();
    };
  }, []);

  const value = React.useMemo(() => ({ subscribe }), [subscribe]);

  return React.createElement(TimerTickContext.Provider, { value }, children);
};

export const useTimerTick = (): ((callback: TickCallback) => () => void) => {
  const ctx = useContext(TimerTickContext);
  if (!ctx) {
    throw new Error('useTimerTick must be used within a TimerTickProvider');
  }
  return ctx.subscribe;
};
