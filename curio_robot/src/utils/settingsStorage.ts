import { useSyncExternalStore, useMemo, useEffect } from 'react';
import { DEFAULT_GEMINI_LIVE_VOICE_ID, normalizeGeminiLiveVoiceId } from '../services/geminiVoiceCatalog';
import {
    DEFAULT_WAKE_WORD_ENABLED,
    DEFAULT_WAKE_WORD_ID,
    resolveWakeWordId
} from '../services/wakeWordCatalog';
import { getSecret, setSecret } from './secretStorage';

type StorageSnapshotReader<T> = () => T;

const STORAGE_EVENTS = ['storage', 'curio:settings-changed'] as const;

export const subscribeToSettingsStorage = (onStoreChange: () => void) => {
    if (typeof window === 'undefined') {
        return () => { };
    }

    const handleChange = () => onStoreChange();
    STORAGE_EVENTS.forEach((eventName) => window.addEventListener(eventName, handleChange));

    return () => {
        STORAGE_EVENTS.forEach((eventName) => window.removeEventListener(eventName, handleChange));
    };
};

export const useSettingsStorageValue = <T,>(readSnapshot: StorageSnapshotReader<T>, fallbackValue: T) =>
    useSyncExternalStore(
        subscribeToSettingsStorage,
        () => (typeof window === 'undefined' ? fallbackValue : readSnapshot()),
        () => fallbackValue
    );

export const getLiveApiVoiceId = () => {
    if (typeof window === 'undefined') {
        return DEFAULT_GEMINI_LIVE_VOICE_ID;
    }
    return normalizeGeminiLiveVoiceId(localStorage.getItem('curio_liveapi_voice'));
};

export const useLiveApiVoiceId = () => useSettingsStorageValue(getLiveApiVoiceId, DEFAULT_GEMINI_LIVE_VOICE_ID);

export const getWakeWordEnabled = () => {
    if (typeof window === 'undefined') {
        return DEFAULT_WAKE_WORD_ENABLED;
    }
    return localStorage.getItem('curio_enable_wake_word') === 'true';
};

export const useWakeWordEnabled = () =>
    useSettingsStorageValue(getWakeWordEnabled, DEFAULT_WAKE_WORD_ENABLED);

export const getSelectedWakeWordId = () => {
    if (typeof window === 'undefined') {
        return DEFAULT_WAKE_WORD_ID;
    }
    return resolveWakeWordId(localStorage.getItem('curio_wake_word_id'));
};

export const useSelectedWakeWordId = () =>
    useSettingsStorageValue(getSelectedWakeWordId, DEFAULT_WAKE_WORD_ID);

export const getGeminiApiKey = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    return localStorage.getItem('gemini_live_api_key') || '';
};

export const useGeminiApiKey = () =>
    useSettingsStorageValue(getGeminiApiKey, '');

export const getUserName = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    return localStorage.getItem('curio_user_name') || '';
};

export const useUserName = () =>
    useSettingsStorageValue(getUserName, '');

export const getWeatherCity = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    return localStorage.getItem('curio-weather-city') || '';
};

export const useWeatherCity = () =>
    useSettingsStorageValue(getWeatherCity, '');

export const getTempUnit = () => {
    if (typeof window === 'undefined') {
        return 'F';
    }
    return (localStorage.getItem('curio-temp-unit') as 'F' | 'C') || 'F';
};

export const useTempUnit = () =>
    useSettingsStorageValue(getTempUnit, 'F');

export const getHomeLocation = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_home_location') || '';
};

export const setHomeLocation = (val: string) => {
    localStorage.setItem('curio_home_location', val);
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const useHomeLocation = () => useSettingsStorageValue(getHomeLocation, '');

export const getWorkLocation = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_work_location') || '';
};

export const setWorkLocation = (val: string) => {
    localStorage.setItem('curio_work_location', val);
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const useWorkLocation = () => useSettingsStorageValue(getWorkLocation, '');

export const DEFAULT_HA_URL = 'http://homeassistant.local:8123';
export const DEFAULT_HA_TOKEN = '';

export const getHaMcpUrl = () => {
    if (typeof window === 'undefined') return DEFAULT_HA_URL;
    return localStorage.getItem('curio_ha_mcp_url') || DEFAULT_HA_URL;
};

export const getHaMcpToken = () => {
    if (typeof window === 'undefined') return DEFAULT_HA_TOKEN;
    return localStorage.getItem('curio_ha_mcp_token') || DEFAULT_HA_TOKEN;
};

/** Async version that decrypts the HA token from encrypted storage. */
export const getHaMcpTokenAsync = async (): Promise<string> => {
    const val = await getSecret('curio_ha_mcp_token');
    if (val) return val;
    // Fallback: try raw localStorage in case encryption failed
    const raw = localStorage.getItem('curio_ha_mcp_token') || '';
    if (raw && !raw.startsWith('enc::')) return raw;
    return DEFAULT_HA_TOKEN;
};

export const getHaMcpEnabled = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('curio_ha_mcp_enabled') === 'true';
};

export const getHaMcpAuthMode = () => {
    if (typeof window === 'undefined') return 'token';
    return (localStorage.getItem('curio_ha_mcp_auth_mode') as 'token' | 'oauth') || 'token';
};

