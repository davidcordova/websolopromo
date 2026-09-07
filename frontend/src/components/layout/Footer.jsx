import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Heart, Lock } from 'lucide-react';
import Logo from '../common/Logo';
import { COMPANY_INFO, SERVICES } from '../../data/solopromoData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative overflow-hidden text-slate-400">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Columna 1 y 2: Identidad y Lema */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-white px-3.5 py-2 rounded-2xl shadow-sm">
              <Logo size="default" />
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empresa líder en marketing operacional, trade marketing, producción de eventos e implementación retail a nivel nacional en el Perú.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300">
              <span className="font-bold text-cyan-400">"{COMPANY_INFO.tagline}"</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all text-xs font-bold"
              >
                IG
              </a>
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all text-xs font-bold"
              >
                FB
              </a>
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all text-xs font-bold"
              >
                IN
              </a>
            </div>
          </div>

          {/* Columna 3: Servicios (1 a 4) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Servicios Principales
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <a href="#servicios" className="hover:text-cyan-400 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Servicios (5 a 8) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Retail & Producción
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.slice(4, 8).map((s) => (
                <li key={s.id}>
                  <a href="#servicios" className="hover:text-cyan-400 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 5: Contacto Directo */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contacto y Sede
            </h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href={COMPANY_INFO.socials.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <a 
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>Lima, Perú (Cobertura a Nivel Nacional)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Barra inferior de copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {currentYear} SOPORTE PROMOCIONAL S.A.C. ({COMPANY_INFO.website.replace('https://', '')}). Acuerdos de confidencialidad y cumplimiento normativo garantizados.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
            <a href="#nosotros" className="hover:text-cyan-400 transition-colors">Nosotros</a>
            <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
            <a href="#proyectos" className="hover:text-cyan-400 transition-colors">Proyectos</a>
            <a href="#cobertura" className="hover:text-cyan-400 transition-colors">Cobertura</a>
            <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <a 
              href="#admin" 
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
              title="Panel de Gestión CMS"
            >
              <Lock className="w-3 h-3 text-[#55A2DC]" />
              <span>Acceso Administrativo</span>
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
