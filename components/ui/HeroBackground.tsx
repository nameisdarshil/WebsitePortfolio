/** Pure black studio backdrop — rim glow lives on the avatar wrapper */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden />
  );
}
