import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Briefcase, 
  Building2, 
  ExternalLink, 
  ArrowRight
} from 'lucide-react';
import Logo from '../common/Logo';

export default function Navbar({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el dropdown al hacer clic fuera o presionar Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: '¿Por qué Nosotros?', href: '#por-que-nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Clientes', href: '#clientes' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Cobertura', href: '#cobertura' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleOpenClientForm = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onOpenQuoteModal) {
      onOpenQuoteModal();
    } else {
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-sm shadow-slate-200/50' 
        : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logotipo Oficial */}
        <a href="#inicio" className="focus:outline-none">
          <Logo />
        </a>

        {/* Enlaces Desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-700 hover:text-[#55A2DC] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Botón Llamativo con 2 Opciones (Portal de Empleo & Soy Cliente) */}
        <div className="hidden sm:block relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#55A2DC] via-[#2563EB] to-[#1d4ed8] hover:from-[#4792cb] hover:to-[#1e40af] shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-sky-300/30"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="font-extrabold tracking-wide">Portal & Clientes</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-sky-200' : ''}`} />
          </button>

          {/* Menú Desplegable con las 2 Opciones */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl border border-sky-200/90 shadow-2xl p-2.5 z-50 animate-fade-in divide-y divide-slate-100">
              
              <div className="px-3 py-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-wider text-slate-400">
                  ¿Cómo deseas conectar con nosotros?
                </span>
              </div>

              <div className="py-2 space-y-1.5">
                
                {/* OPCIÓN 1: PORTAL DE EMPLEO */}
                <a
                  href="https://solopromo.net.pe/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-sky-50/80 border border-transparent hover:border-sky-200 transition-all duration-200 cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-xl bg-sky-100 text-[#55A2DC] group-hover:bg-[#55A2DC] group-hover:text-white transition-colors duration-200 shadow-xs shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-[#55A2DC] transition-colors">
                        Portal de Empleo
                      </span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        Bolsa de Trabajo
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Postula a vacantes de promotoría y staff retail en todo el Perú.
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-sky-600 mt-1.5">
                      <span>solopromo.net.pe/jobs</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </div>
                </a>

                {/* OPCIÓN 2: FORMULARIO DE CONTACTO PARA CLIENTES */}
                <button
                  type="button"
                  onClick={handleOpenClientForm}
                  className="w-full group flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-200 transition-all duration-200 cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200 shadow-xs shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-[#2563EB] transition-colors">
                        Soy Cliente / Iniciar Proyecto
                      </span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 shrink-0">
                        Cotización
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Cotiza campañas de Trade Marketing, BTL o arquitectura retail para tu marca.
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-blue-600 mt-1.5">
                      <span>Ir al formulario de contacto</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </button>

              </div>

            </div>
          )}
        </div>

        {/* Botón menú móvil */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Menú Móvil desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 hover:text-[#55A2DC] py-1 border-b border-slate-100"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Las 2 Opciones en Móvil */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
              Accesos Destacados
            </span>

            {/* Opción 1 Móvil: Portal de Empleo */}
            <a
              href="https://solopromo.net.pe/jobs"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-slate-900 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#55A2DC] text-white">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Portal de Empleo</div>
                  <div className="text-[10px] text-slate-500">Postula a vacantes activas</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#55A2DC]" />
            </a>

            {/* Opción 2 Móvil: Formulario de Contacto para Clientes */}
            <button
              onClick={handleOpenClientForm}
              className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#55A2DC] to-[#2563EB] text-white shadow-md shadow-sky-500/25 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 text-white">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Soy Cliente / Cotizar</div>
                  <div className="text-[10px] text-sky-100">Formulario de propuesta comercial</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
