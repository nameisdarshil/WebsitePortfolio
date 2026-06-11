"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site";
import { fadeUp } from "@/lib/animations";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { stiffness: 80, damping: 22 };
  const avatarX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), spring);
  const avatarY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), spring);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-black"
    >
      {/* Ambient studio light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 40%, rgba(0,209,209,0.12) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1920px] items-center px-5 pt-[4.5rem] pb-28 sm:px-8 md:px-10 lg:px-12 lg:pb-16 lg:pt-[5rem] xl:px-16 2xl:px-20">
        {/*
          3-column grid on lg+:
            [ name ]  [ avatar ]  [ title ]
          Stacked on mobile:
            avatar → name → title
        */}
        <div className="grid w-full items-center gap-10 md:gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-12 2xl:gap-16">
          {/* ── Animated 3D avatar (hero-avatar.gif) ── */}
          <motion.div
            className="order-1 flex justify-center lg:order-2"
            style={{ x: avatarX, y: avatarY, perspective: 1000 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="hero-avatar-3d relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[110%] w-[130%] -translate-x-1/2 -translate-y-[48%]"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 48% at 50% 42%, rgba(0,209,209,0.45) 0%, rgba(0,209,209,0.12) 45%, transparent 72%)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute top-[28%] right-[2%] -z-10 h-28 w-28 opacity-50 sm:h-36 sm:w-36"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <Image
                src="/assets/hero-avatar.gif"
                alt="Darshil Shah — 3D avatar"
                width={640}
                height={640}
                priority
                unoptimized
                className="hero-avatar-gif h-[min(42dvh,340px)] w-auto sm:h-[min(48dvh,400px)] md:h-[min(55dvh,460px)] lg:h-[min(68dvh,560px)] xl:h-[min(72dvh,620px)] 2xl:h-[min(75dvh,680px)]"
              />
            </motion.div>
          </motion.div>

          {/* ── Left: name ── */}
          <motion.div
            className="hero-text-panel order-2 lg:order-1 lg:justify-self-start lg:text-left"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <p className="mb-2 font-display text-sm text-[#00d1d1] sm:text-base lg:text-lg">
              Hello! I&apos;m
            </p>
            <h1 className="font-display text-4xl font-bold leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[clamp(2.75rem,3.5vw,5rem)] xl:text-[5rem] 2xl:text-[5.5rem]">
              DARSHIL
              <br />
              SHAH
            </h1>
          </motion.div>

          {/* ── Right: role + resume ── */}
          <motion.div
            className="hero-text-panel order-3 lg:justify-self-end lg:text-right"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            <p className="mb-2 font-display text-sm text-[#00d1d1] sm:text-base lg:text-lg">
              {siteConfig.title}
            </p>
            <div className="relative">
              <p
                className="pointer-events-none absolute top-1/2 right-0 left-0 hidden -translate-y-1/2 font-display text-5xl font-bold tracking-tight text-white/[0.06] select-none lg:block xl:text-6xl"
                aria-hidden
              >
                DEVELOPER
              </p>
              <h2
                className="font-display text-4xl font-bold leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[clamp(2.75rem,3.5vw,5rem)] xl:text-[5rem] 2xl:text-[5.5rem]"
                style={{ textShadow: "0 0 40px rgba(0,209,209,0.25)" }}
              >
                TECH
              </h2>
              <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#00d1d1] to-transparent lg:ml-auto" />
            </div>

            <MagneticButton
              href={siteConfig.resumeUrl}
              download
              className="mt-8 inline-flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-zinc-300 transition-colors hover:text-[#00d1d1] lg:mt-12"
            >
              RESUME
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
