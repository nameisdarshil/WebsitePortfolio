"use client";
import { motion } from "framer-motion";
import { skills } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import ScrambledText from "@/components/reactbits/ScrambledText";

const categoryDesc: Record<string, string> = {
  Languages: "Write in", Frontend: "Build with", Backend: "Power with",
  Databases: "Store in", "Cloud & DevOps": "Ship via", "Auth & Soft Skills": "Secure with",
};

const STRIP_ITEMS = [
  "React.js", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL",
  "Docker", "AWS", "Express.js", "REST APIs", "Auth0", "JWT", "Git", "HTML5", "CSS3", "Chart.js",
];

export function Skills() {
  return (
    <section id="skills" className="section-pad relative" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right,transparent,var(--border-mid),transparent)" }} />
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Skills" />

        {/* CSS marquee strip — pauses on hover, no JS re-renders */}
        <div className="mb-12 overflow-hidden" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex py-3">
            <div className="strip flex shrink-0 gap-8" aria-hidden>
              {[...STRIP_ITEMS, ...STRIP_ITEMS].map((skill, i) => (
                <span key={`a-${i}`} className="inline-flex shrink-0 items-center gap-3 font-mono text-xs whitespace-nowrap" style={{ color: "var(--dim)" }}>
                  <span className="h-px w-3 flex-shrink-0" style={{ background: "var(--copper)", opacity: 0.5 }} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_2fr]" style={{ border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ borderRight: "1px solid var(--border)" }}>
            {skills.map((group, i) => (
              <RevealOnScroll key={group.category} delay={i * 0.04}>
                <div className="flex items-start justify-between px-5 py-4 transition-colors duration-150"
                  style={{ borderBottom: i < skills.length - 1 ? "1px solid var(--border)" : "none", background: "var(--bg-card)" }}>
                  <div>
                    {/* ScrambledText on category names */}
                    <p className="font-mono text-sm font-medium" style={{ color: "var(--ink)" }}>
                      <ScrambledText text={group.category} trigger="inview" speed={30} revealDelay={600} />
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--dim)" }}>{categoryDesc[group.category]}</p>
                  </div>
                  <span className="font-mono text-xs tabular-nums" style={{ color: "var(--copper)", opacity: 0.7 }}>{group.items.length}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <div className="p-6 md:p-8" style={{ background: "var(--bg-2)" }}>
            <div className="flex flex-wrap gap-2">
              {skills.flatMap(g => g.items).map((skill, i) => (
                <motion.span key={skill}
                  className="rounded-lg px-3 py-1.5 font-mono text-xs cursor-default"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--muted)" }}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.012, duration: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ borderColor: "var(--border-mid)", color: "var(--ink)" }}>
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
