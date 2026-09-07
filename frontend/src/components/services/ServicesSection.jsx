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

        {/* Grid de los 8 servicios en Formato Galería Visual */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((service, sIndex) => {
            const IconComponent = iconMap[service.icon] || ShoppingBag;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="light-card rounded-2xl sm:rounded-3xl flex flex-col justify-between overflow-hidden group shine-hover hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/15 transition-all duration-300 relative border border-slate-200/90 bg-white cursor-pointer"
              >
                <div>
                  {/* Fotografía Real de Gran Formato */}
                  <div className="relative h-36 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={`Servicio de ${service.title} - SoloPromo`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Badge de Categoría */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          color: service.color,
                          border: `1px solid ${service.color}30`
                        }}
                      >
                        {service.badge}
                      </span>
                    </div>

                    {/* Título integrado sobre la base de la imagen */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-sm sm:text-base font-display font-extrabold leading-snug drop-shadow-sm">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Subtítulo sintético de 1 línea */}
                  <div className="p-3.5 sm:p-4">
                    <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Botón Táctil Limpio */}
                <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB] group-hover:text-blue-700">
                  <span>Ver proyectos</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
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
