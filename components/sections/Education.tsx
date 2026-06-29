"use client";
import { education } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Education() {
  return (
    <section id="education" className="section-pad relative" style={{ background:"var(--bg-2)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(to right,transparent,var(--border-mid),transparent)" }} />
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Education" />
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item,i)=>(
            <RevealOnScroll key={item.institution} delay={i*0.08}>
              <div className="spotlight-card h-full rounded-2xl p-6 md:p-8" style={{ background:"var(--bg-card)", border:"1px solid var(--border)" }}>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color:"var(--dim)" }}>{item.period}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold" style={{ color:"var(--ink)" }}>{item.institution}</h3>
                <p className="mt-0.5 font-mono text-xs" style={{ color:"var(--dim)" }}>{item.location}</p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{item.degree}</p>
                {item.honors && (
                  <div className="mt-4 pt-4" style={{ borderTop:"1px solid var(--border)" }}>
                    <p className="font-mono text-xs" style={{ color:"var(--copper)" }}>{item.honors}</p>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
