import React from 'react';
import { Star, ShieldCheck, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/solopromoData';

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-20 sm:py-24 bg-gradient-to-b from-slate-50/50 via-white to-slate-50 relative overflow-hidden border-t border-slate-100">
      
      {/* Resplandores ambientales */}
      <div className="absolute top-1/4 -right-16 w-80 h-80 bg-[#55A2DC]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-16 w-80 h-80 bg-[#2563EB]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#55A2DC] bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#55A2DC]" />
            Prueba Social & Confianza
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Lo que dicen las marcas líderes
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            La confianza de las marcas globales más exigentes del país es el reflejo de nuestra consistencia operativa y resultados en punto de venta.
          </p>
        </div>

        {/* Grid de 3 Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={t.id || idx}
              className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-[#55A2DC]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Cabecera del Testimonio: Estrellas y Logo */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <img 
                    src={t.logo} 
                    alt={t.company} 
                    className="w-7 h-7 rounded-full object-contain border border-slate-100 shadow-2xs group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Cita */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-sky-200/60 absolute -top-3 -left-2 -z-0 pointer-events-none" />
                  <p className="text-slate-700 text-sm leading-relaxed relative z-10 font-normal italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              {/* Autor, Cargo y Métrica Destacada */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{t.author}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {t.role} · <strong className="text-slate-700">{t.company}</strong>
                    </div>
                  </div>
                </div>

                {/* Píldora de Métrica Verificada */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/70 text-[11px] font-mono font-bold text-[#55A2DC]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.metric}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Respaldo de Alianzas */}
        <div className="text-center">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Más de 25 marcas confían en SoloPromo para liderar sus operaciones de retail
          </span>
        </div>

      </div>
    </section>
  );
}
