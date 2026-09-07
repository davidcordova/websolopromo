import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/solopromoData';
import { useParallax, useMultiLayerMouse } from '../../hooks/useParallax';

export default function Hero({ onOpenQuoteModal }) {
  const HERO_CLIENT_LOGOS = [
    { name: "Canon", logo: "/images/clients/logo_canon.webp" },
    { name: "ASUS", logo: "/images/clients/logo_asus.webp" },
    { name: "TCL", logo: "/images/clients/logo_tcl.webp" },
    { name: "Microsoft", logo: "/images/clients/logo_microsoft.webp" },
    { name: "JBL", logo: "/images/clients/logo_jbl.webp" },
    { name: "Nexxt Solutions", logo: "/images/clients/logo_nexxt.webp" },
    { name: "ViewSonic", logo: "/images/clients/logo_viewsonic.webp" },
    { name: "Klip Xtreme", logo: "/images/clients/logo_klipxtreme.webp" },
    { name: "Belkin", logo: "/images/clients/logo_belkin.webp" }
  ];

  // Parallax multicapa fluido con el movimiento del ratón
  const { containerRef, offset, handleMouseMove, handleMouseLeave } = useMultiLayerMouse(20);

  // Parallax de scroll vertical para elementos de fondo
  const parallaxSlow = useParallax(0.12);

  return (
    <section 
      id="inicio" 
      className="relative pt-24 sm:pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F0F6FC] via-[#F8FAFC] to-white"
    >
      
      {/* 1. TIPOGRAFÍA DE FONDO MONUMENTAL */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 overflow-hidden w-full text-center opacity-60">
        <span 
          className="font-display font-black text-[100px] sm:text-[180px] lg:text-[270px] xl:text-[330px] tracking-wider text-slate-900/[0.03] uppercase whitespace-nowrap block"
          style={{ transform: `translate3d(0, ${parallaxSlow * 0.5}px, 0)` }}
        >
          SOLOPROMO
        </span>
      </div>

      {/* 2. RESPLANDORES AMBIENTALES */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-sky-400/10 via-[#2563EB]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* ENCABEZADO EDITORIAL DE ALTO IMPACTO                      */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:border-[#55A2DC] transition-all">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55A2DC] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#55A2DC]" />
            </span>
            <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-900">
              Líderes en Trade Marketing · BTL & Retail de Vanguardia
            </span>
            <span className="text-[11px] font-sans font-black px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 tracking-normal">
              12 Años de Trayectoria
            </span>
          </div>

          {/* Titular Monumental */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-display font-black tracking-tight text-slate-950 leading-[1.06]">
            Transformamos tus puntos de venta en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55A2DC] via-[#2563EB] to-[#0284C7] relative inline-block">
              experiencias que venden.
              <span className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-gradient-to-r from-[#55A2DC] to-[#2563EB] rounded-full" />
            </span>
          </h1>

          {/* Subtítulo Escueto y Directo (Sin rodeos ni párrafos largos) */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Estrategia, diseño arquitectónico y promotoría especializada para hacer brillar tu marca en el retail peruano con <strong className="font-semibold text-slate-900">cobertura nacional</strong> y <strong className="font-semibold text-[#2563EB]">resultados medibles</strong>.
          </p>

          {/* Callout de Métrica Estrella +438.4% Sell-Out */}
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/90 to-indigo-50 border-2 border-sky-400 shadow-md text-left mx-auto">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#55A2DC] to-[#2563EB] text-white font-black text-2xl shadow-md shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#2563EB] font-display tracking-tight">+438.4%</span>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-slate-900">Sell-Out Promedio Comprobado</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-semibold">Aceleración de rotación de producto en Falabella, Ripley, Hiraoka y Oechsle</p>
            </div>
          </div>

          {/* Botonera de Acción */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onOpenQuoteModal}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#55A2DC] via-[#3b82f6] to-[#2563EB] hover:from-[#4792cb] hover:to-[#1d4ed8] shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Solicitar Propuesta</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200 relative z-10" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <a
              href="#proyectos"
              className="flex items-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <Layers className="w-4 h-4 text-[#55A2DC]" />
              <span>Ver Proyectos</span>
            </a>

            <a
              href={COMPANY_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-4 rounded-xl font-bold text-xs text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 shadow-xs transition-all hover:scale-[1.02]"
              title="Atención inmediata con Director de Cuenta"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Director en línea</span>
            </a>
          </div>

        </div>

        {/* ========================================================= */}
        {/* ESCENARIO PANORÁMICO VISUAL (LIMPIO, SIN WIDGETS DE DASHBOARD) */}
        {/* ========================================================= */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mt-8 sm:mt-10 max-w-5xl mx-auto min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex items-end justify-center pt-6 overflow-visible"
        >

          {/* Podio de luz suave */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-36 bg-gradient-to-t from-sky-400/20 via-[#55A2DC]/10 to-transparent rounded-[100%] blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent pointer-events-none" />

          {/* SUJETO 1: EXHIBIDOR / MÓDULO RETAIL */}
          <div 
            className="absolute bottom-0 left-[2%] sm:left-[8%] lg:left-[14%] z-20 transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${offset.x * 0.45}px, ${offset.y * 0.35}px, 0)`
            }}
          >
            <div className="relative w-[230px] sm:w-[320px] md:w-[390px] lg:w-[430px] flex items-end justify-center">
              <div className="absolute bottom-1 w-4/5 h-8 bg-black/40 rounded-full blur-xl -z-10" />
              <img 
                src="/images/assets/hero_display_cutout.webp" 
                alt="Módulo Retail High-Tech SoloPromo para Canon y ASUS ROG" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.28)] filter contrast-[1.03] select-none pointer-events-none"
              />
            </div>
          </div>

          {/* SUJETO 2: EMBAJADORA DE MARCA */}
          <div 
            className="absolute bottom-0 right-[2%] sm:right-[8%] lg:right-[14%] z-25 transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${offset.x * 0.8}px, ${offset.y * 0.6}px, 0)`
            }}
          >
            <div className="relative w-[210px] sm:w-[290px] md:w-[350px] lg:w-[385px] flex items-end justify-center">
              <div className="absolute bottom-1 w-3/4 h-8 bg-black/45 rounded-full blur-xl -z-10" />
              <img 
                src="/images/assets/hero_ambassador_cutout.webp" 
                alt="Embajadora de Marca SoloPromo con Staff Homologado" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)] filter contrast-[1.02] select-none pointer-events-none"
              />
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* LOGOS DE MARCAS EN GRAN FORMATO                           */}
        {/* ========================================================= */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="mb-10 text-center">
            <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-slate-600 mb-5">
              Socios estratégicos de las corporaciones líderes en el Perú
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {HERO_CLIENT_LOGOS.map((client, cIdx) => (
                <div 
                  key={cIdx} 
                  className="flex items-center gap-3.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm hover:border-[#55A2DC] hover:shadow-xl transition-all hover:scale-105 duration-200 group cursor-default"
                  title={client.name}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl p-1 bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <img 
                      src={client.logo} 
                      alt={`Logotipo oficial de ${client.name}`} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <span className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#2563EB] transition-colors">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* FILA DE MÉTRICAS ABIERTA Y ELEGANTE (SIN ASPECTO DE CAJAS)*/}
          {/* ========================================================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-4 border-t border-slate-100 text-center">
            
            {/* Métrica 1 (Estrella) */}
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#1D4ED8]">
                +438.4%
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900">
                Incremento de Sell-Out
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Aceleración en canal retail
              </div>
            </div>

            {/* Métrica 2 */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900">
                85+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                Puntos de Venta Activos
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Cadenas departamentales y electro
              </div>
            </div>

            {/* Métrica 3 */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900">
                18
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                Departamentos
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Cobertura en todo el país
              </div>
            </div>

            {/* Métrica 4 */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900">
                +12
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                Años de Liderazgo
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Socios de marcas globales
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
