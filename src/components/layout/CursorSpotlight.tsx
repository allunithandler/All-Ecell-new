'use client';

import { useEffect, useState } from 'react';

export default function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 transition duration-300"
      style={{
        background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 53, 0.15), transparent 80%)`,
      }}
    />
  );
}
