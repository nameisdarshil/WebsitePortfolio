"use client";
// React Bits — ScrambledText (reactbits.dev/text-animations/scrambled-text)
// Scrambles characters randomly before settling on the real text
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambledTextProps {
  text: string;
  className?: string;
  speed?: number;          // ms per frame
  revealDelay?: number;    // ms before a char locks in
  sequential?: boolean;    // reveal left-to-right vs random
  trigger?: "hover" | "inview" | "always";
}

export default function ScrambledText({
  text,
  className = "",
  speed = 40,
  revealDelay = 800,
  sequential = true,
  trigger = "inview",
}: ScrambledTextProps) {
  const [display, setDisplay] = useState(text);
  const [running, setRunning] = useState(trigger === "always");
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    const len = text.length;
    const revealed = new Array(len).fill(false);
    let frame = 0;
    const totalFrames = Math.ceil(revealDelay / speed);

    const tick = () => {
      // Lock in chars progressively
      if (sequential) {
        const progress = Math.floor((frame / totalFrames) * len);
        for (let i = 0; i < progress; i++) revealed[i] = true;
      } else {
        if (Math.random() < 0.15) {
          const idx = Math.floor(Math.random() * len);
          revealed[idx] = true;
        }
      }

      const next = text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (revealed[i]) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setDisplay(next);
      frame++;

      if (revealed.every(Boolean)) {
        setDisplay(text);
        return;
      }
      frameRef.current = setTimeout(tick, speed);
    };

    tick();
  };

  // Inview trigger
  useEffect(() => {
    if (trigger !== "inview") return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setRunning(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!running) return;
    if (frameRef.current) clearTimeout(frameRef.current);
    scramble();
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [running]); // eslint-disable-line

  const handleMouseEnter = () => {
    if (trigger !== "hover") return;
    if (frameRef.current) clearTimeout(frameRef.current);
    scramble();
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: "inline-block", fontVariantNumeric: "tabular-nums" }}
      aria-label={text}
    >
      {display}
    </span>
  );
}
