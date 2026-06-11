"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAmbient } from "@/components/ui/SectionAmbient";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Projects() {
  return (
    <section id="work" className="section-padding relative overflow-hidden">
      <SectionAmbient variant="cyan" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="Portfolio" title="Featured Work" />

        <RevealOnScroll>
          <motion.div
            className="mb-8 flex items-center gap-4 rounded-2xl border border-[#00d1d1]/25 bg-[#00d1d1]/10 p-4 shadow-[0_0_30px_rgba(0,209,209,0.08)]"
            whileHover={{ borderColor: "rgba(0,209,209,0.45)" }}
          >
            <Image
              src="/assets/accent-nft-coding.gif"
              alt=""
              width={48}
              height={48}
              unoptimized
              className="rounded-lg"
              aria-hidden
            />
            <p className="text-sm text-zinc-200">
              <span className="font-medium text-[#00d1d1]">Dean&apos;s Honour Roll</span>{" "}
              — 4 consecutive terms at Humber College
            </p>
          </motion.div>
        </RevealOnScroll>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.1}>
              <ProjectCard {...project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
