import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { LiveClient, LiveState } from '../services/liveApiLive';
import { getApiKeyAsync, getGeminiLiveModel } from '../services/ai/config';
import { AppMode as GlobalAppMode } from '../hooks/useAppMode';
import { unlockAudioContext } from '../services/audioContext';
import { resetHaMcpRuntimeStatus, setHaMcpRuntimeStatus } from '../utils/haMcpRuntimeStatus';
import { useRuntimePerformanceProfile } from '../services/runtimePerformanceProfile';
import { setVolume } from '../services/volumeStore';
import { revokeProcessorBlobUrls } from '../services/audioWorkletCapture';
import {
    useHaMcpEnabled,
    useHaMcpToken,
    useHaMcpUrl,
    useHaApiMode,
    getHaMcpTokenAsync,
    useMuteMicWhileAiSpeaking,
    useWakeWordEnabled,
    useLowPowerMode,
    useOfflineModeEnabled,
} from '../utils/settingsStorage';
import { stopListening, startListening, isListening } from '../services/wakeWordService';
import { OfflineClient } from '../services/offlineClient';



import type { LiveModuleMode as LiveAppMode } from '../services/liveSessionConfig';
import type { FunctionDeclaration } from '@google/genai';
import { CardManagerProvider, useCardManager } from './CardManagerContext';
import { TimerTickProvider } from '../hooks/useTimerTick';
import CardStack from '../components/cards/CardStack';
import type { CardEvent } from '../services/cardTypes';

let liveClientModulePromise: Promise<typeof import('../services/liveApiLive')> | null = null;

const loadLiveClientModule = () => {
    if (!liveClientModulePromise) {
        liveClientModulePromise = import('../services/liveApiLive');
    }

    return liveClientModulePromise;
};

const isHomeAssistantOauthCallbackInFlight = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    const params = new URLSearchParams(window.location.search);
    const hasOauthCallbackParams = Boolean(params.get('code') && params.get('state'));
    const hasPendingOauthState = Boolean(
        localStorage.getItem('curio_ha_oauth_state_pending') &&
        localStorage.getItem('curio_ha_oauth_verifier_pending') &&
        localStorage.getItem('curio_ha_auth_url_pending'),
    );

    return hasOauthCallbackParams && hasPendingOauthState;
};

interface LiveAPIContextType {
    isConnected: boolean;
    isConnecting: boolean;
    isSpeaking: boolean;
    error: string | null;
    client: LiveClient | null;
    transcript: string | null;
    userTranscript: string | null;
    modelTranscript: string | null;
    transcriptHistory: Array<{ speaker: 'user' | 'model', text: string }>;
    globalMode: GlobalAppMode | null;
    setGlobalMode: (mode: GlobalAppMode) => void;
    globalNavigate: ((mode: GlobalAppMode) => void) | null;
    setGlobalNavigate: (fn: (mode: GlobalAppMode) => void) => void;
    connect: (mode: LiveAppMode, handler?: any, systemInstruction?: string, voiceName?: string, initialStream?: MediaStream) => Promise<void>;
    disconnect: () => Promise<void>;
    reconnectWithContext: (mode: LiveAppMode, handler?: any, systemInstruction?: string, voiceName?: string) => Promise<void>;
    updateContext: (mode: LiveAppMode, handler?: any, systemInstruction?: string, voiceName?: string) => Promise<void>;
    unlockAudio: () => Promise<boolean>;
    primeCameraPermission: () => Promise<boolean>;
    primeMicrophonePermission: () => Promise<boolean>;
    primeAllPermissions: () => Promise<{ camera: boolean; microphone: boolean }>;
    
    // Camera state
    cameraEnabled: boolean;
    userFacingCamera: boolean;
    showCameraPreview: boolean;
    mediaStream: MediaStream | null;
    
    // Camera controls
    setCameraEnabled: (enabled: boolean) => void;
    setShowCameraPreview: (show: boolean) => void;
    toggleCamera: (enabled?: boolean) => Promise<CameraToggleResult>;
    flipCamera: () => void;
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
    resumptionToken: string | null;
    resetSession: () => void;
}

const LiveAPIContext = createContext<LiveAPIContextType | undefined>(undefined);
const CAMERA_PERMISSION_PRIMED_KEY = 'curio_camera_permission_primed';
const SESSION_RESUMPTION_TOKEN_KEY = 'curio_session_resumption_token';
const TRANSCRIPT_HISTORY_KEY = 'curio_transcript_history';
type CameraToggleResult = { success: boolean; enabled: boolean; error?: string; frameReady?: boolean; framesCaptured?: number };

