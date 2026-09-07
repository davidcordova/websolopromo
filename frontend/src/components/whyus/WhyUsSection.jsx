import React from 'react';
import { 
  Globe, 
  Target, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { WHY_US_PILLARS } from '../../data/solopromoData';

export default function WhyUsSection({ onOpenQuoteModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Target': return Target;
      case 'TrendingUp': return TrendingUp;
      case 'Award': return Award;
      default: return CheckCircle2;
    }
  };

  return (
    <section id="por-que-nosotros" className="py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden border-t border-slate-100">
      
      {/* Resplandores ambientales decorativos */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#55A2DC]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#2563EB]/6 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#55A2DC] bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#55A2DC]" />
            Diferenciación & Confianza
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            ¿Por qué las marcas líderes trabajan con nosotros?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Cuatro razones estratégicas que nos convierten en el socio operativo que tu marca necesita para dominar el retail peruano.
          </p>
        </div>

        {/* Grid 2x2 de Diferenciación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {WHY_US_PILLARS.map((pillar, idx) => {
            const Icon = getIcon(pillar.icon);
            return (
              <div 
                key={pillar.id || idx}
                className="group p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-[#55A2DC]/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Acento superior de color al hacer hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#55A2DC] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-[#55A2DC] group-hover:bg-gradient-to-br group-hover:from-[#55A2DC] group-hover:to-[#2563EB] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-sky-100 group-hover:text-sky-800 transition-colors">
                      {pillar.stat}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 group-hover:text-[#55A2DC] transition-colors mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    {pillar.badge}
                  </span>
                  <span className="text-slate-400 group-hover:text-[#55A2DC] group-hover:translate-x-1 transition-all font-bold">
                    Ver alcance →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Intermedio 1: Conversión Directa */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1 text-center sm:text-left z-10">
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Soluciones a la Medida de tu Marca
            </div>
            <h4 className="text-lg sm:text-xl font-display font-extrabold text-white">
              ¿Listo para transformar tus puntos de venta y acelerar el Sell-Out?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Diseñamos una propuesta integral adaptada al presupuesto y alcance que requieres.
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs text-slate-900 bg-white hover:bg-sky-50 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
          >
            <span>Solicitar Propuesta Comercial</span>
            <ArrowRight className="w-4 h-4 text-[#55A2DC]" />
          </button>

          {/* Decoración de fondo */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#55A2DC]/20 rounded-full blur-2xl pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
