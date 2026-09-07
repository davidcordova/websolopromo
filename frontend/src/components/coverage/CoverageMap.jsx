import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  CheckCircle2, 
  Users, 
  Building2, 
  Sparkles, 
  Globe2,
  ChevronRight
} from 'lucide-react';
import { COVERAGE_ZONES } from '../../data/solopromoData';

export default function CoverageMap() {
  const [zones, setZones] = useState(COVERAGE_ZONES);
  const [activeZoneSlug, setActiveZoneSlug] = useState('norte'); // Inicialmente en Norte para comprobar el dinamismo
  const [focusedCity, setFocusedCity] = useState(null);

  // Cargar zonas dinámicamente desde la API (MySQL) con fallback a solopromoData.js
  useEffect(() => {
    fetch('/api/coverage')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setZones(data.data);
          // Si el slug actual no existe en los datos remotos, activar el primero
          if (!data.data.some((z) => (z.slug || z.id) === activeZoneSlug)) {
            setActiveZoneSlug(data.data[0].slug || data.data[0].id);
          }
        }
      })
      .catch(() => {
        // En caso de error de red o modo offline, usar COVERAGE_ZONES local
        setZones(COVERAGE_ZONES);
      });
  }, []);

  const activeZone = zones.find((z) => (z.slug || z.id) === activeZoneSlug) || zones[0];

  // Normalizar lista de ciudades para que admita tanto objetos { name, x, y, dept, staff } como strings simples
  const activeCities = (activeZone?.cities || []).map((c) => {
    if (typeof c === 'string') {
      return { name: c, dept: activeZone.name, x: 50, y: 50, staff: 'Supervisión en campo' };
    }
    return c;
  });

  return (
    <section id="cobertura" className="py-24 relative bg-slate-50/80 border-t border-slate-200/80 overflow-hidden">
      
      {/* Luces de ambientación suave */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#55A2DC]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#B56635]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado Oficial del PDF */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full shadow-2xs">
            <Globe2 className="w-3.5 h-3.5 text-[#55A2DC]" />
            <span>¿Dónde Estamos? · Macro-Regiones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Cobertura a Nivel Nacional
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Presencia operativa continua y supervisión descentralizada en el norte, centro, sur y oriente del país, asegurando el mismo estándar de excelencia en cada punto de venta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Columna Izquierda: Selector de Zonas, Detalle y Lista de Ciudades */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tabs de Selección de Zonas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-xs">
              {zones.map((zone) => {
                const zoneSlug = zone.slug || zone.id;
                const isActive = zoneSlug === activeZoneSlug;
                return (
                  <button
                    key={zone.id || zoneSlug}
                    onClick={() => {
                      setActiveZoneSlug(zoneSlug);
                      setFocusedCity(null);
                    }}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isActive 
                        ? 'bg-white text-[#55A2DC] shadow-md font-extrabold border border-slate-200/80 scale-[1.02]' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: zone.badge_color || zone.badgeColor || '#55A2DC' }} 
                      />
                      {zone.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tarjeta de la Zona Seleccionada */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50 space-y-6 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shadow-sky-500/20"
                    style={{ backgroundColor: activeZone.badge_color || activeZone.badgeColor || '#55A2DC' }}
                  >
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                      {activeZone.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">
                      Operatividad y staffing regional homologado
                    </p>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-sky-900 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200 shadow-2xs self-start sm:self-center">
                  {activeCities.length} Ciudades Activas
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {activeZone.description}
              </p>

              {/* Pills de Ciudades de la Zona Activa */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Ciudades Monitoreadas en {activeZone.name}:
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                    Haz clic en una ciudad para ubicarla en el mapa
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {activeCities.map((city, idx) => {
                    const isFocused = focusedCity?.name === city.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setFocusedCity(isFocused ? null : city)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                          isFocused
                            ? 'bg-[#55A2DC] text-white border-transparent shadow-md scale-[1.03]'
                            : 'bg-slate-50 hover:bg-white text-slate-800 border border-slate-200 hover:border-[#55A2DC]'
                        }`}
                      >
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${isFocused ? 'text-white' : 'text-[#55A2DC]'}`} />
                        <span>{city.name}</span>
                        {city.is_hq && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-md bg-sky-100 text-sky-800 font-extrabold">
                            HQ
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Indicador de Ciudad Seleccionada / Sucursal */}
              {focusedCity && (
                <div className="p-4 rounded-2xl bg-sky-50/90 border border-sky-200/90 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#55A2DC] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-extrabold text-slate-900">
                        {focusedCity.name} {focusedCity.dept ? `(${focusedCity.dept})` : ''}
                      </span>
                      <span className="text-[11px] text-sky-800 font-semibold">
                        {focusedCity.staff || 'Supervisión en campo 24/7 y cobertura directa en PDV'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setFocusedCity(null)}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 underline shrink-0 cursor-pointer"
                  >
                    Ver todas
                  </button>
                </div>
              )}

              {/* Indicadores de Servicio Regional */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supervisión regional descentralizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Logística segura de material POP y módulos</span>
                </div>
              </div>

            </div>

          </div>

          {/* Columna Derecha: Mapa Dinámico Interactivo del Perú */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200/90 shadow-xl p-5 sm:p-6 flex flex-col items-center overflow-hidden shine-hover hover:shadow-2xl transition-all duration-300">
              
              {/* Encabezado del Mapa */}
              <div className="w-full flex items-center justify-between mb-3 pb-3 border-b border-slate-100 text-xs text-slate-600">
                <span className="flex items-center gap-2 font-extrabold text-slate-900">
                  <Compass className="w-4 h-4 text-[#55A2DC] animate-spin" style={{ animationDuration: '20s' }} />
                  Radar Operativo Perú
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {activeZone.name} Activa
                </span>
              </div>

              {/* Contenedor del Mapa con Pines Dinámicos Filtrados por Zona */}
              <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-slate-50 border border-slate-200/80 flex items-center justify-center group shadow-inner">
                
                {/* Imagen del Mapa del Perú */}
                <img
                  src="/images/assets/mapa_peru_real.webp"
                  alt="Mapa de Cobertura Nacional Perú SoloPromo"
                  className="w-full h-full object-contain p-3 select-none"
                  loading="lazy"
                />

                {/* PINES DINÁMICOS ANIMADOS - EXCLUSIVOS DE LA ZONA SELECCIONADA */}
                {activeCities.map((city, idx) => {
                  const isFocused = focusedCity?.name === city.name;
                  const pinColor = activeZone.badge_color || activeZone.badgeColor || '#55A2DC';
                  
                  // Coordenadas seguras
                  const left = Math.min(Math.max(city.x || 50, 8), 92);
                  const top = Math.min(Math.max(city.y || 50, 8), 92);

                  return (
                    <div
                      key={`${activeZoneSlug}-${city.name}-${idx}`}
                      style={{ left: `${left}%`, top: `${top}%` }}
                      onClick={() => setFocusedCity(city)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin z-20 transition-transform duration-300 hover:scale-125"
                    >
                      {/* Onda de Radar Continua (Pulso) */}
                      <span 
                        className={`absolute -inset-2 rounded-full animate-ping opacity-75 pointer-events-none ${
                          isFocused ? 'scale-150 duration-700' : ''
                        }`}
                        style={{ backgroundColor: pinColor }} 
                      />

                      {/* Núcleo del Pin */}
                      <div 
                        className={`relative w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all ${
                          isFocused ? 'ring-3 ring-sky-400 scale-125' : ''
                        }`}
                        style={{ backgroundColor: pinColor }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      {/* Etiqueta de la Ciudad con Animación de Emergencia */}
                      <div className={`absolute left-5 -top-3.5 px-2 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-[10px] font-extrabold text-slate-800 whitespace-nowrap pointer-events-none flex items-center gap-1.5 transition-all duration-200 ${
                        isFocused 
                          ? 'scale-110 ring-1 ring-sky-400 bg-sky-50 text-[#55A2DC]' 
                          : 'group-hover/pin:scale-105'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pinColor }} />
                        <span>{city.name}</span>
                      </div>
                    </div>
                  );
                })}

                {/* Radar central sutil en el fondo */}
                <div className="absolute inset-0 bg-[radial-gradient(#55A2DC_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              </div>

              {/* Pie del Mapa con Contador Dinámico */}
              <div className="w-full mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#55A2DC]" />
                  <span>Sedes activas en {activeZone.name}</span>
                </span>
                <span className="font-extrabold text-[#55A2DC]">
                  {activeCities.length} Puntos Monitoreados
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