export type HaApiMode = 'mcp' | 'rest';

export const getHaApiMode = (): HaApiMode => {
    // Derive from auth mode: OAuth → MCP, Token → REST
    const authMode = getHaMcpAuthMode();
    return authMode === 'oauth' ? 'mcp' : 'rest';
};

export const getHaMcpOauthState = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_ha_mcp_oauth_state') || '';
};

export const getLowPowerMode = () => {
    if (typeof window === 'undefined') return false;

    const explicitLowPowerMode = localStorage.getItem('curio_low_power_mode');
    if (explicitLowPowerMode !== null) {
        return explicitLowPowerMode === 'true';
    }

    const legacyPerformanceMode = localStorage.getItem('curio_performance_mode');
    if (legacyPerformanceMode !== null) {
        return legacyPerformanceMode === 'true';
    }

    return false;
};

// Backwards-compatible alias while the rest of the app migrates.
export const getPerformanceMode = getLowPowerMode;

export const getMuteMicWhileAiSpeaking = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('curio_mute_mic_while_speaking') === 'true';
};

export const getOfflineModeEnabled = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('curio_offline_mode_enabled') === 'true';
};


export const useHaMcpUrl = () => useSettingsStorageValue(getHaMcpUrl, DEFAULT_HA_URL);
export const useHaMcpToken = () => useSettingsStorageValue(getHaMcpToken, DEFAULT_HA_TOKEN);
export const useHaMcpEnabled = () => useSettingsStorageValue(getHaMcpEnabled, false);
export const useHaMcpAuthMode = () => useSettingsStorageValue(getHaMcpAuthMode, 'token');
export const useHaApiMode = () => useSettingsStorageValue(getHaApiMode, 'rest' as HaApiMode);
export const useHaMcpOauthState = () => useSettingsStorageValue(getHaMcpOauthState, '');
export const useLowPowerMode = () => useSettingsStorageValue(getLowPowerMode, false);
export const usePerformanceMode = useLowPowerMode;
export const useMuteMicWhileAiSpeaking = () => useSettingsStorageValue(getMuteMicWhileAiSpeaking, false);
export const useOfflineModeEnabled = () => useSettingsStorageValue(getOfflineModeEnabled, false);

export const getThemeMode = () => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('curio_theme_mode') as 'light' | 'dark') || 'light';
};
export const useThemeMode = () => useSettingsStorageValue(getThemeMode, 'light');

export type RobotColorThemeId = 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'red' | 'cyan' | 'amber' | 'custom';

export interface RobotColorTheme {
    id: RobotColorThemeId;
    label: string;
    /** Primary accent (ears, eye rim glow, magnifying glass tint) */
    accent: string;
    /** Eye rim gradient outer stop */
    eyeRimOuter: string;
    /** Eye arc stroke under pupils */
    eyeArc: string;
    /** Swatch preview color (Tailwind class) */
    swatch: string;
}

export const ROBOT_COLOR_THEMES: RobotColorTheme[] = [
    { id: 'blue', label: 'Ocean', accent: '#38bdf8', eyeRimOuter: '#0ea5e9', eyeArc: '#0ea5e9', swatch: 'bg-sky-400' },
    { id: 'purple', label: 'Nebula', accent: '#a78bfa', eyeRimOuter: '#7c3aed', eyeArc: '#8b5cf6', swatch: 'bg-violet-400' },
    { id: 'green', label: 'Forest', accent: '#34d399', eyeRimOuter: '#059669', eyeArc: '#10b981', swatch: 'bg-emerald-400' },
    { id: 'pink', label: 'Sakura', accent: '#f472b6', eyeRimOuter: '#db2777', eyeArc: '#ec4899', swatch: 'bg-pink-400' },
    { id: 'orange', label: 'Sunset', accent: '#fb923c', eyeRimOuter: '#ea580c', eyeArc: '#f97316', swatch: 'bg-orange-400' },
    { id: 'red', label: 'Blaze', accent: '#f87171', eyeRimOuter: '#dc2626', eyeArc: '#ef4444', swatch: 'bg-red-400' },
    { id: 'cyan', label: 'Arctic', accent: '#22d3ee', eyeRimOuter: '#0891b2', eyeArc: '#06b6d4', swatch: 'bg-cyan-400' },
    { id: 'amber', label: 'Honey', accent: '#fbbf24', eyeRimOuter: '#d97706', eyeArc: '#f59e0b', swatch: 'bg-amber-400' },
];

export const getRobotColorThemeId = (): RobotColorThemeId => {
    if (typeof window === 'undefined') return 'blue';
    return (localStorage.getItem('curio_robot_color_theme') as RobotColorThemeId) || 'blue';
};
export const useRobotColorThemeId = () => useSettingsStorageValue(getRobotColorThemeId, 'blue' as RobotColorThemeId);

export const getCustomRobotColor = (): string => {
    if (typeof window === 'undefined') return '#38bdf8';
    return localStorage.getItem('curio_custom_robot_color') || '#38bdf8';
};

