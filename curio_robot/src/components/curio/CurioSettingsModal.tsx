import React, { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense, startTransition } from 'react';
import { Eye, EyeOff, ExternalLink, Sparkles, User, Mic, Brain, AudioWaveform, Thermometer, RotateCcw, Palette, Link, Server, KeyRound, Image, Clock, CloudRain, MessageCircle, Power, Maximize, MapPin, Timer, Trash2, Upload, Play, ArrowUpDown, Shield } from 'lucide-react';

import { GEMINI_LIVE_VOICES } from '../../services/geminiVoiceCatalog';
import { getAvailableWakeWords, getWakeWordDefinition } from '../../services/wakeWordCatalog';
import { getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { getSecret, SENSITIVE_KEYS } from '../../utils/secretStorage';
import { GEMINI_LIVE_MODELS, getGeminiLiveModel, setGeminiLiveModel } from '../../services/ai/config';
import { useHaMcpRuntimeStatus } from '../../utils/haMcpRuntimeStatus';
import { useLiveApiVoiceId, useSelectedWakeWordId, useSettingsStore, DEFAULT_HA_URL, DEFAULT_HA_TOKEN, DEFAULT_ROBOT_FACE_SCALE, getPickerPhotoUrls, PERSONALITY_PRESETS, usePersonalityId, useCustomPersonalityPrompt, setPersonalityId, setCustomPersonalityPrompt, setPickerPhotoUrls, ROBOT_COLOR_THEMES, FACE_STYLES } from '../../utils/settingsStorage';
import type { PersonalityId, ScreensaverSource } from '../../utils/settingsStorage';
import { useLiveAPI } from '../../contexts/LiveAPIContext';
import { isIOSStandalonePwa } from '../../utils/pwa';
import { isHomeAssistantIngress } from '../../utils/haAuthUtils';
import {
    preloadWakeWordModel,
    prepareWakeWordAudio,
    releaseWakeWordRuntime,
} from '../../services/wakeWordService';
import SettingsSection from './SettingsSection';
import SettingsToggle from './SettingsToggle';

const CardTogglesSection = lazy(() => import('./CardTogglesSection'));
const PENDING_GOOGLE_PICKER_SESSION_KEY = 'curio_pending_picker_session_id';

interface CurioSettingsModalProps {
    open: boolean;
    onClose: () => void;
    onRefreshWeather: () => void;
    subtitlesEnabled: boolean;
    setSubtitlesEnabled: (enabled: boolean) => void;
    unlockAudio: () => Promise<boolean>;
    primeAllPermissions: () => Promise<{ camera: boolean; microphone: boolean }>;
}

interface CitySuggestion {
    name: string;
    country: string;
    state?: string;
    lat: number;
    lon: number;
}

// Open-Meteo geocoding is free — no API key needed

const getStatusBadgeClassName = (status: 'idle' | 'checking' | 'connected' | 'error') => {
    if (status === 'connected') return 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]';
    if (status === 'error') return 'bg-red-500';
    if (status === 'checking') return 'bg-amber-500 animate-pulse';
    return 'bg-slate-300';
};

const getStatusTextClassName = (status: 'idle' | 'checking' | 'connected' | 'error') => {
    if (status === 'connected') return 'text-green-600';
    if (status === 'error') return 'text-red-500';
    if (status === 'checking') return 'text-amber-600';
    return 'text-slate-500';
};


const getStatusText = (status: 'idle' | 'checking' | 'connected' | 'error') => {
    if (status === 'connected') return 'Connected';
    if (status === 'error') return 'Error';
    if (status === 'checking') return 'Checking';
    return 'Not checked';
};

const ROBOT_ANIMATIONS_CATALOG: Record<string, { id: number; label: string }[]> = {
    curio: [
        { id: 2, label: '😉 Wink' },
        { id: 4, label: '🔍 Curious' },
        { id: 5, label: '❤️ Love' },
        { id: 6, label: '😲 Surprised' },
        { id: 7, label: '🔬 Magnifying Glass' },
        { id: 8, label: '↕️ Bob' },
        { id: 9, label: '🕶️ Sunglasses' },
        { id: 10, label: '🌀 Dizzy' },
        { id: 11, label: '🔍 Scanning' },
        { id: 13, label: '👾 Digital Glitch' },
        { id: 14, label: '🎩 Gentleman' },
        { id: 16, label: '💨 Steam' },
        { id: 17, label: '📟 Matrix' },
        { id: 18, label: '🌈 Rainbow' },
        { id: 19, label: '🦋 Butterfly' },
        { id: 21, label: '🎈 Bubblegum' },
        { id: 22, label: '🎉 Confetti' },
        { id: 23, label: '😇 Halo' },
        { id: 24, label: '⭐ Stars' },
        { id: 25, label: '⏰ Clock' },
        { id: 26, label: '🌧️ Rain' },
        { id: 27, label: '🤧 Sneeze' },
        { id: 28, label: '💭 Thinking' },
        { id: 29, label: '🔥 Fire' },
        { id: 30, label: '🚁 Propeller' },
        { id: 31, label: '🎵 Music' },
        { id: 32, label: '💰 Gold Chain' },
        { id: 33, label: '😕 Confused' },
        { id: 34, label: '😢 Sad' },
        { id: 35, label: '💖 Love (Big)' },
        { id: 36, label: '😏 Smirk' },
        { id: 37, label: '📡 Antenna Glow' },
    ],
    astro: [
        { id: 0, label: '😉 Wink' },
        { id: 1, label: '😊 Happy/Bob' },
        { id: 2, label: '🤔 Curious/Nod' },
        { id: 5, label: '❤️ Love' },
        { id: 6, label: '😲 Surprised' },
        { id: 7, label: '🔬 Magnifying Glass' },
        { id: 8, label: '↕️ Bob' },
        { id: 9, label: '🕶️ Sunglasses' },
        { id: 10, label: '🌀 Dizzy' },
        { id: 11, label: '🔍 Scanning' },
        { id: 13, label: '👾 Digitized' },
        { id: 14, label: '🎩 Gentleman' },
        { id: 16, label: '😤 Raging' },
        { id: 17, label: '📟 Matrix' },
        { id: 18, label: '🌈 Rainbow' },
        { id: 19, label: '🦋 Butterfly' },
        { id: 21, label: '🎈 Bubblegum' },
        { id: 22, label: '🎉 Confetti' },
        { id: 23, label: '😇 Halo' },
        { id: 24, label: '⭐ Stars' },
        { id: 25, label: '⏰ Clock' },
        { id: 26, label: '🌧️ Rain' },
        { id: 27, label: '🤧 Sneeze' },
        { id: 28, label: '💭 Thinking' },
        { id: 29, label: '🔥 Fire' },
        { id: 30, label: '🚁 Propeller' },
        { id: 31, label: '🎵 Music' },
    ],
    bender: Array.from({ length: 30 }, (_, i) => ({ id: i + 1, label: `🤖 Action ${i + 1}` }))
};

// Fallback for types not explicitly defined
const DEFAULT_ANIMATIONS = ROBOT_ANIMATIONS_CATALOG.curio;

const applyRobotThemeCss = (accent: string, eyeArc: string = accent, eyeRimOuter: string = accent) => {
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;
    root.style.setProperty('--robot-accent', accent);
    root.style.setProperty('--robot-eye-arc', eyeArc);
    root.style.setProperty('--robot-eye-rim-outer', eyeRimOuter);
};

interface RobotColorThemeSectionProps {
    robotColorThemeId: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'red' | 'cyan' | 'amber' | 'custom';
    customRobotColor: string;
    setRobotColorThemeId: (id: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'red' | 'cyan' | 'amber' | 'custom') => void;
    setCustomRobotColor: (color: string) => void;
}

