export interface NormalizedPoint {
  x: number;
  y: number;
}

export interface FaceTrackingBackend {
  kind: 'native' | 'mediapipe';
  detect(source: HTMLCanvasElement, timestampMs: number): Promise<NormalizedPoint | null>;
  dispose(): Promise<void> | void;
}

interface NativeDetectedFace {
  boundingBox?: DOMRectReadOnly | DOMRect;
}

interface NativeFaceDetectorInstance {
  detect(input: CanvasImageSource): Promise<NativeDetectedFace[]>;
}

interface NativeFaceDetectorConstructor {
  new (options?: { fastMode?: boolean; maxDetectedFaces?: number }): NativeFaceDetectorInstance;
}

interface MediaPipeDetection {
  boundingBox?: Record<string, unknown>;
  relativeBoundingBox?: Record<string, unknown>;
  locationData?: {
    boundingBox?: Record<string, unknown>;
    relativeBoundingBox?: Record<string, unknown>;
    keypoints?: Array<Record<string, unknown>>;
    relativeKeypoints?: Array<Record<string, unknown>>;
  };
  keypoints?: Array<Record<string, unknown>>;
  landmarks?: Array<Record<string, unknown>>;
}

interface MediaPipeTasksVisionResolver {
  forVisionTasks(basePath: string): Promise<unknown>;
}

interface MediaPipeTasksFaceDetectorInstance {
  detectForVideo(
    input: CanvasImageSource,
    timestampMs: number,
  ): {
    detections?: MediaPipeDetection[];
  };
  close?: () => Promise<void> | void;
}

interface MediaPipeTasksFaceDetectorConstructor {
  createFromOptions(
    vision: unknown,
    options: {
      baseOptions: {
        modelAssetPath: string;
        delegate?: 'CPU' | 'GPU';
      };
      runningMode: 'VIDEO';
      minDetectionConfidence: number;
      minSuppressionThreshold?: number;
    },
  ): Promise<MediaPipeTasksFaceDetectorInstance>;
}

type WindowWithFaceTrackingBackends = Window &
  typeof globalThis & {
    FaceDetector?: NativeFaceDetectorConstructor;
  };

const MEDIAPIPE_TASKS_VISION_VERSION = '0.10.1';
const MEDIAPIPE_TASKS_VISION_ROOT =
  `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_TASKS_VISION_VERSION}`;
const MEDIAPIPE_FACE_MODEL_PATH = '/models/blaze_face_short_range.tflite';

let cachedNativeFaceDetector: NativeFaceDetectorConstructor | null | undefined;
let mediaPipeTasksVisionModulePromise: Promise<{
  FilesetResolver: MediaPipeTasksVisionResolver;
  FaceDetector: MediaPipeTasksFaceDetectorConstructor;
}> | null = null;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalizeCoordinate = (value: unknown, dimension: number) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  if (value >= 0 && value <= 1) {
    return value;
  }

  if (dimension > 0) {
    return value / dimension;
  }

  return null;
};

const extractNormalizedPoint = (
  candidate: Record<string, unknown> | null | undefined,
  frameWidth: number,
  frameHeight: number,
): NormalizedPoint | null => {
  if (!candidate) {
    return null;
  }

  const normalizedX = normalizeCoordinate(candidate.x, frameWidth);
  const normalizedY = normalizeCoordinate(candidate.y, frameHeight);

  if (normalizedX === null || normalizedY === null) {
    return null;
  }

  return { x: normalizedX, y: normalizedY };
};

const extractNormalizedCenter = (
  box: Record<string, unknown> | null | undefined,
  frameWidth: number,
  frameHeight: number,
): NormalizedPoint | null => {
  if (!box) {
    return null;
  }

  const width = normalizeCoordinate(box.width, frameWidth);
  const height = normalizeCoordinate(box.height, frameHeight);

  if (typeof box.xCenter === 'number' && typeof box.yCenter === 'number') {
    const x = normalizeCoordinate(box.xCenter, frameWidth);
    const y = normalizeCoordinate(box.yCenter, frameHeight);
    return x === null || y === null ? null : { x, y };
  }

  if (typeof box.xMin === 'number' && typeof box.yMin === 'number' && width !== null && height !== null) {
    const xMin = normalizeCoordinate(box.xMin, frameWidth);
    const yMin = normalizeCoordinate(box.yMin, frameHeight);
    return xMin === null || yMin === null ? null : { x: xMin + width / 2, y: yMin + height / 2 };
  }

  if (typeof box.xmin === 'number' && typeof box.ymin === 'number' && width !== null && height !== null) {
    const xMin = normalizeCoordinate(box.xmin, frameWidth);
    const yMin = normalizeCoordinate(box.ymin, frameHeight);
    return xMin === null || yMin === null ? null : { x: xMin + width / 2, y: yMin + height / 2 };
  }

  if (typeof box.originX === 'number' && typeof box.originY === 'number' && width !== null && height !== null) {
    const originX = normalizeCoordinate(box.originX, frameWidth);
    const originY = normalizeCoordinate(box.originY, frameHeight);
    return originX === null || originY === null ? null : { x: originX + width / 2, y: originY + height / 2 };
  }

  return null;
};

