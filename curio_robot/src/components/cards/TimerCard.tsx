import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { CardComponentProps, TimerCardData, PersistedTimer } from '../../services/cardTypes';
import { useTimerTick } from '../../hooks/useTimerTick';
import { persistTimers, restoreTimers, clearPersistedTimers } from '../../services/timerPersistence';
import { getSharedAudioContext } from '../../services/audioContext';
import { useCardTheme } from '../../hooks/useCardTheme';

const SVG_SIZE = 100;
const STROKE_WIDTH = 7;
const RADIUS = (SVG_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const TimerCard: React.FC<CardComponentProps> = ({ card, onDismiss }) => {
  const t = useCardTheme();
  const data = card.data as unknown as TimerCardData;
  const subscribe = useTimerTick();

  const [remaining, setRemaining] = useState(() =>
    Math.max(0, data.targetTime - Date.now()),
  );
  const [completed, setCompleted] = useState(data.completionState === 'completed');
  const completedRef = useRef(completed);

  // Persist on create
  useEffect(() => {
    const timer: PersistedTimer = {
      id: card.id,
      label: data.label,
      isAlarm: data.isAlarm,
      targetTime: data.targetTime,
      duration: data.duration,
      createdAt: card.createdAt,
    };
    const existing = restoreTimers();
    if (!existing.find((t) => t.id === card.id)) {
      persistTimers([...existing, timer]);
    }
  }, [card.id, card.createdAt, data.label, data.isAlarm, data.targetTime, data.duration]);

  // Subscribe to tick
  useEffect(() => {
    const unsubscribe = subscribe((now: number) => {
      const rem = Math.max(0, data.targetTime - now);
      setRemaining(rem);
      if (rem <= 0 && !completedRef.current) {
        completedRef.current = true;
        setCompleted(true);
      }
    });
    return unsubscribe;
  }, [subscribe, data.targetTime]);

  // On completion: play sound, remove from persistence
  useEffect(() => {
    if (!completed) return;
    // Remove from persisted timers
    const existing = restoreTimers().filter((t) => t.id !== card.id);
    if (existing.length > 0) {
      persistTimers(existing);
    } else {
      clearPersistedTimers();
    }
    // Play completion sound using shared AudioContext (avoids creating extra contexts)
    try {
      const audioCtx = getSharedAudioContext(true);
      const playBeep = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = audioCtx.currentTime;
      if (data.isAlarm) {
        // Alarm: repeating urgent beeps
        for (let i = 0; i < 6; i++) {
          playBeep(880, now + i * 0.3, 0.15);
          playBeep(1100, now + i * 0.3 + 0.15, 0.15);
        }
      } else {
        // Timer: pleasant chime
        playBeep(523, now, 0.2);
        playBeep(659, now + 0.2, 0.2);
        playBeep(784, now + 0.4, 0.4);
      }
    } catch (e) {
      console.warn('[TimerCard] Failed to play completion sound:', e);
    }
    // Auto-dismiss timer cards after 10s
    if (!data.isAlarm) {
      const handle = setTimeout(onDismiss, 10_000);
      return () => clearTimeout(handle);
    }
  }, [completed, card.id, data.isAlarm, onDismiss]);

  const handleStop = useCallback(() => {
    // Remove from persistence on dismiss
    const existing = restoreTimers().filter((t) => t.id !== card.id);
    if (existing.length > 0) {
      persistTimers(existing);
    } else {
      clearPersistedTimers();
    }
    onDismiss();
  }, [card.id, onDismiss]);

  // Progress: 1 = full, 0 = empty
  const progress = data.duration > 0 ? Math.max(0, remaining / data.duration) : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      className={`card-glass ${
        completed ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex items-center gap-5">
        {/* Circular progress */}
        <svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          className="shrink-0 -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={t.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={t.dark ? 'white' : '#334155'}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.3s linear' }}
          />
        </svg>

        <div className="flex-1 min-w-0">
          {data.label && (
            <p className={`text-sm ${t.muted} truncate`}>{data.label}</p>
          )}
          <p className="text-4xl font-mono font-bold font-headline">
            {completed ? '0:00' : formatTime(remaining)}
          </p>
          <p className={`text-sm ${t.muted} mt-1`}>
            {data.isAlarm ? '⏰ Alarm' : '⏱️ Timer'}
          </p>
        </div>

        {completed ? (
          <button
            onClick={handleStop}
            className={`px-5 py-3 rounded-full bg-red-500/30 ${t.text} text-base font-semibold hover:bg-red-500/50 active:scale-95 transition-all`}
          >
            Stop
          </button>
        ) : (
          <button
            onClick={handleStop}
            className={`px-4 py-2 rounded-full ${t.btn} ${t.btnText} text-sm font-medium active:scale-95 transition-all`}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(TimerCard);
