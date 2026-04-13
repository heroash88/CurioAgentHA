import { FilesetResolver, FaceDetector } from '@mediapipe/tasks-vision';

interface NormalizedPoint {
  x: number;
  y: number;
}

const MEDIAPIPE_FACE_MODEL_PATH = '/models/blaze_face_short_range.tflite';
const CDN_ROOT = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.1`;

let detector: any = null;

const normalizeCoordinate = (value: unknown, dimension: number) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (value >= 0 && value <= 1) return value;
  if (dimension > 0) return value / dimension;
  return null;
};

const extractNormalizedPoint = (candidate: any, frameWidth: number, frameHeight: number): NormalizedPoint | null => {
  if (!candidate) return null;
  const normalizedX = normalizeCoordinate(candidate.x, frameWidth);
  const normalizedY = normalizeCoordinate(candidate.y, frameHeight);
  return (normalizedX === null || normalizedY === null) ? null : { x: normalizedX, y: normalizedY };
};

const extractNormalizedCenter = (box: any, frameWidth: number, frameHeight: number): NormalizedPoint | null => {
  if (!box) return null;
  if (typeof box.xCenter === 'number' && typeof box.yCenter === 'number') {
    const x = normalizeCoordinate(box.xCenter, frameWidth);
    const y = normalizeCoordinate(box.yCenter, frameHeight);
    return x === null || y === null ? null : { x, y };
  }
  return null;
};

const extractFaceCenter = (detection: any, width: number, height: number): NormalizedPoint | null => {
  if (!detection) return null;
  const keypoints = detection.keypoints || detection.landmarks || detection.locationData?.relativeKeypoints;
  if (Array.isArray(keypoints) && keypoints.length >= 2) {
    const p1 = extractNormalizedPoint(keypoints[0], width, height);
    const p2 = extractNormalizedPoint(keypoints[1], width, height);
    if (p1 && p2) return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  }
  return extractNormalizedCenter(detection.relativeBoundingBox || detection.locationData?.relativeBoundingBox, width, height);
};

const init = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(`${CDN_ROOT}/wasm`);
    
    detector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MEDIAPIPE_FACE_MODEL_PATH,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      minDetectionConfidence: 0.5,
      minSuppressionThreshold: 0.3,
    });

    self.postMessage({ type: 'INIT_DONE' });
  } catch (error) {
    try {
      // GPU fallback
      const vision = await FilesetResolver.forVisionTasks(`${CDN_ROOT}/wasm`);
      detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MEDIAPIPE_FACE_MODEL_PATH,
          delegate: 'CPU',
        },
        runningMode: 'VIDEO',
        minDetectionConfidence: 0.5,
        minSuppressionThreshold: 0.3,
      });
      self.postMessage({ type: 'INIT_DONE' });
    } catch (err) {
      console.error('[FaceWorker] Init failed:', err);
      self.postMessage({ type: 'ERROR', error: String(err) });
    }
  }
};

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    await init();
  } else if (type === 'DETECT') {
    if (!detector) return;
    const { bitmap, timestamp } = payload;
    try {
      const result = detector.detectForVideo(bitmap, timestamp);
      const center = (result?.detections?.length) 
        ? extractFaceCenter(result.detections[0], bitmap.width, bitmap.height)
        : null;
      
      bitmap.close();
      
      self.postMessage({ 
        type: 'RESULT', 
        payload: { center, timestamp } 
      });
    } catch (error) {
      self.postMessage({ type: 'ERROR', error: String(error) });
    }
  }
};
