"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps { to: number; from?: number; duration?: number; suffix?: string; prefix?: string; className?: string; }

export default function CountUp({ to, from=0, duration=1.5, suffix="", prefix="", className="" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(from);
  const start = useRef<number|null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVal(to); return; }
    const frame = (ts: number) => {
      if (!start.current) start.current = ts;
      const p = Math.min((ts - start.current) / (duration * 1000), 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(frame); else setVal(to);
    };
    requestAnimationFrame(frame);
  }, [inView, from, to, duration]);

  return <span ref={ref} className={className}>{prefix}{Math.round(val)}{suffix}</span>;
}
