"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certifications, siteConfig, summary } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAmbient } from "@/components/ui/SectionAmbient";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function About() {
  return (
    <section id="about" className="section-padding section-surface relative overflow-hidden">
      <SectionAmbient variant="cyan" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="About Me" title="Who I Am" />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll>
            <div className="relative mx-auto max-w-sm">
              <div className="glass-card overflow-hidden rounded-2xl p-1 ring-1 ring-[#00d1d1]/20">
                <Image
                  src="/assets/headshot.png"
                  alt="Darshil Shah professional headshot"
                  width={500}
                  height={500}
                  className="about-photo rounded-xl"
                />
              </div>
              <motion.div
                className="absolute -right-3 -bottom-3 rounded-xl border border-[#00d1d1]/40 bg-[#0a0a14]/95 px-4 py-2 shadow-[0_0_24px_rgba(0,209,209,0.15)]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs font-medium text-[#00d1d1]">AWS Certified</p>
                <p className="text-xs text-zinc-300">Cloud Practitioner</p>
              </motion.div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-zinc-200">{summary}</p>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00d1d1]" />
                  {siteConfig.location}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  Humber College, Toronto
                </span>
              </div>
              <div className="space-y-3 pt-4">
                <p className="font-display text-sm font-medium uppercase tracking-widest text-zinc-400">
                  Certifications
                </p>
                <ul className="space-y-2">
                  {certifications.map((cert) => (
                    <li
                      key={cert}
                      className="flex items-start gap-3 text-sm text-zinc-200"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#00d1d1]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
