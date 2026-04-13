import { getApiKeyAsync } from '../services/ai/config';
import { useSettingsStorageValue } from './settingsStorage';
import { getSecret } from './secretStorage';

export const getActiveAiApiKey = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    // Synchronous fallback — returns '' if encrypted.
    // Callers that need the real key should use getActiveAiApiKeyAsync().
    return '';
};

export const getActiveAiApiKeyAsync = async (): Promise<string> => {
    return (await getApiKeyAsync()) || '';
};

export const useActiveAiApiKey = () => useSettingsStorageValue(getActiveAiApiKey, '');

export const getNasaApiKey = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    return import.meta.env.VITE_NASA_API_KEY || '';
};

export const getNasaApiKeyAsync = async (): Promise<string> => {
    const stored = await getSecret('nasa_api_key');
    return stored || import.meta.env.VITE_NASA_API_KEY || '';
};

export const useNasaApiKey = () => useSettingsStorageValue(getNasaApiKey, '');
