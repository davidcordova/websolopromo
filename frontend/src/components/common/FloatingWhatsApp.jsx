import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../../data/solopromoData';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Tooltip o tarjeta de chat rápido en Tema Claro */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-900">Soporte Promocional</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed font-medium">
            Hola, estamos en línea. ¿En qué servicio o campaña comercial podemos asesorarte hoy?
          </p>

          <a
            href={COMPANY_INFO.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
          >
            <Phone className="w-4 h-4" />
            <span>Iniciar Chat por WhatsApp</span>
          </a>
        </div>
      )}

      {/* Botón Flotante Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Abrir WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        <Phone className="w-6 h-6 fill-current" />
      </button>

    </div>
  );
}
