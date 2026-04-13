/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import type { ReactNode } from 'react';
import { createLiveAPIStateMachine, LiveAPIStateMachine } from './LiveAPIStateMachine';
import { getSharedAudioContext, lockAudioSuspend, unlockAudioSuspend } from './audioContext';
import { decodeBase64ToBytes, encodeBytesToBase64 } from './audioBinary';
import { createPcmCaptureWorkletNode } from './audioWorkletCapture';
import type { LiveModuleMode } from './liveSessionConfig';
import { interceptToolCall } from './cardInterceptor';
import { analyzeTranscript, analyzeTranscriptAsync } from './transcriptAnalyzer';
import type { CardEvent } from './cardTypes';
import { searchMusic } from './musicSearchService';
import { musicPlaybackService, toMusicCardData } from './musicPlaybackService';
import { getPersistedAlarms, setPersistedAlarms, getHaMcpUrl, getHaMcpTokenAsync } from '../utils/settingsStorage';

/**
 * Linear Downsampler: Converts audio from native hardware rate to 16kHz
 * Pre-allocates output buffer to avoid GC pressure on low-end devices.
 */
let _dsBuffer: Float32Array | null = null;
function downsampleBuffer(buffer: Float32Array, fromRate: number, toRate: number = 16000): Float32Array {
    if (fromRate === toRate) return buffer;
    const ratio = fromRate / toRate;
    const newLength = Math.floor(buffer.length / ratio);
    if (!_dsBuffer || _dsBuffer.length !== newLength) {
        _dsBuffer = new Float32Array(newLength);
    }
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < _dsBuffer.length) {
        const nextOffsetBuffer = Math.floor((offsetResult + 1) * ratio);
        let accum = 0;
        let count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }
        _dsBuffer[offsetResult] = count > 0 ? accum / count : 0;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return _dsBuffer;
}

