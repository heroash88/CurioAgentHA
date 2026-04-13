# Project Structure

```
src/
├── index.tsx                  # React root mount, service worker registration
├── App.tsx                    # Root component: RootProvider → ThemeSync → AppContent
├── index.css                  # Tailwind v4 import, base styles, design tokens
├── vite-env.d.ts
│
├── providers/
│   └── RootProvider.tsx       # Wraps app in LiveAPIProvider
│
├── contexts/
│   ├── LiveAPIContext.tsx      # Gemini Live API connection, camera, mic, transcripts
│   └── CardManagerContext.tsx  # Card state reducer, registry, auto-dismiss timers
│
├── components/
│   ├── AppContent.tsx          # Main layout shell (ErrorBoundary → CurioAgentMode)
│   ├── ErrorBoundary.tsx
│   ├── LoadingScreen.tsx
│   ├── cards/                  # One file per card type + shared infrastructure
│   │   ├── CardStack.tsx       # Renders active cards, splits music to bottom-left
│   │   ├── AnimatedCard.tsx    # Swipe-to-dismiss, enter/exit animations
│   │   ├── FallbackCard.tsx    # Rendered for unknown card types
│   │   └── [Type]Card.tsx      # ~30 card components (WeatherCard, TimerCard, etc.)
│   ├── common/
│   │   └── WeatherIcon.tsx
│   └── curio/                  # Main UI: face, clock, settings, waveform, screensaver
│       ├── CurioAgentMode.tsx  # Primary agent interaction screen
│       ├── CurioFace.tsx
│       ├── CurioClock.tsx
│       ├── CurioSettingsModal.tsx
│       ├── CurioWakeWord.tsx
│       ├── VoiceWaveform.tsx
│       ├── Screensaver.tsx
│       └── curioSystemPrompt.ts
│
├── hooks/
│   ├── useAppMode.ts           # App mode state machine (idle, listening, etc.)
│   ├── useCardTheme.ts         # Theme-aware class names for cards
│   ├── useIdleTimer.ts
│   └── useTimerTick.ts
│
├── services/
│   ├── cardTypes.ts            # Card type definitions, interfaces, reducer actions
│   ├── cardInterceptor.ts      # Parses AI responses into CardEvents
│   ├── liveApiLive.ts          # Gemini Live API client (WebSocket)
│   ├── LiveAPIStateMachine.ts  # Connection state machine
│   ├── liveSessionConfig.ts    # Session configuration builder
│   ├── audioService.ts         # Audio playback
│   ├── audioContext.ts         # Web Audio API context management
│   ├── audioWorkletCapture.ts  # Audio worklet for mic capture
│   ├── wakeWordService.ts      # Wake word detection orchestration
│   ├── wakeWordCatalog.ts      # Available wake word models
│   ├── haMcpService.ts         # Home Assistant MCP integration
│   ├── haWidgetSupport.ts      # HA widget helpers
│   ├── weatherService.ts
│   ├── musicPlaybackService.ts / musicSearchService.ts
│   ├── youtubeApi.ts
│   ├── firebase.ts
│   ├── faceTracking.ts         # Face detection via TFLite
│   ├── transcriptAnalyzer.ts   # Transcript → card event mapping
│   ├── runtimePerformanceProfile.ts  # Adaptive performance settings
│   └── ai/config.ts            # API key and model config
│
├── utils/
│   ├── settingsStorage.ts      # localStorage-backed settings with useSyncExternalStore hooks
│   ├── settingsStorageSecrets.ts
│   ├── environment.ts
│   ├── appPageCatalog.ts
│   ├── haAuthUtils.ts
│   ├── haMcpRuntimeStatus.ts
│   └── imageUtils.ts
│
public/
├── models/                     # ONNX/TFLite models for wake word + face detection
├── sw.js                       # Service worker
├── manifest.json               # PWA manifest
└── version.json
```

## Architecture Patterns

- **Provider tree**: `RootProvider` → `LiveAPIProvider` → `CardManagerProvider` (nested inside LiveAPIContext)
- **Card system**: Cards are emitted as `CardEvent` objects, processed by a reducer in `CardManagerContext`, rendered by `CardStack` → `AnimatedCard` → `[Type]Card`. New card types are registered via `registerCardType()`.
- **Card component contract**: Every card receives `CardComponentProps` (`card`, `onDismiss`, `onInteractionStart`, `onInteractionEnd`) and wraps content in a `<div className="card-glass">`.
- **Settings pattern**: Each setting follows `getX()` / `setX()` / `useX()` triplet in `settingsStorage.ts`, backed by `localStorage` with `useSyncExternalStore`.
- **Lazy loading**: Heavy modules (liveApiLive, haMcpService) are loaded via dynamic `import()`.
- **Test co-location**: Tests live next to their source files as `*.test.ts(x)`, with integration/property tests in `__tests__/` subdirectories.
