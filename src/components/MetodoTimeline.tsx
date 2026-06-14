"use client";

import { motion } from "framer-motion";

export default function MetodoTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Center Line */}
      <div className="absolute left-[31px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-neon-blue via-neon-purple to-neon-blue transform md:-translate-x-1/2 opacity-30" />

      {/* Step 1 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-12 md:mb-16"
      >
        <div className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-black border-2 border-neon-blue flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,212,255,0.4)]">
          <span className="text-xs font-black text-neon-blue">01</span>
        </div>
        <div className="pl-12 md:pl-0 md:w-[45%] md:text-right">
          <h3 className="text-xl font-bold text-white mb-2">Diagnóstico Inicial</h3>
          <p className="text-gray-400 text-sm">Entendimento completo do seu modelo de negócio, público-alvo e concorrentes para criar uma estratégia única de conversão.</p>
        </div>
        <div className="hidden md:block md:w-[45%]" />
      </motion.div>

      {/* Step 2 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-12 md:mb-16"
      >
        <div className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-black border-2 border-neon-purple flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(138,43,226,0.4)]">
          <span className="text-xs font-black text-neon-purple">02</span>
        </div>
        <div className="hidden md:block md:w-[45%]" />
        <div className="pl-12 md:pl-0 md:w-[45%]">
          <h3 className="text-xl font-bold text-white mb-2">Planejamento & Estrutura</h3>
          <p className="text-gray-400 text-sm">Desenho do mapa mental do site (Wireframes) e mapeamento da jornada ideal de compra que o visitante seguirá.</p>
        </div>
      </motion.div>

      {/* Step 3 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-12 md:mb-16"
      >
        <div className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-black border-2 border-neon-blue flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,212,255,0.4)]">
          <span className="text-xs font-black text-neon-blue">03</span>
        </div>
        <div className="pl-12 md:pl-0 md:w-[45%] md:text-right">
          <h3 className="text-xl font-bold text-white mb-2">Design UI/UX Premium</h3>
          <p className="text-gray-400 text-sm">Criação da identidade visual do site com foco em design de luxo, cores neon marcantes, tipografia refinada e layout futurista.</p>
        </div>
        <div className="hidden md:block md:w-[45%]" />
      </motion.div>

      {/* Step 4 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-12 md:mb-16"
      >
        <div className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-black border-2 border-neon-purple flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(138,43,226,0.4)]">
          <span className="text-xs font-black text-neon-purple">04</span>
        </div>
        <div className="hidden md:block md:w-[45%]" />
        <div className="pl-12 md:pl-0 md:w-[45%]">
          <h3 className="text-xl font-bold text-white mb-2">Desenvolvimento & SEO</h3>
          <p className="text-gray-400 text-sm">Programação otimizada, códigos ultra limpos, velocidade ajustada e as melhores tags de SEO configuradas nativamente.</p>
        </div>
      </motion.div>

      {/* Step 5 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-12 md:mb-16"
      >
        <div className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-black border-2 border-neon-blue flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,212,255,0.4)]">
          <span className="text-xs font-black text-neon-blue">05</span>
        </div>
        <div className="pl-12 md:pl-0 md:w-[45%] md:text-right">
          <h3 className="text-xl font-bold text-white mb-2">Integrações & Otimização</h3>
          <p className="text-gray-400 text-sm">Inserção de automações de IA, formulários de contato integrados com seu CRM ou e-mail, e otimização geral de segurança.</p>
        </div>
        <div className="hidden md:block md:w-[45%]" />
      </motion.div>

      {/* Step 6 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center"
      >
        <div className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-black border-2 border-neon-purple flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(138,43,226,0.4)]">
          <span className="text-xs font-black text-neon-purple">06</span>
        </div>
        <div className="hidden md:block md:w-[45%]" />
        <div className="pl-12 md:pl-0 md:w-[45%]">
          <h3 className="text-xl font-bold text-white mb-2">Entrega & Sucesso</h3>
          <p className="text-gray-400 text-sm">Lançamento oficial no seu domínio. Entregamos painel de controle e treinamento básico para você gerenciar o site sem depender de programador.</p>
        </div>
      </motion.div>
    </div>
  );
}
