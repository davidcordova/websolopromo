import { SERVICES, CLIENTS } from '../data/solopromoData';

// La URL base detecta si estamos en desarrollo local (Vite) o en producción cPanel
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost/solopromo/backend/api'
    : '/api');

export const apiService = {
  // Estado del servidor y conexión a MySQL
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API Health check failed (fallback offline mode activo):', err.message);
      return { success: false, offline: true };
    }
  },

  // Obtener los 8 servicios oficiales
  async getServices() {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    } catch (err) {
      console.info('Usando servicios locales preconfigurados.');
    }
    return SERVICES;
  },

  // Obtener clientes aliados
  async getClients() {
    try {
      const res = await fetch(`${API_BASE_URL}/clients`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    } catch (err) {
      console.info('Usando clientes locales preconfigurados.');
    }
    return CLIENTS;
  },

  // Enviar formulario de contacto / cotización a la base de datos MySQL mediante PHP
  async submitContact(formData) {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.errors ? json.errors.join(' ') : (json.error || 'Error al enviar formulario'));
      }
      return json;
    } catch (err) {
      // Si el backend local no está corriendo o falla el puerto, arrojamos el error para avisar al usuario
      throw err;
    }
  }
};
