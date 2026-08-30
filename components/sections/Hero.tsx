"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { siteConfig } from "@/content/site";
import Aurora from "@/components/reactbits/Aurora";
import ShinyText from "@/components/reactbits/ShinyText";
import SplitText from "@/components/reactbits/SplitText";
import RotatingText from "@/components/reactbits/RotatingText";

const ROLES = ["Data Analyst", "Python & SQL Analyst", "BI & Dashboarding", "AWS Cloud Practitioner" ];

function MagneticCTA({ href, children, primary, download }: { href: string; children: React.ReactNode; primary?: boolean; download?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  return (
    <motion.a ref={ref} href={href} download={download}
      style={primary
        ? { x: sx, y: sy, background: "var(--copper)", color: "#0c0b0a" }
        : { x: sx, y: sy, border: "1px solid var(--border-mid)", color: "var(--muted)" }}
      onMouseMove={e => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-medium tracking-wide transition-colors duration-150 ${!primary ? "btn-fill" : ""}`}>
      {children}
    </motion.a>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const sp = { stiffness: 40, damping: 22 };
  const avatarX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), sp);
  const avatarY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), sp);

  const onMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const cv: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
  const iv: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section ref={sectionRef} onMouseMove={onMove}
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden">
      {/* Aurora base */}
      <Aurora colorStops={["#c8864a", "#0c0b0a", "#3d1f0a", "#0c0b0a"]} blend={0.45} amplitude={1.1} speed={0.4} className="opacity-55" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 lg:grid-cols-[58%_42%] lg:items-center lg:gap-6 lg:px-12 lg:pt-0 lg:pb-0">
        <motion.div variants={cv} initial="hidden" animate="visible">

          {/* ShinyText status */}
          <motion.div variants={iv} className="mb-6">
            <ShinyText text="● Available for work" speed={4} className="font-mono text-xs tracking-[0.28em] uppercase" />
          </motion.div>

          {/* SplitText name */}
          <div>
            <SplitText text="DARSHIL" className="hero-name" splitType="chars" delay={55} duration={0.65}
              from={{ opacity: 0, y: 55, rotateX: -35 }} to={{ opacity: 1, y: 0, rotateX: 0 }} rootMargin="0px" />
            <SplitText text="SHAH" className="hero-name hero-name-accent" splitType="chars" delay={55} duration={0.65}
              from={{ opacity: 0, y: 55, rotateX: -35 }} to={{ opacity: 1, y: 0, rotateX: 0 }} rootMargin="0px" />
          </div>

          {/* RotatingText roles — replaces typewriter, cleaner */}
          <motion.div variants={iv} className="mt-6 flex items-center gap-2 font-mono text-sm sm:text-base" style={{ color: "var(--muted)" }}>
            <span style={{ color: "var(--copper)", opacity: 0.7 }}>&gt;</span>
            <RotatingText
              texts={ROLES}
              interval={2600}
              transition="slide"
              className="overflow-hidden"
              textClassName="font-mono text-sm sm:text-base"
            />
            <span className="blink" style={{ color: "var(--copper)" }}>_</span>
          </motion.div>

          {/* Stats */}
          <motion.div variants={iv} className="mt-10 grid grid-cols-3 gap-4 sm:flex sm:gap-10">
            {[{ v: "4×", l: "Honour Roll" }, { v: "AWS", l: "Certified" }, { v: "Python", l: "& SQL" }].map(s => (
              <div key={s.l}>
                <p className="font-display text-2xl font-extrabold leading-none" style={{ color: "var(--ink)" }}>{s.v}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--dim)" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>

          {/* Magnetic CTAs */}
          <motion.div variants={iv} className="mt-10 flex flex-wrap gap-3">
            <MagneticCTA href="#contact" primary>Hire Me →</MagneticCTA>
            <MagneticCTA href={siteConfig.resumeUrl} download>Resume ↓</MagneticCTA>
          </motion.div>
        </motion.div>

        {/* Avatar */}
        <motion.div className="flex items-center justify-center lg:justify-end" style={{ minWidth: 0 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div className="relative" style={{ x: avatarX, y: avatarY, flexShrink: 0 }}
            animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden
              style={{ background: "radial-gradient(ellipse 65% 60% at 50% 52%, rgba(200,134,74,0.25) 0%, transparent 70%)", transform: "scale(1.2)" }} />
            <Image src="/assets/avatar-3d.png" alt="Darshil Shah" width={600} height={600} priority
              className="h-auto w-[min(72vw,280px)] sm:w-[min(58vw,320px)] lg:w-[min(36vw,390px)] xl:w-[min(34vw,420px)]"
              style={{ mixBlendMode: "screen", display: "block" }} />
            <motion.div className="absolute -left-2 bottom-[18%] rounded-xl px-3 py-2 lg:-left-6"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-mid)" }}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
              <p className="font-mono text-[10px] tracking-wider uppercase" style={{ color: "var(--dim)" }}>Available</p>
              <p className="font-mono text-xs font-semibold" style={{ color: "var(--muted)" }}>Ahmedabad, India</p>
            </motion.div>
            <motion.div className="absolute right-0 top-[10%] rounded-xl px-3 py-2"
              style={{ background: "var(--bg-card)", border: "1px solid rgba(200,134,74,0.25)" }}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}>
              <p className="font-mono text-[10px] tracking-wider uppercase" style={{ color: "var(--copper)" }}>AWS</p>
              <p className="font-mono text-xs font-semibold" style={{ color: "var(--muted)" }}>Certified</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <motion.div className="h-8 w-px" style={{ background: "linear-gradient(to bottom,var(--dim),transparent)" }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.2, repeat: Infinity }} />
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--dim)" }}>scroll</span>
      </motion.a>
    </section>
  );
}
