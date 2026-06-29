"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);}),{threshold:0.35});
    document.querySelectorAll("section[id]").forEach(s=>obs.observe(s));
    return ()=>obs.disconnect();
  },[]);

  useEffect(()=>{document.body.style.overflow=menuOpen?"hidden":"";return ()=>{document.body.style.overflow="";};},[menuOpen]);

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background:scrolled||menuOpen?"rgba(12,11,10,0.92)":"transparent", backdropFilter:scrolled||menuOpen?"blur(16px)":"none", borderBottom:scrolled?"1px solid var(--border)":"1px solid transparent" }}
        initial={{ y:-64, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#" className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-extrabold" style={{ color:"var(--ink)" }}><span style={{ color:"var(--copper)" }}>D</span>S</span>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color:"var(--dim)" }}>.dev</span>
          </a>
          <nav className="hidden items-center gap-8 sm:flex">
            {navLinks.map(link=>{
              const id=link.href.replace("#",""), isActive=active===id;
              return (
                <a key={link.href} href={link.href}
                  className="relative font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-150"
                  style={{ color:isActive?"var(--ink)":"var(--dim)" }}>
                  {link.label}
                  {isActive&&<motion.span layoutId="nav-line" className="absolute -bottom-1 left-0 right-0 h-px" style={{ background:"var(--copper)" }} transition={{ type:"spring", stiffness:400, damping:35 }} />}
                </a>
              );
            })}
            <a href={siteConfig.resumeUrl} download
              className="btn-fill rounded-md px-4 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-150"
              style={{ border:"1px solid var(--border-mid)", color:"var(--muted)" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--ink)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--muted)"}}>
              Resume ↓
            </a>
          </nav>
          <button type="button" className="flex h-10 w-10 items-center justify-center sm:hidden"
            onClick={()=>setMenuOpen(o=>!o)} aria-label={menuOpen?"Close":"Open menu"}>
            <div className="flex w-5 flex-col gap-[5px]">
              {[0,1,2].map(i=>(
                <motion.span key={i} className="block h-px" style={{ background:"var(--ink)" }}
                  animate={menuOpen?i===0?{rotate:45,y:6}:i===1?{opacity:0}:{rotate:-45,y:-6}:{rotate:0,y:0,opacity:1}}
                  transition={{ duration:0.22 }} />
              ))}
            </div>
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {menuOpen&&(
          <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center body-root sm:hidden"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.18 }}>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link,i)=>(
                <motion.a key={link.href} href={link.href} onClick={()=>setMenuOpen(false)}
                  className="font-display text-4xl font-extrabold" style={{ color:"var(--ink)" }}
                  initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--copper)"}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--ink)"}}>
                  {link.label}
                </motion.a>
              ))}
              <motion.a href={siteConfig.resumeUrl} download onClick={()=>setMenuOpen(false)}
                className="mt-4 rounded-lg px-8 py-3 font-mono text-sm tracking-widest uppercase"
                style={{ border:"1px solid var(--border-mid)", color:"var(--muted)" }}
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}>
                Resume ↓
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
