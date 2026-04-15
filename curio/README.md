# Home Assistant App -- Curio

A voice-powered AI assistant that runs as a Home Assistant add-on. Curio uses Google's Gemini Live API for real-time voice conversation and displays contextual "response cards" as visual overlays during interaction. Designed for tablets, phones, Raspberry Pi, and any device with a browser.

---

## Table of Contents

- [How to Create the Add-on Repository](#how-to-create-the-add-on-repository)
- [How to Install in Home Assistant](#how-to-install-in-home-assistant)
- [How It Works](#how-it-works)
- [Features](#features)
- [Response Cards](#response-cards)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [APIs and Data Sources](#apis-and-data-sources)
- [Configuration](#configuration)
- [Development](#development)
- [Platform Support](#platform-support)

---

## How to Create the Add-on Repository

Home Assistant add-ons are distributed as GitHub repositories. Here's how to set yours up.

### Step 1: Create a new GitHub repository

Create a new repo (e.g., `curio-ha-addon`). The repo structure must look like this:

```
curio-ha-addon/              <-- the GitHub repo root
  repository.yaml            <-- repo metadata (name, maintainer)
  curio/                     <-- one folder per add-on (the slug)
    config.yaml              <-- add-on metadata
    build.yaml               <-- base images per architecture
    Dockerfile               <-- how to build the container
    run.sh                   <-- entrypoint script
    nginx.conf               <-- web server config
    CHANGELOG.md
    README.md                <-- this file (shown in the HA UI)
```

### Step 2: Copy the files

From this project, copy the `ha-addon/` contents into the repo. The key mapping is:

| Source (this project)       | Destination (GitHub repo)        |
|-----------------------------|----------------------------------|
| `ha-addon/repository.yaml` | `repository.yaml` (repo root)   |
| `ha-addon/config.yaml`     | `curio/config.yaml`             |
| `ha-addon/build.yaml`      | `curio/build.yaml`              |
| `ha-addon/Dockerfile`      | `curio/Dockerfile`              |
| `ha-addon/run.sh`          | `curio/run.sh`                  |
| `ha-addon/nginx.conf`      | `curio/nginx.conf`              |
| `ha-addon/CHANGELOG.md`    | `curio/CHANGELOG.md`            |
| `ha-addon/README.md`       | `curio/README.md`               |

### Step 3: Update the Dockerfile context

The Dockerfile uses a multi-stage build. Stage 1 builds the web app from source, stage 2 copies the output into the HA base image. Since the Dockerfile will live inside `curio/` but needs the full project source, you have two options:

**Option A: Monorepo (recommended for simplicity)**

Put the entire Curio source code in the GitHub repo alongside the add-on folder:

```
curio-ha-addon/
  repository.yaml
  package.json               <-- Curio source
  src/                       <-- Curio source
  public/                    <-- Curio source
  curio/                     <-- add-on folder
    config.yaml
    Dockerfile
    ...
```

Then update the Dockerfile's `COPY` paths. The Dockerfile already expects to be built from the repo root with the full source available.

**Option B: Separate repos with CI**

Keep Curio source in its own repo. Use GitHub Actions to:
1. Build the web app (`npm ci && npm run build`)
2. Copy the `dist/` folder into the add-on repo
3. Use a simpler Dockerfile that just copies `dist/` (no build stage)

Here's a simplified Dockerfile for Option B:

```dockerfile
ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN apk add --no-cache nginx

COPY dist/ /var/www/html/
COPY curio/nginx.conf /etc/nginx/http.d/default.conf
COPY curio/run.sh /run.sh
RUN chmod a+x /run.sh

EXPOSE 8099
CMD ["/run.sh"]
```

### Step 4: Update URLs

In `repository.yaml` and `config.yaml`, replace `YOUR_USERNAME` with your actual GitHub username:

```yaml
# repository.yaml
url: https://github.com/heroash88/CurioAgentHA

# config.yaml
url: https://github.com/heroash88/CurioAgentHA
```

### Step 5: Add an icon (optional but recommended)

Place two image files in the `curio/` folder:
- `icon.png` -- 256x256 PNG, shown in the add-on store
- `logo.png` -- 256x256 PNG, shown on the add-on detail page

You can use `public/curio_icon.png` from this project.

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Initial add-on release"
git push origin main
```

---

## How to Install in Home Assistant

Once your repo is on GitHub:

1. Open Home Assistant
2. Go to **Settings** > **Add-ons** > **Add-on Store**
3. Click the **three-dot menu** (top right) > **Repositories**
4. Paste your repo URL: `https://github.com/heroash88/CurioAgentHA`
5. Click **Add** > **Close**
6. Scroll down or search for **"Home Assistant App"**
7. Click **Install** (this builds the Docker image -- takes a few minutes the first time)
8. After install, toggle **"Show in sidebar"** if you want quick access
9. Click **Start**
10. Click **"Open Web UI"** or find **Curio** in the sidebar

The add-on uses HA ingress, so it appears directly inside the Home Assistant UI -- no extra ports or URLs needed.

### Automatic Home Assistant Connection

When running as an HA add-on, Curio automatically connects to your Home Assistant instance -- no manual token entry or OAuth login required. The add-on uses the Supervisor API token to authenticate with HA, and an nginx reverse proxy handles API routing server-side. You'll see smart home controls working immediately after the first launch.

### Updating

When you push changes to your GitHub repo:
1. Go to **Settings** > **Add-ons** > **Home Assistant App**
2. Click **Rebuild** (or bump the version in `config.yaml` and it'll show an update)

---

## How It Works

The add-on is a Docker container that:

1. **Build stage** -- Uses Node.js 20 to `npm ci` and `npm run build`, producing a static `dist/` folder
2. **Runtime stage** -- Copies `dist/` into an Alpine-based HA container running nginx
3. **Nginx** serves the static files on port 8099 with SPA fallback routing
4. **HA ingress** proxies port 8099 into the Home Assistant UI seamlessly

The entire Curio app runs client-side in the browser. The server is just a static file host -- there's no backend process, no database, no server-side logic. All AI communication happens directly from the browser to Google's Gemini API.

---

## Features

### Voice Conversation
- Real-time, bidirectional voice conversation powered by Google Gemini Live API
- WebSocket-based streaming with session resumption
- Multiple Gemini voice options (configurable in settings)
- Mute mic while AI is speaking (optional)
- Subtitle/transcript display during conversation

### Wake Word Detection
- In-browser wake word detection using ONNX Runtime models (openwakeword-js)
- Pre-installed wake words: "Hey Curio", "BIMO", and others
- Custom wake word upload support (user-trained ONNX models)
- Runs entirely client-side for privacy -- no audio leaves the device for wake word detection

### Smart Home Control
- Full Home Assistant integration via MCP protocol or REST API
- Control lights, switches, locks, thermostats, fans, vacuums, media players, covers
- Live camera feeds from HA cameras with real-time vision analysis
- Thermostat control card with HVAC mode switching
- Device state monitoring and toggle controls
- OAuth or long-lived access token authentication

### Camera and Vision
- Device camera capture for visual understanding ("What am I holding?")
- Home Assistant camera streaming with continuous frame analysis
- Face tracking via MediaPipe TFLite models -- the robot's eyes follow you
- Camera switching between multiple HA camera entities

### Screensaver
- Activates after configurable idle timeout
- Google Photos integration via Picker API (select albums to display)
- Offline image upload support (stored in IndexedDB)
- Clock and weather overlay during screensaver

### Personalities
- 7 built-in personality presets:
  - Kids (Young) -- simple words, extra playful
  - Kids (Older) -- curious and educational
  - Fun and Playful -- high energy, lots of jokes
  - Professional -- concise and factual
  - Sarcastic Buddy -- witty, dry humor
  - Calm and Zen -- peaceful and mindful
  - Custom -- write your own personality prompt
- Personality affects AI tone, vocabulary, and behavior

### Display and Appearance
- 3 face styles: Curio (robot), Astro (rocket), Bender
- 8 color themes + custom color picker
- Light/dark theme toggle
- Fullscreen mode toggle (Settings > Display) with F11 hotkey
- Custom background colors with presets
- Configurable widget positions and scales (clock, weather, face, connect button)
- 65+ special animations (wink, heart-eyes, dizzy, top hat, confetti, etc.)

### Music Playback
- In-app music player powered by YouTube
- Voice-controlled: play, pause, resume, stop, skip
- Music search with intelligent ranking (prefers official audio, penalizes covers/karaoke)
- Mini player overlay during playback

### Offline and PWA
- Progressive Web App with service worker for offline caching
- Installable on mobile devices and desktops
- Offline speech service fallback
- Offline image storage via IndexedDB

---

## Response Cards

Curio displays over 30 visual card types during conversation. Cards appear as animated overlays with swipe-to-dismiss and auto-dismiss timers.

| Card | Description |
|------|-------------|
| Weather | Current conditions, 7-day forecast, temperature, humidity, wind |
| Air Quality | AQI value, category, pollutant breakdown, health advice |
| Timer | Countdown timer with label, completion alert |
| Alarm | Alarm management -- set, list, delete, ringing state |
| Stopwatch | Start/stop/reset with lap tracking |
| Calculator | Math equations with formatted results |
| Unit Conversion | Length, weight, temperature, volume conversions |
| Map/Directions | Turn-by-turn directions with route polyline, traffic-aware duration |
| Places | Nearby business search with ratings, open status, addresses |
| Commute | Traffic-aware commute time between saved locations |
| Music | In-app YouTube music player with controls |
| YouTube | Video search and embedded playback |
| Image | Image search results display |
| News | Headlines with source and summary |
| Calendar | Upcoming events with times and locations |
| Reminder | Scheduled reminders with due dates |
| List | Ordered/unordered lists (e.g., Google Tasks integration) |
| Recipe | Ingredients list + step-by-step cooking instructions |
| Translation | Side-by-side original and translated text |
| Definition | Word definitions with pronunciation and part of speech |
| Quote | Famous quotes with author attribution |
| Fun Fact | Random interesting facts |
| Joke | Setup + hidden punchline reveal |
| Trivia | Interactive quiz with tap-to-answer |
| Sports Score | Live/final scores with team names |
| Finance | Stock/crypto prices with change percentage |
| Device | Smart home device control (toggle, lock, cover) |
| Thermostat | Temperature control with HVAC mode switching |
| Camera | Live HA camera feed with streaming |
| Astronomy | Sunrise, sunset, moon phase, golden hour |
| Media | HA media player controls (TV, speakers) |

---

## Tech Stack

### Frontend
- **React 19** with **TypeScript 5.8** -- modern UI with strict typing
- **Vite 6** -- ESM-based build tool with hot module replacement
- **Tailwind CSS v4** -- utility-first styling with glass-morphism design
- **Framer Motion** -- card animations, robot face movements, enter/exit transitions
- **Lucide React** -- icon library

### AI and ML
- **Google Gemini Live API** (`@google/genai`) -- real-time voice conversation, tool calling, vision
- **ONNX Runtime** (in-browser) -- wake word detection models
- **openwakeword-js** -- wake word detection orchestration
- **MediaPipe Tasks Vision** -- face tracking via TFLite models

### Audio and Media
- **Web Audio API** -- audio capture, processing, and playback
- **Audio Worklet** -- low-latency microphone capture
- **YouTube Data API v3** -- music/video search
- **Invidious API** -- free YouTube search fallback (no API key needed)

### Backend and Hosting
- **Firebase** -- authentication (Google sign-in), hosting
- **Firebase Hosting** -- production deployment (project: `curio-agent`)
- **Service Worker** -- offline caching, PWA support
- **nginx** -- static file server inside the HA add-on container

### Smart Home
- **Home Assistant MCP** -- Model Context Protocol for device control
- **Home Assistant REST API** -- alternative integration mode
- **Home Assistant Voice Pipelines** -- voice backend option

### Fonts
- Inter (body text)
- Fredoka (headlines)
- Nunito, Patrick Hand, Comic Neue (personality variants)

---

## Architecture

### Provider Tree
```
RootProvider -> LiveAPIProvider -> CardManagerProvider
```

### Card System
1. AI generates tool calls or text responses
2. `cardInterceptor` parses responses into `CardEvent` objects
3. `CardManagerContext` reducer manages card state (add, update, dismiss)
4. `CardStack` renders active cards via `AnimatedCard` wrappers
5. Each card type component receives `CardComponentProps` and renders in a `card-glass` container

### Settings
- All settings persisted to `localStorage`
- Reactive reads via `useSyncExternalStore` hooks
- Each setting follows `getX()` / `setX()` / `useX()` triplet pattern
- Cross-tab sync via `storage` events + same-tab sync via `curio:settings-changed` custom events
- Sensitive keys (API tokens) encrypted in storage

### Lazy Loading
- Heavy modules (`liveApiLive`, `haMcpService`) loaded via dynamic `import()`
- Card toggles section lazy-loaded in settings modal

### Add-on Container
```
Docker container (Alpine Linux)
  nginx (port 8099)
    /var/www/html/           <-- Curio dist/ (static files)
      index.html
      assets/                <-- JS, CSS bundles
      models/                <-- ONNX/TFLite models
      ha-runtime-config.json <-- injected at startup (supervisor token)
      sw.js                  <-- service worker
    /ha-proxy/*              <-- reverse proxy to HA Core API
  HA ingress proxy (8099) -> HA sidebar panel
```

---

## APIs and Data Sources

### Weather
- **Primary:** [Open-Meteo API](https://open-meteo.com/) -- free, no API key required
  - Current conditions: temperature, humidity, wind speed, feels-like, weather code
  - 7-day forecast: daily highs/lows, precipitation probability, conditions
  - WMO weather codes mapped to icons and descriptions
- **Air Quality:** [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) -- US AQI index
- **Geocoding:** [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) -- city name to coordinates
- **Reverse Geocoding:** [Nominatim (OpenStreetMap)](https://nominatim.openstreetmap.org/) -- coordinates to city name
- **Location Fallback Chain:**
  1. Browser Geolocation API (GPS/WiFi)
  2. GeoIP via [ipapi.co](https://ipapi.co/)
  3. Hardcoded fallback: San Francisco (37.7749, -122.4194)
- **Caching:** localStorage with 10-minute TTL (full power) or 30-minute TTL (low power mode)

### Directions and Maps
- **Primary:** [Google Routes API](https://developers.google.com/maps/documentation/routes) -- traffic-aware routing
  - Requires Google API key with Routes API enabled
  - Supports driving, walking, bicycling, transit modes
  - Returns encoded polyline, turn-by-turn steps, traffic condition (light/moderate/heavy)
  - Static map generation via Google Static Maps
- **Free Fallback:** [OSRM (Open Source Routing Machine)](https://router.project-osrm.org/)
  - Automatic fallback when no Google API key is configured or on 403 errors
  - Geocoding via [Photon (Komoot)](https://photon.komoot.io/)
  - Supports driving, walking, bicycling
  - Links to OpenStreetMap for map display

### Places Search
- **Primary:** [Google Places API (New)](https://developers.google.com/maps/documentation/places/web-service) -- text search
  - Ratings, open hours, price level, phone, website
  - Location-biased results
- **Free Fallback:** [Photon (Komoot)](https://photon.komoot.io/)
  - OpenStreetMap-based geocoding and place search
  - Links to OpenStreetMap for map display

### YouTube and Music
- **Primary:** [YouTube Data API v3](https://developers.google.com/youtube/v3) -- video/music search
  - Requires YouTube API key or shared Google API key
  - Intelligent result ranking: prefers official audio, VEVO, topic channels
  - Penalizes covers, karaoke, reactions, live streams
- **Free Fallback:** [Invidious API](https://docs.invidious.io/)
  - Dynamic instance discovery via [api.invidious.io](https://api.invidious.io/instances.json)
  - Hardcoded fallback instances if discovery fails
  - Instance caching with 30-minute TTL
  - Automatic retry across multiple instances
- **Key Resolution Priority:** Dedicated YouTube key -> shared Google API key -> Invidious (no key)

### Google Services
- **Google Photos Picker API** -- album selection for screensaver
- **Google Tasks API** -- task list integration (list card)
- **Firebase Authentication** -- Google sign-in for Photos/Tasks access

### Home Assistant
- **MCP Protocol** -- WebSocket-based tool calling for device control
- **REST API** -- alternative HTTP-based integration
- **Voice Pipelines** -- HA voice processing backend option
- **Camera Manager** -- MJPEG/snapshot streaming from HA cameras

---

## Configuration

### Required
- **Gemini API Key** -- get one from [Google AI Studio](https://aistudio.google.com/apikey)

### Optional
- **Google API Key** -- enables Google Routes, Places, and YouTube search (falls back to free alternatives without it)
- **YouTube API Key** -- dedicated key for YouTube search (uses Google API key as fallback)
- **Home Assistant URL** -- your HA instance URL (default: `http://homeassistant.local:8123`)
- **Home Assistant Token** -- long-lived access token for HA REST API, or use OAuth

### Settings (in-app)
All configuration is done through the in-app settings modal (gear icon):
- API Keys, Voice and AI, Display, Robot appearance, Locations, Performance, Screensaver, Integrations, Card toggles

---

## Development

```bash
# Clone the Curio source
git clone https://github.com/heroash88/curio-robot.git
cd curio-robot

# Install dependencies
npm install

# Development server (port 8080)
npm run dev

# Production build
npm run build

# Type checking
npm run typecheck

# Run tests
npm test

# Preview production build
npm run preview
```

### Testing the add-on locally

You can test the add-on Docker image locally without Home Assistant:

```bash
# From the repo root (where package.json lives)
docker build -f ha-addon/Dockerfile -t curio-addon-test .
docker run -p 8099:8099 curio-addon-test

# Open http://localhost:8099 in your browser
```

### Project Structure
```
src/
  components/     # React UI components
    cards/        # 30+ card type components
    curio/        # Main UI shell (face, clock, settings, waveform)
    common/       # Shared presentational components
  hooks/          # Custom React hooks
  services/       # API clients, audio, AI, card system
  contexts/       # React context providers
  utils/          # Settings storage, helpers
  providers/      # Root provider tree
public/
  models/         # ONNX/TFLite models for wake word + face detection
  sw.js           # Service worker
ha-addon/         # Home Assistant add-on configuration
  config.yaml     # Add-on metadata (name, version, ingress, arch)
  build.yaml      # Base images per architecture
  Dockerfile      # Multi-stage build (Node build -> nginx serve)
  run.sh          # Container entrypoint (starts nginx)
  nginx.conf      # Static file server config with SPA fallback
  repository.yaml # HA add-on repository metadata
electron/         # Electron desktop app wrapper
```

---

## Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | Supported | Chrome/Edge, or Electron desktop app |
| macOS | Supported | Chrome/Safari, or Electron desktop app |
| Linux | Supported | Chrome/Chromium, or Electron desktop app |
| Raspberry Pi | Supported | Chromium in kiosk mode, or HA add-on |
| iOS (Safari) | Supported | PWA installable, some limitations |
| Android (Chrome) | Supported | PWA installable |
| Home Assistant | Supported | Ingress add-on with sidebar integration |

### Browser Requirements
- Modern browser with WebSocket, Web Audio API, and MediaStream support
- Chrome/Chromium recommended for best wake word and audio worklet performance
- HTTPS required for microphone/camera access (localhost exempt)

---

## Troubleshooting

### Add-on won't start
- Check the add-on logs in HA: **Settings > Add-ons > Home Assistant App > Log**
- Make sure the build completed successfully (first install takes a few minutes)

### Microphone not working in HA ingress
- HA ingress runs over HTTPS, so mic permissions should work
- If using an older HA version, try accessing Curio directly at `http://YOUR_HA_IP:8099`

### Blank screen after install
- Clear browser cache and reload
- Check browser console for errors (F12 > Console)

### Wake word not detecting
- Chrome/Chromium required for best ONNX Runtime performance
- Check that the microphone is not muted at the OS level
- Try lowering the wake word sensitivity in settings
