"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setLoading(false); return; }

    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) { clearInterval(interval); return 100; }
        return c + Math.floor(Math.random() * 12) + 4;
      });
    }, 60);

    const timer = setTimeout(() => setLoading(false), 1600);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "var(--bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="mb-6 font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--fg-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Initializing
          </motion.p>

          <motion.div
            className="font-display text-5xl font-extrabold tracking-tight glitch"
            data-text="DS"
            style={{ color: "var(--fg)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ color: "var(--indigo)" }}>D</span>
            <span style={{ color: "var(--amber)" }}>S</span>
          </motion.div>

          <div className="mt-8 w-48 overflow-hidden rounded-full" style={{ height: "1px", background: "var(--border-subtle)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--indigo), var(--amber))" }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(count, 100)}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <motion.p
            className="mt-3 font-mono text-xs tabular-nums"
            style={{ color: "var(--fg-dim)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.min(count, 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
