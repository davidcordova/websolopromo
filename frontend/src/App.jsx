import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import WhyUsSection from './components/whyus/WhyUsSection';
import ClientsMarquee from './components/clients/ClientsMarquee';
import ServicesSection from './components/services/ServicesSection';
import WorkflowSection from './components/workflow/WorkflowSection';
import PortfolioSection from './components/portfolio/PortfolioSection';
import TestimonialsSection from './components/testimonials/TestimonialsSection';
import CoverageMap from './components/coverage/CoverageMap';
import InfrastructureSection from './components/infrastructure/InfrastructureSection';
import AboutUs from './components/about/AboutUs';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('solopromo_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [preSelectedService, setPreSelectedService] = useState('');

  // Escuchar cambios de hash (ej. #admin, #servicios, #contacto)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Verificar sesión existente al cargar
  useEffect(() => {
    const token = localStorage.getItem('solopromo_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setAdminUser(data.user);
            localStorage.setItem('solopromo_user', JSON.stringify(data.user));
          } else {
            // Token inválido o expirado
            localStorage.removeItem('solopromo_token');
            localStorage.removeItem('solopromo_user');
            setAdminUser(null);
          }
        })
        .catch(() => {
          // Ignorar error de red si estamos offline
        });
    }
  }, []);

  const handleSelectServiceToQuote = (serviceTitle) => {
    setPreSelectedService(serviceTitle);
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = () => {
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setCurrentHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('solopromo_token');
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        // Ignorar error en logout
      }
    }
    localStorage.removeItem('solopromo_token');
    localStorage.removeItem('solopromo_user');
    setAdminUser(null);
  };

  // VISTA ADMINISTRATIVA: Si el hash es #admin
  if (currentHash === '#admin') {
    if (adminUser) {
      return (
        <AdminDashboard
          user={adminUser}
          onLogout={handleLogout}
          onBackToSite={handleBackToSite}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={(user) => setAdminUser(user)}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // VISTA PÚBLICA PRINCIPAL
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative selection:bg-[#55A2DC] selection:text-white">
      
      {/* Barra de Navegación Superior */}
      <Navbar onOpenQuoteModal={handleOpenQuote} />

      {/* Contenido Principal */}
      <main className="flex-grow">
        {/* 1. Hero Principal con Estadísticas y CTA */}
        <Hero onOpenQuoteModal={handleOpenQuote} />

        {/* 2. ¿Por qué las marcas líderes trabajan con nosotros? (Diferenciación) */}
        <WhyUsSection onOpenQuoteModal={handleOpenQuote} />

        {/* 3. Socios Estratégicos & Marcas Líderes (Marquee + Despliegue Retail) */}
        <ClientsMarquee />

        {/* 4. Nuestros 8 Pilares de Servicio */}
        <ServicesSection onSelectServiceToQuote={handleSelectServiceToQuote} />

        {/* 5. Cómo Trabajamos (Metodología en 5 pasos) */}
        <WorkflowSection onOpenQuoteModal={handleOpenQuote} />

        {/* 6. Portafolio y Casos de Éxito en Retail */}
        <PortfolioSection />

        {/* 7. Prueba Social & Testimonios con Métricas */}
        <TestimonialsSection />

        {/* 8. Cobertura a Nivel Nacional (Llegamos donde tu marca necesita estar) */}
        <CoverageMap />

        {/* 9. Infraestructura y Capacidad Operativa */}
        <InfrastructureSection />

        {/* 10. ¿Quiénes Somos? Nosotros & 12 Años de Experiencia */}
        <AboutUs />

        {/* 11. ¿Tienes un proyecto en mente? Formulario Conectado a MySQL */}
        <ContactSection preSelectedService={preSelectedService} />
      </main>

      {/* Pie de Página con Enlace a Consola Administrativa */}
      <Footer />

      {/* Botón Flotante de WhatsApp */}
      <FloatingWhatsApp />

    </div>
  );
}
