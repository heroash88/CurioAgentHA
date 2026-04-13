import React, { useEffect, useRef, useCallback } from 'react';
import { getVolume } from '../../services/volumeStore';

interface VoiceWaveformProps {
  isSpeaking: boolean;
  isConnected: boolean;
  className?: string;
  lowPowerMode?: boolean;
  performanceMode?: boolean;
}

const TAU = Math.PI * 2;

// Aurora ribbon config — thin gradient lines that float and pulse
interface Ribbon {
  hue: number;        // base hue (0-360)
  hueShift: number;   // how much hue drifts over time
  speed: number;       // horizontal drift speed
  frequency: number;   // wave tightness
  amplitudeIdle: number;
  amplitudeSpeaking: number;
  phase: number;
  yOffset: number;
  thickness: number;   // line width
  opacity: number;     // base opacity
}

const RIBBONS: Ribbon[] = [
  { hue: 280, hueShift: 30, speed: 0.15, frequency: 0.7, amplitudeIdle: 3, amplitudeSpeaking: 18, phase: 0, yOffset: 0, thickness: 2.5, opacity: 0.35 },
  { hue: 200, hueShift: 20, speed: 0.22, frequency: 0.9, amplitudeIdle: 2, amplitudeSpeaking: 14, phase: 1.5, yOffset: 4, thickness: 2, opacity: 0.3 },
  { hue: 170, hueShift: 25, speed: 0.18, frequency: 1.1, amplitudeIdle: 2.5, amplitudeSpeaking: 16, phase: 3.0, yOffset: -3, thickness: 1.8, opacity: 0.25 },
  { hue: 320, hueShift: 15, speed: 0.25, frequency: 1.3, amplitudeIdle: 1.5, amplitudeSpeaking: 12, phase: 4.2, yOffset: 6, thickness: 1.5, opacity: 0.2 },
  { hue: 40, hueShift: 35, speed: 0.12, frequency: 0.5, amplitudeIdle: 4, amplitudeSpeaking: 22, phase: 5.5, yOffset: -5, thickness: 3, opacity: 0.15 },
];

const RIBBONS_LOW = RIBBONS.slice(0, 3);

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const VoiceWaveformComponent: React.FC<VoiceWaveformProps> = ({
  isSpeaking,
  isConnected,
  className = '',
  lowPowerMode,
  performanceMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const amplitudeRef = useRef(0);
  const targetAmplitudeRef = useRef(0);
  const timeRef = useRef(0);
  const isVisibleRef = useRef(false);
  const lowPower = lowPowerMode ?? performanceMode;
  const isSpeakingRef = useRef(isSpeaking);
  const cachedSizeRef = useRef({ w: 0, h: 0 });

  const isVisible = isConnected;
  isVisibleRef.current = isVisible;
  isSpeakingRef.current = isSpeaking;

  // Update target amplitude from shared volume store (read in draw loop, no interval needed)
  useEffect(() => {
    if (!isSpeaking) {
      targetAmplitudeRef.current = 0.15;
    }
  }, [isSpeaking]);

  const draw = useCallback(() => {
    if (!isVisibleRef.current && amplitudeRef.current < 0.02) {
      rafRef.current = 0;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { rafRef.current = requestAnimationFrame(draw); return; }

    const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 2);
    // Use cached dimensions to avoid layout-forcing getBoundingClientRect every frame
    let w = cachedSizeRef.current.w;
    let h = cachedSizeRef.current.h;
    if (w === 0 || h === 0) {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cachedSizeRef.current = { w, h };
    }

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const dt = lowPower ? 0.02 : 0.014;
    timeRef.current += dt;
    const t = timeRef.current;

    // Read volume directly from shared store — no getComputedStyle needed
    if (isSpeakingRef.current) {
      const vol = getVolume();
      targetAmplitudeRef.current = 0.25 + vol * 0.75;
    }

    amplitudeRef.current = lerp(amplitudeRef.current, targetAmplitudeRef.current, 0.035);
    const amp = amplitudeRef.current;

    ctx.clearRect(0, 0, w, h);

    const ribbons = lowPower ? RIBBONS_LOW : RIBBONS;
    const baseY = h * 0.55;
    const step = lowPower ? 4 : 2;

    // Draw each ribbon as a gradient-stroked line with soft glow
    for (let ri = 0; ri < ribbons.length; ri++) {
      const r = ribbons[ri];
      const waveAmp = lerp(r.amplitudeIdle, r.amplitudeSpeaking, amp);
      const hue = r.hue + Math.sin(t * 0.1 + r.phase) * r.hueShift;
      const alpha = r.opacity * (0.4 + amp * 0.6);

      // Build the path points
      const points: [number, number][] = [];
      for (let x = 0; x <= w; x += step) {
        const nx = x / w;
        // Three sine components for organic movement
        const y1 = Math.sin(nx * TAU * r.frequency + t * r.speed + r.phase) * waveAmp;
        const y2 = Math.sin(nx * TAU * (r.frequency * 0.6) + t * r.speed * 1.4 + r.phase + 2.0) * waveAmp * 0.35;
        const y3 = Math.sin(nx * TAU * (r.frequency * 1.8) + t * r.speed * 0.7 + r.phase + 4.0) * waveAmp * 0.15;
        points.push([x, baseY + r.yOffset + y1 + y2 + y3]);
      }

      // Soft glow layer (wider, more transparent)
      if (!lowPower) {
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          if (i === 0) ctx.moveTo(points[i][0], points[i][1]);
          else ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${alpha * 0.3})`;
        ctx.lineWidth = r.thickness * 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Create gradient along the ribbon
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, `hsla(${hue}, 85%, 65%, ${alpha * 0.2})`);
      grad.addColorStop(0.3, `hsla(${hue + 20}, 80%, 70%, ${alpha})`);
      grad.addColorStop(0.5, `hsla(${hue + 40}, 90%, 75%, ${alpha * 1.2})`);
      grad.addColorStop(0.7, `hsla(${hue + 20}, 80%, 70%, ${alpha})`);
      grad.addColorStop(1, `hsla(${hue}, 85%, 65%, ${alpha * 0.2})`);

      // Main ribbon stroke
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(points[i][0], points[i][1]);
        else ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = r.thickness * (0.6 + amp * 0.4);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [lowPower]);

  // Start/stop RAF based on visibility
  useEffect(() => {
    if (isVisible && !rafRef.current) {
      rafRef.current = requestAnimationFrame(draw);
    }
    if (!isVisible) {
      targetAmplitudeRef.current = 0;
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [isVisible, draw]);

  // Pause when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      } else if (!document.hidden && isVisibleRef.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [draw]);

  // Invalidate cached canvas size on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      cachedSizeRef.current = { w: 0, h: 0 };
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={`relative w-full h-32 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: isConnected ? 1 : 0 }}
      />
    </div>
  );
};

export const VoiceWaveform = React.memo(VoiceWaveformComponent);
VoiceWaveform.displayName = 'VoiceWaveform';
