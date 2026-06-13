"use client";

import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-0 px-5 py-10 sm:px-8 lg:px-12"
      style={{ borderTop: "1px solid rgba(99,102,241,0.1)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
          © {year} <span style={{ color: "var(--fg-muted)" }}>{siteConfig.name}</span>
          <span className="mx-2 opacity-30">·</span>
          Built with Next.js & Framer Motion
        </p>
        <div className="flex gap-6 font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
          {[
            { label: "GitHub", href: siteConfig.github },
            { label: "LinkedIn", href: siteConfig.linkedin },
            { label: "Resume", href: siteConfig.resumeUrl },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.label !== "Resume" ? "_blank" : undefined}
              rel="noopener noreferrer"
              download={l.label === "Resume"}
              className="transition-colors"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--indigo-bright)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
