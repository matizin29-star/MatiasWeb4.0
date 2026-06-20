import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Logo from "@/components/Logo";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SITE, WHATSAPP_LINK } from "@/lib/constants";

const Header = dynamic(() => import("@/components/Header"), { loading: () => <div className="h-16 md:h-20" /> });

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  loading: () => (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="h-6 w-48 rounded-full bg-white/5 animate-pulse" />
            <div className="h-16 md:h-20 w-3/4 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl bg-white/5 animate-pulse" />
        </div>
      </div>
    </section>
  ),
});

const MouseLighting = dynamic(() => import("@/components/MouseLighting"));

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

const AIDashboard = dynamic(() => import("@/components/AIDashboard"), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-white/5" />,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  loading: () => null,
});

const AntiGravityParticles = dynamic(() => import("@/components/AntiGravityParticles"), {
  loading: () => null,
});

const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"), {
  loading: () => (
    <div className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white/5 animate-pulse" />
  ),
});

const currentYear = 2026;

export default function Home() {
  return (
    <SmoothScroll>
      <div id="main-content" className="relative min-h-screen bg-ebg overflow-hidden selection:bg-electric/30 selection:text-white">
        <ErrorBoundary><CustomCursor /></ErrorBoundary>
        <ErrorBoundary><MouseLighting /></ErrorBoundary>
        <ErrorBoundary><AntiGravityParticles /></ErrorBoundary>

        <div className="absolute top-0 left-[-20%] w-[60%] h-[60%] rounded-full bg-electric-dim blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-electric-dim blur-[150px] pointer-events-none" />

        <ErrorBoundary><Header /></ErrorBoundary>

        <section id="hero">
          <ErrorBoundary
            fallback={
              <section className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-16 md:pb-24">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-6 md:space-y-8">
                      <div className="h-6 w-48 rounded-full bg-white/5 animate-pulse" />
                      <div className="h-16 md:h-20 w-3/4 rounded-xl bg-white/5 animate-pulse" />
                      <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
                      <div className="h-4 w-2/3 rounded bg-white/5 animate-pulse" />
                    </div>
                    <div className="h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl bg-white/5 animate-pulse" />
                  </div>
                </div>
              </section>
            }
          >
            <HeroSection />
          </ErrorBoundary>
        </section>

        <section id="diferenciais" className="py-24 md:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
              <span className="text-electric font-semibold uppercase tracking-[0.2em] text-xs">Diferenciais</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Por que escolher a <span className="text-gradient-electric">Matias Web</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Tecnologia proprietária, design premiado e inteligência artificial integrada em cada projeto.
              </p>
            </div>
            <ErrorBoundary><DiferenciaisCards /></ErrorBoundary>
          </div>
        </section>

        <ErrorBoundary><AIDashboard /></ErrorBoundary>

        <section id="portfolio" className="py-24 md:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
              <span className="text-electric font-semibold uppercase tracking-[0.2em] text-xs">Demonstração</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                O Que Podemos Criar Para Você
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                De plataformas SaaS a e-commerces premium. Cada projeto é uma experiência digital única.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <ErrorBoundary><ProjectMockup title="SaaS Corporativo" type="Plataforma de IA" gradient="from-electric to-blue-500" /></ErrorBoundary>
              <ErrorBoundary><ProjectMockup title="Landing Page de Vendas" type="Infoprodutos & Serviços" gradient="from-electric to-purple-500" /></ErrorBoundary>
              <ErrorBoundary><ProjectMockup title="E-Commerce Premium" type="Loja Virtual" gradient="from-electric to-cyan-500" /></ErrorBoundary>
              <ErrorBoundary><ProjectMockup title="Clínica Médica / Estética" type="Agendamentos" gradient="from-emerald-400 to-electric" /></ErrorBoundary>
              <ErrorBoundary><ProjectMockup title="Escritórios de Advocacia" type="Institucional" gradient="from-amber-400 to-orange-500" /></ErrorBoundary>
              <ErrorBoundary><ProjectMockup title="Prestadores de Serviços" type="Captação de Clientes" gradient="from-rose-500 to-electric" /></ErrorBoundary>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <ErrorBoundary><StatCounter value="+300%" title="Aumento médio de conversão" /></ErrorBoundary>
              <ErrorBoundary><StatCounter value="+95%" title="Satisfação dos clientes" /></ErrorBoundary>
              <ErrorBoundary><StatCounter value="100%" title="Responsivo & Otimizado" /></ErrorBoundary>
              <ErrorBoundary><StatCounter value="24/7" title="Suporte Integrado" /></ErrorBoundary>
            </div>
          </div>
        </section>

        <section id="metodo" className="py-24 md:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
              <span className="text-electric font-semibold uppercase tracking-[0.2em] text-xs">Processo</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                A Jornada do Seu Site de Sucesso
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Seis etapas comprovadas para transformar sua visão em uma máquina de resultados.
              </p>
            </div>
            <ErrorBoundary><MetodoTimeline /></ErrorBoundary>
          </div>
        </section>

        <section id="contato" className="py-24 md:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <ErrorBoundary><CTASection /></ErrorBoundary>
          </div>
        </section>

        <footer className="relative z-10 border-t border-white/[0.03] bg-ebg/80 backdrop-blur-xl pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-6 space-y-4">
              <a href="#" className="flex items-center gap-2">
                <Logo />
              </a>
              <p className="text-white/30 text-sm max-w-sm leading-relaxed font-light">
                {SITE.description}
              </p>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Links</h4>
              <ul className="space-y-2.5 text-sm text-white/30 font-light">
                <li><a href="#diferenciais" className="hover:text-white/60 transition-colors duration-200">Diferenciais</a></li>
                <li><a href="#portfolio" className="hover:text-white/60 transition-colors duration-200">Portfólio</a></li>
                <li><a href="#metodo" className="hover:text-white/60 transition-colors duration-200">Método</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Contato</h4>
              <p className="text-sm text-white/30 leading-normal font-light">
                WhatsApp:{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-electric font-semibold transition-colors duration-200">
                  (61) 99298-2801
                </a>
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-white/20">
            <p>&copy; {currentYear} {SITE.name}. Todos os direitos reservados.</p>
            <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span>CNPJ: {SITE.cnpj}</span>
              <span className="hidden sm:inline">|</span>
              <span>{SITE.location}</span>
            </p>
          </div>
        </footer>

        <ErrorBoundary><FloatingWhatsApp /></ErrorBoundary>
      </div>
    </SmoothScroll>
  );
}
