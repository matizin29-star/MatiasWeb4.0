"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

function CTASection() {
  return (
    <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 sm:p-12 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        style={{
          boxShadow: "0 0 35px rgba(0, 212, 255, 0.03)"
        }}
      >
        {/* Glowing decorative gradient behind card */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />
        
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight">
          Seu concorrente já está online.
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-black bg-gradient-to-r from-neon-blue via-white to-neon-purple bg-clip-text text-transparent mt-2 mb-6">
          E você?
        </h3>
        
        <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto mb-8 md:mb-10 leading-relaxed font-light">
          NÃO PERCA MAIS VENDAS PARA A CONCORRÊNCIA COM UM SITE LENTO OU AMADOR. DÊ UM SALTO DE AUTORIDADE DIGITAL COM OS SITES PREMIUM DA MATIAS WEB.
        </p>

        <motion.a 
          href={WHATSAPP_LINK}
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-neon-blue via-[#8A2BE2] to-neon-blue bg-[size:200%_auto] text-white px-6 py-4 sm:px-8 sm:py-5 rounded-full text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider shadow-lg hover:shadow-neon-blue/20 transition-all duration-500 hover:bg-right"
          style={{
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.25)"
          }}
        >
          <MessageCircle size={18} />
          SOLICITAR ORÇAMENTO AGORA
        </motion.a>
      </motion.div>
    </div>
  );
}

export default memo(CTASection);
