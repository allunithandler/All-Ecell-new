'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '@/lib/hooks/usePerformance';

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { isLowPerformance } = usePerformance();

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight || isLowPerformance) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        spotlight.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      spotlight.style.opacity = '0';
    };

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Smooth interpolation with optimized easing
      const ease = 0.12;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;
      
      // Only update if movement is significant (reduces repaints)
      const deltaX = Math.abs(currentX - mouseX);
      const deltaY = Math.abs(currentY - mouseY);
      
      if (deltaX > 0.5 || deltaY > 0.5) {
        spotlight.style.background = `radial-gradient(280px at ${Math.round(currentX)}px ${Math.round(currentY)}px, rgba(255, 107, 53, 0.08), transparent 65%)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isLowPerformance]);

  // Don't render on low performance devices
  if (isLowPerformance) {
    return null;
  }

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-300"
      style={{
        background: 'radial-gradient(280px at 0px 0px, rgba(255, 107, 53, 0.08), transparent 65%)',
        willChange: 'background',
      }}
    />
  );
}
