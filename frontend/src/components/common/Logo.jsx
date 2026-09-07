import React from 'react';

export default function Logo({ size = 'default', isDark = false }) {
  const isSmall = size === 'sm';

  return (
    <div className="flex items-center gap-2 select-none cursor-pointer group">
      {/* Logotipo Oficial Fiel a la Imagen Adjunta */}
      <div className="flex items-center">
        <img
          src="/images/logo_official_transparent.png"
          alt="SOPORTE PROMOCIONAL"
          className={`object-contain transition-transform duration-300 group-hover:scale-103 ${
            isSmall ? 'h-9 w-auto' : 'h-11 sm:h-12 w-auto'
          } ${isDark ? 'brightness-125 filter contrast-125' : ''}`}
        />
      </div>
    </div>
  );
}
