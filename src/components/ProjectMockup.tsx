"use client";

import { memo, useRef, useEffect, useState } from "react";
import { Code, BarChart3, Smartphone, Bot, Globe, ShoppingCart } from "lucide-react";

interface ProjectMockupProps {
  title: string;
  type: string;
  gradient: string;
}

const previewVariants: Record<string, { icon: typeof Code; preview: "chart" | "code" | "app" | "ai" | "site" | "store" }> = {
  "Plataforma de IA": { icon: Bot, preview: "ai" },
  "Infoprodutos & Serviços": { icon: Globe, preview: "site" },
  "Loja Virtual": { icon: ShoppingCart, preview: "store" },
  "Agendamentos": { icon: Smartphone, preview: "app" },
  "Institucional": { icon: Code, preview: "code" },
  "Captação de Clientes": { icon: BarChart3, preview: "chart" },
};

function PreviewChart({ gradient }: { gradient: string }) {
  return (
    <div className="w-full h-full flex flex-col justify-end gap-1 p-2">
      <div className="flex items-end gap-1 h-full">
        {[35, 55, 42, 78, 62, 90, 75].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div className={`w-full rounded-t-sm bg-gradient-to-t ${gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-1 mt-1">
        {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
          <span key={i} className="flex-1 text-[5px] text-white/20 text-center font-mono">{d}</span>
        ))}
      </div>
    </div>
  );
}

function PreviewCode({ gradient }: { gradient: string }) {
  const lines = [
    { text: "import { AI } from '@matias/core'", color: "text-white/30" },
    { text: "const engine = new AI.Engine()", color: "text-white/25" },
    { text: "", color: "text-white/20" },
    { text: "engine.on('ready', () => {", color: "text-white/25" },
    { text: "  const result = await", color: "text-white/20" },
    { text: "    engine.analyze(data)", color: `bg-gradient-to-r ${gradient} bg-clip-text text-transparent` },
    { text: "})", color: "text-white/25" },
  ];
  return (
    <div className="w-full h-full p-2 font-mono text-[6px] leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className={`${line.color} ${line.text ? "h-2.5" : "h-2"}`}>{line.text || "\u00A0"}</div>
      ))}
    </div>
  );
}

function PreviewApp({ gradient }: { gradient: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-8 h-12 rounded-md border border-white/10 overflow-hidden flex flex-col">
        <div className={`h-2 bg-gradient-to-r ${gradient} opacity-40`} />
        <div className="flex-1 p-1 space-y-0.5">
          <div className="h-0.5 rounded-sm bg-white/10" />
          <div className="h-0.5 rounded-sm bg-white/5 w-2/3" />
          <div className="h-2 rounded-sm bg-white/5 mt-1 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-electric/50" />
          </div>
          <div className="h-0.5 rounded-sm bg-white/5 w-1/2" />
        </div>
      </div>
    </div>
  );
}

function PreviewAI({ gradient }: { gradient: string }) {
  return (
    <div className="w-full h-full p-2 space-y-1.5">
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse-subtle" />
        <span className="text-[5px] text-white/30 font-semibold uppercase tracking-wider">IA Processando</span>
      </div>
      <div className="space-y-0.5">
        {[70, 50, 85].map((w, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`h-1 rounded-sm bg-gradient-to-r ${gradient} opacity-30`} style={{ width: `${w}%` }} />
            <span className="text-[4px] text-white/15 font-mono">{(i + 1) * 33}%</span>
          </div>
        ))}
      </div>
      <div className="flex gap-0.5 mt-1">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-sm bg-white/[0.03] flex items-center justify-center">
            <div className="w-1 h-0.5 rounded-full bg-electric/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewSite({ gradient }: { gradient: string }) {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="flex gap-0.5 mb-1">
        <div className="flex-1 h-1 rounded-sm bg-white/[0.03]" />
        <div className={`w-4 h-1 rounded-sm bg-gradient-to-r ${gradient} opacity-30`} />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-0.5">
        <div className="space-y-0.5">
          <div className="h-1 rounded-sm bg-white/[0.03]" />
          <div className="h-2 rounded-sm bg-white/[0.02]" />
          <div className="h-0.5 rounded-sm bg-white/[0.02] w-2/3" />
        </div>
        <div className="space-y-0.5">
          <div className="h-1 rounded-sm bg-white/[0.03]" />
          <div className={`h-3 rounded-sm bg-gradient-to-br ${gradient} opacity-10`} />
        </div>
      </div>
    </div>
  );
}

function PreviewStore({ gradient }: { gradient: string }) {
  return (
    <div className="w-full h-full p-2">
      <div className="grid grid-cols-3 gap-0.5">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className="space-y-0.5">
            <div className={`aspect-square rounded-sm bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
            <div className="h-0.5 rounded-sm bg-white/[0.03]" />
            <div className="h-0.5 rounded-sm bg-white/[0.02] w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function useInViewOnce(ref: React.RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function ProjectMockup({ title, type, gradient }: ProjectMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);
  const meta = previewVariants[type] || { icon: Code, preview: "site" as const };
  const Icon = meta.icon;

  return (
    <div
      ref={ref}
      className={`group relative glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <div className="p-3 md:p-4 space-y-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <div className="ml-auto">
            <Icon size={12} className="text-white/20 group-hover:text-electric transition-colors duration-300" />
          </div>
        </div>

        <div className="rounded-lg bg-white/[0.02] border border-white/[0.03] p-1.5">
          <div className="aspect-[16/10] rounded-md overflow-hidden bg-esurface relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.04]`} />
            {meta.preview === "chart" && <PreviewChart gradient={gradient} />}
            {meta.preview === "code" && <PreviewCode gradient={gradient} />}
            {meta.preview === "app" && <PreviewApp gradient={gradient} />}
            {meta.preview === "ai" && <PreviewAI gradient={gradient} />}
            {meta.preview === "site" && <PreviewSite gradient={gradient} />}
            {meta.preview === "store" && <PreviewStore gradient={gradient} />}
          </div>
        </div>
      </div>

      <div className="px-3 md:px-4 pb-3 md:pb-4">
        <h3 className="text-sm md:text-base font-bold text-white group-hover:text-gradient-electric transition-all duration-300">{title}</h3>
        <p className="text-xs text-white/30 font-light mt-0.5">{type}</p>
      </div>

      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px rgba(0,102,255,0.03)" }}
      />
    </div>
  );
}

export default memo(ProjectMockup);
