import React from 'react';
import { 
  MessageSquare, 
  Palette, 
  Rocket, 
  Activity, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap
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
      default: return CheckCircle2;
    }
  };

  return (
    <section id="como-trabajamos" className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      
      {/* Resplandor decorativo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#55A2DC]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#55A2DC] bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#55A2DC]" />
            Metodología & Eficiencia
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Cómo convertimos una idea en realidad
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Un proceso de trabajo probado a lo largo de 12 años, transparente y enfocado rigurosamente en la rentabilidad de tu inversión.
          </p>
        </div>

        {/* Timeline Horizontal de 5 Pasos */}
        <div className="relative mb-14">
          
          {/* Línea conectora horizontal (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-[#55A2DC]/30 via-[#2563EB]/40 to-[#10B981]/40 -translate-y-8 pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = getStepIcon(step.icon);
              return (
                <div 
                  key={step.step || idx}
                  className="group relative p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-[#55A2DC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Número y Badge de Estado */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs group-hover:bg-[#55A2DC] group-hover:text-white group-hover:border-[#55A2DC] transition-colors">
                        Paso {step.step}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {step.highlight}
                      </span>
                    </div>

                    {/* Icono del Paso */}
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-[#55A2DC] mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#55A2DC] group-hover:to-[#2563EB] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-display font-bold text-slate-900 mb-2 leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-sky-600 group-hover:text-blue-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#55A2DC]" />
                    <span>Control de Calidad</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Intermedio 2 */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-sky-50/60 via-slate-50/80 to-white border border-sky-100 max-w-3xl mx-auto shadow-xs">
          <h4 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 mb-2">
            ¿Quieres ver cómo este proceso se adapta a tu marca?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 max-w-xl mx-auto">
            Analizamos tu situación comercial actual y te entregamos un plan de despliegue con cronograma y costos en menos de 2 horas hábiles.
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
