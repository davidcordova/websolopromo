import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  Layers, 
  Boxes, 
  Radio, 
  Activity, 
  MapPin, 
  ChevronRight,
  MessageCircle,
  ExternalLink,
  Zap,
  Tablet,
  Check,
  Building2,
  Users,
  Eye,
  Sliders
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/solopromoData';
import { useParallax, useMultiLayerMouse } from '../../hooks/useParallax';

export default function Hero({ onOpenQuoteModal }) {
  // 4 Hitos Interactivos del Flujo de Excelencia (Trayectoria estilo Dribbble)
  const MILESTONES = [
    {
      id: "staff",
      num: "01",
      step: "Fuerza Humana",
      title: "Staff Homologado",
      desc: "Promotores capacitados y acreditados en Falabella, Ripley, Hiraoka y Oechsle.",
      badge: "100% Homologado",
      color: "#55A2DC",
      target: "ambassador"
    },
    {
      id: "retail",
      num: "02",
      step: "Arquitectura Comercial",
      title: "Despliegue Retail",
      desc: "Módulos, exhibidores interactivos y corners con iluminación LED para flagship stores.",
      badge: "Corners & POP",
      color: "#4878AC",
      target: "display"
    },
    {
      id: "telemetry",
      num: "03",
      step: "Control en Vivo",
      title: "Supervisión GPS 24/7",
      desc: "Telemetría móvil, auditoría de góndola y reporte horario de quiebres de stock.",
      badge: "En Tiempo Real",
      color: "#10B981",
      target: "hud-left"
    },
    {
      id: "growth",
      num: "04",
      step: "Impacto Comprobado",
      title: "+38.4% Sell-Out",
      desc: "Aceleración sostenida de rotación de producto en los principales retailers del Perú.",
      badge: "Alto Retorno",
      color: "#2563EB",
      target: "hud-right"
    }
  ];

  // Hotspots interactivos anclados a los sujetos recortados (Cutouts)
  const CUTOUT_HOTSPOTS = [
    {
      id: "spot-display-led",
      subject: "display",
      x: 46,
      y: 38,
      title: "Módulo Interactivo LED Cyan",
      desc: "Acrílicos termoformados de alta resistencia con iluminación LED que resalta las líneas insignia de Canon y ASUS ROG.",
      icon: Sparkles
    },
    {
      id: "spot-display-security",
      subject: "display",
      x: 74,
      y: 62,
      title: "Seguridad & Experiencia Hands-On",
      desc: "Sensores antirrobo activos que permiten a los compradores interactuar libremente con los equipos en el piso de venta.",
      icon: ShieldCheck
    },
    {
      id: "spot-ambassador-badge",
      subject: "ambassador",
      x: 36,
      y: 36,
      title: "Staff Acreditado SoloPromo",
      desc: "Uniformidad corporativa impecable, carnet de sanidad vigente y SCTR validado ante los operadores de retail del país.",
      icon: Award
    },
    {
      id: "spot-ambassador-tablet",
      subject: "ambassador",
      x: 68,
      y: 54,
      title: "App de Telemetría GPS en Vivo",
      desc: "Control de asistencia geolocalizado, conteo de tráfico y reporte fotográfico instantáneo de góndola.",
      icon: Tablet
    }
  ];

  const HERO_CLIENT_LOGOS = [
    { name: "Canon", logo: "/images/clients/logo_canon.webp" },
    { name: "ASUS", logo: "/images/clients/logo_asus.webp" },
    { name: "TCL", logo: "/images/clients/logo_tcl.webp" },
    { name: "Microsoft", logo: "/images/clients/logo_microsoft.webp" },
    { name: "JBL", logo: "/images/clients/logo_jbl.webp" },
    { name: "Nexxt Solutions", logo: "/images/clients/logo_nexxt.webp" },
    { name: "ViewSonic", logo: "/images/clients/logo_viewsonic.webp" },
    { name: "Klip Xtreme", logo: "/images/clients/logo_klipxtreme.webp" },
    { name: "Belkin", logo: "/images/clients/logo_belkin.webp" }
  ];

  const [activeMilestone, setActiveMilestone] = useState(0);
  const [activeSpot, setActiveSpot] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax multicapa con el movimiento del ratón (Pinterest / Dribbble spatial)
  const { containerRef, offset, handleMouseMove, handleMouseLeave } = useMultiLayerMouse(24);

  // Parallax de scroll vertical para elementos de fondo
  const parallaxSlow = useParallax(0.14);

  // Rotación suave de hitos con pausa al interactuar
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveMilestone((prev) => (prev + 1) % MILESTONES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, MILESTONES.length]);

  const currentMilestone = MILESTONES[activeMilestone];

  return (
    <section 
      id="inicio" 
      className="relative pt-24 sm:pt-28 pb-14 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-[#F0F6FC] via-[#F8FAFC] to-white"
    >
      
      {/* ========================================================= */}
      {/* 1. TIPOGRAFÍA DE FONDO MONUMENTAL (SPATIAL WATERMARK)     */}
      {/* ========================================================= */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 overflow-hidden w-full text-center opacity-60">
        <span 
          className="font-display font-black text-[100px] sm:text-[180px] lg:text-[270px] xl:text-[330px] tracking-wider text-slate-900/[0.032] uppercase whitespace-nowrap block"
          style={{ transform: `translate3d(0, ${parallaxSlow * 0.5}px, 0)` }}
        >
          SOLOPROMO
        </span>
      </div>

      {/* 2. CUADRÍCULA TECNOLÓGICA Y RESPLANDORES AMBIENTALES */}
      <div className="absolute inset-0 bg-tech-grid pointer-events-none opacity-75 z-0" />
      
      {/* Luces volumétricas en capas */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#55A2DC]/14 rounded-full blur-[160px] pointer-events-none z-0"
        style={{ transform: `translate3d(-50%, calc(-50% + ${parallaxSlow}px), 0)` }}
      />
      <div className="absolute top-1/3 right-10 w-[460px] h-[460px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-8 w-[380px] h-[380px] bg-[#B56635]/8 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* 2. CABECERA CENTRAL MONUMENTAL (STAGE HEADLINE)           */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
          
          {/* Badge de Vanguardia con micro-pulso */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-sky-200/90 shadow-xs backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55A2DC] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#55A2DC]" />
            </span>
            <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-900">
              Líderes en Trade Marketing · BTL & Retail de Vanguardia
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-mono">
              12 Años de Trayectoria
            </span>
          </div>

          {/* Titular Monumental Panorámico */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] xl:text-[4.35rem] font-display font-black tracking-tight text-slate-950 leading-[1.07]">
            Transformamos tus puntos de venta en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55A2DC] via-[#2563EB] to-[#0284C7] relative inline-block">
              experiencias que venden.
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#55A2DC] to-[#2563EB] rounded-full" />
            </span>
          </h1>

          {/* Narrativa de Autoridad y Cobertura Nacional */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Diseñamos, implementamos y gestionamos soluciones de visibilidad, branding y ejecución comercial para marcas que buscan destacar en el punto de venta. Con <strong className="font-semibold text-slate-900">cobertura nacional</strong> y <strong className="font-semibold text-[#55A2DC]">resultados medibles</strong>.
          </p>

          {/* Callout de Métrica Estrella +38.4% Sell-Out */}
          <div className="inline-flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/80 to-indigo-50 border border-sky-300/80 shadow-sm text-left mx-auto">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#55A2DC] to-[#2563EB] text-white font-black text-xl shadow-md shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[#2563EB] font-display tracking-tight">+38.4%</span>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-slate-900">Sell-Out Promedio Comprobado</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">Aceleración de rotación de producto en Falabella, Ripley, Hiraoka y Oechsle</p>
            </div>
          </div>

          {/* Botonera de Acción Principal */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
            <button
              onClick={onOpenQuoteModal}
              className="group relative flex items-center gap-3 px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#55A2DC] via-[#3b82f6] to-[#2563EB] hover:from-[#4792cb] hover:to-[#1d4ed8] shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Solicitar Propuesta</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200 relative z-10" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <a
              href="#proyectos"
              className="flex items-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300/90 hover:border-slate-400 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <Layers className="w-4 h-4 text-[#55A2DC]" />
              <span>Ver Proyectos</span>
            </a>

            <a
              href={COMPANY_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl font-bold text-xs text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 shadow-xs transition-all hover:scale-[1.02]"
              title="Atención inmediata con Director de Cuenta"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Director en línea</span>
            </a>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. CURVA DE TRAYECTORIA CON HITOS (ESTILO DRIBBLE FLOW)    */}
        {/* ========================================================= */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto relative">
          
          {/* SVG de la curva con trazo fluido que conecta los hitos */}
          <div className="hidden md:block absolute top-6 left-6 right-6 h-12 pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#55A2DC" stopOpacity="0.3" />
                  <stop offset="35%" stopColor="#4878AC" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#10B981" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              {/* Trayectoria base estática */}
              <path 
                d="M 50,30 C 250,5 350,55 520,25 C 700,-5 800,55 950,30" 
                fill="none" 
                stroke="url(#flowGradient)" 
                strokeWidth="2" 
                strokeOpacity="0.4"
              />
              {/* Trayectoria animada discontinua con brillo (Dribbble style) */}
              <path 
                d="M 50,30 C 250,5 350,55 520,25 C 700,-5 800,55 950,30" 
                fill="none" 
                stroke="url(#flowGradient)" 
                strokeWidth="2.5" 
                className="animate-trajectory-flow"
              />
            </svg>
          </div>

          {/* Selector de los 4 Hitos en cuadrícula horizontal interactiva */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
            {MILESTONES.map((m, idx) => {
              const isActive = activeMilestone === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMilestone(idx);
                    setActiveSpot(null);
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`relative p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-white shadow-xl shadow-sky-500/10 border-sky-300 scale-[1.02] ring-2 ring-sky-400/20'
                      : 'bg-white/75 hover:bg-white/95 border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span 
                      className={`font-mono text-xs font-black px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-[#55A2DC] text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {m.num}
                    </span>
                    <span 
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: isActive ? `${m.color}18` : '#F1F5F9',
                        color: isActive ? m.color : '#64748B'
                      }}
                    >
                      {m.badge}
                    </span>
                  </div>

                  <div className="font-display font-extrabold text-sm sm:text-[15px] text-slate-900 leading-tight">
                    {m.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                    {m.desc}
                  </div>

                  {/* Indicador de nodo activo */}
                  {isActive && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#55A2DC] rounded-full shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. ESCENARIO PANORÁMICO SPATIAL (SIN CAJAS, RECORTES REALES) */}
        {/* ========================================================= */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            handleMouseLeave();
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          className="relative mt-8 sm:mt-12 max-w-6xl mx-auto min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex items-end justify-center pt-8 overflow-visible"
        >

          {/* SUELO LUMINOSO Y RESPLANDOR DE CONTACTO (GROUND PODIUM) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] sm:w-[84%] h-36 sm:h-44 bg-gradient-to-t from-sky-400/20 via-[#55A2DC]/10 to-transparent rounded-[100%] blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent pointer-events-none" />

          {/* ======================================================= */}
          {/* SUJETO 1: EXHIBIDOR / MÓDULO RETAIL HIGH-TECH (CUTOUT)  */}
          {/* ======================================================= */}
          <div 
            className="absolute bottom-0 left-[2%] sm:left-[6%] lg:left-[12%] z-20 transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${offset.x * 0.45}px, ${offset.y * 0.35}px, 0)`
            }}
          >
            <div className="relative w-[230px] sm:w-[320px] md:w-[390px] lg:w-[440px] flex items-end justify-center">
              
              {/* Sombra de contacto suave con el suelo */}
              <div className="absolute bottom-1 w-4/5 h-8 bg-black/40 rounded-full blur-xl -z-10" />

              {/* Imagen recortada antialiased transparente del Display */}
              <img 
                src="/images/assets/hero_display_cutout.webp" 
                alt="Módulo Retail High-Tech SoloPromo para Canon y ASUS ROG" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.30)] filter contrast-[1.03] select-none pointer-events-auto"
              />

              {/* Hotspots interactivos en el Exhibidor */}
              {CUTOUT_HOTSPOTS.filter(s => s.subject === 'display').map((spot, sIdx) => {
                const isSelected = activeSpot === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute z-30 pointer-events-auto"
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSpot(isSelected ? null : spot.id);
                      }}
                      className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-sky-900 shadow-xl border-2 border-[#55A2DC] hover:scale-125 transition-transform cursor-pointer group/spot"
                      title={spot.title}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55A2DC] opacity-75" />
                      <span className="text-xs font-black text-[#55A2DC] group-hover/spot:text-blue-700">+</span>
                    </button>

                    {/* Popover / Tooltip interactivo flotante */}
                    {isSelected && (
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-60 sm:w-64 bg-slate-950/95 backdrop-blur-xl text-white text-xs p-3.5 rounded-2xl border border-sky-400/80 shadow-2xl z-50 animate-fade-in">
                        <div className="text-[10px] uppercase font-mono font-bold text-sky-300 mb-1 flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-[#55A2DC]" />
                          {spot.title}
                        </div>
                        <p className="text-[11px] text-slate-200 leading-snug font-normal">
                          {spot.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>

          {/* ======================================================= */}
          {/* SUJETO 2: EMBAJADORA DE MARCA SOLOPROMO (CUTOUT)        */}
          {/* ======================================================= */}
          <div 
            className="absolute bottom-0 right-[2%] sm:right-[6%] lg:right-[12%] z-25 transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${offset.x * 0.8}px, ${offset.y * 0.6}px, 0)`
            }}
          >
            <div className="relative w-[210px] sm:w-[290px] md:w-[350px] lg:w-[395px] flex items-end justify-center">
              
              {/* Sombra de contacto de los pies con el suelo */}
              <div className="absolute bottom-1 w-3/4 h-8 bg-black/45 rounded-full blur-xl -z-10" />

              {/* Imagen recortada antialiased de la Promotora con Tablet */}
              <img 
                src="/images/assets/hero_ambassador_cutout.webp" 
                alt="Embajadora de Marca SoloPromo con Tablet de Telemetría" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.38)] filter contrast-[1.02] select-none pointer-events-auto"
              />

              {/* Hotspots interactivos en la Embajadora */}
              {CUTOUT_HOTSPOTS.filter(s => s.subject === 'ambassador').map((spot, sIdx) => {
                const isSelected = activeSpot === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute z-30 pointer-events-auto"
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSpot(isSelected ? null : spot.id);
                      }}
                      className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-sky-900 shadow-xl border-2 border-[#55A2DC] hover:scale-125 transition-transform cursor-pointer group/spot"
                      title={spot.title}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55A2DC] opacity-75" />
                      <span className="text-xs font-black text-[#55A2DC] group-hover/spot:text-blue-700">+</span>
                    </button>

                    {/* Popover / Tooltip interactivo flotante */}
                    {isSelected && (
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-60 sm:w-64 bg-slate-950/95 backdrop-blur-xl text-white text-xs p-3.5 rounded-2xl border border-sky-400/80 shadow-2xl z-50 animate-fade-in">
                        <div className="text-[10px] uppercase font-mono font-bold text-sky-300 mb-1 flex items-center gap-1.5">
                          <Award className="w-3 h-3 text-[#55A2DC]" />
                          {spot.title}
                        </div>
                        <p className="text-[11px] text-slate-200 leading-snug font-normal">
                          {spot.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>

          {/* ======================================================= */}
          {/* 5. TARJETAS HUD FLOTANTES (GLASSMORPHISM SATELLITES)    */}
          {/* ======================================================= */}

          {/* HUD IZQUIERDO: DESPLIEGUE EN VIVO & TELEMETRÍA */}
          <div 
            className="absolute top-6 sm:top-12 left-0 sm:left-2 lg:-left-4 z-30 max-w-[220px] sm:max-w-[270px] bg-white/90 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-sky-200/90 shadow-xl shadow-slate-900/10 transition-transform duration-100 ease-out animate-float pointer-events-auto"
            style={{
              transform: `translate3d(${offset.x * 1.35}px, ${offset.y * 1.35}px, 0)`
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-black text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>GPS EN VIVO</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                100% Stock
              </span>
            </div>
            
            <div className="font-display font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
              Falabella Jockey Plaza
            </div>
            <div className="text-[11px] text-[#55A2DC] font-bold mt-0.5">
              Canon R50 & ASUS ROG Hub
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span>Auditoría de Góndola:</span>
              <span className="font-mono font-bold text-emerald-600">0 Quiebres</span>
            </div>
          </div>

          {/* HUD DERECHO: ACELERACIÓN DE SELL-OUT & SPARKLINES */}
          <div 
            className="absolute top-2 sm:top-6 right-0 sm:right-2 lg:-right-4 z-30 max-w-[220px] sm:max-w-[270px] bg-white/90 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-sky-200/90 shadow-xl shadow-slate-900/10 transition-transform duration-100 ease-out animate-float-reverse pointer-events-auto"
            style={{
              transform: `translate3d(${offset.x * 1.45}px, ${offset.y * 1.45}px, 0)`
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-[#55A2DC] to-[#2563EB] rounded-xl text-white shadow-md shadow-sky-500/25">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-black tracking-tight text-slate-950 font-display leading-tight">
                  +38.4% Sell-Out
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Aceleración Comercial
                </div>
              </div>
            </div>

            {/* Sparkline SVG de Crecimiento continuo */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[10px] font-mono text-slate-500">
                Rotación semanal
              </div>
              <svg className="w-20 h-5" viewBox="0 0 80 20">
                <path 
                  d="M 0,16 Q 20,18 35,10 T 60,6 T 80,2" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* BADGE INFERIOR CENTRAL: COBERTURA INTEGRAL */}
          <div 
            className="hidden sm:flex absolute bottom-2 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-sky-200 shadow-lg text-slate-800 items-center gap-2 text-xs font-bold pointer-events-auto"
          >
            <MapPin className="w-3.5 h-3.5 text-[#55A2DC]" />
            <span className="text-slate-600">Cobertura Nacional:</span>
            <span className="text-[#55A2DC] font-extrabold font-mono">18 Departamentos • 85+ PDVs Activos</span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 6. CINTILLO DE MARCAS ALIADAS & MÉTRICAS DE IMPACTO       */}
        {/* ========================================================= */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          
          {/* Marcas Globales que Confían en SoloPromo */}
          <div className="mb-10 text-center">
            <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-slate-600 mb-4">
              Socios estratégicos de los gigantes tecnológicos y corporativos líderes en el Perú
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {HERO_CLIENT_LOGOS.map((client, cIdx) => (
                <div 
                  key={cIdx} 
                  className="flex items-center gap-3 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#55A2DC] hover:shadow-md transition-all hover:scale-105 duration-200 group cursor-default"
                  title={client.name}
                >
                  <img 
                    src={client.logo} 
                    alt={`Logotipo oficial de ${client.name}`} 
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-contain p-0.5 bg-slate-50 border border-slate-100" 
                  />
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-slate-950">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Métricas de Vanguardia con +38.4% como Estrella Principal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-center">
            {COMPANY_INFO.metrics.map((m, idx) => {
              const isHeroMetric = idx === 0;
              return (
                <div 
                  key={idx} 
                  className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 group cursor-default relative overflow-hidden ${
                    isHeroMetric
                      ? 'bg-gradient-to-br from-sky-50 via-white to-blue-50 border-2 border-[#55A2DC] shadow-xl shadow-sky-500/15 ring-4 ring-sky-100/80 -translate-y-1'
                      : 'bg-white border border-slate-200/90 shadow-xs hover:border-[#55A2DC]/60 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {isHeroMetric && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#55A2DC] to-[#2563EB] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                      ★ Métrica Estrella
                    </div>
                  )}
                  <div className={`font-display font-black tracking-tight group-hover:scale-105 transition-transform duration-200 ${
                    isHeroMetric 
                      ? 'text-4xl sm:text-5xl lg:text-[3.2rem] text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#1D4ED8] leading-tight my-1' 
                      : 'text-3xl sm:text-4xl text-[#55A2DC]'
                  }`}>
                    {m.value}
                  </div>
                  <div className={`text-xs sm:text-sm font-bold mt-1.5 ${isHeroMetric ? 'text-slate-950 font-black' : 'text-slate-800'}`}>
                    {m.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{m.detail}</div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
