/**
 * Wake word service powered by openwakeword-js + ONNX Runtime Web.
 *
 * The service keeps the detection pipeline local in-browser and supports
 * selecting different wake-word models over time.
 */
import {
    DEFAULT_WAKE_WORD_ID,
    WAKE_WORD_DETECTED_EVENT,
    getWakeWordDefinition,
    type WakeWordDefinition,
    type WakeWordDetectedDetail
} from './wakeWordCatalog';
import { getSharedAudioContext, lockAudioSuspend, unlockAudioSuspend } from './audioContext';

const WAKE_WORD_DEBUG = import.meta.env.DEV;

/**
 * Linear Downsampler: Converts audio from native hardware rate to 16kHz
 * Uses a pre-allocated buffer to avoid GC pressure on low-end devices.
 */
let downsampleOutputBuffer: Float32Array | null = null;

function downsampleBuffer(buffer: Float32Array, fromRate: number, toRate: number = 16000): Float32Array {
    if (fromRate === toRate) return buffer;
    const ratio = fromRate / toRate;
    const newLength = Math.floor(buffer.length / ratio);
    // Reuse output buffer if same size, otherwise allocate once
    if (!downsampleOutputBuffer || downsampleOutputBuffer.length !== newLength) {
        downsampleOutputBuffer = new Float32Array(newLength);
    }
    const result = downsampleOutputBuffer;
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
        const nextOffsetBuffer = Math.floor((offsetResult + 1) * ratio);
        let accum = 0;
        let count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }
        result[offsetResult] = count > 0 ? accum / count : 0;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result;
}

type StartListeningOptions = {
    onDetect?: (detail: WakeWordDetectedDetail) => void;
    detectionThreshold?: number;
    wakeWordId?: string;
};

type PreloadWakeWordOptions = {
    wakeWordId?: string;
};

const COOLDOWN_MS = 5_000;

type WakeWordModel = {
    init: () => Promise<void>;
    predict: (samples: Float32Array) => Promise<Record<string, number>>;
    reset?: () => void;
};

let OpenWakeWordModel:
    | (new (options: {
        wakewordModels: string[];
        melspectrogramModelPath: string;
        embeddingModelPath: string;
        inferenceFramework: 'onnx';
        wasmPaths: string;
        thresholds: Record<string, number>;
    }) => WakeWordModel)
    | null = null;

let model: WakeWordModel | null = null;
let loadedModelWakeWordId: string | null = null;
let preloadPromise: Promise<WakeWordDefinition> | null = null;
let preloadingWakeWordId: string | null = null;
let modelLoadSequence = 0;
let audioContext: AudioContext | null = null;
let mediaStream: MediaStream | null = null;
let audioWorkletNode: AudioWorkletNode | null = null;
let workletBlobUrl: string | null = null;
let isWorkletRegistered = false;

const workletCode = `
class WakeWordProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.CHUNK_SIZE = 1280;
        this.chunk = new Float32Array(this.CHUNK_SIZE);
        this.chunkIndex = 0;
    }

    process(inputs, outputs, parameters) {
        const inputChannel = inputs[0]?.[0];
        if (!inputChannel) return true;

        for (let index = 0; index < inputChannel.length; index += 1) {
            this.chunk[this.chunkIndex] = inputChannel[index];
            this.chunkIndex += 1;

            if (this.chunkIndex === this.CHUNK_SIZE) {
                this.port.postMessage(this.chunk.slice(0));
                this.chunkIndex = 0;
            }
        }

        return true;
    }
}
registerProcessor('wake-word-processor', WakeWordProcessor);
`;

let sourceNode: MediaStreamAudioSourceNode | null = null;
let sinkGainNode: GainNode | null = null;
let removeResumeListeners: (() => void) | null = null;
let audioSuspendLocked = false;

let isRunning = false;
let isStarting = false;
let isModelReady = false;
let isInferring = false; // Guard against concurrent ONNX sessions
let currentWakeWordId = DEFAULT_WAKE_WORD_ID;
let currentThreshold = getWakeWordDefinition(DEFAULT_WAKE_WORD_ID).threshold;
let onDetectCallback: ((detail: WakeWordDetectedDetail) => void) | null = null;
let lastDetectionTime = 0;
let lastLogTime = 0;
let lastHeartbeatTime = 0;
let startSequence = 0;

