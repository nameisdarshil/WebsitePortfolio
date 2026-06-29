"use client";
// React Bits — DecryptedText (reactbits.dev/text-animations/decrypted-text)
// Chars cycle through random values before revealing, like decryption
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>[]{}|_-+=~";

interface DecryptedTextProps {
  text: string;
  className?: string;
  encryptedClassName?: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  trigger?: "inview" | "hover" | "always";
  onComplete?: () => void;
}

export default function DecryptedText({
  text,
  className = "",
  encryptedClassName = "",
  speed = 50,
  maxIterations = 10,
  sequential = false,
  trigger = "inview",
  onComplete,
}: DecryptedTextProps) {
  const [displayed, setDisplayed] = useState<string[]>(text.split(""));
  const [revealed, setRevealed] = useState<boolean[]>(new Array(text.length).fill(false));
  const [running, setRunning] = useState(trigger === "always");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const iterationRef = useRef<Map<number, number>>(new Map());
  const rafRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (trigger === "inview" && inView) setRunning(true);
  }, [inView, trigger]);

  useEffect(() => {
    if (!running) return;
    const len = text.length;
    const iter = new Map<number, number>();
    for (let i = 0; i < len; i++) iter.set(i, 0);
    iterationRef.current = iter;

    const revealedArr = new Array(len).fill(false);
    let revealIndex = 0;

    const tick = () => {
      let allDone = true;

      setDisplayed(text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (revealedArr[i]) return ch;

        const it = iterationRef.current.get(i) ?? 0;
        if (sequential ? i <= revealIndex : it >= maxIterations) {
          revealedArr[i] = true;
          return ch;
        }

        allDone = false;
        iterationRef.current.set(i, it + 1);
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }));

      setRevealed([...revealedArr]);

      if (sequential && revealIndex < len - 1) {
        if (Math.random() < 0.3) revealIndex++;
      }

      if (!allDone) {
        rafRef.current = setTimeout(tick, speed);
      } else {
        onComplete?.();
      }
    };

    tick();
    return () => { if (rafRef.current) clearTimeout(rafRef.current); };
  }, [running]); // eslint-disable-line

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onMouseEnter={() => { if (trigger === "hover") setRunning(r => { if (!r) { setTimeout(() => setRunning(false), 10); } return true; }); }}
    >
      {displayed.map((ch, i) => (
        <span key={i} className={revealed[i] ? "" : encryptedClassName}
          style={{ display: "inline-block", minWidth: ch === " " ? "0.3em" : undefined }}>
          {ch}
        </span>
      ))}
    </span>
  );
}
