"use client";
import { useEffect, useRef } from "react";

interface AuroraProps { colorStops?: string[]; blend?: number; amplitude?: number; speed?: number; className?: string; }

function hexAlpha(hex: string, a: number) {
  return hex + Math.floor(a * 255).toString(16).padStart(2, "0");
}

export default function Aurora({ colorStops=["#c8864a","#0c0b0a","#3d1f0a"], blend=0.5, amplitude=1.0, speed=0.5, className="" }: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      if (!reduced) t += speed * 0.005;

      colorStops.forEach((color, b) => {
        const phase = (b / colorStops.length) * Math.PI * 2;
        const yBase = H * (0.25 + b * 0.18);
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const nx = x / W;
          const wave = Math.sin(nx*3+t+phase)*80*amplitude + Math.sin(nx*5+t*1.3+phase)*35*amplitude + Math.sin(nx*1.5+t*0.7+phase)*55*amplitude;
          ctx.lineTo(x, yBase + wave);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        const g = ctx.createLinearGradient(0,0,W,0);
        g.addColorStop(0, hexAlpha(color, 0));
        g.addColorStop(0.35 + b*0.1, hexAlpha(color, blend * 0.65));
        g.addColorStop(1, hexAlpha(color, 0));
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.3 + b * 0.07;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); };
  }, [colorStops, blend, amplitude, speed]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} style={{ pointerEvents:"none" }} aria-hidden />;
}
