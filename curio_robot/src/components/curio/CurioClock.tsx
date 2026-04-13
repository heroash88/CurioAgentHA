import React, { useEffect, useMemo, useState } from 'react';
import { useSettingsStore } from '../../utils/settingsStorage';
import type { WidgetPosition } from '../../utils/settingsStorage';

interface CurioClockProps {
    lowPowerMode?: boolean;
}

const scheduleMinuteBoundary = (onTick: () => void): (() => void) => {
    let timeoutId: number | null = null;
    const scheduleNext = () => {
        const now = Date.now();
        const nextMinuteDelay = 60_000 - (now % 60_000) + 25;
        timeoutId = window.setTimeout(() => { onTick(); scheduleNext(); }, nextMinuteDelay);
    };
    scheduleNext();
    return () => { if (timeoutId !== null) window.clearTimeout(timeoutId); };
};

const POSITION_CLASSES: Record<WidgetPosition, string> = {
    'top-left': 'top-5 left-5',
    'top-right': 'top-5 right-5',
    'bottom-left': 'bottom-28 left-5',
    'bottom-right': 'bottom-28 right-5',
};

// Base sizes at scale 100
const BASE_TIME_PX = 72;   // ~text-7xl
const BASE_AMPM_PX = 18;   // ~text-lg
const BASE_DATE_PX = 14;   // ~text-sm

export const CurioClock: React.FC<CurioClockProps> = React.memo(({ lowPowerMode = true }) => {
    const { themeMode, clockWidgetScale, clockWidgetPosition } = useSettingsStore();
    const [now, setNow] = useState(() => new Date());
    const isDark = themeMode === 'dark';
    const pos = POSITION_CLASSES[clockWidgetPosition] || POSITION_CLASSES['top-left'];
    const s = clockWidgetScale / 100;

    const sizes = useMemo(() => ({
        time: Math.round(BASE_TIME_PX * s),
        ampm: Math.round(BASE_AMPM_PX * s),
        date: Math.round(BASE_DATE_PX * s),
    }), [s]);

    useEffect(() => {
        if (lowPowerMode) {
            setNow(new Date());
            return scheduleMinuteBoundary(() => setNow(new Date()));
        }
        const timer = window.setInterval(() => setNow(new Date()), 1_000);
        return () => window.clearInterval(timer);
    }, [lowPowerMode]);

    const timeStr = now.toLocaleTimeString([], lowPowerMode
        ? { hour: '2-digit', minute: '2-digit' }
        : { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const match = timeStr.match(/^([\d:]+)\s*(AM|PM)?$/i);
    const timePart = match ? match[1] : timeStr;
    const ampm = match?.[2] || '';
    const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className={`absolute ${pos} z-30 pointer-events-none`}>
            <div className="transition-colors duration-500 px-5 py-4">
                <div className="flex items-baseline gap-1.5">
                    <span
                        className={`font-semibold leading-none tracking-tight tabular-nums transition-colors duration-500 font-headline ${isDark ? 'text-white' : 'text-slate-800'}`}
                        style={{ fontSize: sizes.time, textShadow: isDark ? '0 2px 8px rgba(0,0,0,0.5)' : '0 1px 4px rgba(255,255,255,0.7)' }}
                    >
                        {timePart}
                    </span>
                    {ampm && (
                        <span
                            className={`font-semibold uppercase transition-colors duration-500 ${isDark ? 'text-white/40' : 'text-slate-400'}`}
                            style={{ fontSize: sizes.ampm }}
                        >
                            {ampm}
                        </span>
                    )}
                </div>
                <div
                    className={`mt-2 font-medium transition-colors duration-500 ${isDark ? 'text-white/50' : 'text-slate-500'}`}
                    style={{ fontSize: sizes.date }}
                >
                    {dateStr}
                </div>
            </div>
        </div>
    );
});

CurioClock.displayName = 'CurioClock';
