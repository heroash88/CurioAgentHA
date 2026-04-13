import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const APP_URL = process.env.APP_URL ?? 'http://127.0.0.1:4173';
const OUTPUT_DIR = path.resolve(process.cwd(), 'output', 'playwright');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'idle-profile.json');

const scenarios = [
  {
    name: 'idle_low_power',
    durationMs: 12_000,
    storage: {
      curio_low_power_mode: 'true',
      curio_performance_mode: 'true',
      curio_enable_wake_word: 'false',
      curio_face_tracking_enabled: 'false',
      curio_screensaver_enabled: 'false',
      curio_screensaver_timeout_secs: '300',
    },
  },
  {
    name: 'wake_low_power',
    durationMs: 12_000,
    storage: {
      curio_low_power_mode: 'true',
      curio_performance_mode: 'true',
      curio_enable_wake_word: 'true',
      curio_face_tracking_enabled: 'false',
      curio_screensaver_enabled: 'false',
      curio_screensaver_timeout_secs: '300',
    },
  },
  {
    name: 'screensaver_low_power',
    durationMs: 18_000,
    storage: {
      curio_low_power_mode: 'true',
      curio_performance_mode: 'true',
      curio_enable_wake_word: 'false',
      curio_face_tracking_enabled: 'false',
      curio_screensaver_enabled: 'true',
      curio_screensaver_timeout_secs: '10',
    },
  },
  {
    name: 'face_tracking_low_power',
    durationMs: 12_000,
    storage: {
      curio_low_power_mode: 'true',
      curio_performance_mode: 'true',
      curio_enable_wake_word: 'false',
      curio_face_tracking_enabled: 'true',
      curio_screensaver_enabled: 'false',
      curio_screensaver_timeout_secs: '300',
    },
  },
];

const ensureAppReachable = async () => {
  try {
    const response = await fetch(APP_URL, { redirect: 'manual' });
    if (!response.ok && response.status !== 304) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    throw new Error(
      `Unable to reach ${APP_URL}. Start the app first, for example with "npm run build" and "npm run preview -- --host 127.0.0.1 --port 4173". (${String(error)})`,
    );
  }
};

const createInstrumentationScript = (storage) => {
  localStorage.clear();
  for (const [key, value] of Object.entries(storage)) {
    localStorage.setItem(key, value);
  }

  const metrics = {
    createdIntervals: 0,
    activeIntervals: 0,
    intervalDelays: [],
    createdTimeouts: 0,
    activeTimeouts: 0,
    timeoutDelays: [],
    rafSchedules: 0,
    rafCallbacks: 0,
    fetchCalls: 0,
    gumCalls: 0,
    activeTracks: 0,
    trackStops: 0,
    audioResumeCalls: 0,
  };

  const activeIntervals = new Set();
  const activeTimeouts = new Set();

  const originalSetInterval = window.setInterval.bind(window);
  const originalClearInterval = window.clearInterval.bind(window);
  window.setInterval = (handler, delay, ...args) => {
    const id = originalSetInterval(handler, delay, ...args);
    activeIntervals.add(id);
    metrics.createdIntervals += 1;
    metrics.activeIntervals = activeIntervals.size;
    metrics.intervalDelays.push(Number(delay) || 0);
    return id;
  };
  window.clearInterval = (id) => {
    activeIntervals.delete(id);
    metrics.activeIntervals = activeIntervals.size;
    return originalClearInterval(id);
  };

  const originalSetTimeout = window.setTimeout.bind(window);
  const originalClearTimeout = window.clearTimeout.bind(window);
  window.setTimeout = (handler, delay, ...args) => {
    const id = originalSetTimeout(handler, delay, ...args);
    activeTimeouts.add(id);
    metrics.createdTimeouts += 1;
    metrics.activeTimeouts = activeTimeouts.size;
    metrics.timeoutDelays.push(Number(delay) || 0);
    return id;
  };
  window.clearTimeout = (id) => {
    activeTimeouts.delete(id);
    metrics.activeTimeouts = activeTimeouts.size;
    return originalClearTimeout(id);
  };

  const originalRequestAnimationFrame = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (callback) => {
    metrics.rafSchedules += 1;
    return originalRequestAnimationFrame((timestamp) => {
      metrics.rafCallbacks += 1;
      callback(timestamp);
    });
  };

  const originalFetch = window.fetch.bind(window);
  window.fetch = (...args) => {
    metrics.fetchCalls += 1;
    return originalFetch(...args);
  };

  const mediaDevices = navigator.mediaDevices;
  if (mediaDevices?.getUserMedia) {
    const originalGetUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
    mediaDevices.getUserMedia = async (...args) => {
      metrics.gumCalls += 1;
      const stream = await originalGetUserMedia(...args);
      const tracks = stream.getTracks();
      metrics.activeTracks += tracks.length;
      tracks.forEach((track) => {
        const originalStop = track.stop.bind(track);
        track.stop = () => {
          metrics.trackStops += 1;
          metrics.activeTracks = Math.max(0, metrics.activeTracks - 1);
          return originalStop();
        };
      });
      return stream;
    };
  }

  const audioPrototype = window.AudioContext?.prototype ?? window.webkitAudioContext?.prototype;
  if (audioPrototype?.resume) {
    const originalResume = audioPrototype.resume;
    audioPrototype.resume = function patchedResume(...args) {
      metrics.audioResumeCalls += 1;
      return originalResume.apply(this, args);
    };
  }

  window.__curioIdleProfile = {
    snapshot: () => ({
      ...metrics,
      activeIntervals: activeIntervals.size,
      activeTimeouts: activeTimeouts.size,
      storage: Object.fromEntries(Object.keys(storage).map((key) => [key, localStorage.getItem(key)])),
    }),
  };
};

const profileScenario = async (browser, scenario) => {
  const context = await browser.newContext({
    permissions: ['geolocation', 'microphone', 'camera'],
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    viewport: { width: 1280, height: 800 },
  });
  const requestUrls = new Set();
  context.on('request', (request) => {
    const url = request.url();
    if (!url.startsWith('data:') && !url.startsWith('blob:')) {
      requestUrls.add(url);
    }
  });

  await context.addInitScript(createInstrumentationScript, scenario.storage);
  const page = await context.newPage();
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(scenario.durationMs);

  const metrics = await page.evaluate(() => {
    const profile = window.__curioIdleProfile;
    return profile?.snapshot ? profile.snapshot() : null;
  });

  await context.close();

  if (!metrics) {
    throw new Error(`Scenario "${scenario.name}" did not produce profiling metrics.`);
  }

  return {
    scenario: scenario.name,
    durationMs: scenario.durationMs,
    ...metrics,
    requestUrls: [...requestUrls].slice(0, 80),
  };
};

const main = async () => {
  await ensureAppReachable();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--allow-file-access-from-files',
    ],
  });

  try {
    const results = [];
    for (const scenario of scenarios) {
      const result = await profileScenario(browser, scenario);
      results.push(result);
      console.log(`[idle-profile] ${scenario.name}:`, JSON.stringify({
        rafCallbacks: result.rafCallbacks,
        activeIntervals: result.activeIntervals,
        fetchCalls: result.fetchCalls,
        gumCalls: result.gumCalls,
        activeTracks: result.activeTracks,
      }));
    }

    const payload = {
      appUrl: APP_URL,
      capturedAt: new Date().toISOString(),
      results,
    };

    await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    console.log(`[idle-profile] Wrote ${OUTPUT_FILE}`);
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error('[idle-profile] Failed:', error);
  process.exitCode = 1;
});
