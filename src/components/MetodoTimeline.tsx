"use client";

import { useRef, useEffect, useState, memo } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
}

const steps: Step[] = [
  { number: "01", title: "Diagnóstico Inicial", description: "Entendimento completo do seu modelo de negócio, público-alvo e concorrentes para criar uma estratégia única de conversão.", side: "left" },
  { number: "02", title: "Planejamento & Estrutura", description: "Desenho do mapa mental do site e mapeamento da jornada ideal de compra que o visitante seguirá.", side: "right" },
  { number: "03", title: "Design UI/UX Premium", description: "Criação da identidade visual com foco em design de luxo, tipografia refinada e layout futurista.", side: "left" },
  { number: "04", title: "Desenvolvimento & IA", description: "Programação otimizada com inteligência artificial integrada, códigos ultra limpos e SEO nativo.", side: "right" },
  { number: "05", title: "Integrações & Automação", description: "Automações de IA, formulários inteligentes integrados com CRM e otimização geral de segurança.", side: "left" },
  { number: "06", title: "Entrega & Sucesso", description: "Lançamento oficial com painel de controle e treinamento para você gerenciar sem depender de programador.", side: "right" },
];

function useInViewOnce(ref: React.RefObject<HTMLDivElement | null>, margin = "-100px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

const TimelineStep = memo(function TimelineStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);
  const isLeft = step.side === "left";
  const color = index % 2 === 0 ? "#0066FF" : "#3399FF";

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-12 md:mb-16 last:mb-0 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="absolute left-[31px] md:left-1/2 w-9 h-9 rounded-full bg-esurface border-2 flex items-center justify-center transform -translate-x-1/2 z-10"
        style={{ borderColor: color, boxShadow: `0 0 12px ${color}40` }}
      >
        <span className="text-xs font-black" style={{ color }}>{step.number}</span>
      </div>

      {isLeft ? (
        <>
          <div className="pl-12 md:pl-0 md:w-[45%] md:text-right">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">{step.description}</p>
          </div>
          <div className="hidden md:block md:w-[45%]" />
        </>
      ) : (
        <>
          <div className="hidden md:block md:w-[45%]" />
          <div className="pl-12 md:pl-0 md:w-[45%]">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">{step.description}</p>
          </div>
        </>
      )}
    </div>
  );
});

function MetodoTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div
        className="absolute left-[31px] md:left-1/2 top-4 bottom-4 w-[2px] transform md:-translate-x-1/2 opacity-20"
        style={{ background: "linear-gradient(180deg, #0066FF 0%, #3399FF 50%, #0066FF 100%)" }}
      />
      {steps.map((step, index) => (
        <TimelineStep key={step.number} step={step} index={index} />
      ))}
    </div>
  );
}

export default memo(MetodoTimeline);
