'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLazyImage } from '@/lib/hooks/useIntersectionObserver';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  lazy = true,
  ...props
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  
  // Use intersection observer for lazy loading
  const {
    ref,
    src: lazySrc,
    isLoaded,
    onLoad: handleLazyLoad,
    isIntersecting
  } = useLazyImage(src);

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  const handleLoad = () => {
    handleLazyLoad();
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
    
    // Try fallback strategies
    if (!fallbackSrc) {
      // Try removing query parameters
      const cleanSrc = src.split('?')[0];
      if (cleanSrc !== src) {
        setFallbackSrc(cleanSrc);
        setHasError(false);
        return;
      }
      
      // Try different format
      if (src.includes('.webp')) {
        setFallbackSrc(src.replace('.webp', '.jpg'));
        setHasError(false);
        return;
      }
    }
  };

  // Determine which src to use
  const imageSrc = fallbackSrc || (lazy && !priority ? lazySrc : src);
  const shouldShowImage = !lazy || priority || isIntersecting;

  // Error fallback component
  if (hasError && !fallbackSrc) {
    return (
      <div 
        ref={ref as any}
        className={cn(
          "flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
          className
        )}
        style={{ width, height }}
      >
        <svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }

  return (
    <div ref={ref as any} className={cn("relative", className)}>
      {shouldShowImage && imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          quality={quality}
          sizes={sizes || (fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined)}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      )}
      
      {/* Loading skeleton */}
      {(!shouldShowImage || !isLoaded) && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse",
            "flex items-center justify-center"
          )}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}