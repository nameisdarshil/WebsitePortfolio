"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { gsap.set(line, { scaleY: 1 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: "bottom 50%", scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.3), transparent)" }} />
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 orb orb-amber opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading num="03" label="Career" title="Experience" />

        <div className="relative pl-8 sm:pl-12">
          {/* Vertical timeline line */}
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-full w-px origin-top"
            style={{ background: "linear-gradient(to bottom, var(--indigo) 0%, rgba(99,102,241,0.2) 80%, transparent 100%)" }}
          />

          {experience.map((job, i) => (
            <RevealOnScroll key={job.company} delay={i * 0.1}>
              <div className="relative mb-14 last:mb-0">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[42px] top-4 flex h-5 w-5 items-center justify-center rounded-full sm:-left-[50px]"
                  style={{ background: "var(--bg)", border: "2px solid var(--indigo)", boxShadow: "0 0 16px rgba(99,102,241,0.5)" }}
                >
                  <div className="h-2 w-2 rounded-full" style={{ background: "var(--indigo)" }} />
                </div>

                <div
                  className="card rounded-2xl p-6 md:p-8 transition-all duration-300"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  {/* Header */}
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--indigo)" }}>
                        {job.period}
                      </p>
                      <h3 className="font-display text-2xl font-extrabold" style={{ color: "var(--fg)" }}>
                        {job.role}
                      </h3>
                      <p className="mt-1 font-mono text-sm" style={{ color: "var(--fg-muted)" }}>
                        {job.company}
                        <span style={{ color: "var(--fg-dim)" }}> · {job.location}</span>
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-xs"
                      style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--indigo-bright)" }}
                    >
                      Intern
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                        <span className="mt-1 flex-shrink-0 font-mono text-xs" style={{ color: "var(--amber)" }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
