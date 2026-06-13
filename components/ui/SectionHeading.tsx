"use client";

import { motion } from "framer-motion";

type Props = {
  num: string;
  label: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHeading({ num, label, title, align = "left" }: Props) {
  return (
    <motion.div
      className={`mb-16 ${align === "center" ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span
          className="font-mono text-[11px] font-medium tracking-[0.3em] uppercase"
          style={{ color: "var(--indigo)" }}
        >
          {num}
        </span>
        <div className="h-px w-8 flex-shrink-0" style={{ background: "rgba(99,102,241,0.4)" }} />
        <span
          className="font-mono text-[11px] tracking-[0.25em] uppercase"
          style={{ color: "var(--fg-dim)" }}
        >
          {label}
        </span>
      </div>
      <h2
        className="font-display text-4xl font-extrabold tracking-tight md:text-5xl"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
