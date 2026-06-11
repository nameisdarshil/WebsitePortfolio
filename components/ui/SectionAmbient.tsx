type SectionAmbientProps = {
  variant?: "cyan" | "purple" | "mixed";
};

export function SectionAmbient({ variant = "mixed" }: SectionAmbientProps) {
  const cyan =
    variant === "purple"
      ? ""
      : "radial-gradient(ellipse 50% 40% at 15% 30%, rgba(0, 209, 209, 0.14), transparent 60%)";
  const purple =
    variant === "cyan"
      ? ""
      : "radial-gradient(ellipse 45% 35% at 85% 70%, rgba(168, 85, 247, 0.1), transparent 60%)";

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        background: [cyan, purple].filter(Boolean).join(", "),
      }}
    />
  );
}
