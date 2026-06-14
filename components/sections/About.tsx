"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certifications, siteConfig, summary } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.2), transparent)" }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading num="01" label="About" title="Who I Am" />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Photo — cleaner frame treatment */}
          <RevealOnScroll>
            <div className="relative mx-auto max-w-sm">
              {/* Single accent line — top-left only, not all four corners */}
              <div
                className="pointer-events-none absolute -top-4 -left-4 h-16 w-16 z-10"
                style={{ borderTop: "2px solid var(--indigo)", borderLeft: "2px solid var(--indigo)", opacity: 0.5 }}
                aria-hidden
              />

              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border)" }}>
                <Image
                  src="/assets/headshot.png"
                  alt="Darshil Shah"
                  width={480}
                  height={520}
                  className="block w-full object-cover object-center"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>

              {/* AWS badge — positioned so it doesn't obscure the face */}
              <motion.div
                className="absolute -right-4 bottom-6 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(8,8,16,0.92)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--amber)" }}>☁ AWS</p>
                <p className="font-mono text-sm font-semibold" style={{ color: "var(--fg)" }}>Cloud Practitioner</p>
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Text — tighter, more readable */}
          <RevealOnScroll delay={0.12}>
            <div className="space-y-8">
              {/* Summary — readable line-height */}
              <p className="text-lg leading-[1.75]" style={{ color: "var(--fg-muted)" }}>{summary}</p>

              {/* Key facts inline */}
              <div
                className="rounded-xl p-4"
                style={{ border: "1px solid var(--border-subtle)", background: "rgba(99,102,241,0.03)" }}
              >
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { k: "Location", v: "Ahmedabad, India" },
                    { k: "Education", v: "Humber College" },
                    { k: "Status", v: "Open to Work" },
                    { k: "Experience", v: "MERN · AWS · SQL" },
                  ].map(({ k, v }) => (
                    <div key={k}>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--fg-dim)" }}>{k}</p>
                      <p className="font-mono text-sm" style={{ color: "var(--fg-muted)" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--indigo)" }}>
                  Certifications
                </p>
                <ul className="space-y-2.5">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--indigo-bright)" }} />
                      <span className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rounded-lg px-4 py-2 font-mono text-xs tracking-wide transition-all duration-150"
                  style={{ border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  {siteConfig.email}
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-2 font-mono text-xs tracking-wide transition-all duration-150"
                  style={{ border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
