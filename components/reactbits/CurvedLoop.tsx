"use client";
// React Bits — CurvedLoop / ScrollVelocity (reactbits.dev/text-animations/scroll-velocity)
// Horizontally scrolling marquee that speeds up/slows based on scroll velocity
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";

interface CurvedLoopProps {
  text: string;
  className?: string;
  textClassName?: string;
  baseVelocity?: number;    // base px/s (positive = left, negative = right)
  separator?: string;
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function VelocityStrip({ text, baseVelocity, className, textClassName, separator }: {
  text: string; baseVelocity: number; className?: string; textClassName?: string; separator?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const sep = separator ?? " · ";
  const repeated = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className={`inline-flex items-center gap-0 shrink-0 ${textClassName ?? ""}`}>
      {text}<span className="mx-4 opacity-40">{sep}</span>
    </span>
  ));

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[...repeated, ...repeated]}
      </motion.div>
    </div>
  );
}

export default function CurvedLoop({ text, className, textClassName, baseVelocity = -60, separator }: CurvedLoopProps) {
  return (
    <div className={className}>
      <VelocityStrip text={text} baseVelocity={baseVelocity} textClassName={textClassName} separator={separator} />
    </div>
  );
}