export const extractFaceCenterFromMediaPipeDetection = (
  detection: MediaPipeDetection | null | undefined,
  frameWidth: number,
  frameHeight: number,
): NormalizedPoint | null => {
  if (!detection) {
    return null;
  }

  const keypointCollections = [
    detection.keypoints,
    detection.landmarks,
    detection.locationData?.relativeKeypoints,
    detection.locationData?.keypoints,
  ];

  for (const keypoints of keypointCollections) {
    if (!Array.isArray(keypoints) || keypoints.length === 0) {
      continue;
    }

    const normalizedPoints = keypoints
      .map((keypoint) => extractNormalizedPoint(keypoint, frameWidth, frameHeight))
      .filter((point): point is NormalizedPoint => Boolean(point));

    if (normalizedPoints.length >= 2) {
      return {
        x: (normalizedPoints[0].x + normalizedPoints[1].x) / 2,
        y: (normalizedPoints[0].y + normalizedPoints[1].y) / 2,
      };
    }

    if (normalizedPoints.length === 1) {
      return normalizedPoints[0];
    }
  }

  return (
    extractNormalizedCenter(detection.relativeBoundingBox, frameWidth, frameHeight) ||
    extractNormalizedCenter(detection.boundingBox, frameWidth, frameHeight) ||
    extractNormalizedCenter(detection.locationData?.relativeBoundingBox, frameWidth, frameHeight) ||
    extractNormalizedCenter(detection.locationData?.boundingBox, frameWidth, frameHeight)
  );
};

export const extractFaceCenterFromNativeDetections = (
  detections: NativeDetectedFace[] | null | undefined,
  frameWidth: number,
  frameHeight: number,
): NormalizedPoint | null => {
  if (!Array.isArray(detections) || detections.length === 0 || frameWidth <= 0 || frameHeight <= 0) {
    return null;
  }

  const face = detections
    .filter((candidate) => candidate?.boundingBox)
    .sort((left, right) => {
      const leftArea = (left.boundingBox?.width ?? 0) * (left.boundingBox?.height ?? 0);
      const rightArea = (right.boundingBox?.width ?? 0) * (right.boundingBox?.height ?? 0);
      return rightArea - leftArea;
    })[0];

  if (!face?.boundingBox) {
    return null;
  }

  return {
    x: clamp((face.boundingBox.x + face.boundingBox.width / 2) / frameWidth, 0, 1),
    y: clamp((face.boundingBox.y + face.boundingBox.height / 2) / frameHeight, 0, 1),
  };
};

export const mapFaceCenterToEyeTarget = (
  center: NormalizedPoint,
  options?: {
    maxMove?: number;
    mirrorX?: boolean;
    yScale?: number;
  },
) => {
  const maxMove = options?.maxMove ?? 20;
  const mirrorX = options?.mirrorX ?? true;
  const yScale = options?.yScale ?? 2.4;
  const xScale = 2.6;

  const centeredX = (center.x - 0.5) * maxMove * xScale;
  const centeredY = (center.y - 0.5) * maxMove * yScale;

  return {
    x: clamp(mirrorX ? -centeredX : centeredX, -maxMove, maxMove),
    y: clamp(centeredY, -maxMove, maxMove),
  };
};

export const getTrackingCanvasDimensions = (
  frameWidth: number,
  frameHeight: number,
  maxDimension: number,
) => {
  if (frameWidth <= 0 || frameHeight <= 0) {
    return { width: 0, height: 0 };
  }

  const scale =
    frameWidth > maxDimension || frameHeight > maxDimension
      ? Math.min(maxDimension / frameWidth, maxDimension / frameHeight)
      : 1;

  return {
    width: Math.max(1, Math.round(frameWidth * scale)),
    height: Math.max(1, Math.round(frameHeight * scale)),
  };
};

const getNativeFaceDetectorConstructor = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (cachedNativeFaceDetector !== undefined) {
    return cachedNativeFaceDetector;
  }

  const candidate = (window as WindowWithFaceTrackingBackends).FaceDetector;
  cachedNativeFaceDetector =
    typeof candidate === 'function' && typeof candidate.prototype?.detect === 'function'
      ? (candidate as NativeFaceDetectorConstructor)
      : null;

  return cachedNativeFaceDetector;
};