const RobotColorThemeSection: React.FC<RobotColorThemeSectionProps> = ({
    robotColorThemeId,
    customRobotColor,
    setRobotColorThemeId,
    setCustomRobotColor,
}) => {
    const [draftCustomColor, setDraftCustomColor] = useState(customRobotColor);

    useEffect(() => {
        setDraftCustomColor(customRobotColor);
    }, [customRobotColor]);

    const commitCustomColor = useCallback(() => {
        if (draftCustomColor === customRobotColor) {
            return;
        }

        setCustomRobotColor(draftCustomColor);
    }, [draftCustomColor, customRobotColor, setCustomRobotColor]);

    return (
        <div className="space-y-2">
            <div className="flex flex-col">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Palette size={14} className="text-rose-500" /> Color Theme</span>
                <span className="text-[10px] text-slate-400 italic">Curio's UI accent color</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {ROBOT_COLOR_THEMES.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => {
                            applyRobotThemeCss(theme.accent, theme.eyeArc, theme.eyeRimOuter);
                            setRobotColorThemeId(theme.id);
                        }}
                        className={`group relative flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all active:scale-90 ${robotColorThemeId === theme.id ? 'scale-110 border-slate-400 shadow-md' : 'border-transparent hover:border-slate-200 hover:bg-slate-50'}`}
                        title={theme.label}
                    >
                        <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: theme.accent }} />
                        {robotColorThemeId === theme.id && (
                            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[8px] text-white shadow-sm">âœ“</div>
                        )}
                    </button>
                ))}

                <button
                    onClick={() => {
                        applyRobotThemeCss(draftCustomColor);
                        setRobotColorThemeId('custom');
                    }}
                    className={`group relative flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all active:scale-90 ${robotColorThemeId === 'custom' ? 'scale-110 border-slate-400 shadow-md' : 'border-transparent hover:border-slate-200 hover:bg-slate-50'}`}
                    title="Custom Color"
                >
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200"
                        style={{ backgroundColor: robotColorThemeId === 'custom' ? draftCustomColor : '#f1f5f9' }}
                    >
                        <Palette size={14} className={robotColorThemeId === 'custom' ? 'text-white drop-shadow-sm' : 'text-slate-400'} />
                    </div>
                    {robotColorThemeId === 'custom' && (
                        <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[8px] text-white shadow-sm">âœ“</div>
                    )}
                </button>
            </div>

            {robotColorThemeId === 'custom' && (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-1 flex-col">
                        <span className="text-xs font-bold text-slate-600">Custom Accent</span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 tabular-nums">{draftCustomColor}</span>
                    </div>
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-sm transition-transform hover:scale-105 active:scale-95">
                        <input
                            type="color"
                            value={draftCustomColor}
                            onInput={(event) => {
                                const nextColor = event.target.value;
                                setDraftCustomColor(nextColor);
                                applyRobotThemeCss(nextColor);
                            }}
                            onChange={commitCustomColor}
                            onBlur={commitCustomColor}
                            className="absolute inset-0 h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-none opacity-100"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const CurioSettingsModalComponent: React.FC<CurioSettingsModalProps> = ({
    open,
    onClose,
    onRefreshWeather,
    subtitlesEnabled,
    setSubtitlesEnabled,
    unlockAudio,
}) => {
    const {
        apiKey,
        setApiKey,
        wakeWordEnabled,
        setWakeWordEnabled,
        userName,
        setUserName,
        weatherCity,
        setWeatherCity,
        tempUnit,
        setTempUnit,
        haMcpUrl,
        setHaMcpUrl,
        haMcpToken,
        setHaMcpToken,
        haMcpEnabled,
        setHaMcpEnabled,
        haMcpAuthMode,
        setHaMcpAuthMode,
        lowPowerMode,
        setLowPowerMode,
        muteMicWhileAiSpeaking,
        setMuteMicWhileAiSpeaking,
        offlineModeEnabled,
        setOfflineModeEnabled,
        setSelectedWakeWordId,
        setLiveApiVoiceId,
        responseCardsEnabled,
        setResponseCardsEnabled,
        screensaverEnabled,
        setScreensaverEnabled,
        screensaverTimeout,
        setScreensaverTimeout,
        screensaverSource,
        setScreensaverSource,
        googleAccessToken,
        setGoogleAccessToken,
        googleTasksAccessToken,
        setGoogleTasksAccessToken,
        setGoogleSelectedAlbumId,
        faceTrackingEnabled,
        setFaceTrackingEnabled,
        idleSleepTimeout,
        setIdleSleepTimeout,
        themeMode,
        setThemeMode,
        clockWidgetScale,
        setClockWidgetScale,
        weatherWidgetScale,
        setWeatherWidgetScale,
        idlePromptScale,
        setIdlePromptScale,
        robotFaceScale,
        setRobotFaceScale,
        clockWidgetPosition,
        setClockWidgetPosition,
        weatherWidgetPosition,
        setWeatherWidgetPosition,
        showIdlePrompt,
        setShowIdlePrompt,
        idlePromptPosition,
        setIdlePromptPosition,
        showClockWidget,
        setShowClockWidget,
        showWeatherWidget,
        setShowWeatherWidget,
        connectButtonPosition,
        setConnectButtonPosition,
        connectButtonScale,
        setConnectButtonScale,
        googleApiKey,
        setGoogleApiKey,
        homeLocation,
        setHomeLocation,
        workLocation,
        setWorkLocation,
        robotColorThemeId,
        setRobotColorThemeId,
        customRobotColor,
        setCustomRobotColor,
        faceStyleId,
        setFaceStyleId,
    } = useSettingsStore();

    const { resetSession } = useLiveAPI();

    const liveApiVoiceId = useLiveApiVoiceId();
    const selectedWakeWordId = useSelectedWakeWordId();
    const runtimeHaMcp = useHaMcpRuntimeStatus();
    const [currentModel, setCurrentModel] = useState(getGeminiLiveModel());
    const setGeminiLiveModelFn = setGeminiLiveModel;
    const GEMINI_LIVE_MODELS_LIST = GEMINI_LIVE_MODELS;

    const availableAnimations = useMemo(() => {
        return ROBOT_ANIMATIONS_CATALOG[faceStyleId as keyof typeof ROBOT_ANIMATIONS_CATALOG] || DEFAULT_ANIMATIONS;
    }, [faceStyleId]);

    const [selectedAnimationId, setSelectedAnimationId] = useState<number>(availableAnimations[0].id);

    // Keep selected animation ID in sync when changing face styles
    useEffect(() => {
        setSelectedAnimationId(availableAnimations[0].id);
    }, [availableAnimations]);

    const handleAnimationPreview = (id: number) => {
        window.dispatchEvent(new CustomEvent('curio:preview-animation', {
            detail: { action: 'special', id }
        }));
    };
    const selectedWakeWord = useMemo(
        () => getWakeWordDefinition(selectedWakeWordId),
        [selectedWakeWordId]
    );

    const [localApiKey, setLocalApiKey] = useState(apiKey);
    const [localHaUrl, setLocalHaUrl] = useState(haMcpUrl);
    const [localHaToken, setLocalHaToken] = useState(haMcpToken);
    const [showApiKey, setShowApiKey] = useState(false);
    const [showGoogleApiKey, setShowGoogleApiKey] = useState(false);
    const [localGoogleApiKey, setLocalGoogleApiKey] = useState(googleApiKey);
    const [showHaToken, setShowHaToken] = useState(false);
    const [localUserName, setLocalUserName] = useState(userName);
    const [localHomeLocation, setLocalHomeLocation] = useState(homeLocation);
    const [localWorkLocation, setLocalWorkLocation] = useState(workLocation);
    const [mcpStatus, setMcpStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
    const [mcpError, setMcpError] = useState<string | null>(null);
    const [cityQuery, setCityQuery] = useState(() => localStorage.getItem('curio-city-query') || weatherCity);
    const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
    const [homeSuggestions, setHomeSuggestions] = useState<string[]>([]);
    const [workSuggestions, setWorkSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showHomeSuggestions, setShowHomeSuggestions] = useState(false);
    const [showWorkSuggestions, setShowWorkSuggestions] = useState(false);
    const [cityInputFocused, setCityInputFocused] = useState(false);
    const [homeInputFocused, setHomeInputFocused] = useState(false);
    const [workInputFocused, setWorkInputFocused] = useState(false);
    const [, setShowHaDetails] = useState(false);
    const [pickerStatus, setPickerStatus] = useState<'idle' | 'opening' | 'waiting' | 'done' | 'error'>('idle');
    const [pickerPhotoCount, setPickerPhotoCount] = useState(0);
    const [offlineImageCount, setOfflineImageCount] = useState(0);
    const [offlineUploading, setOfflineUploading] = useState(false);
    const offlineFileInputRef = useRef<HTMLInputElement>(null);
    const blurTimerRef = useRef<number | null>(null);
    const skipNextSuggestionsRef = useRef(false);
    const hasUnsavedHaConfig = localHaUrl !== haMcpUrl || localHaToken !== haMcpToken;
    const iosStandalonePwa = useMemo(() => isIOSStandalonePwa(), []);

    const finalizeGooglePickerSelection = useCallback(async (sessionId: string) => {
        const { listPickerMediaItems } = await import('../../services/googlePhotosPickerAPI');
        const items = await listPickerMediaItems(googleAccessToken, sessionId);
        const urls = items.map((item) => item.mediaFile.baseUrl);

        localStorage.removeItem(PENDING_GOOGLE_PICKER_SESSION_KEY);
        setGoogleSelectedAlbumId('picker');
        setPickerPhotoCount(urls.length);
        setPickerPhotoUrls(urls, sessionId);
        setPickerStatus('done');
    }, [googleAccessToken, setGoogleSelectedAlbumId]);

    const recoverPendingGooglePickerSelection = useCallback(async () => {
        if (!googleAccessToken) {
            return false;
        }

        const sessionId = localStorage.getItem(PENDING_GOOGLE_PICKER_SESSION_KEY) || '';
        if (!sessionId) {
            return false;
        }

        try {
            const { getPickerSession } = await import('../../services/googlePhotosPickerAPI');
            const session = await getPickerSession(googleAccessToken, sessionId);
            if (!session.mediaItemsSet) {
                if (iosStandalonePwa && !document.hidden) {
                    localStorage.removeItem(PENDING_GOOGLE_PICKER_SESSION_KEY);
                    setPickerStatus('idle');
                }
                return false;
            }

            await finalizeGooglePickerSelection(sessionId);
            return true;
        } catch (error) {
            console.warn('[Picker] Failed to recover pending session:', error);
            return false;
        }
    }, [finalizeGooglePickerSelection, googleAccessToken, iosStandalonePwa]);

    const handleGooglePhotosSignIn = useCallback(async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/photospicker.mediaitems.readonly');
            provider.setCustomParameters({ prompt: 'consent' });

            if (iosStandalonePwa) {
                await signInWithRedirect(auth, provider);
                return;
            }

            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential?.accessToken) {
                setGoogleAccessToken(credential.accessToken);
            }
        } catch (error) {
            console.error('[Google Photos] Sign-in failed:', error);
        }
    }, [iosStandalonePwa, setGoogleAccessToken]);

    const handleGooglePickerLaunch = useCallback(() => {
        const pickerWindow = window.open('about:blank', '_blank', iosStandalonePwa ? undefined : 'width=1000,height=700');
        if (!pickerWindow) {
            setPickerStatus('error');
            return;
        }

        pickerWindow.document.write(`
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f8fafc; color: #64748b;">
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #1e293b;">Opening Google Photos...</div>
                <div style="font-size: 14px;">Preparing your selection session. Just a moment!</div>
            </div>
        `);

        void (async () => {
            try {
                setPickerStatus('opening');
                const { createPickerSession, pollPickerSession } = await import('../../services/googlePhotosPickerAPI');
                const session = await createPickerSession(googleAccessToken);
                localStorage.setItem(PENDING_GOOGLE_PICKER_SESSION_KEY, session.id);
                pickerWindow.location.replace(session.pickerUri);
                setPickerStatus('waiting');

                try {
                    const done = await pollPickerSession(googleAccessToken, session.id);
                    if (done.mediaItemsSet) {
                        await finalizeGooglePickerSelection(session.id);
                    }
                } catch (error) {
                    if (!iosStandalonePwa) {
                        throw error;
                    }
                    console.warn('[Picker] Waiting for iOS PWA session recovery after returning to Curio.', error);
                }
            } catch (error) {
                console.error('[Picker] Error:', error);
                localStorage.removeItem(PENDING_GOOGLE_PICKER_SESSION_KEY);
                setPickerStatus('error');
            } finally {
                try {
                    pickerWindow.close();
                } catch {
                    // Ignore close errors for cross-origin popup contexts.
                }
            }
        })();
    }, [finalizeGooglePickerSelection, googleAccessToken, iosStandalonePwa]);

    const checkMcpConnection = useCallback(async (url: string, token: string) => {
        if (!url || !token) {
            setMcpStatus('idle');
            setMcpError(null);
            return;
        }

        setMcpStatus('checking');
        setMcpError(null);

        try {
            const { HomeAssistantMCPClient } = await import('../../services/haMcpService');
            const client = new HomeAssistantMCPClient(url, token);
            const tools = await client.getTools();

            if (tools && tools.length > 0) {
                setMcpStatus('connected');
                setMcpError(null);
            } else {
                setMcpStatus('error');
                setMcpError('No tools returned. Check your configuration.');
            }
        } catch (error: any) {
            console.error('[HA MCP] Status check failed:', error);
            setMcpStatus('error');
            setMcpError(error.message || 'Connection failed');
        }
    }, []);

    useEffect(() => {
        if (!open) {
            if (blurTimerRef.current !== null) {
                window.clearTimeout(blurTimerRef.current);
                blurTimerRef.current = null;
            }
            return;
        }

        setLocalApiKey(apiKey);
        // Decrypt secrets asynchronously when modal opens
        getSecret('curio_ha_mcp_token').then(v => { if (v) setLocalHaToken(v); });
        getSecret('curio_google_api_key').then(v => { setLocalGoogleApiKey(v || ''); });
        setLocalHaUrl(haMcpUrl);
        setLocalHaToken(haMcpToken);
        setLocalUserName(userName);
        setLocalHomeLocation(homeLocation);
        setLocalWorkLocation(workLocation);
        setMcpStatus(runtimeHaMcp.status);
        setMcpError(runtimeHaMcp.error);
        setShowHaDetails(false);
        setCityInputFocused(false);
        setShowSuggestions(false);
        setCitySuggestions([]);
        setCityQuery(localStorage.getItem('curio-city-query') || weatherCity);
        // Initialise picker count from persisted URLs (sync — no await needed)
        setPickerPhotoCount(getPickerPhotoUrls().length);
        // Load offline image count
        void import('../../services/offlineImageStore').then(({ getOfflineImageCount }) =>
            getOfflineImageCount().then(setOfflineImageCount)
        ).catch(() => setOfflineImageCount(0));
    }, [open, apiKey, haMcpToken, haMcpUrl, runtimeHaMcp.error, runtimeHaMcp.status, weatherCity]);

    useEffect(() => {
        if (!open) {
            return;
        }

        let cancelled = false;

        void (async () => {
            try {
                const result = await getRedirectResult(auth);
                if (cancelled || !result) {
                    return;
                }

                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential?.accessToken) {
                    setGoogleAccessToken(credential.accessToken);
                }
            } catch (error) {
                console.error('[Google Photos] Redirect result failed:', error);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [open, setGoogleAccessToken]);

    useEffect(() => {
        if (!open || !googleAccessToken) {
            return;
        }

        const handleReturnToApp = () => {
            if (document.hidden) {
                return;
            }

            void recoverPendingGooglePickerSelection();
        };

        void recoverPendingGooglePickerSelection();
        document.addEventListener('visibilitychange', handleReturnToApp);
        window.addEventListener('focus', handleReturnToApp);
        window.addEventListener('pageshow', handleReturnToApp);

        return () => {
            document.removeEventListener('visibilitychange', handleReturnToApp);
            window.removeEventListener('focus', handleReturnToApp);
            window.removeEventListener('pageshow', handleReturnToApp);
        };
    }, [googleAccessToken, open, recoverPendingGooglePickerSelection]);


    useEffect(() => {
        if (!open || hasUnsavedHaConfig) {
            return;
        }

        setMcpStatus(runtimeHaMcp.status);
        setMcpError(runtimeHaMcp.error);
    }, [hasUnsavedHaConfig, open, runtimeHaMcp.error, runtimeHaMcp.status]);

    useEffect(() => {
        if (!open || !hasUnsavedHaConfig) {
            return;
        }

        setMcpStatus('idle');
        setMcpError(null);
    }, [hasUnsavedHaConfig, open]);

    useEffect(() => {
        if (!open) {
            return;
        }
        localStorage.setItem('curio-city-query', cityQuery);
    }, [cityQuery, open]);

    useEffect(() => {
        if (!open || !cityInputFocused || !cityQuery || cityQuery.length < 2) {
            setCitySuggestions([]);
            return;
        }

        if (skipNextSuggestionsRef.current) {
            skipNextSuggestionsRef.current = false;
            setCitySuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const controller = new AbortController();
        const timer = window.setTimeout(() => {
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery.split(',')[0].trim())}&count=5&language=en&format=json`, { signal: controller.signal })
                .then((response) => {
                    if (!response.ok) throw new Error('City lookup failed');
                    return response.json();
                })
                .then((data) => {
                    if (!Array.isArray(data.results)) {
                        setCitySuggestions([]);
                        return;
                    }

                    setCitySuggestions(
                        data.results.map((item: any) => ({
                            name: item.name,
                            country: item.country_code || item.country || '',
                            state: item.admin1,
                            lat: item.latitude,
                            lon: item.longitude,
                        }))
                    );
                    setShowSuggestions(true);
                })
                .catch((e) => { if (e.name !== 'AbortError') setCitySuggestions([]); });
        }, 400);

        return () => { window.clearTimeout(timer); controller.abort(); };
    }, [cityInputFocused, cityQuery, open]);

    // Home Address Search
    useEffect(() => {
        if (!open || !homeInputFocused || !localHomeLocation || localHomeLocation.length < 3) {
            setHomeSuggestions([]);
            setShowHomeSuggestions(false);
            return;
        }

        const controller = new AbortController();
        const timer = setTimeout(() => {
            fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(localHomeLocation)}&limit=5`, { signal: controller.signal })
                .then(r => r.json())
                .then(data => {
                    if (data.features) {
                        const results = data.features.map((f: any) => {
                            const p = f.properties;
                            const parts = [];
                            if (p.name && p.name !== p.street) parts.push(p.name);
                            if (p.street) parts.push(p.housenumber ? `${p.street} ${p.housenumber}` : p.street);
                            if (p.city) parts.push(p.city);
                            if (p.state) parts.push(p.state);
                            if (p.country) parts.push(p.country);
                            return parts.join(', ');
                        });
                        setHomeSuggestions(results);
                        setShowHomeSuggestions(results.length > 0);
                    }
                })
                .catch(() => setHomeSuggestions([]));
        }, 400);
        return () => { clearTimeout(timer); controller.abort(); };
    }, [localHomeLocation, homeInputFocused, open]);

    // Work Address Search
    useEffect(() => {
        if (!open || !workInputFocused || !localWorkLocation || localWorkLocation.length < 3) {
            setWorkSuggestions([]);
            setShowWorkSuggestions(false);
            return;
        }

        const controller = new AbortController();
        const timer = setTimeout(() => {
            fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(localWorkLocation)}&limit=5`, { signal: controller.signal })
                .then(r => r.json())
                .then(data => {
                    if (data.features) {
                        const results = data.features.map((f: any) => {
                            const p = f.properties;
                            const parts = [];
                            if (p.name && p.name !== p.street) parts.push(p.name);
                            if (p.street) parts.push(p.housenumber ? `${p.street} ${p.housenumber}` : p.street);
                            if (p.city) parts.push(p.city);
                            if (p.state) parts.push(p.state);
                            if (p.country) parts.push(p.country);
                            return parts.join(', ');
                        });
                        setWorkSuggestions(results);
                        setShowWorkSuggestions(results.length > 0);
                    }
                })
                .catch(() => setWorkSuggestions([]));
        }, 400);
        return () => { clearTimeout(timer); controller.abort(); };
    }, [localWorkLocation, workInputFocused, open]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleSave = useCallback(async () => {
        if (localApiKey !== apiKey) await setApiKey(localApiKey);
        if (localGoogleApiKey !== googleApiKey) await setGoogleApiKey(localGoogleApiKey);
        if (localHaUrl !== haMcpUrl) setHaMcpUrl(localHaUrl);
        if (localHaToken !== haMcpToken) await setHaMcpToken(localHaToken);
        if (localUserName !== userName) setUserName(localUserName);
        if (localHomeLocation !== homeLocation) setHomeLocation(localHomeLocation);
        if (localWorkLocation !== workLocation) setWorkLocation(localWorkLocation);
        handleClose();
    }, [apiKey, googleApiKey, haMcpToken, haMcpUrl, handleClose, localApiKey, localGoogleApiKey, localHaToken, localHaUrl, setGoogleApiKey, localUserName, userName, setUserName, localHomeLocation, homeLocation, setHomeLocation, localWorkLocation, workLocation, setWorkLocation]);

    const handleCityInputBlur = useCallback(() => {
        setCityInputFocused(false);
        blurTimerRef.current = window.setTimeout(() => {
            setShowSuggestions(false);
        }, 250);
    }, []);

    const handleCitySuggestionSelect = useCallback((suggestion: CitySuggestion) => {
        const label = suggestion.state
            ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
            : `${suggestion.name}, ${suggestion.country}`;

        // Prevent the search effect from re-triggering on the new value
        skipNextSuggestionsRef.current = true;
        setCitySuggestions([]);
        setShowSuggestions(false);
        setCityInputFocused(false);
        // Set city query and persist — use setTimeout to ensure skip flag is read first
        setCityQuery(label);
        setWeatherCity(label);
        localStorage.setItem('curio-city-query', label);
    }, [setWeatherCity]);

    const handleHandsFreeToggle = useCallback(async () => {
        const newState = !wakeWordEnabled;
        setWakeWordEnabled(newState);

        if (!newState) {
            releaseWakeWordRuntime();
            return;
        }

        try {
            // Only request mic permission — hands-free mode doesn't need the camera
            if (navigator.mediaDevices?.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(t => t.stop());
            }
            await unlockAudio();
            await prepareWakeWordAudio();
            await preloadWakeWordModel({ wakeWordId: selectedWakeWord.id });
        } catch (wakeWordError) {
            console.error('[CurioSettingsModal] Failed to prepare wake word audio:', wakeWordError);
        }
    }, [selectedWakeWord.id, setWakeWordEnabled, unlockAudio, wakeWordEnabled]);

    const handleHaOAuth = useCallback(() => {
        if (!localHaUrl) {
            return;
        }

        void import('../../utils/haAuthUtils').then(({ loginToHomeAssistant }) => {
            loginToHomeAssistant(localHaUrl);
        });
    }, [localHaUrl]);

    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4"
            onClick={handleClose}
        >
            <div
                className="flex max-h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
                style={{ touchAction: 'pan-y' }}
            >
                <div className="flex-shrink-0 bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-4 text-white">
                    <h3 className="text-lg font-bold">Curio Settings</h3>
                    <p className="text-xs opacity-90">Customize your AI agent companion</p>
                </div>

                <div
                    className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-5 -webkit-overflow-scrolling-touch"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {/* ── General ── */}
                    <SettingsSection title="General" icon="⚙️" defaultOpen={true}>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><User size={14} className="text-sky-500" /> Your Name</label>
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-all focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
                                <input
                                    type="text"
                                    placeholder="What should Curio call you?"
                                    className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                                    value={localUserName}
                                    onChange={(event) => setLocalUserName(event.target.value)}
                                    onBlur={() => { if (localUserName !== userName) setUserName(localUserName); }}
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                        <SettingsToggle label="Dark Mode" description="Toggle between light and dark themes" enabled={themeMode === 'dark'} onToggle={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} color="bg-slate-800" />

                        <SettingsToggle label="Subtitles" description="Show live transcripts on screen" enabled={subtitlesEnabled} onToggle={() => setSubtitlesEnabled(!subtitlesEnabled)} />
                        <SettingsToggle label="Response Cards" description="Show visual pop-ups for AI responses" enabled={responseCardsEnabled} onToggle={() => setResponseCardsEnabled(!responseCardsEnabled)} color="bg-violet-500" />
                        <div className="flex items-center justify-between gap-4 pt-1">
                            <div className="flex flex-col">
                                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Thermometer size={14} className="text-orange-500" /> Temperature Unit</span>
                                <span className="text-[10px] text-slate-400 italic">{tempUnit === 'F' ? 'Fahrenheit' : 'Celsius'}</span>
                            </div>
                            <button onClick={() => setTempUnit(tempUnit === 'F' ? 'C' : 'F')} className="rounded-xl bg-slate-200 px-4 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-300 active:scale-95">
                                {tempUnit === 'F' ? 'F → C' : 'C → F'}
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-50 bg-red-50/30 p-3 mt-1">
                            <div className="flex flex-col">
                                <span className="flex items-center gap-1.5 text-sm font-semibold text-red-700"><RotateCcw size={14} /> Reset Conversation</span>
                                <span className="text-[10px] text-red-400 italic">Clear history and start fresh</span>
                            </div>
                            <button onClick={() => { if (window.confirm("Clear conversation history?")) resetSession(); }} className="rounded-xl bg-red-100 px-4 py-1.5 text-sm font-bold text-red-700 shadow-sm transition-all hover:bg-red-200 active:scale-95">Reset</button>
                        </div>
                    </SettingsSection>

                    {/* Homescreen */}
                    <SettingsSection title="Homescreen" icon="🖥️">
                        <div className="space-y-5">

                            {/* Clock */}
                            <div className="space-y-2.5 rounded-xl bg-slate-50/60 p-3">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"><Clock size={12} className="text-sky-400" /> Clock</span>
                                </div>
                                <SettingsToggle label="Show Clock" description="Display the time widget on homescreen" enabled={showClockWidget} onToggle={() => setShowClockWidget(!showClockWidget)} color="bg-sky-500" />
                                {showClockWidget && (
                                    <>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><Maximize size={13} className="text-slate-400" /> Size</span>
                                                <span className="text-xs font-bold text-slate-500 tabular-nums">{clockWidgetScale}%</span>
                                            </div>
                                            <input type="range" min="50" max="150" step="5" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500" value={clockWidgetScale} onChange={(e) => setClockWidgetScale(parseInt(e.target.value, 10))} />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><MapPin size={13} className="text-slate-400" /> Position</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((p) => (
                                                    <button key={p} onClick={() => setClockWidgetPosition(p)} className={`rounded-xl px-3 py-2 text-xs font-bold capitalize transition-all active:scale-95 ${clockWidgetPosition === p ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p.replace('-', ' ')}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Weather / AQI */}
                            <div className="space-y-2.5 rounded-xl bg-slate-50/60 p-3">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"><CloudRain size={12} className="text-cyan-400" /> Weather / AQI</span>
                                </div>
                                <SettingsToggle label="Show Weather" description="Display weather and air quality widget" enabled={showWeatherWidget} onToggle={() => setShowWeatherWidget(!showWeatherWidget)} color="bg-sky-500" />
                                {showWeatherWidget && (
                                    <>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><Maximize size={13} className="text-slate-400" /> Size</span>
                                                <span className="text-xs font-bold text-slate-500 tabular-nums">{weatherWidgetScale}%</span>
                                            </div>
                                            <input type="range" min="50" max="150" step="5" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500" value={weatherWidgetScale} onChange={(e) => setWeatherWidgetScale(parseInt(e.target.value, 10))} />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><MapPin size={13} className="text-slate-400" /> Position</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((p) => (
                                                    <button key={p} onClick={() => setWeatherWidgetPosition(p)} className={`rounded-xl px-3 py-2 text-xs font-bold capitalize transition-all active:scale-95 ${weatherWidgetPosition === p ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p.replace('-', ' ')}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Idle Prompt */}
                            <div className="space-y-2.5 rounded-xl bg-slate-50/60 p-3">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"><MessageCircle size={12} className="text-violet-400" /> Idle Prompt</span>
                                </div>
                                <SettingsToggle label="Show Idle Prompt" description="Display wake word hints on screen" enabled={showIdlePrompt} onToggle={() => setShowIdlePrompt(!showIdlePrompt)} color="bg-sky-500" />
                                {showIdlePrompt && (
                                    <>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><Maximize size={13} className="text-slate-400" /> Size</span>
                                                <span className="text-xs font-bold text-slate-500 tabular-nums">{idlePromptScale}%</span>
                                            </div>
                                            <input type="range" min="50" max="150" step="5" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500" value={idlePromptScale} onChange={(e) => setIdlePromptScale(parseInt(e.target.value, 10))} />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><MapPin size={13} className="text-slate-400" /> Position</span>
                                            <div className="flex gap-2">
                                                {(['top', 'bottom'] as const).map((p) => (
                                                    <button key={p} onClick={() => setIdlePromptPosition(p)} className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold capitalize transition-all active:scale-95 ${idlePromptPosition === p ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Connect Button */}
                            <div className="space-y-2.5 rounded-xl bg-slate-50/60 p-3">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"><Power size={12} className="text-emerald-400" /> Connect Button</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><Maximize size={13} className="text-slate-400" /> Size</span>
                                        <span className="text-xs font-bold text-slate-500 tabular-nums">{connectButtonScale}%</span>
                                    </div>
                                    <input type="range" min="50" max="150" step="5" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500" value={connectButtonScale} onChange={(e) => setConnectButtonScale(parseInt(e.target.value, 10))} />
                                </div>
                                <div className="space-y-1">
                                    <span className="flex items-center gap-1 text-sm font-semibold text-slate-700"><MapPin size={13} className="text-slate-400" /> Position</span>
                                    <div className="flex gap-2">
                                        {(['top', 'bottom'] as const).map((p) => (
                                            <button key={p} onClick={() => setConnectButtonPosition(p)} className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold capitalize transition-all active:scale-95 ${connectButtonPosition === p ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SettingsSection>

                    {/* ── Robot ── */}
                    <SettingsSection title="Robot" icon="🤖">
                        <div className="space-y-4">
                            {/* Face Style */}
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Sparkles size={14} className="text-indigo-500" /> Face Style</span>
                                    <span className="text-[10px] text-slate-400 italic">Choose Curio's look</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {FACE_STYLES.map((f) => (
                                        <button
                                            key={f.id}
                                            onClick={() => setFaceStyleId(f.id)}
                                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all active:scale-95 ${faceStyleId === f.id ? 'bg-indigo-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                        >
                                            <span>{f.emoji}</span>
                                            <span>{f.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Face Size */}
                            <div className="space-y-2.5 rounded-xl bg-slate-50/60 p-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex flex-col">
                                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Maximize size={14} className="text-indigo-500" /> Face Size</span>
                                        <span className="text-[10px] text-slate-400 italic">Resize the robot face to fit this screen</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setRobotFaceScale(DEFAULT_ROBOT_FACE_SCALE)}
                                        disabled={robotFaceScale === DEFAULT_ROBOT_FACE_SCALE}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-100 disabled:cursor-default disabled:opacity-50 active:scale-95"
                                    >
                                        <RotateCcw size={12} />
                                        Reset
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-slate-700">Scale</span>
                                        <span className="text-xs font-bold text-slate-500 tabular-nums">{robotFaceScale}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="150"
                                        step="5"
                                        className="w-full h-1.5 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-500"
                                        value={robotFaceScale}
                                        onChange={(e) => setRobotFaceScale(parseInt(e.target.value, 10))}
                                    />
                                </div>
                            </div>

                            {/* Robot Color Theme */}
                            <RobotColorThemeSection
                                robotColorThemeId={robotColorThemeId}
                                customRobotColor={customRobotColor}
                                setRobotColorThemeId={setRobotColorThemeId}
                                setCustomRobotColor={setCustomRobotColor}
                            />
                            {/*
                                        <button
                                            key={theme.id}
                                            onClick={() => {
                                                const selectedTheme = ROBOT_COLOR_THEMES.find(t => t.id === theme.id);
                                                if (selectedTheme && typeof document !== 'undefined') {
                                                    const root = document.documentElement;
                                                    root.style.setProperty('--robot-accent', selectedTheme.accent);
                                                    root.style.setProperty('--robot-eye-arc', selectedTheme.eyeArc);
                                                    root.style.setProperty('--robot-eye-rim-outer', selectedTheme.eyeRimOuter);
                                                }
                                                startTransition(() => {
                                                    setRobotColorThemeId(theme.id);
                                                });
                                            }}
                                            className={`group relative flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all active:scale-90 ${robotColorThemeId === theme.id ? 'scale-110 border-slate-400 shadow-md' : 'border-transparent hover:border-slate-200 hover:bg-slate-50'}`}
                                            title={theme.label}
                                        >
                                            <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: theme.accent }} />
                                            {robotColorThemeId === theme.id && (
                                                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[8px] text-white shadow-sm">✓</div>
                                            )}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => {
                                            startTransition(() => {
                                                setRobotColorThemeId('custom');
                                            });
                                        }}
                                        className={`group relative flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all active:scale-90 ${robotColorThemeId === 'custom' ? 'scale-110 border-slate-400 shadow-md' : 'border-transparent hover:border-slate-200 hover:bg-slate-50'}`}
                                        title="Custom Color"
                                    >
                                        <div 
                                            className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200" 
                                            style={{ backgroundColor: robotColorThemeId === 'custom' ? localCustomColor : '#f1f5f9' }}
                                        >
                                            <Palette size={14} className={robotColorThemeId === 'custom' ? 'text-white drop-shadow-sm' : 'text-slate-400'} />
                                        </div>
                                        {robotColorThemeId === 'custom' && (
                                            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[8px] text-white shadow-sm">✓</div>
                                        )}
                                    </button>
                                </div>

                                {robotColorThemeId === 'custom' && (
                                    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="flex flex-col flex-1">
                                            <span className="text-xs font-bold text-slate-600">Custom Accent</span>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider tabular-nums">{localCustomColor}</span>
                                        </div>
                                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-sm transition-transform hover:scale-105 active:scale-95">
                                            <input
                                                type="color"
                                                value={localCustomColor}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setLocalCustomColor(val);
                                                    // Instant CSS update for buttery-smooth dragging
                                                    if (typeof document !== 'undefined' && robotColorThemeId === 'custom') {
                                                        const root = document.documentElement;
                                                        root.style.setProperty('--robot-accent', val);
                                                        root.style.setProperty('--robot-eye-arc', val);
                                                        root.style.setProperty('--robot-eye-rim-outer', val);
                                                    }
                                                }}
                                                className="absolute inset-0 h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-none opacity-100"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            */}

                            {/* Special Effects & Preview */}
                            <div className="space-y-3 rounded-xl bg-slate-50/60 p-3 pt-4 border border-slate-100">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"><Sparkles size={12} className="text-indigo-400" /> Special Effects</span>
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">Animation Preview</label>
                                        <div className="flex gap-2">
                                            <select 
                                                className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                                value={selectedAnimationId}
                                                onChange={(e) => setSelectedAnimationId(parseInt(e.target.value, 10))}
                                            >
                                                {availableAnimations.map((anim) => (
                                                    <option key={anim.id} value={anim.id}>{anim.label}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleAnimationPreview(selectedAnimationId)}
                                                className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-sm transition-all hover:bg-indigo-600 active:scale-95"
                                                title="Play Animation"
                                            >
                                                <Play size={18} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/50 mt-1 pt-3">
                                        <button onClick={() => window.dispatchEvent(new CustomEvent('curio:preview-animation', { detail: { action: 'nod' } }))} className="flex flex-col items-center gap-1 rounded-lg bg-white border border-slate-100 py-2 text-[10px] font-bold text-slate-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
                                            <ArrowUpDown size={14} className="text-indigo-400" /> Nod
                                        </button>
                                        <button onClick={() => window.dispatchEvent(new CustomEvent('curio:preview-animation', { detail: { action: 'bob' } }))} className="flex flex-col items-center gap-1 rounded-lg bg-white border border-slate-100 py-2 text-[10px] font-bold text-slate-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
                                            <Maximize size={14} className="text-indigo-400" /> Bob
                                        </button>
                                        <button onClick={() => window.dispatchEvent(new CustomEvent('curio:preview-animation', { detail: { action: 'blink' } }))} className="flex flex-col items-center gap-1 rounded-lg bg-white border border-slate-100 py-2 text-[10px] font-bold text-slate-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
                                            <Eye size={14} className="text-indigo-400" /> Blink
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-3 pt-1">
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><Mic size={14} className="text-rose-500" /> Robot Voice</label>
                                    <select className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100" value={liveApiVoiceId} onChange={(e) => setLiveApiVoiceId(e.target.value)}>
                                        {GEMINI_LIVE_VOICES.map((voice) => (<option key={voice.id} value={voice.id}>{voice.name} ({voice.style})</option>))}
                                    </select>
                                </div>
                                <SettingsToggle label="Face Tracking" description="Robot eyes follow your face (higher CPU)" enabled={faceTrackingEnabled} onToggle={() => setFaceTrackingEnabled(!faceTrackingEnabled)} color="bg-cyan-500" />
                            </div>
                        </div>
                    </SettingsSection>

                    {/* ── AI Personality ── */}
                    <SettingsSection title="AI Personality" icon="🎭">
                        <PersonalitySelector />
                    </SettingsSection>

                    {/* ── Voice & AI ── */}
                    <SettingsSection title="Voice & AI" icon="🎙️">
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><Brain size={14} className="text-indigo-500" /> AI Model</label>
                            <select className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" value={currentModel} onChange={(e) => { setGeminiLiveModelFn(e.target.value); setCurrentModel(e.target.value); }}>
                                {GEMINI_LIVE_MODELS_LIST.map((m) => (<option key={m.id} value={m.id}>{m.name} — {m.description}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><AudioWaveform size={14} className="text-teal-500" /> Wake Word</label>
                            <select className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" value={selectedWakeWordId} onChange={(e) => setSelectedWakeWordId(e.target.value)}>
                                {getAvailableWakeWords().map((ww) => (<option key={ww.id} value={ww.id}>{ww.label}</option>))}
                            </select>
                        </div>
                        <SettingsToggle label="Offline Mode" description="Direct-action mode (No AI connection)" enabled={offlineModeEnabled} onToggle={() => setOfflineModeEnabled(!offlineModeEnabled)} color="bg-rose-500" />
                        <SettingsToggle label="Hands-Free Mode" description={`Auto "${selectedWakeWord.phrase}" (High CPU)`} enabled={wakeWordEnabled} onToggle={handleHandsFreeToggle} />
                        <SettingsToggle label="Echo Ducking" description="Reduces mic volume while AI speaks" enabled={muteMicWhileAiSpeaking} onToggle={() => setMuteMicWhileAiSpeaking(!muteMicWhileAiSpeaking)} color="bg-indigo-500" />
                    </SettingsSection>

                    {/* ── Performance ── */}
                    <SettingsSection title="Performance" icon="⚡">
                        <SettingsToggle label="Low Power Mode" description="Optimizes for weak devices" enabled={lowPowerMode} onToggle={() => setLowPowerMode(!lowPowerMode)} color="bg-amber-500" />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-slate-700">Idle Sleep Timer</span>
                                <div className="flex items-center gap-1">
                                    <input type="number" min="10" max="600" className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-bold text-slate-700 outline-none focus:border-cyan-400" value={idleSleepTimeout} onChange={(e) => setIdleSleepTimeout(parseInt(e.target.value, 10) || 120)} onKeyDown={(e) => e.stopPropagation()} />
                                    <span className="text-[10px] font-bold text-slate-400">sec</span>
                                </div>
                            </div>
                            <input type="range" min="10" max="600" step="10" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500" value={idleSleepTimeout} onChange={(e) => setIdleSleepTimeout(parseInt(e.target.value, 10))} />
                        </div>
                    </SettingsSection>

                    {/* ── Card Types ── */}
                    <SettingsSection title="Card Types" icon="🃏">
                        <p className="text-[11px] text-slate-400 mb-2">Choose which card types Curio can show. Disabled cards won't appear even when triggered.</p>
                        <Suspense fallback={<p className="text-xs text-slate-400">Loading...</p>}>
                            <CardTogglesSection />
                        </Suspense>
                    </SettingsSection>

                    {/* ── Weather ── */}
                    <SettingsSection title="Weather & Location" icon="🌤️">
                        <div className="relative">
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-all focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
                                <span className="text-sm">City</span>
                                <input
                                    type="text"
                                    placeholder="City (empty = auto-detect)"
                                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                    value={cityQuery}
                                    onChange={(event) => {
                                        setCityQuery(event.target.value);
                                        if (!event.target.value) {
                                            setWeatherCity('');
                                            setCitySuggestions([]);
                                        }
                                    }}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onFocus={() => {
                                        setCityInputFocused(true);
                                        if (citySuggestions.length > 0) {
                                            setShowSuggestions(true);
                                        }
                                    }}
                                    onBlur={handleCityInputBlur}
                                />
                                {cityQuery && (
                                    <button
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setCityQuery('');
                                            setWeatherCity('');
                                            setCitySuggestions([]);
                                            setShowSuggestions(false);
                                        }}
                                        className="text-xs font-bold text-slate-400 hover:text-slate-600"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            {showSuggestions && citySuggestions.length > 0 && (
                                <div className="absolute left-0 right-0 top-full z-[110] mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                                    {citySuggestions.map((suggestion, index) => (
                                        <button
                                            key={`${suggestion.name}-${suggestion.country}-${index}`}
                                            onPointerDown={(event) => {
                                                event.preventDefault(); // Keeps input focus
                                                // Immediately handle suggestion selection
                                                handleCitySuggestionSelect(suggestion);
                                            }}
                                            onClick={(e) => e.preventDefault()} // Block onClick to prevent double fires
                                            className="flex w-full items-center gap-2 border-b border-slate-100 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors last:border-0 hover:bg-sky-50"
                                        >
                                            <span>{suggestion.name}{suggestion.state ? `, ${suggestion.state}` : ''}, <span className="text-slate-400">{suggestion.country}</span></span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 pt-2">
                            {/* Home Location */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 px-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">🏠 Home address</span>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-all focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
                                        <input
                                            type="text"
                                            placeholder="Home address (e.g. 123 Main St...)"
                                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                            value={localHomeLocation}
                                            onChange={(e) => setLocalHomeLocation(e.target.value)}
                                            onFocus={() => {
                                                setHomeInputFocused(true);
                                                if (homeSuggestions.length > 0) setShowHomeSuggestions(true);
                                            }}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    setHomeInputFocused(false);
                                                    setShowHomeSuggestions(false);
                                                    if (localHomeLocation !== homeLocation) setHomeLocation(localHomeLocation);
                                                }, 200);
                                            }}
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    {showHomeSuggestions && homeSuggestions.length > 0 && (
                                        <div className="absolute left-0 right-0 top-full z-[110] mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                                            {homeSuggestions.map((suggestion, index) => (
                                                <button
                                                    key={`home-${index}`}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => {
                                                        setLocalHomeLocation(suggestion);
                                                        setHomeLocation(suggestion);
                                                        setShowHomeSuggestions(false);
                                                    }}
                                                    className="flex w-full items-center gap-2 border-b border-slate-100 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors last:border-0 hover:bg-sky-50"
                                                >
                                                    <span>{suggestion}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Work Location */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 px-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">🏢 Work address</span>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-all focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
                                        <input
                                            type="text"
                                            placeholder="Work address (e.g. 456 Corporate Dr...)"
                                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                            value={localWorkLocation}
                                            onChange={(e) => setLocalWorkLocation(e.target.value)}
                                            onFocus={() => {
                                                setWorkInputFocused(true);
                                                if (workSuggestions.length > 0) setShowWorkSuggestions(true);
                                            }}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    setWorkInputFocused(false);
                                                    setShowWorkSuggestions(false);
                                                    if (localWorkLocation !== workLocation) setWorkLocation(localWorkLocation);
                                                }, 200);
                                            }}
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    {showWorkSuggestions && workSuggestions.length > 0 && (
                                        <div className="absolute left-0 right-0 top-full z-[110] mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                                            {workSuggestions.map((suggestion, index) => (
                                                <button
                                                    key={`work-${index}`}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => {
                                                        setLocalWorkLocation(suggestion);
                                                        setWorkLocation(suggestion);
                                                        setShowWorkSuggestions(false);
                                                    }}
                                                    className="flex w-full items-center gap-2 border-b border-slate-100 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors last:border-0 hover:bg-sky-50"
                                                >
                                                    <span>{suggestion}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button onClick={onRefreshWeather} className="rounded-xl bg-slate-200 px-4 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-300 active:scale-95">
                                Refresh Weather
                            </button>
                        </div>
                    </SettingsSection>

                    {/* ── API Keys ── */}
                    <SettingsSection title="API Keys" icon="🔑">
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><Sparkles size={14} className="text-violet-500" /> Gemini API Key</label>
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                                <input type={showApiKey ? 'text' : 'password'} placeholder="Enter Gemini API Key..." className="w-full bg-transparent text-sm text-slate-700 outline-none" value={localApiKey} onChange={(e) => setLocalApiKey(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />
                                <button type="button" onClick={() => setShowApiKey(v => !v)} className="text-slate-400 hover:text-slate-600">
                                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><KeyRound size={14} className="text-emerald-500" /> Google API Key</label>
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                                <input type={showGoogleApiKey ? 'text' : 'password'} placeholder="Enter Google API Key..." className="w-full bg-transparent text-sm text-slate-700 outline-none" value={localGoogleApiKey} onChange={(e) => setLocalGoogleApiKey(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />
                                <button type="button" onClick={() => setShowGoogleApiKey(v => !v)} className="text-slate-400 hover:text-slate-600">
                                    {showGoogleApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <p className="px-1 text-[10px] italic text-slate-400">Powers YouTube search and Google Places. Enable YouTube Data API v3 and Places API (New) on your key.</p>
                        </div>
                    </SettingsSection>

                    {/* ── Screensaver ── */}
                    <SettingsSection title="Screensaver" icon="🖼️">
                        <SettingsToggle label="Smart Screensaver" description="Clock & Weather overlay when idle" enabled={screensaverEnabled} onToggle={() => setScreensaverEnabled(!screensaverEnabled)} color="bg-indigo-500" />
                        {screensaverEnabled && (
                            <div className="space-y-3 rounded-xl bg-slate-50/50 p-4 border border-indigo-100 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700"><Timer size={14} className="text-indigo-500" /> Screensaver Wake</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-tighter text-slate-500 italic font-medium">Activate after <span className="text-indigo-600">{screensaverTimeout}s</span> of silence</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="number"
                                            min="10"
                                            max="3600"
                                            className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-bold text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                                            value={screensaverTimeout}
                                            onChange={(e) => setScreensaverTimeout(parseInt(e.target.value, 10) || 120)}
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                        <span className="text-[10px] font-bold text-slate-400">sec</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="3600"
                                    step="30"
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    value={screensaverTimeout}
                                    onChange={(e) => setScreensaverTimeout(parseInt(e.target.value, 10))}
                                />

                                {/* Photo Source Selector */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><Image size={14} className="text-indigo-500" /> Photo Source</label>
                                    <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-slate-100 p-1">
                                        {([
                                            { id: 'unsplash' as ScreensaverSource, label: '🌄 Default' },
                                            { id: 'google' as ScreensaverSource, label: '📷 Google' },
                                            { id: 'offline' as ScreensaverSource, label: '📁 My Photos' },
                                        ]).map((src) => (
                                            <button
                                                key={src.id}
                                                onClick={() => setScreensaverSource(src.id)}
                                                className={`rounded-md px-2 py-1.5 text-[10px] font-bold transition-all ${screensaverSource === src.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                            >
                                                {src.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Google Photos section */}
                                {screensaverSource === 'google' && (
                                    <>
                                        {!googleAccessToken ? (
                                            <button
                                                onClick={handleGooglePhotosSignIn}
                                                className="w-full rounded-xl bg-blue-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-600"
                                            >
                                                {iosStandalonePwa ? 'Sign In with Google in Safari' : 'Sign In with Google (Photos)'}
                                            </button>
                                        ) : (
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-bold uppercase text-green-600">Connected to Google</label>
                                                    <button onClick={async () => {
                                                        try { await signOut(auth); } catch (e) { console.warn("Failed to sign out from Firebase:", e); }
                                                        localStorage.removeItem(PENDING_GOOGLE_PICKER_SESSION_KEY);
                                                        setGoogleAccessToken('');
                                                    }} className="text-[10px] text-red-500 underline">Disconnect</button>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><Image size={14} className="text-indigo-500" /> Screensaver Photos</label>
                                                    {iosStandalonePwa && (
                                                        <p className="text-[10px] text-slate-500 italic">On iPhone and iPad home-screen apps, Google Photos may open outside Curio. After picking photos, switch back here and Curio will finish syncing them.</p>
                                                    )}
                                                    {pickerPhotoCount > 0 && pickerStatus !== 'waiting' && (
                                                        <p className="text-[10px] text-green-600 font-semibold">✓ {pickerPhotoCount} photo{pickerPhotoCount !== 1 ? 's' : ''} selected for screensaver</p>
                                                    )}
                                                    {pickerStatus === 'waiting' && (
                                                        <p className="text-[10px] text-amber-600 animate-pulse">⏳ Waiting for you to finish selecting in Google Photos...</p>
                                                    )}
                                                    {pickerStatus === 'error' && (
                                                        <p className="text-[10px] text-red-500">Failed to load photos. Try again.</p>
                                                    )}
                                                    <button
                                                        disabled={pickerStatus === 'opening' || pickerStatus === 'waiting'}
                                                        onClick={handleGooglePickerLaunch}
                                                        className="w-full rounded-xl bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {pickerStatus === 'opening' ? 'Opening Google Photos...' :
                                                            pickerStatus === 'waiting' ? 'Waiting for selection...' :
                                                                pickerPhotoCount > 0 ? '📷 Change Screensaver Photos' :
                                                                    '📷 Choose Photos for Screensaver'}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Offline / My Photos section */}
                                {screensaverSource === 'offline' && (
                                    <div className="space-y-2">
                                        {offlineImageCount > 0 && (
                                            <p className="text-[10px] text-green-600 font-semibold">✓ {offlineImageCount} photo{offlineImageCount !== 1 ? 's' : ''} saved for screensaver</p>
                                        )}
                                        <label
                                            className={`relative flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-md ${offlineUploading ? 'cursor-not-allowed bg-emerald-400 opacity-50' : 'cursor-pointer bg-emerald-500 hover:bg-emerald-600'}`}
                                        >
                                            <input
                                                ref={offlineFileInputRef}
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                disabled={offlineUploading}
                                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                onChange={async (e) => {
                                                    const files = e.target.files;
                                                    if (!files || files.length === 0) return;
                                                    setOfflineUploading(true);
                                                    try {
                                                        const { addOfflineImages, getOfflineImageCount } = await import('../../services/offlineImageStore');
                                                        await addOfflineImages(Array.from(files));
                                                        const count = await getOfflineImageCount();
                                                        setOfflineImageCount(count);
                                                    } catch (err) {
                                                        console.error('[Offline Photos] Upload failed:', err);
                                                    } finally {
                                                        setOfflineUploading(false);
                                                        if (offlineFileInputRef.current) offlineFileInputRef.current.value = '';
                                                    }
                                                }}
                                            />
                                            <Upload size={14} />
                                            {offlineUploading ? 'Adding photos...' : offlineImageCount > 0 ? 'Add More Photos' : 'Add Photos from Device'}
                                        </label>
                                        {offlineImageCount > 0 && (
                                            <button
                                                onClick={async () => {
                                                    if (!window.confirm(`Remove all ${offlineImageCount} offline photos?`)) return;
                                                    const { clearOfflineImages } = await import('../../services/offlineImageStore');
                                                    await clearOfflineImages();
                                                    setOfflineImageCount(0);
                                                }}
                                                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2 text-[10px] font-bold text-red-600 hover:bg-red-100"
                                            >
                                                <Trash2 size={12} />
                                                Clear All Offline Photos
                                            </button>
                                        )}
                                        <p className="text-[10px] text-slate-400 italic">Photos are stored locally on this device. Works offline — no internet needed.</p>
                                    </div>
                                )}

                                {screensaverSource === 'unsplash' && (
                                    <p className="text-[10px] text-slate-400 italic">Using beautiful default nature photos. No setup needed.</p>
                                )}
                            </div>
                        )}
                    </SettingsSection>

                    {/* ── Google Tasks ── */}
                    <SettingsSection title="Google Tasks" icon="✅">
                        {!googleTasksAccessToken ? (
                            <div className="space-y-2">
                                <p className="text-[11px] text-slate-400">Connect Google Tasks to sync reminders created by Curio to your task list.</p>
                                <button
                                    onClick={async () => {
                                        try {
                                            const provider = new GoogleAuthProvider();
                                            provider.addScope('https://www.googleapis.com/auth/tasks');
                                            provider.setCustomParameters({ prompt: 'consent' });
                                            const result = await signInWithPopup(auth, provider);
                                            const credential = GoogleAuthProvider.credentialFromResult(result);
                                            if (credential && credential.accessToken) {
                                                setGoogleTasksAccessToken(credential.accessToken);
                                            }
                                        } catch (e) {
                                            console.error("Firebase Sign-in (Tasks) Failed", e);
                                        }
                                    }}
                                    className="w-full rounded-xl bg-blue-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-600"
                                >
                                    Sign In with Google (Tasks)
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold uppercase text-green-600">✓ Connected to Google Tasks</label>
                                    <button onClick={async () => {
                                        try { await signOut(auth); } catch (e) { console.warn("Failed to sign out:", e); }
                                        setGoogleTasksAccessToken('');
                                    }} className="text-[10px] text-red-500 underline">Disconnect</button>
                                </div>
                                <p className="text-[11px] text-slate-400">Reminders from Curio will automatically sync to your default Google Tasks list.</p>
                            </div>
                        )}
                    </SettingsSection>

                    {/* ── Home Assistant ── */}
                    <SettingsSection title="Home Assistant" icon="🏠">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"><Link size={14} className="text-indigo-500" /> Connection</label>
                                {haMcpEnabled && (
                                    <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5">
                                        <div className={`h-1.5 w-1.5 rounded-full ${getStatusBadgeClassName(mcpStatus)}`} />
                                        <span className={`text-[9px] font-black uppercase tracking-tight ${getStatusTextClassName(mcpStatus)}`}>
                                            {getStatusText(mcpStatus)}
                                        </span>
                                    </div>
                                )}
                                {isHomeAssistantIngress() && (
                                    <div className="flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 shadow-sm">
                                        <span className="text-[9px] font-black uppercase tracking-tight text-sky-600">Add-on Mode</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={isHomeAssistantIngress()}
                                    onClick={() => {
                                        setHaMcpEnabled(!haMcpEnabled);
                                        if (haMcpEnabled) {
                                            setShowHaDetails(false);
                                            setMcpStatus('idle');
                                            setMcpError(null);
                                        }
                                    }}
                                    className={`relative h-6 w-11 shrink-0 rounded-full shadow-sm transition-all duration-300 active:scale-95 ${haMcpEnabled ? 'bg-indigo-500' : 'bg-slate-300'} ${isHomeAssistantIngress() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${haMcpEnabled ? 'left-5.5' : 'left-0.5'}`} />
                                </button>
                            </div>
                        </div>
                        {haMcpEnabled && (
                            <div
                                className="space-y-3 overflow-hidden"
                                style={{ contentVisibility: 'auto', containIntrinsicSize: '260px' }}
                            >
                                {isHomeAssistantIngress() && (
                                    <div className="mt-1 flex items-center gap-2.5 rounded-xl border border-sky-100 bg-sky-50/50 p-3 italic">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                                            <Shield size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-bold text-sky-800">Auto-Configured</p>
                                            <p className="text-[10px] text-sky-600">Running inside Home Assistant. Connection is established automatically via Supervisor Ingress.</p>
                                        </div>
                                    </div>
                                )}
                                {!isHomeAssistantIngress() && (
                                    <div className="flex gap-2 rounded-lg bg-slate-100 p-1">
                                        <button
                                            onClick={() => { setHaMcpAuthMode('oauth'); }}
                                            className={`flex-1 rounded-md px-2 py-1.5 text-[10px] font-bold transition-all ${haMcpAuthMode === 'oauth' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            OAuth Login
                                        </button>
                                        <button
                                            onClick={() => { setHaMcpAuthMode('token'); }}
                                            className={`flex-1 rounded-md px-2 py-1.5 text-[10px] font-bold transition-all ${haMcpAuthMode === 'token' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Access Token
                                        </button>
                                    </div>
                                )}

                                {mcpStatus === 'error' && mcpError && (
                                    <div className="mx-1 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-2">
                                        <span className="mt-0.5 text-xs">!</span>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold leading-tight text-red-700">Connection Failed</p>
                                            <p className="mt-0.5 text-[9px] leading-tight text-red-600">{mcpError}</p>
                                        </div>
                                        <button
                                            onClick={() => void checkMcpConnection(localHaUrl, localHaToken)}
                                            className="text-[9px] font-black uppercase text-red-700 hover:text-red-800 hover:underline"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}

                                {localHaUrl && (haMcpAuthMode === 'oauth' || localHaToken) && (
                                    <button
                                        onClick={() => void checkMcpConnection(localHaUrl, localHaToken)}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 py-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 transition-colors hover:bg-indigo-100 active:scale-95"
                                    >
                                        <div className={`h-1.5 w-1.5 rounded-full ${getStatusBadgeClassName(mcpStatus)}`} />
                                        Check Connection
                                    </button>
                                )}

                                <div className={`space-y-1.5 ${isHomeAssistantIngress() ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <label className="ml-1 flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400"><Server size={12} className="text-slate-400" /> Server URL</label>
                                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all focus-within:border-indigo-400">
                                        <span className="text-xs">URL</span>
                                        <input
                                            type="text"
                                            readOnly={isHomeAssistantIngress()}
                                            placeholder={DEFAULT_HA_URL}
                                            className="w-full bg-transparent text-xs text-slate-700 outline-none"
                                            value={localHaUrl}
                                            onChange={(event) => setLocalHaUrl(event.target.value)}
                                            onKeyDown={(event) => event.stopPropagation()}
                                        />
                                    </div>
                                </div>

                                {haMcpAuthMode === 'oauth' ? (
                                    <button
                                        onClick={handleHaOAuth}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-600 active:scale-95"
                                    >
                                        <span>Authenticate HA via OAuth</span>
                                        <ExternalLink size={12} />
                                    </button>
                                ) : (
                                    <div className={`space-y-1.5 ${isHomeAssistantIngress() ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <label className="ml-1 flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400"><KeyRound size={12} className="text-slate-400" /> Access Token</label>
                                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all focus-within:border-indigo-400">
                                            <span className="text-xs">Token</span>
                                            <input
                                                type={showHaToken ? 'text' : 'password'}
                                                readOnly={isHomeAssistantIngress()}
                                                placeholder={DEFAULT_HA_TOKEN ? "Using built-in token..." : "Long-lived access token..."}
                                                className="w-full bg-transparent text-xs text-slate-700 outline-none"
                                                value={localHaToken}
                                                onChange={(event) => setLocalHaToken(event.target.value)}
                                                onKeyDown={(event) => event.stopPropagation()}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowHaToken((value) => !value)}
                                                className="text-slate-400 hover:text-slate-600"
                                            >
                                                {showHaToken ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between gap-3">
                                    <p className="flex-1 px-1 text-[10px] italic text-slate-400">Allows Curio to control lights and devices.</p>
                                </div>

                            </div>
                        )}
                    </SettingsSection>
                </div>

                {/* Reset Cache */}
                <div className="mx-6 mb-4 mt-2">
                    <button
                        onClick={() => {
                            if (window.confirm('This will clear all saved tokens, API keys, and cached data. You will need to re-enter them. Continue?')) {
                                for (const key of SENSITIVE_KEYS) {
                                    localStorage.removeItem(key);
                                }
                                // Clear Google OAuth tokens
                                localStorage.removeItem('curio_google_access_token');
                                localStorage.removeItem('curio_google_tasks_access_token');
                                localStorage.removeItem('curio_google_client_id');
                                localStorage.removeItem('curio_ha_mcp_oauth_state');
                                // Clear IndexedDB encryption keys
                                indexedDB.deleteDatabase('curio-secrets');
                                // Clear service worker caches
                                if ('caches' in window) {
                                    caches.keys().then(names => names.forEach(name => caches.delete(name)));
                                }
                                window.location.reload();
                            }
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-600 transition-all hover:bg-red-100 active:scale-95"
                    >
                        <Trash2 size={14} />
                        Reset Cache &amp; Tokens
                    </button>
                    <p className="mt-1.5 text-center text-[10px] text-slate-400">Clears all saved API keys, tokens, and cached data. The page will reload.</p>
                </div>

                <div className="flex justify-end border-t bg-slate-50 px-6 py-4">
                    <button
                        onClick={handleSave}
                        className="rounded-xl bg-sky-500 px-6 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-sky-600 active:scale-95"
                    >
                        Save & Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Personality Selector ---
const PersonalitySelector: React.FC = () => {
    const personalityId = usePersonalityId();
    const customPrompt = useCustomPersonalityPrompt();

    return (
        <div className="space-y-2">
            <p className="text-[11px] text-slate-400">Choose how Curio talks and behaves.</p>
            <div className="grid grid-cols-2 gap-2">
                {PERSONALITY_PRESETS.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => setPersonalityId(preset.id as PersonalityId)}
                        className={`flex items-start gap-2 rounded-xl border p-2.5 text-left transition-all active:scale-[0.98] ${personalityId === preset.id
                                ? 'border-sky-400 bg-sky-50 ring-2 ring-sky-100'
                                : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                            }`}
                    >
                        <span className="text-lg shrink-0 mt-0.5">{preset.emoji}</span>
                        <div className="min-w-0">
                            <p className={`text-xs font-bold ${personalityId === preset.id ? 'text-sky-700' : 'text-slate-700'}`}>{preset.label}</p>
                            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{preset.description}</p>
                        </div>
                    </button>
                ))}
            </div>
            {personalityId === 'custom' && (
                <div className="mt-2 space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Custom Personality</label>
                    <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPersonalityPrompt(e.target.value)}
                        placeholder="Describe how Curio should behave... e.g. 'Be a pirate who loves science'"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none resize-none h-24 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                </div>
            )}
        </div>
    );
};

export const CurioSettingsModal = React.memo(CurioSettingsModalComponent);

CurioSettingsModal.displayName = 'CurioSettingsModal';
