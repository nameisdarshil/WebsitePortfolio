"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAmbient } from "@/components/ui/SectionAmbient";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Contact() {
  const mailto = `mailto:${siteConfig.email}?subject=Hello%20Darshil`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <SectionAmbient variant="mixed" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="Get In Touch" title="Let's Connect" align="center" />

        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-10 text-lg leading-relaxed text-zinc-300">
              I&apos;m open to frontend and full-stack opportunities. Whether you
              have a project in mind or just want to say hi — my inbox is always
              open.
            </p>

            <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <MagneticButton
                href={mailto}
                className="inline-flex items-center gap-3 rounded-full border border-[#00d1d1]/45 bg-[#00d1d1]/12 px-8 py-4 text-base font-medium text-[#00d1d1] transition-all hover:bg-[#00d1d1]/20 hover:shadow-[0_0_40px_rgba(0,209,209,0.25)]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Say Hello
              </MagneticButton>
              <MagneticButton
                href={siteConfig.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-zinc-200 transition-all hover:border-white/25 hover:text-white"
              >
                Download Resume
              </MagneticButton>
            </div>

            <motion.div
              className="flex flex-col items-center gap-3 text-sm text-zinc-400 sm:flex-row sm:justify-center sm:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a href={mailto} className="transition-colors hover:text-[#00d1d1]">
                {siteConfig.email}
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-[#00d1d1]"
              >
                {siteConfig.phone}
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <span>{siteConfig.location}</span>
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