const loadMediaPipeTasksVisionModule = async () => {
  if (!mediaPipeTasksVisionModulePromise) {
    mediaPipeTasksVisionModulePromise = import(
      /* @vite-ignore */ `${MEDIAPIPE_TASKS_VISION_ROOT}/+esm`
    )
      .then((module) => ({
        FilesetResolver: module.FilesetResolver as MediaPipeTasksVisionResolver,
        FaceDetector: module.FaceDetector as MediaPipeTasksFaceDetectorConstructor,
      }))
      .catch((error) => {
        mediaPipeTasksVisionModulePromise = null;
        throw error;
      });
  }

  return await mediaPipeTasksVisionModulePromise;
};

const createNativeBackend = async (): Promise<FaceTrackingBackend | null> => {
  const NativeFaceDetector = getNativeFaceDetectorConstructor();
  if (!NativeFaceDetector) {
    return null;
  }

  const detector = new NativeFaceDetector({
    fastMode: true,
    maxDetectedFaces: 1,
  });

  return {
    kind: 'native',
    async detect(source) {
      return extractFaceCenterFromNativeDetections(
        await detector.detect(source),
        source.width,
        source.height,
      );
    },
    dispose() {},
  };
};

const createMediaPipeBackend = async (): Promise<FaceTrackingBackend> => {
  const { FilesetResolver, FaceDetector: TaskFaceDetector } = await loadMediaPipeTasksVisionModule();

  const vision = await FilesetResolver.forVisionTasks(`${MEDIAPIPE_TASKS_VISION_ROOT}/wasm`);
  const createDetector = async (delegate?: 'CPU' | 'GPU') =>
    await TaskFaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MEDIAPIPE_FACE_MODEL_PATH,
        ...(delegate ? { delegate } : {}),
      },
      runningMode: 'VIDEO',
      minDetectionConfidence: 0.5,
      minSuppressionThreshold: 0.3,
    });

  let detector: MediaPipeTasksFaceDetectorInstance;
  try {
    detector = await createDetector('GPU');
  } catch {
    detector = await createDetector('CPU');
  }

  return {
    kind: 'mediapipe',
    async detect(source, timestampMs) {
      const result = detector.detectForVideo(source, timestampMs);
      const detections = Array.isArray(result?.detections) ? result.detections : [];
      return detections.length
        ? extractFaceCenterFromMediaPipeDetection(detections[0], source.width, source.height)
        : null;
    },
    async dispose() {
      const closeResult = detector.close?.();
      if (closeResult && typeof (closeResult as Promise<void>).then === 'function') {
        await closeResult;
      }
    },
  };
};

const createWorkerBackend = async (): Promise<FaceTrackingBackend | null> => {
  if (typeof Worker === 'undefined') return null;

  try {
    const worker = new Worker('/faceTrackingWorker.bundle.js');

    let resolveInit: (val: void) => void;
    let rejectInit: (err: any) => void;
    const initPromise = new Promise<void>((resolve, reject) => {
      resolveInit = resolve;
      rejectInit = reject;
    });

    let pendingDetection: { resolve: (val: NormalizedPoint | null) => void; reject: (err: any) => void } | null = null;

    worker.onmessage = (e) => {
      const { type, payload, error } = e.data;
      if (type === 'INIT_DONE') {
        resolveInit();
      } else if (type === 'RESULT') {
        if (pendingDetection) {
          pendingDetection.resolve(payload.center);
          pendingDetection = null;
        }
      } else if (type === 'ERROR') {
        if (pendingDetection) {
          pendingDetection.reject(new Error(error));
          pendingDetection = null;
        } else {
          rejectInit(new Error(error));
        }
      }
    };

    worker.postMessage({ type: 'INIT' });
    await initPromise;

    return {
      kind: 'mediapipe',
      async detect(source, timestampMs) {
        if (pendingDetection) return null; // Already in flight

        try {
          const bitmap = await createImageBitmap(source);
          return new Promise((resolve, reject) => {
            pendingDetection = { resolve, reject };
            worker.postMessage(
              {
                type: 'DETECT',
                payload: { bitmap, timestamp: timestampMs },
              },
              [bitmap],
            ); // Transfer bitmap
          });
        } catch (error) {
          console.error('[FaceTracking] Detection failed:', error);
          return null;
        }
      },
      async dispose() {
        worker.terminate();
      },
    };
  } catch (error) {
    console.warn('[FaceTracking] Failed to spawn worker:', error);
    return null;
  }
};

export const createFaceTrackingBackend = async (): Promise<FaceTrackingBackend> => {
  const nativeBackend = await createNativeBackend();
  if (nativeBackend) return nativeBackend;

  const workerBackend = await createWorkerBackend();
  if (workerBackend) return workerBackend;

  return await createMediaPipeBackend();
};
