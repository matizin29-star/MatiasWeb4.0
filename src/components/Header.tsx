"use client";

import { useState, useCallback, memo } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { WHATSAPP_LINK } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#portfolio", label: "Projetos" },
  { href: "#metodo", label: "Método" },
  { href: "#contato", label: "Contato" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((p) => !p), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-ebg/70 backdrop-blur-2xl border-b border-white/[0.03]" />
      <nav className="relative max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="relative z-10">
          <Logo glow />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/50 hover:text-white/90 transition-all duration-300 font-medium tracking-wide"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-5 py-2 text-sm font-semibold text-white hover:text-electric transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden relative z-10 p-2 text-white/60 hover:text-white transition-colors"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ebg/90 md:hidden transition-opacity duration-300 ease-out ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMobileMenu}
            className="text-2xl font-bold text-white/70 hover:text-white transition-colors"
          >
            {item.label}
          </a>
        ))}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
          className="glass-panel-strong px-8 py-3 text-base font-bold text-white"
        >
          Solicitar Orçamento
        </a>
      </div>
    </header>
  );
}

export default memo(Header);
