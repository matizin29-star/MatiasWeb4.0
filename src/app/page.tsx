import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Logo from "@/components/Logo";
import { SITE, WHATSAPP_LINK } from "@/lib/constants";

const DiferenciaisCards = dynamic(() => import("@/components/DiferenciaisCards"), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-white/5" />,
});

const MetodoTimeline = dynamic(() => import("@/components/MetodoTimeline"), {
  loading: () => <div className="h-96 animate-pulse rounded-2xl bg-white/5" />,
});

const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-white/5" />,
});

const ProjectMockup = dynamic(() => import("@/components/ProjectMockup"), {
  loading: () => (
    <div className="h-[250px] md:h-[280px] rounded-2xl bg-white/5 animate-pulse" />
  ),
});

const StatCounter = dynamic(() => import("@/components/StatCounter"), {
  loading: () => (
    <div className="h-32 rounded-2xl bg-white/5 animate-pulse" />
  ),
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"));

const AntiGravityParticles = dynamic(() => import("@/components/AntiGravityParticles"));

const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"), {
  loading: () => (
    <div className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white/5 animate-pulse" />
  ),
});

export default function Home() {
  return (
    <SmoothScroll>
      <div id="main-content" className="relative min-h-screen bg-black overflow-hidden selection:bg-neon-purple/50 selection:text-white">
        
        <CustomCursor />
        <AntiGravityParticles />

        <div className="absolute top-0 left-[-20%] w-[60%] h-[60%] rounded-full bg-neon-purple/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-neon-blue/10 blur-[150px] pointer-events-none" />
        
        <Header />

        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
          <div className="absolute inset-0 grid-bg radial-mask pointer-events-none opacity-40 z-0" />
          <HeroSection />
        </section>

        <section id="diferenciais" className="py-24 relative z-10 bg-black/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
              <span className="text-neon-blue font-black uppercase tracking-widest text-xs md:text-sm">Por que nos escolher?</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Criação de Sites de Alta Performance e Conversão</h2>
              <div className="h-[2px] w-16 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full mt-2" />
            </div>
            <DiferenciaisCards />
          </div>
        </section>

        <section id="portfolio" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-neon-purple font-black uppercase tracking-widest text-xs md:text-sm">Demonstração</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">O Que Podemos Criar Para Você</h2>
              <div className="h-[2px] w-16 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <ProjectMockup title="SaaS Corporativo" type="Plataforma de IA" gradient="from-neon-blue to-cyan-500" />
              <ProjectMockup title="Landing Page de Vendas" type="Infoprodutos & Serviços" gradient="from-neon-purple to-pink-500" />
              <ProjectMockup title="E-Commerce Premium" type="Loja Virtual" gradient="from-neon-blue to-purple-600" />
              <ProjectMockup title="Clínica Médica / Estética" type="Agendamentos" gradient="from-emerald-400 to-neon-blue" />
              <ProjectMockup title="Escritórios de Advocacia" type="Institucional" gradient="from-amber-400 to-orange-500" />
              <ProjectMockup title="Prestadores de Serviços" type="Captação de Clientes" gradient="from-rose-500 to-neon-purple" />
            </div>
          </div>
        </section>

        <section className="py-20 relative z-10 bg-black/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <StatCounter value="+300%" title="Aumento médio de conversão" />
              <StatCounter value="+95%" title="Satisfação dos clientes" />
              <StatCounter value="100%" title="Responsivo & Otimizado" />
              <StatCounter value="24/7" title="Suporte Integrado" />
            </div>
          </div>
        </section>

        <section id="metodo" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
              <span className="text-neon-blue font-black uppercase tracking-widest text-xs md:text-sm">Nosso Processo</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">A Jornada do Seu Site de Sucesso</h2>
              <div className="h-[2px] w-16 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full mt-2" />
            </div>
            <MetodoTimeline />
          </div>
        </section>

        <section id="contato" className="py-24 relative z-10">
          <CTASection />
        </section>

        <footer className="relative z-10 border-t border-white/5 bg-neutral-950/80 backdrop-blur-md pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            <div className="md:col-span-6 space-y-4">
              <a href="#" className="flex items-center gap-2">
                <Logo />
              </a>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-light">
                {SITE.description}
              </p>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neon-purple">Links Úteis</h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-light">
                <li><a href="#diferenciais" className="hover:text-white transition-colors duration-200">Diferenciais</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors duration-200">Portfólio</a></li>
                <li><a href="#metodo" className="hover:text-white transition-colors duration-200">Nosso Método</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neon-blue">Contato</h4>
              <p className="text-sm text-gray-400 leading-normal font-light">
                WhatsApp:{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-blue font-semibold transition-colors duration-200">
                  (61) 99298-2801
                </a>
              </p>
            </div>

          </div>

          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
            <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span>CNPJ: {SITE.cnpj}</span>
              <span className="hidden sm:inline">|</span>
              <span>{SITE.location}</span>
            </p>
          </div>
        </footer>

        <FloatingWhatsApp />

      </div>
    </SmoothScroll>
  );
}
