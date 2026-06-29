"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLoading(false); return; }
    const iv = setInterval(()=>setCount(c=>{if(c>=100){clearInterval(iv);return 100;}return c+Math.floor(Math.random()*12)+4;}),60);
    const tm = setTimeout(()=>setLoading(false),1500);
    return ()=>{clearInterval(iv);clearTimeout(tm);};
  },[]);
  return (
    <AnimatePresence>
      {loading&&(
        <motion.div className="fixed inset-0 z-[200] flex flex-col items-center justify-center body-root"
          exit={{ opacity:0 }} transition={{ duration:0.5 }}>
          <motion.p className="mb-5 font-mono text-xs tracking-[0.4em] uppercase" style={{ color:"var(--dim)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}>Loading</motion.p>
          <motion.div className="font-display text-5xl font-extrabold" style={{ color:"var(--ink)" }}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <span style={{ color:"var(--copper)" }}>D</span>S
          </motion.div>
          <div className="mt-8 w-36 overflow-hidden rounded-full" style={{ height:"1px", background:"var(--border)" }}>
            <motion.div className="h-full rounded-full" style={{ background:"var(--copper)" }}
              initial={{ width:"0%" }} animate={{ width:`${Math.min(count,100)}%` }} />
          </div>
          <p className="mt-2.5 font-mono text-[10px] tabular-nums" style={{ color:"var(--dim)" }}>{Math.min(count,100)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
