"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Icon mapping for skill categories
const categoryIcons: Record<string, string> = {
  Languages: "{ }",
  Frontend: "◫",
  Backend: "⬡",
  Databases: "⬡",
  "Cloud & DevOps": "☁",
  "Auth & Soft Skills": "◈",
};

const categoryColors: Record<string, string> = {
  Languages: "var(--indigo-bright)",
  Frontend: "var(--amber)",
  Backend: "var(--indigo-bright)",
  Databases: "var(--amber)",
  "Cloud & DevOps": "var(--indigo-bright)",
  "Auth & Soft Skills": "var(--amber)",
};

// Scrolling tag strip — all skills flattened
const allSkills = [
  "React.js", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL",
  "Docker", "AWS", "Express.js", "REST APIs", "Auth0", "JWT", "Git", "HTML5", "CSS3", "Chart.js",
];

export function Skills() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)" }} />

      {/* Ambient */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 orb orb-indigo opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading num="02" label="Expertise" title="Skills & Tech" />

        {/* Scrolling tag strip */}
        <div className="mb-14 overflow-hidden" style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="flex py-3">
            <div className="tag-strip flex shrink-0 gap-4">
              {[...allSkills, ...allSkills].map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs whitespace-nowrap"
                  style={{ border: "1px solid var(--border)", color: "var(--fg-muted)", background: "rgba(99,102,241,0.04)" }}
                >
                  <span style={{ color: "var(--indigo)" }}>◆</span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skill cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const icon = categoryIcons[group.category] || "◆";
            const color = categoryColors[group.category] || "var(--indigo)";
            return (
              <RevealOnScroll key={group.category} delay={i * 0.07}>
                <motion.div
                  className="card group h-full rounded-2xl p-6 transition-all duration-300"
                  whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.4)" }}
                  style={{ cursor: "default" }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="font-mono text-xl" style={{ color }}>{icon}</span>
                    <h3 className="font-display text-base font-bold" style={{ color: "var(--fg)" }}>
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        className="rounded-md px-3 py-1.5 font-mono text-xs transition-all"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)", color: "var(--fg-muted)" }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
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
