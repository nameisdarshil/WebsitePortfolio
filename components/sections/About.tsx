"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certifications, siteConfig, summary } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      {/* Subtle border top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.3), transparent)" }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading num="01" label="About Me" title="Who I Am" />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Photo */}
          <RevealOnScroll>
            <div className="relative mx-auto max-w-xs">
              {/* Decorative corner lines */}
              <div className="pointer-events-none absolute -top-3 -left-3 h-12 w-12" style={{ borderTop: "2px solid var(--indigo)", borderLeft: "2px solid var(--indigo)", opacity: 0.6 }} aria-hidden />
              <div className="pointer-events-none absolute -right-3 -bottom-3 h-12 w-12" style={{ borderBottom: "2px solid var(--amber)", borderRight: "2px solid var(--amber)", opacity: 0.6 }} aria-hidden />

              <div className="photo-frame overflow-hidden rounded-xl">
                <Image
                  src="/assets/headshot.png"
                  alt="Darshil Shah professional headshot"
                  width={480}
                  height={520}
                  className="block w-full object-cover object-center"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>

              {/* Cert badge */}
              <motion.div
                className="absolute -right-5 -bottom-5 rounded-xl px-4 py-3"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  boxShadow: "0 0 24px rgba(245,158,11,0.12)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--amber)" }}>☁ AWS</p>
                <p className="font-display text-sm font-bold" style={{ color: "var(--fg)" }}>Cloud Practitioner</p>
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Text */}
          <RevealOnScroll delay={0.15}>
            <div className="space-y-7">
              <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>{summary}</p>

              <div className="flex flex-wrap gap-5 font-mono text-sm">
                {[
                  { icon: "📍", text: siteConfig.location },
                  { icon: "🎓", text: "Humber College, Toronto" },
                ].map((item) => (
                  <span key={item.text} className="flex items-center gap-2" style={{ color: "var(--fg-dim)" }}>
                    <span>{item.icon}</span> {item.text}
                  </span>
                ))}
              </div>

              {/* Certifications */}
              <div>
                <p className="mb-4 font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--indigo)" }}>
                  Certifications
                </p>
                <ul className="space-y-3">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 font-mono text-xs" style={{ color: "var(--indigo-bright)" }}>✓</span>
                      <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact quick links */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rounded-md px-4 py-2 font-mono text-xs tracking-wide transition-all"
                  style={{ border: "1px solid var(--border)", color: "var(--fg-muted)", background: "rgba(99,102,241,0.05)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
                >
                  {siteConfig.email}
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-4 py-2 font-mono text-xs tracking-wide transition-all"
                  style={{ border: "1px solid var(--border)", color: "var(--fg-muted)", background: "rgba(99,102,241,0.05)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
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
