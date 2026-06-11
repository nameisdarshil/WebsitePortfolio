"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { skills } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAmbient } from "@/components/ui/SectionAmbient";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";

export function Skills() {
  return (
    <section className="section-padding relative overflow-hidden">
      <SectionAmbient variant="purple" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="Expertise" title="Skills & Technologies" />

        <div className="relative">
          <motion.div
            className="absolute -top-8 right-0 hidden opacity-80 lg:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Image
              src="/assets/accent-fun-dev.gif"
              alt=""
              width={120}
              height={120}
              unoptimized
              className="rounded-xl"
              aria-hidden
            />
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {skills.map((group, i) => (
              <RevealOnScroll key={group.category} delay={i * 0.05}>
                <motion.div
                  variants={fadeUp}
                  custom={i}
                  className="glass-card group h-full rounded-2xl p-6 transition-all duration-300 hover:border-[#00d1d1]/35 hover:shadow-[0_0_40px_rgba(0,209,209,0.12)]"
                  whileHover={{ y: -4 }}
                >
                  <h3 className="mb-4 font-display text-lg font-semibold text-white">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-zinc-200 transition-colors group-hover:border-[#00d1d1]/25 group-hover:text-white"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(0,209,209,0.2)",
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
