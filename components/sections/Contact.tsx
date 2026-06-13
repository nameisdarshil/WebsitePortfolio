"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Contact() {
  const mailto = `mailto:${siteConfig.email}?subject=Hello%20Darshil%20%E2%80%94%20Opportunity`;

  return (
    <section id="contact" className="section-pad relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.3), transparent)" }} />

      {/* Big ambient orb behind center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading num="06" label="Get In Touch" title="Let's Build Together" align="center" />

        <RevealOnScroll>
          <div className="text-center">
            {/* Large decorative text */}
            <motion.p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              I&apos;m actively looking for frontend and full-stack roles. If you have an opening, a project, or just want to connect — my inbox is always open.
            </motion.p>

            {/* Email CTA — the hero of contact */}
            <motion.a
              href={mailto}
              className="group inline-flex items-center gap-4 rounded-2xl px-8 py-5 font-mono text-lg font-medium tracking-wide transition-all duration-300"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "var(--fg)",
              }}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.7)";
                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.18)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(99,102,241,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <svg className="h-6 w-6 shrink-0" style={{ color: "var(--indigo-bright)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {siteConfig.email}
              <span className="transition-transform group-hover:translate-x-1" style={{ color: "var(--indigo-bright)" }}>→</span>
            </motion.a>

            {/* Secondary links */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-5 py-3 font-mono text-sm transition-all"
                style={{ border: "1px solid var(--border)", color: "var(--fg-muted)", background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
              >
                LinkedIn ↗
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-5 py-3 font-mono text-sm transition-all"
                style={{ border: "1px solid var(--border)", color: "var(--fg-muted)", background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
              >
                GitHub ↗
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                className="rounded-xl px-5 py-3 font-mono text-sm transition-all"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "var(--amber)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.18)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.1)"; }}
              >
                Download Resume ↓
              </a>
            </motion.div>

            {/* Phone */}
            <motion.p
              className="mt-8 font-mono text-sm"
              style={{ color: "var(--fg-dim)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="transition-colors"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}
              >
                {siteConfig.phone}
              </a>
              <span className="mx-3 opacity-30">·</span>
              {siteConfig.location}
            </motion.p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
