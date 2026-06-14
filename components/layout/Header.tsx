"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? "rgba(8,8,16,0.9)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo — typographic, no icon needed */}
          <a href="#" className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-extrabold" style={{ color: "var(--fg)" }}>
              <span style={{ color: "var(--indigo)" }}>D</span>
              <span style={{ color: "var(--amber)" }}>S</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--fg-dim)" }}>.dev</span>
          </a>

          {/* Desktop nav — clean text links, no borders */}
          <nav className="hidden items-center gap-8 sm:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const active = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-150"
                  style={{ color: active ? "var(--fg)" : "var(--fg-dim)" }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "var(--indigo)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href={siteConfig.resumeUrl}
              download
              className="rounded-md px-4 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-150"
              style={{ border: "1px solid rgba(99,102,241,0.35)", color: "var(--indigo-bright)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Resume ↓
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center sm:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex w-5 flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-px"
                  style={{ background: "var(--fg)" }}
                  animate={
                    menuOpen
                      ? i === 0 ? { rotate: 45, y: 6 }
                      : i === 1 ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.22 }}
                />
              ))}
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center sm:hidden"
            style={{ background: "rgba(8,8,16,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-extrabold"
                  style={{ color: "var(--fg)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--indigo-bright)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={siteConfig.resumeUrl}
                download
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-lg px-8 py-3 font-mono text-sm tracking-widest uppercase"
                style={{ border: "1px solid rgba(99,102,241,0.4)", color: "var(--indigo-bright)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
              >
                Resume ↓
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
