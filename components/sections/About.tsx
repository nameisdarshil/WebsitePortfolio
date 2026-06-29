"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { certifications, siteConfig, summary } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Lightfall from "@/components/reactbits/Lightfall";

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden" style={{ background:"var(--bg-2)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(to right,transparent,var(--border-mid),transparent)" }} />
      <Lightfall
        colors={["#c8864a", "#3d1f0a", "#1a0e08"]}
        backgroundColor="#0c0b0a"
        speed={0.3}
        streakCount={2}
        streakWidth={0.6}
        streakLength={1.0}
        glow={0.4}
        density={0.4}
        twinkle={0.4}
        zoom={2.8}
        backgroundGlow={0.1}
        opacity={0.18}
        mouseInteraction={false}
        mouseStrength={0}
        mouseRadius={0}
        mixBlendMode="screen"
        className="pointer-events-none"
      />
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="About" />
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <RevealOnScroll>
            <div className="relative mx-auto max-w-sm">
              <div className="pointer-events-none absolute -top-3 -left-3 h-10 w-10" style={{ borderTop:"1.5px solid var(--copper)", borderLeft:"1.5px solid var(--copper)", opacity:0.45 }} aria-hidden />
              <div className="overflow-hidden rounded-2xl" style={{ border:"1px solid var(--border)" }}>
                <Image src="/assets/headshot.png" alt="Darshil Shah" width={480} height={520}
                  className="block w-full object-cover object-center" style={{ aspectRatio:"4/5" }} />
              </div>
              <motion.div className="absolute -right-3 bottom-6 rounded-xl px-4 py-2.5"
                style={{ background:"var(--bg-card)", border:"1px solid rgba(200,134,74,0.28)" }}
                initial={{ opacity:0, y:8 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.4 }}>
                <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color:"var(--copper)" }}>AWS</p>
                <p className="font-mono text-sm font-semibold" style={{ color:"var(--muted)" }}>Cloud Practitioner</p>
              </motion.div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="space-y-7">
              <p className="text-lg leading-[1.78]" style={{ color:"var(--muted)", maxWidth:"58ch" }}>{summary}</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {[{k:"Location",v:"Ahmedabad, India"},{k:"Education",v:"Humber College"},{k:"Status",v:"Open to work"},{k:"Stack",v:"MERN · AWS · SQL"}].map(({k,v})=>(
                  <div key={k}>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color:"var(--dim)" }}>{k}</p>
                    <p className="mt-0.5 font-mono text-xs" style={{ color:"var(--muted)" }}>{v}</p>
                  </div>
                ))}
              </div>
              <div className="h-px" style={{ background:"var(--border)" }} />
              <ul className="space-y-2">
                {certifications.map(c=>(
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full" style={{ background:"var(--copper)" }} />
                    <span className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {[{label:siteConfig.email,href:`mailto:${siteConfig.email}`},{label:"LinkedIn ↗",href:siteConfig.linkedin,ext:true}].map(l=>(
                  <a key={l.label} href={l.href} target={(l as {ext?:boolean}).ext?"_blank":undefined}
                    rel={(l as {ext?:boolean}).ext?"noopener noreferrer":undefined}
                    className="btn-fill rounded-lg px-4 py-2 font-mono text-xs tracking-wide transition-colors duration-150"
                    style={{ border:"1px solid var(--border)", color:"var(--muted)" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--ink)"}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--muted)"}}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
