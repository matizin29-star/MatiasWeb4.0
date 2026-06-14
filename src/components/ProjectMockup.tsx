"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";

export default function ProjectMockup({ title, type, gradient }: { title: string; type: string; gradient: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="group relative rounded-2xl border border-white/5 bg-black/40 overflow-hidden h-[250px] md:h-[280px] hover:border-neon-blue/35 transition-all duration-500 transform hover:-translate-y-1.5 hover:scale-[1.01]"
      style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.8)" }}
    >
      {/* Glow aura */}
      <div className={`absolute -inset-1 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${gradient} blur-xl transition-opacity duration-500 pointer-events-none`} />
      
      {/* Mock Browser Top bar */}
      <div className="bg-neutral-900/95 border-b border-white/5 px-4 py-3 flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <div className="ml-4 bg-black/40 text-[9px] text-gray-500 px-3 py-0.5 rounded-md w-44 truncate select-none border border-white/5 font-mono">
          matiasweb.dev/{type.toLowerCase().replace(/\s+/g, '-')}
        </div>
      </div>

      {/* Internal Mock Content */}
      <div className="p-6 h-[calc(100%-45px)] flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-transparent to-neutral-950/30">
        
        {/* Abstract Web Blocks */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-3 w-10 bg-white/10 rounded-full" />
            <div className="flex gap-1.5">
              <div className="h-1.5 w-6 bg-white/5 rounded-full" />
              <div className="h-1.5 w-6 bg-white/5 rounded-full" />
            </div>
          </div>
          <div className="h-5 w-4/5 bg-gradient-to-r from-white/10 to-white/5 rounded-md" />
          <div className="h-2.5 w-1/2 bg-white/5 rounded-md" />
          
          <div className="pt-2 flex gap-2">
            <div className="h-5 w-14 bg-neon-blue/10 rounded border border-neon-blue/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            </div>
            <div className="h-5 w-14 bg-white/5 rounded" />
          </div>
        </div>

        {/* Dashboard graphic panel sliding up */}
        <div className="absolute right-[-10px] bottom-[-10px] w-[140px] h-[95px] bg-neutral-950/80 border border-white/10 rounded-tl-xl p-3 flex flex-col justify-between transform group-hover:translate-x-[-8px] group-hover:translate-y-[-8px] transition-transform duration-500">
          <div className="flex items-center gap-1">
            <Code size={10} className="text-neon-purple" />
            <div className="h-1.5 w-8 bg-white/20 rounded" />
          </div>
          <div className="flex items-end gap-1.5 h-8">
            <div className="bg-neon-blue w-2 h-[35%] rounded-t-sm" />
            <div className="bg-neon-purple w-2 h-[65%] rounded-t-sm" />
            <div className="bg-neon-blue w-2 h-[45%] rounded-t-sm" />
            <div className="bg-neon-purple w-2 h-[85%] rounded-t-sm" />
          </div>
        </div>

        {/* Footer Labels */}
        <div className="z-10 mt-auto">
          <span className="text-[9px] font-black text-neon-blue uppercase tracking-widest">{type}</span>
          <h4 className="text-lg font-bold text-white mt-0.5 tracking-tight group-hover:text-neon-blue transition-colors duration-300">{title}</h4>
        </div>
      </div>
    </motion.div>
  );
}
