import React from 'react';
import { Building, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../data/solopromoData';

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-20 sm:py-24 relative bg-slate-50/50 border-t border-slate-200/80 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Mensaje Institucional Claro y Contundente */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              ¿Quiénes Somos?
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">
              Una década transformando el punto de venta en el Perú.
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Somos un socio estratégico flexible que adapta su staff, logística e infraestructura a la necesidad de cada marca. Asesoramos a las empresas en su presencia en tienda para <strong className="text-slate-950 font-bold">invertir con máxima rentabilidad comercial</strong>.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-800 font-semibold">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                <span>Sede central corporativa con auditorio de capacitación propio</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                <span>Personal homologado y acreditado en los principales retailers del país</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                <span>Supervisión continua y cobertura activa en 18 departamentos</span>
              </div>
            </div>

            {/* Cita Oficial */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-[#2563EB] mb-1.5">
                <Award className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-wider">Trayectoria Comprobada</span>
              </div>
              <blockquote className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug">
                "{COMPANY_INFO.tagline}"
              </blockquote>
            </div>

          </div>

          {/* Columna Derecha: Fotografía Limpia de la Sede */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white group">
              <img
                src="/images/assets/nosotros_edificio.webp"
                alt="Sede Central Corporativa Soporte Promocional S.A.C."
                className="w-full h-[480px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Infraestructura Propia
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900">
                    Sede Central Corporativa & Auditorio
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
                  Operativo 24/7
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
