"use client";
// React Bits — GlitchText (reactbits.dev/text-animations/glitch-text)
// CSS glitch effect with chromatic aberration on hover/inview
import { useRef } from "react";
import { useInView } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: "slow" | "medium" | "fast";
  trigger?: "hover" | "inview" | "always";
  color1?: string;
  color2?: string;
}

export default function GlitchText({
  text,
  className = "",
  speed = "medium",
  trigger = "hover",
  color1 = "#c8864a",
  color2 = "#818cf8",
}: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const shouldGlitch = trigger === "always" || (trigger === "inview" && inView);

  const dur = { slow: "4s", medium: "2s", fast: "0.8s" }[speed];

  return (
    <span
      ref={ref}
      className={`relative inline-block ${className} ${trigger === "hover" ? "group" : ""}`}
      aria-label={text}
    >
      {text}
      {/* Chromatic layer 1 */}
      <span
        aria-hidden
        className={trigger === "hover" ? "opacity-0 group-hover:opacity-60" : shouldGlitch ? "opacity-60" : "opacity-0"}
        style={{
          position: "absolute", inset: 0, color: color1,
          animation: shouldGlitch || trigger === "hover" ? `glitch-clip1 ${dur} infinite linear` : "none",
          transition: "opacity 0.15s",
          pointerEvents: "none",
        }}
      >
        {text}
      </span>
      {/* Chromatic layer 2 */}
      <span
        aria-hidden
        className={trigger === "hover" ? "opacity-0 group-hover:opacity-50" : shouldGlitch ? "opacity-50" : "opacity-0"}
        style={{
          position: "absolute", inset: 0, color: color2,
          animation: shouldGlitch || trigger === "hover" ? `glitch-clip2 ${dur} infinite linear 0.15s` : "none",
          transition: "opacity 0.15s",
          pointerEvents: "none",
        }}
      >
        {text}
      </span>
      <style>{`
        @keyframes glitch-clip1 {
          0%   { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
          20%  { clip-path: inset(30% 0 50% 0); transform: translate(2px, 0); }
          40%  { clip-path: inset(60% 0 20% 0); transform: translate(-1px, 0); }
          60%  { clip-path: inset(10% 0 80% 0); transform: translate(1px, 0); }
          80%  { clip-path: inset(80% 0 5% 0);  transform: translate(-2px, 0); }
          100% { clip-path: inset(0 0 95% 0); transform: translate(0, 0); }
        }
        @keyframes glitch-clip2 {
          0%   { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
          25%  { clip-path: inset(80% 0 5% 0);  transform: translate(-2px, 0); }
          50%  { clip-path: inset(20% 0 60% 0); transform: translate(1px, 0); }
          75%  { clip-path: inset(5% 0 85% 0);  transform: translate(-1px, 0); }
          100% { clip-path: inset(50% 0 30% 0); transform: translate(0, 0); }
        }
      `}</style>
    </span>
  );
}
