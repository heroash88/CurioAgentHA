# Curio Robot

A voice-powered AI assistant that runs as a Home Assistant add-on. Uses Google's Gemini Live API for real-time voice conversation with 35+ visual response cards.

## Installation

1. In Home Assistant, go to **Settings > Add-ons > Add-on Store**
2. Click the **three-dot menu** (top right) > **Repositories**
3. Paste `https://github.com/heroash88/CurioAgentHA` and click **Add**
4. Find **Curio Robot** in the store and click **Install**
5. After install, toggle **Show in sidebar** for quick access
6. Click **Start**, then **Open Web UI**

The add-on uses ingress -- it appears directly inside the Home Assistant UI. When running as an add-on, Curio automatically connects to your Home Assistant instance (no manual token or login needed).

## Requirements

- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) (entered in Curio's settings after first launch)

## Updating

When a new version is available, go to **Settings > Add-ons > Curio Robot** and click **Rebuild**.
