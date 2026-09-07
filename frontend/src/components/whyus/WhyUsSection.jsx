import React from 'react';
import { 
  Globe, 
  Target, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Sparkles,
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
    <section id="por-que-nosotros" className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado Escaneable */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            Diferenciación & Respaldo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-950 tracking-tight">
            ¿Por qué eligen trabajar con SoloPromo?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Cuatro fortalezas comprobadas que transforman la inversión en ventas reales.
          </p>
        </div>

        {/* Grid 2x2 Limpio y Directo (Sin saturación de tarjetas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {WHY_US_PILLARS.map((pillar, idx) => {
            const Icon = getIcon(pillar.icon);
            return (
              <div 
                key={pillar.id || idx}
                className="group p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-[#2563EB]/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-xs shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-display font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-black font-mono px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#2563EB] shrink-0">
                      {pillar.stat}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner de Conversión Directa */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1 text-center md:text-left z-10">
            <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              ¿Listo para potenciar la visibilidad de tu marca en retail?
            </h4>
            <p className="text-sm text-slate-300">
              Diseñamos una propuesta integral adaptada al presupuesto y alcance de tu campaña.
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="shrink-0 flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-white hover:bg-sky-50 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
          >
            <span>Solicitar Propuesta</span>
            <ArrowRight className="w-4 h-4 text-[#2563EB]" />
          </button>
        </div>

      </div>
    </section>
  );
}