let pendingSamples: Float32Array | null = null;
const ACCUMULATOR_SIZE = 1280;
const accumulator = new Float32Array(ACCUMULATOR_SIZE);
// Pre-allocated buffer for pending samples — avoids GC pressure from new Float32Array on every chunk
const pendingBuffer = new Float32Array(ACCUMULATOR_SIZE);
let accumulatorOffset = 0;

const getModelKeyFromPath = (modelPath: string) =>
    (modelPath.split('/').pop() || modelPath).replace(/\.onnx$/i, '').replace(/\\/g, '/');

const getTimingNow = (): number =>
    typeof performance !== 'undefined' ? performance.now() : Date.now();

const logWakeWordTiming = (label: string, startedAt: number): void => {
    console.info(`[WakeWord][timing] ${label}: ${(getTimingNow() - startedAt).toFixed(1)}ms`);
};

function clearLoadedModelCache(): void {
    model = null;
    loadedModelWakeWordId = null;
    preloadPromise = null;
    preloadingWakeWordId = null;
}

function invalidateLoadedModelCache(): void {
    modelLoadSequence += 1;
    clearLoadedModelCache();
}

async function createWakeWordModel(
    wakeWord: WakeWordDefinition,
    threshold: number
): Promise<WakeWordModel> {
    const ModelConstructor = await getWakeWordModelConstructor();
    if (!ModelConstructor) {
        throw new Error('Model constructor is not available');
    }

    if (WAKE_WORD_DEBUG) {
        console.debug('[WakeWord] Lifecycle: Loading model configuration...');
    }

    return new ModelConstructor({
        wakewordModels: [wakeWord.modelPath],
        melspectrogramModelPath: '/models/melspectrogram.onnx',
        embeddingModelPath: '/models/embedding_model.onnx',
        inferenceFramework: 'onnx' as const,
        wasmPaths: window.location.origin + '/models/',
        thresholds: {
            [getModelKeyFromPath(wakeWord.modelPath)]: threshold
        }
    });
}

export function getCurrentWakeWord(): WakeWordDefinition {
    return getWakeWordDefinition(currentWakeWordId);
}

async function getWakeWordModelConstructor() {
    if (!OpenWakeWordModel) {
        // @ts-ignore
        const openWakeWordModule = await import('openwakeword-js');
        OpenWakeWordModel = openWakeWordModule.Model;
    }

    return OpenWakeWordModel;
}

export async function preloadWakeWordModel(opts: PreloadWakeWordOptions = {}): Promise<WakeWordDefinition> {
    const wakeWord = getWakeWordDefinition(opts.wakeWordId);

    if (model && loadedModelWakeWordId === wakeWord.id) {
        return wakeWord;
    }

    if (preloadPromise && preloadingWakeWordId === wakeWord.id) {
        await preloadPromise;
        return wakeWord;
    }

    const preloadStartedAt = getTimingNow();
    const loadSequence = ++modelLoadSequence;
    const threshold = currentWakeWordId === wakeWord.id ? currentThreshold : wakeWord.threshold;

    preloadingWakeWordId = wakeWord.id;
    if (loadedModelWakeWordId && loadedModelWakeWordId !== wakeWord.id) {
        clearLoadedModelCache();
    }

    const task = (async (): Promise<WakeWordDefinition> => {
        console.info(`[WakeWord] Preloading runtime for "${wakeWord.phrase}"...`);
        const nextModel = await createWakeWordModel(wakeWord, threshold);
        const initStartedAt = getTimingNow();
        await nextModel.init();
        logWakeWordTiming(`model.init(${wakeWord.id})`, initStartedAt);

        if (loadSequence !== modelLoadSequence) {
            return wakeWord;
        }

        model = nextModel;
        loadedModelWakeWordId = wakeWord.id;
        console.info(`[WakeWord] Preloaded runtime for "${wakeWord.phrase}".`);
        return wakeWord;
    })();

    preloadPromise = task;

    try {
        const result = await task;
        if (loadSequence === modelLoadSequence) {
            logWakeWordTiming(`preload(${wakeWord.id})`, preloadStartedAt);
        }
        return result;
    } catch (error) {
        if (loadSequence === modelLoadSequence) {
            clearLoadedModelCache();
        }
        throw error;
    } finally {
        if (preloadPromise === task) {
            preloadPromise = null;
        }
        if (loadSequence === modelLoadSequence && preloadingWakeWordId === wakeWord.id) {
            preloadingWakeWordId = null;
        }
    }
}

