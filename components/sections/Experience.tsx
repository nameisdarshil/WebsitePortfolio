"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import FallingText from "@/components/reactbits/FallingText";
gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const line = lineRef.current; if (!line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { gsap.set(line, { scaleY: 1 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: "bottom 55%", scrub: 1 } });
    }); return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-pad relative" style={{ background: "var(--bg-2)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right,transparent,var(--border-mid),transparent)" }} />
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Experience" />
        <div className="relative pl-8 sm:pl-12">
          <div ref={lineRef} className="absolute top-0 left-0 h-full w-px origin-top" style={{ background: "linear-gradient(to bottom,rgba(200,134,74,0.5),transparent 90%)" }} />
          {experience.map((job, i) => (
            <RevealOnScroll key={job.company} delay={i * 0.08}>
              <div className="relative mb-12 last:mb-0">
                <div className="absolute -left-[42px] top-4 h-4 w-4 rounded-full sm:-left-[50px]" style={{ background: "var(--bg)", border: "1.5px solid var(--copper)" }}>
                  <div className="absolute inset-[3px] rounded-full" style={{ background: "var(--copper)" }} />
                </div>
                <div className="spotlight-card rounded-2xl p-6 md:p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--dim)" }}>{job.period}</p>
                      {/* FallingText on job title */}
                      <h3 className="mt-1 font-display text-xl font-extrabold" style={{ color: "var(--ink)" }}>
                        <FallingText text={job.role} splitBy="words" delay={70} from="top" />
                      </h3>
                      <p className="mt-0.5 font-mono text-sm" style={{ color: "var(--muted)" }}>{job.company} · {job.location}</p>
                    </div>
                    <span className="rounded-md px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase" style={{ background: "var(--copper-dim)", color: "var(--copper)", border: "1px solid rgba(200,134,74,0.2)" }}>Intern</span>
                  </div>
                  <ul className="space-y-2.5">
                    {job.highlights.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: "var(--copper)", opacity: 0.65 }} />{item}
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
