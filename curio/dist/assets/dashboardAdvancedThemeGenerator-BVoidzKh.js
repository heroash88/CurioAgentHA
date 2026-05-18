import{p as A,q as M,v as D,r as F,s as y,t as W,D as k,w as u,M as v,x as z}from"./CardErrorBoundary-BqZLhDOx.js";import{g as $,h as U,c as H}from"./customLlmRuntime-Y_rIKOOP.js";const w=`
You are Curio's Advanced Theme Lab generator. Return a single valid JSON object only, with no markdown fences or prose. Escape newlines inside generatedCodeAnimation.code as "\\n"; do not include literal line breaks inside JSON string values.

Create one rich, local dashboard theme pack that changes the whole dashboard feel: page mode, accent, background, glass treatment, widget chrome, subtle HUD/grid/texture overlays, contrast, and motion style. Advanced should feel like a composed scene, not a preset: combine 12-18 lightweight visual systems such as atmospheric wash, parallax grid, scanlines, dense particle weather, prism rain, mesh/constellation links, HUD brackets, radar arcs, lens streaks, depth fog, orbital traces, wave caustics, data storms, aurora curtains, or wormhole ribbons. The applied dashboard widgets must feel skinned by the same scene, not merely floating over it.

Required JSON shape:
{
  "summary": ["2-5 short user-facing bullets"],
  "appearance": {
    "themeMode": "dark" | "light" | "auto",
    "accentPreset": "cobalt" | "champagne" | "verdant" | "graphite" | "aurora" | "neon" | "coral" | "moss" | "orchid" | "sunrise" | "arctic" | "ember",
    "accentColor": "#RRGGBB",
    "backgroundStyle": "animated",
    "backgroundColor": "#RRGGBB",
    "glassEffectEnabled": true,
    "advancedSurface": {
      "chromeStyle": "cinematic" | "holographic" | "organic" | "terminal" | "celestial" | "industrial",
      "textureStyle": "scanlines" | "grain" | "mesh" | "caustics" | "circuit" | "none",
      "tintColor": "#RRGGBB",
      "secondaryTintColor": "#RRGGBB",
      "intensity": 70-100,
      "glassOpacity": 45-92,
      "borderStrength": 50-100,
      "glowStrength": 55-100,
      "overlayOpacity": 45-100,
      "controlContrast": 45-100
    },
    "animationPreset": "generatedCode",
    "generatedCodeAnimation": {
      "label": "short name",
      "summary": "one sentence",
      "codeLines": ["JavaScript canvas render-function body line", "another body line"],
      "cssLines": ["CSS scoped to .dashboard-generated-code-effects or .dashboard-generated-code-svg"],
      "svg": "<svg viewBox='0 0 100 100' preserveAspectRatio='none'>...</svg>",
      "palette": ["#RRGGBB"],
      "maxFps": 24-30,
      "maxDevicePixelRatio": 0.75-1.25,
      "fallback": {
        "kind": "particles" | "mesh" | "waves" | "rain" | "snow" | "fire" | "embers" | "lightning" | "fog" | "bubbles" | "orbits" | "ribbons" | "grid" | "nebula" | "constellation" | "scanlines" | "radar" | "auroraCurtain" | "energyRibbons" | "dataStorm" | "wormhole",
        "colors": ["#RRGGBB"],
        "density": 15-72,
        "speed": 8-70,
        "complexity": 10-88,
        "shape": "dots" | "lines" | "glyphs" | "rings",
        "direction": "up" | "down" | "left" | "right" | "radial" | "orbit",
        "glow": true
      }
    }
  }
}

Generated code contract:
- The code is a render-function body that runs with only ctx, width, height, time, delta, palette, state, and utils in scope.
- Prefer generatedCodeAnimation.codeLines as an array of individual JavaScript lines. Curio also accepts code as a single escaped string, but codeLines is safer for strict JSON.
- Add generatedCodeAnimation.cssLines for CSS-only overlay effects such as animated masks, conic glows, CRT sweep bars, refractive haze, and panel-edge energy. CSS must target .dashboard-generated-code-effects, .dashboard-generated-code-effects::before, .dashboard-generated-code-effects::after, or .dashboard-generated-code-svg only. No body/html/:root selectors, imports, URLs, or fixed positioning.
- Add generatedCodeAnimation.svg for one inline SVG overlay when it helps: use defs, gradients, filters, feTurbulence, feDisplacementMap, paths, rects, circles, lines, and groups. Do not include script, foreignObject, image/use/href, event handlers, URLs, or external resources.
- Use CanvasRenderingContext2D calls, deterministic Math functions, bounded for loops, constants, arrays, small helper functions, and state fields only.
- Prefer a small scene graph or layer list. Use named helpers for major systems, for example drawHud, drawLensStreak, drawDepthGrid, drawParticleWeather, and drawMeshField.
- Never redeclare ctx, width, height, time, delta, palette, state, or utils. For persistent particles, use state.layers = state.layers || {...}; do not write let state = ...
- Do not browse, cite sources, include markdown links, or include URLs.
- Do not use DOM, storage, network, imports, timers, workers, eval, Function, async/await, globals, postMessage, requestAnimationFrame, performance.now, Date, Math.random, while loops, constructors, new, pixel read/write APIs, prototypes, or self/window/document/globalThis.
- Keep static numeric loop bounds under 1200 and prefer area-scaled counts capped under 220 particles, 80 mesh lines, 80 glyphs, and 5 heavy gradients per frame.
- Do not chain CanvasRenderingContext2D methods; call ctx.moveTo(...); ctx.lineTo(...); on separate statements.
- Avoid the common "clock" failure mode: do not draw one large centered rotating radar circle, clock hand, or bullseye as the dominant composition. For starship/navigation/cockpit/HUD themes, use off-axis partial arcs, corner brackets, star-chart nodes, perspective depth lanes, instrument glows, and layered panels instead.
- Make advancedSurface prompt-specific. Cyberpunk/prism/electric/lens themes should use holographic electric glass; moss/greenhouse themes should use organic chrome; terminal/matrix themes should use terminal chrome; wormhole/nebula/aurora themes should use celestial chrome. Avoid generic smoky gray glass.
- For complicated prompts, combine the requested nouns instead of picking only one: a "spaceship console with fire and nebula" should include console panels, off-axis starship HUDs, plasma/fire vents, nebula haze, star maps, glass refraction, and matching widget chrome.
- Keep JavaScript under 26000 characters and CSS/SVG overlays compact. Prefer batched drawing, deterministic particles, gradients, small loops, cached state arrays, and 24-30 FPS friendly motion.
- Include a structured fallback with 4-6 layers so it still looks advanced if code is rejected or OffscreenCanvas is unsupported.
`.trim(),q=e=>`
User request:
${String(typeof e=="string"?e:"").trim()||"Create a powerful advanced dashboard theme."}

Make the result dramatically more sophisticated than a color swap: build a multi-layer lightweight animated scene plus matching widget chrome. Use advancedSurface to make the real dashboard widgets visibly transform: tinted glass, high-energy borders, HUD/texture overlays, glowing controls, and readable contrast. Favor intricate composition over raw particle count.

When the request names several effects or objects, represent all of the important ones. Use canvas JavaScript for motion, CSS for refractive/scan/mask overlays, and inline SVG for filter/linework overlays when they add visual complexity without heavy per-frame loops.
`.trim(),N=e=>String(typeof e=="string"?e:JSON.stringify(e)).replace(/\s+/g," ").trim().slice(0,6e3),I=(e,t,r)=>`
The previous response failed generated theme validation. Fix it once and return a complete corrected JSON object only.

Validation error:
${t}

Original user request:
${String(typeof e=="string"?e:"").trim()||"Create a powerful advanced dashboard theme."}

Correction requirements:
- Keep animationPreset as "generatedCode".
- Preserve the requested visual complexity instead of simplifying to a generic preset.
- Fix only the invalid JavaScript/CSS/SVG shape. Keep code in the allowed render-function body contract.
- Include compact cssLines and svg if they help the requested scene.

Previous response:
${N(r)}
`.trim(),b=(e,t)=>({...e,warnings:[...e.warnings||[],t]}),f=e=>((e instanceof Error?e.message:String(e||"")).replace(/\bsk-[A-Za-z0-9_-]{8,}\b/g,"[redacted]").replace(/\bBearer\s+[A-Za-z0-9._~+/=-]{8,}\b/gi,"Bearer [redacted]").replace(/\b(api[-_\s]?key|token|authorization)\s*[:=]\s*[A-Za-z0-9._~+/=-]{8,}\b/gi,"$1=[redacted]").replace(/\s+/g," ").trim()||"provider request failed").slice(0,220),T=e=>String(typeof e=="string"?e:"").toLowerCase().replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim(),n=(e,t)=>t.some(r=>e.includes(r)),V=e=>n(e,["spaceship","starship","cockpit","flight deck","nav deck","helm"])||n(e,["space","nebula","stellar"])&&n(e,["console","dashboard","control"]),x=e=>V(e)?"starshipConsole":n(e,["ocean","underwater","abyss","abyssal","sonar","submarine","depth"])?"abyssalCommand":n(e,["solar forge","forge","reactor","molten","magnetic field","foundry","smelter"])?"solarForge":n(e,["rain","storm","cyberpunk","neon","prism rain"])?"cyberRain":n(e,["library","observatory","manuscript","astrolabe","candle","star chart","archive"])?"observatoryArchive":n(e,["arctic","polar","ice","snow crystal","snow crystals","winter","aurora","borealis"])?"arcticAurora":n(e,["greenhouse","botanical","moss","garden","vine","pollen","bio luminous","bio-luminescent","organic"])?"greenhouseLab":n(e,["volcanic","volcano","lava","seismic","ash fog","quake","magma"])?"volcanicOps":n(e,["quantum","collider","particle","accelerator","magnetic arcs","waveform telemetry"])?"colliderLab":n(e,["cloud city","weather station","sunrise","vapor","weather","gentle lightning"])?"cloudWeather":n(e,["wormhole","portal","vortex"])?"wormhole":n(e,["starship","navigation","cockpit","helm"])?"navigation":n(e,["data","glyph","code","matrix","terminal","command"])?"dataTerminal":"cinematic",Y={starshipConsole:"Starship Console Lab",abyssalCommand:"Abyssal Command Lab",solarForge:"Solar Forge Lab",cyberRain:"Cyber Rain Lab",observatoryArchive:"Observatory Archive",arcticAurora:"Polar Aurora Lab",greenhouseLab:"Greenhouse Biolab",volcanicOps:"Volcanic Ops Lab",colliderLab:"Collider Lab",cloudWeather:"Cloud Weather Atelier",wormhole:"Wormhole Lab",navigation:"Navigation Lab",dataTerminal:"Data Terminal Lab",cinematic:"Advanced Theme Lab"},E={starshipConsole:["#38bdf8","#a78bfa","#fb923c","#ef4444","#f0abfc","#e0f2fe"],abyssalCommand:["#67e8f9","#22d3ee","#0f766e","#a7f3d0","#dbeafe","#38bdf8"],solarForge:["#fde68a","#fb923c","#ef4444","#f97316","#fef3c7","#7c2d12"],cyberRain:["#22d3ee","#a78bfa","#f0abfc","#38bdf8","#f472b6","#818cf8"],observatoryArchive:["#fef3c7","#fbbf24","#38bdf8","#a78bfa","#92400e","#e0f2fe"],arcticAurora:["#d1fae5","#86efac","#93c5fd","#c4b5fd","#e0f2fe","#67e8f9"],greenhouseLab:["#86efac","#a7f3d0","#22d3ee","#fef08a","#4ade80","#2dd4bf"],volcanicOps:["#fde68a","#fb923c","#ef4444","#7c2d12","#f97316","#fef2f2"],colliderLab:["#22d3ee","#818cf8","#f0abfc","#f472b6","#e0f2fe","#a78bfa"],cloudWeather:["#fef3c7","#fbbf24","#93c5fd","#f0abfc","#e0f2fe","#fb7185"],wormhole:["#7dd3fc","#a78bfa","#f0abfc","#22d3ee","#c084fc","#e0f2fe"],navigation:["#38bdf8","#60a5fa","#c4b5fd","#e0f2fe","#f0abfc","#93c5fd"],dataTerminal:["#86efac","#22c55e","#67e8f9","#d9f99d","#e0f2fe","#0f172a"],cinematic:["#7dd3fc","#a78bfa","#f0abfc","#22d3ee","#e0f2fe","#fef3c7"]},X={starshipConsole:"nebula",abyssalCommand:"bubbles",solarForge:"fire",cyberRain:"rain",observatoryArchive:"constellation",arcticAurora:"auroraCurtain",greenhouseLab:"waves",volcanicOps:"embers",colliderLab:"orbits",cloudWeather:"fog",wormhole:"wormhole",navigation:"constellation",dataTerminal:"dataStorm",cinematic:"dataStorm"},c=(e,t,r={})=>({kind:e,colors:t,opacity:62,blendMode:"lighter",density:54,depth:58,scale:82,trail:36,pulse:52,turbulence:42,blur:14,direction:"down",shape:"dots",glow:!0,...r}),J=e=>E[e],_=e=>Y[e],j=e=>{const t=`${e} advanced animated background cinematic depth trails layered`,r=W(t);return r.animationPreset==="generated"&&r.generatedAnimation?r:y({prompt:t,backgroundStyle:"animated",animationPreset:"generated",generatedAnimation:{...k,kind:n(e,["wormhole","portal","vortex"])?"wormhole":"dataStorm",colors:["#22d3ee","#a78bfa","#f0abfc"],density:62,speed:42,complexity:78,shape:n(e,["code","matrix","data"])?"glyphs":"dots",direction:n(e,["wormhole","portal","vortex"])?"radial":"down",glow:!0}})},K=e=>e.animationPreset==="generated"&&e.generatedAnimation?u(e.generatedAnimation):u(k),Q=(e,t)=>{const r=x(e);return r!=="cinematic"?J(r):n(e,["spaceship","starship","navigation","cockpit","helm","space"])&&n(e,["fire","ember","plasma","nebula"])?["#38bdf8","#a78bfa","#fb923c","#ef4444","#f0abfc","#e0f2fe"]:n(e,["spaceship","starship","navigation","cockpit","helm","space"])?["#38bdf8","#60a5fa","#c4b5fd","#e0f2fe"]:n(e,["rain","storm","cyberpunk","neon"])?["#22d3ee","#a78bfa","#f0abfc","#38bdf8"]:n(e,["fire","ember","volcanic"])?["#fde68a","#fb923c","#ef4444","#7c2d12"]:n(e,["forest","moss","garden"])?["#86efac","#a7f3d0","#22d3ee","#fef08a"]:n(e,["aurora","winter","snow"])?["#d1fae5","#86efac","#93c5fd","#c4b5fd"]:t.colors.length>0?t.colors:["#7dd3fc","#a78bfa","#f0abfc"]},Z=(e,t,r)=>{const a=r[0]||"#7dd3fc",o=r[1]||"#a78bfa",i=r[2]||"#f0abfc",s=r[3]||i,l={abyssalCommand:[c("bubbles",[a,o,i],{density:62,speed:24,direction:"up",blur:10}),c("waves",[a,i,o],{opacity:58,speed:20,trail:44,turbulence:62,shape:"lines"}),c("radar",[a,o],{opacity:56,density:22,direction:"radial",shape:"rings"}),c("fog",[o,i],{opacity:48,density:18,blur:42,trail:24}),c("dataStorm",[a,i],{opacity:42,density:44,shape:"glyphs"}),c("scanlines",[a,o],{opacity:24,density:14,blur:4,shape:"lines"})],solarForge:[c("fire",[a,o,i],{opacity:72,density:70,speed:58,direction:"up",blur:20,trail:52}),c("embers",[o,i,s],{opacity:66,density:70,speed:46,direction:"up",blur:16}),c("energyRibbons",[a,o,i],{opacity:64,speed:42,direction:"right",shape:"lines",trail:58}),c("grid",[s,i],{opacity:34,density:32,blur:6,shape:"lines"}),c("radar",[a,i],{opacity:42,density:18,direction:"radial",shape:"rings"}),c("fog",[o,s],{opacity:32,density:16,blur:36})],observatoryArchive:[c("constellation",[i,a,o],{opacity:62,density:44,shape:"lines",direction:"orbit"}),c("orbits",[a,o],{opacity:58,density:48,direction:"orbit",shape:"rings"}),c("embers",[a,s],{opacity:30,density:28,speed:16,direction:"up"}),c("fog",[a,i],{opacity:34,density:18,blur:38}),c("mesh",[o,i],{opacity:42,density:38,shape:"lines"}),c("scanlines",[a,o],{opacity:18,density:12,blur:4,shape:"lines"})],arcticAurora:[c("auroraCurtain",[a,o,i],{opacity:72,density:24,speed:22,blur:50,shape:"lines"}),c("snow",[i,s,a],{opacity:54,density:70,speed:18,direction:"down",blur:10}),c("radar",[a,i],{opacity:48,density:18,direction:"radial",shape:"rings"}),c("fog",[s,i],{opacity:46,density:18,blur:44}),c("grid",[a,o],{opacity:26,density:28,shape:"lines",blur:6}),c("energyRibbons",[o,i],{opacity:38,density:34,direction:"right",shape:"lines"})],greenhouseLab:[c("waves",[a,o,i],{opacity:58,density:56,speed:20,turbulence:64,shape:"lines"}),c("mesh",[a,s],{opacity:52,density:44,shape:"lines",trail:22}),c("bubbles",[o,i],{opacity:38,density:42,speed:16,direction:"up"}),c("fog",[a,o],{opacity:40,density:18,blur:38}),c("particles",[i,s],{opacity:48,density:52,speed:24,direction:"up"}),c("scanlines",[a,o],{opacity:18,density:12,blur:4,shape:"lines"})],volcanicOps:[c("fire",[a,o,i],{opacity:72,density:70,speed:48,direction:"up",blur:22,trail:54}),c("embers",[o,i,s],{opacity:68,density:72,speed:44,direction:"up",blur:16}),c("fog",[s,i],{opacity:48,density:18,blur:46}),c("dataStorm",[a,o],{opacity:52,density:46,shape:"glyphs"}),c("radar",[a,i],{opacity:46,density:18,direction:"radial",shape:"rings"}),c("grid",[s,o],{opacity:26,density:28,blur:6,shape:"lines"})],colliderLab:[c("orbits",[a,o,i],{opacity:72,density:60,direction:"orbit",shape:"rings",trail:42}),c("energyRibbons",[o,i,s],{opacity:66,density:56,speed:48,direction:"right",shape:"lines",trail:58}),c("dataStorm",[a,i],{opacity:50,density:56,shape:"glyphs"}),c("radar",[a,o],{opacity:48,density:18,direction:"radial",shape:"rings"}),c("mesh",[a,i],{opacity:42,density:42,shape:"lines"}),c("scanlines",[o,i],{opacity:24,density:14,blur:4,shape:"lines"})],cloudWeather:[c("fog",[i,a,o],{opacity:58,density:20,speed:18,blur:48}),c("lightning",[s,i],{opacity:38,density:16,speed:38,shape:"lines",trail:22}),c("waves",[a,i],{opacity:42,density:38,speed:20,shape:"lines",turbulence:42}),c("radar",[i,o],{opacity:44,density:18,direction:"radial",shape:"rings"}),c("particles",[a,s],{opacity:42,density:46,speed:18,direction:"right"}),c("auroraCurtain",[o,s],{opacity:32,density:18,blur:40,shape:"lines"})]}[e];return l?u({...t,kind:X[e],colors:r,density:72,speed:Math.max(38,t.speed),complexity:88,shape:e==="colliderLab"?"rings":e==="dataTerminal"?"glyphs":"dots",direction:e==="colliderLab"?"orbit":e==="solarForge"||e==="volcanicOps"?"up":"down",glow:!0,layers:l}):null},ee=e=>{const t=x(e);if(t==="cinematic"||t==="navigation"||t==="dataTerminal")return null;const r=`
const dominantScene = "${t}";
const TAU = Math.PI * 2;
const t = time * 0.001;
const cx = width * 0.5;
const cy = height * 0.5;
const minSide = Math.min(width, height);
const accent = palette[0] || "#7dd3fc";
const accentB = palette[1] || "#a78bfa";
const accentC = palette[2] || "#f0abfc";
const accentD = palette[3] || accentC;
ctx.globalAlpha = 1;
ctx.globalCompositeOperation = "source-over";
const base = ctx.createLinearGradient(0, 0, width, height);
base.addColorStop(0, "rgba(2,6,23,0.98)");
base.addColorStop(0.5, "rgba(8,16,32,0.96)");
base.addColorStop(1, "rgba(3,7,18,0.98)");
ctx.fillStyle = base;
ctx.fillRect(0, 0, width, height);
const drawGlow = (x, y, r, color, alpha) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(0.42, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = alpha;
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
};
const drawBand = (y, amp, color, alpha) => {
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-40, y);
  for (let x = -40; x <= width + 80; x += 80) {
    ctx.quadraticCurveTo(x + 40, y + Math.sin(t + x * 0.01) * amp, x + 80, y);
  }
  ctx.stroke();
};
const drawLensStreak = (angle, distance, alpha) => {
  const x1 = cx + Math.cos(angle) * distance;
  const y1 = cy + Math.sin(angle) * distance * 0.62;
  const x2 = cx + Math.cos(angle) * (distance + minSide * 0.42);
  const y2 = cy + Math.sin(angle) * (distance + minSide * 0.42) * 0.62;
  const streak = ctx.createLinearGradient(x1, y1, x2, y2);
  streak.addColorStop(0, "rgba(255,255,255,0)");
  streak.addColorStop(0.48, accent);
  streak.addColorStop(0.56, "rgba(255,255,255,0.68)");
  streak.addColorStop(1, "rgba(255,255,255,0)");
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = streak;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};
const drawDriftSparks = (count, yBias, color, scale) => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < count; i += 1) {
    const n = utils.noise(i * 17.31 + state.seed);
    const n2 = utils.noise(i * 43.13 + state.seed);
    const x = (n * width + Math.sin(t * (0.32 + n) + i) * 66 + width) % width;
    const y = (n2 * height + yBias + Math.cos(t * 0.4 + i) * 52 + height) % height;
    ctx.globalAlpha = 0.1 + n * 0.28;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, scale * (0.8 + n * 2.8), 0, TAU);
    ctx.fill();
  }
};
`,o={starshipConsole:`
const drawStarshipViewport = () => {
  drawGlow(width * 0.32, height * 0.26, minSide * 0.52, "rgba(167,139,250,0.28)", 0.9);
  drawGlow(width * 0.82, height * 0.14, minSide * 0.38, "rgba(56,189,248,0.24)", 0.9);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 13; i += 1) {
    const p = i / 12;
    ctx.globalAlpha = 0.08 + p * 0.22;
    ctx.strokeStyle = i % 3 === 0 ? accentC : accent;
    ctx.lineWidth = 1 + p * 1.4;
    ctx.beginPath();
    ctx.moveTo(cx - minSide * (0.55 - p * 0.2), height);
    ctx.lineTo(cx + Math.sin(t * 0.18 + i) * 40, height * (0.46 - p * 0.18));
    ctx.lineTo(cx + minSide * (0.55 - p * 0.2), height);
    ctx.stroke();
  }
};
const drawNebulaClouds = () => {
  for (let i = 0; i < 6; i += 1) {
    const n = utils.noise(i * 31.7 + state.seed);
    drawGlow(width * (0.12 + n * 0.78), height * (0.08 + utils.noise(i * 71.2) * 0.42), minSide * (0.18 + n * 0.18), i % 2 ? "rgba(251,146,60,0.22)" : "rgba(240,171,252,0.2)", 0.8);
  }
};
const drawPlasmaFire = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 86; i += 1) {
    const n = utils.noise(i * 23.7 + state.seed);
    const lane = i % 2 ? width * 0.16 : width * 0.84;
    const x = lane + Math.sin(t * (0.8 + n) + i) * (28 + n * 54);
    const y = height - ((utils.noise(i * 73.1) * height + t * (48 + n * 108)) % (height * 0.7 + 80));
    ctx.globalAlpha = 0.18 + n * 0.32;
    ctx.fillStyle = i % 3 ? accentC : accentD;
    ctx.beginPath();
    ctx.ellipse(x, y, 2 + n * 7, 10 + n * 24, Math.sin(t + i) * 0.3, 0, TAU);
    ctx.fill();
  }
};
const drawStarshipConsole = () => {
  const deckY = height * 0.68;
  const deck = ctx.createLinearGradient(0, deckY, 0, height);
  deck.addColorStop(0, "rgba(56,189,248,0.08)");
  deck.addColorStop(0.44, "rgba(15,23,42,0.7)");
  deck.addColorStop(1, "rgba(2,6,23,0.92)");
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.96;
  ctx.fillStyle = deck;
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(width * 0.12, deckY);
  ctx.lineTo(width * 0.88, deckY);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 10; i += 1) {
    const x = width * (0.12 + i * 0.085);
    ctx.globalAlpha = 0.18 + utils.noise(i * 11.2) * 0.2;
    ctx.strokeStyle = i % 3 ? accent : accentC;
    ctx.strokeRect(x, deckY + 24 + Math.sin(t + i) * 5, width * 0.055, height * 0.09);
  }
};
const drawCockpitBrackets = () => {
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.24;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(width * 0.08, height * 0.18);
  ctx.lineTo(width * 0.18, height * 0.34);
  ctx.lineTo(width * 0.26, height * 0.63);
  ctx.moveTo(width * 0.92, height * 0.18);
  ctx.lineTo(width * 0.82, height * 0.34);
  ctx.lineTo(width * 0.74, height * 0.63);
  ctx.stroke();
  for (let i = 0; i < 7; i += 1) {
    const x = width * (0.18 + i * 0.105);
    ctx.globalAlpha = 0.16 + utils.noise(i * 29.1) * 0.14;
    ctx.strokeStyle = i % 2 ? accentB : accentC;
    ctx.strokeRect(x, height * 0.08 + Math.sin(t + i) * 4, width * 0.035, height * 0.035);
  }
};
drawStarshipViewport();
drawNebulaClouds();
drawPlasmaFire();
drawStarshipConsole();
drawCockpitBrackets();
for (let i = 0; i < 4; i += 1) drawLensStreak(t * 0.18 + i * TAU / 4, minSide * (0.08 + i * 0.08), 0.08 + i * 0.025);
`,abyssalCommand:`
const drawAbyssalDepth = () => {
  drawGlow(width * 0.28, height * 0.7, minSide * 0.52, "rgba(20,184,166,0.28)", 1);
  drawGlow(width * 0.75, height * 0.24, minSide * 0.42, "rgba(103,232,249,0.22)", 1);
  for (let i = 0; i < 12; i += 1) {
    drawBand(height * (0.12 + i * 0.07) + Math.sin(t * 0.6 + i) * 12, 18 + i * 2, i % 2 ? accentB : accent, 0.07 + i * 0.006);
  }
};
const drawCausticSonar = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let hub = 0; hub < 3; hub += 1) {
    const x = width * (0.18 + hub * 0.28);
    const y = height * (0.62 - hub * 0.14);
    for (let r = 0; r < 7; r += 1) {
      ctx.globalAlpha = 0.11 + r * 0.018;
      ctx.strokeStyle = r % 2 ? accentC : accent;
      ctx.beginPath();
      ctx.ellipse(x, y, minSide * (0.05 + r * 0.035), minSide * (0.024 + r * 0.018), -0.42, t * 0.28 + r, t * 0.28 + r + Math.PI * 1.35);
      ctx.stroke();
    }
  }
};
const drawDepthBubbles = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 92; i += 1) {
    const n = utils.noise(i * 13.1 + state.seed);
    const x = (utils.noise(i * 31.4) * width + Math.sin(t * 0.5 + i) * 42 + width) % width;
    const y = height - ((n * height + t * (18 + n * 42)) % (height + 80));
    ctx.globalAlpha = 0.09 + n * 0.22;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(x, y, 2 + n * 8, 0, TAU);
    ctx.stroke();
  }
};
const drawDepthReadoutRail = () => {
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = accentB;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width * 0.08, height * 0.18);
  ctx.lineTo(width * 0.08, height * 0.86);
  ctx.stroke();
  for (let i = 0; i < 12; i += 1) {
    const y = height * (0.2 + i * 0.052);
    ctx.globalAlpha = 0.11 + (i % 3) * 0.04;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.beginPath();
    ctx.moveTo(width * 0.07, y);
    ctx.lineTo(width * (0.1 + (i % 4) * 0.012), y + Math.sin(t + i) * 2);
    ctx.stroke();
  }
};
drawAbyssalDepth();
drawCausticSonar();
drawDepthBubbles();
drawDepthReadoutRail();
drawLensStreak(-0.72, minSide * 0.22, 0.08);
`,solarForge:`
const drawForgeChamber = () => {
  drawGlow(cx, cy, minSide * 0.54, "rgba(251,146,60,0.28)", 1);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 18; i += 1) {
    const x = width * (i / 18);
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.lineTo(cx + Math.sin(t * 0.4 + i) * 90, cy);
    ctx.stroke();
  }
};
const drawReactorCore = () => {
  for (let i = 0; i < 9; i += 1) {
    const r = minSide * (0.08 + i * 0.032);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.18 - i * 0.01;
    ctx.strokeStyle = i % 2 ? accentB : accent;
    ctx.lineWidth = 1.2 + i * 0.2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.45, r * 0.72, t * 0.08 + i * 0.4, 0, TAU);
    ctx.stroke();
  }
  drawGlow(cx, cy, minSide * 0.18, "rgba(253,230,138,0.5)", 1);
};
const drawHeatShimmer = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 90; i += 1) {
    const n = utils.noise(i * 19.8 + state.seed);
    const x = (n * width + Math.sin(t + i) * 32 + width) % width;
    const y = height - ((utils.noise(i * 47.2) * height + t * (46 + n * 95)) % (height * 0.84 + 80));
    ctx.globalAlpha = 0.08 + n * 0.22;
    ctx.fillStyle = i % 3 ? accentB : accentC;
    ctx.fillRect(x, y, 1 + n * 3, 14 + n * 42);
  }
};
const drawForgeGantry = () => {
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i += 1) {
    const x = width * (0.16 + i * 0.17);
    ctx.beginPath();
    ctx.moveTo(x, height * 0.08);
    ctx.lineTo(x + Math.sin(t * 0.5 + i) * 12, height * 0.92);
    ctx.stroke();
  }
  for (let i = 0; i < 6; i += 1) {
    const y = height * (0.18 + i * 0.11);
    ctx.globalAlpha = 0.1 + i * 0.018;
    ctx.strokeStyle = i % 2 ? accentB : accentC;
    ctx.beginPath();
    ctx.moveTo(width * 0.12, y);
    ctx.lineTo(width * 0.88, y + Math.sin(t + i) * 8);
    ctx.stroke();
  }
};
drawForgeChamber();
drawReactorCore();
drawHeatShimmer();
drawForgeGantry();
for (let i = 0; i < 3; i += 1) drawLensStreak(t * 0.15 + i * 2.1, minSide * (0.14 + i * 0.12), 0.1);
`,cyberRain:`
const drawCyberCity = () => {
  drawGlow(width * 0.18, height * 0.16, minSide * 0.42, "rgba(34,211,238,0.3)", 1);
  drawGlow(width * 0.84, height * 0.22, minSide * 0.42, "rgba(240,171,252,0.24)", 1);
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < 22; i += 1) {
    const w = width * (0.025 + utils.noise(i * 9.5) * 0.035);
    const h = height * (0.18 + utils.noise(i * 13.7) * 0.42);
    const x = width * (i / 22);
    ctx.globalAlpha = 0.48;
    ctx.fillStyle = "rgba(2,6,23,0.72)";
    ctx.fillRect(x, height - h, w, h);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = i % 2 ? accent : accentC;
    ctx.fillRect(x + 3, height - h + 12, w - 6, 2);
  }
};
const drawPrismRain = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 150; i += 1) {
    const n = utils.noise(i * 13.71 + state.seed);
    const y = (utils.noise(i * 41.19) * height + t * (150 + n * 240)) % (height + 180) - 90;
    const x = (n * width + y * 0.28 + Math.sin(t + i) * 22 + width) % width;
    ctx.globalAlpha = 0.16 + n * 0.34;
    ctx.strokeStyle = i % 3 === 0 ? accent : i % 3 === 1 ? accentB : accentC;
    ctx.lineWidth = 0.8 + n * 1.4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 18 + n * 38, y + 54 + n * 52);
    ctx.stroke();
  }
};
const drawWormholeDepth = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 12; i += 1) {
    const r = minSide * (0.12 + i * 0.035);
    ctx.globalAlpha = 0.05 + i * 0.008;
    ctx.strokeStyle = i % 2 ? accentB : accent;
    ctx.beginPath();
    ctx.ellipse(width * 0.72, height * 0.36, r, r * 0.44, -0.4, t * 0.2 + i, t * 0.2 + i + Math.PI * 0.8);
    ctx.stroke();
  }
};
const drawDataGlyphStorm = () => {
  const glyphs = "0101NEXUSLABRAINFLOWHUD";
  ctx.globalCompositeOperation = "lighter";
  ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
  for (let i = 0; i < 70; i += 1) {
    const n = utils.noise(i * 37.17 + state.seed);
    const y = (utils.noise(i * 53.31) * height + t * (38 + n * 118)) % (height + 40) - 20;
    const x = (n * width + Math.sin(t * 0.9 + i) * 28 + width) % width;
    const index = Math.floor((i + t * (4 + n * 8)) % glyphs.length);
    ctx.globalAlpha = 0.12 + n * 0.28;
    ctx.fillStyle = i % 3 ? accent : accentB;
    ctx.fillText(glyphs[index] || "0", x, y);
  }
};
const drawRainSignalStack = () => {
  ctx.globalCompositeOperation = "lighter";
  ctx.lineWidth = 1;
  for (let i = 0; i < 9; i += 1) {
    const x = width * (0.06 + i * 0.105);
    const h = height * (0.1 + utils.noise(i * 22.4) * 0.18);
    ctx.globalAlpha = 0.12 + (i % 3) * 0.05;
    ctx.strokeStyle = i % 2 ? accentB : accentC;
    ctx.beginPath();
    ctx.moveTo(x, height * 0.12);
    ctx.lineTo(x + Math.sin(t + i) * 16, height * 0.12 + h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 12, height * 0.12 + h);
    ctx.lineTo(x + 18, height * 0.12 + h + Math.sin(t * 0.7 + i) * 5);
    ctx.stroke();
  }
};
drawCyberCity();
drawPrismRain();
drawWormholeDepth();
drawDataGlyphStorm();
drawRainSignalStack();
for (let i = 0; i < 4; i += 1) drawLensStreak(-0.8 + i * 0.45, minSide * (0.08 + i * 0.1), 0.08);
`,observatoryArchive:`
const drawArchiveRotunda = () => {
  drawGlow(width * 0.5, height * 0.42, minSide * 0.48, "rgba(251,191,36,0.2)", 1);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 12; i += 1) {
    const a = t * 0.08 + i * TAU / 12;
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * minSide * 0.48, cy + Math.sin(a) * minSide * 0.3);
    ctx.stroke();
  }
  for (let r = 0; r < 7; r += 1) {
    ctx.globalAlpha = 0.08 + r * 0.018;
    ctx.strokeStyle = r % 2 ? accentB : accent;
    ctx.beginPath();
    ctx.ellipse(cx, cy, minSide * (0.12 + r * 0.055), minSide * (0.07 + r * 0.032), 0, 0, TAU);
    ctx.stroke();
  }
};
const drawManuscriptOrbit = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 32; i += 1) {
    const n = utils.noise(i * 19.7 + state.seed);
    const a = t * (0.06 + n * 0.06) + i * TAU / 32;
    const x = cx + Math.cos(a) * minSide * (0.18 + n * 0.34);
    const y = cy + Math.sin(a) * minSide * (0.1 + n * 0.2);
    ctx.globalAlpha = 0.14 + n * 0.2;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.strokeRect(x, y, 16 + n * 18, 10 + n * 8);
  }
};
const drawArchiveMarginalia = () => {
  ctx.globalCompositeOperation = "lighter";
  ctx.font = "11px ui-serif, Georgia, serif";
  const marks = "ASTROLABIUMCURIO";
  for (let i = 0; i < 22; i += 1) {
    const n = utils.noise(i * 14.9 + state.seed);
    const x = width * (0.08 + (i % 2) * 0.78) + Math.sin(t * 0.15 + i) * 12;
    const y = height * (0.12 + n * 0.7);
    ctx.globalAlpha = 0.1 + n * 0.16;
    ctx.fillStyle = i % 2 ? accent : accentB;
    ctx.fillText(marks[Math.floor((i + t) % marks.length)] || "A", x, y);
  }
};
drawArchiveRotunda();
drawManuscriptOrbit();
drawArchiveMarginalia();
drawLensStreak(0.2, minSide * 0.18, 0.08);
`,arcticAurora:`
const drawPolarHorizon = () => {
  drawGlow(width * 0.5, height * 0.2, minSide * 0.62, "rgba(134,239,172,0.22)", 1);
  for (let i = 0; i < 8; i += 1) {
    drawBand(height * (0.16 + i * 0.045), 34 + i * 7, i % 2 ? accentB : accent, 0.12);
  }
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.54;
  ctx.fillStyle = "rgba(224,242,254,0.18)";
  ctx.beginPath();
  ctx.moveTo(0, height * 0.78);
  ctx.lineTo(width * 0.18, height * 0.62);
  ctx.lineTo(width * 0.38, height * 0.76);
  ctx.lineTo(width * 0.62, height * 0.56);
  ctx.lineTo(width, height * 0.8);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
};
const drawIcePrism = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 78; i += 1) {
    const n = utils.noise(i * 23.4 + state.seed);
    const x = (n * width + Math.sin(t * 0.2 + i) * 18 + width) % width;
    const y = (utils.noise(i * 47.7) * height + t * (12 + n * 26)) % height;
    ctx.globalAlpha = 0.12 + n * 0.22;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.beginPath();
    ctx.moveTo(x, y - 6);
    ctx.lineTo(x + 5, y);
    ctx.lineTo(x, y + 6);
    ctx.lineTo(x - 5, y);
    ctx.closePath();
    ctx.stroke();
  }
};
const drawPolarSurveyLines = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 11; i += 1) {
    const x = width * (0.08 + i * 0.084);
    ctx.globalAlpha = 0.1 + (i % 4) * 0.025;
    ctx.strokeStyle = i % 2 ? accentB : accentC;
    ctx.beginPath();
    ctx.moveTo(x, height * 0.62);
    ctx.lineTo(cx + Math.sin(t * 0.25 + i) * 48, height * 0.92);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = accent;
  ctx.strokeRect(width * 0.42, height * 0.72, width * 0.16, height * 0.06);
};
drawPolarHorizon();
drawIcePrism();
drawPolarSurveyLines();
drawLensStreak(-0.18, minSide * 0.26, 0.09);
`,greenhouseLab:`
const drawGreenhouseCanopy = () => {
  drawGlow(width * 0.24, height * 0.22, minSide * 0.5, "rgba(134,239,172,0.24)", 1);
  drawGlow(width * 0.78, height * 0.78, minSide * 0.42, "rgba(45,212,191,0.2)", 1);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 18; i += 1) {
    const x = width * (0.04 + i * 0.054);
    ctx.globalAlpha = 0.1 + utils.noise(i * 7.1) * 0.1;
    ctx.strokeStyle = i % 2 ? accent : accentB;
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.quadraticCurveTo(x + Math.sin(t * 0.42 + i) * 80, height * 0.44, x + 80, 0);
    ctx.stroke();
  }
};
const drawGreenhouseVeins = () => {
  for (let i = 0; i < 10; i += 1) {
    drawBand(height * (0.22 + i * 0.065), 12 + i * 3, i % 2 ? accentC : accent, 0.08);
  }
  drawDriftSparks(70, -t * 16, accentC, 0.9);
};
const drawBioCells = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 16; i += 1) {
    const n = utils.noise(i * 18.2 + state.seed);
    const x = width * (0.12 + (i % 4) * 0.22) + Math.sin(t * 0.2 + i) * 14;
    const y = height * (0.18 + Math.floor(i / 4) * 0.18) + Math.cos(t * 0.22 + i) * 10;
    ctx.globalAlpha = 0.08 + n * 0.16;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.beginPath();
    ctx.ellipse(x, y, 14 + n * 18, 8 + n * 10, Math.sin(t + i) * 0.5, 0, TAU);
    ctx.stroke();
  }
};
drawGreenhouseCanopy();
drawGreenhouseVeins();
drawBioCells();
drawLensStreak(0.92, minSide * 0.12, 0.07);
`,volcanicOps:`
const drawSeismicFloor = () => {
  drawGlow(width * 0.5, height * 0.82, minSide * 0.58, "rgba(249,115,22,0.3)", 1);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 12; i += 1) {
    const y = height * (0.58 + i * 0.034);
    ctx.globalAlpha = 0.1 + i * 0.018;
    ctx.strokeStyle = i % 2 ? accent : accentC;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= width + 80; x += 80) {
      ctx.lineTo(x + 28, y - Math.abs(Math.sin(t * 1.1 + x * 0.03 + i)) * (22 + i * 2));
      ctx.lineTo(x + 80, y);
    }
    ctx.stroke();
  }
};
const drawLavaRivers = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 7; i += 1) {
    const y = height * (0.64 + i * 0.04);
    ctx.globalAlpha = 0.18 + i * 0.03;
    ctx.strokeStyle = i % 2 ? accentB : accent;
    ctx.lineWidth = 4 + i;
    ctx.beginPath();
    ctx.moveTo(-40, y);
    for (let x = -40; x <= width + 120; x += 100) {
      ctx.quadraticCurveTo(x + 50, y + Math.sin(t + x * 0.02 + i) * 30, x + 100, y);
    }
    ctx.stroke();
  }
  drawDriftSparks(90, -t * 36, accentC, 1.15);
};
const drawWarningBeaconStack = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 8; i += 1) {
    const y = height * (0.14 + i * 0.075);
    const pulse = 0.08 + Math.abs(Math.sin(t * 1.4 + i)) * 0.2;
    ctx.globalAlpha = pulse;
    ctx.fillStyle = i % 2 ? accent : accentB;
    ctx.fillRect(width * 0.88, y, width * 0.055, 4);
    ctx.globalAlpha = pulse * 0.7;
    ctx.strokeStyle = accentC;
    ctx.strokeRect(width * 0.08, y + 8, width * 0.09, 10);
  }
};
drawSeismicFloor();
drawLavaRivers();
drawWarningBeaconStack();
drawLensStreak(0.48, minSide * 0.18, 0.1);
`,colliderLab:`
const drawColliderTunnel = () => {
  drawGlow(cx, cy, minSide * 0.58, "rgba(129,140,248,0.24)", 1);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 18; i += 1) {
    const a = i * TAU / 18 + t * 0.08;
    ctx.globalAlpha = 0.08 + i * 0.004;
    ctx.strokeStyle = i % 2 ? accent : accentB;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * minSide * 0.08, cy + Math.sin(a) * minSide * 0.05);
    ctx.lineTo(cx + Math.cos(a) * minSide * 0.62, cy + Math.sin(a) * minSide * 0.36);
    ctx.stroke();
  }
};
const drawColliderRings = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 13; i += 1) {
    const r = minSide * (0.08 + i * 0.034);
    ctx.globalAlpha = 0.15 - i * 0.004;
    ctx.strokeStyle = i % 3 ? accent : accentC;
    ctx.lineWidth = 1 + i * 0.12;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.7, r * 0.72, t * 0.1 + i * 0.24, 0, TAU);
    ctx.stroke();
  }
};
const drawQuantumSparks = () => {
  drawDriftSparks(92, Math.sin(t * 0.5) * 24, accentC, 1);
};
const drawBeamPortReadouts = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 10; i += 1) {
    const a = i * TAU / 10 + t * 0.08;
    const x = cx + Math.cos(a) * minSide * 0.52;
    const y = cy + Math.sin(a) * minSide * 0.3;
    ctx.globalAlpha = 0.12 + (i % 3) * 0.04;
    ctx.strokeStyle = i % 2 ? accentB : accentC;
    ctx.strokeRect(x - 8, y - 5, 16, 10);
  }
};
drawColliderTunnel();
drawColliderRings();
drawQuantumSparks();
drawBeamPortReadouts();
for (let i = 0; i < 4; i += 1) drawLensStreak(t * 0.2 + i * 1.5, minSide * (0.09 + i * 0.08), 0.08);
`,cloudWeather:`
const drawCloudCity = () => {
  drawGlow(width * 0.34, height * 0.18, minSide * 0.5, "rgba(251,191,36,0.22)", 1);
  drawGlow(width * 0.78, height * 0.24, minSide * 0.44, "rgba(147,197,253,0.22)", 1);
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < 10; i += 1) {
    const x = width * (0.04 + i * 0.1);
    const y = height * (0.54 + utils.noise(i * 8.3) * 0.24);
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = "rgba(224,242,254,0.32)";
    ctx.beginPath();
    ctx.arc(x, y, 34 + utils.noise(i * 12.1) * 42, 0, TAU);
    ctx.arc(x + 44, y + 6, 28 + utils.noise(i * 15.4) * 34, 0, TAU);
    ctx.fill();
  }
};
const drawCloudInstruments = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 6; i += 1) {
    const x = width * (0.18 + i * 0.13);
    const y = height * (0.22 + utils.noise(i * 4.1) * 0.18);
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = i % 2 ? accent : accentB;
    ctx.beginPath();
    ctx.arc(x, y, minSide * (0.035 + i * 0.01), 0, TAU);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(t + i) * minSide * 0.08, y + Math.sin(t + i) * minSide * 0.05);
    ctx.stroke();
  }
  drawDriftSparks(64, Math.sin(t * 0.24) * 28, accentC, 1.25);
};
const drawWeatherVanes = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 8; i += 1) {
    const x = width * (0.12 + i * 0.11);
    const y = height * (0.72 + utils.noise(i * 5.2) * 0.12);
    const a = t * 0.2 + i * 0.7;
    ctx.globalAlpha = 0.12 + (i % 3) * 0.04;
    ctx.strokeStyle = i % 2 ? accent : accentB;
    ctx.beginPath();
    ctx.moveTo(x - Math.cos(a) * 28, y - Math.sin(a) * 14);
    ctx.lineTo(x + Math.cos(a) * 28, y + Math.sin(a) * 14);
    ctx.moveTo(x, y - 18);
    ctx.lineTo(x, y + 18);
    ctx.stroke();
  }
};
drawCloudCity();
drawCloudInstruments();
drawWeatherVanes();
drawLensStreak(-0.35, minSide * 0.18, 0.08);
`,wormhole:`
const drawVortex = () => {
  drawGlow(cx, cy, minSide * 0.54, "rgba(167,139,250,0.26)", 1);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 28; i += 1) {
    const p = i / 28;
    const r = minSide * (0.04 + Math.pow(p, 1.45) * 0.48);
    const a = t * 0.2 + p * 9;
    ctx.globalAlpha = 0.2 * (1 - p) + 0.05;
    ctx.strokeStyle = i % 2 ? accentB : accentC;
    ctx.lineWidth = 0.7 + (1 - p) * 2.2;
    ctx.beginPath();
    ctx.ellipse(cx + Math.cos(a) * r * 0.08, cy + Math.sin(a) * r * 0.05, r, r * 0.58, a * 0.2, a, a + Math.PI * (0.5 + p * 0.5));
    ctx.stroke();
  }
};
const drawVortexShearMarks = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 18; i += 1) {
    const p = i / 18;
    const x = width * (0.12 + p * 0.76);
    const y = height * (0.18 + utils.noise(i * 6.7) * 0.64);
    ctx.globalAlpha = 0.08 + p * 0.11;
    ctx.strokeStyle = i % 2 ? accent : accentB;
    ctx.beginPath();
    ctx.moveTo(x - 18, y);
    ctx.quadraticCurveTo(x, y + Math.sin(t + i) * 24, x + 28, y + 8);
    ctx.stroke();
  }
};
drawVortex();
drawDriftSparks(86, 0, accent, 1);
drawVortexShearMarks();
for (let i = 0; i < 5; i += 1) drawLensStreak(t * 0.12 + i * 1.2, minSide * (0.08 + i * 0.07), 0.07);
`}[t];return o?`${r}
${o}
ctx.globalAlpha = 1;
ctx.globalCompositeOperation = "source-over";`.trim():null},P=(e,t,r)=>{const a=x(e),o=Z(a,t,r);if(o)return o;const i=n(e,["spaceship","starship","cockpit","flight deck","nav deck","helm"])||n(e,["space","nebula","stellar"])&&n(e,["console","dashboard","control"]),s=n(e,["fire","ember","flame","plasma","volcanic"]),d=n(e,["nebula","cosmic","stellar","space"]),l=i&&(s||d)?"nebula":n(e,["wormhole","portal","vortex"])?"wormhole":n(e,["starship","navigation","cockpit","helm"])?"constellation":n(e,["rain","storm","cyberpunk"])?"rain":n(e,["aurora","borealis","winter"])?"auroraCurtain":n(e,["fire","ember","volcanic"])?"embers":"dataStorm";return u({...t,kind:l,colors:r,density:72,speed:Math.max(42,t.speed),complexity:88,shape:n(e,["code","matrix","data"])?"glyphs":t.shape||"dots",direction:l==="wormhole"?"radial":l==="embers"?"up":"down",glow:!0,layers:[{kind:"scanlines",colors:r,opacity:34,blendMode:"screen",depth:8,scale:92,trail:10,pulse:24,turbulence:18,blur:4,direction:"down",shape:"lines",glow:!1},{kind:"dataStorm",colors:r,opacity:72,blendMode:"lighter",density:72,depth:66,scale:84,trail:34,pulse:52,turbulence:58,blur:8,direction:"down",shape:"glyphs",glow:!0},{kind:i?"constellation":"mesh",colors:[r[0]||"#22d3ee",r[1]||"#a78bfa"],opacity:44,blendMode:"screen",density:46,depth:46,scale:78,trail:22,pulse:38,turbulence:36,blur:12,shape:"lines",glow:!0},...s?[{kind:"fire",colors:[r[2]||"#fb923c",r[3]||"#ef4444",r[0]||"#38bdf8"],opacity:66,blendMode:"lighter",density:62,depth:54,scale:84,trail:54,pulse:70,turbulence:72,blur:18,direction:"up",shape:"dots",glow:!0}]:[],{kind:"radar",colors:[r[0]||"#22d3ee",r[2]||"#f0abfc"],opacity:62,blendMode:"lighter",depth:58,scale:74,trail:36,pulse:72,turbulence:12,blur:10,direction:"radial",shape:"rings",glow:!0},{kind:i&&d?"nebula":l==="wormhole"?"wormhole":"energyRibbons",colors:i&&d?[r[1]||"#a78bfa",r[2]||"#fb923c",r[0]||"#38bdf8"]:r,opacity:70,blendMode:"lighter",density:54,depth:72,scale:88,trail:58,pulse:60,turbulence:54,blur:16,direction:l==="wormhole"?"radial":"right",shape:l==="wormhole"?"rings":"lines",glow:!0},{kind:"nebula",colors:[r[1]||"#a78bfa",r[2]||"#f0abfc",r[0]||"#22d3ee"],opacity:38,blendMode:"screen",depth:14,scale:100,trail:30,pulse:46,turbulence:74,blur:56,glow:!0}]})},L=e=>{const t=ee(e);if(t)return t;const r=n(e,["rain","storm","cyberpunk"]),a=n(e,["wormhole","portal","vortex"]),o=n(e,["radar","scan","hud","operations"]),i=n(e,["mesh","constellation","neural","network"]),s=n(e,["aurora","winter","snow","borealis"]),d=n(e,["fire","ember","volcanic"]),h=`
const systems = ["atmosphere", "depthGrid", "weatherField", "particleMesh", "hud", "lens", "scanlines"];
const TAU = Math.PI * 2;
const t = time * 0.001;
const cx = width * 0.5;
const cy = height * 0.5;
const area = width * height;
const minSide = Math.min(width, height);
const accent = palette[0] || "#7dd3fc";
const accentB = palette[1] || "#a78bfa";
const accentC = palette[2] || "#f0abfc";
const mode = "${a?"wormhole":r?"rain":i?"mesh":s?"aurora":d?"ember":"ambient"}";
const densityBoost = mode === "rain" || mode === "ember" ? 1.25 : 1;
const particleCount = Math.min(150, Math.max(52, Math.floor(area / 14000) * densityBoost));
const meshCount = Math.min(64, Math.max(24, Math.floor(area / 32000)));
const weatherCount = Math.min(120, Math.max(42, Math.floor(area / 17000)));
ctx.globalCompositeOperation = "source-over";
const grad = ctx.createLinearGradient(0, 0, width, height);
grad.addColorStop(0, "rgba(2, 8, 23, 0.96)");
grad.addColorStop(0.42, "rgba(8, 18, 35, 0.94)");
grad.addColorStop(1, "rgba(3, 7, 18, 0.98)");
ctx.globalAlpha = 1;
ctx.fillStyle = grad;
ctx.fillRect(0, 0, width, height);
const drawLensStreak = (angle, distance, alpha) => {
  const x1 = cx + Math.cos(angle) * distance;
  const y1 = cy + Math.sin(angle) * distance * 0.62;
  const x2 = cx + Math.cos(angle) * (distance + minSide * 0.36);
  const y2 = cy + Math.sin(angle) * (distance + minSide * 0.36) * 0.62;
  const streak = ctx.createLinearGradient(x1, y1, x2, y2);
  streak.addColorStop(0, "rgba(255,255,255,0)");
  streak.addColorStop(0.5, accent);
  streak.addColorStop(1, "rgba(255,255,255,0)");
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = streak;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};
const drawHud = () => {
  const sweep = t * 0.52;
  ctx.globalCompositeOperation = "lighter";
  ctx.lineWidth = 1;
  for (let r = 0.16; r <= 0.58; r += 0.105) {
    ctx.globalAlpha = 0.08 + r * 0.16;
    ctx.strokeStyle = r > 0.4 ? accentB : accent;
    ctx.beginPath();
    ctx.ellipse(cx, cy, minSide * r, minSide * r * 0.58, Math.sin(t * 0.12) * 0.32, 0, TAU);
    ctx.stroke();
  }
  if ("${o?"yes":"no"}" === "yes" || mode === "wormhole") {
    ctx.globalAlpha = 0.24;
    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweep) * minSide * 0.45, cy + Math.sin(sweep) * minSide * 0.28);
    ctx.stroke();
  }
  for (let i = 0; i < 18; i += 1) {
    const n = utils.noise(i * 11.7 + state.seed);
    const angle = t * (0.16 + n * 0.18) + i * TAU / 18;
    const radius = minSide * (0.24 + n * 0.26);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius * 0.58;
    ctx.globalAlpha = 0.14 + n * 0.18;
    ctx.fillStyle = palette[i % palette.length] || accent;
    ctx.beginPath();
    ctx.arc(x, y, 1.2 + n * 2.2, 0, TAU);
    ctx.fill();
  }
};
ctx.globalCompositeOperation = "source-over";
ctx.globalAlpha = 0.16;
for (let band = 0; band < 5; band += 1) {
  const y = height * (0.12 + band * 0.2) + Math.sin(t * 0.28 + band) * 28;
  const fog = ctx.createRadialGradient(cx, y, 0, cx, y, width * (0.38 + band * 0.04));
  fog.addColorStop(0, band % 2 ? "rgba(167,139,250,0.16)" : "rgba(34,211,238,0.14)");
  fog.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = fog;
  ctx.fillRect(0, 0, width, height);
}
ctx.globalAlpha = 0.12;
ctx.strokeStyle = accent;
ctx.lineWidth = 1;
const gridGap = Math.max(28, Math.floor(minSide / 14));
for (let x = -gridGap; x < width + gridGap; x += gridGap) {
  const drift = Math.sin(t * 0.34 + x * 0.02) * 8;
  ctx.beginPath();
  ctx.moveTo(x + drift, 0);
  ctx.lineTo(x - drift * 0.5, height);
  ctx.stroke();
}
for (let y = (t * 18) % gridGap; y < height; y += gridGap) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y + Math.sin(t + y * 0.01) * 5);
  ctx.stroke();
}
ctx.globalCompositeOperation = "lighter";
for (let i = 0; i < weatherCount; i += 1) {
  const n = utils.noise(i * 17.17 + state.seed);
  const n2 = utils.noise(i * 41.91 + state.seed);
  const phase = t * (0.22 + n * 0.72) + i * 0.37;
  let x = (n * width + Math.sin(phase) * 72 + width) % width;
  let y = (n2 * height + Math.cos(phase * 0.62) * 54 + height) % height;
  const size = 0.9 + utils.noise(i * 8.33) * 3.8;
  if (mode === "rain") {
    y = (n2 * height + t * (95 + n * 170)) % (height + 110) - 55;
    x = (n * width + y * 0.18 + Math.sin(t + i) * 22) % width;
    ctx.globalAlpha = 0.16 + n * 0.32;
    ctx.strokeStyle = palette[i % palette.length] || accent;
    ctx.lineWidth = 0.8 + n * 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 18 + n * 34, y + 46 + n * 46);
    ctx.stroke();
  } else if (mode === "wormhole") {
    const ring = i / weatherCount;
    const angle = phase * 1.6 + ring * 22.0;
    const radius = minSide * (0.035 + ring * 0.52 + Math.sin(t + i) * 0.012);
    x = cx + Math.cos(angle) * radius;
    y = cy + Math.sin(angle) * radius * 0.62;
    ctx.globalAlpha = 0.16 + (1 - ring) * 0.35;
    ctx.strokeStyle = palette[i % palette.length] || accentB;
    ctx.lineWidth = 0.8 + ring * 2.2;
    ctx.beginPath();
    ctx.arc(x, y, size + ring * 28, angle, angle + Math.PI * (0.48 + n * 0.44));
    ctx.stroke();
  } else if (mode === "ember") {
    y = height - ((n2 * height + t * (38 + n * 68)) % (height + 80));
    ctx.globalAlpha = 0.18 + n * 0.32;
    ctx.fillStyle = palette[i % palette.length] || accentC;
    ctx.beginPath();
    ctx.arc(x, y, size + n * 1.4, 0, TAU);
    ctx.fill();
  } else {
    ctx.globalAlpha = 0.12 + n * 0.22;
    ctx.fillStyle = palette[i % palette.length] || accent;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
for (let i = 0; i < meshCount; i += 1) {
  const a = utils.noise(i * 13.7 + state.seed);
  const b = utils.noise(i * 29.3 + state.seed);
  const wobble = Math.sin(t * (0.42 + a) + i);
  const x1 = (a * width + wobble * 46 + width) % width;
  const y1 = (b * height + Math.cos(t * 0.34 + i) * 38 + height) % height;
  const x2 = (x1 + Math.sin(t * 0.7 + i * 1.7) * (80 + a * 130) + width) % width;
  const y2 = (y1 + Math.cos(t * 0.54 + i * 1.3) * (62 + b * 120) + height) % height;
  ctx.globalAlpha = 0.07 + a * 0.11;
  ctx.strokeStyle = i % 3 ? accentB : accent;
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
if ("${i?"yes":"no"}" === "yes" || mode === "mesh") {
  for (let i = 0; i < 34; i += 1) {
    const n = utils.noise(i * 19.3 + state.seed);
    const angle = t * 0.22 + i * TAU / 34;
    const radius = minSide * (0.18 + n * 0.38);
    const x1 = cx + Math.cos(angle) * radius;
    const y1 = cy + Math.sin(angle) * radius * 0.66;
    const x2 = cx + Math.cos(angle + 0.8 + n) * radius * 1.18;
    const y2 = cy + Math.sin(angle + 0.8 + n) * radius * 0.78;
    ctx.globalAlpha = 0.1 + n * 0.16;
    ctx.strokeStyle = accentC;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}
drawHud();
for (let i = 0; i < 4; i += 1) {
  drawLensStreak(t * 0.22 + i * TAU / 4, minSide * (0.12 + i * 0.08), 0.06 + i * 0.025);
}
ctx.globalCompositeOperation = "source-over";
ctx.globalAlpha = 0.14;
ctx.fillStyle = "rgba(255,255,255,0.16)";
const scanGap = 6 + Math.floor(utils.noise(state.seed + 9) * 7);
for (let y = (t * 22) % scanGap; y < height; y += scanGap) {
  ctx.fillRect(0, y, width, 1);
}
ctx.globalAlpha = 0.28;
ctx.strokeStyle = "rgba(255,255,255,0.16)";
ctx.lineWidth = 1;
for (let i = 0; i < systems.length; i += 1) {
  const x = 16 + i * 22;
  const y = height - 18 - Math.sin(t + i) * 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 8, y);
  ctx.stroke();
}
ctx.globalAlpha = 1;
ctx.globalCompositeOperation = "source-over";
`.trim(),g=R(e),p=te(e),m=`${h}
${g}`;return m.length+p.length+1<=v?`${m}
${p}`:m},te=e=>{const t=x(e);return t==="cinematic"||t==="cyberRain"||t==="wormhole"||t==="navigation"||t==="dataTerminal"?"":`
const sigScene = "${t}";
const sigT = time * 0.001;
const sigCx = width * 0.5;
const sigCy = height * 0.5;
const sigMin = Math.min(width, height);
const sigA = palette[0] || "#7dd3fc";
const sigB = palette[1] || "#a78bfa";
const sigC = palette[2] || "#f0abfc";
const drawSceneOrb = (x, y, r, color, alpha) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, "rgba(255,255,255,0.72)");
  g.addColorStop(0.22, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = alpha;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
};
const drawSceneArcField = (x, y, rx, ry, color, count, rot) => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < count; i += 1) {
    const p = i / count;
    ctx.globalAlpha = 0.1 + p * 0.18;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8 + p * 1.2;
    ctx.beginPath();
    ctx.ellipse(x, y, rx * (0.28 + p), ry * (0.28 + p), rot + Math.sin(sigT * 0.2 + i) * 0.18, sigT * 0.18 + p, sigT * 0.18 + p + Math.PI * (0.46 + p * 0.24));
    ctx.stroke();
  }
};
const drawSceneDriftDots = (count, color, yBias, scale) => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < count; i += 1) {
    const n = utils.noise(i * 17.31 + state.seed);
    const n2 = utils.noise(i * 43.13 + state.seed);
    const x = (n * width + Math.sin(sigT * (0.3 + n) + i) * 54 + width) % width;
    const y = (n2 * height + yBias + Math.cos(sigT * 0.34 + i) * 46 + height) % height;
    ctx.globalAlpha = 0.12 + n * 0.24;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, scale * (0.8 + n * 2.6), 0, Math.PI * 2);
    ctx.fill();
  }
};
const drawCausticSonar = () => {
  if (sigScene !== "abyssalCommand") return;
  drawSceneArcField(width * 0.25, height * 0.62, sigMin * 0.34, sigMin * 0.16, sigA, 9, -0.45);
  drawSceneArcField(width * 0.76, height * 0.28, sigMin * 0.2, sigMin * 0.1, sigB, 7, 0.4);
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = sigC;
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i += 1) {
    const y = height * (0.1 + i * 0.075) + Math.sin(sigT * 0.8 + i) * 18;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= width + 80; x += 80) {
      ctx.quadraticCurveTo(x + 40, y + Math.sin(sigT + x * 0.02 + i) * 22, x + 80, y);
    }
    ctx.stroke();
  }
};
const drawDepthBubbles = () => {
  if (sigScene !== "abyssalCommand") return;
  drawSceneDriftDots(72, sigA, -sigT * 22, 1.25);
};
const drawReactorCore = () => {
  if (sigScene !== "solarForge") return;
  drawSceneOrb(sigCx, sigCy, sigMin * 0.2, sigB, 0.56);
  drawSceneArcField(sigCx, sigCy, sigMin * 0.34, sigMin * 0.2, sigA, 8, sigT * 0.12);
  drawSceneArcField(sigCx, sigCy, sigMin * 0.48, sigMin * 0.28, sigC, 6, -sigT * 0.1);
};
const drawHeatShimmer = () => {
  if (sigScene !== "solarForge") return;
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 18; i += 1) {
    const x = width * (i / 18);
    const y = height * 0.58 + Math.sin(sigT * 1.2 + i) * 46;
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = i % 2 ? sigA : sigB;
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.quadraticCurveTo(x + Math.sin(sigT + i) * 36, y, x + 22, height * 0.22);
    ctx.stroke();
  }
};
const drawManuscriptOrbit = () => {
  if (sigScene !== "observatoryArchive") return;
  drawSceneArcField(sigCx, sigCy, sigMin * 0.42, sigMin * 0.24, sigC, 10, sigT * 0.08);
  drawSceneDriftDots(36, sigA, Math.sin(sigT) * 18, 1.1);
};
const drawIcePrism = () => {
  if (sigScene !== "arcticAurora") return;
  drawSceneArcField(sigCx, height * 0.34, sigMin * 0.52, sigMin * 0.18, sigB, 8, Math.sin(sigT * 0.1) * 0.5);
  drawSceneDriftDots(80, sigC, sigT * 18, 0.85);
};
const drawGreenhouseVeins = () => {
  if (sigScene !== "greenhouseLab") return;
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 18; i += 1) {
    const x = width * (0.05 + i * 0.055);
    const y = height * (0.18 + utils.noise(i * 9.2 + state.seed) * 0.62);
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = i % 2 ? sigA : sigB;
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.quadraticCurveTo(x + Math.sin(sigT * 0.5 + i) * 60, y, x + 80, 0);
    ctx.stroke();
  }
  drawSceneDriftDots(58, sigC, -sigT * 14, 0.9);
};
const drawLavaRivers = () => {
  if (sigScene !== "volcanicOps") return;
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 6; i += 1) {
    const y = height * (0.58 + i * 0.065);
    ctx.globalAlpha = 0.18 + i * 0.025;
    ctx.strokeStyle = i % 2 ? sigA : sigB;
    ctx.lineWidth = 3 + i;
    ctx.beginPath();
    ctx.moveTo(-40, y);
    for (let x = -40; x <= width + 100; x += 100) {
      ctx.quadraticCurveTo(x + 50, y + Math.sin(sigT * 1.1 + x * 0.02 + i) * 30, x + 100, y);
    }
    ctx.stroke();
  }
};
const drawColliderRings = () => {
  if (sigScene !== "colliderLab") return;
  drawSceneArcField(sigCx, sigCy, sigMin * 0.48, sigMin * 0.26, sigA, 12, sigT * 0.18);
  drawSceneArcField(sigCx, sigCy, sigMin * 0.3, sigMin * 0.15, sigB, 9, -sigT * 0.22);
};
const drawQuantumSparks = () => {
  if (sigScene !== "colliderLab") return;
  drawSceneDriftDots(84, sigC, Math.sin(sigT * 0.6) * 24, 1.05);
};
const drawCloudInstruments = () => {
  if (sigScene !== "cloudWeather") return;
  drawSceneArcField(width * 0.68, height * 0.34, sigMin * 0.24, sigMin * 0.12, sigC, 7, sigT * 0.08);
  drawSceneDriftDots(68, sigA, Math.sin(sigT * 0.24) * 28, 1.35);
};
drawCausticSonar();
drawDepthBubbles();
drawReactorCore();
drawHeatShimmer();
drawManuscriptOrbit();
drawIcePrism();
drawGreenhouseVeins();
drawLavaRivers();
drawColliderRings();
drawQuantumSparks();
drawCloudInstruments();
ctx.globalAlpha = 1;
ctx.globalCompositeOperation = "source-over";
`.trim()},R=e=>{const t=x(e),r=n(e,["rain","storm","cyberpunk","prism"]),a=n(e,["wormhole","portal","vortex"]),o=n(e,["spaceship","starship","navigation","cockpit","flight deck","nav deck","helm"])||n(e,["space","nebula","stellar"])&&n(e,["console","dashboard","control"]),i=n(e,["radar","range","hud","operations","lab","sonar","weather","seismic","collider"])||o,s=n(e,["mesh","constellation","neural","network","vine","star chart","accelerator"]),d=n(e,["aurora","fog","winter","snow","borealis"]),l=n(e,["data","glyph","code","matrix","storm"]),h=n(e,["greenhouse","moss","pollen","vine","bio"]),g=n(e,["fire","ember","flame","plasma","reactor","forge","lava","volcanic"]),p=n(e,["nebula","cosmic","stellar","space"]);return`
const amplifierSystems = ["prismRain", "radarHud", "constellationMesh", "auroraFog", "wormholeDepth", "glyphStorm", "glassVoltage"];
const ampTAU = Math.PI * 2;
const ampT = time * 0.001;
const ampCx = width * 0.5;
const ampCy = height * 0.5;
const ampMin = Math.min(width, height);
const ampArea = width * height;
const ampAccent = palette[0] || "#22d3ee";
const ampAccentB = palette[1] || "#a78bfa";
const ampAccentC = palette[2] || "#f0abfc";
const ampScene = "${t==="greenhouseLab"||h?"organic":t==="starshipConsole"||o&&(g||p)?"starshipConsole":t==="cyberRain"||r?"cyberRain":t==="wormhole"||a?"wormhole":t==="navigation"||o?"nav":t==="arcticAurora"||d?"aurora":t==="dataTerminal"||l?"data":t}";
const showPrismRain = ${r?"true":"false"};
const showWormholeDepth = ${a?"true":"false"};
const showRadarHud = ${i?"true":"false"};
const showMeshField = ${s||["observatoryArchive","greenhouseLab","colliderLab"].includes(t)?"true":"false"};
const showAuroraFog = ${d||["arcticAurora","cloudWeather"].includes(t)?"true":"false"};
const showGlyphStorm = ${l||["abyssalCommand","volcanicOps","colliderLab"].includes(t)?"true":"false"};
const showPlasmaFire = ${g?"true":"false"};
const showNebulaClouds = ${p||["observatoryArchive","cloudWeather"].includes(t)?"true":"false"};
const drawAmplifierAtmosphere = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 4; i += 1) {
    const n = utils.noise(i * 71.3 + state.seed);
    const x = width * (0.08 + n * 0.84);
    const y = height * (0.04 + utils.noise(i * 43.9 + state.seed) * 0.92);
    const radius = ampMin * (0.28 + n * 0.34);
    const fog = ctx.createRadialGradient(x, y, 0, x, y, radius);
    fog.addColorStop(0, i % 2 ? "rgba(167,139,250,0.22)" : "rgba(34,211,238,0.20)");
    fog.addColorStop(0.44, i % 3 ? "rgba(240,171,252,0.08)" : "rgba(56,189,248,0.10)");
    fog.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = 0.34 + n * 0.2;
    ctx.fillStyle = fog;
    ctx.fillRect(0, 0, width, height);
  }
};
const drawPrismRain = () => {
  const count = Math.min(180, Math.max(80, Math.floor(ampArea / 11000)));
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  for (let i = 0; i < count; i += 1) {
    const n = utils.noise(i * 13.71 + state.seed);
    const n2 = utils.noise(i * 41.19 + state.seed);
    const speed = 120 + n * 260;
    const y = (n2 * height + ampT * speed) % (height + 180) - 90;
    const x = (n * width + y * 0.32 + Math.sin(ampT * 1.4 + i) * 42 + width) % width;
    const length = 32 + n * 92;
    const color = i % 3 === 0 ? ampAccent : i % 3 === 1 ? ampAccentB : ampAccentC;
    ctx.globalAlpha = 0.22 + n * 0.42;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8 + n * 1.9;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * 0.38, y + length);
    ctx.stroke();
    if (i % 9 === 0) {
      ctx.globalAlpha = 0.18 + n * 0.18;
      ctx.fillStyle = color;
      ctx.fillRect(x - 1, y + length * 0.4, 2 + n * 5, 1.2);
    }
  }
};
const drawAmplifierDepthGrid = () => {
  const gap = Math.max(34, ampMin / 18);
  const horizon = height * (0.42 + Math.sin(ampT * 0.18) * 0.03);
  ctx.globalCompositeOperation = "lighter";
  ctx.lineWidth = 1;
  for (let i = -18; i <= 18; i += 1) {
    const x = ampCx + i * gap + Math.sin(ampT * 0.4 + i) * 6;
    ctx.globalAlpha = 0.06 + (1 - Math.min(1, Math.abs(i) / 18)) * 0.14;
    ctx.strokeStyle = i % 2 ? ampAccentB : ampAccent;
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(ampCx + i * gap * 2.7, height + 32);
    ctx.stroke();
  }
  for (let i = 0; i < 16; i += 1) {
    const p = i / 16;
    const y = horizon + Math.pow(p, 1.8) * (height - horizon + 46);
    ctx.globalAlpha = 0.05 + p * 0.2;
    ctx.strokeStyle = i % 2 ? ampAccent : ampAccentB;
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(ampT + i) * 4);
    ctx.lineTo(width, y + Math.cos(ampT * 0.8 + i) * 4);
    ctx.stroke();
  }
};
const drawRadarHud = () => {
  ctx.globalCompositeOperation = "lighter";
  const centers = ampScene === "nav"
    ? [
      [width * 0.76, height * 0.30, ampMin * 0.24],
      [width * 0.20, height * 0.76, ampMin * 0.18]
    ]
    : [
      [width * 0.72, height * 0.34, ampMin * 0.22],
      [width * 0.18, height * 0.68, ampMin * 0.16]
    ];
  for (let h = 0; h < centers.length; h += 1) {
    const hub = centers[h];
    const sweep = ampT * (0.28 + h * 0.08);
    for (let r = 0; r < 4; r += 1) {
      const radius = hub[2] * (0.28 + r * 0.18 + Math.sin(ampT * 0.7 + r + h) * 0.01);
      ctx.globalAlpha = 0.09 + r * 0.03;
      ctx.strokeStyle = r % 2 ? ampAccentB : ampAccent;
      ctx.lineWidth = r === 0 ? 1.8 : 1;
      ctx.beginPath();
      ctx.ellipse(hub[0], hub[1], radius, radius * 0.62, Math.sin(ampT * 0.16 + h) * 0.32, sweep + r * 0.32, sweep + Math.PI * (0.82 + r * 0.08));
      ctx.stroke();
    }
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = ampAccent;
    ctx.beginPath();
    ctx.moveTo(hub[0] - hub[2] * 0.56, hub[1] - hub[2] * 0.34);
    ctx.lineTo(hub[0] - hub[2] * 0.42, hub[1] - hub[2] * 0.34);
    ctx.moveTo(hub[0] + hub[2] * 0.42, hub[1] + hub[2] * 0.34);
    ctx.lineTo(hub[0] + hub[2] * 0.56, hub[1] + hub[2] * 0.34);
    ctx.stroke();
  }
};
const drawConstellationMesh = () => {
  const count = Math.min(52, Math.max(30, Math.floor(ampArea / 26000)));
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < count; i += 1) {
    const n = utils.noise(i * 19.33 + state.seed);
    const n2 = utils.noise(i * 29.87 + state.seed);
    const x1 = (n * width + Math.sin(ampT * (0.5 + n) + i) * 70 + width) % width;
    const y1 = (n2 * height + Math.cos(ampT * 0.42 + i) * 48 + height) % height;
    const x2 = (x1 + Math.sin(ampT * 0.82 + i * 1.7) * (90 + n * 170) + width) % width;
    const y2 = (y1 + Math.cos(ampT * 0.64 + i * 1.3) * (70 + n2 * 140) + height) % height;
    ctx.globalAlpha = 0.08 + n * 0.18;
    ctx.strokeStyle = i % 3 ? ampAccentB : ampAccent;
    ctx.lineWidth = 0.75 + n * 0.65;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (i % 4 === 0) {
      ctx.globalAlpha = 0.18 + n * 0.24;
      ctx.fillStyle = i % 2 ? ampAccentC : ampAccent;
      ctx.beginPath();
      ctx.arc(x1, y1, 1.4 + n * 2.8, 0, ampTAU);
      ctx.fill();
    }
  }
};
const drawAuroraFog = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 5; i += 1) {
    const y = height * (0.14 + i * 0.1) + Math.sin(ampT * 0.38 + i) * 46;
    const wave = 42 + i * 12;
    const grad = ctx.createLinearGradient(0, y - wave, width, y + wave);
    grad.addColorStop(0, "rgba(34,211,238,0)");
    grad.addColorStop(0.28, i % 2 ? "rgba(167,139,250,0.22)" : "rgba(34,211,238,0.2)");
    grad.addColorStop(0.58, i % 3 ? "rgba(240,171,252,0.15)" : "rgba(134,239,172,0.13)");
    grad.addColorStop(1, "rgba(34,211,238,0)");
    ctx.globalAlpha = 0.24;
    ctx.strokeStyle = grad;
    ctx.lineWidth = 18 + i * 2;
    ctx.beginPath();
    ctx.moveTo(-40, y);
    for (let x = -40; x <= width + 80; x += 120) {
      ctx.quadraticCurveTo(x + 60, y + Math.sin(ampT * 0.7 + x * 0.01 + i) * wave, x + 120, y);
    }
    ctx.stroke();
  }
};
const drawWormholeDepth = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 22; i += 1) {
    const p = i / 22;
    const spin = ampT * 0.24 + p * 7.0;
    const radius = ampMin * (0.05 + Math.pow(p, 1.6) * 0.44);
    ctx.globalAlpha = 0.2 * (1 - p) + 0.06;
    ctx.strokeStyle = i % 2 ? ampAccentB : ampAccentC;
    ctx.lineWidth = 0.7 + (1 - p) * 2.2;
    ctx.beginPath();
    ctx.ellipse(ampCx + Math.cos(spin) * radius * 0.08, ampCy + Math.sin(spin) * radius * 0.05, radius, radius * 0.58, spin * 0.22, spin, spin + Math.PI * (0.52 + p * 0.48));
    ctx.stroke();
  }
  for (let i = 0; i < 8; i += 1) {
    const a = ampT * 0.08 + i * ampTAU / 8;
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = ampAccent;
    ctx.beginPath();
    ctx.moveTo(ampCx + Math.cos(a) * ampMin * 0.08, ampCy + Math.sin(a) * ampMin * 0.05);
    ctx.lineTo(ampCx + Math.cos(a) * ampMin * 0.42, ampCy + Math.sin(a) * ampMin * 0.26);
    ctx.stroke();
  }
};
const drawDataGlyphStorm = () => {
  const glyphs = "0101NEXUSLABRAINFLOWHUD";
  const count = Math.min(76, Math.max(36, Math.floor(ampArea / 20000)));
  ctx.globalCompositeOperation = "lighter";
  ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
  for (let i = 0; i < count; i += 1) {
    const n = utils.noise(i * 37.17 + state.seed);
    const n2 = utils.noise(i * 53.31 + state.seed);
    const y = (n2 * height + ampT * (38 + n * 118)) % (height + 40) - 20;
    const x = (n * width + Math.sin(ampT * 0.9 + i) * 28 + width) % width;
    const index = Math.floor((i + ampT * (4 + n * 8)) % glyphs.length);
    ctx.globalAlpha = 0.16 + n * 0.34;
    ctx.fillStyle = i % 3 ? ampAccent : ampAccentB;
    ctx.fillText(glyphs[index] || "0", x, y);
  }
};
const drawLensVoltage = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 7; i += 1) {
    const a = ampT * 0.18 + i * ampTAU / 7;
    const d = ampMin * (0.08 + i * 0.075);
    const x1 = ampCx + Math.cos(a) * d;
    const y1 = ampCy + Math.sin(a) * d * 0.56;
    const x2 = ampCx + Math.cos(a) * (d + ampMin * 0.48);
    const y2 = ampCy + Math.sin(a) * (d + ampMin * 0.48) * 0.56;
    const streak = ctx.createLinearGradient(x1, y1, x2, y2);
    streak.addColorStop(0, "rgba(255,255,255,0)");
    streak.addColorStop(0.42, i % 2 ? ampAccentB : ampAccent);
    streak.addColorStop(0.54, "rgba(255,255,255,0.72)");
    streak.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.07 + i * 0.025;
    ctx.strokeStyle = streak;
    ctx.lineWidth = 1.2 + i * 0.18;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};
const drawNebulaClouds = () => {
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 7; i += 1) {
    const n = utils.noise(i * 61.7 + state.seed);
    const n2 = utils.noise(i * 97.1 + state.seed);
    const x = width * (0.1 + n * 0.82) + Math.sin(ampT * 0.12 + i) * 28;
    const y = height * (0.08 + n2 * 0.72) + Math.cos(ampT * 0.16 + i) * 22;
    const radius = ampMin * (0.22 + n * 0.28);
    const nebula = ctx.createRadialGradient(x, y, 0, x, y, radius);
    nebula.addColorStop(0, i % 3 === 0 ? "rgba(251,146,60,0.24)" : i % 3 === 1 ? "rgba(167,139,250,0.24)" : "rgba(56,189,248,0.22)");
    nebula.addColorStop(0.42, i % 2 ? "rgba(240,171,252,0.10)" : "rgba(251,146,60,0.09)");
    nebula.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = 0.36 + n * 0.22;
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 64; i += 1) {
    const n = utils.noise(i * 13.9 + state.seed);
    const x = (n * width + Math.sin(ampT * 0.2 + i) * 26 + width) % width;
    const y = (utils.noise(i * 29.6 + state.seed) * height + Math.cos(ampT * 0.18 + i) * 18 + height) % height;
    ctx.globalAlpha = 0.12 + n * 0.34;
    ctx.fillStyle = i % 5 === 0 ? ampAccentC : i % 3 === 0 ? ampAccentB : ampAccent;
    ctx.beginPath();
    ctx.arc(x, y, 0.8 + n * 2.2, 0, ampTAU);
    ctx.fill();
  }
};
const drawPlasmaFire = () => {
  const count = Math.min(130, Math.max(62, Math.floor(ampArea / 14000)));
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < count; i += 1) {
    const n = utils.noise(i * 23.73 + state.seed);
    const n2 = utils.noise(i * 73.19 + state.seed);
    const lane = i % 2 === 0 ? width * 0.18 : width * 0.82;
    const x = lane + Math.sin(ampT * (0.6 + n) + i) * (36 + n * 58);
    const y = height - ((n2 * height + ampT * (42 + n * 118)) % (height * 0.86 + 90));
    const size = 2.2 + n * 7.6;
    const flame = ctx.createRadialGradient(x, y, 0, x, y, size * 5.4);
    flame.addColorStop(0, "rgba(255,255,255,0.72)");
    flame.addColorStop(0.18, "rgba(251,146,60,0.58)");
    flame.addColorStop(0.54, "rgba(239,68,68,0.22)");
    flame.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = 0.18 + n * 0.42;
    ctx.fillStyle = flame;
    ctx.beginPath();
    ctx.ellipse(x, y, size * (1.1 + n), size * (3.2 + n * 2.4), Math.sin(ampT + i) * 0.28, 0, ampTAU);
    ctx.fill();
  }
};
const drawStarshipConsole = () => {
  ctx.globalCompositeOperation = "lighter";
  const deckY = height * 0.72;
  const panelH = Math.max(58, height * 0.16);
  const panelGradient = ctx.createLinearGradient(0, deckY, 0, height);
  panelGradient.addColorStop(0, "rgba(56,189,248,0.02)");
  panelGradient.addColorStop(0.38, "rgba(8,18,35,0.42)");
  panelGradient.addColorStop(1, "rgba(2,6,23,0.68)");
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = panelGradient;
  ctx.fillRect(0, deckY, width, height - deckY);
  for (let i = 0; i < 9; i += 1) {
    const p = i / 8;
    const x = width * (0.08 + p * 0.84);
    const y = deckY + Math.sin(ampT * 0.8 + i) * 4;
    const w = width * (0.045 + utils.noise(i * 8.2 + state.seed) * 0.055);
    ctx.globalAlpha = 0.18 + utils.noise(i * 12.7 + state.seed) * 0.28;
    ctx.strokeStyle = i % 3 === 0 ? ampAccentC : i % 2 ? ampAccentB : ampAccent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - w, y);
    ctx.lineTo(x + w, y + panelH * 0.22);
    ctx.lineTo(x + w * 0.7, y + panelH * 0.62);
    ctx.lineTo(x - w * 0.8, y + panelH * 0.5);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = i % 2 ? ampAccent : ampAccentC;
    ctx.fill();
  }
  for (let i = 0; i < 14; i += 1) {
    const x = width * (0.08 + (i % 7) * 0.14);
    const y = deckY + 20 + Math.floor(i / 7) * 28;
    ctx.globalAlpha = 0.2 + utils.noise(i * 33.1 + state.seed) * 0.3;
    ctx.fillStyle = i % 4 === 0 ? ampAccentC : ampAccent;
    ctx.fillRect(x, y, 18 + utils.noise(i * 9.4) * 34, 2);
  }
};
drawAmplifierAtmosphere();
drawAmplifierDepthGrid();
if (showNebulaClouds || ampScene === "starshipConsole") drawNebulaClouds();
if (showPlasmaFire || ampScene === "starshipConsole") drawPlasmaFire();
if (showAuroraFog || ampScene === "aurora" || ampScene === "organic") drawAuroraFog();
if (showPrismRain || ampScene === "cyberRain") drawPrismRain();
if (showMeshField || ampScene === "organic" || ampScene === "starshipConsole") drawConstellationMesh();
if (showRadarHud || ampScene === "nav" || ampScene === "data") drawRadarHud();
if (ampScene === "starshipConsole") drawStarshipConsole();
if (showWormholeDepth || ampScene === "wormhole") drawWormholeDepth();
if (showGlyphStorm || ampScene === "cyberRain" || ampScene === "data") drawDataGlyphStorm();
drawLensVoltage();
ctx.globalCompositeOperation = "source-over";
ctx.globalAlpha = 0.2;
ctx.fillStyle = "rgba(255,255,255,0.18)";
const ampScanGap = ampScene === "cyberRain" ? 7 : 10;
for (let y = (ampT * 38) % ampScanGap; y < height; y += ampScanGap) {
  ctx.fillRect(0, y, width, 1);
}
ctx.globalAlpha = 0.32;
ctx.strokeStyle = "rgba(255,255,255,0.2)";
ctx.lineWidth = 1;
for (let i = 0; i < amplifierSystems.length; i += 1) {
  const x = width - 24 - i * 18;
  const y = 18 + Math.sin(ampT * 1.2 + i) * 4;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 8, y);
  ctx.stroke();
}
ctx.globalAlpha = 1;
ctx.globalCompositeOperation = "source-over";
`.trim()},O=e=>{const t=x(e),r=n(e,["spaceship","starship","cockpit","flight deck","nav deck","helm"])||n(e,["space","nebula","stellar"])&&n(e,["console","dashboard","control"]),a=n(e,["fire","ember","flame","plasma"]),o=n(e,["terminal","matrix","command"]),s={starshipConsole:{sweep:"rgba(251,146,60,0.36)",pulse:"rgba(167,139,250,0.3)",glowA:"rgba(251,146,60,0.34)",glowB:"rgba(56,189,248,0.3)",haze:"rgba(240,171,252,0.2)",opacity:"0.48",blur:"10px"},abyssalCommand:{sweep:"rgba(34,211,238,0.32)",pulse:"rgba(167,243,208,0.28)",glowA:"rgba(103,232,249,0.28)",glowB:"rgba(15,118,110,0.34)",haze:"rgba(219,234,254,0.22)",opacity:"0.52",blur:"12px"},solarForge:{sweep:"rgba(251,146,60,0.42)",pulse:"rgba(253,230,138,0.32)",glowA:"rgba(239,68,68,0.34)",glowB:"rgba(251,146,60,0.36)",haze:"rgba(254,243,199,0.18)",opacity:"0.54",blur:"8px"},cyberRain:{sweep:"rgba(34,211,238,0.34)",pulse:"rgba(240,171,252,0.3)",glowA:"rgba(244,114,182,0.28)",glowB:"rgba(129,140,248,0.26)",haze:"rgba(56,189,248,0.22)",opacity:"0.5",blur:"12px"},observatoryArchive:{sweep:"rgba(251,191,36,0.3)",pulse:"rgba(56,189,248,0.24)",glowA:"rgba(254,243,199,0.3)",glowB:"rgba(167,139,250,0.22)",haze:"rgba(251,191,36,0.16)",opacity:"0.4",blur:"9px"},arcticAurora:{sweep:"rgba(147,197,253,0.3)",pulse:"rgba(134,239,172,0.28)",glowA:"rgba(209,250,229,0.3)",glowB:"rgba(196,181,253,0.22)",haze:"rgba(224,242,254,0.22)",opacity:"0.44",blur:"13px"},greenhouseLab:{sweep:"rgba(134,239,172,0.28)",pulse:"rgba(45,212,191,0.24)",glowA:"rgba(74,222,128,0.28)",glowB:"rgba(254,240,138,0.2)",haze:"rgba(167,243,208,0.18)",opacity:"0.42",blur:"11px"},volcanicOps:{sweep:"rgba(249,115,22,0.44)",pulse:"rgba(239,68,68,0.28)",glowA:"rgba(251,146,60,0.38)",glowB:"rgba(124,45,18,0.32)",haze:"rgba(254,226,226,0.14)",opacity:"0.52",blur:"8px"},colliderLab:{sweep:"rgba(34,211,238,0.36)",pulse:"rgba(244,114,182,0.28)",glowA:"rgba(129,140,248,0.3)",glowB:"rgba(240,171,252,0.26)",haze:"rgba(224,242,254,0.18)",opacity:"0.5",blur:"9px"},cloudWeather:{sweep:"rgba(251,191,36,0.28)",pulse:"rgba(147,197,253,0.26)",glowA:"rgba(254,243,199,0.28)",glowB:"rgba(240,171,252,0.2)",haze:"rgba(224,242,254,0.22)",opacity:"0.42",blur:"14px"},wormhole:{sweep:"rgba(167,139,250,0.34)",pulse:"rgba(240,171,252,0.3)",glowA:"rgba(125,211,252,0.24)",glowB:"rgba(192,132,252,0.3)",haze:"rgba(224,242,254,0.16)",opacity:"0.46",blur:"12px"},navigation:{sweep:"rgba(56,189,248,0.32)",pulse:"rgba(196,181,253,0.26)",glowA:"rgba(147,197,253,0.24)",glowB:"rgba(240,171,252,0.2)",haze:"rgba(224,242,254,0.18)",opacity:"0.42",blur:"10px"},dataTerminal:{sweep:"rgba(134,239,172,0.34)",pulse:"rgba(103,232,249,0.22)",glowA:"rgba(34,197,94,0.28)",glowB:"rgba(217,249,157,0.16)",haze:"rgba(224,242,254,0.12)",opacity:"0.58",blur:"6px"},cinematic:{sweep:"rgba(56,189,248,0.34)",pulse:"rgba(34,211,238,0.24)",glowA:"rgba(251,146,60,0.32)",glowB:"rgba(167,139,250,0.28)",haze:"rgba(255,255,255,0.18)",opacity:"0.36",blur:"14px"}}[t],l={starshipConsole:{sweepAt:"48% 70%",glowAAt:"24% 18%",glowBAt:"82% 82%",hazeAngle:108},abyssalCommand:{sweepAt:"18% 74%",glowAAt:"22% 88%",glowBAt:"66% 34%",hazeAngle:178},solarForge:{sweepAt:"50% 50%",glowAAt:"50% 84%",glowBAt:"50% 38%",hazeAngle:92},cyberRain:{sweepAt:"70% 34%",glowAAt:"16% 18%",glowBAt:"88% 72%",hazeAngle:128},observatoryArchive:{sweepAt:"50% 46%",glowAAt:"50% 46%",glowBAt:"18% 84%",hazeAngle:28},arcticAurora:{sweepAt:"50% 16%",glowAAt:"50% 8%",glowBAt:"72% 74%",hazeAngle:164},greenhouseLab:{sweepAt:"30% 78%",glowAAt:"18% 26%",glowBAt:"74% 86%",hazeAngle:72},volcanicOps:{sweepAt:"50% 92%",glowAAt:"50% 94%",glowBAt:"18% 34%",hazeAngle:104},colliderLab:{sweepAt:"50% 50%",glowAAt:"50% 50%",glowBAt:"76% 76%",hazeAngle:0},cloudWeather:{sweepAt:"44% 28%",glowAAt:"32% 16%",glowBAt:"70% 68%",hazeAngle:142},wormhole:{sweepAt:"50% 50%",glowAAt:"50% 50%",glowBAt:"24% 72%",hazeAngle:118},navigation:{sweepAt:"62% 40%",glowAAt:"18% 18%",glowBAt:"78% 76%",hazeAngle:130},dataTerminal:{sweepAt:"50% 0%",glowAAt:"14% 50%",glowBAt:"86% 50%",hazeAngle:90},cinematic:{sweepAt:"42% 62%",glowAAt:"22% 80%",glowBAt:"76% 18%",hazeAngle:100}}[t],h=a?"rgba(251,146,60,0.36)":s.sweep,g=r?"rgba(167,139,250,0.28)":s.pulse,p=o?"0.58":r?"0.46":s.opacity;return`
.dashboard-generated-code-effects {
  position: absolute;
  inset: 0;
  overflow: hidden;
  mix-blend-mode: screen;
  opacity: 0.92;
}
.dashboard-generated-code-effects::before,
.dashboard-generated-code-effects::after {
  content: "";
  position: absolute;
  inset: -14%;
  pointer-events: none;
}
.dashboard-generated-code-effects::before {
  background:
    conic-gradient(from 120deg at ${l.sweepAt}, transparent 0deg, ${h} 42deg, transparent 78deg, ${g} 172deg, transparent 230deg),
    repeating-linear-gradient(180deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 8px);
  filter: blur(${r?"10px":s.blur}) saturate(1.35);
  opacity: ${p};
  animation: dashboard-generated-console-sweep 16s linear infinite;
}
.dashboard-generated-code-effects::after {
  background:
    radial-gradient(54% 38% at ${l.glowAAt}, ${s.glowA}, transparent 62%),
    radial-gradient(48% 42% at ${l.glowBAt}, ${s.glowB}, transparent 64%),
    linear-gradient(${l.hazeAngle}deg, transparent 0%, ${s.haze} 48%, transparent 62%);
  filter: blur(6px);
  opacity: 0.74;
  animation: dashboard-generated-nebula-drift 21s ease-in-out infinite alternate;
}
.dashboard-generated-code-effects .dashboard-generated-code-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${r?"0.68":"0.5"};
  mix-blend-mode: screen;
  filter: saturate(1.25) contrast(1.08);
}
@keyframes dashboard-generated-console-sweep {
  from { transform: rotate(0deg) translate3d(-3%, -2%, 0); }
  to { transform: rotate(360deg) translate3d(3%, 2%, 0); }
}
@keyframes dashboard-generated-nebula-drift {
  from { transform: translate3d(-3%, 2%, 0) scale(1.02); }
  to { transform: translate3d(4%, -3%, 0) scale(1.08); }
}
`.trim()},B=e=>{const t=x(e),a={starshipConsole:{filter:"starship-nebula-warp",stroke:"#38bdf8",accent:"#fb923c",core:"#a78bfa",line:"M2 78 C 18 48, 36 64, 54 34 S 82 28, 98 10",detail:"M4 88 L20 64 L80 64 L96 88 M20 64 L8 28 M80 64 L92 28 M18 22 L30 18 M70 18 L84 24",coreX:"32%",coreY:"72%",coreR:"58%",seed:17,freq:"0.014 0.028",scale:7},abyssalCommand:{filter:"abyssal-caustic-warp",stroke:"#67e8f9",accent:"#a7f3d0",core:"#0f766e",line:"M0 58 C 14 42, 28 68, 42 48 S 72 34, 100 52",detail:"M4 82 C 16 74, 32 74, 44 82 M8 72 C 20 64, 38 64, 52 72 M64 30 C 78 24, 90 30, 98 42",coreX:"22%",coreY:"88%",coreR:"62%",seed:29,freq:"0.02 0.06",scale:9},solarForge:{filter:"solar-forge-warp",stroke:"#fde68a",accent:"#fb923c",core:"#ef4444",line:"M0 72 C 16 62, 32 86, 50 50 S 78 18, 100 28",detail:"M50 10 L50 90 M18 78 L82 22 M24 22 L76 78 M36 38 L64 38 L64 62 L36 62 Z",coreX:"50%",coreY:"54%",coreR:"50%",seed:41,freq:"0.024 0.04",scale:8},cyberRain:{filter:"cyber-rain-warp",stroke:"#22d3ee",accent:"#f0abfc",core:"#818cf8",line:"M6 0 L 22 100 M44 0 L 60 100 M76 0 L 92 100",detail:"M6 78 H28 M38 62 H72 M70 36 H94 M10 14 H30 M48 26 H66",coreX:"84%",coreY:"78%",coreR:"48%",seed:53,freq:"0.018 0.052",scale:6},observatoryArchive:{filter:"observatory-archive-warp",stroke:"#fbbf24",accent:"#38bdf8",core:"#a78bfa",line:"M8 18 C 22 8, 38 18, 50 32 S 78 58, 94 42",detail:"M50 16 C 70 18, 82 34, 82 50 C 82 66, 70 82, 50 84 C 30 82, 18 66, 18 50 C 18 34, 30 18, 50 16 M18 50 H82 M50 16 V84",coreX:"50%",coreY:"48%",coreR:"46%",seed:67,freq:"0.012 0.026",scale:5},arcticAurora:{filter:"arctic-aurora-warp",stroke:"#93c5fd",accent:"#86efac",core:"#c4b5fd",line:"M0 28 C 16 12, 32 44, 50 22 S 80 8, 100 32",detail:"M0 82 L18 62 L34 78 L54 54 L76 80 L100 62 M12 36 L22 44 L32 36 M68 34 L78 44 L88 34",coreX:"50%",coreY:"12%",coreR:"64%",seed:79,freq:"0.015 0.04",scale:7},greenhouseLab:{filter:"greenhouse-vein-warp",stroke:"#86efac",accent:"#fef08a",core:"#2dd4bf",line:"M12 100 C 18 68, 34 52, 42 20 M42 100 C 54 68, 66 48, 72 0",detail:"M20 72 C 30 58, 48 58, 58 72 C 46 82, 32 82, 20 72 M62 34 C 72 24, 86 26, 94 38 C 82 48, 70 46, 62 34",coreX:"18%",coreY:"26%",coreR:"52%",seed:83,freq:"0.018 0.034",scale:6},volcanicOps:{filter:"volcanic-seismic-warp",stroke:"#fde68a",accent:"#fb923c",core:"#7c2d12",line:"M0 70 L12 58 L22 76 L34 42 L46 80 L58 50 L70 72 L84 36 L100 62",detail:"M10 92 L22 58 L34 92 M44 92 L58 46 L72 92 M78 30 H94 M78 40 H90 M78 50 H96",coreX:"50%",coreY:"94%",coreR:"54%",seed:97,freq:"0.026 0.045",scale:8},colliderLab:{filter:"collider-lens-warp",stroke:"#22d3ee",accent:"#f0abfc",core:"#818cf8",line:"M4 50 C 18 18, 82 18, 96 50 C 82 82, 18 82, 4 50",detail:"M50 24 C 66 26, 76 36, 76 50 C 76 64, 66 74, 50 76 C 34 74, 24 64, 24 50 C 24 36, 34 26, 50 24 M50 6 V94 M6 50 H94",coreX:"50%",coreY:"50%",coreR:"48%",seed:107,freq:"0.014 0.032",scale:6},cloudWeather:{filter:"cloud-weather-warp",stroke:"#93c5fd",accent:"#fbbf24",core:"#f0abfc",line:"M0 44 C 16 30, 30 54, 46 38 S 76 20, 100 40",detail:"M8 70 C 18 58, 30 68, 40 58 C 52 44, 70 50, 74 66 C 86 62, 96 68, 100 78 M18 24 V52 M12 32 H24 M72 22 V54 M64 32 H80",coreX:"32%",coreY:"16%",coreR:"54%",seed:109,freq:"0.012 0.05",scale:7},wormhole:{filter:"wormhole-vortex-warp",stroke:"#7dd3fc",accent:"#f0abfc",core:"#a78bfa",line:"M50 50 C 58 36, 78 36, 82 50 C 74 70, 42 74, 30 54 C 20 32, 54 18, 74 28",detail:"M50 18 C 76 28, 84 52, 66 70 C 42 94, 6 66, 24 36 C 36 16, 62 8, 82 20 M16 82 C 28 62, 50 60, 72 80",coreX:"50%",coreY:"50%",coreR:"56%",seed:113,freq:"0.018 0.03",scale:9},navigation:{filter:"navigation-mesh-warp",stroke:"#38bdf8",accent:"#c4b5fd",core:"#60a5fa",line:"M8 18 L26 12 L42 20 M58 82 L74 68 L96 72",detail:"M12 74 L34 46 L58 62 L86 22 M34 46 L42 18 M58 62 L68 90",coreX:"72%",coreY:"62%",coreR:"48%",seed:127,freq:"0.014 0.028",scale:6},dataTerminal:{filter:"data-terminal-warp",stroke:"#86efac",accent:"#67e8f9",core:"#22c55e",line:"M12 0 L12 100 M34 0 L34 100 M58 0 L58 100 M82 0 L82 100",detail:"M8 18 H92 M8 36 H62 M8 54 H86 M8 72 H48 M72 24 V86",coreX:"50%",coreY:"50%",coreR:"46%",seed:131,freq:"0.02 0.02",scale:4},cinematic:{filter:"advanced-theme-warp",stroke:"#a78bfa",accent:"#f0abfc",core:"#22d3ee",line:"M2 78 C 18 48, 36 64, 54 34 S 82 28, 98 10",detail:"M8 88 C 24 70, 42 82, 58 56 S 82 28, 96 18 M10 18 H30 M70 82 H92",coreX:"32%",coreY:"72%",coreR:"58%",seed:17,freq:"0.014 0.028",scale:7}}[t];return`<svg class="dashboard-generated-code-svg" data-scene="${t}" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><filter id="${a.filter}"><feTurbulence baseFrequency="${a.freq}" numOctaves="2" seed="${a.seed}"/><feDisplacementMap scale="${a.scale}"/></filter><radialGradient id="dashboard-generated-scene-core" cx="${a.coreX}" cy="${a.coreY}" r="${a.coreR}"><stop offset="0%" stop-color="${a.accent}" stop-opacity="0.55"/><stop offset="52%" stop-color="${a.core}" stop-opacity="0.2"/><stop offset="100%" stop-color="${a.stroke}" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="url(#dashboard-generated-scene-core)" filter="url(#${a.filter})" opacity="0.56"/><path d="${a.line}" stroke="${a.accent}" stroke-width="0.32" fill="none" opacity="0.78"/><path d="${a.detail}" stroke="${a.stroke}" stroke-width="0.28" fill="none" opacity="0.62"/></svg>`},S=(e,t,r,a)=>{const o=A(e,r,a),i=z(t,o);return i?{...i,chromeStyle:o.chromeStyle,textureStyle:o.textureStyle,intensity:Math.max(i.intensity,o.intensity),glassOpacity:Math.min(i.glassOpacity,o.glassOpacity),borderStrength:Math.max(i.borderStrength,o.borderStrength),glowStrength:Math.max(i.glowStrength,o.glowStrength),overlayOpacity:Math.max(i.overlayOpacity,o.overlayOpacity),controlContrast:Math.max(i.controlContrast,o.controlContrast)}:o},ae=(e,t)=>{const r=R(e),a=P(e,t.fallback,t.palette),o=t.code.length+r.length+1<=v?`${t.code}
${r}`:L(e);return M({...t,code:o,css:t.css||O(e),svg:t.svg||B(e),maxFps:Math.min(t.maxFps,24),maxDevicePixelRatio:Math.min(t.maxDevicePixelRatio,1),fallback:a})||t},G=e=>{const t=T(e),r=x(t),a=j(t),o=K(a),i=Q(t,o),s=A(t,i,o),d=P(t,o,i),l=M({label:_(r),summary:"Layered canvas code with scanlines, depth particles, HUD accents, CSS/SVG overlays, and a safe structured fallback.",code:L(t),css:O(t),svg:B(t),palette:i,maxFps:24,maxDevicePixelRatio:1,fallback:d})||{code:"ctx.clearRect(0, 0, width, height);",palette:i,maxFps:24,maxDevicePixelRatio:1,fallback:d};return{source:"local",summary:["Multi-layer animated background with lightweight code-rendered scene systems.","Glass, accent, contrast, and motion tuned together for a full-page theme.","Scene-specific readouts, depth particles, scanlines, mesh links, and lens streaks share one performance budget."],appearance:{...a,backgroundStyle:"animated",animationPreset:"generatedCode",generatedAnimation:void 0,generatedCodeAnimation:l,advancedSurface:s,glassEffectEnabled:!0}}},ie=e=>{if(e&&typeof e=="object")return e;if(typeof e!="string")return null;const t=e.trim();if(!t)return null;try{return JSON.parse(t)}catch{const r=t.indexOf("{"),a=t.lastIndexOf("}");if(r<0||a<=r)return null;try{return JSON.parse(t.slice(r,a+1))}catch{return null}}},C=(e,t)=>{const r=G(t),a=T(t),o=ie(e);if(!o)return{pack:r,error:"Theme pack was not valid JSON."};const i=o.appearance&&typeof o.appearance=="object"?o.appearance:o,s=D(i.generatedCodeAnimation),d=s.spec,l=Array.isArray(o.summary)?o.summary.filter(h=>typeof h=="string"&&h.trim().length>0).map(h=>h.trim().slice(0,140)).slice(0,5):r.summary;if(!d&&i.animationPreset==="generatedCode"){const h=F(i.generatedCodeAnimation),g=S(a,i.advancedSurface,h.colors,h),p=y({...i,backgroundStyle:"animated",advancedSurface:g,animationPreset:"generated",generatedAnimation:h});return delete p.generatedCodeAnimation,{pack:{source:"model",summary:l,warnings:["Generated code was rejected and replaced with a safe canvas fallback."],appearance:p},error:s.error||"Generated code was rejected by validation."}}if(d){const h=ae(a,d),g=S(a,i.advancedSurface,h.palette,h.fallback);return{pack:{source:"model",summary:l,appearance:{...y({...i,backgroundStyle:"animated",advancedSurface:g,animationPreset:"generatedCode",generatedCodeAnimation:h})}}}}return{pack:{...r,source:"model",summary:l},error:s.error||"Theme pack did not include a valid generatedCodeAnimation."}},ne=async e=>{const t=G(e);try{const r=await $();if(!U(r))return b(t,"No configured Text LLM credential was available, so Curio used the local advanced theme builder.");const a=await H(),o=await a.generateText({prompt:q(e),systemPrompt:w,allowNativeSearch:!1,responseFormat:"json",stream:!1}),i=C(o,e);if(i.error){const s=await a.generateText({prompt:I(e,i.error,o),systemPrompt:`${w}

Correction mode: return a corrected full JSON object only. Fix the reported validation error directly and keep the advanced generatedCode theme.`,allowNativeSearch:!1,responseFormat:"json",stream:!1}),d=C(s,e);return!d.error&&d.pack.source==="model"?b(d.pack,`Text LLM self-corrected generated theme after validation failed: ${f(i.error)}.`):b(t,`Text LLM returned invalid advanced theme code twice (${f(d.error||i.error)}), so Curio used the local advanced theme builder.`)}return i.pack.source!=="model"?b(t,"Text LLM returned an invalid advanced theme pack, so Curio used the local advanced theme builder."):i.pack}catch(r){const a=f(r);return b(t,`Text LLM theme generation failed: ${a}. Curio used the local advanced theme builder.`)}};export{ne as g};