function dispatchDetected(detail: WakeWordDetectedDetail): void {
    window.dispatchEvent(new CustomEvent<WakeWordDetectedDetail>(WAKE_WORD_DETECTED_EVENT, { detail }));
    onDetectCallback?.(detail);
}

async function processAudio(samples: Float32Array): Promise<void> {
    if (!model || !isModelReady || isInferring) return;

    isInferring = true;
    try {
        const scores = await model.predict(samples);
        const now = Date.now();

        if (WAKE_WORD_DEBUG && now - lastLogTime > 1000) {
            const display = Object.entries(scores)
                .map(([key, value]) => `${key}=${value.toFixed(3)}`)
                .join(', ');
            if (display) {
                console.debug(`[WakeWord] scores: ${display}`);
            }
            lastLogTime = now;
        }

        if (now - lastDetectionTime < COOLDOWN_MS) {
            return;
        }

        const wakeWord = getCurrentWakeWord();
        const targetKey = getModelKeyFromPath(wakeWord.modelPath);
        const score = scores[targetKey] ?? Math.max(...Object.values(scores), 0);

        // Debug trace for scores that are "close" to help troubleshoot reliability
        if (WAKE_WORD_DEBUG && score > 0.20 && score < currentThreshold && now - lastLogTime > 500) {
            console.debug(`[WakeWord] "${targetKey}" detected at ${score.toFixed(3)} - below threshold ${currentThreshold}`);
        }

        if (score >= currentThreshold) {
            const detail: WakeWordDetectedDetail = {
                id: wakeWord.id,
                label: wakeWord.label,
                phrase: wakeWord.phrase,
                score
            };

            console.log(`[WakeWord] SUCCESS: "${wakeWord.phrase}" (${targetKey}) detected at score ${score.toFixed(3)}`);
            lastDetectionTime = now;
            model.reset?.();
            dispatchDetected(detail);
        }
    } catch (error) {
        console.warn('[WakeWord] Inference failed:', error);
    } finally {
        isInferring = false;
    }
}

function enqueueOrProcess(samples: Float32Array): void {
    if (!isRunning || !isModelReady || !accumulator) return;

    const now = Date.now();
    if (WAKE_WORD_DEBUG && now - lastHeartbeatTime > 5000) {
        console.debug(`[WakeWord] heart-beat: Audio flowing (${samples.length} samples, offset ${accumulatorOffset})`);
        lastHeartbeatTime = now;
    }

    for (let i = 0; i < samples.length; i++) {
        accumulator[accumulatorOffset] = samples[i];
        accumulatorOffset++;

        if (accumulatorOffset >= ACCUMULATOR_SIZE) {
            // Buffer is full (1280 samples at 16kHz)! 
            // Copy into pre-allocated pending buffer to avoid GC pressure
            pendingBuffer.set(accumulator);
            pendingSamples = pendingBuffer;
            accumulatorOffset = 0;

            if (!isInferring) {
                void drainLatestSamples();
            }
            
            // IMPORTANT: If we have more samples in the incoming buffer, 
            // the loop continues and fills the NEXT frame starting from offset 0.
        }
    }
}

async function drainLatestSamples(): Promise<void> {
    while (pendingSamples && isRunning && isModelReady && model && !isInferring) {
        const nextSamples = pendingSamples;
        pendingSamples = null;
        await processAudio(nextSamples);
    }
}


