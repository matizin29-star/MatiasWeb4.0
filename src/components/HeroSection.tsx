"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { WHATSAPP_LINK } from "@/lib/constants";

const Model3DComponent = dynamic(() => import("@/components/Model3D"), { ssr: false, loading: () => <div className="w-full h-full rounded-2xl bg-white/[0.02] animate-pulse" /> });
const ShaderAnimation = dynamic(() => import("@/components/ShaderAnimation"), { ssr: false });

function Hero3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full rounded-2xl bg-white/[0.02] animate-pulse" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      <ErrorBoundary fallback={null}><ShaderAnimation /></ErrorBoundary>

      <div className="absolute inset-0 grid-bg radial-mask pointer-events-none opacity-30 z-0" />

      <div className="absolute top-1/4 left-[-15%] w-[50%] h-[50%] rounded-full bg-electric-dim blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-15%] w-[50%] h-[50%] rounded-full bg-electric-dim blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full">
              <Sparkles size={14} className="text-electric" />
              <span className="text-[11px] md:text-xs font-semibold text-white/50 uppercase tracking-[0.15em]">
                Tecnologia Proprietária
              </span>
            </div>

            <h1 className="space-y-3">
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.15]">
                Sua Marca no
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.15] text-gradient-electric pb-1.5">
                Próximo Nível Digital
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-lg">
              Sites premium com inteligência artificial integrada, design de alta conversão e tecnologia que transforma visitantes em clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-electric text-white font-bold text-sm md:text-base rounded-xl transition-all duration-300 hover:bg-[#0052CC] glow-electric"
              >
                Solicitar Orçamento
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border border-white/10 text-white/70 hover:text-white font-medium text-sm md:text-base rounded-xl transition-all duration-300 hover:border-white/20"
              >
                Ver Projetos
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-ebg bg-gradient-to-br from-electric to-blue-600 flex items-center justify-center overflow-hidden">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-ebg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-ebg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-ebg bg-gradient-to-br from-electric to-purple-600 flex items-center justify-center overflow-hidden">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-white/40">
                <span className="text-white/70 font-semibold">+50 empresas</span> confiam
              </div>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px]">
            <ErrorBoundary fallback={<Hero3DFallback />}>
              <Model3DComponent />
            </ErrorBoundary>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
