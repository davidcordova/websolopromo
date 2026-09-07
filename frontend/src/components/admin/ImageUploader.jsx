import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileImage, Sparkles, Loader2, X, RefreshCw } from 'lucide-react';

export default function ImageUploader({ currentImage = '', onImageUploaded, label = 'Imagen del Proyecto / Servicio' }) {
  const [preview, setPreview] = useState(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const formatBytes = (bytes, decimals = 1) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP, etc.).');
      return;
    }

    setError('');
    setIsUploading(true);
    setUploadStats(null);

    // Previsualización local inmediata
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const token = localStorage.getItem('solopromo_token');
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al optimizar y subir la imagen');
      }

      setPreview(data.url);
      setUploadStats({
        originalSize: data.original_size,
        optimizedSize: data.optimized_size,
        savingsPercentage: data.savings_percentage,
        width: data.width,
        height: data.height,
        filename: data.filename
      });

      if (onImageUploaded) {
        onImageUploaded(data.url, data);
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error al subir la imagen.');
      setPreview(currentImage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview('');
    setUploadStats(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onImageUploaded) onImageUploaded('', null);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <FileImage className="w-3.5 h-3.5 text-[#55A2DC]" />
          {label}
        </label>
        <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Conversión WebP Ultra-HD activa
        </span>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 cursor-pointer text-center bg-white ${
          isDragOver
            ? 'border-[#55A2DC] bg-blue-50/50 scale-[1.01]'
            : 'border-slate-200 hover:border-[#55A2DC]/60 hover:bg-slate-50/50'
        } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {preview ? (
          <div className="relative group/img flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-36 h-28 rounded-lg overflow-hidden border border-slate-200 shadow-xs bg-slate-100 shrink-0">
              <img
                src={preview}
                alt="Vista previa"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/logo_official_transparent.png';
                }}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <Loader2 className="w-6 h-6 animate-spin text-[#55A2DC] mb-1" />
                  <span className="text-[10px] font-bold">Optimizando...</span>
                </div>
              )}
            </div>

            <div className="flex-grow text-left space-y-1.5 w-full">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Imagen lista y vinculada
                </p>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Quitar imagen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {uploadStats ? (
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Tamaño original:</span>
                    <span className="font-semibold text-slate-700">{formatBytes(uploadStats.originalSize)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Peso optimizado (WebP):</span>
                    <span className="font-bold text-emerald-600">{formatBytes(uploadStats.optimizedSize)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-1 mt-1 text-[11px]">
                    <span className="text-slate-500">Ahorro de espacio:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                      -{uploadStats.savingsPercentage}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate pt-0.5">
                    Resolución: {uploadStats.width} × {uploadStats.height} px
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Haz clic o arrastra otra imagen aquí si deseas reemplazarla.
                </p>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="text-xs font-semibold text-[#55A2DC] hover:text-[#4188bf] flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Cambiar imagen
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#55A2DC]">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-700">
                Arrastra una imagen aquí o <span className="text-[#55A2DC] underline">explora tus archivos</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Soporta JPG, PNG, WEBP. El servidor la optimizará automáticamente a WebP de alta fidelidad.
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
