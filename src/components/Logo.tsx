export default function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`${className} font-black tracking-tighter text-white`}>
      Matias<span className="text-neon-blue text-glow-blue"> Web</span>
    </span>
  );
}
