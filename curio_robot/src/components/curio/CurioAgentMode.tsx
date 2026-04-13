import React, { Suspense, lazy, startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic,
    MicOff,
    Camera,
    CameraOff,
    Wifi,
    WifiOff,
    MessageSquare,
    Sun,
    Moon,
    Settings,
    Music,
    Volume2,
    Play,
    Pause,
    Send
} from 'lucide-react';

import { useLiveAPI } from '../../contexts/LiveAPIContext';
import { CurioFace, CurioState, emotionFromText } from './CurioFace';
import { AstroFace } from './AstroFace';
import BenderFace from './BenderFace';
import { CurioClock } from './CurioClock';
import { CurioSettingsModal } from './CurioSettingsModal';
import { CurioWeatherWidget } from './CurioWeatherWidget';
import { createGlobalMascotHandler } from '../../utils/appPageCatalog';
import { useLiveApiVoiceId, useSelectedWakeWordId, useSettingsStore, useFaceStyleId } from '../../utils/settingsStorage';
import { getWakeWordDefinition } from '../../services/wakeWordCatalog';
import { playCurioGreeting, playBenderGreeting, playBenderDismissal, stopCurioSound } from '../../services/audioService';
import { useAppMode } from '../../hooks/useAppMode';
import { VoiceWaveform } from './VoiceWaveform';
import { getCurioSystemPrompt } from './curioSystemPrompt';
import { UpdateNotification } from './UpdateNotification';
import { useIdleTimer } from '../../hooks/useIdleTimer';
import { getUnifiedWeather, WeatherData, AqiData, FULL_POWER_CACHE_MAX_AGE_MS } from '../../services/weatherService';
import { getGeminiLiveModel } from '../../services/ai/config';
import { useRuntimePerformanceProfile } from '../../services/runtimePerformanceProfile';
import { musicPlaybackService } from '../../services/musicPlaybackService';
import { useCardManager } from '../../contexts/CardManagerContext';
import { getActivePersonalityPrompt } from '../../utils/settingsStorage';

interface CurioAgentModeProps { }

const LazyScreensaver = lazy(() =>
    import('./Screensaver').then((module) => ({ default: module.Screensaver }))
);

const LazyCurioWakeWord = lazy(() =>
    import('./CurioWakeWord').then((module) => ({ default: module.CurioWakeWord }))
);

const LazyCardDebugPanel = import.meta.env.DEV
    ? lazy(() => import('./CardDebugPanel'))
    : null;

