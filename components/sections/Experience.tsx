"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAmbient } from "@/components/ui/SectionAmbient";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding section-surface relative overflow-hidden">
      <SectionAmbient variant="mixed" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="Career" title="Experience" />

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute top-0 left-4 h-full w-px origin-top bg-gradient-to-b from-cyan via-cyan/50 to-transparent md:left-1/2 md:-translate-x-px"
          />

          {experience.map((job, i) => (
            <RevealOnScroll key={job.company} delay={i * 0.1}>
              <div
                className={`relative mb-12 flex flex-col gap-8 md:mb-16 md:flex-row ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden w-1/2 md:block" />
                <div className="relative w-full md:w-1/2 md:pl-12">
                  <div className="absolute top-2 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-cyan/50 bg-[#0a0a0f] md:-left-4">
                    <div className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  </div>
                  <div className="glass-card ml-12 rounded-2xl p-6 md:ml-0">
                    <p className="mb-1 text-xs font-medium uppercase tracking-widest text-cyan">
                      {job.period}
                    </p>
                    <h3 className="mb-1 font-display text-xl font-bold text-white">
                      {job.role}
                    </h3>
                    <p className="mb-4 text-sm text-zinc-400">
                      {job.company} · {job.location}
                    </p>
                    <ul className="space-y-2">
                      {job.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-zinc-300"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
