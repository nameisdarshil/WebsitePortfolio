"use client";
// React Bits — Lightfall / LightRays background (reactbits.dev/backgrounds/light-rays)
// Animated canvas light rays emanating from a point
import { useEffect, useRef } from "react";

interface LightfallProps {
  rayCount?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  className?: string;
  origin?: { x: number; y: number }; // 0-1 normalized
}

interface Ray {
  angle: number;
  width: number;
  length: number;
  speed: number;
  phase: number;
  alpha: number;
}

export default function Lightfall({
  rayCount = 8,
  color = "#c8864a",
  opacity = 0.12,
  speed = 0.3,
  className = "",
  origin = { x: 0.65, y: 0.1 },
}: LightfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Parse color to r,g,b
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Create rays
    const rays: Ray[] = Array.from({ length: rayCount }, (_, i) => ({
      angle: (i / rayCount) * Math.PI * 0.8 - Math.PI * 0.15,
      width: 0.04 + Math.random() * 0.06,
      length: 0.6 + Math.random() * 0.5,
      speed: (0.5 + Math.random() * 0.5) * speed,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.3 + Math.random() * 0.7,
    }));

    let t = 0;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      if (!reduced) t += 0.008;

      const ox = origin.x * W;
      const oy = origin.y * H;

      rays.forEach(ray => {
        const a = ray.angle + Math.sin(t * ray.speed + ray.phase) * 0.08;
        const endX = ox + Math.cos(a) * ray.length * Math.max(W, H);
        const endY = oy + Math.sin(a) * ray.length * Math.max(W, H);
        const halfW = ray.width * W * (0.8 + Math.sin(t * ray.speed * 0.7 + ray.phase) * 0.2);

        const perpX = Math.sin(a);
        const perpY = -Math.cos(a);

        ctx.beginPath();
        ctx.moveTo(ox + perpX * halfW, oy + perpY * halfW);
        ctx.lineTo(endX + perpX * halfW * 0.01, endY + perpY * halfW * 0.01);
        ctx.lineTo(endX - perpX * halfW * 0.01, endY - perpY * halfW * 0.01);
        ctx.lineTo(ox - perpX * halfW, oy - perpY * halfW);
        ctx.closePath();

        const alpha = opacity * ray.alpha * (0.6 + Math.sin(t * ray.speed + ray.phase) * 0.4);
        const grad = ctx.createLinearGradient(ox, oy, endX, endY);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [rayCount, color, opacity, speed, origin]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
