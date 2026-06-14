"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Real tech icons as SVG paths — not arbitrary unicode symbols
const categoryMeta: Record<string, { color: string; desc: string }> = {
  Languages:          { color: "var(--amber)",        desc: "What I write in" },
  Frontend:           { color: "var(--indigo-bright)", desc: "What users see" },
  Backend:            { color: "var(--indigo-bright)", desc: "What powers it" },
  Databases:          { color: "var(--amber)",         desc: "Where data lives" },
  "Cloud & DevOps":   { color: "var(--indigo-bright)", desc: "How it's shipped" },
  "Auth & Soft Skills":{ color: "var(--amber)",        desc: "How it's secured" },
};

const allSkills = [
  "React.js", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL",
  "Docker", "AWS", "Express.js", "REST APIs", "Auth0", "JWT",
  "Git", "HTML5", "CSS3", "Chart.js", "JavaScript", "MariaDB",
];

export function Skills() {
  return (
    <section id="skills" className="section-pad relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.15), transparent)" }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading num="02" label="Expertise" title="Skills & Tech" />

        {/* Scrolling strip — shows breadth at a glance */}
        <div className="mb-14 overflow-hidden rounded-xl" style={{ border: "1px solid var(--border-subtle)" }}>
          <div className="flex py-3 bg-[rgba(99,102,241,0.02)]">
            <div className="tag-strip flex shrink-0 gap-3">
              {[...allSkills, ...allSkills].map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-1.5 font-mono text-xs whitespace-nowrap"
                  style={{ color: "var(--fg-muted)" }}
                >
                  <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--indigo)" }} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skill groups — description replaces meaningless icon */}
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--border-subtle)", borderRadius: "16px", overflow: "hidden" }}>
          {skills.map((group, i) => {
            const meta = categoryMeta[group.category] ?? { color: "var(--indigo)", desc: "" };
            return (
              <RevealOnScroll key={group.category} delay={i * 0.06}>
                <motion.div
                  className="group flex h-full flex-col p-6 transition-colors duration-200"
                  style={{ background: "var(--bg-card)" }}
                  whileHover="hover"
                  variants={{ hover: { background: "rgba(99,102,241,0.05)" } }}
                >
                  {/* Header: category name + what it means */}
                  <div className="mb-5 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-sm font-bold" style={{ color: "var(--fg)" }}>
                        {group.category}
                      </h3>
                      <p className="mt-0.5 font-mono text-[10px] tracking-wider uppercase" style={{ color: meta.color, opacity: 0.8 }}>
                        {meta.desc}
                      </p>
                    </div>
                    {/* Item count — structural information, not decoration */}
                    <span className="font-mono text-xs tabular-nums" style={{ color: "var(--fg-dim)" }}>
                      {group.items.length}
                    </span>
                  </div>

                  {/* Skills as a clean list */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md px-3 py-1.5 font-mono text-xs"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--fg-muted)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
