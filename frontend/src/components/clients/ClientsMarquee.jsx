import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Store, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  ArrowRight, 
  Award, 
  Users 
} from 'lucide-react';
import { CLIENTS } from '../../data/solopromoData';

export default function ClientsMarquee() {
  const [selectedClientId, setSelectedClientId] = useState('canon');
  const marqueeItems = [...CLIENTS, ...CLIENTS];

  const selectedClient = CLIENTS.find((c) => c.id === selectedClientId) || CLIENTS[0];

  const handleScrollToContact = (brandName) => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="clientes" className="py-20 sm:py-24 relative bg-slate-50/90 border-y border-slate-200/80 overflow-hidden">
      
      {/* Resplandores ambientales de fondo */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-[#55A2DC]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-[#B56635]/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Encabezado Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full mb-3 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#55A2DC]" />
          <span>De la estrategia a la ejecución comercial</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Socios Estratégicos & Marcas Líderes
        </h2>
        
        {/* Timeline Estratégico */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 mb-3">
          {['PLANEAMOS', 'DISEÑAMOS', 'IMPLEMENTAMOS', 'MEDIMOS'].map((step, idx) => (
            <React.Fragment key={step}>
              <span className="text-[11px] font-extrabold font-mono tracking-widest text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                {step}
              </span>
              {idx < 3 && <span className="text-sky-500 font-bold text-xs">→</span>}
            </React.Fragment>
          ))}
        </div>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 leading-relaxed">
          Corporaciones globales líderes de tecnología, cómputo y consumo que confían la gestión de sus puntos de venta y activaciones en SoloPromo.
        </p>
      </div>

      {/* =========================================================================
          1. CARRUSEL INFINITO (MARQUEE) DE MARCAS
          - Logotipos enteros, ampliados, de alto impacto visual y sin cortes
          ========================================================================= */}
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)] mb-16">
        <div className="flex w-max animate-marquee space-x-6 sm:space-x-10 py-6 items-center">
          {marqueeItems.map((client, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedClientId(client.id)}
              title={`Ver caso operativo de ${client.name}`}
              className="w-52 h-44 sm:w-64 sm:h-52 md:w-72 md:h-56 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200/90 hover:border-[#55A2DC] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center p-5 shrink-0 group cursor-pointer shine-hover"
            >
              {/* LOGOTIPO COMPLETO, ENTERO Y AMPLIADO AL DOBLE */}
              <div className="relative w-44 h-32 sm:w-56 sm:h-40 rounded-2xl overflow-hidden p-3 drop-shadow-md group-hover:scale-115 transition-transform duration-300 flex items-center justify-center bg-slate-50/60">
                <img
                  src={client.logo}
                  alt={`Logotipo oficial de ${client.name}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = client.logoPng || '/images/logo_official_transparent.png';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          2. SECCIÓN DE CONTRASTE: ALIANZAS ESTRATÉGICAS & DESPLIEGUE EN RETAIL
          - Fondo corporativo con textura geométrica 3D (según lámina de marca del PDF)
          - Acabado luminoso, elegante, de máxima legibilidad y sin tonos oscuros
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden bg-white text-slate-800">
          
          {/* Textura de fondo geométrica corporativa 3D de alta fidelidad */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none" 
            style={{ backgroundImage: "url('/images/assets/bg_geometric_brand.webp')" }}
          />
          {/* Capa de suavizado luminoso con toques cian sutiles */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-sky-50/85 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#55A2DC]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B56635]/6 rounded-full blur-3xl pointer-events-none" />

          {/* Encabezado del Módulo de Despliegue */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200/90 px-3 py-1 rounded-full mb-3 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#55A2DC]" />
                <span>Despliegue Operativo & Casos de Éxito en Retail</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                Alianzas Estratégicas en Punto de Venta
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Selecciona una marca aliada para conocer el alcance de nuestra gestión comercial, presencia en tiendas departamentales y métricas de desempeño.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/90 border border-slate-200 px-3.5 py-1.5 rounded-full shrink-0 shadow-2xs">
              <Store className="w-3.5 h-3.5 text-[#55A2DC]" />
              <span>10 Marcas Homologadas</span>
            </div>
          </div>

          {/* Selector de Marcas Interactivo (Tabs Horizontales Adaptables) */}
          <div className="relative z-10 mb-8">
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none">
              {CLIENTS.map((client) => {
                const isSelected = client.id === selectedClient.id;
                return (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#55A2DC] text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                        : 'bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white p-0.5 shrink-0 overflow-hidden flex items-center justify-center shadow-xs border border-slate-100">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = client.logoPng || '/images/logo_official_transparent.png';
                        }}
                      />
                    </span>
                    <span>{client.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel Dividido de Detalle (Split Screen Showcase) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Columna Izquierda: Fotografía Real del Despliegue en Retail */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
                <img
                  src={selectedClient.realPhoto}
                  alt={`Implementación real de ${selectedClient.name} en retail`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Badge Superior Flotante */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200/90 px-3 py-1 rounded-full text-[11px] font-bold text-sky-800 flex items-center gap-1.5 shadow-md">
                  <Store className="w-3 h-3 text-[#55A2DC]" />
                  <span>Presencia en Retail Homologado</span>
                </div>

                {/* Tarjeta Inferior de Ubicación en Tienda */}
                <div className="absolute inset-x-3 bottom-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-lg">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#55A2DC] mb-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Ubicación Estratégica:</span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold line-clamp-1">
                    {selectedClient.storeLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Especificaciones Operativas, Métricas y Canales */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Encabezado de la Ficha con Logo y Nombres */}
              <div className="flex items-center gap-4 sm:gap-6 mb-5">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white p-3 shrink-0 drop-shadow-xl ring-2 ring-[#55A2DC]/60 flex items-center justify-center border border-slate-200">
                  <img
                    src={selectedClient.logo}
                    alt={`Logo oficial de ${selectedClient.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-1.5">
                    <Award className="w-3 h-3 text-[#55A2DC]" />
                    <span>{selectedClient.badge} · Alianza Estratégica</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                    {selectedClient.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {selectedClient.tagline}
                  </p>
                </div>
              </div>

              {/* Resumen del Caso y Solución Implementada */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-200/90 mb-6 shadow-xs">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedClient.summary}
                </p>
              </div>

              {/* Métricas Clave de Desempeño */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200/90 text-center shadow-xs">
                  <span className="block text-base sm:text-lg font-black text-sky-700 tracking-tight font-display">
                    {selectedClient.metrics.pdv}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                    Puntos de Venta
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200/90 text-center shadow-xs">
                  <span className="block text-base sm:text-lg font-black text-emerald-700 tracking-tight font-display">
                    {selectedClient.metrics.coverage}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                    Cobertura Geográfica
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200/90 text-center shadow-xs">
                  <span className="block text-base sm:text-lg font-black text-amber-700 tracking-tight font-display">
                    {selectedClient.metrics.impact}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                    Rendimiento en Tienda
                  </span>
                </div>
              </div>

              {/* Pilares Desplegados */}
              <div className="mb-4">
                <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Pilares de Servicio Desplegados:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedClient.servicesDeployed.map((service, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-50 text-sky-900 border border-sky-200/80 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#55A2DC] shrink-0" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Canales Comerciales y Botón de Acción */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Cadenas Retail Homologadas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedClient.retailChannels.map((channel, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleScrollToContact(selectedClient.name)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#55A2DC] to-[#4878AC] hover:from-[#438bc2] hover:to-[#3b6594] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:scale-[1.02] shrink-0 cursor-pointer"
                >
                  <span>Cotizar Proyecto para mi Marca</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
