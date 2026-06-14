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
  const spring = { stiffness: 50, damping: 22 };
  const avatarX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), spring);
  const avatarY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), spring);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

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
    >
      {/* Single, restrained ambient glow — not two competing orbs */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Subtle dot grid — quieter than lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 lg:grid-cols-[55%_45%] lg:items-center lg:gap-8 lg:px-12 lg:pt-0 lg:pb-0">

        {/* ── Left ── */}
        <div>
          {/* Open to work — small, confident, not over-styled */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "rgba(99,102,241,0.7)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--indigo-bright)" }} />
            </span>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--indigo-bright)" }}>
              Open to work
            </span>
          </motion.div>

          {/* Name — the ONE signature element. Everything else is quiet. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* "Hello I'm" removed — the name is big enough to not need a preamble */}
            <h1
              className="glitch font-display font-extrabold leading-[0.85] tracking-tight"
              data-text="DARSHIL SHAH"
              style={{ color: "var(--fg)", fontSize: "clamp(3.2rem, 6vw, 6rem)" }}
            >
              DARSHIL
              <br />
              <span style={{ color: "var(--indigo-bright)" }}>SHAH</span>
            </h1>
          </motion.div>

          {/* Role — single line, monospaced, grounded */}
          <motion.div
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-mono text-base sm:text-lg" style={{ color: "var(--fg-muted)" }}>
              <span style={{ color: "var(--amber)" }}>&gt; </span>
              {displayed}
              <span className="cursor-blink" style={{ color: "var(--indigo-bright)" }}>_</span>
            </span>
          </motion.div>

          {/* Stats — clean, no borders, let the type do the work */}
          <motion.div
            className="mt-10 grid grid-cols-3 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            {[
              { value: "4×", label: "Dean's Honour Roll" },
              { value: "AWS", label: "Certified" },
              { value: "MERN", label: "Stack" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-extrabold leading-none" style={{ color: "var(--fg)" }}>
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-dim)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA — primary fills, secondary is a ghost. Clear hierarchy. */}
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-medium tracking-wide transition-all duration-200"
              style={{ background: "var(--indigo)", color: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--indigo-bright)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--indigo)"; }}
            >
              Hire Me
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-medium tracking-wide transition-all duration-200"
              style={{ border: "1px solid rgba(99,102,241,0.3)", color: "var(--fg-muted)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.6)";
                (e.currentTarget as HTMLElement).style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
              }}
            >
              Resume ↓
            </a>
          </motion.div>
        </div>

        {/* ── Right: avatar ── clean, no competing decorations */}
        <motion.div
          className="flex items-center justify-center lg:justify-end"
          style={{ minWidth: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            style={{ x: avatarX, y: avatarY, flexShrink: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Single clean glow — behind the avatar only */}
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.35) 0%, transparent 70%)",
                transform: "scale(1.2)",
              }}
              aria-hidden
            />

            <Image
              src="/assets/avatar-3d.png"
              alt="Darshil Shah 3D avatar"
              width={600}
              height={600}
              priority
              className="h-auto w-[min(72vw,300px)] sm:w-[min(60vw,340px)] lg:w-[min(38vw,400px)] xl:w-[min(36vw,440px)]"
              style={{
                mixBlendMode: "screen",
                filter: "drop-shadow(0 0 40px rgba(99,102,241,0.4))",
                display: "block",
              }}
            />

            {/* Only 2 floating cards — location & AWS. No more. */}
            <motion.div
              className="absolute -left-2 bottom-[18%] rounded-xl px-3 py-2 lg:-left-6"
              style={{
                background: "rgba(8,8,16,0.88)",
                border: "1px solid rgba(99,102,241,0.25)",
                backdropFilter: "blur(16px)",
              }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              <p className="font-mono text-[10px] tracking-wider" style={{ color: "var(--fg-dim)" }}>📍 Available</p>
              <p className="font-mono text-xs font-medium" style={{ color: "var(--fg)" }}>Ahmedabad, India</p>
            </motion.div>

            <motion.div
              className="absolute right-0 top-[10%] rounded-xl px-3 py-2"
              style={{
                background: "rgba(8,8,16,0.88)",
                border: "1px solid rgba(245,158,11,0.25)",
                backdropFilter: "blur(16px)",
              }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              <p className="font-mono text-[10px] tracking-wider" style={{ color: "var(--amber)" }}>☁ AWS</p>
              <p className="font-mono text-xs font-medium" style={{ color: "var(--fg)" }}>Certified</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue — minimal */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="h-9 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.5), transparent)" }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--fg-dim)" }}>scroll</span>
      </motion.a>
    </section>
  );
}
