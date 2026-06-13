"use client";

import { projects } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Projects() {
  return (
    <section id="work" className="section-pad relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)" }} />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 orb orb-indigo opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading num="04" label="Portfolio" title="Featured Work" />

        {/* Dean's roll callout */}
        <RevealOnScroll>
          <div
            className="mb-10 flex items-center gap-4 rounded-xl p-4"
            style={{
              background: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <span className="text-xl">🏆</span>
            <div>
              <p className="font-display text-sm font-bold" style={{ color: "var(--fg)" }}>
                Dean&apos;s Honour Roll — 4 consecutive terms
              </p>
              <p className="font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
                Humber College, Toronto · Jan 2023 – Aug 2024
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Featured projects — each gets its own full-width row */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.1}>
              <ProjectCard {...project} />
            </RevealOnScroll>
          ))}
        </div>

        {/* No links note */}
        <RevealOnScroll delay={0.2}>
          <p className="mt-8 text-center font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
            More projects on{" "}
            <a
              href="https://github.com/nameisdarshil"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--indigo-bright)" }}
            >
              GitHub ↗
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
