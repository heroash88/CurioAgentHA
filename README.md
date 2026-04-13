# 🤖 Curio Robot

Curio is a friendly, voice-powered AI assistant that lives on your screen. Whether it's on a tablet, a phone, or a DIY computer like a Raspberry Pi, Curio is designed to talk, listen, and show you helpful information using beautiful visual "Response Cards."

This repository serves as both the **source code** for the Curio web application and a **Home Assistant Add-on Repository**.

---

## ✨ Features

Curio is more than just a chatbot; it's a visual companion that responds to your voice in real-time.

- **🎙️ Real-Time Conversation:** Natural, back-and-forth talk powered by **Google's Gemini Live**.
- **🃏 Visual Response Cards:** Over 30 different dynamic cards including:
  - **Daily Info:** Weather, Air Quality, News, Maps, and Commute times.
  - **Tools:** Timers, Alarms, Stopwatches, Calculators, and Unit Conversions.
  - **Life:** Recipes, Reminders, Calendar events, and Translations.
  - **Media:** YouTube videos, Music, and Financial stock updates.
- **🏠 Smart Home Control:** Seamlessly control lights, thermostats, and devices via **Home Assistant**.
- **👁️ Computer Vision:** Camera-based face tracking makes Curio's eyes follow you around the room.
- **👂 Offline Wake Word:** Responsive "Hey Curio" detection running locally in the browser for privacy.
- **🖼️ Screensaver Mode:** Turns into a digital frame using Google Photos or artistic Unsplash imagery when idle.

---

## 🏠 Home Assistant Installation

You can run Curio as a dedicated dashboard component inside Home Assistant:

1.  Go to **Settings** > **Add-ons** > **Add-on Store**.
2.  Click the **three dots** (top right) > **Repositories**.
3.  Add this URL: `https://github.com/heroash88/CurioAgentHA`
4.  Search for **Curio Robot** in the store and click **Install**.
5.  Enable **Show in sidebar** for easy access.

> [!IMPORTANT]
> **HTTPS Required:** Your Home Assistant must be accessed via **HTTPS** for the browser to grant Curio access to your Microphone and Camera.

---

## 🛠️ Technology Stack

Curio is a high-performance web application built with:

- **React 19 & TypeScript:** For a modern, type-safe UI.
- **Vite:** For lightning-fast builds and HMR.
- **Tailwind CSS v4:** Beautiful "glass-morphism" design.
- **Framer Motion:** Smooth animations and transitions.
- **ONNX Runtime:** Local AI inference for wake-word detection.
- **MediaPipe:** Real-time facial tracking and vision.

---

## 🚀 Local Development

If you want to contribute or run Curio standalone:

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/heroash88/CurioAgentHA.git
    cd CurioAgentHA/curio_robot
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the dev server:**
    ```bash
    npm run dev
    ```
4.  **Connect:** Open `http://localhost:8080` in your browser.

---

## 🔗 Integrations

- **Google AI:** Gemini Live API.
- **Google Services:** Keep, Photos, & Tasks.
- **Home Assistant:** REST API / MCP.
- **Weather:** Open-Meteo.
