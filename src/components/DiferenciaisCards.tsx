"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Rocket, Zap, Smartphone, Cpu, Shield, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Rocket,
    title: "Alta Conversão",
    desc: "Sites estrategicamente desenhados com gatilhos de vendas e jornadas focadas em transformar leads em clientes fiéis.",
    iconBg: "bg-neon-blue/10",
    iconColor: "text-neon-blue",
  },
  {
    icon: Zap,
    title: "Performance Máxima",
    desc: "Velocidade extrema de carregamento. Otimizamos cada linha de código para garantir nota máxima no Google Lighthouse.",
    iconBg: "bg-neon-purple/10",
    iconColor: "text-neon-purple",
  },
  {
    icon: Smartphone,
    title: "Responsivo",
    desc: "Experiência visual impecável e totalmente otimizada para celulares, tablets, notebooks e telas gigantes.",
    iconBg: "bg-neon-blue/10",
    iconColor: "text-neon-blue",
  },
  {
    icon: Cpu,
    title: "Inteligência Artificial",
    desc: "Integramos inteligência artificial, chatbots de atendimento automático e fluxos de automação de vendas diretos.",
    iconBg: "bg-neon-purple/10",
    iconColor: "text-neon-purple",
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    desc: "Certificados de segurança SSL, firewalls de proteção e blindagem contra invasões ou vazamentos de dados.",
    iconBg: "bg-neon-blue/10",
    iconColor: "text-neon-blue",
  },
  {
    icon: TrendingUp,
    title: "Foco em Resultados",
    desc: "Estratégias avançadas de SEO e rastreamento de anúncios (Pixel) configuradas desde o primeiro dia.",
    iconBg: "bg-neon-purple/10",
    iconColor: "text-neon-purple",
  },
];

function Card({ icon: Icon, title, desc, iconBg, iconColor }: typeof cards[number]) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-8 rounded-2xl glass-panel relative overflow-hidden group border border-white/5 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-purple to-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

const MemoCard = memo(Card);

function DiferenciaisCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {cards.map((card) => (
        <MemoCard key={card.title} {...card} />
      ))}
    </div>
  );
}

export default memo(DiferenciaisCards);