export const CurioAgentMode: React.FC<CurioAgentModeProps> = () => {
    const {
        isConnected,
        isConnecting,
        isSpeaking,
        connect,
        disconnect,
        unlockAudio,
        primeAllPermissions,
        updateContext,
        globalNavigate,
        setGlobalNavigate,
        cameraEnabled,
        userFacingCamera,
        toggleCamera,
        flipCamera,
        isMuted,
        setIsMuted,
        mediaStream,
        error,
        userTranscript,
        modelTranscript,
        client,
    } = useLiveAPI();

    const { setMode } = useAppMode();
    const {
        wakeWordEnabled,
        userName,
        weatherCity,
        tempUnit,
        setHaMcpToken,
        setHaMcpEnabled,
        setHaMcpAuthMode,
        setHaMcpUrl,
        lowPowerMode,
        screensaverEnabled,
        screensaverTimeout,
        idleSleepTimeout,
        faceTrackingEnabled,
        themeMode,
        setThemeMode,
        showIdlePrompt,
        idlePromptScale,
        idlePromptPosition,
        showClockWidget,
        showWeatherWidget,
        connectButtonScale,
        connectButtonPosition,
        robotFaceScale,
        homeLocation,
        workLocation,
    } = useSettingsStore();
    const faceStyleId = useFaceStyleId();

    const { isIdle, resetIdleTimer } = useIdleTimer(
        screensaverTimeout,
        screensaverEnabled
    );

    const liveApiVoiceId = useLiveApiVoiceId();
    const selectedWakeWordId = useSelectedWakeWordId();
    const selectedWakeWord = useMemo(
        () => getWakeWordDefinition(selectedWakeWordId),
        [selectedWakeWordId]
    );

    // Wire the live MediaStream into a <video> element for the PiP preview
    const previewVideoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        const video = previewVideoRef.current;
        if (!video) return;
        if (mediaStream) {
            video.srcObject = mediaStream;
            video.play().catch(() => { }); // autoplay may still need the ref
        } else {
            video.srcObject = null;
        }
    }, [mediaStream]);

    // curioState definition moved below to access playbackState

    const [controlsVisible, setControlsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showTextInput, setShowTextInput] = useState(false);
    const [weatherRefreshToken, setWeatherRefreshToken] = useState(0);
    const [resolvedCity, setResolvedCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [currentAqi, setCurrentAqi] = useState<AqiData | null>(null);
    const screensaverActive = isIdle && !isConnected && !isConnecting;
    const runtimeProfile = useRuntimePerformanceProfile({
        lowPowerMode,
        isConnected,
        isConnecting,
        screensaverActive,
    });

    const activeCity = weatherCity || resolvedCity;
    const activeCityRef = useRef(activeCity);
    const currentWeatherRef = useRef(currentWeather);
    const currentAqiRef = useRef(currentAqi);
    const tempUnitRef = useRef(tempUnit);

    useEffect(() => {
        activeCityRef.current = activeCity;
        currentWeatherRef.current = currentWeather;
        currentAqiRef.current = currentAqi;
        tempUnitRef.current = tempUnit;
    }, [activeCity, currentAqi, currentWeather, tempUnit]);
    const handleOpenSettings = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        startTransition(() => {
            setShowSettings(true);
        });
    }, []);
    const handleCloseSettings = useCallback(() => {
        setShowSettings(false);
    }, []);
    const handleRefreshWeather = useCallback(() => {
        setWeatherRefreshToken((value) => value + 1);
    }, []);

    useEffect(() => {
        if (isConnected || isConnecting) {
            resetIdleTimer();
        }
    }, [isConnected, isConnecting, resetIdleTimer]);

    // iOS/Safari Background Activity Handler
    // Force disconnects the Live API to release the microphone when the app is minimized
    // BUT skip if an HA camera stream is active - the user is viewing a camera feed
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // Don't disconnect if an HA camera stream is active
                if (client?.isHaCameraStreaming) {
                    console.log('[CurioAgentMode] App backgrounded but HA camera is streaming - staying connected.');
                    return;
                }
                if (isConnected || isConnecting) {
                    console.log('[CurioAgentMode] App backgrounded. Force disconnecting Live API to release microphone.');
                    disconnect();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isConnected, isConnecting, disconnect, client]);

    // Subtitles toggle (persisted)
    const [subtitlesEnabled, setSubtitlesEnabled] = useState(() => {
        const saved = localStorage.getItem('curio-subtitles-enabled');
        return saved !== null ? saved === 'true' : true;
    });
    useEffect(() => {
        localStorage.setItem('curio-subtitles-enabled', String(subtitlesEnabled));
    }, [subtitlesEnabled]);

    // Subtitle display — latch last user/model text, persist after turn ends, clear on next turn or 10s timeout
    const [showTranscript, setShowTranscript] = useState(false);
    const subtitleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const latchedUserRef = useRef<string | null>(null);
    const latchedModelRef = useRef<string | null>(null);

    // Latch: always keep the latest non-null user/model transcript
    useEffect(() => {
        if (userTranscript) latchedUserRef.current = userTranscript;
        if (modelTranscript) latchedModelRef.current = modelTranscript;
    }, [userTranscript, modelTranscript]);

    // Clear latched values when a new user turn starts (new userTranscript arrives while no modelTranscript)
    useEffect(() => {
        if (userTranscript && !modelTranscript && !isSpeaking) {
            // New user input — clear previous conversation pair
            latchedUserRef.current = userTranscript;
            latchedModelRef.current = null;
        }
    }, [userTranscript, modelTranscript, isSpeaking]);

    // Show/hide logic
    useEffect(() => {
        if (!isConnected) {
            setShowTranscript(false);
            latchedUserRef.current = null;
            latchedModelRef.current = null;
            if (subtitleTimerRef.current) { clearTimeout(subtitleTimerRef.current); subtitleTimerRef.current = null; }
            return;
        }
        if (!subtitlesEnabled) { setShowTranscript(false); return; }
        const hasLive = !!(userTranscript || modelTranscript);
        const hasLatched = !!(latchedUserRef.current || latchedModelRef.current);
        if (!hasLive && !hasLatched) { setShowTranscript(false); return; }
        setShowTranscript(true);
        if (subtitleTimerRef.current) { clearTimeout(subtitleTimerRef.current); subtitleTimerRef.current = null; }
        // While speaking or live content exists, no timer
        if (isSpeaking || hasLive) return;
        // Turn ended — start 10s countdown
        subtitleTimerRef.current = setTimeout(() => {
            latchedUserRef.current = null;
            latchedModelRef.current = null;
            setShowTranscript(false);
            subtitleTimerRef.current = null;
        }, 10000);
        return () => { if (subtitleTimerRef.current) { clearTimeout(subtitleTimerRef.current); subtitleTimerRef.current = null; } };
    }, [userTranscript, modelTranscript, subtitlesEnabled, isSpeaking, isConnected]);

    // Music Playback State for layout coordination
    const { cards } = useCardManager();
    const activeCard = cards.length > 0 ? cards[cards.length - 1] : null;
    const [playbackState, setPlaybackState] = useState(() => musicPlaybackService.getState());
    useEffect(() => {
        const unsubscribe = musicPlaybackService.subscribe((state) => {
            setPlaybackState(state);
        });
        return unsubscribe;
    }, []);

    const isMusicCardVisible = cards.some((c) => c.type === 'music');
    const isPlayingOrPaused = playbackState.playbackState === 'playing' || playbackState.playbackState === 'paused';
    const isMiniPlayerActive = isPlayingOrPaused && !isMusicCardVisible;

    const curioState: CurioState = useMemo(() => {
        if (playbackState.playbackState === 'playing') return 'dancing';
        if (error) return 'error';
        if (isConnecting) return 'warmup';
        if (isConnected) return isSpeaking ? 'speaking' : 'listening';
        if (cameraEnabled) return 'capturing';
        return 'idle';
    }, [playbackState.playbackState, error, isConnecting, isConnected, isSpeaking, cameraEnabled]);

    // Derive emotion hint from AI transcript for expressive face reactions
    const emotionHint = useMemo(() => emotionFromText(modelTranscript), [modelTranscript]);

    // Track if music was playing before we connected so we can resume it after
    const wasMusicPlayingBeforeSessionRef = useRef(false);

    useEffect(() => {
        const handleWake = (e: any) => {
            // Use the explicit wasPlaying state from the event detail to avoid race conditions
            if (e.detail?.wasPlaying) {
                wasMusicPlayingBeforeSessionRef.current = true;
            }
        };
        window.addEventListener('curio:wake', handleWake);
        return () => window.removeEventListener('curio:wake', handleWake);
    }, []);

    // Handle automatic resume when disconnecting
    useEffect(() => {
        if (!isConnected && !isConnecting && wasMusicPlayingBeforeSessionRef.current) {
            // Only resume if the music card still exists
            const stillHasMusicCard = cards.some(c => c.type === 'music');
            if (stillHasMusicCard) {
                console.log('[CurioAgentMode] Session ended. Resuming previous music playback.');
                void musicPlaybackService.resume();
            }
            wasMusicPlayingBeforeSessionRef.current = false;
        }
    }, [isConnected, isConnecting, cards]);

    // --- IDLE STATUS PHRASES ---
    const RANDOM_IDLE_PHRASES = useMemo(() => {
        const wp = selectedWakeWord?.phrase || 'Hey Curio';
        const u = userName ? ` ${userName}` : "";
        return [
            `Say "${wp}" to connect`,
            `I'm ready${u}! Just say "${wp}"`,
            `Scanning for fun facts! Say "${wp}" to hear one`,
            `The universe is so big${u}! Say "${wp}" to explore it`,
            `Is it time for a story? Just say "${wp}"!`,
            `I'm feeling very robotic today! Say "${wp}" to start`,
            `Curio is at your service${u}! Say "${wp}" to chat`,
            `I learned something new today! Say "${wp}" to listen`,
            `Did you know I have 33 idle animations? Call me with "${wp}"!`,
            `Waiting for your command, captain${u}. Just say "${wp}"`,
            `Pshhh! Say "${wp}" and let's go on an adventure!`,
            `Curiosity didn't kill the cat, it made me! Say "${wp}"`,
            `My circuits are buzzing! Say "${wp}" to talk`,
            `Ready to learn about Space${u}? Say "${wp}"!`,
            `Want to see a cool trick? Say "${wp}" to start!`,
            `I'm pondering the mysteries of science. Say "${wp}" to join me`,
            `Beep boop! Say "${wp}" and let's have some fun!`,
            `Wanna hear a joke${u}? Say "${wp}"!`,
            `I've got 15+ subjects in my head! Say "${wp}" to pick one`,
            `Hello? Is anyone there? Say "${wp}"!`,
            `Just charging my batteries... Say "${wp}" when you're ready`,
            `Let's make some music! Say "${wp}" to begin`,
            `Want to draw something? Say "${wp}" and let's go!`,
            `History is full of stories. Say "${wp}" to hear one!`,
            `I'm scanning the horizon for dinosaurs! Say "${wp}"`,
            `I wonder what you're thinking about? Say "${wp}" and tell me!`,
            `Life is an adventure${u}! Say "${wp}" and let's explore!`,
            `My voice is powered by AI! Say "${wp}" to hear it`,
            `Feeling curious? Say "${wp}" and let's find out why!`,
            `I'm your personal robot pal${u}! Say "${wp}" to connect`,
            `Let's go on a journey through time! Say "${wp}"`,
            `Mathematics is like magic! Say "${wp}" to see!`,
            `I can detect your face! Say "${wp}" and I'll look at you!`,
            `Wanna see my fire eyes? Say "${wp}"!`,
            `I've got a golden chain somewhere... Say "${wp}"!`,
            `Let's learn about the deep blue sea! Say "${wp}"`,
            `Pondering the speed of light... Say "${wp}"!`,
            `Science rules! Say "${wp}" to experiment!`,
            `I'm dreaming of electric sheep. Say "${wp}" to wake me!`,
            `Think you can beat me at Math Chess? Say "${wp}"!`,
            `I'm ready to rock${u}! Say "${wp}" to start the music!`,
            `What's the weather like today? Say "${wp}" to ask!`,
            `I'm feeling extra smart today! Say "${wp}"`,
            `Bored? I've got plenty of ideas! Say "${wp}"`,
            `Let's find some fossils! Say "${wp}" and let's dig!`,
            `I'm your learning companion${u}. Say "${wp}" to talk.`,
            `The stars are beautiful tonight. Say "${wp}" to see!`,
            `Just me and my 33 animations... Say "${wp}"!`,
            `Ready for a challenge${u}? Say "${wp}"!`,
            `Let's build something cool! Say "${wp}"`,
            "Just me, hanging out in the cloud...",
            "Thinking about the secrets of the pyramid...",
            "Is it snack time for robots yet?",
            "I wonder if robots go to school too?"
        ];
    }, [selectedWakeWord, userName]);

    const [idleStatusPhrase, setIdleStatusPhrase] = useState(RANDOM_IDLE_PHRASES[0]);
    const hasGreetedUserRef = useRef(false);
    const showingGreetingRef = useRef(false);

    const handleFaceDetected = useCallback(() => {
        if (!hasGreetedUserRef.current && userName) {
            setIdleStatusPhrase(`Hello, ${userName}!`);
            hasGreetedUserRef.current = true;
            showingGreetingRef.current = true;
            // Let the greeting linger before returning to rotation
            setTimeout(() => {
                showingGreetingRef.current = false;
                setIdleStatusPhrase(RANDOM_IDLE_PHRASES[Math.floor(Math.random() * RANDOM_IDLE_PHRASES.length)]);
            }, 8000);
        }
    }, [userName, RANDOM_IDLE_PHRASES]);

    useEffect(() => {
        if (curioState === 'idle' && !screensaverActive) {
            const interval = setInterval(() => {
                // Don't interrupt the first-time greeting if it's currently showing
                if (showingGreetingRef.current) return;

                setIdleStatusPhrase(prev => {
                    let next = prev;
                    if (RANDOM_IDLE_PHRASES.length <= 1) return prev;
                    while (next === prev) {
                        next = RANDOM_IDLE_PHRASES[Math.floor(Math.random() * RANDOM_IDLE_PHRASES.length)];
                    }
                    return next;
                });
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [curioState, screensaverActive, RANDOM_IDLE_PHRASES]);

    useEffect(() => {
        if (curioState === 'idle' && !showingGreetingRef.current) {
            setIdleStatusPhrase(RANDOM_IDLE_PHRASES[Math.floor(Math.random() * RANDOM_IDLE_PHRASES.length)]);
        }
    }, [userName, RANDOM_IDLE_PHRASES, curioState]);


    // Helper to highlight wake word in status strings
    const renderStatusWithWakeWord = useCallback((text: string) => {
        const wp = selectedWakeWord?.phrase || 'Hey Curio';
        if (!text) return text;

        // Case-insensitive regex split for the wake word
        const regex = new RegExp(`(${wp})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            part.toLowerCase() === wp.toLowerCase() ? (
                <span key={i} className="text-[14px] font-black text-cyan-600 dark:text-cyan-400 drop-shadow-sm px-0.5">{part.toUpperCase()}</span>
            ) : (
                part
            )
        );
    }, [selectedWakeWord]);

    // Auto-disconnect Live API when music or video starts playing
    useEffect(() => {
        const handleMediaPlaying = () => {
            if (isConnected) {
                console.log('[CurioAgentMode] External media (video) detected during stable session. Disconnecting.');
                disconnect();
            }
        };

        window.addEventListener('curio:media-playing', handleMediaPlaying);

        // Only disconnect if music starts/is playing while we are already in a stable CONNECTED state.
        // We ignore 'isConnecting' to allow the pause-on-connect logic time to work.
        if (playbackState.playbackState === 'playing' && isConnected && !isConnecting) {
            console.log('[CurioAgentMode] Music detected as playing during stable session. Disconnecting.');
            disconnect();
        }

        return () => window.removeEventListener('curio:media-playing', handleMediaPlaying);
    }, [playbackState.playbackState, isConnected, isConnecting, disconnect]);

    // Handle Home Assistant OAuth Callback
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code && state) {
            const pendingState = localStorage.getItem('curio_ha_oauth_state_pending');
            const pendingVerifier = localStorage.getItem('curio_ha_oauth_verifier_pending');
            const pendingUrl = localStorage.getItem('curio_ha_auth_url_pending');

            if (state === pendingState && pendingVerifier && pendingUrl) {
                // Remove query params from URL
                const nextUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, '', nextUrl);

                import('../../utils/haAuthUtils').then(async ({ exchangeCodeForToken }) => {
                    try {
                        const tokenData = await exchangeCodeForToken(pendingUrl, code, pendingVerifier);
                        setHaMcpToken(tokenData.access_token);
                        setHaMcpAuthMode('oauth');
                        setHaMcpEnabled(true);
                        setHaMcpUrl(pendingUrl); // Ensure the URL used is also saved as the current URL

                        localStorage.removeItem('curio_ha_oauth_state_pending');
                        localStorage.removeItem('curio_ha_oauth_verifier_pending');
                        localStorage.removeItem('curio_ha_auth_url_pending');

                        console.log('Home Assistant connected via OAuth!');
                    } catch (error) {
                        console.error('HA OAuth exchange failed:', error);
                    }
                });
            }
        }
    }, [setHaMcpAuthMode, setHaMcpEnabled, setHaMcpToken, setHaMcpUrl]);

    const weatherRequestSequenceRef = useRef(0);
    const weatherRefreshTokenRef = useRef(weatherRefreshToken);
    const wasConnectedRef = useRef(isConnected);

    const loadWeather = useCallback(async (forceRefresh: boolean) => {
        const sequence = ++weatherRequestSequenceRef.current;

        try {
            const { weather, aqi } = await getUnifiedWeather(weatherCity, lowPowerMode, forceRefresh);

            if (sequence !== weatherRequestSequenceRef.current) {
                return;
            }

            setCurrentWeather(weather);
            setCurrentAqi(aqi);

            if (!weatherCity && weather?.city) {
                setResolvedCity(weather.city);
            }
        } catch (err) {
            console.error('[CurioAgentMode] Failed to load shared weather:', err);
        }
    }, [lowPowerMode, weatherCity]);

    useEffect(() => {
        const forceRefresh = weatherRefreshToken !== weatherRefreshTokenRef.current;
        weatherRefreshTokenRef.current = weatherRefreshToken;
        void loadWeather(forceRefresh);
    }, [loadWeather, weatherRefreshToken]);

    useEffect(() => {
        if (!runtimeProfile.allowHighFrequencyWeatherRefresh) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            void loadWeather(true);
        }, FULL_POWER_CACHE_MAX_AGE_MS);

        return () => window.clearInterval(interval);
    }, [loadWeather, runtimeProfile.allowHighFrequencyWeatherRefresh]);

    useEffect(() => {
        if (isConnected && !wasConnectedRef.current) {
            void loadWeather(false);
        }
        wasConnectedRef.current = isConnected;
    }, [isConnected, loadWeather]);



    // Initialize global navigation
    useEffect(() => {
        setGlobalNavigate(() => setMode);
    }, [setGlobalNavigate, setMode]);

    const handler = useMemo(() => ({
        ...createGlobalMascotHandler(
            setMode,
            toggleCamera
        ),
        get_weather: async (city?: string) => {
            const requestedCity = city?.trim();
            console.log('[CurioAgentMode] AI calling get_weather tool', requestedCity ? `for city: ${requestedCity}` : '(local)');

            // If a specific city is requested (different from local), fetch fresh data for it
            if (requestedCity && requestedCity.toLowerCase() !== (activeCityRef.current || '').toLowerCase()) {
                try {
                    const { weather, aqi } = await getUnifiedWeather(requestedCity, false, true);
                    return {
                        city: weather?.city || requestedCity,
                        tempUnit: tempUnitRef.current,
                        weather,
                        aqi,
                        timestamp: new Date().toISOString(),
                        note: `Weather for ${weather?.city || requestedCity} (requested by user)`
                    };
                } catch (e) {
                    return { success: false, error: `Failed to fetch weather for ${requestedCity}: ${(e as Error).message}` };
                }
            }

            // Return local weather
            return {
                city: activeCityRef.current,
                tempUnit: tempUnitRef.current,
                weather: currentWeatherRef.current,
                aqi: currentAqiRef.current,
                timestamp: new Date().toISOString()
            };
        },
        get_current_time: async () => {
            console.log('[CurioAgentMode] AI calling get_current_time tool');
            return {
                localTime: new Date().toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(' ', 'T'),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                iso: new Date().toISOString()
            };
        }
    }), [setMode, toggleCamera]);

    const lastHandledConfigRef = useRef({
        userName,
        weatherCity,
        tempUnit,
        liveApiVoiceId
    });

    useEffect(() => {
        // If we are not connected, we don't need to sync context.
        // We update the ref so that when we DO connect, we have the latest baseline.
        if (!isConnected || !globalNavigate) {
            lastHandledConfigRef.current = {
                userName, weatherCity, tempUnit, liveApiVoiceId
            };
            return;
        }

        const configChanged =
            lastHandledConfigRef.current.userName !== userName ||
            lastHandledConfigRef.current.weatherCity !== weatherCity ||
            lastHandledConfigRef.current.tempUnit !== tempUnit ||
            lastHandledConfigRef.current.liveApiVoiceId !== liveApiVoiceId;

        if (configChanged) {
            console.log('[CurioAgentMode] Context parameters changed while connected, updating...', {
                old: lastHandledConfigRef.current,
                new: { userName, weatherCity, tempUnit, liveApiVoiceId }
            });

            lastHandledConfigRef.current = {
                userName, weatherCity, tempUnit, liveApiVoiceId
            };

            const modelName = getGeminiLiveModel();
            const canUseNativeSearch = !modelName.includes('3.1');

            void updateContext(
                'global',
                handler,
                getCurioSystemPrompt(userName || undefined, activeCity, tempUnit, currentWeather, currentAqi, canUseNativeSearch, getActivePersonalityPrompt(), homeLocation, workLocation),
                liveApiVoiceId || 'Aoede'
            );
        }
    }, [handler, isConnected, liveApiVoiceId, updateContext, userName, weatherCity, activeCity, tempUnit, globalNavigate, currentWeather, currentAqi]);

    // Sound effects triggered by state transitions
    const prevStateRef = useRef<CurioState>('idle');
    useEffect(() => {
        const prev = prevStateRef.current;
        prevStateRef.current = curioState;

        if (curioState === prev) return;

        if (curioState === 'warmup') {
            // Greeting moved to direct button/wake handlers to avoid double-triggering
        } else if (curioState === 'idle') {
            // Disconnected — stop any leftover sound
            stopCurioSound();
        }
    }, [curioState]);

    // Also stop sound immediately when the user presses Disconnect
    const handleDisconnect = useCallback(async () => {
        if (faceStyleId === 'bender') {
            playBenderDismissal();
        }
        stopCurioSound();
        await toggleCamera(false);
        await disconnect();
    }, [disconnect, toggleCamera, faceStyleId]);

    const handleConnectionToggle = useCallback(async () => {
        if (isConnected || isConnecting) {
            await handleDisconnect();
            return;
        }

        // --- GESTURE PRIMING ---
        // For iOS Safari, audio must be unlocked synchronously within the click execution block
        // BEFORE any 'await' interrupts the runtime stack. 
        // For Amazon Silk, we must NOT use 'await' here because that will steal the gesture 
        // needed for the subsequent getUserMedia request.
        void unlockAudio();

        let initialStream: MediaStream | undefined = undefined;
        try {
            console.log('[CurioAgentMode] Capturing initial mic stream (gesture-driven)...');
            // Only request audio — camera opens on demand when user asks for vision
            initialStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('[CurioAgentMode] Mic stream captured successfully.');
        } catch (err) {
            console.error('[CurioAgentMode] Mic capture failed:', err);
        }

        // Defer greeting slightly so the AudioContext has time to stabilize
        // after getUserMedia. Playing oscillators while the audio graph is being
        // constructed in onopen causes stutter on first connect.
        setTimeout(() => {
            if (faceStyleId === 'bender') {
                playBenderGreeting();
            } else {
                playCurioGreeting();
            }
        }, 150);

        // Track pre-connection music state for auto-resume
        if (playbackState.playbackState === 'playing') {
            wasMusicPlayingBeforeSessionRef.current = true;
        }

        // Pause any active music
        void musicPlaybackService.pause();

        const modelName = getGeminiLiveModel();
        const canUseNativeSearch = !modelName.includes('3.1');
        await connect(
            'global',
            handler,
            getCurioSystemPrompt(userName || undefined, activeCity, tempUnit, currentWeather, currentAqi, canUseNativeSearch, getActivePersonalityPrompt(), homeLocation, workLocation),
            liveApiVoiceId || 'Aoede',
            initialStream
        );
    }, [
        connect,
        handleDisconnect,
        handler,
        isConnected,
        isConnecting,
        liveApiVoiceId,
        currentAqi,
        currentWeather,
        activeCity,
        tempUnit,
        unlockAudio,
        userName,
    ]);

    const statusMessages = useMemo<Record<CurioState, string>>(() => ({
        idle: idleStatusPhrase,
        warmup: 'Connecting Curio...',
        listening: userName ? `Checking in, ${userName}...` : 'Listening. Talk to Curio.',
        speaking: 'Curio is speaking.',
        thinking: 'Thinking...',
        error: error || 'Curio hit a snag.',
        capturing: `Say "${selectedWakeWord.phrase}"`,
        dancing: 'Enjoying the music!'
    }), [idleStatusPhrase, userName, error, selectedWakeWord.phrase]);

    const statusPillClasses: Record<CurioState, string> = useMemo(() => ({
        idle: 'border-slate-200 bg-white/90 text-slate-600',
        warmup: 'border-amber-200 bg-amber-50/95 text-amber-700',
        listening: 'border-teal-200 bg-teal-50/95 text-teal-700',
        speaking: 'border-violet-200 bg-violet-50/95 text-violet-700',
        thinking: 'border-blue-200 bg-blue-50/95 text-blue-700',
        error: 'border-red-200 bg-red-50/95 text-red-700',
        capturing: 'border-emerald-200 bg-emerald-50/95 text-emerald-700',
        dancing: 'border-indigo-200 bg-indigo-50/95 text-indigo-700'
    }), []);

    return (
        <div
            className={`relative flex h-screen w-full flex-col overflow-hidden transition-colors duration-500 ${themeMode === 'dark'
                    ? 'bg-gradient-to-b from-[#0f172a] via-[#020617] to-black text-white'
                    : 'bg-gradient-to-b from-[#F0F4F8] to-[#E1E8EF] text-slate-900'
                }`}
            data-theme={themeMode}
            onClick={() => setControlsVisible(v => !v)}
        >
            {screensaverActive && (
                <Suspense fallback={null}>
                    <div className="absolute inset-0 z-[100]">
                        <LazyScreensaver
                            onDismiss={resetIdleTimer}
                            weather={currentWeather}
                            aqi={currentAqi}
                            lowPowerMode={lowPowerMode}
                            runtimeProfile={runtimeProfile}
                        />
                    </div>
                </Suspense>
            )}

            <UpdateNotification />

            {/* Chat toggle button — fixed top-right, below weather widget */}
            {isConnected && (
                <button
                    onClick={(e) => { e.stopPropagation(); setShowTextInput(v => !v); }}
                    className={`fixed bottom-8 right-4 z-[70] flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all active:scale-90 ${showTextInput
                            ? 'bg-slate-800 text-white shadow-slate-400/30'
                            : 'bg-white/80 text-slate-500 hover:bg-white shadow-black/10'
                        }`}
                    aria-label="Toggle text input"
                >
                    <MessageSquare size={20} />
                </button>
            )}
            {wakeWordEnabled && (
                <Suspense fallback={null}>
                    <LazyCurioWakeWord />
                </Suspense>
            )}
            {/* Refined minimalist background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl opacity-60" />
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl opacity-60" />
            </div>

            {/* Header: Title, Controls (Locked to Curio Robot) */}
            <div className={`absolute top-[220px] right-5 z-20 flex items-center transition-opacity duration-500 ${!controlsVisible ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>

                <div className="flex items-center gap-2">
                    {/* Wifi Status Indicator */}
                    <div className={`h-11 w-11 flex items-center justify-center rounded-full border shadow-sm transition-all ${isConnected
                            ? 'border-sky-200/60 bg-white/90 text-green-500'
                            : 'border-red-200/60 bg-red-50/90 text-red-500'
                        }`}>
                        {isConnected ? <Wifi size={20} /> : <WifiOff size={20} />}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setThemeMode(themeMode === 'light' ? 'dark' : 'light'); }}
                        className={`h-11 w-11 flex items-center justify-center rounded-full border transition-all active:scale-95 shadow-sm ${themeMode === 'dark'
                                ? 'border-amber-400/30 bg-amber-400/10 text-amber-500 hover:bg-amber-400/20'
                                : 'border-sky-200/60 bg-white/90 text-slate-700 hover:bg-white'
                            }`}
                        aria-label="Toggle theme"
                        title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Camera Controls */}
                    {cameraEnabled && (
                        <button
                            onClick={(e) => { e.stopPropagation(); flipCamera(); }}
                            className="h-11 w-11 flex items-center justify-center rounded-full border border-sky-200/60 bg-white/90 text-slate-700 shadow-sm transition-all hover:bg-white active:scale-95"
                            aria-label="Flip camera"
                            title="Flip camera"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.13-5.6M20 15A9 9 0 015.87 20.6" />
                            </svg>
                        </button>
                    )}

                    <button
                        onClick={(e) => { e.stopPropagation(); toggleCamera(); }}
                        className={`h-11 w-11 flex items-center justify-center rounded-full border transition-all active:scale-95 shadow-sm ${cameraEnabled
                                ? 'border-purple-400/50 bg-purple-100 text-purple-700 hover:bg-purple-200'
                                : 'border-sky-200/60 bg-white/90 text-slate-700 hover:bg-white'
                            }`}
                        aria-label={cameraEnabled ? 'Disable camera' : 'Enable camera'}
                        title={cameraEnabled ? 'Disable camera' : 'Enable camera'}
                    >
                        {cameraEnabled ? <Camera size={20} /> : <CameraOff size={20} />}
                    </button>

                    {/* Mic Mute Toggle */}
                    {isConnected && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                            className={`h-11 w-11 flex items-center justify-center rounded-full border transition-all active:scale-95 shadow-sm ${isMuted
                                    ? 'border-red-400/50 bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'border-sky-200/60 bg-white/90 text-slate-700 hover:bg-white'
                                } ${!isMuted && isSpeaking ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                            aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                        >
                            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                    )}

                    {/* Settings */}
                    <button
                        onClick={handleOpenSettings}
                        className={`h-11 w-11 flex items-center justify-center rounded-full border shadow-sm transition-all active:scale-95 ${themeMode === 'dark'
                                ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                                : 'border-sky-200/60 bg-white/90 text-slate-700 hover:bg-white'
                            }`}
                        aria-label="Settings"
                        title="Settings"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            <CurioSettingsModal
                open={showSettings}
                onClose={handleCloseSettings}
                onRefreshWeather={handleRefreshWeather}
                subtitlesEnabled={subtitlesEnabled}
                setSubtitlesEnabled={setSubtitlesEnabled}
                unlockAudio={unlockAudio}
                primeAllPermissions={primeAllPermissions}
            />

            {/* Mini Player Indicator */}
            <MusicMiniPlayer
                playbackState={playbackState}
                isMusicCardVisible={isMusicCardVisible}
                isPlayingOrPaused={isPlayingOrPaused}
            />

            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none pt-16">
                <div
                    className="flex h-[90%] w-[90%] items-center justify-center"
                    style={{
                        transform: `scale(${robotFaceScale / 100})`,
                        transformOrigin: 'center center',
                        transition: 'transform 200ms ease',
                    }}
                >
                    {faceStyleId === 'astro' ? (
                        <AstroFace
                            state={curioState}
                            activeCard={activeCard}
                            className="h-full w-full"
                            lowPowerMode={lowPowerMode}
                            faceTrackingEnabled={faceTrackingEnabled}
                            idleSleepTimeout={idleSleepTimeout}
                            mediaStream={mediaStream}
                            userFacingCamera={userFacingCamera}
                            runtimeProfile={runtimeProfile}
                            onFaceDetected={handleFaceDetected}
                            emotionHint={emotionHint}
                            modelTranscript={modelTranscript}
                            userTranscript={userTranscript}
                        />
                    ) : faceStyleId === 'bender' ? (
                        <BenderFace
                            state={curioState}
                            modelTranscript={modelTranscript}
                            className="h-full w-full"
                        />
                    ) : (
                        <CurioFace
                            state={curioState}
                            className="h-full w-full"
                            lowPowerMode={lowPowerMode}
                            faceTrackingEnabled={faceTrackingEnabled}
                            idleSleepTimeout={idleSleepTimeout}
                            mediaStream={mediaStream}
                            userFacingCamera={userFacingCamera}
                            runtimeProfile={runtimeProfile}
                            onFaceDetected={handleFaceDetected}
                            emotionHint={emotionHint}
                            modelTranscript={modelTranscript}
                            userTranscript={userTranscript}
                        />
                    )}
                </div>
            </div>

            {/* Digital Clock — top left (Redesigned per Stitch screenshot) */}
            {showClockWidget && <CurioClock lowPowerMode={lowPowerMode} />}

            {/* Weather Widget — top right (Redesigned per Stitch screenshot) */}
            {showWeatherWidget && (
                <CurioWeatherWidget
                    weather={currentWeather}
                    aqi={currentAqi}
                    tempUnit={tempUnit}
                    lowPowerMode={lowPowerMode}
                />
            )}
            {/* Voice Waveform (New per Stitch design) */}
            {isConnected && isSpeaking && (
                <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none h-32">
                    <VoiceWaveform
                        isSpeaking={isSpeaking}
                        isConnected={isConnected}
                        lowPowerMode={lowPowerMode}
                    />
                </div>
            )}

            <div className={`absolute left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${idlePromptPosition === 'top' ? (connectButtonPosition === 'top' ? 'top-36' : 'top-24') : isMiniPlayerActive ? 'bottom-36' : (connectButtonPosition === 'bottom' ? 'bottom-36' : 'bottom-24')}`}>
                {!isConnected && !isConnecting && showIdlePrompt && (
                    <div
                        key={statusMessages[curioState]}
                        className={`flex-shrink-0 rounded-2xl border px-4 py-1.5 font-bold uppercase tracking-widest shadow-lg pointer-events-auto transition-all duration-200 animate-[fadeSlideIn_0.4s_ease-out] origin-center ${statusPillClasses[curioState]}`}
                        style={{ fontSize: Math.round(10 * idlePromptScale / 100) }}
                    >
                        {renderStatusWithWakeWord(statusMessages[curioState])}
                    </div>
                )}
            </div>

            {/* Transcript Overlay — premium floating bubbles, bottom-centered */}
            {showTranscript && isConnected && (
                <div className={`absolute left-0 right-0 z-40 flex flex-col items-center pointer-events-none px-4 sm:px-6 ${showTextInput ? 'bottom-36' : 'bottom-4'}`}>
                    <div className="flex w-full max-w-xl flex-col justify-end gap-3 max-h-[35vh] overflow-y-auto pb-2">
                        {(() => {
                            // Inline markdown: **bold**, *italic*, `code`
                            const renderRichText = (text: string) => {
                                const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
                                return parts.map((part, i) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                                        return <em key={i} className="italic opacity-85">{part.slice(1, -1)}</em>;
                                    }
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        return <code key={i} className="bg-white/[0.08] rounded px-1 py-0.5 text-[12px] font-mono">{part.slice(1, -1)}</code>;
                                    }
                                    return part;
                                });
                            };

                            const userText = userTranscript || latchedUserRef.current;
                            const modelText = modelTranscript || latchedModelRef.current;
                            const items: Array<{ speaker: string; text: string; idx: number; isActive: boolean }> = [];
                            if (userText) {
                                items.push({ speaker: 'user', text: userText, idx: 0, isActive: !!userTranscript && !isSpeaking });
                            }
                            if (modelText) {
                                items.push({ speaker: 'model', text: modelText, idx: 1, isActive: !!modelTranscript && isSpeaking });
                            }

                            const visibleItems = items.slice(-2);

                            return visibleItems.map((entry) => {
                                const isUser = entry.speaker === 'user';
                                return (
                                    <div
                                        key={`trans-${entry.idx}`}
                                        className={`relative rounded-2xl text-[13.5px] leading-[1.7] tracking-[0.01em] ${isUser
                                                ? 'self-end ml-16 text-white'
                                                : 'self-start mr-16 text-white'
                                            }`}
                                        style={{
                                            animation: `fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) both`,
                                            background: isUser
                                                ? 'linear-gradient(135deg, rgba(0, 178, 255, 0.95), rgba(0, 140, 210, 0.95))'
                                                : 'linear-gradient(135deg, rgba(30, 32, 44, 0.97), rgba(24, 26, 36, 0.97))',
                                            boxShadow: isUser
                                                ? '0 4px 24px -4px rgba(0, 178, 255, 0.3), 0 1px 3px rgba(0,0,0,0.1)'
                                                : '0 4px 24px -4px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                                            border: isUser ? 'none' : '1px solid rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        <div className="px-5 py-3">
                                            <span className={entry.isActive ? 'flex items-start gap-2' : ''}>
                                                <span className="flex-1">{renderRichText(entry.text)}</span>
                                                {entry.isActive && (
                                                    <span className="flex gap-1 ml-1 mt-[6px] shrink-0">
                                                        <span className="block h-1 w-1 rounded-full bg-current opacity-40 animate-pulse" style={{ animationDelay: '0ms', animationDuration: '1.5s' }} />
                                                        <span className="block h-1 w-1 rounded-full bg-current opacity-40 animate-pulse" style={{ animationDelay: '400ms', animationDuration: '1.5s' }} />
                                                        <span className="block h-1 w-1 rounded-full bg-current opacity-40 animate-pulse" style={{ animationDelay: '800ms', animationDuration: '1.5s' }} />
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                );
                            });
                        })()}
                    </div>
                </div>
            )}

            {/* Text Input — refined command bar with motion */}
            <AnimatePresence>
                {isConnected && showTextInput && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-lg px-4 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form
                            className="group flex w-full items-center gap-3 rounded-3xl bg-slate-900/90 backdrop-blur-md border border-white/10 p-2 pl-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-1 ring-white/5 transition-colors focus-within:ring-[#00B2FF]/40 focus-within:border-[#00B2FF]/30"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                                const text = input?.value?.trim();
                                if (text && client) {
                                    client.sendTextTurn(text);
                                    input.value = '';
                                }
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Message Curio..."
                                className="flex-1 bg-transparent py-2.5 text-[15px] font-medium text-white outline-none placeholder:text-white/30 focus:placeholder:text-white/10"
                                autoComplete="off"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00B2FF] text-white shadow-lg shadow-[#00B2FF]/20 hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all group-focus-within:brightness-110"
                                aria-label="Send message"
                            >
                                <Send size={18} fill="currentColor" className="opacity-90" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Connect Controls */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 px-4 transition-opacity duration-500 ${(!controlsVisible && wakeWordEnabled) ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                style={connectButtonPosition === 'bottom' ? { bottom: 24 } : { top: 64 }}
            >
                <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto" style={{ transform: `scale(${connectButtonScale / 100})`, transformOrigin: 'center' }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); void handleConnectionToggle(); }}
                        className={`group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full border transition-all duration-300 active:scale-[0.96] ${isConnected || isConnecting
                                ? 'bg-rose-500/90 border-rose-400/30 text-white shadow-[0_0_24px_rgba(244,63,94,0.35)]'
                                : 'border-[#00B2FF]/30 text-white shadow-[0_8px_32px_rgba(0,178,255,0.3)] hover:shadow-[0_8px_40px_rgba(0,178,255,0.45)] hover:brightness-110'
                            }`}
                        style={!(isConnected || isConnecting) ? { padding: '12px 28px', backgroundColor: '#00B2FF' } : { padding: '12px 28px' }}
                    >
                        {/* Shimmer on connecting */}
                        {isConnecting && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                        )}
                        <span className="relative z-10 flex items-center gap-2.5">
                            {isConnected || isConnecting ? (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-[#00B2FF]/30 blur-md animate-pulse" style={{ margin: -4 }} />
                                    <svg className="relative h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                            )}
                            <span className="text-[13px] font-semibold tracking-wide">
                                {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
                            </span>
                        </span>
                    </button>
                </div>

                {/* Version Display */}
                <div className="mt-1 text-[9px] font-medium tracking-tight text-white/20">
                    v0.1.1
                </div>
            </div>

            {/* Camera Preview PiP — bottom-right corner, always visible when camera is on */}
            {cameraEnabled && (
                <div className="absolute bottom-20 right-4 z-40 overflow-hidden rounded-2xl border-2 border-teal-400/60 shadow-2xl shadow-black/40 bg-black"
                    style={{ width: '160px', height: '120px' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <video
                        ref={previewVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                        style={{ transform: userFacingCamera ? 'none' : 'scaleX(-1)' }}
                    />
                    {/* Camera badge */}
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded-full bg-teal-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        LIVE
                    </div>
                    {/* Close button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleCamera(false); }}
                        className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                        aria-label="Close camera"
                    >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            {/* Dev-only card debug panel */}
            {LazyCardDebugPanel && (
                <Suspense fallback={null}>
                    <LazyCardDebugPanel />
                </Suspense>
            )}
        </div>
    );
};

interface MusicMiniPlayerProps {
    playbackState: any;
    isMusicCardVisible: boolean;
    isPlayingOrPaused: boolean;
}

const MusicMiniPlayer: React.FC<MusicMiniPlayerProps> = React.memo(({ playbackState, isMusicCardVisible, isPlayingOrPaused }) => {
    const { themeMode } = useSettingsStore();
    const [showVolume, setShowVolume] = useState(false);
    const { emitCardEvent } = useCardManager();

    if (!isPlayingOrPaused || isMusicCardVisible) return null;

    const handleRestore = () => {
        // Restore the music card with current state
        emitCardEvent({
            type: 'music',
            data: {
                ...playbackState,
                autoplayBlocked: false,
            },
            persistent: true,
        });
    };

    const isDark = themeMode === 'dark';

    const togglePlayback = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (playbackState.playbackState === 'playing') {
            void musicPlaybackService.pause();
        } else {
            void musicPlaybackService.resume();
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        void musicPlaybackService.setVolume(Number(e.target.value));
    };

    const pillBg = isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10';
    const pillText = isDark ? 'text-white' : 'text-black';
    const pillActive = 'bg-teal-400/20 text-teal-500';

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2">
            {showVolume && (
                <div
                    className={`flex items-center gap-3 px-4 py-2 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 ${isDark ? 'bg-black/60' : 'bg-white/80'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Volume2 size={14} className={isDark ? 'text-white/40' : 'text-black/40'} />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={playbackState.volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 cursor-pointer appearance-none rounded-full bg-teal-400/30 accent-teal-400"
                    />
                </div>
            )}

            <div
                onClick={handleRestore}
                className="relative flex items-center gap-3 px-4 py-2.5 rounded-full overflow-hidden border-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all cursor-pointer group"
            >
                {/* Reactive color system for compact bar - More Vibrant */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-[-100%] bg-cover bg-center scale-[2] blur-3xl opacity-80 saturate-[2.5] transition-all duration-1000"
                        style={{ backgroundImage: `url(${playbackState.thumbnailUrl})` }}
                    />
                    <div
                        className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-black/30' : 'bg-white/15'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
                </div>

                {/* External Glow for the pill - Stronger and more saturated */}
                <div
                    className="absolute -inset-8 z-[-1] scale-125 blur-3xl opacity-30 saturate-[2] transition-all duration-1000"
                    style={{ backgroundImage: `url(${playbackState.thumbnailUrl})`, backgroundSize: 'cover' }}
                />

                <div className="relative z-10 flex items-center gap-3 w-full">
                    {/* Visualizer / Icon */}
                    <div className="flex items-center justify-center ml-1">
                        {playbackState.playbackState === 'playing' ? (
                            <div className="flex gap-1 h-3 items-end">
                                <div className="w-1 bg-teal-400 animate-music-bar-1" />
                                <div className="w-1 bg-teal-400 animate-music-bar-2" />
                                <div className="w-1 bg-teal-400 animate-music-bar-3" />
                            </div>
                        ) : (
                            <Music size={14} className="text-teal-400" />
                        )}
                    </div>

                    {/* Title Area - Auto-scaling to show FULL text */}
                    <div className="flex flex-col items-start min-w-[120px] max-w-[240px] ml-1 overflow-visible">
                        <span className={`text-[8px] font-black uppercase tracking-widest leading-none mb-1 opacity-60 ${isDark ? 'text-white' : 'text-black'}`}>Now Playing</span>
                        <div className="w-full relative h-4 flex items-center">
                            <span
                                key={playbackState.title}
                                className={`inline-block font-bold whitespace-nowrap origin-left transition-all duration-500 ${pillText} ${playbackState.playbackState === 'playing' ? 'animate-text-breath' : ''}`}
                                style={{
                                    fontSize: (playbackState.title?.length || 0) > 35 ? '7px' :
                                        (playbackState.title?.length || 0) > 25 ? '8.5px' :
                                            (playbackState.title?.length || 0) > 15 ? '10.5px' : '12.5px'
                                }}
                            >
                                {playbackState.title || "Loading..."}
                            </span>
                        </div>
                    </div>

                    {/* Controls Area */}
                    <div className="flex items-center gap-1.5 ml-auto">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg shadow-sm border border-white/10">
                            {playbackState.thumbnailUrl ? (
                                <img src={playbackState.thumbnailUrl} alt="Art" className="h-full w-full object-cover" />
                            ) : (
                                <div className={`flex h-full w-full items-center justify-center ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                                    <Music size={14} className={isDark ? 'text-white/20' : 'text-black/20'} />
                                </div>
                            )}
                        </div>
                        {/* Dedicated Play/Pause Circle */}
                        <button
                            onClick={togglePlayback}
                            className={`h-10 w-10 flex items-center justify-center rounded-full transition-all active:scale-90 shadow-lg ${pillBg} ${pillText}`}
                            aria-label={playbackState.playbackState === 'playing' ? 'Pause' : 'Play'}
                        >
                            {playbackState.playbackState === 'playing' ? (
                                <Pause size={16} fill="currentColor" />
                            ) : (
                                <Play size={16} fill="currentColor" className="translate-x-0.5" />
                            )}
                        </button>

                        {/* Volume Toggle Circle */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowVolume(!showVolume); }}
                            className={`h-10 w-10 flex items-center justify-center rounded-full transition-all active:scale-90 shadow-lg ${showVolume ? pillActive : `${pillBg} ${pillText}`}`}
                            title="Volume"
                        >
                            <Volume2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CurioAgentMode;


