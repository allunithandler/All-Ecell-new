'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Reduced from 2.5s to 1.8s

    // Also check if document is ready
    if (document.readyState === 'complete') {
      const quickTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => {
        clearTimeout(timer);
        clearTimeout(quickTimer);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }} // Faster transition
            className="fixed inset-0 z-[9999]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }} // Adjusted timing
      >
        {children}
      </motion.div>
    </>
  );
}
