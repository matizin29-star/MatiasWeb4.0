"use client";

import { memo, useRef, useEffect, useState } from "react";
import { Rocket, Zap, Smartphone, Cpu, Shield, TrendingUp } from "lucide-react";

interface CardData {
  icon: typeof Rocket;
  title: string;
  description: string;
  color: string;
}

const cards: CardData[] = [
  { icon: Rocket, title: "Alta Conversão", description: "Design e copywriting otimizados para transformar visitantes em clientes. Taxas de conversão até 300% maiores.", color: "#0066FF" },
  { icon: Zap, title: "Performance Máxima", description: "Sites ultrarrápidos com tecnologia de ponta. Carregamento em menos de 1 segundo em qualquer dispositivo.", color: "#3399FF" },
  { icon: Smartphone, title: "100% Responsivo", description: "Experiência perfeita em qualquer tela. Do smartphone 4K ao desktop ultrawide.", color: "#00D4FF" },
  { icon: Cpu, title: "Inteligência Artificial", description: "Automações inteligentes, chatbots e análise preditiva integrados nativamente ao seu site.", color: "#0066FF" },
  { icon: Shield, title: "Segurança Premium", description: "Proteção contra ameaças, SSL dedicado e backup automático. Seu patrimônio digital protegido.", color: "#3399FF" },
  { icon: TrendingUp, title: "Foco em Resultados", description: "Relatórios detalhados de desempenho e ROI. Decisões baseadas em dados reais.", color: "#00D4FF" },
];

function useInViewOnce(ref: React.RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

const Card = memo(function Card({ icon: Icon, title, description, color, index }: CardData & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);

  return (
    <div
      ref={ref}
      className={`group relative glass-card rounded-xl p-6 md:p-8 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      <div className="relative z-10 space-y-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-gradient-electric transition-all duration-300">
          {title}
        </h3>
        <p className="text-sm text-white/40 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
});

function DiferenciaisCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, i) => (
        <Card key={card.title} {...card} index={i} />
      ))}
    </div>
  );
}

export default memo(DiferenciaisCards);
