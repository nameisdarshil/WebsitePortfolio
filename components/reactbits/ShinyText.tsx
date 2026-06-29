"use client";
interface ShinyTextProps { text: string; disabled?: boolean; speed?: number; className?: string; }
export default function ShinyText({ text, disabled=false, speed=5, className="" }: ShinyTextProps) {
  return (
    <span className={className} style={{
      backgroundImage: "linear-gradient(120deg, rgba(200,134,74,0.3) 40%, rgba(240,235,229,0.95) 50%, rgba(200,134,74,0.3) 60%)",
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: disabled ? "none" : `shine-sweep ${speed}s linear infinite`,
    }}>
      {text}
      <style>{`@keyframes shine-sweep{0%{background-position:100%}100%{background-position:-100%}}`}</style>
    </span>
  );
}
