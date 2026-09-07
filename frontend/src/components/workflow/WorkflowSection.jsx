import React from 'react';
import { 
  MessageSquare, 
  Palette, 
  Rocket, 
  Activity, 
  BarChart3, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../../data/solopromoData';

export default function WorkflowSection({ onOpenQuoteModal }) {
  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'MessageSquare': return MessageSquare;
      case 'Palette': return Palette;
      case 'Rocket': return Rocket;
      case 'Activity': return Activity;
      case 'BarChart3': return BarChart3;
      default: return Sparkles;
    }
  };

  return (
    <section id="como-trabajamos" className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden border-t border-slate-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado Escueto */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            Metodología Ágil
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-950 tracking-tight">
            Cómo convertimos una idea en ventas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Un proceso transparente, probado a lo largo de 12 años y enfocado estrictamente en tu rentabilidad.
          </p>
        </div>

        {/* Timeline Horizontal de 5 Pasos Limpio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 mb-14">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = getStepIcon(step.icon);
            return (
              <div 
                key={step.step || idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#2563EB]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB]">
                      {step.step}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>

                  <h3 className="text-base font-display font-bold text-slate-900 mb-2 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#2563EB]">
                  {step.highlight}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Intermedio Directo */}
        <div className="text-center p-8 rounded-3xl bg-white border border-slate-200/90 max-w-3xl mx-auto shadow-sm">
          <h4 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 mb-2">
            ¿Quieres ver cómo este proceso se adapta a tu marca?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 max-w-xl mx-auto">
            Analizamos tu situación comercial y te entregamos un plan de despliegue con cronograma y costos en menos de 2 horas hábiles.
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#55A2DC] to-[#2563EB] hover:from-[#4491cb] hover:to-[#1d4ed8] shadow-md shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Hablemos de tu Proyecto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