let _pcmBuffer: Int16Array | null = null;
const floatTo16BitPcm = (float32Array: Float32Array): Int16Array => {
    if (!_pcmBuffer || _pcmBuffer.length !== float32Array.length) {
        _pcmBuffer = new Int16Array(float32Array.length);
    }
    for (let i = 0; i < float32Array.length; i++) {
        const s = Math.max(-1, Math.min(1, float32Array[i]));
        _pcmBuffer[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return _pcmBuffer;
};

const mergeTranscriptChunk = (current: string, incoming: string): string => {
    const next = incoming || '';
    if (!current) return next;
    if (!next) return current;

    // Full containment — the API often re-sends the full transcript
    if (next.startsWith(current)) return next;
    if (current.startsWith(next)) return current;

    // Overlap detection — find the longest suffix of current that matches a prefix of next
    const maxOverlap = Math.min(current.length, next.length);
    for (let overlap = maxOverlap; overlap > 0; overlap--) {
        if (current.slice(-overlap) === next.slice(0, overlap)) {
            return current + next.slice(overlap);
        }
    }

    // No overlap found — the API sometimes sends fragments that continue mid-word.
    // If current ends with a partial word (no trailing space/punctuation) and next
    // starts with a lowercase letter, join directly (no space) to avoid "wha t" splits.
    const currentEndsClean = /[\s.,!?;:)\]"']$/.test(current);
    const nextStartsLower = /^[a-z]/.test(next);
    if (!currentEndsClean && nextStartsLower) {
        return current + next;
    }

    const needsSpace = /[A-Za-z0-9]$/.test(current) && /^[A-Za-z0-9]/.test(next);
    return `${current}${needsSpace ? ' ' : ''}${next}`;
};

const sanitizeToolResultForModel = (result: any): any => {
    if (!result || typeof result !== 'object' || Array.isArray(result)) {
        return result;
    }

    // Strip internal __curio metadata
    let sanitized = result;
    if ('__curio' in sanitized) {
        const { __curio: _ignored, ...rest } = sanitized;
        sanitized = rest;
    }

    // Flatten MCP-style { content: [{ type: 'text', text: '...' }] } into plain text.
    // Gemini 3.1 struggles to extract answers from deeply nested content arrays,
    // especially for search results where it needs to read and summarize the text.
    if (Array.isArray(sanitized.content)) {
        const textParts = sanitized.content
            .filter((c: any) => c?.type === 'text' && c?.text)
            .map((c: any) => c.text);
        if (textParts.length > 0) {
            return { output: textParts.join('\n'), isError: sanitized.isError ?? false };
        }
    }

    return sanitized;
};

const emitMusicCardEvent = (
    onCardEvent: ((event: CardEvent) => void) | undefined,
    snapshot: ReturnType<typeof musicPlaybackService.getState>
) => {
    if (!onCardEvent) {
        return false;
    }

    const cardData = toMusicCardData(snapshot);
    if (!cardData) {
        return false;
    }

    try {
        onCardEvent({
            type: 'music',
            data: cardData as unknown as Record<string, unknown>,
            persistent: true,
        });
        return true;
    } catch {
        return false;
    }
};

const EXPLICIT_VIDEO_INTENT_PATTERNS = [
    /\bmusic video\b/i,
    /\byoutube video\b/i,
    /\bofficial video\b/i,
    /\bvideo on youtube\b/i,
    /\bwatch\b/i,
    /\bshow me (?:the )?video\b/i,
];

const isExplicitVideoIntent = (query: string): boolean =>
    EXPLICIT_VIDEO_INTENT_PATTERNS.some((pattern) => pattern.test(query));

const normalizeVideoSearchQuery = (query: string): string =>
    query
        .replace(/^\s*(?:please\s+)?(?:play|watch|show|find|open)\s+/i, '')
        .replace(/\s+on youtube\s*$/i, '')
        .trim();

const VISION_REQUEST_PATTERNS = [
    /\bwhat do you see\b/i,
    /\bwhat(?:'s| is) (?:this|that)\b/i,
    /\bwhat(?:'s| is) in my hand\b/i,
    /\bwhat am i holding\b/i,
    /\bwhat am i showing\b/i,
    /\bcan you see\b/i,
    /\bdo you see\b/i,
    /\bsee what (?:i am|i'm) holding\b/i,
    /\blook at (?:this|that|my)\b/i,
    /\blook (?:here|closely)\b/i,
    /\btell me what you see\b/i,
    /\bdescribe (?:this|that|what you see)\b/i,
    /\bidentify (?:this|that)\b/i,
    /\bwhat color is (?:this|that|it)\b/i,
    /\bwhat is this in my hand\b/i,
    /\bwhat (?:object|item) is this\b/i,
    /\bwhat am i holding up\b/i,
    /\bwhat am i pointing at\b/i,
    /\bread (?:this|that|it)\b/i,
];

// Words that indicate the user is NOT asking about vision even if other hints match
const VISION_EXCLUDE_PATTERNS = [
    /\bweather\b/i,
    /\btemperature\b/i,
    /\bforecast\b/i,
    /\btimer\b/i,
    /\balarm\b/i,
    /\btime\b/i,
    /\bmusic\b/i,
    /\bsong\b/i,
    /\blight\b/i,
    /\bswitch\b/i,
    /\bdevice\b/i,
    /\bremind\b/i,
    /\bcalculate\b/i,
    /\bjoke\b/i,
    /\bstory\b/i,
    /\bnews\b/i,
];

const VISION_OBJECT_HINTS = [
    'hand',
    'holding',
    'hold',
    'object',
    'item',
    'card',
    'label',
    'color',
    'face',
    'room',
];

const isVisionRequest = (text: string): boolean => {
    // First check exclusions — if the text is about weather, devices, etc., it's NOT vision
    if (VISION_EXCLUDE_PATTERNS.some((pattern) => pattern.test(text))) {
        return false;
    }
    // Check explicit vision patterns
    if (VISION_REQUEST_PATTERNS.some((pattern) => pattern.test(text))) {
        return true;
    }
    // Fallback: only trigger if text mentions physical objects (not "show me X" generically)
    const normalized = text.toLowerCase();
    const hasVisionObject = VISION_OBJECT_HINTS.some((token) => normalized.includes(token));
    const hasExplicitLook = /\b(look|see|show me what|describe what)\b/i.test(text);
    return hasVisionObject && hasExplicitLook;
};

const DEFAULT_MODEL_NAME = 'gemini-3.1-flash-live-preview';

export interface LiveState {
    isConnected: boolean;
    isSpeaking: boolean;
    error: string | null;
    transcript?: string | null;
    userTranscript?: string | null;
    modelTranscript?: string | null;
    transcriptHistory?: Array<{ speaker: 'user' | 'ai'; text: string }>;
}

export interface BaseToolHandler {
    notifyAiState: (label: string, icon?: ReactNode, autoClear?: boolean) => void;
    getAppState: () => any;
    toggleCamera?: (enabled: boolean) =>
        | Promise<{
              success: boolean;
              enabled: boolean;
              error?: string;
              frameReady?: boolean;
              framesCaptured?: number;
          }>
        | { success: boolean; enabled: boolean; error?: string; frameReady?: boolean; framesCaptured?: number };
}

export interface HomeToolHandler extends BaseToolHandler {
    getAvailableSubjects: () => string[];
    navigateToSubject: (subject: string) => void;
    get_weather?: (city?: string) => Promise<any> | any;
}

export type AnyToolHandler = HomeToolHandler;
export type { LiveModuleMode } from './liveSessionConfig';
export { SUBJECT_CONFIG } from './liveSessionConfig';

export class LiveClient {
    private ai: GoogleGenAI;
    private mediaStream: MediaStream | null = null;
    private inputSource: MediaStreamAudioSourceNode | null = null;
    private processor: AudioWorkletNode | null = null;
    private audioContext: AudioContext | null = null;
    private filterChainHead: AudioNode | null = null;
    public analyserNode: AnalyserNode | null = null;
    public clearVoiceEnabled: boolean = true;
    public voiceGateThreshold: number = 0;
    private nextStartTime: number = 0;
    private lastPlaybackEndTime: number = 0;
    private scheduledSources: AudioBufferSourceNode[] = [];
    private statusCallback: (status: LiveState) => void;
    private session: any = null;
    public mode: LiveModuleMode;
    private stateMachine: LiveAPIStateMachine;
    private _voiceName?: string;
    private lastStatus: LiveState | null = null;
    private transcriptHistory: Array<{ speaker: 'user' | 'ai'; text: string }> = [];
    private pendingUserTranscript: string = '';
    private pendingAssistantTranscript: string = '';
    public mcpTools: FunctionDeclaration[] = [];
    public onMcpToolCall?: (name: string, args: any) => Promise<any>;
    private visionAssistQuestion = '';
    private visionAssistInFlight = false;
    private visionAssistPromptSentForTurn = false;
    private visionAssistDebounceTimer: number | null = null;
    private turnHadToolCall = false;
    public muteMicWhileSpeaking: boolean = false;
    public isMuted: boolean = false;
    private _duckBuffer: Float32Array | null = null;
    private _streamingCardEmitted = false;
    private _modelName: string;
    private _previousSessionHandle: string | null = null;
    public onResumptionTokenReceived?: (token: string) => void;
    public onResumptionFailed?: () => void;
    private _historySeeded = false;
    private _startedWithHandle = false;
    private _userTurnCount = 0; // counts completed user turns — used to detect replayed tool calls

    // HA camera streaming to model
    private _haCameraInterval: number | null = null;
    private _haCameraEntityId: string | null = null;
    private _haCameraBaseUrl: string | null = null;
    private _haCameraToken: string | null = null;
    private _haCameraClosedHandler: (() => void) | null = null;
    private _haCameraSwitchHandler: ((e: Event) => void) | null = null;
    private _deviceCameraWasOn = false; // track if device camera was on before HA camera took over

    /** Whether an HA camera stream is currently active */
    get isHaCameraStreaming(): boolean {
        return this._haCameraInterval !== null || this._haCameraEntityId !== null;
    }

    constructor(
        apiKey: string,
        onStatusChange: (status: LiveState) => void,
        modelName?: string,
        mode: LiveModuleMode = 'global',
        _cachedContent?: string,
        private systemInstruction?: string,
        previousSessionHandle: string | null = null,
        voiceName?: string,
        private handler?: AnyToolHandler,
        mcpTools: FunctionDeclaration[] = [],
        onMcpToolCall?: (name: string, args: any) => Promise<any>,
        public onCardEvent?: (event: CardEvent) => void,
        public entityCache?: any[],
        private initialHistory?: Array<{ speaker: 'user' | 'model', text: string }>
    ) {
        const cleanApiKey = (apiKey || '').trim();
        const cleanModelName = (modelName || DEFAULT_MODEL_NAME).trim();
        this.ai = new GoogleGenAI({ apiKey: cleanApiKey });
        this.statusCallback = onStatusChange;
        this.mode = mode;
        this._modelName = cleanModelName;
        this._voiceName = voiceName;
        this._previousSessionHandle = previousSessionHandle;
        this._startedWithHandle = !!previousSessionHandle;
        this._userTurnCount = previousSessionHandle ? 0 : 1; // Fresh sessions start at 1 (no replay risk); resumed start at 0
        this.mcpTools = mcpTools;
        this.onMcpToolCall = onMcpToolCall;
        this.handler = handler;
        this.stateMachine = createLiveAPIStateMachine();
        this.stateMachine.onStateChange((newState, previousState) => {
            console.log(`[LiveClient] State: ${previousState} -> ${newState}`);
            if (newState === 'connected') {
                this.onStatusChange({ isConnected: true, isSpeaking: false, error: null });
            } else if (newState === 'disconnected') {
                this.onStatusChange({ isConnected: false, isSpeaking: false, error: null });
            } else if (newState === 'error') {
                this.onStatusChange({
                    isConnected: false,
                    isSpeaking: false,
                    error: this.stateMachine.getLastError()?.message || 'Error',
                });
            }
        });
    }

    private onStatusChange(status: LiveState) {
        this.lastStatus = status;
        this.statusCallback(status);
    }

    private clearVisionAssistState() {
        if (this.visionAssistDebounceTimer !== null) {
            window.clearTimeout(this.visionAssistDebounceTimer);
            this.visionAssistDebounceTimer = null;
        }
        this.visionAssistQuestion = '';
        this.visionAssistInFlight = false;
        this.visionAssistPromptSentForTurn = false;
    }

    private scheduleVisionAssist(userText: string) {
        if (!this.handler?.toggleCamera) return;
        const normalizedQuestion = userText.trim();
        if (!normalizedQuestion || !isVisionRequest(normalizedQuestion)) return;
        this.visionAssistQuestion = normalizedQuestion;
        this.pendingAssistantTranscript = '';
        this.stopAudio();
        this.onStatusChange({
            ...this.lastStatus!,
            transcript: this.pendingUserTranscript,
            transcriptHistory: [...this.transcriptHistory],
        });
        if (this.visionAssistPromptSentForTurn || this.visionAssistInFlight) return;
        if (this.visionAssistDebounceTimer !== null) {
            window.clearTimeout(this.visionAssistDebounceTimer);
            this.visionAssistDebounceTimer = null;
        }
        void this.runVisionAssist();
    }

    private async runVisionAssist() {
        if (!this.session) return;
        if (!this.visionAssistQuestion || this.visionAssistInFlight || this.visionAssistPromptSentForTurn) return;
        this.visionAssistInFlight = true;
        try {
            if (!this.session) return;
            const session = await this.session;
            this.stopAudio();

            // If an HA camera is actively streaming frames, use that feed — don't open the device camera.
            if (this._haCameraInterval) {
                session.sendRealtimeInput({
                    text: `The user just asked a vision question: "${this.visionAssistQuestion}". A Home Assistant camera feed is currently streaming frames to you. Answer that exact question using only the current camera feed you are receiving. If the image is unclear, say so instead of guessing. Do NOT open the device camera.`,
                });
                this.visionAssistPromptSentForTurn = true;
                return;
            }

            // No HA camera active — fall back to device camera
            if (!this.handler?.toggleCamera) return;
            const cameraResult = await this.handler.toggleCamera(true);
            if (!this.session) return;
            if (cameraResult?.success) {
                session.sendRealtimeInput({
                    text: `The user just asked a vision question: "${this.visionAssistQuestion}". Fresh live camera frames are available now. Answer that exact question using only the current camera feed. If the image is unclear, say so instead of guessing.`,
                });
            } else {
                session.sendRealtimeInput({
                    text: `The user asked a vision question: "${this.visionAssistQuestion}". The camera is not ready: ${cameraResult?.error || 'no fresh frame available'}. Tell the user you could not get a clear camera view and ask them to try again.`,
                });
            }
            this.visionAssistPromptSentForTurn = true;
        } catch (error) {
            console.warn('[LiveClient] Vision assist failed:', error);
        } finally {
            this.visionAssistInFlight = false;
        }
    }

    async connect(audioStream?: MediaStream) {
        try {
            await this.stateMachine.connect();
            // Google Search grounding — only on 2.5 (3.1 uses HA search instead)
            const useGoogleSearch = !this._modelName.includes('3.1');
            const toolsArray: any[] = [];
            if (useGoogleSearch) {
                toolsArray.push({ googleSearch: {} });
                console.log('[LiveClient] Google Search grounding ENABLED for model:', this._modelName);
            } else {
                console.log('[LiveClient] Google Search grounding DISABLED for model:', this._modelName, '— using HA MCP search tools');
            }
            toolsArray.push({
                functionDeclarations: ([
                    {
                        name: 'show_finance_card',
                        description: 'Displays a visual finance card. ONLY call this AFTER you have used search tools (like googleSearch or assist_search_google) to find the exact, current stock/crypto prices. Do NOT guess or use zero values. You MUST pass the actual found price and change.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                symbol: { type: Type.STRING, description: 'Ticker symbol' },
                                name: { type: Type.STRING, description: 'Asset name' },
                                price: { type: Type.NUMBER, description: 'Current price' },
                                change: { type: Type.NUMBER, description: 'Price change amount' },
                                changePercent: { type: Type.NUMBER, description: 'Percentage change' },
                                marketCap: { type: Type.STRING, description: 'Market capitalization' },
                                currency: { type: Type.STRING, description: 'Currency (e.g. USD)' }
                            },
                            required: ['symbol', 'price', 'change', 'changePercent']
                        }
                    },
                    {
                        name: 'get_financial_data',
                        description: 'Fetches real-time price, change, and market data for stocks or crypto. ALWAYS use this BEFORE calling show_finance_card if you need reliable market data. Pass a standard ticker symbol.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                symbol: { type: Type.STRING, description: 'Ticker symbol (e.g., AAPL, BTC-USD, MSFT)' },
                            },
                            required: ['symbol']
                        }
                    },
                    {
                        name: 'toggleCamera',
                        description: 'Turns the camera on or off for visual recognition and vision tasks.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                enabled: {
                                    type: Type.BOOLEAN,
                                    description: 'Whether to enable the camera (true) or disable it (false).',
                                },
                            },
                            required: ['enabled'],
                        },
                    },
                    {
                        name: 'disconnectSession',
                        description: 'Ends the current voice session. ONLY call this when the user EXPLICITLY asks to disconnect, end the session, or says goodbye. NEVER call this automatically after completing a task like playing music, setting a timer, or answering a question.',
                    },
                    {
                        name: 'setTimer',
                        description: 'Sets a timer or countdown for the user. Use this when the user asks to set a timer, countdown, or alarm. The timer will be displayed on screen with a visual countdown.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                durationSeconds: {
                                    type: Type.NUMBER,
                                    description: 'Duration of the timer in seconds.',
                                },
                                label: {
                                    type: Type.STRING,
                                    description: 'A short label for the timer (e.g., "Cooking Timer", "5 Minute Break").',
                                },
                                isAlarm: {
                                    type: Type.BOOLEAN,
                                    description: 'Whether this is an alarm (true) or a regular timer (false). Alarms play a sound and greet the user when they go off.',
                                },
                            },
                            required: ['durationSeconds'],
                        },
                    },
                    {
                        name: 'saveNote',
                        description: 'Saves a note or something the user wants to remember. Use this when the user says "remember this", "write a note", "save this", "note that", or asks you to remember something.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                text: {
                                    type: Type.STRING,
                                    description: 'The note text to save.',
                                },
                                category: {
                                    type: Type.STRING,
                                    description: 'Optional category like "shopping", "idea", "todo", "general".',
                                },
                            },
                            required: ['text'],
                        },
                    },
                    {
                        name: 'getMyNotes',
                        description: 'Retrieves all saved notes. Use this when the user asks "what are my notes?", "what did I ask you to remember?", "show my notes".',
                    },
                    {
                        name: 'setReminder',
                        description: 'Sets a reminder for the user. Use this when the user says "remind me to...", "set a reminder for...", or "don\'t let me forget to...".',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                text: {
                                    type: Type.STRING,
                                    description: 'What to remind the user about.',
                                },
                                timeDescription: {
                                    type: Type.STRING,
                                    description: 'When to remind them, in natural language (e.g., "in 30 minutes", "at 5 PM", "tomorrow morning").',
                                },
                                dueDateTime: {
                                    type: Type.STRING,
                                    description: 'RFC 3339 timestamp for when the task is due, expressed in the user\'s local timezone using the UTC offset from the system prompt (e.g., "2026-04-08T20:00:00-07:00"). Always include the UTC offset, never use "Z" (UTC) unless the offset is +00:00.',
                                },
                            },
                            required: ['text'],
                        },
                    },
                    {
                        name: 'getMyReminders',
                        description: 'Retrieves all active reminders. Use this when the user asks "what are my reminders?", "what do I need to do?".',
                    },
                    {
                        name: 'cancelTimer',
                        description: 'Cancels an active timer or alarm. Use when the user says "cancel the timer", "stop the alarm", "never mind the timer".',
                    },
                    {
                        name: 'play_music',
                        description: 'Searches YouTube for a song and starts in-app music playback. Use this for requests like "play Bohemian Rhapsody", "play jazz music", or "put on a song".',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                query: {
                                    type: Type.STRING,
                                    description: 'The song, artist, or music query to search for.',
                                },
                            },
                            required: ['query'],
                        },
                    },
                    {
                        name: 'pause_music',
                        description: 'Pauses the currently playing in-app music track.',
                    },
                    {
                        name: 'resume_music',
                        description: 'Resumes the currently paused or ready in-app music track.',
                    },
                    {
                        name: 'stop_music',
                        description: 'Stops the current in-app music playback and clears the compact player.',
                    },
                    {
                        name: 'get_music_state',
                        description: 'Returns the current in-app music playback state, active track metadata, and whether music is currently available to control.',
                    },
                    {
                        name: 'get_weather',
                        description: 'Retrieves real-time weather, location, air quality (AQI), and 7-day forecast. Without a city parameter, returns the user\'s local weather. With a city parameter, fetches weather for that specific city. Includes humidity, wind speed, and daily forecasts with high/low temps. When the user asks about future weather or forecasts, include the daily forecast data in your response.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                city: {
                                    type: Type.STRING,
                                    description: 'Optional city name to get weather for (e.g., "Tokyo", "London", "New York"). If omitted, returns the user\'s local weather.',
                                },
                                forecast: {
                                    type: Type.BOOLEAN,
                                    description: 'Set to true when the user asks about future weather, forecasts, tomorrow, this week, or upcoming days. Shows a larger 5-day forecast card.',
                                },
                            },
                        },
                    },
                    {
                        name: 'show_calendar',
                        description: 'Shows a calendar card with upcoming events. Use when user asks about their schedule, calendar, or upcoming events.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                date: { type: Type.STRING, description: 'Date string (e.g., "Today", "Tomorrow", "April 10")' },
                                events: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            title: { type: Type.STRING, description: 'Event title' },
                                            startTime: { type: Type.STRING, description: 'Start time' },
                                            endTime: { type: Type.STRING, description: 'End time' },
                                            location: { type: Type.STRING, description: 'Location' },
                                            allDay: { type: Type.BOOLEAN, description: 'Whether all-day event' },
                                        },
                                        required: ['title', 'startTime'],
                                    },
                                },
                            },
                            required: ['events'],
                        },
                    },
                    {
                        name: 'set_alarm',
                        description: 'Sets a recurring or one-time alarm. Use when user says "set an alarm for 7 AM", "wake me up at 6".',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                time: { type: Type.STRING, description: 'Alarm time in HH:mm 24h format (e.g., "07:00", "22:30")' },
                                label: { type: Type.STRING, description: 'Label for the alarm' },
                                days: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Days to repeat (e.g., ["Mon","Tue","Wed"]). Empty for one-time.' },
                            },
                            required: ['time'],
                        },
                    },
                    {
                        name: 'get_alarms',
                        description: 'Shows all saved alarms. Use when user says "show my alarms", "what alarms do I have", "open alarms".',
                    },
                    {
                        name: 'delete_alarm',
                        description: 'Deletes an alarm by its label or time. Use when user says "delete the 7 AM alarm", "remove my morning alarm".',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                alarmId: { type: Type.STRING, description: 'The alarm ID to delete' },
                                label: { type: Type.STRING, description: 'Label of alarm to delete (fuzzy match)' },
                                time: { type: Type.STRING, description: 'Time of alarm to delete (HH:mm)' },
                            },
                        },
                    },
                    {
                        name: 'show_directions',
                        description: 'Shows a directions/map card. Use when user asks "how do I get to...", "directions to...", "navigate to...".',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                destination: { type: Type.STRING, description: 'Destination address or place' },
                                origin: { type: Type.STRING, description: 'Starting point (default: current location)' },
                                travelMode: { type: Type.STRING, description: 'Travel mode: driving, walking, transit, bicycling' },
                                distance: { type: Type.STRING, description: 'Estimated distance' },
                                duration: { type: Type.STRING, description: 'Estimated travel time' },
                                steps: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { instruction: { type: Type.STRING }, distance: { type: Type.STRING } }, required: ['instruction', 'distance'] } },
                                mapUrl: { type: Type.STRING, description: 'URL to open in maps app' },
                            },
                            required: ['destination'],
                        },
                    },
                    {
                        name: 'show_air_quality',
                        description: 'Shows an air quality card. Use when user asks about air quality, AQI, pollution levels.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                aqi: { type: Type.NUMBER, description: 'AQI value' },
                                category: { type: Type.STRING, description: 'Category (Good, Moderate, Unhealthy, etc.)' },
                                pollutant: { type: Type.STRING, description: 'Primary pollutant' },
                                pm25: { type: Type.NUMBER, description: 'PM2.5 level' },
                                pm10: { type: Type.NUMBER, description: 'PM10 level' },
                                o3: { type: Type.NUMBER, description: 'Ozone level' },
                                no2: { type: Type.NUMBER, description: 'NO2 level' },
                                advice: { type: Type.STRING, description: 'Health advice' },
                            },
                            required: ['aqi', 'category'],
                        },
                    },
                    {
                        name: 'show_joke',
                        description: 'Shows a joke card with setup and punchline reveal. Use when user asks for a joke. Read the setup aloud, then pause briefly to let the user tap "Reveal Punchline" on the card, or read the punchline yourself after a beat.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                setup: { type: Type.STRING, description: 'The joke setup' },
                                punchline: { type: Type.STRING, description: 'The punchline' },
                                category: { type: Type.STRING, description: 'Joke category' },
                            },
                            required: ['setup', 'punchline'],
                        },
                    },
                    {
                        name: 'show_trivia',
                        description: 'Shows an interactive trivia/quiz card. Use when user asks for trivia, quiz, or "test my knowledge". IMPORTANT: After calling this tool, you MUST read the question aloud and list the answer options (A, B, C, D) so the user can hear them. Wait for the user to answer before revealing the correct one.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING, description: 'The trivia question' },
                                options: { type: Type.ARRAY, items: { type: Type.STRING }, description: '4 answer options' },
                                correctIndex: { type: Type.NUMBER, description: 'Index of correct answer (0-3)' },
                                explanation: { type: Type.STRING, description: 'Explanation of the answer' },
                                category: { type: Type.STRING, description: 'Category (Science, History, etc.)' },
                            },
                            required: ['question', 'options', 'correctIndex'],
                        },
                    },
                    {
                        name: 'show_unit_conversion',
                        description: 'Shows a unit conversion card. Use when user asks "how many cups in a liter", "convert 5 miles to km".',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                fromValue: { type: Type.NUMBER, description: 'Original value' },
                                fromUnit: { type: Type.STRING, description: 'Original unit' },
                                toValue: { type: Type.NUMBER, description: 'Converted value' },
                                toUnit: { type: Type.STRING, description: 'Target unit' },
                                category: { type: Type.STRING, description: 'Category (length, weight, temperature, volume, speed, area, time, data)' },
                            },
                            required: ['fromValue', 'fromUnit', 'toValue', 'toUnit', 'category'],
                        },
                    },
                    {
                        name: 'show_definition',
                        description: 'Shows a word definition card. Use when user asks "define X", "what does X mean", "definition of X". Always use this tool instead of just speaking the definition.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                word: { type: Type.STRING, description: 'The word being defined' },
                                pronunciation: { type: Type.STRING, description: 'Phonetic pronunciation (e.g., "/ˈkjʊəriəs/")' },
                                partOfSpeech: { type: Type.STRING, description: 'Part of speech (noun, verb, adjective, etc.)' },
                                definition: { type: Type.STRING, description: 'The definition text' },
                            },
                            required: ['word', 'definition'],
                        },
                    },
                    {
                        name: 'show_calculation',
                        description: 'Shows a calculation/math result card. Use for ANY math question: "what is 5 + 3", "calculate 15% of 200", "square root of 144". Always use this tool for math.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                equation: { type: Type.STRING, description: 'The math expression (e.g., "5 + 3", "15% of 200")' },
                                result: { type: Type.STRING, description: 'The computed result' },
                            },
                            required: ['equation', 'result'],
                        },
                    },
                    {
                        name: 'show_translation',
                        description: 'Shows a translation card. Use when user asks "how do you say X in Spanish", "translate X to French", or any translation request. Always use this tool for translations.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                originalText: { type: Type.STRING, description: 'The original text' },
                                translatedText: { type: Type.STRING, description: 'The translated text' },
                                sourceLanguage: { type: Type.STRING, description: 'Source language (e.g., "English")' },
                                targetLanguage: { type: Type.STRING, description: 'Target language (e.g., "Spanish")' },
                            },
                            required: ['originalText', 'translatedText', 'sourceLanguage', 'targetLanguage'],
                        },
                    },
                    {
                        name: 'show_sports_score',
                        description: 'Shows a sports score card. Use when user asks about game scores, match results, "what was the score of the game", "who won the match". Search for the latest score first, then display it.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                homeTeam: { type: Type.STRING, description: 'Home team name' },
                                awayTeam: { type: Type.STRING, description: 'Away team name' },
                                homeScore: { type: Type.NUMBER, description: 'Home team score' },
                                awayScore: { type: Type.NUMBER, description: 'Away team score' },
                                status: { type: Type.STRING, description: 'Game status (e.g., "Final", "In Progress", "Q3 5:42", "Half-time")' },
                                homeLogoUrl: { type: Type.STRING, description: 'URL of home team logo image (optional)' },
                                awayLogoUrl: { type: Type.STRING, description: 'URL of away team logo image (optional)' },
                            },
                            required: ['homeTeam', 'awayTeam', 'homeScore', 'awayScore', 'status'],
                        },
                    },
                    {
                        name: 'show_quote',
                        description: 'Shows a quote card. Use when user asks for a quote, "give me a quote", "inspirational quote", or when you share a famous quote. Always use this tool instead of just speaking the quote.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                quote: { type: Type.STRING, description: 'The quote text' },
                                author: { type: Type.STRING, description: 'Who said it' },
                            },
                            required: ['quote', 'author'],
                        },
                    },
                    {
                        name: 'show_fun_fact',
                        description: 'Shows a fun fact card. Use when you share a fun fact, "did you know" moment, or interesting trivia fact. Also use when user asks "tell me a fun fact", "tell me something interesting". Always use this tool instead of just speaking the fact.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                fact: { type: Type.STRING, description: 'The fun fact text' },
                            },
                            required: ['fact'],
                        },
                    },
                    {
                        name: 'show_recipe',
                        description: 'Shows a recipe card with ingredients and step-by-step instructions. ALWAYS use this tool when the user asks for a recipe, how to cook something, or food preparation instructions. Provide complete ingredients list and detailed steps.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: 'Recipe name (e.g., "Chicken Parmesan")' },
                                ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of ingredients with quantities (e.g., "2 cups flour", "1 lb chicken breast")' },
                                steps: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Step-by-step cooking instructions' },
                            },
                            required: ['title', 'ingredients', 'steps'],
                        },
                    },
                    {
                        name: 'show_astronomy',
                        description: 'Shows astronomy info card (sunrise, sunset, moon phase, etc.). Use when user asks about sunrise, sunset, moon, astronomy.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                sunrise: { type: Type.STRING, description: 'Sunrise time' },
                                sunset: { type: Type.STRING, description: 'Sunset time' },
                                moonPhase: { type: Type.STRING, description: 'Moon phase name' },
                                moonIllumination: { type: Type.NUMBER, description: 'Moon illumination percentage' },
                                dayLength: { type: Type.STRING, description: 'Length of day' },
                                goldenHour: { type: Type.STRING, description: 'Golden hour time' },
                                nextEvent: { type: Type.STRING, description: 'Next astronomical event' },
                                nextEventTime: { type: Type.STRING, description: 'Time of next event' },
                            },
                        },
                    },
                    {
                        name: 'show_commute',
                        description: 'Shows a commute/traffic card. Use when user asks about commute, traffic, "how long to get to work".',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                origin: { type: Type.STRING, description: 'Starting point' },
                                destination: { type: Type.STRING, description: 'Destination' },
                                duration: { type: Type.STRING, description: 'Normal duration' },
                                durationInTraffic: { type: Type.STRING, description: 'Duration with current traffic' },
                                distance: { type: Type.STRING, description: 'Distance' },
                                trafficCondition: { type: Type.STRING, description: 'Traffic: light, moderate, heavy, unknown' },
                                route: { type: Type.STRING, description: 'Route name' },
                                departureTime: { type: Type.STRING, description: 'Suggested departure time' },
                            },
                            required: ['origin', 'destination', 'duration', 'distance', 'trafficCondition'],
                        },
                    },
                    {
                        name: 'show_camera',
                        description: 'Shows a Home Assistant camera feed card AND streams frames for vision analysis. Use when user asks "what do you see at the front door?", "show me the garage camera", "what\'s happening in the backyard?", "check the doorbell". If a camera is already showing, calling this again switches to the new camera without duplicating. Do NOT use toggleCamera for HA cameras.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                entityId: { type: Type.STRING, description: 'HA camera entity ID (e.g., camera.front_door)' },
                                cameraName: { type: Type.STRING, description: 'Friendly name of the camera' },
                            },
                            required: ['entityId', 'cameraName'],
                        },
                    },
                    {
                        name: 'close_camera',
                        description: 'Closes/dismisses the camera feed card. Use when user says "close the camera", "hide the camera", "stop showing the camera".',
                    },
                    {
                        name: 'show_thermostat',
                        description: 'Shows a thermostat card with current/target temperature and HVAC mode. Use when user asks about thermostat, temperature at home, or after adjusting climate.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                entityId: { type: Type.STRING, description: 'HA climate entity ID' },
                                name: { type: Type.STRING, description: 'Thermostat name' },
                                currentTemp: { type: Type.NUMBER, description: 'Current temperature' },
                                targetTemp: { type: Type.NUMBER, description: 'Target temperature' },
                                hvacMode: { type: Type.STRING, description: 'HVAC mode: heat, cool, heat_cool, auto, off, fan_only, dry' },
                                humidity: { type: Type.NUMBER, description: 'Current humidity percentage' },
                                unit: { type: Type.STRING, description: 'Temperature unit: F or C' },
                                supportedModes: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Supported HVAC modes' },
                            },
                            required: ['entityId', 'name', 'currentTemp', 'targetTemp', 'hvacMode'],
                        },
                    },
                    {
                        name: 'search_places',
                        description: 'Searches for places, businesses, restaurants, attractions, or any point of interest using Google Places API. Use when user asks "find a restaurant near me", "coffee shops nearby", "best pizza in New York", "gas stations around here", "pharmacies open now", etc. Returns name, address, rating, opening hours, phone, and Google Maps link. If the user\'s location is known, results are biased toward that area.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                query: { type: Type.STRING, description: 'Search query (e.g., "Italian restaurants", "gas stations", "pharmacies open now")' },
                                latitude: { type: Type.NUMBER, description: 'Optional latitude to bias results toward (from user location)' },
                                longitude: { type: Type.NUMBER, description: 'Optional longitude to bias results toward (from user location)' },
                                radiusMeters: { type: Type.NUMBER, description: 'Optional search radius in meters (default 10000)' },
                            },
                            required: ['query'],
                        },
                    },
                    {
                        name: 'get_directions',
                        description: 'Fetches real-time directions with live traffic data using Google Routes API. ALWAYS call this BEFORE show_directions or show_commute to get accurate distance, duration, traffic conditions, and turn-by-turn steps. Pass the user\'s coordinates as originLatitude/originLongitude when available for best results.',
                        parameters: {
                            type: Type.OBJECT,
                            properties: {
                                origin: { type: Type.STRING, description: 'Starting address or place name (used if no lat/lng provided)' },
                                destination: { type: Type.STRING, description: 'Destination address or place name' },
                                travelMode: { type: Type.STRING, description: 'Travel mode: driving, walking, bicycling, transit (default: driving)' },
                                originLatitude: { type: Type.NUMBER, description: 'Origin latitude (from user location for best accuracy)' },
                                originLongitude: { type: Type.NUMBER, description: 'Origin longitude (from user location for best accuracy)' },
                            },
                            required: ['destination'],
                        },
                    },
                    ...(useGoogleSearch 
                        ? this.mcpTools.filter(t => !/search/i.test(t.name || ''))
                        : this.mcpTools),
                ].filter(t => useGoogleSearch ? t.name !== 'get_financial_data' : true) as any),
            });
            const configObj: any = {
                systemInstruction: {
                    parts: [{ text: this.systemInstruction || 'You are Curio, a helpful robot friend.' }],
                },
                responseModalities: [Modality.AUDIO],
                tools: toolsArray,
                inputAudioTranscription: {},
                outputAudioTranscription: {},
                contextWindowCompression: { slidingWindow: {} },
                // Only include video frames captured during audio activity to reduce
                // token usage when the camera sends frames continuously.
                realtimeInputConfig: {
                    turnCoverage: 'TURN_INCLUDES_ONLY_ACTIVITY',
                },
                sessionResumption: this._previousSessionHandle
                    ? { handle: this._previousSessionHandle }
                    : {},
            };

            if (this._voiceName) {
                configObj.speechConfig = {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: this._voiceName } },
                };
            }
            // Log the full tools configuration for debugging search grounding
            console.log('[LiveClient] Tools array:', JSON.stringify(toolsArray.map(t => {
                if (t.googleSearch !== undefined) return { googleSearch: t.googleSearch };
                if (t.functionDeclarations) return { functionDeclarations: t.functionDeclarations.map((fd: any) => fd.name) };
                return Object.keys(t);
            })));
            console.log('[LiveClient] MCP tools included:', this.mcpTools.map(t => t.name).join(', ') || 'none');
            const modelToUse = this._modelName;
            const sessionPromise = (this.ai as any).live.connect({
                model: modelToUse,
                config: configObj,
                callbacks: {
                    onopen: async () => {
                        lockAudioSuspend();
                        if (
                            this.stateMachine.getState() !== 'connecting' &&
                            this.stateMachine.getState() !== 'connected'
                        ) {
                            unlockAudioSuspend();
                            return;
                        }
                        try {
                            const captureContext = getSharedAudioContext(true);
                            this.audioContext = captureContext;
                            // Initialize nextStartTime to current context time so the first
                            // TTS chunk doesn't schedule against a stale value of 0.
                            this.nextStartTime = captureContext.currentTime;
            this.analyserNode = captureContext.createAnalyser();
            this.analyserNode.fftSize = 256;
            this.analyserNode.smoothingTimeConstant = 0.5;
                            const nativeSampleRate = captureContext.sampleRate;
                            const micStream =
                                audioStream ||
                                (await navigator.mediaDevices.getUserMedia({
                                    audio: {
                                        echoCancellation: { ideal: true },
                                        noiseSuppression: { ideal: true },
                                        autoGainControl: { ideal: true },
                                        channelCount: { ideal: 1 },
                                        sampleRate: { ideal: 16000 },
                                    },
                                }));
                            this.mediaStream = micStream;
                                this.inputSource = captureContext.createMediaStreamSource(micStream);
                                let lastNode: AudioNode = this.inputSource;
                                
                                if (this.clearVoiceEnabled) {
                                    // Gentle high-pass to remove low-frequency rumble (fans, AC, etc.)
                                    const hpf = captureContext.createBiquadFilter();
                                    hpf.type = 'highpass';
                                    hpf.frequency.value = 80;
                                    hpf.Q.value = 0.5;
                                    // DO NOT connect source yet, we do it after chain is built
                                    lastNode = hpf;
                                    this.filterChainHead = hpf;

                                    // Light compressor — tame peaks
                                    const compressor = captureContext.createDynamicsCompressor();
                                    compressor.threshold.value = -12;
                                    compressor.knee.value = 30;
                                    compressor.ratio.value = 3;
                                    compressor.attack.value = 0.01;
                                    compressor.release.value = 0.15;
                                    hpf.connect(compressor);
                                    lastNode = compressor;
                                } else {
                                    this.filterChainHead = null;
                                }
                            this.processor = await createPcmCaptureWorkletNode(
                                captureContext,
                                (data) => {
                                    if (this.session) {
                                        // Gate everything on connection state first — no processing when not connected
                                        if (this.stateMachine.getState() !== 'connected' || this.isMuted) return;

                                        const now = Date.now();
                                        const isPlayingLocally =
                                            this.scheduledSources.length > 0 || now - this.lastPlaybackEndTime < 300;
                                        const isAiSpeaking = isPlayingLocally || this.lastStatus?.isSpeaking;

                                        let processedData = data;

                                        // Echo ducking: only when the user has explicitly enabled it in settings.
                                        // Reduces mic input while AI TTS is playing so echo doesn't trigger interruptions.
                                        if (this.muteMicWhileSpeaking && isAiSpeaking) {
                                            if (!this._duckBuffer || this._duckBuffer.length !== data.length) {
                                                this._duckBuffer = new Float32Array(data.length);
                                            }
                                            const duckFactor = this._modelName.includes('3.1') ? 0.08 : 0.20;
                                            for (let i = 0; i < data.length; i++) {
                                                this._duckBuffer[i] = data[i] * duckFactor;
                                            }
                                            processedData = this._duckBuffer;
                                        }

                                        const pcm16 = floatTo16BitPcm(downsampleBuffer(processedData, nativeSampleRate, 16000));
                                        this.session.then((s: any) => {
                                            if (this.stateMachine.getState() !== 'connected') return;
                                            try {
                                                s.sendRealtimeInput({
                                                    audio: {
                                                        mimeType: 'audio/pcm;rate=16000',
                                                        data: encodeBytesToBase64(new Uint8Array(pcm16.buffer)),
                                                    },
                                                });
                                            } catch (e) { /* WebSocket may be closing */ }
                                        });
                                    }
                                },
                                512,
                                this.voiceGateThreshold
                            );
                            // Connect source to chain head or directly to processor
                            if (this.filterChainHead) {
                                this.inputSource.connect(this.filterChainHead);
                            } else {
                                this.inputSource.connect(this.processor);
                            }
                            lastNode.connect(this.processor);
                            this.audioContext = captureContext;
                        } catch (err) {
                            console.error('CRITICAL: Audio initialization failed:', err);
                            this.onerror?.(new Error('Audio hardware initialization failed. Please refresh.'));
                            this.disconnect();
                        }
                    },
                    onmessage: (msg: LiveServerMessage) => {
                        // Debug: log grounding metadata if present
                        if ((msg as any).serverContent?.groundingMetadata || (msg as any).groundingMetadata) {
                            console.log('[LiveClient] Grounding metadata received:', JSON.stringify((msg as any).serverContent?.groundingMetadata || (msg as any).groundingMetadata).substring(0, 500));
                        }
                        // Handle GoAway — server is about to terminate the connection
                        if ((msg as any).goAway) {
                            const timeLeft = (msg as any).goAway.timeLeft;
                            console.warn(`[LiveClient] GoAway received. Time left: ${timeLeft}s. Initiating graceful disconnect.`);
                            window.dispatchEvent(new CustomEvent('requestGlobalLiveApiReconnect', {
                                detail: { reason: 'goaway', timeLeft }
                            }));
                            return;
                        }

                        // Handle initial resumption token
                        if ((msg as any).setupComplete) {
                            const setupComplete = (msg as any).setupComplete;
                            const handle = setupComplete.newHandle;
                            if (handle) {
                                this._previousSessionHandle = handle;
                                this.onResumptionTokenReceived?.(handle);
                            }
                            console.log('[LiveClient] Setup Complete.', handle ? 'Session resumable.' : 'No resumption handle (new session).');

                            // Protocol Fix: Seed history ONLY after setupComplete is received
                            // AND ONLY if we started a fresh session (without a handle)
                            const historyToSeed = this.initialHistory?.filter(item => item.text && item.text.trim().length > 0);
                            if (!this._startedWithHandle && historyToSeed && historyToSeed.length > 0 && !this._historySeeded) {
                                this._historySeeded = true;
                                console.log(`[LiveClient] Handshake finished. Seeding fresh session with ${historyToSeed.length} history items...`);
                                void (async () => {
                                    try {
                                        const session = await sessionPromise;
                                        const turns = historyToSeed.map(item => ({
                                            role: item.speaker === 'model' ? 'model' : 'user',
                                            parts: [{ text: item.text }]
                                        }));
                                        await session.sendClientContent({
                                            turns,
                                            turnComplete: false
                                        });
                                        console.log('[LiveClient] Silent history seeding complete (context-only).');
                                    } catch (e) {
                                        console.error('[LiveClient] Failed to seed history:', e);
                                    }
                                })();
                            }
                        }

                        // Handle periodic resumption token updates (silently — these are frequent)
                        if ((msg as any).sessionResumptionUpdate) {
                            const update = (msg as any).sessionResumptionUpdate;
                            const handle = update.newHandle;
                            if (handle && update.resumable) {
                                this._previousSessionHandle = handle;
                                this.onResumptionTokenReceived?.(handle);
                            }
                        }

                        const content = msg.serverContent;
                        if (content) {
                            const suppressSpeculativeVisionReply =
                                Boolean(this.visionAssistQuestion) && !this.visionAssistPromptSentForTurn;
                            if ((content as any).interrupted) {
                                this.stopAudio();
                                return;
                            }
                            if (!suppressSpeculativeVisionReply && content.modelTurn?.parts) {
                                for (const part of content.modelTurn.parts) {
                                    if (part.inlineData?.data) {
                                        this.onStatusChange({ ...this.lastStatus!, isSpeaking: true });
                                        this.playAudio(part.inlineData.data);
                                    }
                                }
                            } else if (suppressSpeculativeVisionReply && content.modelTurn?.parts) {
                                this.stopAudio();
                            }
                            if (content.inputTranscription?.text) {

                                this.pendingUserTranscript = mergeTranscriptChunk(
                                    this.pendingUserTranscript,
                                    content.inputTranscription.text
                                );
                                this.scheduleVisionAssist(this.pendingUserTranscript);
                                this.onStatusChange({
                                    ...this.lastStatus!,
                                    transcript: this.pendingUserTranscript,
                                    userTranscript: this.pendingUserTranscript,
                                    transcriptHistory: [...this.transcriptHistory],
                                });
                            }
                            if (!suppressSpeculativeVisionReply && content.outputTranscription?.text) {
                                this.pendingAssistantTranscript = mergeTranscriptChunk(
                                    this.pendingAssistantTranscript,
                                    content.outputTranscription.text
                                );
                                this.onStatusChange({
                                    ...this.lastStatus!,
                                    transcript: this.pendingAssistantTranscript,
                                    userTranscript: this.pendingUserTranscript || null,
                                    modelTranscript: this.pendingAssistantTranscript,
                                    transcriptHistory: [...this.transcriptHistory],
                                });

                                // Streaming card analysis — show cards as soon as we detect content
                                // (e.g., weather card appears when AI mentions temperature, not after full response)
                                // Suppress when HA camera is streaming to avoid spurious cards from camera descriptions
                                if (this.onCardEvent && !this.turnHadToolCall && !this._streamingCardEmitted && !this._haCameraInterval && this.pendingAssistantTranscript.length > 80) {
                                    const cardEvent = analyzeTranscript(this.pendingAssistantTranscript, false);
                                    if (cardEvent) {
                                        this._streamingCardEmitted = true;
                                        try { this.onCardEvent(cardEvent); } catch {}
                                    }
                                }
                            }
                            if (content.turnComplete) {
                                if (this.pendingUserTranscript.trim()) {
                                    this.transcriptHistory.push({ speaker: 'user', text: this.pendingUserTranscript });
                                    this._userTurnCount++;
                                }
                                if (this.pendingAssistantTranscript.trim()) {
                                    this.transcriptHistory.push({
                                        speaker: 'ai',
                                        text: this.pendingAssistantTranscript,
                                    });
                                }

                                // Analyze AI transcript for card-worthy content (skip if streaming already emitted one)
                                // Also skip when HA camera is streaming — the AI's camera descriptions
                                // should not trigger auto-detected cards (lists, fun facts, etc.).
                                // Explicit tool calls (timers, alarms, notes, reminders) still work
                                // because they go through the tool handler, not the transcript analyzer.
                                if (this.onCardEvent && !this._streamingCardEmitted && !this._haCameraInterval && this.pendingAssistantTranscript.trim()) {
                                    const cardEvent = analyzeTranscript(
                                        this.pendingAssistantTranscript,
                                        this.turnHadToolCall
                                    );
                                    if (cardEvent) {
                                        try { this.onCardEvent(cardEvent); } catch (e) { /* ignore */ }
                                    }
                                }

                                // Async analysis (image search, etc.) — runs in background
                                // Skip when HA camera is streaming to avoid spurious image cards
                                if (this.onCardEvent && !this._haCameraInterval && this.pendingAssistantTranscript.trim()) {
                                    const capturedTranscript = this.pendingAssistantTranscript;
                                    const capturedOnCardEvent = this.onCardEvent;
                                    analyzeTranscriptAsync(capturedTranscript)
                                        .then(asyncCard => {
                                            if (asyncCard) {
                                                try { capturedOnCardEvent(asyncCard); } catch {}
                                            }
                                        })
                                        .catch(() => {});
                                }

                                this.turnHadToolCall = false;
                                this._streamingCardEmitted = false;
                                this.pendingUserTranscript = '';
                                this.pendingAssistantTranscript = '';
                                if (this.visionAssistPromptSentForTurn || !this.visionAssistQuestion) {
                                    this.clearVisionAssistState();
                                }
                                this.onStatusChange({
                                    ...this.lastStatus!,
                                    transcript: '',
                                    userTranscript: null,
                                    modelTranscript: null,
                                    transcriptHistory: [...this.transcriptHistory],
                                });
                            }
                        }
                        if (msg.toolCall) {
                            this.handleToolCalls(msg.toolCall, sessionPromise);
                            // turnHadToolCall is now set inside handleToolCalls only when a card is emitted
                        }
                    },
                    onclose: (e: any) => {
                        console.log('[LiveClient] WebSocket Closed. Code:', e.code, 'Reason:', e.reason);
                        
                        // Handle session not found / expired (1008) or invalid handle (1007)
                        // Clear the stale token so the next connection starts fresh
                        if ((e.code === 1008 || e.code === 1007) && this._previousSessionHandle) {
                            console.warn(`[LiveClient] Session handle expired/invalid (Code: ${e.code}). Will start fresh on next connect.`);
                            this._previousSessionHandle = null;
                            this.onResumptionFailed?.();
                            // Don't call disconnect() here — let the context handle the retry
                            return;
                        }

                        this.onStatusChange({ ...this.lastStatus!, isConnected: false, isSpeaking: false });
                        this.disconnect();
                    },
                    onerror: (e: any) => {
                        console.error('[LiveClient] WebSocket Error:', e);
                        this.onStatusChange({
                            ...this.lastStatus!,
                            isConnected: false,
                            isSpeaking: false,
                            error: 'Connection error',
                        });
                        this.disconnect();
                    },
                },
            });
            this.session = sessionPromise;
            await this.stateMachine.markConnected();
        } catch (e: any) {
            this.onStatusChange({ isConnected: false, isSpeaking: false, error: e.message || 'Failed to connect' });
            this.disconnect();
        }
    }

    public updateAudioStream(stream: MediaStream) {
        if (!this.audioContext || !this.processor) return;
        
        console.log('[LiveClient] Updating audio stream dynamically...');
        
        // Disconnect old source
        if (this.inputSource) {
            try { this.inputSource.disconnect(); } catch (e) {}
        }
        
        // Don't stop the tracks here as they might be shared or managed externally, 
        // but release our reference
        this.mediaStream = stream;
        this.inputSource = this.audioContext.createMediaStreamSource(stream);
        
        if (this.filterChainHead) {
            this.inputSource.connect(this.filterChainHead);
        } else {
            this.inputSource.connect(this.processor);
        }
    }

    async disconnect() {
        this.clearVisionAssistState();
        // If HA camera was streaming, dismiss the camera card so it doesn't become stale
        if (this._haCameraInterval || this._haCameraEntityId) {
            if (this.onCardEvent) {
                try { this.onCardEvent({ type: 'close_camera', data: {} }); } catch {}
            }
        }
        this.stopHaCameraStream(false); // don't restore device camera on full disconnect
        this.stopAudio();
        unlockAudioSuspend();

        // Only send audioStreamEnd if we're still connected (not if onclose triggered this)
        if (this.session && this.stateMachine.getState() === 'connected') {
            try {
                const s = await this.session;
                s.sendRealtimeInput({ audioStreamEnd: true });
            } catch (e) {
                // Session may already be closing
            }
        }

        if (this.processor)
            try {
                this.processor.disconnect();
            } catch (e) {}
        if (this.inputSource)
            try {
                this.inputSource.disconnect();
            } catch (e) {}
        if (this.filterChainHead)
            try { this.filterChainHead.disconnect(); } catch (e) {}
        this.filterChainHead = null;
        if (this.analyserNode)
            try { this.analyserNode.disconnect(); } catch (e) {}
        this.analyserNode = null;
        this.processor = null;
        this.inputSource = null;
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach((track) => {
                track.stop();
                if (typeof (track as any).enabled !== 'undefined') {
                    (track as any).enabled = false;
                }
            });
            this.mediaStream = null;
        }
        this.audioContext = null;
        if (this.session) {
            try {
                const s = await this.session;
                await Promise.race([
                    s.close(),
                    new Promise<void>((_, reject) =>
                        setTimeout(() => reject(new Error('Session close timed out')), 3000)
                    ),
                ]);
            } catch (e) {
                console.warn('[LiveClient] Session close failed or timed out:', e);
            }
            this.session = null;
        }
        await this.stateMachine.disconnect();
    }

    private stopAudio() {
        this.scheduledSources.forEach((s) => {
            try { s.onended = null; s.stop(); s.disconnect(); } catch (e) {}
        });
        this.scheduledSources = [];
        this.lastPlaybackEndTime = Date.now();
        if (this.audioContext) {
            this.nextStartTime = this.audioContext.currentTime;
        }
        // Explicitly reset speaking state — don't rely on onended callbacks
        if (this.lastStatus?.isSpeaking) {
            this.onStatusChange({ ...this.lastStatus!, isSpeaking: false });
        }
    }

    private playAudio(base64: string) {
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        if (ctx.state === 'suspended') {
            // Wait for resume before scheduling — fire-and-forget causes first-chunk glitches
            ctx.resume().catch(() => {});
        }
        const bytes = decodeBase64ToBytes(base64);
        const pcmData = new Int16Array(bytes.buffer);
        const float32Data = new Float32Array(pcmData.length);
        for (let i = 0; i < pcmData.length; i++) {
            float32Data[i] = pcmData[i] / 32768.0;
        }
        const buffer = ctx.createBuffer(1, float32Data.length, 24000);
        buffer.getChannelData(0).set(float32Data);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        if (this.analyserNode) { source.connect(this.analyserNode); this.analyserNode.connect(ctx.destination); } else { source.connect(ctx.destination); }
        const now = ctx.currentTime;
        // If nextStartTime is stale (more than 0.5s behind current time), snap it forward.
        // This prevents the first batch of audio chunks from being scheduled in the past
        // or bunched together, which causes stuttering on first connect.
        if (this.nextStartTime < now - 0.5) {
            this.nextStartTime = now;
        }
        this.nextStartTime = Math.max(now, this.nextStartTime);
        source.start(this.nextStartTime);
        this.nextStartTime += buffer.duration;
        this.scheduledSources.push(source);
        source.onended = () => {
            const idx = this.scheduledSources.indexOf(source);
            if (idx > -1) this.scheduledSources.splice(idx, 1);
            this.lastPlaybackEndTime = Date.now();
            if (this.scheduledSources.length === 0) {
                this.onStatusChange({ ...this.lastStatus!, isSpeaking: false });
            }
        };
    }

    async handleToolCalls(toolCall: any, sessionPromise: Promise<any>) {
        const responses: any[] = [];
        for (const fc of toolCall.functionCalls) {
            let result: any = { success: true };

            // Guard: On resumed sessions, block replayed tool calls from prior context.
            // The model can replay play_music and disconnectSession from the previous
            // session even after the user has spoken (because the first user turn's
            // response may contain replayed context). We use _userTurnCount to ensure
            // at least one full user turn has COMPLETED before allowing these actions.
            // We use pendingUserTranscript to confirm if the user has actually spoken
            // in this session. Replayed tool calls arrive immediately before the user says anything.
            const isResumedSessionReplay = this._startedWithHandle && this._userTurnCount === 0 && !this.pendingUserTranscript.trim();

            if (isResumedSessionReplay && fc.name === 'disconnectSession') {
                console.log(`[LiveClient] Blocking replayed disconnectSession from prior session context (turn count: ${this._userTurnCount})`);
                result = {
                    success: true,
                    skipped: true,
                    reason: 'This disconnect request is from a previous session context. The user has not asked to disconnect in this session.',
                };
                responses.push({ id: fc.id, name: fc.name, response: { result: sanitizeToolResultForModel(result) } });
                continue;
            }

            if (isResumedSessionReplay && fc.name === 'play_music') {
                const currentState = musicPlaybackService.getState();
                const requestedQuery = String(fc.args?.query || '').trim().toLowerCase();
                const isAlreadyPlaying = currentState.playbackState === 'playing' || currentState.playbackState === 'paused';

                if (isAlreadyPlaying) {
                    // Music is already playing — just report state, don't restart
                    console.log(`[LiveClient] Skipping replayed play_music (music already active, turn count: ${this._userTurnCount}): "${requestedQuery}"`);
                    result = {
                        success: true,
                        skipped: true,
                        reason: 'Music is already playing from the previous session.',
                        currentState: currentState.playbackState,
                        title: currentState.title,
                    };
                } else {
                    // Music was stopped — don't restart it on resume
                    console.log(`[LiveClient] Skipping replayed play_music (music was stopped, turn count: ${this._userTurnCount}): "${requestedQuery}"`);
                    result = {
                        success: true,
                        skipped: true,
                        reason: 'Music was stopped before this session resumed. User has not requested music in this session yet.',
                    };
                }
                responses.push({ id: fc.id, name: fc.name, response: { result: sanitizeToolResultForModel(result) } });
                continue;
            }
            if (fc.name === 'disconnectSession') {
                this.disconnect();
            } else if (fc.name === 'toggleCamera') {
                const enabled = fc.args?.enabled !== false;
                if (this.handler?.toggleCamera) {
                    const cameraResult = await this.handler.toggleCamera(enabled);
                    if (cameraResult && typeof cameraResult === 'object' && 'success' in cameraResult) {
                        result = {
                            ...cameraResult,
                            cameraEnabled: cameraResult.enabled,
                            visionStatus: cameraResult.success
                                ? `Fresh camera frame${cameraResult.framesCaptured === 1 ? '' : 's'} ready`
                                : 'No usable camera frame available',
                        };
                    } else {
                        result = { success: true, cameraEnabled: enabled, visionStatus: 'Camera toggled' };
                    }
                } else {
                    result = { success: false, error: 'Camera control not available' };
                }
            } else if (fc.name === 'navigateToSubject' && this.handler) {
                try {
                    this.handler.navigateToSubject(fc.args.subject);
                } catch (e) {
                    result = { success: false, error: (e as Error).message };
                }
            } else if (fc.name === 'setTimer') {
                const durationMs = (fc.args?.durationSeconds || 60) * 1000;
                const label = fc.args?.label || `${Math.round(durationMs / 1000)}s Timer`;
                const isAlarm = fc.args?.isAlarm === true;
                const targetTime = Date.now() + durationMs;
                // Emit timer card directly
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'timer',
                            data: {
                                label,
                                isAlarm,
                                targetTime,
                                duration: durationMs,
                                completionState: 'running',
                            },
                            persistent: true,
                        });
                    } catch (e) { /* ignore */ }
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, timerSet: true, label, durationSeconds: fc.args?.durationSeconds, isAlarm };
            } else if (fc.name === 'saveNote') {
                const { saveNote } = await import('./notesPersistence');
                const note = saveNote(fc.args?.text || '', fc.args?.category || 'general');
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'list',
                            data: { title: '📝 Note Saved', items: [note.text] },
                            autoDismissMs: 5000,
                        });
                    } catch {}
                }
                result = { success: true, noteSaved: true, noteId: note.id, text: note.text };
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
            } else if (fc.name === 'getMyNotes') {
                const { getNotes } = await import('./notesPersistence');
                const notes = getNotes();
                if (this.onCardEvent && notes.length > 0) {
                    try {
                        this.onCardEvent({
                            type: 'list',
                            data: {
                                title: '📝 My Notes',
                                items: notes.slice(0, 10).map(n => n.text),
                                itemIds: notes.slice(0, 10).map(n => n.id),
                                deletable: true,
                            },
                            autoDismissMs: 0,
                            persistent: true,
                        });
                    } catch {}
                }
                result = { success: true, notes: notes.map(n => ({ text: n.text, category: n.category, createdAt: new Date(n.createdAt).toLocaleString() })) };
            } else if (fc.name === 'setReminder') {
                const { saveReminder } = await import('./notesPersistence');
                const reminder = saveReminder(fc.args?.text || '', fc.args?.timeDescription || 'Soon', fc.args?.dueDateTime);
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'reminder',
                            data: { text: reminder.text, scheduledTime: reminder.timeDescription, dueDateTime: reminder.dueDateTime },
                        });
                    } catch {}
                }
                result = { success: true, reminderSet: true, reminderId: reminder.id, text: reminder.text, when: reminder.timeDescription, dueDateTime: reminder.dueDateTime };
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
            } else if (fc.name === 'getMyReminders') {
                const { getReminders } = await import('./notesPersistence');
                const reminders = getReminders().filter(r => !r.done);
                if (this.onCardEvent && reminders.length > 0) {
                    try {
                        this.onCardEvent({
                            type: 'list',
                            data: {
                                title: '🔔 My Reminders',
                                items: reminders.slice(0, 10).map(r => `${r.text} — ${r.timeDescription}`),
                            },
                            autoDismissMs: 10000,
                        });
                    } catch {}
                }
                result = { success: true, reminders: reminders.map(r => ({ text: r.text, when: r.timeDescription, createdAt: new Date(r.createdAt).toLocaleString() })) };
            } else if (fc.name === 'cancelTimer') {
                // Cancel all active timers by dispatching DISMISS_ALL for timer cards
                if (this.onCardEvent) {
                    try {
                        // Emit a special event that the CardManager can handle
                        this.onCardEvent({
                            type: 'list',
                            data: { title: '⏱️ Timer Cancelled', items: ['All active timers have been cancelled.'] },
                            autoDismissMs: 3000,
                        });
                    } catch {}
                }
                // Clear persisted timers
                const { clearPersistedTimers } = await import('./timerPersistence');
                clearPersistedTimers();
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, timersCancelled: true };
            } else if (fc.name === 'play_music') {
                const query = String(fc.args?.query || '').trim();
                if (!query) {
                    result = { success: false, error: 'A music query is required.' };
                } else if (isExplicitVideoIntent(query)) {
                    const searchQuery = normalizeVideoSearchQuery(query) || query;
                    await musicPlaybackService.stop();
                    if (this.onCardEvent) {
                        try {
                            this.onCardEvent({
                                type: 'youtube',
                                data: {
                                    searchQuery,
                                    title: searchQuery,
                                },
                                persistent: true,
                            });
                        } catch {
                            // Ignore card emission errors and still return the redirect result.
                        }
                    }
                    this.turnHadToolCall = true;
                    this._streamingCardEmitted = true;
                    result = {
                        success: true,
                        redirectedToVideo: true,
                        searchQuery,
                        reason: 'Explicit video intent should open a YouTube video, not the audio mini-player.',
                    };
                } else {
                    const searchResult = await searchMusic(query);
                    if (!searchResult.success || !searchResult.track) {
                        result = { success: false, error: searchResult.error || `Could not find a playable result for "${query}".` };
                    } else {
                        const snapshot = await musicPlaybackService.play(searchResult.track);
                        emitMusicCardEvent(this.onCardEvent, snapshot);
                        this.turnHadToolCall = true;
                        this._streamingCardEmitted = true;
                        result = {
                            success: true,
                            videoId: snapshot.videoId,
                            title: snapshot.title,
                            artistOrChannel: snapshot.artistOrChannel,
                            playbackState: snapshot.playbackState,
                            autoplayBlocked: snapshot.autoplayBlocked === true,
                        };
                    }
                }
            } else if (fc.name === 'pause_music') {
                const currentSnapshot = musicPlaybackService.getState();
                if (!currentSnapshot.videoId) {
                    result = { success: false, error: 'No active in-app music track is playing.' };
                } else {
                    const snapshot = await musicPlaybackService.pause();
                    emitMusicCardEvent(this.onCardEvent, snapshot);
                    this.turnHadToolCall = true;
                    this._streamingCardEmitted = true;
                    result = {
                        success: true,
                        playbackState: snapshot.playbackState,
                        title: snapshot.title,
                    };
                }
            } else if (fc.name === 'resume_music') {
                const currentSnapshot = musicPlaybackService.getState();
                if (!currentSnapshot.videoId) {
                    result = { success: false, error: 'No paused music track is available to resume.' };
                } else {
                    const snapshot = await musicPlaybackService.resume();
                    emitMusicCardEvent(this.onCardEvent, snapshot);
                    this.turnHadToolCall = true;
                    this._streamingCardEmitted = true;
                    result = {
                        success: true,
                        playbackState: snapshot.playbackState,
                        title: snapshot.title,
                        autoplayBlocked: snapshot.autoplayBlocked === true,
                    };
                }
            } else if (fc.name === 'stop_music') {
                const currentSnapshot = musicPlaybackService.getState();
                if (!currentSnapshot.videoId) {
                    result = { success: false, error: 'No active in-app music track is currently loaded.' };
                } else {
                    await musicPlaybackService.stop();
                    this.turnHadToolCall = true;
                    this._streamingCardEmitted = true;
                    result = { success: true, playbackState: 'idle' };
                }
            } else if (fc.name === 'get_music_state') {
                const snapshot = musicPlaybackService.getState();
                result = {
                    success: true,
                    hasActiveTrack: Boolean(snapshot.videoId),
                    playbackState: snapshot.playbackState,
                    videoId: snapshot.videoId,
                    title: snapshot.title,
                    artistOrChannel: snapshot.artistOrChannel,
                    autoplayBlocked: snapshot.autoplayBlocked === true,
                };
            } else if (fc.name === 'show_finance_card') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'finance',
                            data: {
                                symbol: fc.args.symbol,
                                name: fc.args.name,
                                price: fc.args.price,
                                change: fc.args.change,
                                changePercent: fc.args.changePercent,
                                marketCap: fc.args.marketCap,
                                currency: fc.args.currency,
                            },
                        });
                    } catch (e) { /* ignore */ }
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Finance card displayed.' };
            } else if (fc.name === 'get_financial_data') {
                try {
                    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${fc.args.symbol}`);
                    if (!res.ok) throw new Error('Network response was not ok');
                    const data = await res.json();
                    const meta = data.chart.result[0].meta;
                    const change = meta.regularMarketPrice - meta.previousClose;
                    const changePercent = (change / meta.previousClose) * 100;
                    result = {
                        success: true,
                        price: meta.regularMarketPrice,
                        currency: meta.currency,
                        change: change,
                        changePercent: changePercent,
                        symbol: meta.symbol,
                        instrumentType: meta.instrumentType
                    };
                } catch (e) {
                    result = { success: false, error: 'CORS or Network Error: Failed to fetch financial data directly. You MUST immediately use assist_search_google (or googleSearch) to search the web for the stock price instead, and then call show_finance_card once you find it. Error details: ' + (e as Error).message };
                }
            } else if (fc.name === 'get_weather' && this.handler?.get_weather) {
                try {
                    result = await this.handler.get_weather(fc.args?.city);
                    // Emit weather card with full data (humidity, daily forecast)
                    if (this.onCardEvent && result?.weather) {
                        const w = result.weather;
                        const u = (result.tempUnit === 'C' ? 'C' : 'F') as 'F' | 'C';
                        const isForecast = !!fc.args?.forecast;
                        try {
                            this.onCardEvent({
                                type: 'weather',
                                data: {
                                    temperature: u === 'C' ? w.tempC : w.tempF,
                                    condition: w.desc || 'Clear',
                                    high: u === 'C' ? (w.daily?.[0]?.highC ?? w.tempC + 5) : (w.daily?.[0]?.highF ?? w.tempF + 5),
                                    low: u === 'C' ? (w.daily?.[0]?.lowC ?? w.tempC - 5) : (w.daily?.[0]?.lowF ?? w.tempF - 5),
                                    humidity: w.humidity,
                                    unit: u,
                                    forecastMode: isForecast,
                                    daily: w.daily?.map((d: any) => ({
                                        date: d.date, highF: d.highF, lowF: d.lowF,
                                        highC: d.highC, lowC: d.lowC,
                                        condition: d.condition, humidity: d.humidity,
                                    })),
                                },
                                autoDismissMs: isForecast ? 25000 : 15000,
                            });
                            this.turnHadToolCall = true;
                            this._streamingCardEmitted = true;
                        } catch {}
                    }
                } catch (e) {
                    result = { success: false, error: (e as Error).message };
                }
            } else if (fc.name === 'show_calendar') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'calendar',
                            data: { events: fc.args.events || [], date: fc.args.date || 'Today' },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Calendar card displayed.' };
            } else if (fc.name === 'set_alarm') {
                const alarms = getPersistedAlarms();
                const newAlarm = {
                    id: `alarm_${Date.now()}`,
                    label: fc.args?.label || `Alarm ${fc.args?.time}`,
                    time: fc.args?.time || '07:00',
                    enabled: true,
                    days: fc.args?.days || [],
                };
                alarms.push(newAlarm);
                setPersistedAlarms(alarms);
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'alarm',
                            data: { alarms, mode: 'list' },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, alarmSet: true, alarm: newAlarm };
            } else if (fc.name === 'get_alarms') {
                const alarms = getPersistedAlarms();
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'alarm',
                            data: { alarms, mode: 'list' },
                            persistent: true,
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, alarms };
            } else if (fc.name === 'delete_alarm') {
                let alarms = getPersistedAlarms();
                const before = alarms.length;
                if (fc.args?.alarmId) {
                    alarms = alarms.filter(a => a.id !== fc.args.alarmId);
                } else if (fc.args?.time) {
                    alarms = alarms.filter(a => a.time !== fc.args.time);
                } else if (fc.args?.label) {
                    const label = (fc.args.label as string).toLowerCase();
                    alarms = alarms.filter(a => !a.label.toLowerCase().includes(label));
                }
                setPersistedAlarms(alarms);
                // Update the visible alarm card with the new list
                if (this.onCardEvent && alarms.length > 0) {
                    try {
                        this.onCardEvent({
                            type: 'alarm',
                            data: { alarms, mode: 'list' },
                            persistent: true,
                        });
                    } catch {}
                } else if (this.onCardEvent && alarms.length === 0) {
                    // No alarms left — dismiss the card
                    try {
                        this.onCardEvent({ type: 'alarm', data: { alarms: [], mode: 'list' } });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, deleted: before - alarms.length, remaining: alarms.length };
            } else if (fc.name === 'show_directions') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'map',
                            data: {
                                destination: fc.args.destination,
                                origin: fc.args.origin || 'Current Location',
                                travelMode: fc.args.travelMode || 'driving',
                                distance: fc.args.distance,
                                duration: fc.args.duration,
                                steps: fc.args.steps,
                                mapUrl: fc.args.mapUrl,
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Directions card displayed.' };
            } else if (fc.name === 'show_air_quality') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'airQuality',
                            data: fc.args,
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Air quality card displayed.' };
            } else if (fc.name === 'show_joke') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'joke',
                            data: { setup: fc.args.setup, punchline: fc.args.punchline, category: fc.args.category },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Joke card displayed.' };
            } else if (fc.name === 'show_trivia') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'trivia',
                            data: {
                                question: fc.args.question,
                                options: fc.args.options,
                                correctIndex: fc.args.correctIndex,
                                explanation: fc.args.explanation,
                                category: fc.args.category,
                            },
                            persistent: true,
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Trivia card displayed.' };
            } else if (fc.name === 'show_unit_conversion') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'unitConversion',
                            data: fc.args,
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Unit conversion card displayed.' };
            } else if (fc.name === 'show_definition') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'definition',
                            data: {
                                word: fc.args.word || '',
                                pronunciation: fc.args.pronunciation,
                                partOfSpeech: fc.args.partOfSpeech,
                                definition: fc.args.definition || '',
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Definition card displayed.' };
            } else if (fc.name === 'show_calculation') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'calculation',
                            data: {
                                equation: fc.args.equation || '',
                                result: fc.args.result || '',
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Calculation card displayed.' };
            } else if (fc.name === 'show_translation') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'translation',
                            data: {
                                originalText: fc.args.originalText || '',
                                translatedText: fc.args.translatedText || '',
                                sourceLanguage: fc.args.sourceLanguage || 'Unknown',
                                targetLanguage: fc.args.targetLanguage || 'Unknown',
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Translation card displayed.' };
            } else if (fc.name === 'show_sports_score') {
                const homeTeam = fc.args.homeTeam || '';
                const awayTeam = fc.args.awayTeam || '';
                let homeLogoUrl = fc.args.homeLogoUrl || '';
                let awayLogoUrl = fc.args.awayLogoUrl || '';

                // Fetch team logos from Wikipedia — try sport-specific page names first
                if (!homeLogoUrl || !awayLogoUrl) {
                    const SPORT_SUFFIXES = [
                        '', // exact name first (e.g. "Manchester United F.C.")
                        ' FC', ' F.C.', ' CF',  // football/soccer
                        ' (basketball)', ' (NBA)',
                        ' (NFL)', ' (American football)',
                        ' (MLB)', ' (baseball)',
                        ' (NHL)', ' (ice hockey)',
                        ' (soccer)',
                    ];

                    const fetchLogo = async (team: string): Promise<string> => {
                        for (const suffix of SPORT_SUFFIXES) {
                            try {
                                const query = (team + suffix).replace(/\s+/g, '_');
                                const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
                                if (!res.ok) continue;
                                const json = await res.json();
                                // Validate it's a sports team page — check description or extract
                                const desc = ((json.description || '') + ' ' + (json.extract || '')).toLowerCase();
                                const isSportsRelated = /club|team|football|soccer|basketball|baseball|hockey|nba|nfl|mlb|nhl|league|athletic|sport|franchise|roster|season|coach|stadium|arena/.test(desc);
                                if (json.thumbnail?.source && isSportsRelated) {
                                    return json.thumbnail.source;
                                }
                            } catch {}
                        }
                        return '';
                    };
                    const [homeLogo, awayLogo] = await Promise.all([
                        homeLogoUrl ? Promise.resolve(homeLogoUrl) : fetchLogo(homeTeam),
                        awayLogoUrl ? Promise.resolve(awayLogoUrl) : fetchLogo(awayTeam),
                    ]);
                    homeLogoUrl = homeLogo;
                    awayLogoUrl = awayLogo;
                }

                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'sportsScore',
                            data: {
                                homeTeam,
                                awayTeam,
                                homeScore: fc.args.homeScore ?? 0,
                                awayScore: fc.args.awayScore ?? 0,
                                status: fc.args.status || 'Final',
                                homeLogoUrl,
                                awayLogoUrl,
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Sports score card displayed.' };
            } else if (fc.name === 'show_quote') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'quote',
                            data: {
                                quote: fc.args.quote || '',
                                author: fc.args.author || 'Unknown',
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Quote card displayed.' };
            } else if (fc.name === 'show_fun_fact') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'funFact',
                            data: {
                                fact: fc.args.fact || '',
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Fun fact card displayed.' };
            } else if (fc.name === 'show_recipe') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'recipe',
                            data: {
                                title: fc.args.title || 'Recipe',
                                ingredients: fc.args.ingredients || [],
                                steps: fc.args.steps || [],
                            },
                            persistent: true,
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Recipe card displayed.' };
            } else if (fc.name === 'show_astronomy') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'astronomy',
                            data: fc.args || {},
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Astronomy card displayed.' };
            } else if (fc.name === 'show_commute') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'commute',
                            data: fc.args,
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Commute card displayed.' };
            } else if (fc.name === 'show_camera') {
                let entityId = fc.args?.entityId || '';
                const cameraName = fc.args?.cameraName || 'Camera';
                let snapshotUrl = '';
                let baseUrl = '';
                let haToken = '';

                // If the AI guessed an entity ID, try to find the real one from cache
                if (entityId && this.entityCache && this.entityCache.length > 0) {
                    const cameras = this.entityCache.filter(e => e.entity_id.startsWith('camera.'));
                    // Exact match among camera entities first
                    let found = cameras.find(e => e.entity_id === entityId);
                    if (!found) {
                        // Fuzzy: find camera entities matching the name
                        const searchName = (cameraName || entityId).toLowerCase();
                        found = cameras.find(e =>
                            e.entity_id.toLowerCase().includes(searchName.replace(/\s+/g, '_')) ||
                            (e.name || '').toLowerCase().includes(searchName)
                        );
                        // If still not found, try partial match on entity_id
                        if (!found) {
                            const parts = entityId.replace('camera.', '').toLowerCase().split('_');
                            found = cameras.find(e =>
                                parts.every((p: string) => e.entity_id.toLowerCase().includes(p))
                            );
                        }
                    }
                    if (found) {
                        console.log('[show_camera] Resolved entity:', found.entity_id, 'from:', entityId);
                        entityId = found.entity_id;
                    } else {
                        console.warn('[show_camera] Could not find camera entity for:', entityId, 'Available cameras:', 
                            cameras.map(e => e.entity_id));
                    }
                }

                if (entityId) {
                    try {
                        const rawUrl = getHaMcpUrl();
                        haToken = await getHaMcpTokenAsync();
                        baseUrl = rawUrl.replace(/\/api\/mcp\/?$/, '').replace(/\/$/, '');
                        console.log('[show_camera] Using HA base URL:', baseUrl, 'entity:', entityId);

                        // Try signed path first
                        try {
                            const signRes = await fetch(`${baseUrl}/api/auth/sign_path`, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${haToken}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ path: `/api/camera_proxy/${entityId}` }),
                            });
                            if (signRes.ok) {
                                const signData = await signRes.json();
                                snapshotUrl = `${baseUrl}${signData.path}`;
                                console.log('[show_camera] Got signed URL');
                                // Start continuous streaming via direct proxy (signed URLs are for img tags)
                                await this.startHaCameraStream(entityId, baseUrl, haToken);
                            } else {
                                console.warn('[show_camera] Signed path returned:', signRes.status);
                            }
                        } catch (signErr) {
                            console.warn('[show_camera] Signed path fetch failed:', signErr);
                        }

                        // Fallback: fetch as blob
                        if (!snapshotUrl) {
                            try {
                                const proxyUrl = `${baseUrl}/api/camera_proxy/${entityId}`;
                                console.log('[show_camera] Trying direct proxy:', proxyUrl);
                                const proxyRes = await fetch(proxyUrl, {
                                    headers: { 'Authorization': `Bearer ${haToken}` },
                                });
                                if (proxyRes.ok) {
                                    const blob = await proxyRes.blob();
                                    snapshotUrl = URL.createObjectURL(blob);
                                    // Start continuous camera frame streaming to the model
                                    await this.startHaCameraStream(entityId, baseUrl, haToken);
                                } else {
                                    console.warn('[show_camera] Direct proxy returned:', proxyRes.status);
                                }
                            } catch (proxyErr) {
                                console.warn('[show_camera] Direct proxy fetch failed:', proxyErr);
                            }
                        }
                    } catch (e) {
                        console.warn('[show_camera] Failed to get camera snapshot:', e);
                    }
                }
                if (this.onCardEvent) {
                    try {
                        // Build camera list from entity cache so the card doesn't need its own MCP session
                        const cameraList = (this.entityCache || [])
                            .filter(e => e.entity_id.startsWith('camera.'))
                            .map(e => ({ entity_id: e.entity_id, name: e.name || e.entity_id }));

                        this.onCardEvent({
                            type: 'camera',
                            data: {
                                entityId,
                                cameraName,
                                snapshotUrl,
                                haUrl: baseUrl,
                                haToken,
                                isStreaming: true,
                                cameras: cameraList,
                            },
                            persistent: true,
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: `Camera feed for ${cameraName} is now streaming to you continuously. You can see what the camera sees in real-time. IMPORTANT: From now on, if the user asks "what do you see?", "is anyone there?", "what's happening?", or any visual question, they are asking about THIS camera feed. Just describe what you observe in the frames — do NOT open the device camera or call show_camera again unless they ask about a different camera location.` };
            } else if (fc.name === 'close_camera') {
                // Stop streaming frames to model, restore device camera if it was on
                this.stopHaCameraStream(true);
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({ type: 'close_camera', data: {} });
                    } catch {}
                }
                result = { success: true, message: 'Camera feed closed.' };
            } else if (fc.name === 'show_thermostat') {
                if (this.onCardEvent) {
                    try {
                        this.onCardEvent({
                            type: 'thermostat',
                            data: {
                                entityId: fc.args.entityId,
                                name: fc.args.name,
                                currentTemp: fc.args.currentTemp,
                                targetTemp: fc.args.targetTemp,
                                hvacMode: fc.args.hvacMode || 'auto',
                                humidity: fc.args.humidity,
                                unit: fc.args.unit || 'F',
                                supportedModes: fc.args.supportedModes || [],
                            },
                        });
                    } catch {}
                }
                this.turnHadToolCall = true;
                this._streamingCardEmitted = true;
                result = { success: true, message: 'Thermostat card displayed.' };
            } else if (fc.name === 'search_places') {
                try {
                    const { searchPlaces } = await import('./placesApi');
                    let locationBias = (fc.args?.latitude != null && fc.args?.longitude != null)
                        ? { latitude: fc.args.latitude, longitude: fc.args.longitude, radiusMeters: fc.args.radiusMeters }
                        : undefined;

                    // If no coordinates provided by AI, try to get current device position
                    if (!locationBias) {
                        const { getCurrentPosition } = await import('./weatherService');
                        const pos = await getCurrentPosition();
                        if (pos) {
                            locationBias = { 
                                latitude: pos.coords.latitude, 
                                longitude: pos.coords.longitude,
                                radiusMeters: fc.args?.radiusMeters || 10000
                            };
                        }
                    }

                    const placesResult = await searchPlaces(fc.args?.query || '', locationBias);
                    if (placesResult.success && placesResult.places) {
                        result = {
                            success: true,
                            places: placesResult.places.map(p => ({
                                name: p.displayName,
                                address: p.formattedAddress,
                                rating: p.rating,
                                totalRatings: p.userRatingCount,
                                openNow: p.regularOpeningHours?.openNow,
                                hours: p.regularOpeningHours?.weekdayDescriptions,
                                priceLevel: p.priceLevel,
                                phone: p.nationalPhoneNumber,
                                website: p.websiteUri,
                                mapsUrl: p.mapsUrl,
                            })),
                        };

                        // Auto-show the places card
                        if (this.onCardEvent) {
                            const centerMapUrl = placesResult.places.length > 0
                                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fc.args?.query || '')}`
                                : undefined;

                            try {
                                this.onCardEvent({
                                    type: 'places',
                                    data: {
                                        query: fc.args?.query || '',
                                        places: placesResult.places.map(p => ({
                                            name: p.displayName,
                                            address: p.formattedAddress,
                                            rating: p.rating,
                                            userRatingCount: p.userRatingCount,
                                            priceLevel: p.priceLevel,
                                            openNow: p.regularOpeningHours?.openNow,
                                            location: p.location,
                                            staticMapUrl: p.staticMapUrl,
                                            mapsUrl: p.mapsUrl,
                                        })),
                                        centerMapUrl,
                                    },
                                });
                                this.turnHadToolCall = true;
                            } catch (e) {
                                console.error('[LiveClient] Failed to emit places card:', e);
                            }
                        }
                    } else {
                        result = { success: false, error: placesResult.error || 'No places found.' };
                    }
                } catch (e) {
                    result = { success: false, error: (e as Error).message || 'Places search failed.' };
                }
            } else if (fc.name === 'get_directions') {
                try {
                    const { computeRoute } = await import('./routesApi');
                    let originLatLng = (fc.args?.originLatitude != null && fc.args?.originLongitude != null)
                        ? { latitude: fc.args.originLatitude, longitude: fc.args.originLongitude }
                        : undefined;

                    // If origin name is missing/current OR coordinates missing, try to resolve device position
                    const isCurrentLocal = !fc.args?.origin || fc.args.origin.toLowerCase() === 'current location' || fc.args.origin.toLowerCase() === 'my location';
                    if (!originLatLng && isCurrentLocal) {
                        const { getCurrentPosition } = await import('./weatherService');
                        const pos = await getCurrentPosition();
                        if (pos) {
                            originLatLng = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
                        }
                    }

                    const routeResult = await computeRoute(
                        fc.args?.origin || '',
                        fc.args?.destination || '',
                        fc.args?.travelMode || 'driving',
                        originLatLng,
                    );
                    if (routeResult.success && routeResult.route) {
                        const r = routeResult.route;
                        // Auto-show the directions card
                        if (this.onCardEvent) {
                            try {
                                this.onCardEvent({
                                    type: 'map',
                                    data: {
                                        destination: r.destination,
                                        origin: r.origin,
                                        travelMode: r.travelMode,
                                        distance: r.distance,
                                        duration: r.durationInTraffic,
                                        steps: r.steps,
                                        mapUrl: r.mapUrl,
                                        encodedPolyline: r.encodedPolyline,
                                        staticMapUrl: r.staticMapUrl,
                                    },
                                });
                            } catch {}
                        }
                        this.turnHadToolCall = true;
                        this._streamingCardEmitted = true;
                        result = {
                            success: true,
                            origin: r.origin,
                            destination: r.destination,
                            distance: r.distance,
                            duration: r.duration,
                            durationInTraffic: r.durationInTraffic,
                            trafficCondition: r.trafficCondition,
                            route: r.route,
                            steps: r.steps.slice(0, 8),
                            mapsUrl: r.mapUrl,
                        };
                    } else {
                        result = { success: false, error: routeResult.error || 'No route found.' };
                    }
                } catch (e) {
                    result = { success: false, error: (e as Error).message || 'Directions lookup failed.' };
                }
            } else if (this.onMcpToolCall) {
                console.log('[LiveClient] MCP tool call:', fc.name, 'args:', JSON.stringify(fc.args));
                try {
                    result = await this.onMcpToolCall(fc.name, fc.args);
                    console.log('[LiveClient] MCP tool result for', fc.name, ':', JSON.stringify(result).substring(0, 500));
                } catch (e) {
                    console.error('[LiveClient] MCP tool error for', fc.name, ':', (e as Error).message);
                    result = { success: false, error: (e as Error).message };
                }
            }
            responses.push({
                id: fc.id,
                name: fc.name,
                response: { result: sanitizeToolResultForModel(result) },
            });
            // Debug: log what's being sent back to the model
            if (fc.name.includes('search') || fc.name.includes('Search')) {
                console.log('[LiveClient] Search tool response for', fc.name, ':', JSON.stringify(sanitizeToolResultForModel(result)).substring(0, 1000));
            }

            // Emit card event for visual feedback
            if (this.onCardEvent && this.entityCache) {
                const cardEvent = interceptToolCall(fc.name, fc.args, result, this.entityCache);
                if (cardEvent) {
                    this.turnHadToolCall = true; // Only suppress transcript cards when a device card was shown
                    try { this.onCardEvent(cardEvent); } catch (e) { /* ignore card errors */ }
                }
            }
        }
        sessionPromise.then((s: any) => {
            try {
                s.sendToolResponse({ functionResponses: responses });
            } catch (e) {}
        });
    }

    public sendTextTurn(text: string) {
        if (!this.session) return;

        this.pendingUserTranscript = text;
        this.onStatusChange({
            ...this.lastStatus!,
            userTranscript: text,
            transcript: text,
            transcriptHistory: [...this.transcriptHistory],
        });
        this.scheduleVisionAssist(text);
        this.session.then((s: any) => s.sendRealtimeInput({ text }));
    }

    /** Flush any cached audio on the server (e.g. when mic is muted). */
    public sendAudioStreamEnd() {
        if (!this.session || this.stateMachine.getState() !== 'connected') return;
        this.session.then((s: any) => {
            try {
                s.sendRealtimeInput({ audioStreamEnd: true });
                console.log('[LiveClient] Sent audioStreamEnd (mic muted).');
            } catch (e) { /* WebSocket may be closing */ }
        });
    }

    public sendVideoFrame(base64: string) {
        if (!this.session) return;
        this.session.then((s: any) =>
            s.sendRealtimeInput({
                video: {
                    mimeType: 'image/jpeg',
                    data: base64,
                },
            })
        );
    }

    /** Start streaming HA camera frames to the model at ~0.5fps */
    public async startHaCameraStream(entityId: string, baseUrl: string, token: string) {
        this.stopHaCameraStream(false); // clear any existing without restoring device camera
        this._haCameraEntityId = entityId;
        this._haCameraBaseUrl = baseUrl;
        this._haCameraToken = token;
        console.log('[LiveClient] Starting HA camera stream to model:', entityId);

        // Listen for card close (dispatched by CardStack/CardManagerContext, NOT by CameraCard unmount)
        this._haCameraClosedHandler = () => {
            console.log('[LiveClient] Camera card dismissed — stopping HA camera stream');
            this.stopHaCameraStream(true);
            if (this.session) {
                try {
                    this.session.send({ text: '[System: The user closed the camera card. The camera feed is no longer visible. Stop describing camera frames.]' });
                } catch {}
            }
        };
        window.addEventListener('ha-camera-closed', this._haCameraClosedHandler);

        // Listen for camera switch from the card's picker UI
        this._haCameraSwitchHandler = (e: Event) => {
            const { entityId: newEid, baseUrl: newUrl, token: newToken } = (e as CustomEvent).detail;
            if (newEid && newUrl && newToken) {
                console.log('[LiveClient] User switched camera via picker:', newEid);
                void this.startHaCameraStream(newEid, newUrl, newToken);
            }
        };
        window.addEventListener('ha-camera-switch', this._haCameraSwitchHandler);

        // If device camera is currently on, pause it and remember
        if (this.handler?.toggleCamera && this.mediaStream) {
            const videoTracks = this.mediaStream.getVideoTracks();
            if (videoTracks.length > 0 && videoTracks[0].readyState === 'live') {
                this._deviceCameraWasOn = true;
                console.log('[LiveClient] Pausing device camera — HA camera taking over vision');
            }
        }

        const fetchAndSend = async () => {
            if (!this._haCameraEntityId || !this._haCameraBaseUrl || !this._haCameraToken) return;
            try {
                const url = `${this._haCameraBaseUrl}/api/camera_proxy/${this._haCameraEntityId}`;
                const res = await fetch(url, { headers: { 'Authorization': `Bearer ${this._haCameraToken}` } });
                if (!res.ok) return;
                const blob = await res.blob();

                // Share frame blob with CameraCard UI via custom event
                // The listener creates and manages its own blob URL
                window.dispatchEvent(new CustomEvent('ha-camera-frame', {
                    detail: { entityId: this._haCameraEntityId, blob },
                }));

                // Only send to model if session is active
                if (this.session) {
                    const buffer = await blob.arrayBuffer();
                    const bytes = new Uint8Array(buffer);
                    let binary = '';
                    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
                    const base64 = btoa(binary);
                    if (base64) this.sendVideoFrame(base64);
                }
            } catch {}
        };

        fetchAndSend();
        this._haCameraInterval = window.setInterval(fetchAndSend, 2000);
    }

    /** Stop streaming HA camera frames to the model */
    public stopHaCameraStream(restoreDeviceCamera = true) {
        if (this._haCameraInterval) {
            window.clearInterval(this._haCameraInterval);
            this._haCameraInterval = null;
            console.log('[LiveClient] Stopped HA camera stream to model');
        }

        // Remove the card-closed listener to avoid double-firing
        if (this._haCameraClosedHandler) {
            window.removeEventListener('ha-camera-closed', this._haCameraClosedHandler);
            this._haCameraClosedHandler = null;
        }

        // Remove the camera-switch listener
        if (this._haCameraSwitchHandler) {
            window.removeEventListener('ha-camera-switch', this._haCameraSwitchHandler);
            this._haCameraSwitchHandler = null;
        }

        // Restore device camera if it was on before
        if (restoreDeviceCamera && this._deviceCameraWasOn && this.handler?.toggleCamera) {
            console.log('[LiveClient] Restoring device camera after HA camera closed');
            this._deviceCameraWasOn = false;
            // Re-enable device camera frame capture
            void this.handler.toggleCamera(true);
        }

        this._haCameraEntityId = null;
        this._haCameraBaseUrl = null;
        this._haCameraToken = null;
    }

    public onerror?: (err: Error) => void;
}


