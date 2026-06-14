"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { WHATSAPP_LINK } from "@/lib/constants";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
          aria-label="Voltar ao topo"
        >
          <Logo />
        </motion.a>

        <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2 rounded-full border border-white/5 bg-black/20 backdrop-blur-md" aria-label="Navegação principal">
          <a href="#diferenciais" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Diferenciais</a>
          <a href="#portfolio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Portfólio</a>
          <a href="#metodo" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Nosso Método</a>
          <a href="#contato" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Contato</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <motion.a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider overflow-hidden group shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
            aria-label="Solicitar orçamento pelo WhatsApp"
          >
            <MessageCircle size={15} />
            Quero Meu Site
          </motion.a>
        </div>

        <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-neon-blue rounded-lg p-1 z-50" aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileMenuOpen}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 z-40"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <a href="#diferenciais" onClick={toggleMobileMenu} className="text-2xl font-bold text-gray-300 hover:text-white">Diferenciais</a>
            <a href="#portfolio" onClick={toggleMobileMenu} className="text-2xl font-bold text-gray-300 hover:text-white">Portfólio</a>
            <a href="#metodo" onClick={toggleMobileMenu} className="text-2xl font-bold text-gray-300 hover:text-white">Nosso Método</a>
            <a href="#contato" onClick={toggleMobileMenu} className="text-2xl font-bold text-gray-300 hover:text-white">Contato</a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              onClick={toggleMobileMenu}
              className="mt-4 flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(Header);
