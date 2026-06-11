"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

type SectionHeadingProps = {
  label: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${align === "center" ? "text-center" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.3em] text-[#00d1d1]">
        {label}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
    </motion.div>
  );
}
