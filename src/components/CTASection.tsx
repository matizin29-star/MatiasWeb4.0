"use client";

import { memo } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

function CTASection() {
  return (
    <div className="glass-panel-strong rounded-2xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto text-center relative overflow-hidden section-reveal">
      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
        <span className="inline-block text-[10px] font-semibold text-electric uppercase tracking-[0.2em]">
          Comece Agora
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Seu concorrente já está online.
          <br />
          <span className="text-gradient-electric">E você?</span>
        </h2>

        <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
          Enquanto você lê isso, novas empresas estão conquistando clientes online.
          Sua presença digital premium começa com uma conversa.
        </p>

        <div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-electric text-white font-bold text-base rounded-xl transition-all duration-300 hover:bg-[#0052CC] glow-electric"
          >
            <MessageCircle size={20} />
            Solicitar Orçamento Agora
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <p className="text-xs text-white/20 font-light">
          Atendimento personalizado • Resposta em até 2 horas • Orçamento sem compromisso
        </p>
      </div>
    </div>
  );
}

export default memo(CTASection);
