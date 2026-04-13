const PROCESSOR_PREFIX = 'curio-pcm-capture';
const MIN_BUFFER_SIZE = 128;

const loadedProcessorsByContext = new WeakMap<AudioContext, Set<string>>();
const moduleUrlByProcessor = new Map<string, string>();

const normalizeBufferSize = (bufferSize: number): number => Math.max(MIN_BUFFER_SIZE, Math.floor(bufferSize));

const getProcessorName = (bufferSize: number): string => `${PROCESSOR_PREFIX}-${bufferSize}`;

const getProcessorModuleUrl = (processorName: string, bufferSize: number): string => {
    const cacheKey = `${processorName}:${bufferSize}`;
    const existingUrl = moduleUrlByProcessor.get(cacheKey);
    if (existingUrl) return existingUrl;

    const processorCode = `
class CurioPcmCaptureProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super();
        this.bufferSize = ${bufferSize};
        this.buffer = new Float32Array(this.bufferSize);
        this.offset = 0;
        this.gateThreshold = options.processorOptions?.gateThreshold || 0;
    }


    process(inputs) {
        const input = inputs[0];
        if (!input || input.length === 0) return true;

        const channelData = input[0];
        if (!channelData || channelData.length === 0) return true;

        let inputOffset = 0;
        while (inputOffset < channelData.length) {
            const remaining = this.bufferSize - this.offset;
            const available = channelData.length - inputOffset;
            const copyCount = Math.min(remaining, available);

            this.buffer.set(channelData.subarray(inputOffset, inputOffset + copyCount), this.offset);
            this.offset += copyCount;
            inputOffset += copyCount;

            if (this.offset >= this.bufferSize) {
                // SOFTWARE NOISE GATE: 
                // Calculate RMS energy. If below threshold, set buffer to zero.
                if (this.gateThreshold > 0) {
                    let sum = 0;
                    for (let i = 0; i < this.bufferSize; i++) {
                        sum += this.buffer[i] * this.buffer[i];
                    }
                    const rms = Math.sqrt(sum / this.bufferSize);
                    if (rms < this.gateThreshold) {
                        this.buffer.fill(0);
                    }
                }

                this.port.postMessage(this.buffer);
                this.buffer = new Float32Array(this.bufferSize);
                this.offset = 0;
            }

        }

        return true;
    }
}

registerProcessor('${processorName}', CurioPcmCaptureProcessor);
`;

    const blob = new Blob([processorCode], { type: 'application/javascript' });
    const moduleUrl = URL.createObjectURL(blob);
    moduleUrlByProcessor.set(cacheKey, moduleUrl);
    return moduleUrl;
};

const ensureProcessorLoaded = async (audioContext: AudioContext, processorName: string, bufferSize: number): Promise<void> => {
    if (!audioContext.audioWorklet) {
        throw new Error('AudioWorklet is not supported in this browser.');
    }

    let loadedProcessors = loadedProcessorsByContext.get(audioContext);
    if (!loadedProcessors) {
        loadedProcessors = new Set<string>();
        loadedProcessorsByContext.set(audioContext, loadedProcessors);
    }

    if (loadedProcessors.has(processorName)) return;

    const moduleUrl = getProcessorModuleUrl(processorName, bufferSize);
    await audioContext.audioWorklet.addModule(moduleUrl);
    loadedProcessors.add(processorName);
};

export const createPcmCaptureWorkletNode = async (
    audioContext: AudioContext,
    onChunk: (chunk: Float32Array) => void,
    bufferSize: number = 4096,
    gateThreshold: number = 0,
): Promise<AudioWorkletNode> => {

    const normalizedBufferSize = normalizeBufferSize(bufferSize);
    const processorName = getProcessorName(normalizedBufferSize);

    await ensureProcessorLoaded(audioContext, processorName, normalizedBufferSize);

    const node = new AudioWorkletNode(audioContext, processorName, {
        processorOptions: { gateThreshold }
    });

    node.port.onmessage = (event: MessageEvent<Float32Array>) => {
        onChunk(event.data);
    };
    return node;
};

/**
 * Revoke all cached blob URLs for audio worklet processor modules.
 * Call this during app teardown to prevent blob URL leaks.
 */
export const revokeProcessorBlobUrls = (): void => {
    for (const [, url] of moduleUrlByProcessor) {
        try { URL.revokeObjectURL(url); } catch {}
    }
    moduleUrlByProcessor.clear();
};
