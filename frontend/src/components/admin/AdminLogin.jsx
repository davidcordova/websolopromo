import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck, Loader2, AlertCircle, KeyRound } from 'lucide-react';
import Logo from '../common/Logo';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Por favor ingresa tu usuario y contraseña.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_encode_or_string({ username: username.trim(), password: password.trim() })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Credenciales incorrectas');
      }

      localStorage.setItem('solopromo_token', data.token);
      localStorage.setItem('solopromo_user', JSON.stringify(data.user));

      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const json_encode_or_string = (obj) => JSON.stringify(obj);

  const handleFillCredentials = () => {
    setUsername('admin');
    setPassword('M1un1c4cl4v3');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex flex-col items-center justify-center p-4 relative select-none">
      
      {/* Botón de Retorno al Sitio */}
      <div className="absolute top-6 left-6">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#55A2DC] bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la Página Principal
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Tarjeta Principal */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden backdrop-blur-sm">
          
          {/* Acento lumínico superior con colores oficiales */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#55A2DC] via-[#4878AC] to-[#B56635]" />

          {/* Encabezado con Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-4">
              <Logo className="h-10" />
            </div>
            <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full text-xs font-bold text-slate-700 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#55A2DC]" />
              Consola de Administración CMS
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
              Acceso Administrativo
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Ingresa tus credenciales para gestionar el contenido y las cotizaciones
            </p>
          </div>

          {/* Alerta de Error */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo Usuario */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. admin"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#55A2DC] rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-3 focus:ring-[#55A2DC]/15 transition-all"
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#55A2DC] rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-3 focus:ring-[#55A2DC]/15 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#55A2DC] to-[#4188bf] hover:from-[#4895cc] hover:to-[#387bb0] text-white font-bold text-sm rounded-xl shadow-md shadow-[#55A2DC]/25 hover:shadow-lg hover:shadow-[#55A2DC]/30 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Ingresar al Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Acceso Rápido con credencial de demostración */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center">
            <button
              type="button"
              onClick={handleFillCredentials}
              className="text-xs font-semibold text-slate-500 hover:text-[#55A2DC] flex items-center gap-1.5 transition-colors cursor-pointer bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200/80"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#55A2DC]" />
              Autocompletar credenciales requeridas
            </button>
          </div>

        </div>

        {/* Footer del login */}
        <div className="text-center mt-6 text-xs text-slate-400">
          Soporte Promocional S.A.C. &copy; {new Date().getFullYear()} &bull; Panel Seguro
        </div>
      </div>
    </div>
  );
}
