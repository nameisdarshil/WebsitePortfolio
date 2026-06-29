"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = { title:string; subtitle:string; description:string; stack:readonly string[]; image:string; team?:string; featured?:boolean; };

export function ProjectCard({ title, subtitle, description, stack, image, team, featured=false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rX = useSpring(useTransform(y,[-0.5,0.5],[4,-4]),{stiffness:250,damping:25});
  const rY = useSpring(useTransform(x,[-0.5,0.5],[-4,4]),{stiffness:250,damping:25});
  const onMove = (e: React.MouseEvent) => {
    if(!ref.current) return;
    const r=ref.current.getBoundingClientRect();
    x.set((e.clientX-r.left)/r.width-0.5); y.set((e.clientY-r.top)/r.height-0.5);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={()=>{x.set(0);y.set(0);}}
      style={{ rotateX:rX, rotateY:rY, transformPerspective:1000, background:"var(--bg-card)", border:"1px solid var(--border)" }}
      className="spotlight-card overflow-hidden rounded-2xl">
      <div className="grid lg:grid-cols-[45%_55%]">
        <div className="relative overflow-hidden" style={{ minHeight:"300px" }}>
          <Image src={image} alt={title} fill className="object-cover" style={{ objectPosition:"25% 35%" }}
            sizes="(max-width: 1024px) 100vw, 45vw"
            unoptimized={image.endsWith(".gif")} />
          <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,rgba(12,11,10,0) 50%,rgba(12,11,10,0.5) 100%)" }} />
          {featured && (
            <span className="absolute left-4 top-4 rounded-md px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase" style={{ background:"var(--copper)", color:"#0c0b0a" }}>Featured</span>
          )}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {stack.slice(0,3).map(t=>(
              <span key={t} className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ background:"rgba(12,11,10,0.82)", border:"1px solid var(--border-mid)", color:"var(--muted)" }}>{t}</span>
            ))}
            {stack.length>3&&<span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ background:"rgba(12,11,10,0.82)", color:"var(--dim)" }}>+{stack.length-3}</span>}
          </div>
        </div>
        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color:"var(--dim)" }}>{subtitle}</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight" style={{ color:"var(--ink)" }}>{title}</h3>
            {team&&<p className="mt-1.5 font-mono text-xs" style={{ color:"var(--copper)" }}>{team}</p>}
            <p className="mt-4 text-sm leading-relaxed" style={{ color:"var(--muted)", maxWidth:"50ch" }}>{description}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {stack.map(t=>(
              <span key={t} className="rounded-md px-2.5 py-1 font-mono text-[11px]" style={{ background:"rgba(240,235,229,0.03)", border:"1px solid var(--border)", color:"var(--dim)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