export const LiveAPIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const haMcpEnabled = useHaMcpEnabled();
    const haMcpUrl = useHaMcpUrl();
    const haMcpToken = useHaMcpToken();
    const haApiMode = useHaApiMode();
    const muteMicWhileAiSpeaking = useMuteMicWhileAiSpeaking();
    const wakeWordEnabled = useWakeWordEnabled();
    const lowPowerMode = useLowPowerMode();
    const offlineModeEnabled = useOfflineModeEnabled();



    const [clientInstance, setClientInstance] = useState<LiveClient | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const runtimeProfile = useRuntimePerformanceProfile({
        lowPowerMode,
        isConnected,
        isConnecting,
    });

    // --- Audio-Reactive Volume ---
    // Reads RMS from the AnalyserNode attached to the TTS audio stream and
    // writes volume to the shared store so VoiceWaveform + CurioFace can
    // read it each animation frame without forcing style recalculation.
    useEffect(() => {
        const analyserNode = clientInstance ? (clientInstance as any).analyserNode as AnalyserNode | null : null;
        if (!analyserNode || !isSpeaking) {
            setVolume(0);
            return;
        }
        let animationFrameId: number;
        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
        const updateVolume = () => {
            analyserNode.getByteTimeDomainData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const diff = dataArray[i] - 128;
                sum += diff * diff;
            }
            const rms = Math.sqrt(sum / dataArray.length);
            const volume = Math.min(1, rms / 48);
            const smoothedVolume = Math.max(0.05, volume);
            setVolume(smoothedVolume);
            animationFrameId = requestAnimationFrame(updateVolume);
        };
        updateVolume();
        return () => {
            cancelAnimationFrame(animationFrameId);
            setVolume(0);
        };
    }, [clientInstance, isSpeaking]);

    const [error, setError] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<string | null>(null);
    const [userTranscript, setUserTranscript] = useState<string | null>(null);
    const [modelTranscript, setModelTranscript] = useState<string | null>(null);
    const [transcriptHistory, setTranscriptHistory] = useState<Array<{ speaker: 'user' | 'model', text: string }>>(() => {
        const saved = localStorage.getItem(TRANSCRIPT_HISTORY_KEY);
        try {
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [resumptionToken, setResumptionToken] = useState<string | null>(() => 
        localStorage.getItem(SESSION_RESUMPTION_TOKEN_KEY)
    );

    useEffect(() => {
        localStorage.setItem(TRANSCRIPT_HISTORY_KEY, JSON.stringify(transcriptHistory));
    }, [transcriptHistory]);

    useEffect(() => {
        if (resumptionToken) {
            localStorage.setItem(SESSION_RESUMPTION_TOKEN_KEY, resumptionToken);
        } else {
            localStorage.removeItem(SESSION_RESUMPTION_TOKEN_KEY);
        }
    }, [resumptionToken]);
    const [globalMode, setGlobalMode] = useState<GlobalAppMode | null>(null);
    const [globalNavigate, setGlobalNavigate] = useState<((mode: GlobalAppMode) => void) | null>(null);
    const isReconnectingRef = useRef(false);
    const connectionStateRef = useRef<'disconnected' | 'connecting' | 'connected' | 'disconnecting'>('disconnected');
    const clientRef = useRef<LiveClient | null>(null);
    const lastSpeechEndedAtRef = useRef<number>(0);
    // Ref so the setInterval closure always sees the latest isSpeaking value
    const isSpeakingRef = useRef(false);

    // Card event emitter ref — bridged to CardManagerContext via CardEventBridge
    const cardEventEmitterRef = useRef<((event: CardEvent) => void) | null>(null);

    // --- Camera State ---
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [userFacingCamera, setUserFacingCamera] = useState(false); // default environment (Pi has no front cam)
    const [showCameraPreview, setShowCameraPreview] = useState(false);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    const streamRef = useRef<MediaStream | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const captureIntervalRef = useRef<number | null>(null);
    const offscreenVideoRef = useRef<HTMLVideoElement | null>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const lastCanvasWidthRef = useRef(0);
    const lastCanvasHeightRef = useRef(0);
    const cameraPermissionPrimedRef = useRef(
        typeof window !== 'undefined' && localStorage.getItem(CAMERA_PERMISSION_PRIMED_KEY) === 'true'
    );
    const micPermissionPrimedRef = useRef(false);
    
    // Lazy helper — creates offscreen video/canvas only when camera is first needed
    const ensureOffscreenElements = useCallback(() => {
        if (typeof document === 'undefined') return;
        if (!offscreenVideoRef.current) {
            offscreenVideoRef.current = document.createElement('video');
            offscreenVideoRef.current.playsInline = true;
            offscreenVideoRef.current.autoplay = true;
            offscreenVideoRef.current.muted = true;
        }
        if (!offscreenCanvasRef.current) {
            offscreenCanvasRef.current = document.createElement('canvas');
        }
    }, []);

    // Keep refs in sync so the capture interval closure and stable callbacks never see a stale value
    const cameraEnabledRef = useRef(cameraEnabled);
    const userFacingCameraRef = useRef(userFacingCamera);
    
    useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
    useEffect(() => { cameraEnabledRef.current = cameraEnabled; }, [cameraEnabled]);
    useEffect(() => { userFacingCameraRef.current = userFacingCamera; }, [userFacingCamera]);

    const resetSession = useCallback(() => {
        setResumptionToken(null);
        setTranscriptHistory([]);
        localStorage.removeItem(SESSION_RESUMPTION_TOKEN_KEY);
        localStorage.removeItem(TRANSCRIPT_HISTORY_KEY);
    }, []);

    const stopCamera = useCallback(() => {
        if (captureIntervalRef.current !== null) {
            window.clearInterval(captureIntervalRef.current);
            captureIntervalRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        if (offscreenVideoRef.current) {
            offscreenVideoRef.current.pause();
            offscreenVideoRef.current.srcObject = null;
            offscreenVideoRef.current = null;
        }
        offscreenCanvasRef.current = null;
        canvasCtxRef.current = null;
        lastCanvasWidthRef.current = 0;
        lastCanvasHeightRef.current = 0;

        setMediaStream(null);
        setCameraEnabled(false);
        setShowCameraPreview(false);
    }, []);

    const markCameraPermissionPrimed = useCallback(() => {
        cameraPermissionPrimedRef.current = true;
        if (typeof window !== 'undefined') {
            localStorage.setItem(CAMERA_PERMISSION_PRIMED_KEY, 'true');
        }
    }, []);

    const normalizeInitialStreamForSession = useCallback((stream: MediaStream): MediaStream | undefined => {
        const audioTracks = stream.getAudioTracks();
        const videoTracks = stream.getVideoTracks();

        if (videoTracks.length > 0) {
            // The initial audio+video request is only for permission priming on strict browsers.
            // Release the camera immediately so later vision requests can open a dedicated stream.
            videoTracks.forEach((track) => track.stop());
            markCameraPermissionPrimed();
        }

        if (audioTracks.length === 0) {
            stream.getTracks().forEach((track) => track.stop());
            return undefined;
        }

        const track = audioTracks[0];
        if (track.applyConstraints) {
            track.applyConstraints({
                echoCancellation: { ideal: true },
                noiseSuppression: { ideal: true },
                autoGainControl: { ideal: true }
            }).catch(err => console.warn('[LiveAPIContext] Failed to apply echo cancellation to existing track', err));
        }

        return new MediaStream(audioTracks);
    }, [markCameraPermissionPrimed]);

    const primeCameraPermission = useCallback(async (): Promise<boolean> => {
        if (cameraPermissionPrimedRef.current) {
            return true;
        }

        if (!navigator.mediaDevices?.getUserMedia) {
            return false;
        }

        try {
            const permissionsApi = (navigator as any).permissions;
            if (permissionsApi?.query) {
                try {
                    const status = await permissionsApi.query({ name: 'camera' });
                    if (status?.state === 'granted') {
                        markCameraPermissionPrimed();
                        return true;
                    }

                    if (status?.state === 'denied') {
                        return false;
                    }
                } catch {
                    // Some browsers/webviews throw for camera permission queries. Fall through to direct preflight.
                }
            }

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            stream.getTracks().forEach((track) => track.stop());
            markCameraPermissionPrimed();
            return true;
        } catch (error) {
            console.warn('[LiveAPIContext] Camera permission preflight failed:', error);
            return false;
        }
    }, [markCameraPermissionPrimed]);

    const primeMicrophonePermission = useCallback(async (): Promise<boolean> => {
        if (micPermissionPrimedRef.current) {
            return true;
        }

        if (!navigator.mediaDevices?.getUserMedia) {
            return false;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            stream.getTracks().forEach((track) => track.stop());
            micPermissionPrimedRef.current = true;
            return true;
        } catch (error) {
            console.warn('[LiveAPIContext] Microphone permission preflight failed:', error);
            return false;
        }
    }, []);

    const primeAllPermissions = useCallback(async (): Promise<{ camera: boolean; microphone: boolean }> => {
        if (!navigator.mediaDevices?.getUserMedia) {
            return { camera: false, microphone: false };
        }

        try {
            // Request both at once for a single unified prompt on modern browsers
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            stream.getTracks().forEach((track) => track.stop());
            markCameraPermissionPrimed();
            micPermissionPrimedRef.current = true;
            return { camera: true, microphone: true };
        } catch (error) {
            console.warn('[LiveAPIContext] Unified permission preflight failed, trying individually:', error);
            const camera = await primeCameraPermission();
            const microphone = await primeMicrophonePermission();
            return { camera, microphone };
        }
    }, [markCameraPermissionPrimed, primeCameraPermission, primeMicrophonePermission]);

    const captureAndSendFrame = useCallback((facingMode: 'user' | 'environment' = 'environment') => {
        ensureOffscreenElements();
        const video = offscreenVideoRef.current;
        const canvas = offscreenCanvasRef.current;

        if (!video || !canvas || video.readyState < 2) return false;
        if (video.videoWidth === 0 || video.videoHeight === 0) return false;

        const maxDimension = 960;
        const scale = (video.videoWidth > maxDimension || video.videoHeight > maxDimension)
            ? Math.min(maxDimension / video.videoWidth, maxDimension / video.videoHeight)
            : 1;

        const targetW = Math.max(1, Math.round(video.videoWidth * scale));
        const targetH = Math.max(1, Math.round(video.videoHeight * scale));
        if (lastCanvasWidthRef.current !== targetW || lastCanvasHeightRef.current !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
            lastCanvasWidthRef.current = targetW;
            lastCanvasHeightRef.current = targetH;
            // Canvas resize clears the context — must re-acquire
            canvasCtxRef.current = canvas.getContext('2d');
        }
        if (!canvasCtxRef.current) {
            canvasCtxRef.current = canvas.getContext('2d');
        }
        const ctx = canvasCtxRef.current;
        if (!ctx) return false;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (facingMode === 'user') {
            // Mirror the front/selfie camera so it looks natural (like a mirror)
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        // Back camera ('environment') is NOT mirrored — shows the world as-is

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const base64Data = canvas.toDataURL('image/jpeg', 0.7).split(',')[1];
        if (!base64Data || !clientRef.current) return false;

        try {
            clientRef.current.sendVideoFrame(base64Data);
            return true;
        } catch (err) {
            console.warn('[LiveAPIContext] Failed to send camera frame:', err);
            return false;
        }
    }, [ensureOffscreenElements]);

    const waitForRenderedVideoFrame = useCallback(async (timeoutMs = 500) => {
        const video = offscreenVideoRef.current;
        if (!video) return false;

        const requestVideoFrameCallback = (video as HTMLVideoElement & {
            requestVideoFrameCallback?: (callback: () => void) => number;
        }).requestVideoFrameCallback;

        if (typeof requestVideoFrameCallback === 'function') {
            return await new Promise<boolean>((resolve) => {
                let settled = false;
                const timeout = window.setTimeout(() => {
                    if (!settled) {
                        settled = true;
                        resolve(false);
                    }
                }, timeoutMs);

                requestVideoFrameCallback.call(video, () => {
                    if (!settled) {
                        settled = true;
                        window.clearTimeout(timeout);
                        resolve(true);
                    }
                });
            });
        }

        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                return true;
            }

            await new Promise((resolve) => window.setTimeout(resolve, 16));
        }

        return false;
    }, []);

    const sendFreshCameraFrames = useCallback(async (
        facingMode: 'user' | 'environment' = 'environment',
        targetFrames = 2,
        timeoutMs = 1200,
    ) => {
        let framesCaptured = 0;
        const deadline = Date.now() + timeoutMs;

        while (framesCaptured < targetFrames && Date.now() < deadline) {
            const timeRemaining = Math.max(100, deadline - Date.now());
            const frameAvailable = await waitForRenderedVideoFrame(Math.min(400, timeRemaining));
            if (!frameAvailable) {
                break;
            }

            if (captureAndSendFrame(facingMode)) {
                framesCaptured += 1;
            }

            if (framesCaptured < targetFrames) {
                await new Promise((resolve) => window.setTimeout(resolve, 120));
            }
        }

        if (framesCaptured > 0) {
            await new Promise((resolve) => window.setTimeout(resolve, 80));
        }

        return framesCaptured;
    }, [captureAndSendFrame, waitForRenderedVideoFrame]);

    const startCamera = useCallback(async (facingMode: 'user' | 'environment' = 'environment'): Promise<CameraToggleResult> => {
        stopCamera();
        ensureOffscreenElements();

        // Raspberry Pi-compatible camera acquisition:
        // Try the requested facing mode first, then any camera, then bail.
        let stream: MediaStream | null = null;
        let lastError: unknown = null;
        const attempts = [
            // 1. Requested facing mode with ideal high-res constraints
            { video: { facingMode: { ideal: facingMode }, width: { ideal: 960 }, height: { ideal: 720 } }, audio: false },
            // 2. Any camera with no constraints (works on Pi with USB cam)
            { video: true, audio: false },
        ] as const;

        for (const constraints of attempts) {
            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints as MediaStreamConstraints);
                break;
            } catch (err) {
                lastError = err;
                console.warn('[LiveAPIContext] Camera attempt failed:', constraints, err);
            }
        }

        if (!stream) {
            console.warn('[LiveAPIContext] All camera attempts failed.');
            const errorMessage = lastError instanceof Error ? lastError.message : 'Unable to access camera.';
            return { success: false, enabled: false, error: errorMessage, frameReady: false };
        }

        try {
            streamRef.current = stream;
            setMediaStream(stream);
            setCameraEnabled(true);
            setShowCameraPreview(true);
            markCameraPermissionPrimed();
            if (offscreenVideoRef.current) {
                offscreenVideoRef.current.srcObject = stream;
                await offscreenVideoRef.current.play().catch((e: any) => console.warn('[LiveAPIContext] offscreen video play error:', e));
            }

            const framesCaptured = await sendFreshCameraFrames(facingMode, 2, 1400);
            if (framesCaptured < 1) {
                stopCamera();
                return {
                    success: false,
                    enabled: false,
                    frameReady: false,
                    framesCaptured,
                    error: 'Camera started, but no usable frame was available yet.',
                };
            }

            captureIntervalRef.current = window.setInterval(() => {
                // Use ref so we always read the latest isSpeaking — avoids stale closure
                if (isSpeakingRef.current) return;
                if (connectionStateRef.current !== 'connected' || !clientRef.current) return;



                captureAndSendFrame(facingMode);
            }, 1000); // 1 FPS per Live API docs
            return {
                success: true,
                enabled: true,
                frameReady: true,
                framesCaptured,
            };
        } catch (error) {
            console.warn('[LiveAPIContext] Camera setup failed:', error);
            stopCamera();
            const errorMessage = error instanceof Error ? error.message : 'Failed to initialize camera stream.';
            return { success: false, enabled: false, error: errorMessage, frameReady: false, framesCaptured: 0 };
        }
    }, [captureAndSendFrame, ensureOffscreenElements, markCameraPermissionPrimed, sendFreshCameraFrames, stopCamera]);

    const toggleCamera = useCallback(async (forceEnabled?: boolean): Promise<CameraToggleResult> => {
        const nextEnabled = typeof forceEnabled === 'boolean' ? forceEnabled : !cameraEnabledRef.current;
        if (!nextEnabled) {
            stopCamera();
            return { success: true, enabled: false, frameReady: false, framesCaptured: 0 };
        }

        if (!cameraEnabledRef.current) {
            return startCamera(userFacingCameraRef.current ? 'user' : 'environment');
        }

        const framesCaptured = await sendFreshCameraFrames(userFacingCameraRef.current ? 'user' : 'environment', 1, 500);
        const frameReady = framesCaptured > 0;
        return {
            success: frameReady,
            enabled: true,
            frameReady,
            framesCaptured,
            error: frameReady ? undefined : 'Camera is on, but no fresh frame was available.',
        };
    }, [sendFreshCameraFrames, startCamera, stopCamera]);

    const flipCamera = useCallback(() => {
        const nextUserFacing = !userFacingCameraRef.current;
        setUserFacingCamera(nextUserFacing);

        if (cameraEnabledRef.current) {
            void startCamera(nextUserFacing ? 'user' : 'environment');
        }
    }, [startCamera]);

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stopCamera]);

    useEffect(() => {
        let isCancelled = false;

        if (wakeWordEnabled && runtimeProfile.allowDisconnectedPreload) {
            void loadLiveClientModule();
        }

        if (!haMcpEnabled || !haMcpUrl || !haMcpToken) {
            if (connectionStateRef.current === 'disconnected') {
                resetHaMcpRuntimeStatus();
            }
            return () => {
                isCancelled = true;
            };
        }

        if (!runtimeProfile.allowDisconnectedPreload) {
            if (connectionStateRef.current === 'disconnected') {
                resetHaMcpRuntimeStatus();
            }
            return () => {
                isCancelled = true;
            };
        }

        if (isHomeAssistantOauthCallbackInFlight()) {
            if (connectionStateRef.current === 'disconnected') {
                setHaMcpRuntimeStatus('checking');
            }
            return () => {
                isCancelled = true;
            };
        }

        const preloadHomeAssistant = async () => {
            if (connectionStateRef.current === 'disconnected') {
                setHaMcpRuntimeStatus('checking');
            }

            try {
                const { prepareHomeAssistantMcpSession } = await import('../services/haMcpService');
                await prepareHomeAssistantMcpSession(haMcpUrl, await getHaMcpTokenAsync(), { silent: true, apiMode: haApiMode });

                if (!isCancelled && connectionStateRef.current === 'disconnected') {
                    setHaMcpRuntimeStatus('connected');
                }
            } catch (preloadError: any) {
                if (!isCancelled && connectionStateRef.current === 'disconnected') {
                    setHaMcpRuntimeStatus(
                        'error',
                        preloadError?.message || 'Failed to preload Home Assistant tools.',
                    );
                }
            }
        };

        void preloadHomeAssistant();

        return () => {
            isCancelled = true;
        };
    }, [haMcpEnabled, haMcpToken, haMcpUrl, runtimeProfile.allowDisconnectedPreload, wakeWordEnabled]);
    
    // Sync the "Mute Mic While Speaking" setting to the current client instance if it exists
    useEffect(() => {
        if (clientRef.current) {
            clientRef.current.muteMicWhileSpeaking = muteMicWhileAiSpeaking;
            // ClearVoice Filter and Voice Gate removed — browser's built-in
            // echoCancellation + noiseSuppression handles this better on all devices
            clientRef.current.clearVoiceEnabled = false;
            clientRef.current.voiceGateThreshold = 0;
        }
    }, [muteMicWhileAiSpeaking]);

    // Sync isMuted state to the live client and handle hardware lifecycle
    useEffect(() => {
        const syncMuteState = async () => {
            if (clientRef.current) {
                clientRef.current.isMuted = isMuted;
            }

            if (isMuted) {
                console.log('[LiveAPIContext] Mic Muted: Stopping all tracks and releasing hardware.');

                // Send audioStreamEnd to flush any cached audio on the server side
                // before we tear down the hardware. This prevents stale buffered audio
                // from being processed after the mic is re-enabled.
                if (clientRef.current && isConnected) {
                    clientRef.current.sendAudioStreamEnd();
                }

                const activeAudioStream = audioStreamRef.current;
                if (activeAudioStream) {
                    activeAudioStream.getTracks().forEach(track => {
                        track.stop();
                        track.enabled = false;
                    });
                    audioStreamRef.current = null;
                }

                if (isListening()) {
                    console.log('[LiveAPIContext] Stopping wake word due to mute.');
                    stopListening();
                }
            } else {
                // Unmuting: Need to re-acquire the microphone
                // CRITICAL: Only re-acquire if actually needed (Connected OR Wake Word Enabled)
                // This prevents the mic from starting automatically on app load when idle.
                if (!isConnected && !isConnecting && !wakeWordEnabled) {
                    console.log('[LiveAPIContext] Mic Unmuted (Idle): Hardware will remain off until needed.');
                    return;
                }

                // If the client already has an active audio stream (e.g. from the connect flow),
                // don't re-acquire — that would replace the working stream and break audio.
                if (audioStreamRef.current && audioStreamRef.current.active) {
                    console.log('[LiveAPIContext] Mic Unmuted: Stream already active, skipping re-acquire.');
                    return;
                }

                console.log('[LiveAPIContext] Mic Unmuted (Active): Re-acquiring hardware stream.');
                
                try {
                    const freshStream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation: { ideal: true },
                            noiseSuppression: { ideal: true },
                            autoGainControl: { ideal: true },
                            channelCount: { ideal: 1 },
                            sampleRate: { ideal: 16000 }
                        }
                    });
                    audioStreamRef.current = freshStream;
                    
                    // Update active AI session if one is running
                    if (clientRef.current) {
                        clientRef.current.updateAudioStream(freshStream);
                    }

                    // Restore wake word if enabled and not currently listening
                    if (wakeWordEnabled && !isListening()) {
                        console.log('[LiveAPIContext] Restoring wake word after unmute.');
                        void startListening();
                    }
                } catch (err) {
                    console.error('[LiveAPIContext] Failed to re-acquire mic on unmute:', err);
                    setError("Failed to re-acquire microphone. Please check permissions.");
                }
            }
        };

        void syncMuteState();
    }, [isMuted, wakeWordEnabled, isConnected, isConnecting]);




    const finalizeDisconnectedState = useCallback(() => {
        connectionStateRef.current = 'disconnected';
        (window as any).__curioLiveApiActive = false;
        // Always release the session mic stream — it uses echoCancellation which
        // triggers browser audio ducking on other media (YouTube music).
        const activeAudioStream = audioStreamRef.current;
        if (activeAudioStream) {
            activeAudioStream.getTracks().forEach(track => {
                track.stop();
                track.enabled = false;
            });
        }
        audioStreamRef.current = null;
        if (haMcpEnabled && haMcpUrl && haMcpToken) {
            setHaMcpRuntimeStatus('connected');
        } else {
            resetHaMcpRuntimeStatus();
        }
        if (!isReconnectingRef.current) {
            setIsConnected(false);
        }
        setIsConnecting(false);
        setIsSpeaking(false);
        setTranscript(null);
        setUserTranscript(null);
        setModelTranscript(null);
        setTranscriptHistory([]);
        setClientInstance(null);
    }, [haMcpEnabled, haMcpToken, haMcpUrl]);

    const disconnect = useCallback(async () => {
        const client = clientRef.current;
        connectionStateRef.current = 'disconnecting';
        setIsConnecting(false);

        try {
            if (client) {
                await client.disconnect();
            }
        } catch (err: any) {
            console.error("LiveAPI Context Disconnect Error:", err);
        } finally {
            // Always release the session mic stream to stop browser audio ducking
            const activeAudioStream = audioStreamRef.current;
            if (activeAudioStream) {
                activeAudioStream.getTracks().forEach(track => {
                    track.stop();
                    track.enabled = false;
                });
            }
            audioStreamRef.current = null;
            clientRef.current = null;
            setClientInstance(null);
            finalizeDisconnectedState();
            // Always turn off the camera when the session ends
            stopCamera();
        }
    }, [finalizeDisconnectedState, stopCamera]);

    const connect = useCallback(async (
        mode: LiveAppMode, 
        handler?: any, 
        systemInstruction?: string, 
        voiceName?: string, 
        initialStream?: MediaStream,
        forceNewSession: boolean = false
    ) => {
        if (connectionStateRef.current === 'connecting' || connectionStateRef.current === 'connected') {
            await disconnect();
            await new Promise(resolve => setTimeout(resolve, 120));
        }

        connectionStateRef.current = 'connecting';
        setIsConnecting(true);
        setError(null);

        // Safety timeout - if connection hasn't changed from connecting in 10s, reset it
        const connectionTimeout = setTimeout(() => {
          if (connectionStateRef.current === 'connecting') {
            console.warn("[LiveAPIContext] Connection timed out, resetting state.");
            finalizeDisconnectedState();
            setError("Connection timed out. Please try again.");
          }
        }, 12000);

        try {
            // Use the provided initialStream if available, otherwise try to capture a new one.
            // On strict browsers like Silk, the initialStream must be acquired 
            // in the very first line of the onClick handler.
            let initialMicStream: MediaStream | undefined = initialStream
                ? normalizeInitialStreamForSession(initialStream)
                : undefined;
            
            if (!initialMicStream && navigator.mediaDevices?.getUserMedia) {
                console.log('[LiveAPIContext] No initial stream provided, attempting to capture mic stream...');
                try {
                    initialMicStream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation: { ideal: true },
                            noiseSuppression: { ideal: true },
                            autoGainControl: { ideal: true },
                            channelCount: { ideal: 1 },
                            sampleRate: { ideal: 16000 }
                        }
                    });
                    micPermissionPrimedRef.current = true;
                    void unlockAudioContext();
                    console.log('[LiveAPIContext] Successfully captured mic stream inside connect fallback.');
                } catch (micErr) {
                    console.warn('[LiveAPIContext] Failed to capture mic stream during connect fallback:', micErr);
                }
            } else if (initialMicStream) {
                console.log('[LiveAPIContext] Using pre-acquired initial stream.');
                // We assume audio context is already being unlocked in parallel or sequence 
                // in the gesture handler, but let's ensure it here just in case.
                void unlockAudioContext();
                micPermissionPrimedRef.current = true;
            }

            audioStreamRef.current = initialMicStream ?? null;

            const apiKey = await getApiKeyAsync();
            const { LiveClient } = await loadLiveClientModule();

            if (!apiKey && !offlineModeEnabled) {
                if (initialMicStream) {
                    initialMicStream.getTracks().forEach(t => t.stop());
                }
                throw new Error("No Gemini API key found. Please add it in settings.");
            }

            // --- Home Assistant MCP Integration ---
            let mcpTools: FunctionDeclaration[] = [];
            let haClient: any = null;
            let haInstructionSuffix = "";
            let preparedHomeAssistant: any = null;
            
            if (haMcpEnabled && haMcpUrl && haMcpToken) {
                    console.log('[LiveAPIContext] HA MCP Enabled, initializing...');
                    setHaMcpRuntimeStatus('checking');
                    try {
                        const { prepareHomeAssistantMcpSession } = await import('../services/haMcpService');
                        preparedHomeAssistant = await prepareHomeAssistantMcpSession(
                            haMcpUrl,
                            await getHaMcpTokenAsync(),
                            { apiMode: haApiMode },
                        );
                        haClient = preparedHomeAssistant.client;
                        mcpTools = preparedHomeAssistant.tools;
                        console.log(`[LiveAPIContext] Loaded ${mcpTools.length} HA tools:`, preparedHomeAssistant.toolNames);
                        
                        if (mcpTools.length > 0) {
                            setHaMcpRuntimeStatus('connected');
                            // Group entities by domain and show friendly name → entity_id
                            haInstructionSuffix = preparedHomeAssistant.instructionSuffix;

                            /*
                            const domainSummary = Object.entries(byDomain)
                                .map(([domain, ents]) => {
                                    // Lights: show ALL so the AI can target any light by exact entity_id
                                    const limit = domain === 'light' ? Infinity : 50;
                                    const lines = ents.slice(0, limit).map(e =>
                                        `    • "${e.name}" → ${e.entity_id}${e.state ? ` [${e.state}]` : ''}`
                                    );
                                    if (ents.length > limit) lines.push(`    ... and ${ents.length - limit} more`);
                                    return `  [${domain.toUpperCase()}]\n${lines.join('\n')}`;
                                })
                                .join('\n\n');

                            // Flat list for quick reference
                            const flatList = entities.slice(0, 250)
                                .map(e => `"${e.name}" (${e.entity_id})`)
                                .join(', ');

                            haInstructionSuffix = `
 
 [HOME ASSISTANT CAPABILITIES]
 You can control the user's smart home via ${mcpTools.length} tools. 
- TOOLS NAMING: All tools are prefixed with "homeassistant__" followed by the domain and service (e.g. "homeassistant__light__turn_on", "homeassistant__switch__toggle").
- GENERIC TOOLS: Use "homeassistant__homeassistant__turn_on" or "homeassistant__homeassistant__turn_off" for general power control.
- VISION & CAMERA: To see things, you MUST call "toggleCamera(enabled: true)". You MUST NOT use Home Assistant camera tools for the robot's own vision.
- LOCAL CONTROLS: Use "toggleCamera" to see and "disconnectSession" to end the conversation.
 
 KNOWN DEVICES — use these EXACT entity_ids in tool calls:
 ${domainSummary || flatList || '(no entities found)'}
 
  FUZZY MATCHING RULES for Device Selection:
  1. HIGH CONTEXT: If you have an EXACT entity_id from the list above, use it. This is 10x faster and never fails.
  2. MATCHING: If the user says "the kitchen light", use the entity labeled "Kitchen Light" (light.kitchen_light). 
  3. PREFERRED TOOLS: Use "homeassistant__homeassistant__turn_on" or "homeassistant__homeassistant__turn_off" for generalized control of any device. They are more robust than domain-specific tools.
  4. AMBIGUITY: If there are multiple "Kitchen Lights" or the name is vague, ASK the user: "I see 3 kitchen lights, which one should I turn on?"
  5. NO MATCH: If a device is not in the list, don't guess blindly. Tell the user: "I couldn't find a device called X in your home, but I can see these categories: [list some domains]."
  6. STATE CHECKS: Always check the device state before and after if you're unsure of the result.
  7. SPEED: Your tool calls are now optimized. Precision avoids latency.`;
                            */
                        } else {
                            setHaMcpRuntimeStatus('error', 'No Home Assistant tools were returned.');
                        }
                    } catch (e: any) {
                        setHaMcpRuntimeStatus('error', e?.message || 'Failed to load Home Assistant tools.');
                        console.error('[LiveAPIContext] Failed to load HA MCP tools:', e);
                    }
            } else {
                resetHaMcpRuntimeStatus();
            }
            const modelName = getGeminiLiveModel();
            let client: any;

            if (offlineModeEnabled) {
                console.log('[LiveAPIContext] Initializing OfflineClient...');
                client = new OfflineClient();

                // Pass HA execution logic to the offline client if available
                if (haClient) {
                    client.executeTool = async (name: string, args: any) => {
                        console.log(`[LiveAPIContext] Offline calling HA tool: ${name}`, args);
                        try {
                            return await haClient!.callTool(name, args);
                        } catch (err) {
                            console.error(`[LiveAPIContext] Offline HA tool call failed: ${name}`, err);
                            throw err;
                        }
                    };
                    client.entityCache = haClient.entityCache;
                    // Pass actual discovered tool names for smart resolution
                    if (typeof (preparedHomeAssistant as any)?.toolNames !== 'undefined') {
                        client.toolNames = (preparedHomeAssistant as any).toolNames;
                    }
                }
                client.onmessage = (msg: any) => {
                    if (msg.serverContent?.modelDraft?.text !== undefined) {
                        setTranscript(msg.serverContent.modelDraft.text);
                        setUserTranscript(msg.serverContent.modelDraft.text);
                    }
                    if (client.isConnected) setIsConnected(true);
                    setIsSpeaking(client.isSpeaking);
                };
                client.onopen = () => setIsConnected(true);
                client.onclose = () => setIsConnected(false);
                client.onCardEvent = (event: CardEvent) => {
                    cardEventEmitterRef.current?.(event);
                };
            } else {
                client = new LiveClient(
                    apiKey || "",
                    (status: LiveState) => {
                        if (clientRef.current !== client) return;

                        if (status.isConnected) {
                            connectionStateRef.current = 'connected';
                            setIsConnecting(false);
                            setError(null);
                        } else if (connectionStateRef.current !== 'disconnecting') {
                            connectionStateRef.current = 'disconnected';
                            setIsConnected(false);
                        }

                        (window as any).__curioLiveApiActive = status.isConnected;
                        setIsConnected(status.isConnected);
                        setIsSpeaking(status.isSpeaking);
                        if (status.transcript !== undefined) {
                            setTranscript(status.transcript ?? null);
                        } else if (!status.isConnected) {
                            setTranscript(null);
                        }
                        if (status.userTranscript !== undefined) {
                            setUserTranscript(status.userTranscript ?? null);
                        }
                        if (status.modelTranscript !== undefined) {
                            setModelTranscript(status.modelTranscript ?? null);
                        }
                        if (!status.isConnected) {
                            setUserTranscript(null);
                            setModelTranscript(null);
                        }
                        if (status.error) {
                            setError(status.error);
                        }
                        if (status.transcriptHistory) {
                            setTranscriptHistory(status.transcriptHistory.map(item => ({
                                ...item,
                                speaker: item.speaker === 'ai' ? 'model' : 'user'
                            })));
                        }
                    },
                    modelName,                       // 3
                    mode,                            // 4
                    undefined,                       // 5 (_cachedContent)
                    (systemInstruction || "") + haInstructionSuffix, // 6 (systemInstruction)
                    forceNewSession ? null : (resumptionToken || null), // 7 (_previousSessionHandle)
                    voiceName,                       // 8
                    handler,                         // 9
                    mcpTools,                        // 10
                    haClient ? async (name: string, args: any) => { // 11
                        console.log(`[LiveAPIContext] AI calling HA tool: ${name}`, args);
                        try {
                            const res = await haClient!.callTool(name, args);
                            return res;
                        } catch (err) {
                            console.error(`[LiveAPIContext] HA tool call failed: ${name}`, err);
                            throw err;
                        }
                    } : undefined,
                    (event: CardEvent) => { cardEventEmitterRef.current?.(event); }, // 12 (onCardEvent)
                    haClient?.entityCache || [], // 13 (entityCache)
                    transcriptHistory // 14 (initialHistory)
                );
            }

            client.onResumptionTokenReceived = (token) => {
                setResumptionToken(token);
            };

            client.onResumptionFailed = () => {
                console.warn("[LiveAPIContext] Session handle expired. Reconnecting seamlessly...");
                setResumptionToken(null);
                localStorage.removeItem(SESSION_RESUMPTION_TOKEN_KEY);
                // Keep UI showing "connected" state during the seamless retry
                isReconnectingRef.current = true;
                setTimeout(async () => {
                    try {
                        await connect(mode, handler, systemInstruction, voiceName, initialMicStream, true);
                    } finally {
                        isReconnectingRef.current = false;
                    }
                }, 100);
            };

            clientRef.current = client;
            setClientInstance(client);
            client.muteMicWhileSpeaking = muteMicWhileAiSpeaking;
            client.clearVoiceEnabled = false;
            client.voiceGateThreshold = 0;
            await client.connect(initialMicStream);



            clearTimeout(connectionTimeout);
            setIsConnecting(false);
            if (connectionStateRef.current === 'connecting') {
                connectionStateRef.current = 'connected';
                (window as any).__curioLiveApiActive = true;
                setIsConnected(true);
            }

        } catch (err: any) {
            clearTimeout(connectionTimeout);
            console.error("LiveAPI Context Connection Error:", err);
            setError(err?.message || "Failed to connect to Live API");
            clientRef.current = null;
            setClientInstance(null);
            // Stop mic tracks before clearing the ref
            const leakedStream = audioStreamRef.current;
            if (leakedStream) {
                leakedStream.getTracks().forEach(track => {
                    track.stop();
                    track.enabled = false;
                });
            }
            audioStreamRef.current = null;
            finalizeDisconnectedState();
        }
    }, [
        disconnect,
        finalizeDisconnectedState,
        haMcpEnabled,
        haMcpToken,
        haMcpUrl,
        haApiMode,
        muteMicWhileAiSpeaking,
        normalizeInitialStreamForSession,
        resumptionToken,
        toggleCamera,
        offlineModeEnabled,
        transcriptHistory
    ]);

    const reconnectWithContext = useCallback(async (mode: LiveAppMode, handler?: any, systemInstruction?: string, voiceName?: string) => {
        if (isReconnectingRef.current) return;
        isReconnectingRef.current = true;
        try {
            await disconnect();
            // Wait for disconnect process to stabilize
            await new Promise(resolve => setTimeout(resolve, 500));
            await connect(mode, handler, systemInstruction, voiceName);
        } finally {
            isReconnectingRef.current = false;
        }
    }, [disconnect, connect]);

    const updateContext = useCallback(async (mode: LiveAppMode, handler?: any, systemInstruction?: string, voiceName?: string) => {
        await reconnectWithContext(mode, handler, systemInstruction, voiceName);
    }, [reconnectWithContext]);

    useEffect(() => {
        return () => {
            const client = clientRef.current;
            if (client) {
                client.disconnect().catch(e => console.error("Error disconnecting on unmount", e));
            }
            // Clean up offscreen elements that may have been lazily created
            if (offscreenVideoRef.current) {
                offscreenVideoRef.current.pause();
                offscreenVideoRef.current.srcObject = null;
                offscreenVideoRef.current = null;
            }
            offscreenCanvasRef.current = null;
            canvasCtxRef.current = null;
            // Revoke cached audio worklet blob URLs
            revokeProcessorBlobUrls();
        };
    }, []);

    useEffect(() => {
        if (!isSpeaking) {
            lastSpeechEndedAtRef.current = Date.now();
        }
    }, [isSpeaking]);

    const value = useMemo(() => ({
        isConnected,
        isConnecting,
        isSpeaking,
        error,
        client: clientInstance,
        transcript,
        userTranscript,
        modelTranscript,
        transcriptHistory,
        globalMode,
        setGlobalMode,
        globalNavigate,
        setGlobalNavigate,
        connect,
        disconnect,
        reconnectWithContext,
        updateContext,
        unlockAudio: unlockAudioContext,
        primeCameraPermission,
        primeMicrophonePermission,
        primeAllPermissions,
        cameraEnabled,
        userFacingCamera,
        showCameraPreview,
        mediaStream,
        setCameraEnabled,
        setShowCameraPreview,
        toggleCamera,
        flipCamera,
        isMuted,
        setIsMuted,
        resumptionToken,
        resetSession,
    }), [
        isConnected, isConnecting, isSpeaking, error, clientInstance,
        transcript, userTranscript, modelTranscript, transcriptHistory, globalMode, globalNavigate,
        connect, disconnect, reconnectWithContext, updateContext,
        primeCameraPermission, primeMicrophonePermission, primeAllPermissions,
        cameraEnabled, userFacingCamera, showCameraPreview, mediaStream,
        toggleCamera, flipCamera, isMuted, resumptionToken, resetSession
    ]);

    return (
        <LiveAPIContext.Provider value={value}>
            <CardManagerProvider>
                <TimerTickProvider>
                    <CardEventBridge emitterRef={cardEventEmitterRef} />
                    {children}
                    <CardStack />
                </TimerTickProvider>
            </CardManagerProvider>
        </LiveAPIContext.Provider>
    );
};

// Bridge component that connects CardManagerContext's emitCardEvent to the ref
const CardEventBridge: React.FC<{ emitterRef: React.MutableRefObject<((event: CardEvent) => void) | null> }> = ({ emitterRef }) => {
    const { emitCardEvent } = useCardManager();
    useEffect(() => {
        emitterRef.current = emitCardEvent;
        // Register debug emitter for console testing (dev only)
        import('../services/cardDebug').then(({ setDebugEmitter }) => {
            setDebugEmitter(emitCardEvent);
        }).catch(() => {});
        return () => {
            emitterRef.current = null;
            import('../services/cardDebug').then(({ setDebugEmitter }) => {
                setDebugEmitter(null);
            }).catch(() => {});
        };
    }, [emitCardEvent, emitterRef]);
    return null;
};

export const useLiveAPI = () => {
    const context = useContext(LiveAPIContext);
    if (context === undefined) {
        throw new Error('useLiveAPI must be used within a LiveAPIProvider');
    }
    return context;
};

