"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(leftRef.current, { autoAlpha: 0, x: -40 });
      gsap.set(rightRef.current, { autoAlpha: 0, x: 40 });
      gsap.to(leftRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
      gsap.to(rightRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[3fr_2fr] gap-10 items-center">
        <div ref={leftRef}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white break-words text-balance">Entrepreneurship Cell, GLA University, Mathura</h2>
          <p className="mt-4 text-neutral-300 break-words text-balance">
            Student-run, non-profit organization solely formed with the purpose of inspiring & guiding start-ups and believes that
            Entrepreneurship is the key to India&apos;s development. We aim to develop an Entrepreneurial Spirit among students and share a
            vision to foster innovation and budding ideas in youth.
          </p>
        </div>
        <div ref={rightRef} className="flex justify-center">
          <div className="relative w-full aspect-square max-w-[400px]">
            <Image
              src="/images/Gemini_Generated_Image_f3trmmf3trmmf3tr (1).png"
              alt="E-Cell GLAU 3D Logo"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(255,107,53,0.3)]"
              priority
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}