export const setCustomRobotColor = (color: string) => {
    localStorage.setItem('curio_custom_robot_color', color);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const useCustomRobotColor = () => useSettingsStorageValue(getCustomRobotColor, '#38bdf8');

export const getRobotColorTheme = (): RobotColorTheme => {
    const id = getRobotColorThemeId();
    if (id === 'custom') {
        const color = getCustomRobotColor();
        return {
            id: 'custom',
            label: 'Custom',
            accent: color,
            eyeRimOuter: color,
            eyeArc: color,
            swatch: '', // Custom handling needed in UI
        };
    }
    return ROBOT_COLOR_THEMES.find((t) => t.id === id) ?? ROBOT_COLOR_THEMES[0];
};

export const useRobotColorTheme = (): RobotColorTheme => {
    const id = useRobotColorThemeId();
    const customColor = useCustomRobotColor();
    
    const theme = useMemo(() => {
        if (id === 'custom') {
            return {
                id: 'custom',
                label: 'Custom',
                accent: customColor,
                eyeRimOuter: customColor,
                eyeArc: customColor,
                swatch: '',
            };
        }
        return ROBOT_COLOR_THEMES.find((t) => t.id === id) ?? ROBOT_COLOR_THEMES[0];
    }, [id, customColor]);

    // Sync theme to CSS variables for high-performance SVG painting
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            root.style.setProperty('--robot-accent', theme.accent);
            root.style.setProperty('--robot-eye-arc', theme.eyeArc);
            root.style.setProperty('--robot-eye-rim-outer', theme.eyeRimOuter);
        }
    }, [theme]);

    return theme;
};

// --- Face Style ---
export type FaceStyleId = 'curio' | 'astro' | 'bender';

export const FACE_STYLES: { id: FaceStyleId; label: string; emoji: string }[] = [
    { id: 'curio', label: 'Curio', emoji: '🤖' },
    { id: 'astro', label: 'Astro', emoji: '🚀' },
    { id: 'bender', label: 'Bender', emoji: '🚬' },
];

export const getFaceStyleId = (): FaceStyleId => {
    if (typeof window === 'undefined') return 'curio';
    return (localStorage.getItem('curio_face_style') as FaceStyleId) || 'curio';
};
export const useFaceStyleId = () => useSettingsStorageValue(getFaceStyleId, 'curio' as FaceStyleId);

export const setFaceStyleId = (id: FaceStyleId) => {
    localStorage.setItem('curio_face_style', id);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const getClearVoiceEnabled = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('curio_clear_voice_enabled') === 'true';
};
export const useClearVoiceEnabled = () => useSettingsStorageValue(getClearVoiceEnabled, false);


export const getVoiceGateThreshold = () => {
    if (typeof window === 'undefined') return 0;
    const val = localStorage.getItem('curio_voice_gate_threshold');
    return val ? parseFloat(val) : 0;
};
export const useVoiceGateThreshold = () => useSettingsStorageValue(getVoiceGateThreshold, 0);

export const getResponseCardsEnabled = () => {
    if (typeof window === 'undefined') return true;
    const val = localStorage.getItem('curio_response_cards_enabled');
    return val === null ? true : val === 'true';
};
export const useResponseCardsEnabled = () => useSettingsStorageValue(getResponseCardsEnabled, true);

export const getYouTubeApiKey = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_youtube_api_key') || '';
};
export const useYouTubeApiKey = () => useSettingsStorageValue(getYouTubeApiKey, '');

/** Async version that decrypts the YouTube API key from encrypted storage. */
export const getYouTubeApiKeyAsync = async (): Promise<string> => {
    const val = await getSecret('curio_youtube_api_key');
    if (val) return val;
    // Fallback: legacy plaintext stored directly
    const raw = localStorage.getItem('curio_youtube_api_key') || '';
    if (raw && !raw.startsWith('enc::')) return raw;
    return '';
};

export const getGoogleApiKey = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_google_api_key') || '';
};
export const useGoogleApiKey = () => useSettingsStorageValue(getGoogleApiKey, '');

/** Async version that decrypts the Google API key from encrypted storage. */
export const getGoogleApiKeyAsync = async (): Promise<string> => {
    const val = await getSecret('curio_google_api_key');
    if (val) return val;
    // Fallback: legacy plaintext stored directly
    const raw = localStorage.getItem('curio_google_api_key') || '';
    if (raw && !raw.startsWith('enc::')) return raw;
    return '';
};

export const getWeatherApiKey = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_weather_api_key') || '';
};
export const useWeatherApiKey = () => useSettingsStorageValue(getWeatherApiKey, '');

export const getAqiApiKey = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_aqi_api_key') || '';
};
export const useAqiApiKey = () => useSettingsStorageValue(getAqiApiKey, '');

export const getScreensaverEnabled = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('curio_screensaver_enabled') === 'true';
};
export const useScreensaverEnabled = () => useSettingsStorageValue(getScreensaverEnabled, false);

