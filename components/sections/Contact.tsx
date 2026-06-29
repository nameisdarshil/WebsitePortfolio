"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Particles from "@/components/reactbits/Particles";
import DecryptedText from "@/components/reactbits/DecryptedText";

export function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <Particles count={45} spread={6} speed={0.025} colors={["#c8864a", "#4a4238", "#9a9080"]} interactive className="opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right,transparent,var(--border-mid),transparent)" }} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <SectionHeading title="Get in touch" align="center" />
        <motion.p className="mb-10 text-lg leading-[1.75]" style={{ color: "var(--muted)", maxWidth: "52ch", margin: "0 auto 2.5rem" }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Actively looking for frontend and full-stack roles. If you have an opening or just want to connect, my inbox is open.
        </motion.p>

        {/* DecryptedText on email address */}
        <motion.a href={`mailto:${siteConfig.email}`}
          className="group inline-flex items-center gap-3 rounded-xl px-7 py-4 font-mono text-base font-medium transition-opacity duration-150"
          style={{ background: "var(--copper)", color: "#0c0b0a" }}
          whileHover={{ opacity: 0.88 }} whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <DecryptedText
            text={siteConfig.email}
            trigger="inview"
            speed={35}
            maxIterations={8}
            sequential
            className="font-mono text-base"
            encryptedClassName="opacity-50"
          />
        </motion.a>

        <motion.div className="mt-5 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
          {[
            { label: "LinkedIn ↗", href: siteConfig.linkedin, ext: true },
            { label: "GitHub ↗", href: siteConfig.github, ext: true },
            { label: "Resume ↓", href: siteConfig.resumeUrl, dl: true },
          ].map(l => (
            <a key={l.label} href={l.href} target={(l as {ext?:boolean}).ext ? "_blank" : undefined}
              rel={(l as {ext?:boolean}).ext ? "noopener noreferrer" : undefined}
              download={(l as {dl?:boolean}).dl}
              className="btn-fill rounded-lg px-4 py-2.5 font-mono text-sm transition-colors duration-150"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
              {l.label}
            </a>
          ))}
        </motion.div>

        <motion.p className="mt-8 font-mono text-xs" style={{ color: "var(--dim)" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} style={{ color: "var(--dim)" }}>{siteConfig.phone}</a>
          <span className="mx-3 opacity-40">·</span>{siteConfig.location}
        </motion.p>
      </div>
    </section>
  );
}
