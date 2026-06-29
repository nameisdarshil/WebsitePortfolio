"use client";
// React Bits — RotatingText (reactbits.dev/text-animations/rotating-text)
// Words rotate in/out vertically — great for role cycling
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  className?: string;
  textClassName?: string;
  interval?: number;
  transition?: "slide" | "fade" | "flip";
}

export default function RotatingText({
  texts,
  className = "",
  textClassName = "",
  interval = 2800,
  transition = "slide",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % texts.length), interval);
    return () => clearInterval(t);
  }, [texts.length, interval]);

  const variants = {
    slide: {
      enter: { y: "100%", opacity: 0 },
      center: { y: 0, opacity: 1 },
      exit: { y: "-100%", opacity: 0 },
    },
    fade: {
      enter: { opacity: 0, scale: 0.95 },
      center: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
    },
    flip: {
      enter: { rotateX: -90, opacity: 0 },
      center: { rotateX: 0, opacity: 1 },
      exit: { rotateX: 90, opacity: 0 },
    },
  }[transition];

  return (
    <span className={`inline-flex overflow-hidden ${className}`} style={{ position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className={textClassName}
          initial={variants.enter}
          animate={variants.center}
          exit={variants.exit}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
