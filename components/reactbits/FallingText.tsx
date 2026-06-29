"use client";
// React Bits — FallingText (reactbits.dev/text-animations/falling-text)
// Each word/char falls from above with physics-like timing
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface FallingTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  splitBy?: "words" | "chars";
  delay?: number;        // stagger in ms
  duration?: number;
  trigger?: "inview" | "always";
  from?: "top" | "bottom";
}

export default function FallingText({
  text,
  className = "",
  charClassName = "",
  splitBy = "words",
  delay = 60,
  duration = 0.55,
  trigger = "inview",
  from = "top",
}: FallingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldAnimate = trigger === "always" || inView;

  const items = splitBy === "chars" ? text.split("") : text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.22em] ${className}`} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className={charClassName}
          initial={{ opacity: 0, y: from === "top" ? -40 : 40, rotateX: from === "top" ? -60 : 60 }}
          animate={shouldAnimate ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            delay: i * (delay / 1000),
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", transformOrigin: from === "top" ? "top center" : "bottom center" }}
          aria-hidden={item !== " "}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </span>
  );
}