function teardownAudioGraph(): void {
    if (audioWorkletNode) {
        try { audioWorkletNode.disconnect(); } catch { /* already disconnected */ }
        audioWorkletNode = null;
    }
    if (sourceNode) {
        try { sourceNode.disconnect(); } catch { /* already disconnected */ }
        sourceNode = null;
    }
    if (sinkGainNode) {
        try { sinkGainNode.disconnect(); } catch { /* already disconnected */ }
        sinkGainNode = null;
    }

    removeResumeListeners?.();
    removeResumeListeners = null;

    if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        mediaStream = null;
    }

    if (audioSuspendLocked) {
        unlockAudioSuspend();
        audioSuspendLocked = false;
    }

    // Revoke blob URL to free memory, but DON'T reset isWorkletRegistered —
    // the processor is registered on the shared AudioContext which persists.
    // Re-registering the same name throws NotSupportedError.
    if (workletBlobUrl) {
        URL.revokeObjectURL(workletBlobUrl);
        workletBlobUrl = null;
    }

    audioContext = null;
}

export async function startListening(opts: StartListeningOptions = {}): Promise<WakeWordDefinition> {
    const wakeWord = getWakeWordDefinition(opts.wakeWordId);
    const nextThreshold = opts.detectionThreshold ?? wakeWord.threshold;
    const wakeWordChanged = currentWakeWordId !== wakeWord.id;

    onDetectCallback = opts.onDetect ?? onDetectCallback;

    if (isRunning || isStarting) {
        currentWakeWordId = wakeWord.id;
        currentThreshold = nextThreshold;
        if (!wakeWordChanged) {
            return wakeWord;
        }
        stopListening();
    }

    if (loadedModelWakeWordId && loadedModelWakeWordId !== wakeWord.id) {
        releaseWakeWordRuntime();
    }

    const sequence = ++startSequence;
    const listeningStartedAt = getTimingNow();
    isStarting = true;
    isRunning = true;
    isModelReady = false;
    currentWakeWordId = wakeWord.id;
    currentThreshold = nextThreshold;
    pendingSamples = null;
    accumulatorOffset = 0;
    lastDetectionTime = 0;
    lastLogTime = 0;

    try {
        await preloadWakeWordModel({ wakeWordId: wakeWord.id });

        if (sequence !== startSequence || !isRunning) {
            throw new Error('Wake word start aborted');
        }

        if (!model || loadedModelWakeWordId !== wakeWord.id) {
            throw new Error(`Wake word runtime for "${wakeWord.id}" is not available`);
        }

        try {
            model.reset?.();
        } catch (error) {
            console.warn('[WakeWord] Failed to reset cached model state before listening:', error);
        }

        if (WAKE_WORD_DEBUG) {
            console.debug('[WakeWord] Lifecycle: Reusing preloaded model runtime.');
        }
        if (!mediaStream) {
            const getUserMediaStartedAt = getTimingNow();
            mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    sampleRate: { ideal: 16000 }
                }
            });
            logWakeWordTiming('getUserMedia', getUserMediaStartedAt);
            if (WAKE_WORD_DEBUG) {
                console.debug('[WakeWord] Lifecycle: Microphone access granted.');
            }
        } else if (WAKE_WORD_DEBUG) {
            console.debug('[WakeWord] Lifecycle: Microphone already prepared.');
        }

        if (sequence !== startSequence || !isRunning) {
            throw new Error('Wake word start aborted');
        }

        if (!audioContext) {
            if (WAKE_WORD_DEBUG) {
                console.debug('[WakeWord] Lifecycle: Requesting shared AudioContext...');
            }
            audioContext = getSharedAudioContext(true);
        } else if (WAKE_WORD_DEBUG) {
            console.debug('[WakeWord] Lifecycle: Reusing existing AudioContext.');
        }
        if (WAKE_WORD_DEBUG) {
            console.debug('[WakeWord] Lifecycle: AudioContext state:', audioContext.state);
        }

        if (!workletBlobUrl) {
            const blob = new Blob([workletCode], { type: 'application/javascript' });
            workletBlobUrl = URL.createObjectURL(blob);
        }

        const workletReadyStartedAt = getTimingNow();
        lockAudioSuspend(); // Prevent auto-suspend while listening
        audioSuspendLocked = true;
        if (!isWorkletRegistered && audioContext.audioWorklet) {
            if (WAKE_WORD_DEBUG) {
                console.debug('[WakeWord] Lifecycle: Registering AudioWorklet module...');
            }
            await audioContext.audioWorklet.addModule(workletBlobUrl);
            isWorkletRegistered = true;
            if (WAKE_WORD_DEBUG) {
                console.debug('[WakeWord] Lifecycle: AudioWorklet module registered.');
            }
        } else if (WAKE_WORD_DEBUG) {
            console.debug('[WakeWord] Lifecycle: AudioWorklet module already registered.');
        }

        // Try to resume immediately - might fail if not in a user gesture at THIS exact moment, 
        // but we now call this from user gestures in the UI.
        if (audioContext.state !== 'running') {
            try {
                if (WAKE_WORD_DEBUG) {
                    console.debug('[WakeWord] Attempting to resume AudioContext...');
                }
                await audioContext.resume();
                if (WAKE_WORD_DEBUG) {
                    console.debug('[WakeWord] AudioContext resume status:', audioContext.state);
                }
            } catch (error) {
                console.warn('[WakeWord] AudioContext resume was blocked; will wait for interaction.', error);
            }
        }

        if (audioContext.state !== 'running') {
            const handleResumeAttempt = () => {
                void resumeAudioContextOnInteraction();
            };

            window.addEventListener('pointerdown', handleResumeAttempt, { passive: true });
            window.addEventListener('keydown', handleResumeAttempt, { passive: true });
            window.addEventListener('touchstart', handleResumeAttempt, { passive: true });

            removeResumeListeners = () => {
                window.removeEventListener('pointerdown', handleResumeAttempt);
                window.removeEventListener('keydown', handleResumeAttempt);
                window.removeEventListener('touchstart', handleResumeAttempt);
            };
        }

        sourceNode = audioContext.createMediaStreamSource(mediaStream);
        
        // 100% RAW AUDIO INPUT (Matching Test CURIO bit-for-bit)
        audioWorkletNode = new AudioWorkletNode(audioContext, 'wake-word-processor');
        sinkGainNode = audioContext.createGain();
        sinkGainNode.gain.value = 0;

        const nativeRate = audioContext.sampleRate;
        audioWorkletNode.port.onmessage = (event: MessageEvent<Float32Array>) => {
            if (!isRunning) return;
            // Linear downsampling to 16kHz
            const resampled = downsampleBuffer(event.data, nativeRate, 16000);
            enqueueOrProcess(resampled);
        };

        // Chain: Mic -> Wakeword Processor (avoid routing to main destination)
        // Routing mic audio to audioContext.destination triggers browser audio ducking
        // which lowers YouTube/music volume. Use a silent MediaStreamDestination instead.
        sourceNode.connect(audioWorkletNode);
        try {
            const silentDest = audioContext.createMediaStreamDestination();
            sinkGainNode = audioContext.createGain();
            sinkGainNode.gain.value = 0;
            audioWorkletNode.connect(sinkGainNode);
            sinkGainNode.connect(silentDest);
        } catch {
            // Fallback: worklet keeps running from input connection alone
        }
        logWakeWordTiming('workletReady', workletReadyStartedAt);

        isModelReady = true;
        logWakeWordTiming(`listeningReady(${wakeWord.id})`, listeningStartedAt);
        if (WAKE_WORD_DEBUG) {
            console.debug(`[WakeWord] Listening for "${wakeWord.phrase}" at threshold ${nextThreshold}.`);
        }
        return wakeWord;
    } catch (error) {
        if (sequence === startSequence) {
            isStarting = false;
            removeResumeListeners?.();
            removeResumeListeners = null;
            // Only log as error if it's not a normal abort (e.g., user connected while starting)
            if (!(error instanceof Error && error.message === 'Wake word start aborted')) {
                console.error('[WakeWord] Failed to start:', error);
            }
            stopListening();
        }
        throw error;
    } finally {
        if (sequence === startSequence) {
            isStarting = false;
        }
    }
}

