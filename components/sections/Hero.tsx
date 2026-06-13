"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site";

const ROLES = ["Frontend Developer", "MERN Stack Engineer", "AWS Cloud Practitioner", "UI/UX Craftsman"];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 60, damping: 20 };
  const avatarX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), spring);
  const avatarY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), spring);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIndex];

    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((d) => d.slice(0, d.length - 1)), 28);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((r) => (r + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex h-[100dvh] min-h-[640px] w-full items-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background ambient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="orb orb-indigo" style={{ width: "50vw", height: "50vw", top: "-10%", left: "-10%", opacity: 0.4 }} />
        <div className="orb orb-amber" style={{ width: "35vw", height: "35vw", bottom: "5%", right: "5%", opacity: 0.3 }} />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-20 pb-16 sm:px-8 lg:grid-cols-[55%_45%] lg:gap-8 lg:px-12 lg:pt-0 lg:pb-0">

        {/* ── Left: text ── */}
        <div>
          {/* Availability badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ border: "1px solid rgba(99,102,241,0.25)", background: "rgba(99,102,241,0.08)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "rgba(99,102,241,0.7)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--indigo-bright)" }} />
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--indigo-bright)" }}>
              Open to work
            </span>
          </motion.div>

          {/* Name — glitch display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-1 font-mono text-xs tracking-[0.4em] uppercase" style={{ color: "var(--fg-dim)" }}>
              Hello, I&apos;m
            </p>
            <h1
              className="glitch font-display font-extrabold leading-[0.88] tracking-tight"
              data-text="DARSHIL SHAH"
              style={{
                color: "var(--fg)",
                fontSize: "clamp(3.2rem, 6vw, 6rem)",
              }}
            >
              DARSHIL
              <br />
              <span style={{ color: "var(--indigo-bright)" }}>SHAH</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            className="mt-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span
              className="font-mono text-base sm:text-xl"
              style={{ color: "var(--fg-muted)" }}
            >
              <span style={{ color: "var(--amber)" }}>&gt; </span>
              {displayed}
              <span className="cursor-blink" style={{ color: "var(--indigo-bright)" }}>_</span>
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-10 flex flex-wrap gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            {[
              { value: "4×", label: "Dean's Honour Roll" },
              { value: "AWS", label: "Cloud Certified" },
              { value: "MERN", label: "Stack Specialist" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-extrabold leading-none" style={{ color: "var(--fg)" }}>
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[11px] tracking-wider uppercase" style={{ color: "var(--fg-dim)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-md px-7 py-3 font-mono text-sm font-medium tracking-wide transition-all"
              style={{ background: "var(--indigo)", color: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--indigo-bright)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--indigo)"; }}
            >
              Hire Me
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className="rounded-md px-7 py-3 font-mono text-sm font-medium tracking-wide transition-all"
              style={{
                border: "1px solid rgba(99,102,241,0.35)",
                color: "var(--fg-muted)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.7)";
                (e.currentTarget as HTMLElement).style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.35)";
                (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
              }}
            >
              Resume ↓
            </a>
          </motion.div>
        </div>

        {/* ── Right: avatar ── */}
        <motion.div
          className="flex items-center justify-center lg:justify-end"
          style={{ overflow: "visible", minWidth: 0 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            style={{ x: avatarX, y: avatarY, flexShrink: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glow behind avatar */}
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background: "radial-gradient(ellipse 55% 55% at 50% 45%, rgba(99,102,241,0.4) 0%, transparent 70%)",
                transform: "scale(1.3)",
              }}
              aria-hidden
            />

            <Image
              src="/assets/hero-avatar.gif"
              alt="Darshil Shah 3D avatar"
              width={600}
              height={600}
              priority
              unoptimized
              className="h-auto w-[min(72vw,340px)] sm:w-[min(60vw,380px)] lg:w-[min(38vw,440px)] xl:w-[min(36vw,480px)]"
              style={{ mixBlendMode: "screen", filter: "drop-shadow(0 0 50px rgba(99,102,241,0.5))", display: "block" }}
            />

            {/* Floating card — location */}
            <motion.div
              className="absolute -left-2 bottom-[15%] rounded-xl px-3 py-2 lg:-left-4"
              style={{
                background: "rgba(8,8,16,0.9)",
                border: "1px solid rgba(99,102,241,0.3)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 20px rgba(99,102,241,0.15)",
              }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <p className="font-mono text-[10px] tracking-wider" style={{ color: "var(--fg-dim)" }}>📍 Available</p>
              <p className="font-display text-sm font-semibold" style={{ color: "var(--fg)" }}>Ahmedabad, India</p>
            </motion.div>

            {/* Floating card — cert */}
            <motion.div
              className="absolute right-0 top-[12%] rounded-xl px-3 py-2"
              style={{
                background: "rgba(8,8,16,0.9)",
                border: "1px solid rgba(245,158,11,0.3)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 20px rgba(245,158,11,0.12)",
              }}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              <p className="font-mono text-[10px] tracking-wider" style={{ color: "var(--amber)" }}>☁ AWS</p>
              <p className="font-display text-sm font-semibold" style={{ color: "var(--fg)" }}>Certified</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--fg-dim)" }}>Scroll</span>
        <motion.div
          className="h-8 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)" }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
