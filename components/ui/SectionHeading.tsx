"use client";
import BlurText from "@/components/reactbits/BlurText";

type Props = { num?: string; label?: string; title: string; align?: "left"|"center"; };

export function SectionHeading({ title, align="left" }: Props) {
  return (
    <div className={`mb-14 ${align==="center"?"text-center":""}`}>
      <h2 className={`font-display text-4xl font-extrabold tracking-tight md:text-5xl ${align==="center"?"text-center":""}`}
        style={{ color:"var(--ink)", lineHeight:1.1 }}>
        <BlurText text={title} delay={40} animateBy="words" direction="bottom" />
      </h2>
    </div>
  );
}
