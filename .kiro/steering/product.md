# Product Overview

Curio (codename "bimo-robot") is a voice-powered AI assistant web app designed to run on devices like Raspberry Pi, tablets, and phones. It uses Google's Gemini Live API for real-time voice conversation and displays contextual "response cards" (weather, timers, music, smart home controls, etc.) as visual overlays during interaction.

## Core Capabilities

- Real-time voice conversation via Gemini Live API with session resumption
- Wake word detection using ONNX models (openwakeword-js) running in-browser
- 30+ response card types for structured visual feedback (weather, timers, music, smart home, trivia, etc.)
- Home Assistant integration via MCP protocol for smart home device control
- Camera vision — captures frames and sends to Gemini for visual understanding
- Screensaver with Google Photos integration
- Configurable AI personality presets (kids, fun, professional, sarcastic, zen, custom)
- Light/dark theme support
- PWA with service worker for offline caching
- Firebase Hosting deployment
