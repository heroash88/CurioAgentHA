import{R as a,j as o}from"./react-CPkiFScu.js";import{q as O,D as B}from"./CardErrorBoundary-BqZLhDOx.js";import G from"./GeneratedCanvasBackground-DyCrI2lO.js";import"./main-C2chIEfX.js";import"./randomId-suUo7Lgn.js";import"./lucide-DtrNBTgJ.js";import"./useAnimatedCanvas-GiD7uSVl.js";import"./HostApp-Dgd8w91R.js";import"./voiceSettings-B2_QrlbF.js";import"./secretStorage-BTIphee0.js";import"./audioContext-Bbve1ath.js";import"./curioTextAttachments-C2QZx4hl.js";import"./emotionDetection-Lbf-l8dr.js";import"./wakeWordCatalog-ut6S4Ot4.js";import"./memorySettings-D2NZ_wXj.js";import"./genericMcpStdioTransport-Bfo2WHjH.js";import"./integrationSettings-REM01Nss.js";import"./desktopBridge-BsSGYho0.js";import"./framer-motion-EOYuYTmb.js";import"./weatherService-D8Vw6UgH.js";import"./musicPlaybackService-6G-eInaY.js";import"./spotifyApi-DYAGiPZi.js";import"./robotFacePacks-x0w5UKOl.js";const A=()=>`
let canvas = null;
let ctx = null;
let render = null;
let width = 1;
let height = 1;
let intervalMs = 40;
let timer = 0;
let lastAt = 0;
let slowFrames = 0;
let paused = false;
let palette = ["#7dd3fc", "#a78bfa", "#f0abfc"];
let state = { seed: 17 };
const safeSetTimeout = globalThis.setTimeout.bind(globalThis);
const safeClearTimeout = globalThis.clearTimeout.bind(globalThis);
const blocked = ["fetch","XMLHttpRequest","WebSocket","EventSource","Worker","SharedWorker","importScripts","navigator","location","localStorage","sessionStorage","indexedDB","caches","setTimeout","setInterval","clearTimeout","clearInterval"];
for (const key of blocked) {
  try { Object.defineProperty(globalThis, key, { value: undefined, writable: false, configurable: false }); } catch {}
}
const seededRandom = (seed) => {
  const numericSeed = Number(seed);
  let nextSeed = Number.isFinite(numericSeed) ? numericSeed : 0;
  if (!nextSeed) {
    state.__randomTick = (state.__randomTick || 0) + 1;
    nextSeed = (state.seed || 17) + state.__randomTick;
  }
  const value = Math.sin(nextSeed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};
const utils = Object.freeze({
  PI: Math.PI,
  TAU: Math.PI * 2,
  abs: Math.abs,
  atan2: Math.atan2,
  ceil: Math.ceil,
  clamp: (value, min, max) => Math.max(min, Math.min(max, value)),
  cos: Math.cos,
  floor: Math.floor,
  lerp: (a, b, t) => a + (b - a) * t,
  max: Math.max,
  min: Math.min,
  noise: (seed) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  },
  pow: Math.pow,
  rand: seededRandom,
  random: seededRandom,
  round: Math.round,
  sin: Math.sin,
  smoothstep: (edge0, edge1, value) => {
    const t = Math.max(0, Math.min(1, (value - edge0) / Math.max(0.0001, edge1 - edge0)));
    return t * t * (3 - 2 * t);
  },
  sqrt: Math.sqrt,
});
const stopLoop = () => {
  if (timer) {
    safeClearTimeout(timer);
    timer = 0;
  }
};
const draw = () => {
  if (!ctx || !render || paused) return;
  const now = performance.now();
  const delta = lastAt ? now - lastAt : intervalMs;
  lastAt = now;
  const startedAt = performance.now();
  try {
    render(ctx, width, height, now, delta, palette, state, utils);
  } catch (error) {
    postMessage({ type: "error", message: error && error.message ? error.message : "Generated theme code failed." });
    stopLoop();
    return;
  }
  const renderMs = performance.now() - startedAt;
  slowFrames = renderMs > intervalMs * 0.82 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
  if (slowFrames > 8) {
    postMessage({ type: "error", message: "Generated theme exceeded the frame budget." });
    stopLoop();
    return;
  }
  postMessage({ type: "frame", renderMs });
  timer = safeSetTimeout(draw, intervalMs);
};
onmessage = (event) => {
  const message = event.data || {};
  if (message.type === "init") {
    canvas = message.canvas;
    width = Math.max(1, Math.floor(message.width || 1));
    height = Math.max(1, Math.floor(message.height || 1));
    intervalMs = Math.max(33, Math.floor(1000 / Math.max(12, Math.min(30, message.maxFps || 24))));
    palette = Array.isArray(message.palette) && message.palette.length ? message.palette : palette;
    state = { seed: Number(message.seed) || 17 };
    canvas.width = Math.max(1, Math.floor(width * Math.max(0.5, Math.min(1.25, message.dpr || 1))));
    canvas.height = Math.max(1, Math.floor(height * Math.max(0.5, Math.min(1.25, message.dpr || 1))));
    ctx = canvas.getContext("2d");
    if (!ctx) {
      postMessage({ type: "error", message: "Generated theme canvas is unavailable." });
      return;
    }
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    try {
      render = new Function("ctx", "width", "height", "time", "delta", "palette", "state", "utils", '"use strict";\\n' + message.code);
    } catch (error) {
      postMessage({ type: "error", message: error && error.message ? error.message : "Generated theme code could not compile." });
      return;
    }
    paused = Boolean(message.paused);
    if (!paused) draw();
  } else if (message.type === "resize" && canvas && ctx) {
    width = Math.max(1, Math.floor(message.width || width));
    height = Math.max(1, Math.floor(message.height || height));
    const dpr = Math.max(0.5, Math.min(1.25, message.dpr || 1));
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
  } else if (message.type === "pause") {
    paused = Boolean(message.paused);
    if (paused) {
      stopLoop();
      lastAt = 0;
    } else if (!timer) {
      draw();
    }
  } else if (message.type === "dispose") {
    stopLoop();
  }
};
`,me=A,H=()=>typeof HTMLCanvasElement<"u"&&typeof Worker<"u"&&"transferControlToOffscreen"in HTMLCanvasElement.prototype,L=n=>{var e;const r=((e=n.parentElement)==null?void 0:e.getBoundingClientRect())||n.getBoundingClientRect();return{width:Math.max(1,Math.round(r.width||n.clientWidth||1)),height:Math.max(1,Math.round(r.height||n.clientHeight||1))}},j=n=>{let r=2166136261;for(let e=0;e<n.length;e+=1)r^=n.charCodeAt(e),r=Math.imul(r,16777619);return(r>>>0).toString(36)},I=(n,r)=>n.replace(/\.dashboard-generated-code-effects/g,`.${r}`).replace(/(^|[,{]\s*)\.dashboard-generated-code-svg/g,`$1.${r} .dashboard-generated-code-svg`),he=({paused:n=!1,spec:r})=>{const e=a.useMemo(()=>O(r),[r]),x=a.useRef(null),i=a.useRef(null),[F,D]=a.useState(!1),[_,c]=a.useState(!1),[P,k]=a.useState(!1),g=!!e&&H()&&!_,d=n||F,M=a.useRef(d),v=a.useMemo(()=>e?`dashboard-generated-code-effects-${j([e.code,e.css||"",e.svg||""].join(`
`))}`:"dashboard-generated-code-effects-empty",[e]),b=a.useMemo(()=>e?j(JSON.stringify({code:e.code,maxDevicePixelRatio:e.maxDevicePixelRatio,maxFps:e.maxFps,palette:e.palette})):"dashboard-generated-code-empty",[e]),w=a.useMemo(()=>e!=null&&e.css?I(e.css,v):"",[v,e==null?void 0:e.css]);a.useEffect(()=>{k(!0)},[]),a.useEffect(()=>{c(!1)},[b]),a.useEffect(()=>{M.current=d},[d]),a.useEffect(()=>{if(typeof document>"u")return;const s=()=>{D(document.visibilityState==="hidden")};return s(),document.addEventListener("visibilitychange",s),()=>{document.removeEventListener("visibilitychange",s)}},[]),a.useEffect(()=>{if(!g||!e)return;const s=x.current;if(!s)return;const R=s.transferControlToOffscreen;if(!R)return;let t=null,l=null,f=null;const m=()=>{f!==null&&(window.clearTimeout(f),f=null)},T=()=>{m(),!M.current&&(f=window.setTimeout(()=>{t==null||t.terminate(),i.current=null,c(!0)},2500))};try{const S=R.call(s);l=URL.createObjectURL(new Blob([A()],{type:"text/javascript"})),t=new Worker(l),i.current=t,t.onmessage=u=>{var p,E;if(((p=u.data)==null?void 0:p.type)==="error"){m(),t==null||t.terminate(),i.current=null,c(!0);return}((E=u.data)==null?void 0:E.type)==="frame"&&T()},t.onerror=()=>{m(),t==null||t.terminate(),i.current=null,c(!0)};const C=L(s),N=Math.min(window.devicePixelRatio||1,e.maxDevicePixelRatio);t.postMessage({type:"init",canvas:S,width:C.width,height:C.height,dpr:N,maxFps:e.maxFps,palette:e.palette,code:e.code,seed:17,paused:M.current},[S]),T();let h=null;return typeof ResizeObserver<"u"&&s.parentElement&&(h=new ResizeObserver(()=>{if(!t)return;const u=L(s),p=Math.min(window.devicePixelRatio||1,e.maxDevicePixelRatio);t.postMessage({type:"resize",width:u.width,height:u.height,dpr:p})}),h.observe(s.parentElement)),()=>{m(),h==null||h.disconnect(),t==null||t.postMessage({type:"dispose"}),t==null||t.terminate(),i.current=null,l&&URL.revokeObjectURL(l)}}catch{m(),t==null||t.terminate(),i.current=null,l&&URL.revokeObjectURL(l),c(!0)}},[g,e]),a.useEffect(()=>{var s;(s=i.current)==null||s.postMessage({type:"pause",paused:d})},[d]);const y=e&&(e.css||e.svg)?o.jsxs(o.Fragment,{children:[w&&o.jsx("style",{children:w}),o.jsx("div",{"aria-hidden":"true",className:`${v} dashboard-generated-code-effects pointer-events-none absolute inset-0`,children:e.svg&&o.jsx("div",{className:"dashboard-generated-code-svg absolute inset-0",dangerouslySetInnerHTML:{__html:e.svg}})})]}):null;return!g||!e?o.jsxs("div",{className:"relative h-full w-full",children:[o.jsx(G,{spec:(e==null?void 0:e.fallback)||B,paused:d}),y]}):o.jsxs("div",{className:"relative h-full w-full",children:[o.jsx("canvas",{ref:x,"aria-hidden":"true",style:{opacity:P?.98:0,transition:"opacity 600ms ease-in-out"},className:"block h-full w-full mix-blend-normal"},b),y]})};export{me as __getGeneratedCodeWorkerSourceForTests,he as default};