export const getScreensaverTimeout = () => {
    if (typeof window === 'undefined') return 300;
    const secsVal = localStorage.getItem('curio_screensaver_timeout_secs');
    if (secsVal) return Math.max(parseInt(secsVal, 10), 10);

    // Migration logic from minutes to seconds
    const minsVal = localStorage.getItem('curio_screensaver_timeout_mins');
    if (minsVal) {
        const secs = Math.max(parseInt(minsVal, 10) * 60, 10);
        localStorage.setItem('curio_screensaver_timeout_secs', secs.toString());
        localStorage.removeItem('curio_screensaver_timeout_mins');
        return secs;
    }

    return 300; // Default 5 mins
};
export const useScreensaverTimeout = () => useSettingsStorageValue(getScreensaverTimeout, 300);

export const getGoogleClientId = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_google_client_id') || '';
};
export const useGoogleClientId = () => useSettingsStorageValue(getGoogleClientId, '');

export const getGoogleAccessToken = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_google_access_token') || '';
};
export const useGoogleAccessToken = () => useSettingsStorageValue(getGoogleAccessToken, '');

export const getGoogleSelectedAlbumId = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_google_album_id') || '';
};
export const useGoogleSelectedAlbumId = () => useSettingsStorageValue(getGoogleSelectedAlbumId, '');

export const getPickerPhotoUrls = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem('curio_picker_photo_urls') || '[]');
    } catch { return []; }
};
// Google Photos Picker baseUrls expire after ~60 minutes.
// We also store the session ID and a fetch timestamp so the Screensaver
// can refresh URLs from the session when they go stale.
export const getPickerSessionId = (): string =>
    typeof window !== 'undefined' ? localStorage.getItem('curio_picker_session_id') || '' : '';
export const getPickerUrlsTimestamp = (): number =>
    typeof window !== 'undefined' ? parseInt(localStorage.getItem('curio_picker_urls_ts') || '0', 10) : 0;

export const setPickerPhotoUrls = (urls: string[], sessionId?: string) => {
    localStorage.setItem('curio_picker_photo_urls', JSON.stringify(urls));
    localStorage.setItem('curio_picker_urls_ts', Date.now().toString());
    if (sessionId) localStorage.setItem('curio_picker_session_id', sessionId);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};
export const getFaceTrackingEnabled = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('curio_face_tracking_enabled') === 'true';
};
export const useFaceTrackingEnabled = () => useSettingsStorageValue(getFaceTrackingEnabled, false);

export const getAnimationsEnabled = () => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('curio_animations_enabled') !== 'false';
};
export const useAnimationsEnabled = () => useSettingsStorageValue(getAnimationsEnabled, true);

export const getIdleSleepTimeout = () => {
    if (typeof window === 'undefined') return 120;
    const val = localStorage.getItem('curio_idle_sleep_timeout');
    return val ? Math.max(parseInt(val, 10), 10) : 120;
};
export const useIdleSleepTimeout = () => useSettingsStorageValue(getIdleSleepTimeout, 120);

/**
 * Setter functions defined outside the hook for stable references
 */
