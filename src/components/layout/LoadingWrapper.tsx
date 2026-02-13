'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading or wait for window load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds for the hamster to run

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
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
