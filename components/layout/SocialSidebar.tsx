"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";

const socials = [
  {
    name: "GitHub",
    href: siteConfig.github,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: siteConfig.linkedin,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export function SocialSidebar() {
  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:left-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
      >
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target={s.name !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={s.name}
            className="group relative transition-all duration-200"
            style={{ color: "var(--fg-dim)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--indigo-bright)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}
          >
            {s.icon}
            <span
              className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded px-2 py-1 font-mono text-[10px] tracking-wider opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-7"
              style={{ background: "rgba(99,102,241,0.15)", color: "var(--indigo-bright)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              {s.name}
            </span>
          </a>
        ))}
        <div className="mt-1 h-16 w-px" style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.5), transparent)" }} />
      </motion.aside>

      {/* Mobile floating bar */}
      <motion.div
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-6 rounded-full px-6 py-3 lg:hidden"
        style={{
          background: "rgba(8,8,16,0.85)",
          border: "1px solid rgba(99,102,241,0.2)",
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target={s.name !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={s.name}
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--indigo-bright)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
          >
            {s.icon}
          </a>
        ))}
      </motion.div>
    </>
  );
}
