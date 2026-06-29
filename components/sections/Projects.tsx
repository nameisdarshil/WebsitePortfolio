"use client";
import { projects, siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import GlitchText from "@/components/reactbits/GlitchText";

export function Projects() {
  return (
    <section id="work" className="section-pad relative" style={{ background: "var(--bg-2)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right,transparent,var(--border-mid),transparent)" }} />
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Work" />
        <RevealOnScroll>
          <div className="mb-10 flex items-center gap-4 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="h-7 w-px flex-shrink-0" style={{ background: "var(--copper)", opacity: 0.5 }} />
            <div>
              <p className="font-display text-sm font-bold" style={{ color: "var(--ink)" }}>Dean&apos;s Honour Roll — 4 consecutive terms</p>
              <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--dim)" }}>Humber College, Toronto · Jan 2023 – Aug 2024</p>
            </div>
          </div>
        </RevealOnScroll>
        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.08}>
              <ProjectCard {...project} />
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={0.1}>
          <p className="mt-8 text-center font-mono text-xs" style={{ color: "var(--dim)" }}>
            More on{" "}
            {/* GlitchText on GitHub link hover */}
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-150" style={{ color: "var(--muted)" }}>
              <GlitchText text="GitHub ↗" trigger="hover" speed="fast" color1="var(--copper)" color2="var(--muted)" />
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