export function stopListening(): void {
    const wasAudioSuspendLocked = audioSuspendLocked;
    try {
        isRunning = false;
        isStarting = false;
        isModelReady = false;
        isInferring = false;
        pendingSamples = null;
        accumulatorOffset = 0;
        onDetectCallback = null;

        teardownAudioGraph();

        if (WAKE_WORD_DEBUG) {
            console.debug(
                loadedModelWakeWordId
                    ? `[WakeWord] Stopped active listening; cached runtime retained for "${loadedModelWakeWordId}".`
                    : '[WakeWord] Stopped.'
            );
        }
    } finally {
        // Ensure unlockAudioSuspend is called even if teardownAudioGraph throws
        if (wasAudioSuspendLocked && audioSuspendLocked) {
            unlockAudioSuspend();
            audioSuspendLocked = false;
        }
    }
}

export function releaseWakeWordRuntime(): void {
    const hadCachedRuntime = !!model || !!loadedModelWakeWordId || !!preloadPromise;
    stopListening();
    invalidateLoadedModelCache();
    if (hadCachedRuntime) {
        console.info('[WakeWord] Released cached wake-word runtime.');
    }
}

export function takePreparedMediaStream(): MediaStream | null {
    const preparedStream = mediaStream;
    mediaStream = null;
    return preparedStream;
}

