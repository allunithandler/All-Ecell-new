"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
});

import { NoiseBackground } from "@/components/ui/noise-background";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Text Reveal
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5,
      });

      gsap.from('.hero-subtitle', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.7,
      });

      // Parallax Scroll
      gsap.to('.parallax-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 300,
        opacity: 0,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section relative h-[100svh]">
      <div className="parallax-element absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black z-10 pointer-events-none" />
        <HeroCanvas />
      </div>
      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full max-w-3xl" ref={textRef}>
          <h1 className="hero-title font-bold leading-tight text-[clamp(2.75rem,7vw,5rem)] break-words text-balance">
            Entrepreneurship Cell
          </h1>
          <h2 className="hero-subtitle mt-2 text-2xl sm:text-3xl text-neutral-700 dark:text-neutral-300 break-words text-balance">
            GLA University, Mathura
          </h2>
          <p className="hero-subtitle mt-3 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 break-words text-balance">
            IDEAS. ACTIONS. RESULTS.
          </p>
          <p className="hero-subtitle mt-1 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
            Where students don&apos;t just dream, they build.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }} // Increased delay to match GSAP
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <NoiseBackground
              containerClassName="w-fit p-2 rounded-full"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}
            >
              <a
                href="#startups"
                className="inline-block h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-5 py-2.5 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]"
              >
                Explore Startups
              </a>
            </NoiseBackground>

            <NoiseBackground
              containerClassName="w-fit p-2 rounded-full"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}
            >
              <a
                href="#join"
                className="inline-block h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-5 py-2.5 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]"
              >
                Join E-Cell
              </a>
            </NoiseBackground>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-6 text-[#FF6B35]"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown className="w-7 h-7" />
      </motion.div>
    </section>
  );
}
