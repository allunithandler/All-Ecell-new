'use client';

import { useEffect, useState } from 'react';

export function usePerformance() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device capabilities
    const isLowEndDevice = navigator.hardwareConcurrency <= 2;
    const hasLimitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
    
    // Check connection speed
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    setIsLowPerformance(prefersReducedMotion || isLowEndDevice || hasLimitedMemory || isSlowConnection);
  }, []);

  return { isLowPerformance };
}

export function useRAF(callback: () => void, deps: any[] = []) {
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      callback();
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, deps);
}