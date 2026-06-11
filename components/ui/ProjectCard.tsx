"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type ProjectCardProps = {
  title: string;
  subtitle: string;
  description: string;
  stack: readonly string[];
  image: string;
  team?: string;
  featured?: boolean;
};

export function ProjectCard({
  title,
  subtitle,
  description,
  stack,
  image,
  team,
  featured = false,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isGif = image.endsWith(".gif");

  return (
    <motion.div
      ref={ref}
      className={`glass-card group overflow-hidden rounded-2xl ${
        featured ? "lg:col-span-2" : ""
      }`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`grid ${featured ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        <div className="relative aspect-video overflow-hidden lg:aspect-auto">
          <Image
            src={image}
            alt={title}
            fill
            unoptimized={isGif}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          {featured && (
            <span className="mb-3 inline-flex w-fit rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
              Featured Project
            </span>
          )}
          <p className="mb-1 text-xs uppercase tracking-widest text-zinc-500">
            {subtitle}
          </p>
          <h3 className="mb-3 font-display text-2xl font-bold text-white">
            {title}
          </h3>
          {team && (
            <p className="mb-3 text-sm text-cyan/80">Team: {team}</p>
          )}
          <p className="mb-5 text-sm leading-relaxed text-zinc-400">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