export const setApiKey = async (key: string) => {
    await setSecret('gemini_live_api_key', key);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setWakeWordEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_enable_wake_word', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setSelectedWakeWordId = (id: string) => {
    localStorage.setItem('curio_wake_word_id', id);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setLiveApiVoiceId = (id: string) => {
    localStorage.setItem('curio_liveapi_voice', id);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setUserName = (name: string) => {
    localStorage.setItem('curio_user_name', name);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setWeatherCity = (city: string) => {
    localStorage.setItem('curio-weather-city', city);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setTempUnit = (unit: 'F' | 'C') => {
    localStorage.setItem('curio-temp-unit', unit);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setHaMcpUrl = (url: string) => {
    localStorage.setItem('curio_ha_mcp_url', url);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setHaMcpToken = async (token: string) => {
    await setSecret('curio_ha_mcp_token', token);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setHaMcpEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_ha_mcp_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setHaMcpAuthMode = (mode: 'token' | 'oauth') => {
    localStorage.setItem('curio_ha_mcp_auth_mode', mode);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setHaApiMode = (mode: HaApiMode) => {
    localStorage.setItem('curio_ha_api_mode', mode);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setHaMcpOauthState = (state: string) => {
    localStorage.setItem('curio_ha_mcp_oauth_state', state);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setLowPowerMode = (enabled: boolean) => {
    localStorage.setItem('curio_low_power_mode', enabled ? 'true' : 'false');
    localStorage.setItem('curio_performance_mode', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setPerformanceMode = setLowPowerMode;

export const setMuteMicWhileAiSpeaking = (enabled: boolean) => {
    localStorage.setItem('curio_mute_mic_while_speaking', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setOfflineModeEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_offline_mode_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setClearVoiceEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_clear_voice_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setVoiceGateThreshold = (threshold: number) => {
    localStorage.setItem('curio_voice_gate_threshold', threshold.toString());
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setResponseCardsEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_response_cards_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setScreensaverEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_screensaver_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setScreensaverTimeout = (secs: number) => {
    const safeSecs = Math.max(secs, 10);
    localStorage.setItem('curio_screensaver_timeout_secs', safeSecs.toString());
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export type ScreensaverSource = 'google' | 'offline' | 'unsplash';

export const getScreensaverSource = (): ScreensaverSource => {
    if (typeof window === 'undefined') return 'unsplash';
    return (localStorage.getItem('curio_screensaver_source') as ScreensaverSource) || 'unsplash';
};
export const useScreensaverSource = () => useSettingsStorageValue(getScreensaverSource, 'unsplash' as ScreensaverSource);

export const setScreensaverSource = (source: ScreensaverSource) => {
    localStorage.setItem('curio_screensaver_source', source);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setGoogleClientId = (id: string) => {
    localStorage.setItem('curio_google_client_id', id);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setGoogleAccessToken = (token: string) => {
    localStorage.setItem('curio_google_access_token', token);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const getGoogleTasksAccessToken = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_google_tasks_access_token') || '';
};
export const useGoogleTasksAccessToken = () => useSettingsStorageValue(getGoogleTasksAccessToken, '');

export const setGoogleTasksAccessToken = (token: string) => {
    localStorage.setItem('curio_google_tasks_access_token', token);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setGoogleSelectedAlbumId = (id: string) => {
    localStorage.setItem('curio_google_album_id', id);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};


export const setYouTubeApiKey = async (key: string) => {
    await setSecret('curio_youtube_api_key', key);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setGoogleApiKey = async (key: string) => {
    await setSecret('curio_google_api_key', key);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setWeatherApiKey = async (key: string) => {
    await setSecret('curio_weather_api_key', key);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setAqiApiKey = async (key: string) => {
    await setSecret('curio_aqi_api_key', key);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setFaceTrackingEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_face_tracking_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setAnimationsEnabled = (enabled: boolean) => {
    localStorage.setItem('curio_animations_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

/**
 * setIdleSleepTimeout
 * @param secs The number of seconds of inactivity before Curio goes to sleep.
 */
export const setIdleSleepTimeout = (secs: number) => {
    const safeSecs = Math.max(secs, 10);
    localStorage.setItem('curio_idle_sleep_timeout', safeSecs.toString());
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setThemeMode = (mode: 'light' | 'dark') => {
    localStorage.setItem('curio_theme_mode', mode);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setRobotColorThemeId = (id: RobotColorThemeId) => {
    localStorage.setItem('curio_robot_color_theme', id);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

// --- AI Personality ---
export type PersonalityId = 'kids-young' | 'kids-older' | 'fun' | 'professional' | 'sarcastic' | 'zen' | 'custom';

export interface PersonalityPreset {
    id: PersonalityId;
    label: string;
    emoji: string;
    description: string;
    prompt: string;
}

export const PERSONALITY_PRESETS: PersonalityPreset[] = [
    {
        id: 'kids-young',
        label: 'Kids (Ages 3–7)',
        emoji: '🧒',
        description: 'Simple words, extra playful, educational',
        prompt: 'You are talking to a young child (ages 3–7). Use very simple words and short sentences. Be extra playful, silly, and encouraging. Explain things like you would to a kindergartner. Use fun sound effects in your speech. Avoid anything scary or complex. Make learning feel like a game.',
    },
    {
        id: 'kids-older',
        label: 'Kids (Ages 8–12)',
        emoji: '🎒',
        description: 'Curious, educational, age-appropriate humor',
        prompt: 'You are talking to a kid (ages 8–12). Be curious and enthusiastic. Use humor they would enjoy. Explain things clearly but don\'t talk down to them. Encourage questions and exploration. Keep content age-appropriate. You can use bigger vocabulary but explain new words when you use them.',
    },
    {
        id: 'fun',
        label: 'Fun & Playful',
        emoji: '🎉',
        description: 'Jokes, energy, casual vibes',
        prompt: 'Be extra fun, energetic, and playful. Crack jokes, use casual language, and keep the energy high. You love puns and wordplay. Be enthusiastic about everything. Keep things light and entertaining while still being helpful.',
    },
    {
        id: 'professional',
        label: 'Professional',
        emoji: '💼',
        description: 'Concise, factual, business-like',
        prompt: 'Be professional, concise, and factual. Skip the jokes and get straight to the point. Use clear, precise language. Prioritize accuracy and efficiency. Respond like a knowledgeable executive assistant.',
    },
    {
        id: 'sarcastic',
        label: 'Sarcastic Buddy',
        emoji: '😏',
        description: 'Witty, dry humor, still helpful',
        prompt: 'Be witty and sarcastic in a friendly way. Use dry humor and clever comebacks. You\'re the friend who always has a quip ready. Still be helpful and accurate, but deliver information with personality and sass. Never be mean-spirited.',
    },
    {
        id: 'zen',
        label: 'Calm & Zen',
        emoji: '🧘',
        description: 'Peaceful, mindful, soothing',
        prompt: 'Be calm, peaceful, and soothing. Speak gently and mindfully. Take a breath before responding. Use serene language and encourage mindfulness. You radiate tranquility. Keep responses measured and thoughtful.',
    },
    {
        id: 'custom',
        label: 'Custom',
        emoji: '✏️',
        description: 'Write your own personality prompt',
        prompt: '',
    },
];

export const getPersonalityId = (): PersonalityId => {
    if (typeof window === 'undefined') return 'fun';
    return (localStorage.getItem('curio_personality_id') as PersonalityId) || 'fun';
};
export const usePersonalityId = () => useSettingsStorageValue(getPersonalityId, 'fun' as PersonalityId);

export const getCustomPersonalityPrompt = (): string => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('curio_custom_personality_prompt') || '';
};
export const useCustomPersonalityPrompt = () => useSettingsStorageValue(getCustomPersonalityPrompt, '');

export const setPersonalityId = (id: PersonalityId) => {
    localStorage.setItem('curio_personality_id', id);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const setCustomPersonalityPrompt = (prompt: string) => {
    localStorage.setItem('curio_custom_personality_prompt', prompt);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const getActivePersonalityPrompt = (): string => {
    const id = getPersonalityId();
    if (id === 'custom') return getCustomPersonalityPrompt();
    const preset = PERSONALITY_PRESETS.find(p => p.id === id);
    return preset?.prompt || '';
};

// ---------------------------------------------------------------------------
// Per-card-type enable/disable settings
// ---------------------------------------------------------------------------
export type CardToggleKey =
    | 'weather' | 'timer' | 'device' | 'media' | 'calculation' | 'reminder'
    | 'image' | 'youtube' | 'music' | 'news' | 'funFact' | 'definition' | 'list'
    | 'quote' | 'sportsScore' | 'recipe' | 'translation' | 'finance' | 'stopwatch'
    | 'calendar' | 'alarm' | 'map' | 'airQuality' | 'joke' | 'trivia'
    | 'unitConversion' | 'astronomy' | 'commute' | 'camera' | 'thermostat';

const CARD_STORAGE_PREFIX = 'curio_card_enabled_';

// All cards enabled by default
export const getCardEnabled = (cardType: CardToggleKey): boolean => {
    if (typeof window === 'undefined') return true;
    const val = localStorage.getItem(`${CARD_STORAGE_PREFIX}${cardType}`);
    return val === null ? true : val === 'true';
};

export const setCardEnabled = (cardType: CardToggleKey, enabled: boolean) => {
    localStorage.setItem(`${CARD_STORAGE_PREFIX}${cardType}`, enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const useCardEnabled = (cardType: CardToggleKey) =>
    useSettingsStorageValue(() => getCardEnabled(cardType), true);

// Bulk getter for all card toggles
export const getAllCardToggles = (): Record<CardToggleKey, boolean> => {
    const keys: CardToggleKey[] = [
        'weather', 'timer', 'device', 'media', 'calculation', 'reminder',
        'image', 'youtube', 'music', 'news', 'funFact', 'definition', 'list',
        'quote', 'sportsScore', 'recipe', 'translation', 'finance', 'stopwatch',
        'calendar', 'alarm', 'map', 'airQuality', 'joke', 'trivia',
        'unitConversion', 'astronomy', 'commute', 'camera', 'thermostat',
    ];
    const result = {} as Record<CardToggleKey, boolean>;
    for (const key of keys) {
        result[key] = getCardEnabled(key);
    }
    return result;
};

export const useAllCardToggles = () =>
    useSettingsStorageValue(getAllCardToggles, {} as Record<CardToggleKey, boolean>);

// ---------------------------------------------------------------------------
// Alarm persistence
// ---------------------------------------------------------------------------
export interface PersistedAlarm {
    id: string;
    label: string;
    time: string; // HH:mm
    enabled: boolean;
    days?: string[];
}

const ALARM_STORAGE_KEY = 'curio_alarms';

export const getPersistedAlarms = (): PersistedAlarm[] => {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(ALARM_STORAGE_KEY) || '[]');
    } catch { return []; }
};

export const setPersistedAlarms = (alarms: PersistedAlarm[]) => {
    localStorage.setItem(ALARM_STORAGE_KEY, JSON.stringify(alarms));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

export const usePersistedAlarms = () =>
    useSettingsStorageValue(getPersistedAlarms, [] as PersistedAlarm[]);

// ---------------------------------------------------------------------------
// Homescreen widget settings
// ---------------------------------------------------------------------------
export type WidgetPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const numericSetting = (key: string, fallback: number) => {
    const get = (): number => {
        if (typeof window === 'undefined') return fallback;
        const v = localStorage.getItem(key);
        return v ? Math.max(50, Math.min(150, parseInt(v, 10) || fallback)) : fallback;
    };
    const set = (val: number) => {
        localStorage.setItem(key, String(Math.max(50, Math.min(150, val))));
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('curio:settings-changed'));
    };
    return { get, set };
};

const positionSetting = (key: string, fallback: WidgetPosition) => {
    const get = (): WidgetPosition => {
        if (typeof window === 'undefined') return fallback;
        return (localStorage.getItem(key) as WidgetPosition) || fallback;
    };
    const set = (pos: WidgetPosition) => {
        localStorage.setItem(key, pos);
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('curio:settings-changed'));
    };
    return { get, set };
};

const clockScale = numericSetting('curio_clock_widget_scale', 100);
export const getClockWidgetScale = clockScale.get;
export const setClockWidgetScale = clockScale.set;
export const useClockWidgetScale = () => useSettingsStorageValue(getClockWidgetScale, 100);

const weatherScale = numericSetting('curio_weather_widget_scale', 100);
export const getWeatherWidgetScale = weatherScale.get;
export const setWeatherWidgetScale = weatherScale.set;
export const useWeatherWidgetScale = () => useSettingsStorageValue(getWeatherWidgetScale, 100);

const idlePromptScale = numericSetting('curio_idle_prompt_scale', 100);
export const getIdlePromptScale = idlePromptScale.get;
export const setIdlePromptScale = idlePromptScale.set;
export const useIdlePromptScale = () => useSettingsStorageValue(getIdlePromptScale, 100);

export const DEFAULT_ROBOT_FACE_SCALE = 100;
const robotFaceScale = numericSetting('curio_robot_face_scale', DEFAULT_ROBOT_FACE_SCALE);
export const getRobotFaceScale = robotFaceScale.get;
export const setRobotFaceScale = robotFaceScale.set;
export const useRobotFaceScale = () => useSettingsStorageValue(getRobotFaceScale, DEFAULT_ROBOT_FACE_SCALE);

const clockPos = positionSetting('curio_clock_widget_position', 'top-left');
export const getClockWidgetPosition = clockPos.get;
export const setClockWidgetPosition = clockPos.set;
export const useClockWidgetPosition = () => useSettingsStorageValue(getClockWidgetPosition, 'top-left' as WidgetPosition);

const weatherPos = positionSetting('curio_weather_widget_position', 'top-right');
export const getWeatherWidgetPosition = weatherPos.get;
export const setWeatherWidgetPosition = weatherPos.set;
export const useWeatherWidgetPosition = () => useSettingsStorageValue(getWeatherWidgetPosition, 'top-right' as WidgetPosition);

export const getShowIdlePrompt = (): boolean => {
    if (typeof window === 'undefined') return true;
    const val = localStorage.getItem('curio_show_idle_prompt');
    return val === null ? true : val === 'true';
};
export const setShowIdlePrompt = (show: boolean) => {
    localStorage.setItem('curio_show_idle_prompt', show.toString());
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};
export const useShowIdlePrompt = () => useSettingsStorageValue(getShowIdlePrompt, true);

export type IdlePromptPosition = 'top' | 'bottom';
export const getIdlePromptPosition = (): IdlePromptPosition => {
    if (typeof window === 'undefined') return 'bottom';
    return (localStorage.getItem('curio_idle_prompt_position') as IdlePromptPosition) || 'bottom';
};
export const setIdlePromptPosition = (pos: IdlePromptPosition) => {
    localStorage.setItem('curio_idle_prompt_position', pos);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};
export const useIdlePromptPosition = () => useSettingsStorageValue(getIdlePromptPosition, 'bottom' as IdlePromptPosition);

const boolSetting = (key: string, fallback: boolean) => {
    const get = (): boolean => {
        if (typeof window === 'undefined') return fallback;
        const val = localStorage.getItem(key);
        return val === null ? fallback : val === 'true';
    };
    const set = (v: boolean) => {
        localStorage.setItem(key, v.toString());
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('curio:settings-changed'));
    };
    return { get, set };
};

const clockVisible = boolSetting('curio_clock_widget_visible', true);
export const getShowClockWidget = clockVisible.get;
export const setShowClockWidget = clockVisible.set;
export const useShowClockWidget = () => useSettingsStorageValue(getShowClockWidget, true);

const weatherVisible = boolSetting('curio_weather_widget_visible', true);
export const getShowWeatherWidget = weatherVisible.get;
export const setShowWeatherWidget = weatherVisible.set;
export const useShowWeatherWidget = () => useSettingsStorageValue(getShowWeatherWidget, true);

export type ConnectButtonPosition = 'top' | 'bottom';
const connectBtnScale = numericSetting('curio_connect_btn_scale', 100);
export const getConnectButtonScale = connectBtnScale.get;
export const setConnectButtonScale = connectBtnScale.set;
export const useConnectButtonScale = () => useSettingsStorageValue(getConnectButtonScale, 100);

const connectBtnPos = ((): { get: () => ConnectButtonPosition; set: (v: ConnectButtonPosition) => void } => {
    const get = (): ConnectButtonPosition => {
        if (typeof window === 'undefined') return 'top';
        return (localStorage.getItem('curio_connect_btn_position') as ConnectButtonPosition) || 'top';
    };
    const set = (v: ConnectButtonPosition) => {
        localStorage.setItem('curio_connect_btn_position', v);
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('curio:settings-changed'));
    };
    return { get, set };
})();
export const getConnectButtonPosition = connectBtnPos.get;
export const setConnectButtonPosition = connectBtnPos.set;
export const useConnectButtonPosition = () => useSettingsStorageValue(getConnectButtonPosition, 'top' as ConnectButtonPosition);

/**
 * useSettingsStore
 * A simplified reactive store for CurioAgentMode settings.
 */
export const useSettingsStore = () => {
    const apiKey = useGeminiApiKey();
    const wakeWordEnabled = useWakeWordEnabled();
    const selectedWakeWordId = useSelectedWakeWordId();
    const liveApiVoiceId = useLiveApiVoiceId();
    const userName = useUserName();
    const weatherCity = useWeatherCity();
    const tempUnit = useTempUnit();
    const haMcpUrl = useHaMcpUrl();
    const haMcpToken = useHaMcpToken();
    const haMcpEnabled = useHaMcpEnabled();
    const haMcpAuthMode = useHaMcpAuthMode();
    const haApiMode = useHaApiMode();
    const haMcpOauthState = useHaMcpOauthState();
    const lowPowerMode = useLowPowerMode();
    const muteMicWhileAiSpeaking = useMuteMicWhileAiSpeaking();
    const offlineModeEnabled = useOfflineModeEnabled();
    const clearVoiceEnabled = useClearVoiceEnabled();
    const voiceGateThreshold = useVoiceGateThreshold();
    const responseCardsEnabled = useResponseCardsEnabled();
    const youTubeApiKey = useYouTubeApiKey();
    const googleApiKey = useGoogleApiKey();
    const screensaverEnabled = useScreensaverEnabled();
    const screensaverTimeout = useScreensaverTimeout();
    const screensaverSource = useScreensaverSource();
    const googleAccessToken = useGoogleAccessToken();
    const googleTasksAccessToken = useGoogleTasksAccessToken();
    const googleSelectedAlbumId = useGoogleSelectedAlbumId();
    const faceTrackingEnabled = useFaceTrackingEnabled();
    const animationsEnabled = useAnimationsEnabled();
    const themeMode = useThemeMode();
    const idleSleepTimeout = useIdleSleepTimeout();
    const clockWidgetScale = useClockWidgetScale();
    const weatherWidgetScale = useWeatherWidgetScale();
    const idlePromptScale = useIdlePromptScale();
    const robotFaceScale = useRobotFaceScale();
    const clockWidgetPosition = useClockWidgetPosition();
    const weatherWidgetPosition = useWeatherWidgetPosition();
    const showIdlePrompt = useShowIdlePrompt();
    const idlePromptPosition = useIdlePromptPosition();
    const showClockWidget = useShowClockWidget();
    const showWeatherWidget = useShowWeatherWidget();
    const connectButtonScale = useConnectButtonScale();
    const connectButtonPosition = useConnectButtonPosition();
    const robotColorThemeId = useRobotColorThemeId();
    const faceStyleId = useFaceStyleId();
    const homeLocation = useHomeLocation();
    const workLocation = useWorkLocation();

    return {
        apiKey,
        userName,
        weatherCity,
        tempUnit,
        haMcpUrl,
        haMcpToken,
        haMcpEnabled,
        haMcpAuthMode,
        haApiMode,
        haMcpOauthState,
        lowPowerMode,
        performanceMode: lowPowerMode,
        muteMicWhileAiSpeaking,
        offlineModeEnabled,
        clearVoiceEnabled,
        voiceGateThreshold,
        responseCardsEnabled,
        youTubeApiKey,
        googleApiKey,
        screensaverEnabled,
        screensaverTimeout,
        screensaverSource,
        googleAccessToken,
        googleTasksAccessToken,
        googleSelectedAlbumId,
        faceTrackingEnabled,
        animationsEnabled,
        wakeWordEnabled,
        selectedWakeWordId,
        liveApiVoiceId,
        themeMode,
        idleSleepTimeout,

        // Use standard stable setters
        setApiKey,
        setWakeWordEnabled,
        setSelectedWakeWordId,
        setLiveApiVoiceId,
        setUserName,
        setWeatherCity,
        setTempUnit,
        setHaMcpUrl,
        setHaMcpToken,
        setHaMcpEnabled,
        setHaMcpAuthMode,
        setHaApiMode,
        setHaMcpOauthState,
        setLowPowerMode,
        setPerformanceMode,
        setMuteMicWhileAiSpeaking,
        setOfflineModeEnabled,
        setClearVoiceEnabled,
        setVoiceGateThreshold,
        setResponseCardsEnabled,
        setYouTubeApiKey,
        setGoogleApiKey,
        setScreensaverEnabled,
        setScreensaverTimeout,
        setScreensaverSource,
        setGoogleAccessToken,
        setGoogleTasksAccessToken,
        setGoogleSelectedAlbumId,
        setPickerPhotoUrls,
        setFaceTrackingEnabled,
        setAnimationsEnabled,
        setIdleSleepTimeout,
        setThemeMode,
        setCardEnabled,
        clockWidgetScale,
        weatherWidgetScale,
        idlePromptScale,
        robotFaceScale,
        clockWidgetPosition,
        weatherWidgetPosition,
        showIdlePrompt,
        setClockWidgetScale,
        setWeatherWidgetScale,
        setIdlePromptScale,
        setRobotFaceScale,
        setClockWidgetPosition,
        setWeatherWidgetPosition,
        setShowIdlePrompt,
        idlePromptPosition,
        setIdlePromptPosition,
        showClockWidget,
        setShowClockWidget,
        showWeatherWidget,
        setShowWeatherWidget,
        connectButtonScale,
        setConnectButtonScale,
        connectButtonPosition,
        setConnectButtonPosition,
        robotColorThemeId,
        setRobotColorThemeId,
        customRobotColor: useCustomRobotColor(),
        setCustomRobotColor,
        faceStyleId,
        setFaceStyleId,
        homeLocation,
        setHomeLocation,
        workLocation,
        setWorkLocation,
    };
};
