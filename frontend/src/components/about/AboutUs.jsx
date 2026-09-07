import React from 'react';
import { Target, Users, Coins, Lightbulb, Building, Award, CheckCircle, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../data/solopromoData';
import { useParallax } from '../../hooks/useParallax';

export default function AboutUs() {
  // Parallax suave en el edificio corporativo
  const parallaxOffset = useParallax(0.08);

  return (
    <section id="nosotros" className="py-20 sm:py-24 relative bg-white border-t border-slate-200/80 overflow-hidden">
      
      {/* Glows y elementos decorativos parallax en el fondo */}
      <div 
        className="absolute top-1/3 -right-24 w-96 h-96 bg-[#55A2DC]/8 rounded-full blur-[130px] pointer-events-none parallax-element"
        style={{ transform: `translate3d(0, ${parallaxOffset * 1.2}px, 0)` }}
      />
      <div 
        className="absolute bottom-10 -left-20 w-80 h-80 bg-[#B56635]/6 rounded-full blur-[120px] pointer-events-none parallax-element"
        style={{ transform: `translate3d(0, ${-parallaxOffset * 0.8}px, 0)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#55A2DC]" />
            ¿Quiénes Somos?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Socios Estratégicos que se Adaptan a tus Objetivos
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Más de una década brindando soluciones flexibles de marketing operacional, trade marketing e infraestructura en todo el Perú.
          </p>
        </div>

        {/* Contenido en 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Mensaje Central */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 relative overflow-hidden space-y-4 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5 text-[#55A2DC]" />
                <span>Flexibilidad y Escalabilidad Absoluta</span>
              </h3>
              
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Somos una empresa flexible que se adapta según el tipo de proyecto a realizar. Por ese motivo, nuestro staff puede <strong className="text-slate-900">ampliarse o reducirse a la medida</strong> y necesidad de cada cliente.
              </p>
              
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Cubrimos todos los aspectos en el campo de acción: asesoramos a las empresas en su imagen corporativa y las orientamos para <strong className="text-[#55A2DC]">invertir adecuadamente su capital</strong>, obteniendo el máximo resultado comercial.
              </p>
            </div>

            {/* Tarjetas de Presupuesto y Asistencia a Agencias con animación hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#55A2DC]/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shine-hover group">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#B56635] mb-3 group-hover:scale-110 transition-transform">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Presupuesto Eficiente</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Propuestas a medida que cuidan y rentabilizan el capital asignado al proyecto.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#55A2DC]/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shine-hover group">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#55A2DC] mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Asistencia a Agencias</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Asesoramiento y asistencia técnica personalizada para agencias y estudios.
                </p>
              </div>
            </div>

            {/* Lema Oficial Extraído del PDF */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2.5 text-sky-700 mb-2">
                <Award className="w-5 h-5 text-[#55A2DC]" />
                <span className="text-xs font-bold uppercase tracking-wider">Trayectoria Comprobada</span>
              </div>
              <blockquote className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-snug">
                "{COMPANY_INFO.tagline}"
              </blockquote>
            </div>

          </div>

          {/* Columna Derecha: Fotografía Ultra-HD del Edificio con Movimiento Parallax */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group bg-slate-100">
              
              {/* Contenedor Parallax de la Imagen */}
              <div className="overflow-hidden h-[520px]">
                <img
                  src="/images/assets/nosotros_edificio.webp"
                  alt="Edificio Corporativo Soporte Promocional S.A.C."
                  className="w-full h-[600px] object-cover object-center transition-transform duration-300 will-change-transform"
                  style={{
                    transform: `translate3d(0, ${-20 + (parallaxOffset % 40)}px, 0) scale(1.05)`
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Badge superior de la foto con animación suave */}
              <div className="absolute top-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-800 shadow-sm animate-float-fast">
                  <Building className="w-4 h-4 text-[#55A2DC]" />
                  <span>Sede Central Corporativa</span>
                </div>
              </div>

              {/* Tarjeta flotante inferior */}
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    Instalaciones Propias para KAMs y Clientes
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Activo
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Infraestructura ejecutiva de salas de directorio, estaciones de back office y auditorio de capacitación para fuerza de ventas.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#55A2DC]" />
                    Directorio VIP
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#55A2DC]" />
                    Auditorio de Capacitación
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#55A2DC]" />
                    Back Office KAM
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
