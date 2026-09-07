import React, { useState, useEffect } from 'react';
import { 
  Inbox, Layers, Briefcase, Handshake, LogOut, ExternalLink, 
  Search, Filter, Plus, Edit3, Trash2, CheckCircle2, 
  Clock, AlertCircle, Phone, Mail, MessageSquare, MapPin, 
  Building, Eye, X, Save, RefreshCw, Sparkles, ChevronRight
} from 'lucide-react';
import Logo from '../common/Logo';
import ImageUploader from './ImageUploader';

export default function AdminDashboard({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('leads'); // 'leads', 'services', 'portfolio', 'clients'
  
  // Estados de datos
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [clients, setClients] = useState([]);
  const [coverageZones, setCoverageZones] = useState([]);
  
  // Estados de carga
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Modales
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCategory, setNewClientCategory] = useState('');
  const [newClientTagline, setNewClientTagline] = useState('');
  
  // Modal Cobertura
  const [editingZone, setEditingZone] = useState(null);
  const [newCityName, setNewCityName] = useState('');
  const [newCityDept, setNewCityDept] = useState('');
  const [newCityStaff, setNewCityStaff] = useState('+10 Promotores');
  const [newCityX, setNewCityX] = useState(50);
  const [newCityY, setNewCityY] = useState(50);

  // Filtros de leads
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [leadSearchTerm, setLeadSearchTerm] = useState('');

  const token = localStorage.getItem('solopromo_token');

  // Cargar datos según la pestaña activa
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const showToast = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'leads') {
        const res = await fetch('/api/contact', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setLeads(data.data || []);
      } else if (activeTab === 'services') {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (data.success) setServices(data.data || []);
      } else if (activeTab === 'portfolio') {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        if (data.success) setPortfolio(data.data || []);
      } else if (activeTab === 'clients') {
        const res = await fetch('/api/clients');
        const data = await res.json();
        if (data.success) setClients(data.data || []);
      } else if (activeTab === 'coverage') {
        const res = await fetch('/api/coverage');
        const data = await res.json();
        if (data.success) setCoverageZones(data.data || []);
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  // 1. GESTIÓN DE LEADS / COTIZACIONES
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      const res = await fetch(`/api/contact/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        showToast(`Estado de solicitud #${leadId} actualizado a: ${newStatus}`);
      }
    } catch (err) {
      alert('Error al actualizar estado');
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('¿Seguro que deseas eliminar este registro de cotización?')) return;
    try {
      const res = await fetch(`/api/contact/${leadId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter(l => l.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) setSelectedLead(null);
        showToast('Solicitud eliminada correctamente');
      }
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  // 2. GESTIÓN DE SERVICIOS
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      const res = await fetch(`/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingService)
      });
      const data = await res.json();
      if (data.success) {
        setServices(services.map(s => s.id === editingService.id ? editingService : s));
        setEditingService(null);
        showToast('Servicio actualizado con éxito');
      }
    } catch (err) {
      alert('Error al guardar servicio');
    }
  };

  // 3. GESTIÓN DE PORTAFOLIO
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const isNew = isCreatingProject;
    const url = isNew ? '/api/portfolio' : `/api/portfolio/${editingProject.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingProject)
      });
      const data = await res.json();
      if (data.success) {
        setEditingProject(null);
        setIsCreatingProject(false);
        fetchData();
        showToast(isNew ? 'Proyecto añadido al portafolio' : 'Proyecto actualizado');
      }
    } catch (err) {
      alert('Error al guardar proyecto');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('¿Seguro que deseas eliminar este proyecto del portafolio?')) return;
    try {
      const res = await fetch(`/api/portfolio/${projectId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPortfolio(portfolio.filter(p => p.id !== projectId));
        showToast('Proyecto eliminado');
      }
    } catch (err) {
      alert('Error al eliminar proyecto');
    }
  };

  // 4. GESTIÓN DE CLIENTES
  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newClientName.trim(),
          category: newClientCategory.trim(),
          tagline: newClientTagline.trim(),
          featured: 1
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewClientName('');
        setNewClientCategory('');
        setNewClientTagline('');
        fetchData();
        showToast('Cliente aliado agregado con éxito');
      }
    } catch (err) {
      alert('Error al agregar cliente');
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm('¿Deseas eliminar este cliente de la lista?')) return;
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setClients(clients.filter(c => c.id !== clientId));
        showToast('Cliente eliminado');
      }
    } catch (err) {
      alert('Error al eliminar cliente');
    }
  };

  // 5. GESTIÓN DE COBERTURA & SEDES
  const handleSaveZone = async (e) => {
    e.preventDefault();
    if (!editingZone) return;
    try {
      const res = await fetch(`/api/coverage/${editingZone.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingZone)
      });
      const data = await res.json();
      if (data.success) {
        setCoverageZones(coverageZones.map(z => z.id === editingZone.id ? editingZone : z));
        showToast(`Zona ${editingZone.name} actualizada con éxito en MySQL`);
        setEditingZone(null);
      } else {
        alert(data.error || 'Error al guardar zona');
      }
    } catch (err) {
      alert('Error de red al actualizar zona');
    }
  };

  const handleAddCityToEditingZone = (e) => {
    e.preventDefault();
    if (!newCityName.trim() || !editingZone) return;
    const currentCities = Array.isArray(editingZone.cities) ? editingZone.cities : [];
    const newCity = {
      name: newCityName.trim(),
      dept: newCityDept.trim() || editingZone.name,
      x: Number(newCityX) || 50,
      y: Number(newCityY) || 50,
      is_hq: false,
      staff: newCityStaff.trim() || '+10 Promotores'
    };
    setEditingZone({
      ...editingZone,
      cities: [...currentCities, newCity]
    });
    setNewCityName('');
    setNewCityDept('');
    setNewCityStaff('+10 Promotores');
    showToast(`Ciudad ${newCity.name} agregada. Haz clic en "Guardar Cambios" para sincronizar.`);
  };

  const handleRemoveCityFromEditingZone = (idxToRemove) => {
    if (!editingZone || !Array.isArray(editingZone.cities)) return;
    const filtered = editingZone.cities.filter((_, i) => i !== idxToRemove);
    setEditingZone({
      ...editingZone,
      cities: filtered
    });
    showToast('Ciudad removida de la lista.');
  };


  // Filtrado de leads
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
    const term = leadSearchTerm.toLowerCase();
    const matchesSearch = !term || 
      (lead.name && lead.name.toLowerCase().includes(term)) ||
      (lead.company && lead.company.toLowerCase().includes(term)) ||
      (lead.email && lead.email.toLowerCase().includes(term)) ||
      (lead.city && lead.city.toLowerCase().includes(term)) ||
      (lead.service && lead.service.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-[#55A2DC] selection:text-white">
      
      {/* Toast Notification */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-[120] bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* HEADER SUPERIOR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-8" />
            <div className="hidden sm:block h-6 w-px bg-slate-200" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#55A2DC] animate-pulse" />
              Consola Administrativa CMS
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#55A2DC] bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ver Sitio Web</span>
            </button>

            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">{user?.name || 'Administrador'}</p>
              <p className="text-[11px] text-slate-400">@{user?.username || 'admin'}</p>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BARRA DE PESTAÑAS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'leads'
                ? 'border-[#55A2DC] text-[#55A2DC] bg-blue-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Cotizaciones & Leads</span>
            {newLeadsCount > 0 && (
              <span className="bg-[#B56635] text-white text-[10px] px-1.5 py-0.2 rounded-full font-extrabold animate-pulse">
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-[#55A2DC] text-[#55A2DC] bg-blue-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Los 8 Pilares de Servicios</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'border-[#55A2DC] text-[#55A2DC] bg-blue-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Portafolio & Casos de Éxito</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clients')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'clients'
                ? 'border-[#55A2DC] text-[#55A2DC] bg-blue-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>Marcas Aliadas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('coverage')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'coverage'
                ? 'border-[#55A2DC] text-[#55A2DC] bg-blue-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Cobertura & Sedes</span>
          </button>

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">

        {/* ---------------- PESTAÑA 1: LEADS & COTIZACIONES ---------------- */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Tarjetas KPI */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500">Total Solicitudes</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{leads.length}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-amber-600">Nuevas (Pendientes)</span>
                <p className="text-2xl font-black text-amber-600 mt-1">
                  {leads.filter(l => l.status === 'new').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-blue-600">En Revisión</span>
                <p className="text-2xl font-black text-blue-600 mt-1">
                  {leads.filter(l => l.status === 'in_review').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-emerald-600">Contactados / Cerrados</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">
                  {leads.filter(l => l.status === 'contacted' || l.status === 'closed').length}
                </p>
              </div>
            </div>

            {/* Filtros y Buscador */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, empresa o ciudad..."
                  value={leadSearchTerm}
                  onChange={(e) => setLeadSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-[#55A2DC]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-[#55A2DC]"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="new">Nuevos</option>
                  <option value="in_review">En Revisión</option>
                  <option value="contacted">Contactados</option>
                  <option value="closed">Cerrados</option>
                </select>

                <button
                  type="button"
                  onClick={fetchData}
                  className="p-2 text-slate-500 hover:text-[#55A2DC] bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Recargar datos"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#55A2DC]' : ''}`} />
                </button>
              </div>
            </div>

            {/* Tabla de Leads */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Fecha</th>
                      <th className="py-3.5 px-4">Cliente / Empresa</th>
                      <th className="py-3.5 px-4">Contacto</th>
                      <th className="py-3.5 px-4">Servicio Solicitado</th>
                      <th className="py-3.5 px-4">Ciudad</th>
                      <th className="py-3.5 px-4">Estado</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No se encontraron solicitudes registradas.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-800">{lead.name}</p>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Building className="w-3 h-3 text-slate-400" />
                              {lead.company || 'Particular'}
                            </p>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/51${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${lead.name}, te contactamos desde SoloPromo respecto a tu solicitud de cotización.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded font-semibold text-[11px]"
                              >
                                <Phone className="w-3 h-3" />
                                {lead.phone}
                              </a>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate max-w-[180px] mt-0.5">{lead.email}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block bg-blue-50 text-[#55A2DC] border border-blue-100 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                              {lead.service || 'General'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {lead.city || 'Lima'}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-hidden cursor-pointer ${
                                lead.status === 'new'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : lead.status === 'in_review'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : lead.status === 'contacted'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <option value="new">Nuevo</option>
                              <option value="in_review">En Revisión</option>
                              <option value="contacted">Contactado</option>
                              <option value="closed">Cerrado</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 text-[#55A2DC] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Ver mensaje completo"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA 2: SERVICIOS (8 PILARES) ---------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Catálogo de Servicios Oficiales</h2>
                <p className="text-xs text-slate-500">Gestiona los textos, características y fotografías oficiales de los 8 pilares</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
                  <div className="relative h-44 bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={service.image_url || '/images/assets/p5_trade_marketing_falabella.webp'}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/images/assets/p5_trade_marketing_falabella.webp'; }}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-black text-slate-800 shadow-xs">
                      #{service.order_num} &bull; {service.slug}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{service.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{service.short_desc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">
                        {Array.isArray(service.features) ? `${service.features.length} características` : '0 características'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingService({ ...service })}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55A2DC] hover:text-white bg-blue-50 hover:bg-[#55A2DC] px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Editar Servicio
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA 3: PORTAFOLIO & CASOS DE ÉXITO ---------------- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Portafolio y Casos de Éxito</h2>
                <p className="text-xs text-slate-500">Añade o modifica los proyectos destacados con imágenes optimizadas a WebP</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingProject({
                    title: '',
                    client_name: '',
                    category: 'trade-marketing',
                    scope: '',
                    description: '',
                    image_url: '',
                    featured: 1,
                    order_num: portfolio.length + 1
                  });
                  setIsCreatingProject(true);
                }}
                className="inline-flex items-center gap-2 bg-[#55A2DC] hover:bg-[#4188bf] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nuevo Proyecto
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {portfolio.map((proj) => (
                <div key={proj.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col group">
                  <div className="relative h-40 bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={proj.image_url || '/images/assets/p5_trade_marketing_falabella.webp'}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = '/images/assets/p5_trade_marketing_falabella.webp'; }}
                    />
                    <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      {proj.client_name}
                    </span>
                  </div>

                  <div className="p-4 flex-grow flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#55A2DC] uppercase tracking-wider block">
                        {proj.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 mt-0.5 line-clamp-1">{proj.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{proj.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject({ ...proj });
                          setIsCreatingProject(false);
                        }}
                        className="p-1.5 text-slate-600 hover:text-[#55A2DC] hover:bg-slate-100 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Eliminar proyecto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA 4: MARCAS ALIADAS (CLIENTES) ---------------- */}
        {activeTab === 'clients' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Formulario Agregar Cliente */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs h-fit space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#55A2DC]" />
                Agregar Marca Aliada
              </h3>
              <p className="text-xs text-slate-500">Las marcas registradas aparecen automáticamente en el carrusel continuo.</p>

              <form onSubmit={handleAddClient} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre de la Marca</label>
                  <input
                    type="text"
                    placeholder="ej. Sony, Samsung, Lenovo"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-[#55A2DC]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Categoría</label>
                  <input
                    type="text"
                    placeholder="ej. Tecnología, Fotografía, Audio"
                    value={newClientCategory}
                    onChange={(e) => setNewClientCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-[#55A2DC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Eslogan o Productos Clave</label>
                  <input
                    type="text"
                    placeholder="ej. Ecosistema de Computación & Gaming"
                    value={newClientTagline}
                    onChange={(e) => setNewClientTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-[#55A2DC]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#55A2DC] hover:bg-[#4188bf] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Registrar Aliado
                </button>
              </form>
            </div>

            {/* Listado de Clientes */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-600">
                Marcas Registradas ({clients.length})
              </div>
              <div className="divide-y divide-slate-100">
                {clients.map((client) => (
                  <div key={client.id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">{client.name}</h4>
                      <p className="text-[11px] text-slate-500">{client.category} &bull; {client.tagline}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteClient(client.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar marca"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ---------------- PESTAÑA 5: COBERTURA & SEDES NACIONALES ---------------- */}
        {activeTab === 'coverage' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#55A2DC]" />
                  Gestión de Zonas de Cobertura & Ciudades
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Administra las macro-regiones y las ciudades activas que se muestran interactivamente en el mapa del Perú en la landing page.
                </p>
              </div>

              <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-full shrink-0">
                {coverageZones.length} Macro-Regiones Activas
              </span>
            </div>

            {/* Grid de Zonas de Cobertura */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverageZones.map((zone) => {
                const citiesList = Array.isArray(zone.cities) ? zone.cities : [];
                return (
                  <div
                    key={zone.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full ring-2 ring-slate-100"
                            style={{ backgroundColor: zone.badge_color || '#55A2DC' }}
                          />
                          <h4 className="text-base font-display font-extrabold text-slate-900">
                            {zone.name}
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                          {citiesList.length} Ciudades
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {zone.description}
                      </p>

                      {/* Lista de ciudades en la zona */}
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                          Ciudades Registradas en {zone.name}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {citiesList.map((city, cIdx) => (
                            <span
                              key={cIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200"
                            >
                              <MapPin className="w-3 h-3 text-[#55A2DC]" />
                              <span>{city.name}</span>
                              {city.is_hq && (
                                <span className="text-[9px] text-sky-700 font-extrabold bg-sky-100 px-1 rounded">
                                  HQ
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">
                        Slug: <code className="text-slate-600">{zone.slug}</code>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingZone({
                            ...zone,
                            cities: Array.isArray(zone.cities) ? [...zone.cities] : []
                          });
                          setNewCityName('');
                          setNewCityDept('');
                          setNewCityStaff('+10 Promotores');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-[#55A2DC] text-slate-700 hover:text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar Zona & Ciudades</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>


      {/* ---------------- MODAL: DETALLE DE LEAD ---------------- */}
      {selectedLead && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#55A2DC]" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Solicitud de Cotización #{selectedLead.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block">Cliente:</span>
                  <span className="font-bold text-slate-800">{selectedLead.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Empresa:</span>
                  <span className="font-bold text-slate-800">{selectedLead.company || 'No especificada'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Teléfono / WhatsApp:</span>
                  <span className="font-bold text-slate-800">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Correo:</span>
                  <span className="font-bold text-slate-800">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Servicio de Interés:</span>
                  <span className="font-bold text-[#55A2DC]">{selectedLead.service || 'General'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Ciudad / Región:</span>
                  <span className="font-bold text-slate-800">{selectedLead.city || 'Lima'}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Mensaje o Requerimiento del Cliente:</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-700 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                <span>Registrado el: {new Date(selectedLead.created_at).toLocaleString('es-PE')}</span>
                <span>IP: {selectedLead.ip_address || 'Local'}</span>
              </div>
            </div>

            {/* Acciones de Contacto Inmediato */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/51${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${selectedLead.name}, te saludamos desde SoloPromo respecto a tu consulta por el servicio de ${selectedLead.service || 'Trade Marketing'}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contactar por WhatsApp
              </a>
              <a
                href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(`SoloPromo - Cotización de ${selectedLead.service || 'Servicios'}`)}`}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Enviar Correo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: EDITAR SERVICIO ---------------- */}
      {editingService && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative space-y-4 my-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                Editar Pilar: {editingService.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Título</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subtítulo</label>
                  <input
                    type="text"
                    value={editingService.subtitle || ''}
                    onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción Corta</label>
                <textarea
                  rows={2}
                  value={editingService.short_desc}
                  onChange={(e) => setEditingService({ ...editingService, short_desc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción Detallada</label>
                <textarea
                  rows={4}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              {/* UPLOADER DE IMAGEN CON OPTIMIZACIÓN WEBP */}
              <div className="pt-2">
                <ImageUploader
                  currentImage={editingService.image_url}
                  onImageUploaded={(url) => setEditingService({ ...editingService, image_url: url })}
                  label="Fotografía del Servicio (Se optimizará a WebP)"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#55A2DC] hover:bg-[#4188bf] text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: CREAR / EDITAR PROYECTO ---------------- */}
      {editingProject && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 relative space-y-4 my-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                {isCreatingProject ? 'Nuevo Proyecto en Portafolio' : 'Editar Proyecto'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Título del Proyecto</label>
                  <input
                    type="text"
                    placeholder="ej. Promotoría Canon EOS R50"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cliente / Marca</label>
                  <input
                    type="text"
                    placeholder="ej. Canon, ASUS, TCL"
                    value={editingProject.client_name}
                    onChange={(e) => setEditingProject({ ...editingProject, client_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Categoría</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="trade-marketing">Trade Marketing</option>
                    <option value="eventos-corporativos">Eventos Corporativos</option>
                    <option value="btl">BTL (Activaciones)</option>
                    <option value="indoor">Indoor (Módulos)</option>
                    <option value="merchandising">Merchandising</option>
                    <option value="modulos-experiencia">Módulos de Experiencia</option>
                    <option value="branding">Branding de Espacios</option>
                    <option value="diseno-grafico">Diseño Gráfico</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Alcance / Locación</label>
                  <input
                    type="text"
                    placeholder="ej. Retail Moderno Nacional"
                    value={editingProject.scope || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, scope: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción del Caso de Éxito</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Detalles de la campaña o despliegue..."
                />
              </div>

              {/* UPLOADER DE IMAGEN CON OPTIMIZACIÓN WEBP */}
              <div className="pt-2">
                <ImageUploader
                  currentImage={editingProject.image_url}
                  onImageUploaded={(url) => setEditingProject({ ...editingProject, image_url: url })}
                  label="Fotografía del Proyecto (Compresión WebP automática)"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#55A2DC] hover:bg-[#4188bf] text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  {isCreatingProject ? 'Crear Proyecto' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: EDITAR ZONA DE COBERTURA & CIUDADES ---------------- */}
      {editingZone && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative space-y-5 my-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: editingZone.badge_color || '#55A2DC' }}
                />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Editar Zona & Ciudades: {editingZone.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingZone(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveZone} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre de la Macro-Región</label>
                  <input
                    type="text"
                    value={editingZone.name}
                    onChange={(e) => setEditingZone({ ...editingZone, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Color Identificador</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingZone.badge_color || '#55A2DC'}
                      onChange={(e) => setEditingZone({ ...editingZone, badge_color: e.target.value })}
                      className="w-10 h-9 p-0.5 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingZone.badge_color || '#55A2DC'}
                      onChange={(e) => setEditingZone({ ...editingZone, badge_color: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción Operativa de la Zona</label>
                <textarea
                  rows={2}
                  value={editingZone.description}
                  onChange={(e) => setEditingZone({ ...editingZone, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              {/* LISTA ACTUAL DE CIUDADES */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">
                    Ciudades Registradas ({editingZone.cities?.length || 0}):
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Se visualizan como pines interactivos en el mapa del Perú
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {(!editingZone.cities || editingZone.cities.length === 0) ? (
                    <p className="text-slate-400 text-center py-2">No hay ciudades registradas en esta zona.</p>
                  ) : (
                    editingZone.cities.map((city, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#55A2DC]" />
                          <span className="font-bold text-slate-800">{city.name}</span>
                          {city.dept && <span className="text-slate-400">({city.dept})</span>}
                          {city.staff && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                              {city.staff}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 bg-slate-50 px-1 rounded">
                            Pos: ({city.x}%, {city.y}%)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCityFromEditingZone(idx)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded cursor-pointer"
                          title="Eliminar ciudad"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* FORMULARIO PARA AGREGAR NUEVA CIUDAD */}
              <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 space-y-2.5">
                <span className="font-bold text-sky-900 block">
                  + Agregar Nueva Ciudad a {editingZone.name}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Nombre Ciudad (ej. Tumbes)"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Departamento (ej. Tumbes)"
                    value={newCityDept}
                    onChange={(e) => setNewCityDept(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Staff (ej. +8 Promotores)"
                    value={newCityStaff}
                    onChange={(e) => setNewCityStaff(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="text-[11px] font-bold">Posición en Mapa:</span>
                    <label className="flex items-center gap-1 text-[11px]">
                      X%:
                      <input
                        type="number"
                        min={5}
                        max={95}
                        value={newCityX}
                        onChange={(e) => setNewCityX(e.target.value)}
                        className="w-14 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-center font-bold"
                      />
                    </label>
                    <label className="flex items-center gap-1 text-[11px]">
                      Y%:
                      <input
                        type="number"
                        min={5}
                        max={95}
                        value={newCityY}
                        onChange={(e) => setNewCityY(e.target.value)}
                        className="w-14 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-center font-bold"
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCityToEditingZone}
                    className="px-3 py-1.5 bg-[#55A2DC] hover:bg-[#4188bf] text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar a lista</span>
                  </button>
                </div>
              </div>

              {/* BOTONES ACCIÓN */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingZone(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios en MySQL</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

