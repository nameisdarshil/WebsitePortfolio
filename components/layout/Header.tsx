"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-white/5 bg-black/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-[clamp(1.25rem,3vw,4rem)] md:h-[72px]">
          {/* Mobile brand */}
          <a
            href="#"
            className="font-display text-sm font-bold tracking-widest text-white lg:hidden"
          >
            DS
          </a>

          {/* Center LinkedIn — desktop only (mockup) */}
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[10px] tracking-[0.2em] text-zinc-500 transition-colors hover:text-[#00d1d1] xl:block"
          >
            linkedin.com/in/darshilshah2001
          </a>

          {/* Nav — compact on mobile, full on sm+ */}
          <nav className="ml-auto hidden items-center gap-6 sm:flex xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-[10px] font-medium tracking-[0.2em] text-zinc-300 transition-colors hover:text-[#00d1d1] sm:text-[11px] sm:tracking-[0.25em]"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center sm:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`block h-px w-full bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-full bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-full bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl font-medium tracking-[0.2em] text-white transition-colors hover:text-[#00d1d1]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.label.toUpperCase()}
                </motion.a>
              ))}
              <motion.a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm tracking-widest text-zinc-500 hover:text-[#00d1d1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                linkedin.com/in/darshilshah2001
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
