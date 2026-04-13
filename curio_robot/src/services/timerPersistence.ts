import type { PersistedTimer } from './cardTypes';

const STORAGE_KEY = 'curio_active_timers';

export function persistTimers(timers: PersistedTimer[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
    } catch (e) {
        console.warn('[TimerPersistence] Failed to persist timers (quota exceeded?):', e);
    }
}

export function restoreTimers(): PersistedTimer[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            clearPersistedTimers();
            return [];
        }
        const now = Date.now();
        // Filter out expired timers (but keep recently expired alarms for completion flow)
        return parsed.filter((t: PersistedTimer) =>
            t.targetTime > now || (t.isAlarm && t.targetTime > now - 60_000)
        );
    } catch (e) {
        console.warn('[TimerPersistence] Failed to restore timers (corrupt JSON?):', e);
        clearPersistedTimers();
        return [];
    }
}

export function clearPersistedTimers(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        // Ignore
    }
}
