"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  stack: readonly string[];
  image: string;
  team?: string;
  featured?: boolean;
};

export function ProjectCard({ title, subtitle, description, stack, image, team, featured = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      className="card group overflow-hidden rounded-2xl"
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.01, borderColor: "rgba(99,102,241,0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="grid lg:grid-cols-[45%_55%]">
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "420px" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            unoptimized={image.endsWith(".gif")}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: "25% 35%" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,16,0.85) 100%)" }} />

          {/* Featured badge */}
          {featured && (
            <div
              className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ background: "rgba(99,102,241,0.85)", color: "#fff", backdropFilter: "blur(8px)" }}
            >
              Featured
            </div>
          )}

          {/* Stack pills on image bottom */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md px-2 py-1 font-mono text-[10px]"
                style={{ background: "rgba(8,8,16,0.75)", border: "1px solid rgba(99,102,241,0.3)", color: "var(--indigo-bright)", backdropFilter: "blur(8px)" }}
              >
                {tech}
              </span>
            ))}
            {stack.length > 3 && (
              <span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ background: "rgba(8,8,16,0.75)", color: "var(--fg-dim)" }}>
                +{stack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-6 md:p-7">
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--fg-dim)" }}>
              {subtitle}
            </p>
            <h3 className="mb-3 font-display text-2xl font-extrabold leading-tight" style={{ color: "var(--fg)" }}>
              {title}
            </h3>
            {team && (
              <p className="mb-3 font-mono text-xs" style={{ color: "var(--indigo)" }}>⬡ {team}</p>
            )}
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              {description}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full px-3 py-1 font-mono text-[11px]"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="font-mono text-sm transition-transform group-hover:translate-x-1" style={{ color: "var(--indigo-bright)" }}>
              →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
