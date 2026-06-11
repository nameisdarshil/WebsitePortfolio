"use client";

import { motion } from "framer-motion";

type GlowOrbProps = {
  className?: string;
  color?: "cyan" | "magenta";
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-32 w-32",
  md: "h-64 w-64",
  lg: "h-96 w-96",
};

const colors = {
  cyan: "bg-cyan-400/20",
  magenta: "bg-purple-500/15",
};

export function GlowOrb({
  className = "",
  color = "cyan",
  size = "md",
}: GlowOrbProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${sizes[size]} ${colors[color]} ${className}`}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
