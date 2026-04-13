import { getSecret, setSecret, hasSecret } from '../../utils/secretStorage';

export type AIProvider = 'gemini';

// Unified storage key for the Live API
// This replaces the old 'gemini_api_key' and 'gemini_audio_api_key'
export const STORAGE_KEY_GEMINI_LIVE_API_KEY = 'gemini_live_api_key';
export const STORAGE_KEY_GEMINI_LIVE_MODEL = 'gemini_live_live_model_selection';

export const GEMINI_LIVE_MODELS = [
    { id: 'gemini-3.1-flash-live-preview', name: 'Gemini 3.1 Flash Live', description: 'Latest, fastest' },
    { id: 'gemini-2.5-flash-native-audio-preview-12-2025', name: 'Gemini 2.5 Flash Native Audio', description: 'Native audio, affective dialog' },
];

/**
 * Gets the current Live API model name.
 */
export const getGeminiLiveModel = (): string => {
    const saved = localStorage.getItem(STORAGE_KEY_GEMINI_LIVE_MODEL);
    if (saved && GEMINI_LIVE_MODELS.some(m => m.id === saved)) return saved;
    return 'gemini-3.1-flash-live-preview';
};

/**
 * Sets the Live API model.
 */
export const setGeminiLiveModel = (model: string) => {
    localStorage.setItem(STORAGE_KEY_GEMINI_LIVE_MODEL, model);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('curio:settings-changed'));
};

/**
 * Built-in fallback API key.
 * Users must provide their own key via Settings.
 */
export const BUILTIN_API_KEY = '';

/**
 * Async API key retrieval for the Live API (decrypts from storage).
 */
export const getApiKeyAsync = async (): Promise<string | null> => {
    const savedKey = (await getSecret(STORAGE_KEY_GEMINI_LIVE_API_KEY)).trim();
    return savedKey || BUILTIN_API_KEY || null;
};

/**
 * Synchronous API key retrieval — returns a value only if the key
 * hasn't been encrypted yet (legacy). Once encrypted, returns BUILTIN_API_KEY.
 * Prefer getApiKeyAsync() for actual usage.
 */
export const getApiKey = (_provider?: string): string | null => {
    if (hasSecret(STORAGE_KEY_GEMINI_LIVE_API_KEY)) return '__encrypted__';
    const savedKey = localStorage.getItem(STORAGE_KEY_GEMINI_LIVE_API_KEY)?.trim();
    return savedKey || BUILTIN_API_KEY || null;
};

/**
 * Unified API key saving for the Live API (encrypts before storing).
 */
export const setApiKey = async (key: string): Promise<void> => {
    await setSecret(STORAGE_KEY_GEMINI_LIVE_API_KEY, key);
    window.dispatchEvent(new Event('storage'));
};
