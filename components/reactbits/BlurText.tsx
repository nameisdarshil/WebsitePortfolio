"use client";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface BlurTextProps { text: string; delay?: number; className?: string; animateBy?: "words"|"chars"; direction?: "top"|"bottom"; }

export default function BlurText({ text, delay=50, className="", animateBy="words", direction="bottom" }: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items = animateBy === "chars" ? text.split("") : text.split(" ");

  const variants: Variants = {
    hidden: { filter:"blur(10px)", opacity:0, y: direction==="top" ? -18 : 18 },
    visible: { filter:"blur(0px)", opacity:1, y:0, transition:{ duration:0.55, ease:[0.22,1,0.36,1] } },
  };

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`} aria-label={text}>
      {items.map((item, i) => (
        <motion.span key={i} initial="hidden" animate={inView?"visible":"hidden"} variants={variants}
          transition={{ delay: i*(delay/1000) }} style={{ display:"inline-block" }} aria-hidden>
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </span>
  );
}
