import { useState, useEffect, useRef } from 'react';

/**
 * Hook para obtener la posición de scroll vertical con requestAnimationFrame
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

/**
 * Hook para calcular desplazamiento parallax a diferentes velocidades
 */
export function useParallax(speed = 0.15) {
  const scrollY = useScrollY();
  return Math.round(scrollY * speed);
}

/**
 * Hook para activar animaciones cuando los elementos entran en el viewport (Scroll Reveal)
 */
export function useRevealOnScroll() {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Si el navegador no soporta IntersectionObserver, revelar por defecto
    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isRevealed];
}

/**
 * Hook interactivo para efecto 3D Parallax Tilt con el cursor del ratón
 */
export function useMouse3DTilt(maxAngle = 10) {
  const [transform, setTransform] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxAngle;
    const rotateY = ((x - centerX) / centerX) * maxAngle;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return {
    ref: cardRef,
    style: {
      transform: transform || undefined,
      transition: transform ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      willChange: 'transform'
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };
}

/**
 * Hook interactivo para desplazamiento independiente de múltiples capas (Spatial Parallax)
 */
export function useMultiLayerMouse(maxShift = 25) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setOffset({
      x: Math.max(-1, Math.min(1, x)) * maxShift,
      y: Math.max(-1, Math.min(1, y)) * maxShift
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return { containerRef, offset, handleMouseMove, handleMouseLeave };
}

