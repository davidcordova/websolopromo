import React, { useState } from 'react';
import { Sparkles, Eye, ArrowUpRight, Tag, Layers } from 'lucide-react';

const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "Promotoría de Alta Gama Canon EOS",
    client: "Canon",
    category: "trade-marketing",
    categoryLabel: "Trade Marketing",
    scope: "Falabella, Ripley, Hiraoka",
    image: "/images/assets/trade_marketing_canon.webp",
    desc: "Despliegue de promotores especializados en cámaras réflex, mirrorless y ecosistema de impresión con capacitación continua.",
    tag: "Retail Moderno",
    result: "+38.4% Sell-Out",
    metricBadge: "Aceleración de Venta"
  },
  {
    id: 2,
    title: "Lanzamiento Nacional TCL QD-MiniLED",
    client: "TCL",
    category: "eventos",
    categoryLabel: "Eventos Corporativos",
    scope: "Lanzamiento VIP & Retail",
    image: "/images/assets/eventos_escenario.webp",
    desc: "Producción de evento corporativo y montaje de módulos de exhibición de televisores de ultra alta definición.",
    tag: "Producción Integral",
    result: "100% Asistencia VIP",
    metricBadge: "Impacto de Marca"
  },
  {
    id: 3,
    title: "Activación BTL con Photobooth Canon",
    client: "Canon",
    category: "eventos",
    categoryLabel: "BTL & Activaciones",
    scope: "Centros Comerciales",
    image: "/images/assets/btl_photobooth.webp",
    desc: "Cabina de fotos instantáneas brandeada e incentivos de compra inmediata con engagement directo al consumidor.",
    tag: "Gamificación",
    result: "+4,500 Interacciones",
    metricBadge: "Engagement Directo"
  },
  {
    id: 4,
    title: "Corners Indoor ASUS ROG Zephyrus",
    client: "ASUS",
    category: "indoor",
    categoryLabel: "Indoor & Retail",
    scope: "Tiendas de Cómputo Especializadas",
    image: "/images/assets/indoor_asus.webp",
    desc: "Módulos arquitectónicos con iluminación LED gamer, cableado invisible y anclajes de seguridad para laptops de alta gama.",
    tag: "Diseño Retail",
    result: "12 PDVs Flagship",
    metricBadge: "Presencia Premium"
  },
  {
    id: 5,
    title: "Kits Ejecutivos Merchandising Motorola",
    client: "Motorola",
    category: "branding",
    categoryLabel: "Merchandising",
    scope: "Canales & Distribuidores",
    image: "/images/assets/merch_motorola.webp",
    desc: "Fabricación de agendas de cuero PU, lapiceros de acabado mate y libretas institucionales de alta calidad.",
    tag: "Artículos Premium",
    result: "10,000+ Unidades",
    metricBadge: "Fidelización B2B"
  },
  {
    id: 6,
    title: "Módulos de Audio JBL PartyBox Experience",
    client: "JBL",
    category: "indoor",
    categoryLabel: "Módulos de Experiencia",
    scope: "Puntos de Venta Clave",
    image: "/images/assets/trade_marketing_jbl.webp",
    desc: "Islas dinámicas con prueba de sonido en vivo resistente al agua y luces rítmicas integradas al punto de venta.",
    tag: "Tecnología Interactiva",
    result: "+29% Conversión",
    metricBadge: "Experiencia Sonora"
  },
  {
    id: 7,
    title: "Branding en Escaleras Mecánicas ASUS ROG",
    client: "ASUS",
    category: "branding",
    categoryLabel: "Branding de Espacios",
    scope: "Mall Aventura & Jockey Plaza",
    image: "/images/assets/branding_escaleras.webp",
    desc: "Implementación de cajas de luz y gráficas de alta definición en zonas de alto tránsito para maximizar visibilidad.",
    tag: "Alto Tránsito",
    result: "850K Impactos/Mes",
    metricBadge: "Máxima Visibilidad"
  },
  {
    id: 8,
    title: "Catálogo de Premios y Campañas Canon",
    client: "Canon",
    category: "branding",
    categoryLabel: "Diseño Gráfico",
    scope: "Trade & Marketing Directo",
    image: "/images/assets/diseno_catalogo.webp",
    desc: "Diseño editorial de catálogos comerciales con fotografías de producto de alta resolución y estricto control de marca.",
    tag: "Creatividad Gráfica",
    result: "100% Fidelidad",
    metricBadge: "Manual de Marca"
  }
];

export default function PortfolioSection() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  const filters = [
    { id: 'all', label: 'Todos los Proyectos' },
    { id: 'trade-marketing', label: 'Trade Marketing' },
    { id: 'eventos', label: 'Eventos & BTL' },
    { id: 'indoor', label: 'Indoor & Módulos' },
    { id: 'branding', label: 'Branding & Merchandising' },
  ];

  return (
    <section id="proyectos" className="py-20 sm:py-24 relative bg-slate-50/70 border-t border-slate-200/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
            Casos de Éxito & Resultados Comprobados
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Nuestros Proyectos en Acción
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Una muestra de las activaciones, módulos de retail, eventos y material de visibilidad ejecutados para marcas globales con resultados de venta verificados.
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                filter === f.id
                  ? 'bg-[#55A2DC] text-white shadow-md shadow-sky-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grilla de Proyectos con Fotos Reales Ultra-HD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#55A2DC]/60 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md overflow-hidden"
            >
              <div>
                {/* Fotografía Real del Proyecto en Ultra-HD */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  {/* Badge de Marca y Alcance */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                      {project.client}
                    </span>
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-50/95 backdrop-blur-md border border-sky-200 px-2.5 py-1 rounded-md shadow-2xs">
                      {project.tag}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#55A2DC]">
                      {project.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {project.result}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#55A2DC] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Pie de tarjeta con cliente y badge de impacto */}
              <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
                <span className="font-bold text-slate-800">{project.client}</span>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                  {project.metricBadge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Intermedio de Proyectos */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              ¿Listo para potenciar la visibilidad de tu marca en retail?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Coordinemos una reunión con nuestros directores de cuenta y desarrollemos una solución a la medida.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#55A2DC] to-[#2563EB] hover:from-[#438bc2] hover:to-[#1d4ed8] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-sky-500/20 hover:scale-[1.02] transition-all shrink-0 cursor-pointer"
          >
            <span>Cotizar mi proyecto</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
