import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Phone, Image as ImageIcon } from 'lucide-react';
import { COMPANY_INFO } from '../../data/solopromoData';

export default function ServiceModal({ service, onClose, onQuoteService }) {
  if (!service) return null;

  const [activeImage, setActiveImage] = React.useState(service.image);

  React.useEffect(() => {
    if (service) {
      setActiveImage(service.image);
    }
  }, [service]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Fondo oscuro con blur suave */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Contenedor del Modal en Tema Claro */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        
        {/* Cabecera del Modal */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <span 
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
              style={{ backgroundColor: `${service.color}15`, color: service.color }}
            >
              {service.badge || 'Pilar Oficial'}
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900 mt-2">
              {service.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {service.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Imagen principal y galería del servicio en Alta Resolución */}
        <div className="space-y-3">
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            <img 
              src={activeImage || service.image} 
              alt={service.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[11px] font-bold text-slate-700 border border-slate-200 shadow-xs">
              <ImageIcon className="w-3.5 h-3.5 text-[#55A2DC]" />
              <span>Registro Real de Campaña (SoloPromo)</span>
            </div>
          </div>

          {/* Miniaturas de la galería */}
          {service.gallery && service.gallery.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {service.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer ${
                    activeImage === imgUrl ? 'border-[#55A2DC] ring-2 ring-[#55A2DC]/40 scale-102' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Descripción Detallada */}
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>{service.description}</p>
        </div>

        {/* Puntos destacados / Alcance */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Alcance y Capacidades Clave
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.highlights?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#55A2DC] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones del Modal */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`${COMPANY_INFO.socials.whatsapp}&text=Hola%20SoloPromo%2C%20quisiera%20cotizar%20el%20servicio%20de%20${encodeURIComponent(service.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onQuoteService(service.title);
            }}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#55A2DC] to-[#2563EB] hover:from-[#4592cb] hover:to-[#1d4ed8] shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            <span>Cotizar este Servicio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
