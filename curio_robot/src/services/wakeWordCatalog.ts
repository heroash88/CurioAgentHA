export const WAKE_WORD_DETECTED_EVENT = 'WAKE_WORD_DETECTED';
export const DEFAULT_WAKE_WORD_ID = 'hey-curio';
export const DEFAULT_WAKE_WORD_ENABLED = false;

export interface WakeWordDefinition {
    id: string;
    label: string;
    phrase: string;
    modelPath: string;
    threshold: number;
}

export interface WakeWordDetectedDetail {
    id: string;
    label: string;
    phrase: string;
    score: number;
}

export const BUILTIN_WAKE_WORDS: WakeWordDefinition[] = [
    {
        id: 'hey-curio',
        label: 'Hey Curio',
        phrase: 'Hey Curio',
        modelPath: '/models/Hey_Curio.onnx',
        threshold: 0.25
    },
    {
        id: 'curio',
        label: 'Curio',
        phrase: 'Curio',
        modelPath: '/models/Curio.onnx',
        threshold: 0.30
    },
    {
        id: 'bimo',
        label: 'Bimo',
        phrase: 'Bimo',
        modelPath: '/models/BIMO.onnx',
        threshold: 0.35
    },
    {
        id: 'robot',
        label: 'Robot',
        phrase: 'Robot',
        modelPath: '/models/Robot.onnx',
        threshold: 0.35
    },
    {
        id: 'jarvis',
        label: 'Jarvis',
        phrase: 'Jarvis',
        modelPath: '/models/jarvis_v2.onnx',
        threshold: 0.35
    },
    {
        id: 'hello-deepa',
        label: 'Hello Deepa',
        phrase: 'Hello Deepa',
        modelPath: '/models/hello_deepa.onnx',
        threshold: 0.42
    },
    {
        id: 'namaste-deepa',
        label: 'Namaste Deepa',
        phrase: 'Namaste Deepa',
        modelPath: '/models/namaste_deepa.onnx',
        threshold: 0.42
    }
];

export function getAvailableWakeWords(): WakeWordDefinition[] {
    return BUILTIN_WAKE_WORDS.map((wakeWord) => ({ ...wakeWord }));
}

export function resolveWakeWordId(candidate: string | null | undefined): string {
    if (!candidate) return DEFAULT_WAKE_WORD_ID;
    const normalized = String(candidate).trim().toLowerCase();
    const match = BUILTIN_WAKE_WORDS.find((wakeWord) => wakeWord.id === normalized);
    return match?.id ?? DEFAULT_WAKE_WORD_ID;
}

export function getWakeWordDefinition(wakeWordId: string | null | undefined): WakeWordDefinition {
    const resolvedId = resolveWakeWordId(wakeWordId);
    return BUILTIN_WAKE_WORDS.find((wakeWord) => wakeWord.id === resolvedId) || BUILTIN_WAKE_WORDS[0];
}
