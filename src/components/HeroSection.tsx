"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import ShaderAnimation from "@/components/ShaderAnimation";
import { WHATSAPP_LINK } from "@/lib/constants";

function HeroSection() {
  return (
    <div className="relative w-full">
      <ShaderAnimation />
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
      
      <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-neon-blue uppercase tracking-widest"
        >
          <span className="flex h-2 w-2 rounded-full bg-neon-blue animate-pulse" aria-hidden="true" />
          Agência Digital Premium
        </motion.div>

        <div className="space-y-2 md:space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white"
          >
            Matias <span className="bg-gradient-to-r from-neon-blue via-white to-neon-purple bg-clip-text text-transparent text-glow-blue">Web</span>
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 max-w-xl mx-auto lg:mx-0"
          >
            Sites Inteligentes Que Transformam Visitantes em Clientes
          </motion.h2>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm md:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
        >
          Criamos sites modernos, rápidos e estrategicamente desenvolvidos para gerar mais vendas, mais autoridade e mais resultados para seu negócio.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a 
            href={WHATSAPP_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-neon-blue to-[#8A2BE2] text-white font-bold uppercase tracking-wider text-xs md:text-sm px-8 py-4 rounded-full w-full sm:w-auto text-center shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 relative overflow-hidden group border border-white/10"
            aria-label="Solicitar orçamento pelo WhatsApp"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            QUERO MEU SITE AGORA
            <ArrowUpRight size={18} />
          </a>

          <a 
            href="#portfolio"
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs md:text-sm px-8 py-4 rounded-full w-full sm:w-auto text-center transition-all duration-300 backdrop-blur-md"
          >
            VER PORTFÓLIO
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="lg:col-span-5 h-[350px] md:h-[450px] lg:h-[500px] w-full relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-neon-blue/10 blur-md animate-pulse pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-neon-purple/5 pointer-events-none" aria-hidden="true" />
        
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>
    </div>
    </div>
  );
}

export default memo(HeroSection);
