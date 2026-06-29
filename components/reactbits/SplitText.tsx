"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  rootMargin?: string;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({ text, className="", delay=80, duration=0.6, ease="power3.out", splitType="chars", from={ opacity:0, y:40 }, to={ opacity:1, y:0 }, rootMargin="-80px", onLetterAnimationComplete }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = splitType === "chars" ? text.split("") : text.split(" ");
    el.innerHTML = items.map((ch, i) =>
      ch === " "
        ? `<span style="display:inline-block;width:0.28em"> </span>`
        : `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block" data-i="${i}">${ch}</span></span>`
    ).join("");

    const spans = el.querySelectorAll<HTMLElement>("[data-i]");
    if (reduced) { gsap.set(spans, to); return; }
    gsap.set(spans, from);

    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      animated.current = true;
      obs.disconnect();
      gsap.to(spans, { ...to, duration, ease, stagger: delay / 1000, onComplete: () => onLetterAnimationComplete?.() });
    }, { rootMargin });

    obs.observe(el);
    return () => obs.disconnect();
  }, [text, delay, duration, ease, splitType, from, to, rootMargin, onLetterAnimationComplete]);

  return <span ref={ref} className={className} style={{ display:"block", whiteSpace:"nowrap" }}>{text}</span>;
}
