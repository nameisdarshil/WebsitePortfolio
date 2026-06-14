"use client";

import { motion } from "framer-motion";

type Props = {
  num: string;
  label: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHeading({ num: _num, label, title, align = "left" }: Props) {
  // Removed numbered markers — they encoded false sequence on non-sequential content.
  // The label (eyebrow) + title is sufficient structure.
  return (
    <motion.div
      className={`mb-16 ${align === "center" ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className={`mb-3 font-mono text-[11px] tracking-[0.35em] uppercase ${align === "center" ? "text-center" : ""}`}
        style={{ color: "var(--indigo)" }}
      >
        {label}
      </p>
      <h2
        className="font-display text-4xl font-extrabold tracking-tight md:text-5xl"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-px w-12 ${align === "center" ? "mx-auto" : ""}`}
        style={{ background: "linear-gradient(to right, var(--indigo), transparent)" }}
      />
    </motion.div>
  );
}
