"use client";
import { useEffect, useRef, useCallback } from "react";

interface ParticlesProps { count?: number; spread?: number; speed?: number; colors?: string[]; interactive?: boolean; className?: string; }

function hex2rgb(h: string): [number,number,number] {
  return [parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255];
}

export default function Particles({ count=50, spread=7, speed=0.03, colors=["#c8864a","#f0ebe5","#9a9080"], interactive=true, className="" }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x:0, y:0 });
  const rot = useRef({ x:0, y:0 });
  const raf = useRef<number>(0);

  const makeParts = useCallback(() => Array.from({ length: count }, () => ({
    x:(Math.random()-.5)*spread, y:(Math.random()-.5)*spread, z:(Math.random()-.5)*spread,
    vx:(Math.random()-.5)*speed, vy:(Math.random()-.5)*speed, vz:(Math.random()-.5)*speed,
    rgb: hex2rgb(colors[Math.floor(Math.random()*colors.length)]),
    size: 60 + Math.random()*80, alpha: Math.random()*0.35+0.08,
  })), [count, spread, speed, colors]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const parts = makeParts();
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x:((e.clientX-r.left)/r.width-.5)*2, y:((e.clientY-r.top)/r.height-.5)*2 };
    };
    if (interactive) canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      if (!reduced) {
        rot.current.x += 0.0004 + mouse.current.y * 0.0003;
        rot.current.y += 0.0003 + mouse.current.x * 0.0003;
      }
      const cx=Math.cos(rot.current.x), sx=Math.sin(rot.current.x), cy=Math.cos(rot.current.y), sy=Math.sin(rot.current.y);

      parts.forEach(p => {
        if (!reduced) { p.x+=p.vx; p.y+=p.vy; p.z+=p.vz; }
        let {x,y,z}=p;
        const y1=y*cx-z*sx, z1=y*sx+z*cx;
        const x2=x*cy+z1*sy, z2=-x*sy+z1*cy;
        y=y1; x=x2; z=z2;
        const pr=18/(18+z);
        if (pr<=0) return;
        const sx2=x*pr*(W/8)+W/2, sy2=y*pr*(H/8)+H/2, sr=p.size*pr;
        if (sx2<-sr||sx2>W+sr||sy2<-sr||sy2>H+sr) return;
        const [r,g,b]=p.rgb;
        ctx.beginPath(); ctx.arc(sx2,sy2,sr,0,Math.PI*2);
        ctx.fillStyle=`rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${p.alpha*pr})`;
        ctx.fill();
      });
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); if (interactive) canvas.removeEventListener("mousemove", onMove); };
  }, [makeParts, interactive]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} style={{ pointerEvents:interactive?"auto":"none" }} aria-hidden />;
}
