# Tech Stack & Build

## Core Stack

- **Runtime**: React 19 with TypeScript (~5.8)
- **Build**: Vite 6 (ESM, `"type": "module"`)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (imported as `@import "tailwindcss"` in index.css)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **AI**: `@google/genai` (Gemini Live API)
- **Wake Word**: `openwakeword-js` with ONNX Runtime models in `public/models/`
- **Hosting**: Firebase Hosting (project: `curio-agent`, deploys `dist/`)

## Testing

- **Framework**: Vitest 4 with jsdom environment
- **Libraries**: `@testing-library/react`, `@testing-library/jest-dom`
- **Config**: `vitest.config.ts` — globals enabled, `restoreMocks: true`, `clearMocks: true`
- **Test locations**: Co-located `*.test.ts(x)` files in `src/services/` and `src/components/cards/`, plus `src/contexts/__tests__/` and `src/services/__tests__/`

## Common Commands

```bash
# Development server
npm run dev          # or: npm start (with --host)

# Build (production)
npm run build        # uses --max-old-space-size=8192

# Type checking
npm run typecheck    # tsc --noEmit against tsconfig.app.json

# Run tests (single run, no watch)
npm test             # vitest --run --config vitest.config.ts

# Preview production build
npm run preview
```

## Key Conventions

- Settings are persisted to `localStorage` and accessed via `useSyncExternalStore` hooks in `src/utils/settingsStorage.ts`. Each setting has a `getX()` reader, `setX()` writer, and `useX()` hook triplet.
- Custom events `curio:settings-changed` are dispatched alongside `storage` events to notify same-tab listeners.
- Fonts: Inter (body), Fredoka (headlines), Nunito, Patrick Hand, Comic Neue (personality variants).
- Design tokens defined as CSS custom properties in `src/index.css` (`--color-primary`, etc.).
