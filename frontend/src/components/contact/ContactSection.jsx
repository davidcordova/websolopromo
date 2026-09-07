import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare, 
  Clock, ShieldCheck, ArrowRight, Loader2 
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../../data/solopromoData';
import { apiService } from '../../services/api';

export default function ContactSection({ preSelectedService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: preSelectedService || 'trade-marketing',
    city: 'Lima y Callao',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedService]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await apiService.submitContact(formData);
      setStatus({
        type: 'success',
        message: res.message || '¡Tu solicitud ha sido enviada con éxito! Un asesor se comunicará contigo de inmediato.'
      });
      // Limpiar formulario excepto ciudad
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'trade-marketing',
        city: 'Lima y Callao',
        message: ''
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Hubo un inconveniente al registrar la solicitud. Por favor contáctanos por WhatsApp.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 relative bg-white border-t border-slate-200/80">
      
      {/* Luces de fondo suaves */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#55A2DC]/8 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#B56635]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
            Inicia tu Proyecto
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Cuéntanos qué necesitas y nuestro equipo te ayudará a convertirlo en una solución concreta. Respuesta garantizada en menos de 2 horas hábiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Tarjetas de Información de Contacto */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-6">
              <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-[#55A2DC]" />
                <span>Canales Directos de Atención</span>
              </h3>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={COMPANY_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/80 flex items-center gap-4 transition-all group shadow-2xs hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">WhatsApp Comercial</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {COMPANY_INFO.phone}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#55A2DC] flex items-center gap-4 transition-all group shadow-2xs hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#55A2DC] shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Correo Electrónico</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-[#55A2DC] transition-colors">
                      {COMPANY_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Horario */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-2xs">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#B56635] shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Horario de Operaciones</div>
                    <div className="text-xs font-bold text-slate-800">
                      Lunes a Viernes: 8:30 AM - 6:30 PM
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Sábados: 9:00 AM - 1:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Garantía de Servicio */}
              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#55A2DC] shrink-0" />
                  <span>Respuesta y asesoría en menos de 2 horas hábiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#55A2DC] shrink-0" />
                  <span>Acuerdos de confidencialidad y propuestas protegidas</span>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Formulario Conectado a MySQL */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative">
              
              <h3 className="text-xl font-display font-bold text-slate-900 mb-6">
                Formulario de Requerimiento de Campaña
              </h3>

              {status.message && (
                <div className={`p-4 rounded-2xl mb-6 flex items-start gap-3 text-xs leading-relaxed ${
                  status.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                  )}
                  <div className="space-y-2">
                    <div className="font-semibold">{status.message}</div>
                    {status.type === 'success' && (
                      <a
                        href={`${COMPANY_INFO.socials.whatsapp}&text=Hola%20SoloPromo%2C%20acabo%20de%20enviar%20el%20formulario%20de%20contacto%20desde%20la%20web.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline"
                      >
                        <span>Confirmar solicitud por WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#55A2DC] focus:ring-2 focus:ring-[#55A2DC]/20 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Empresa o Marca
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ej. Corporación Tecnológica"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#55A2DC] focus:ring-2 focus:ring-[#55A2DC]/20 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contacto@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#55A2DC] focus:ring-2 focus:ring-[#55A2DC]/20 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Teléfono o WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+51 987 654 321"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#55A2DC] focus:ring-2 focus:ring-[#55A2DC]/20 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Servicio */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Servicio de Interés
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#55A2DC] text-xs text-slate-900 outline-none transition-all font-medium"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Propuesta Integral Multicanal">Propuesta Integral Multicanal</option>
                      <option value="Otra Consulta">Otra Consulta</option>
                    </select>
                  </div>

                  {/* Ciudad */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Zona o Ciudad de Despliegue
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#55A2DC] text-xs text-slate-900 outline-none transition-all font-medium"
                    >
                      <option value="Lima y Callao">Lima y Callao</option>
                      <option value="Arequipa">Arequipa (Sur)</option>
                      <option value="Trujillo">Trujillo (Norte)</option>
                      <option value="Chiclayo">Chiclayo (Norte)</option>
                      <option value="Piura">Piura (Norte)</option>
                      <option value="Cusco">Cusco (Sur)</option>
                      <option value="Huancayo">Huancayo (Centro)</option>
                      <option value="Iquitos">Iquitos (Occidente)</option>
                      <option value="A Nivel Nacional (Perú)">A Nivel Nacional (Todo el Perú)</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Detalle del Proyecto o Requerimiento *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos brevemente sobre la campaña, duración estimada, número de promotores o requerimiento de módulos..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#55A2DC] focus:ring-2 focus:ring-[#55A2DC]/20 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all resize-none font-medium"
                  ></textarea>
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#55A2DC] to-[#2563EB] hover:from-[#4793cb] hover:to-[#1d4ed8] shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registrando solicitud en SoloPromo...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Quiero hablar con un especialista</span>
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-bold text-slate-700 flex flex-col sm:flex-row items-center justify-center gap-1">
                    <span className="text-[#55A2DC]">⚡</span>
                    <span>Respuesta &lt; 2h</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-bold text-slate-700 flex flex-col sm:flex-row items-center justify-center gap-1">
                    <span className="text-emerald-600">🤝</span>
                    <span>Asesor Dedicado</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-bold text-slate-700 flex flex-col sm:flex-row items-center justify-center gap-1">
                    <span className="text-indigo-600">🌐</span>
                    <span>18 Departamentos</span>
                  </div>
                </div>

                <p className="text-[11px] text-center text-slate-500 font-medium">
                  Tus datos están protegidos y solo se utilizarán para la cotización de este proyecto.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