export function isListening(): boolean {
    return isRunning;
}

export function stopListeningAndUnlock(): void {
    stopListening();
}

async function resumeAudioContextOnInteraction(): Promise<void> {
    if (!audioContext || audioContext.state === 'running') {
        return;
    }

    try {
        await audioContext.resume();
    } catch {
        // Ignore resume failures; the next user interaction can retry.
    }

    if ((audioContext as AudioContext).state === 'running') {
        removeResumeListeners?.();
        removeResumeListeners = null;
    }
}
export async function prepareWakeWordAudio(): Promise<void> {
    if (WAKE_WORD_DEBUG) {
        console.debug('[WakeWord] Preparing audio via user interaction...');
    }
    try {
        if (!mediaStream) {
            const getUserMediaStartedAt = getTimingNow();
            mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    sampleRate: { ideal: 16000 }
                }
            });
            logWakeWordTiming('prepareWakeWordAudio.getUserMedia', getUserMediaStartedAt);
            if (WAKE_WORD_DEBUG) {
                console.debug('[WakeWord] Microphone access granted via preparation.');
            }
        }

        if (!audioContext) {
            audioContext = getSharedAudioContext(true);
            if (WAKE_WORD_DEBUG) {
                console.debug('[WakeWord] AudioContext shared via preparation. State:', audioContext.state);
            }
        }

        if (audioContext.state !== 'running') {
            await audioContext.resume();
            if (WAKE_WORD_DEBUG) {
                console.debug('[WakeWord] AudioContext resumed via preparation. State:', audioContext.state);
            }
        }
    } catch (error) {
        console.error('[WakeWord] Failed to prepare audio:', error);
        throw error;
    }
}

export function resetWakeWordServiceForTests(): void {
    releaseWakeWordRuntime();
    OpenWakeWordModel = null;
    audioContext = null;
    mediaStream = null;
    audioWorkletNode = null;
    workletBlobUrl = null;
    isWorkletRegistered = false;
    sourceNode = null;
    sinkGainNode = null;
    removeResumeListeners = null;
    audioSuspendLocked = false;
    isRunning = false;
    isStarting = false;
    isModelReady = false;
    isInferring = false;
    currentWakeWordId = DEFAULT_WAKE_WORD_ID;
    currentThreshold = getWakeWordDefinition(DEFAULT_WAKE_WORD_ID).threshold;
    onDetectCallback = null;
    lastDetectionTime = 0;
    lastLogTime = 0;
    lastHeartbeatTime = 0;
    startSequence = 0;
    modelLoadSequence = 0;
    pendingSamples = null;
    accumulatorOffset = 0;
    downsampleOutputBuffer = null;
}
