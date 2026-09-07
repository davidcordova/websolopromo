import React, { useState } from 'react';
import { 
  ShoppingBag, Users, Radio, PenTool, LayoutGrid, Gift, Sparkles, MonitorPlay, 
  ArrowRight, Check, Eye
} from 'lucide-react';
import { SERVICES } from '../../data/solopromoData';
import ServiceModal from './ServiceModal';

const iconMap = {
  ShoppingBag,
  Users,
  Radio,
  PenTool,
  LayoutGrid,
  Gift,
  Sparkles,
  MonitorPlay
};

export default function ServicesSection({ onSelectServiceToQuote }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="servicios" className="py-20 sm:py-24 relative bg-white border-t border-slate-200/80">
      
      {/* Glow ambiental suave */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#55A2DC]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado oficial extraído del PDF */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
            Estamos Encantados de Ofrecerte
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Nuestros 8 Pilares de Servicio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Soluciones integrales de trade marketing, arquitectura retail, eventos corporativos y gestión en punto de venta con cobertura a nivel nacional.
          </p>
        </div>

        {/* Grid de los 8 servicios en 2 columnas en móvil y 4 en desktop (2x4 / 4x2) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {SERVICES.map((service, sIndex) => {
            const IconComponent = iconMap[service.icon] || ShoppingBag;
            const isStar = sIndex < 3; // Primeros 3 pilares insignia

            return (
              <div
                key={service.id}
                className="light-card rounded-2xl sm:rounded-3xl flex flex-col justify-between overflow-hidden group shine-hover hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 relative border border-slate-200/90"
              >
                <div>
                  {/* Imagen Real de la Campaña en Ultra-HD */}
                  <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={`Servicio de ${service.title} - SoloPromo`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>

                    {/* Badge superior e icono flotante */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between">
                      <span 
                        className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md backdrop-blur-md shadow-xs flex items-center gap-1"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          color: service.color,
                          border: `1px solid ${service.color}40`
                        }}
                      >
                        {isStar && <span className="text-amber-500">★</span>}
                        <span className="truncate max-w-[80px] sm:max-w-none">{service.badge}</span>
                      </span>

                      <div 
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-md shadow-xs"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          color: service.color,
                          border: '1px solid rgba(226, 232, 240, 0.9)'
                        }}
                      >
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Contenido textual del servicio */}
                  <div className="p-3 sm:p-6">
                    <h3 className="text-xs sm:text-lg font-display font-extrabold text-slate-900 group-hover:text-[#55A2DC] transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-0.5 mb-1.5 sm:mb-2.5 line-clamp-1">
                      {service.subtitle}
                    </p>

                    <p className="text-[11px] sm:text-xs text-slate-600 leading-snug line-clamp-2 sm:line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Puntos destacados */}
                    <div className="hidden sm:block mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                      {service.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#55A2DC] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Acciones inferiores con tamaño táctil de 44px */}
                <div className="px-3 sm:px-6 pb-3 sm:pb-6 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-t border-slate-100 mt-2 bg-slate-50/50">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-[11px] sm:text-xs font-bold text-[#55A2DC] hover:text-[#3888c3] flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[38px] sm:min-h-[44px]"
                  >
                    <span>Ver proyectos →</span>
                  </button>

                  <button
                    onClick={() => onSelectServiceToQuote(service.title)}
                    className="text-[10px] sm:text-[11px] font-bold text-slate-700 hover:text-white hover:bg-[#55A2DC] bg-white border border-slate-300 px-3 sm:px-3.5 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer min-h-[36px] sm:min-h-[40px] flex items-center justify-center"
                  >
                    Cotizar
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA Intermedio */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200/90 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              ¿Quieres llevar estas soluciones de visibilidad a tu marca?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Diseñamos una propuesta integral adaptada a los objetivos de tu empresa y presupuesto asignado.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceToQuote('Pilares de Servicio')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#55A2DC] to-[#2563EB] hover:from-[#438bc2] hover:to-[#1d4ed8] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-sky-500/20 hover:scale-[1.02] transition-all shrink-0 cursor-pointer"
          >
            <span>Hablemos de tu proyecto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Modal de Detalle de Servicio */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onQuoteService={onSelectServiceToQuote}
      />

    </section>
  );
}
