"use client";

import { motion } from "framer-motion";
import { education } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Education() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.3), transparent)" }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading num="05" label="Academics" title="Education" />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <RevealOnScroll key={item.institution} delay={i * 0.1}>
              <motion.div
                className="card h-full rounded-2xl p-6 md:p-8 transition-all duration-300"
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.4)" }}
              >
                {/* Header */}
                <div className="mb-5 flex items-start justify-between gap-2">
                  <div>
                    <p className="mb-1 font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--indigo)" }}>
                      {item.period}
                    </p>
                    <h3 className="font-display text-xl font-extrabold" style={{ color: "var(--fg)" }}>
                      {item.institution}
                    </h3>
                    <p className="mt-1 font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
                      {item.location}
                    </p>
                  </div>
                  <span className="text-2xl">{i === 0 ? "🍁" : "🎓"}</span>
                </div>

                <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {item.degree}
                </p>

                {item.honors && (
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
                  >
                    <p className="mb-1 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--indigo-bright)" }}>
                      Honours
                    </p>
                    <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{item.honors}</p>
                  </div>
                )}
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
