import React, { useState } from 'react';
import { Building2, Users, MonitorCheck, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { INFRASTRUCTURE_SPACES } from '../../data/solopromoData';

export default function InfrastructureSection() {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);
  const activeSpace = INFRASTRUCTURE_SPACES[activeSpaceIdx];

  const icons = [Users, Building2, MonitorCheck, GraduationCap];

  return (
    <section id="infraestructura" className="py-20 sm:py-24 relative bg-white border-t border-slate-200/80">
      
      {/* Glow ambiental suave */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#55A2DC]/8 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado Oficial del PDF */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
            Nuestras Instalaciones
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Infraestructura y Capacidad Operativa
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Instalaciones propias diseñadas para la gestión estratégica de cuentas (KAM), soporte continuo de Back Office y capacitación certificada de promotores antes de su despliegue en retail.
          </p>
        </div>

        {/* Cita textual de la página 5 del PDF */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 text-center max-w-4xl mx-auto shadow-xs">
          <p className="text-sm sm:text-base font-bold text-slate-800">
            "En nuestro directorio, se reúnen nuestros clientes (KAM) con el Back Office y coordinan las estrategias del negocio."
          </p>
        </div>

        {/* Selector de Espacios e Interfaz Visual con Fotos Reales Ultra-HD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Lista de Espacios con Miniaturas */}
          <div className="lg:col-span-5 space-y-3">
            {INFRASTRUCTURE_SPACES.map((space, idx) => {
              const IconComp = icons[idx] || Building2;
              const isSelected = activeSpaceIdx === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveSpaceIdx(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#55A2DC] shadow-md ring-2 ring-[#55A2DC]/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {/* Miniatura de la foto real */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                    <img src={space.image} alt={space.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-0.5 flex-grow">
                    <h3 className={`text-sm font-bold ${isSelected ? 'text-[#55A2DC]' : 'text-slate-800'}`}>
                      {space.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      {space.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Columna Derecha: Tarjeta con Foto Real en Gran Formato y Detalles */}
          <div className="lg:col-span-7">
            {/* Tarjeta de Exhibición Principal */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden space-y-6 shine-hover transition-all duration-300">
              
              {/* Fotografía Real de la Instalación en Ultra-HD con transición */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100 group">
                <img
                  key={activeSpaceIdx}
                  src={activeSpace.image}
                  alt={activeSpace.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-108 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-200 shadow-xs">
                    {activeSpace.subtitle}
                  </span>
                </div>
              </div>

              {/* Contenido descriptivo */}
              <div className="p-6 sm:p-8 pt-0 space-y-6">
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                    {activeSpace.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeSpace.description}
                  </p>
                </div>

                {/* Características del espacio */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Equipamiento y Ventajas Competitivas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeSpace.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-medium">
                        <CheckCircle className="w-4 h-4 text-[#55A2DC] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conectividad con Back Office */}
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">
                    ¿Deseas agendar una reunión presencial en nuestro directorio?
                  </span>
                  <a
                    href="#contacto"
                    className="text-xs font-bold text-[#55A2DC] hover:text-[#3785be] hover:underline shrink-0 ml-2 flex items-center gap-1"
                  >
                    <span>Agendar Visita</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
