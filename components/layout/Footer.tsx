"use client";
import { siteConfig } from "@/content/site";
export function Footer() {
  return (
    <footer className="px-5 py-8 sm:px-8 lg:px-12" style={{ borderTop:"1px solid var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs" style={{ color:"var(--dim)" }}>© {new Date().getFullYear()} <span style={{ color:"var(--muted)" }}>{siteConfig.name}</span> · Next.js & Framer Motion</p>
        <div className="flex gap-5 font-mono text-xs" style={{ color:"var(--dim)" }}>
          {[{l:"GitHub",h:siteConfig.github,e:true},{l:"LinkedIn",h:siteConfig.linkedin,e:true},{l:"Resume",h:siteConfig.resumeUrl,d:true}].map(i=>(
            <a key={i.l} href={i.h} target={i.e?"_blank":undefined} rel={i.e?"noopener noreferrer":undefined} download={i.d}
              className="transition-colors duration-150"
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--muted)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--dim)"}}>
              {i.l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
