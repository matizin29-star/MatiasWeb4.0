"use client";

import { useEffect, useRef, useState } from "react";

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
  color: string;
}

interface Activity {
  action: string;
  detail: string;
  time: string;
  type: "lead" | "analysis" | "automation" | "insight";
}

const metrics: Metric[] = [
  { label: "Leads Processados", value: 2847, suffix: "", prefix: "", color: "#0066FF" },
  { label: "Taxa de Conversão", value: 12.4, suffix: "%", prefix: "", color: "#00D4FF" },
  { label: "Automações Ativas", value: 146, suffix: "", prefix: "", color: "#3399FF" },
  { label: "Tempo Médio", value: 1.8, suffix: "s", prefix: "", color: "#0066FF" },
];

function generateActivity(index: number): Omit<Activity, "time"> {
  const actions = [
    { action: "Novo lead capturado", detail: "Site institucional — Cliente em potencial", type: "lead" as const },
    { action: "Análise de comportamento", detail: "Taxa de rejeição: 23% ↓ 8%", type: "analysis" as const },
    { action: "Automação disparada", detail: "E-mail de follow-up → leads quentes", type: "automation" as const },
    { action: "Insight gerado", detail: "Horário de pico: 14h-16h (segunda)", type: "insight" as const },
    { action: "Lead qualificado", detail: "Score 92 → prioridade alta", type: "lead" as const },
    { action: "Otimização aplicada", detail: "CTA taxa de clique +15%", type: "automation" as const },
    { action: "Relatório gerado", detail: "Performance semanal disponível", type: "analysis" as const },
    { action: "Novo lead capturado", detail: "Landing page — Consultoria IA", type: "lead" as const },
    { action: "Análise preditiva", detail: "Tendência: +34% leads no próximo mês", type: "insight" as const },
    { action: "Automação concluída", detail: "Segmentação de público atualizada", type: "automation" as const },
  ];
  return actions[index % actions.length];
}

const FIXED_TIMES = ["09:15", "10:42", "11:08", "14:23", "15:47"];

const initialActivities: Activity[] = Array.from({ length: 5 }, (_, i) => ({
  ...generateActivity(i * 2),
  time: FIXED_TIMES[i],
}));

const typeIcon: Record<string, string> = { lead: "\u25CF", analysis: "\u25C6", automation: "\u25B6", insight: "\u2605" };
const typeColor: Record<string, string> = { lead: "#0066FF", analysis: "#00D4FF", automation: "#3399FF", insight: "#FFFFFF" };

function AnimatedMetric({ metric: m }: { metric: Metric }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let rafId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const targetValue = m.value;
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(targetValue * eased);
            if (progress < 1) { rafId = requestAnimationFrame(animate); }
          };
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [m.value]);

  return (
    <div ref={ref} className="space-y-1">
      <div className="text-2xl md:text-3xl font-bold tabular-nums" style={{ color: m.color }}>
        {m.prefix}
        {m.value % 1 === 0 ? Math.floor(displayValue).toLocaleString() : displayValue.toFixed(1)}
        {m.suffix}
      </div>
      <div className="text-xs text-white/40 font-medium tracking-wide uppercase">{m.label}</div>
    </div>
  );
}

export default function AIDashboard() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        ...generateActivity(Math.floor(Math.random() * 10)),
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };
      setActivities((prev) => [newActivity, ...prev.slice(0, 7)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 section-reveal">
          <span className="text-electric font-semibold uppercase tracking-[0.2em] text-xs">Plataforma Proprietária</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Inteligência que <span className="text-gradient-electric">transforma</span> resultados
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Nossa plataforma de IA monitora, analisa e otimiza cada visita em tempo real. Dados que geram decisões inteligentes.
          </p>
        </div>

        <div className="glass-panel-strong rounded-2xl overflow-hidden max-w-5xl mx-auto section-reveal">
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-electric animate-pulse-subtle" />
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">IA Dashboard — Tempo Real</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500/60" />
              <span className="text-[10px] text-white/40 font-mono">Online</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.02]">
            {metrics.map((m) => (
              <div key={m.label} className="p-4 md:p-6 bg-esurface/50">
                <AnimatedMetric metric={m} />
              </div>
            ))}
          </div>

          <div className="p-4 md:p-6 border-t border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Atividade Recente</span>
              <span className="text-[10px] text-electric font-mono">ao vivo</span>
            </div>
            <div className="space-y-2 min-h-[160px]">
              {activities.map((activity, i) => (
                <div
                  key={`${activity.time}-${i}`}
                  className="flex items-start gap-3 py-2 border-b border-white/[0.02] last:border-0 animate-activity-in"
                  style={{ animationDelay: "0ms", animationFillMode: "both" }}
                >
                  <span className="text-[8px] mt-1 font-mono" style={{ color: typeColor[activity.type] }}>
                    {typeIcon[activity.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/80 font-medium truncate">{activity.action}</div>
                    <div className="text-xs text-white/40 truncate">{activity.detail}</div>
                  </div>
                  <span className="text-[10px] text-white/30 font-mono whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
