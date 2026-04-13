# 🤖 Curio Robot

Curio is a friendly, voice-powered AI assistant that lives on your screen. Whether it's on a tablet, a phone, or a DIY computer like a Raspberry Pi, Curio is designed to talk, listen, and show you helpful information using "Response Cards."

---

## ✨ What does it do?

Curio is more than just a chatbot; it's a visual companion that responds to your voice in real-time.

- **Real-Time Talk:** Have a natural, back-and-forth conversation. Curio listens and talks back instantly, powered by Google's Gemini Live.
- **Visual "Response Cards":** Instead of just speaking, Curio pops up cards on the screen. There are over **30 different card types**, including:
  - **Daily Info:** Weather, Air Quality, News, Maps, and Commute times.
  - **Tools:** Timers, Alarms, Stopwatches, Calculators, and Unit Conversions.
  - **Fun:** Jokes, Trivia, Fun Facts, and Quotes.
  - **Life:** Recipes, Reminders, Calendar events, and Translations.
  - **Media:** YouTube videos, Music, and Financial stock updates.
- **Smart Home Control:** Curio can control your lights, thermostats, and other devices via **Home Assistant**.
- **Vision:** Using your camera, Curio can "see" and understand the world around it. It can even **track your face** so its eyes follow you as you move!
- **Wake Word:** Wake it up just by saying "Hey Curio" or other preinstalled wake words.
- **Screensaver:** When idle, Curio turns into a beautiful digital frame using your **Google Photos** or artistic images from Unsplash or your own uploaded images.

---

## 🎭 Personalities & Styles

You can make Curio your own by choosing how it looks and acts:

- **7 Unique Personalities:**
  - 🧒 **Kids (Young):** Simple words and extra playful.
  - 🎒 **Kids (Older):** Curious and educational.
  - 🎉 **Fun & Playful:** High energy and lots of jokes.
  - 💼 **Professional:** Concise and factual.
  - 😏 **Sarcastic Buddy:** Witty and dry humor.
  - 🧘 **Calm & Zen:** Peaceful and mindful.
  - ✏️ **Custom:** Write your own personality prompt!
- **2 Face Styles:** Choose between the classic **Curio Robot** 🤖 or the sleek **Astro Rocket** 🚀 "inspired by Astro Bot"
- **8 Color Themes:** Ocean (Blue), Nebula (Purple), Forest (Green), Sakura (Pink), Sunset (Orange), Blaze (Red), Arctic (Cyan), and Honey (Amber).
- **Interactive Animations:** Curio has over **65+ special animations**, including winking, heart-eyes, dizzy loops, and even wearing a top hat!

---

## 🛠️ How is it built?

Curio is a high-performance web application built with:

- **React 19 & TypeScript:** For a reliable and modern user interface.
- **Vite:** For lightning-fast performance.
- **Tailwind CSS v4:** Creating a beautiful "glass-morphism" (indeed it is!)- (frosted glass) design.
- **Framer Motion:** Powering all the smooth card transitions and robot movements.
- **Firebase:** Handling hosting and secure login.
- **ONNX Runtime:** Running smart AI models (like wake word detection) directly in your browser for privacy and speed.
- **WebRTC:** For video and audio communication.
- **Web Audio API:** For audio processing and synthesis.
- **MediaPipe:** For face tracking and other vision-based features.

---

## 🔗 Key Integrations

Curio connects your favorite services into one interface:
- **Google Gemini Live:** The AI "brain."
- **Google Keep, Photos, & Tasks:** For your tasks, memories, and to-dos.
- **Home Assistant:** For smart home control. (MCP oAuth or REST API)
- **YouTube:** For music and video playback.
- **Open-Meteo:** For real-time weather and city searches.

---

## 🚀 Getting Started

1.  **Launch:** Run `npm run dev` to start the app.
2.  **Activate:** Say "Hey Curio" or click the screen to begin.
3.  **Customize:** Open the settings to pick a voice, a personality, and connect your smart home.
