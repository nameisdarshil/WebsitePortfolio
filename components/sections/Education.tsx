"use client";

import { motion } from "framer-motion";
import { education } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAmbient } from "@/components/ui/SectionAmbient";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Education() {
  return (
    <section className="section-padding section-surface relative overflow-hidden">
      <SectionAmbient variant="purple" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="Academics" title="Education" />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <RevealOnScroll key={item.institution} delay={i * 0.1}>
              <motion.div
                className="glass-card h-full rounded-2xl p-6 md:p-8"
                whileHover={{
                  y: -4,
                  boxShadow: "0 0 40px rgba(34,211,238,0.1)",
                }}
              >
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-cyan">
                  {item.period}
                </p>
                <h3 className="mb-1 font-display text-xl font-bold text-white">
                  {item.institution}
                </h3>
                <p className="mb-3 text-sm text-zinc-400">{item.location}</p>
                <p className="mb-4 text-zinc-300">{item.degree}</p>
                {item.honors && (
                  <div className="rounded-xl border border-cyan/20 bg-cyan/5 px-4 py-3">
                    <p className="text-xs font-medium text-cyan">Honours</p>
                    <p className="mt-1 text-sm text-zinc-400">{item.honors}</p>
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
