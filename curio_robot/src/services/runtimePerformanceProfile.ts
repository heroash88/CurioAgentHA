import { useEffect, useMemo, useState } from 'react';

export interface RuntimePerformanceProfileInput {
    lowPowerMode: boolean;
    isConnected?: boolean;
    isConnecting?: boolean;
    screensaverActive?: boolean;
    visibilityState?: DocumentVisibilityState;
}

export interface RuntimePerformanceProfile {
    documentHidden: boolean;
    allowDisconnectedPreload: boolean;
    allowAmbientAnimation: boolean;
    allowScreensaverHeavyEffects: boolean;
    allowHighFrequencyWeatherRefresh: boolean;
    allowFaceTrackingBackgroundWork: boolean;
    faceTrackingPollIntervalMs: number;
    screensaverSlideIntervalMs: number;
    screensaverUrlRefreshIntervalMs: number;
}

const getDefaultVisibilityState = (): DocumentVisibilityState =>
    typeof document === 'undefined' ? 'visible' : document.visibilityState;

export const createRuntimePerformanceProfile = ({
    lowPowerMode,
    isConnected = false,
    isConnecting = false,
    screensaverActive = false,
    visibilityState = getDefaultVisibilityState(),
}: RuntimePerformanceProfileInput): RuntimePerformanceProfile => {
    const connectedSession = isConnected || isConnecting;
    const documentHidden = visibilityState === 'hidden';

    return {
        documentHidden,
        allowDisconnectedPreload: !lowPowerMode && !documentHidden,
        // In low power mode, still allow ambient animation but at reduced fidelity
        // so the face doesn't look dead. The face engine itself throttles animations.
        allowAmbientAnimation: !documentHidden && !screensaverActive,
        allowScreensaverHeavyEffects: !documentHidden && !lowPowerMode,
        allowHighFrequencyWeatherRefresh: !documentHidden && !lowPowerMode && !screensaverActive,
        allowFaceTrackingBackgroundWork: !documentHidden && !screensaverActive,
        faceTrackingPollIntervalMs: lowPowerMode ? (connectedSession ? 120 : 180) : 80,
        screensaverSlideIntervalMs: lowPowerMode ? 60_000 : 30_000,
        screensaverUrlRefreshIntervalMs: lowPowerMode ? 55 * 60_000 : 45 * 60_000,
    };
};

export const useRuntimePerformanceProfile = (
    input: Omit<RuntimePerformanceProfileInput, 'visibilityState'>,
): RuntimePerformanceProfile => {
    const [visibilityState, setVisibilityState] = useState<DocumentVisibilityState>(getDefaultVisibilityState);

    useEffect(() => {
        if (typeof document === 'undefined') {
            return undefined;
        }

        const handleVisibilityChange = () => {
            setVisibilityState(document.visibilityState);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return useMemo(
        () => createRuntimePerformanceProfile({ ...input, visibilityState }),
        [
            input.isConnected,
            input.isConnecting,
            input.lowPowerMode,
            input.screensaverActive,
            visibilityState,
        ],
    );
};
