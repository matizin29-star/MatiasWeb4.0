export default function Logo({ glow = false }: { glow?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-0 font-outfit font-bold ${glow ? "glow-electric-text" : ""}`}>
      <span className="text-white text-lg md:text-xl tracking-tight">Matias</span>
      <span className="text-electric text-lg md:text-xl tracking-tight">Web</span>
    </span>
  );
}
