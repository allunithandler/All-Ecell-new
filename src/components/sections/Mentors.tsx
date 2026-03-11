"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Mentor {
  name: string;
  role: string;
  image: string;
}

const MENTORS: Mentor[] = [
  {
    name: "Dr. Pramod Joshi",
    role: "External Mentor",
    image: "/images/Pramod-Sir.png"
  },
  {
    name: "Prof. Anoop Kumar Gupta",
    role: "Chief Patron",
    image: "/images/Anoop-Sir.jpeg"
  },
  {
    name: "Deepak Sharma",
    role: "Chief Mentor",
    image: "/images/Deepak_Sir.png"
  },
  {
    name: "Abhishek Pratap Gautam",
    role: "StartUp Mentor",
    image: "/images/Abhishek_Sir.png"
  },
  {
    name: "Jitendra Sharma",
    role: "Activity Mentor",
    image: "/images/Jitendra_Sir.png"
  }
];

export default function Mentors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Fade In Title
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Stagger Cards
      gsap.from('.mentor-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 text-white" id="mentors">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 uppercase tracking-tight">
          Mentors
        </h2>

        <div ref={containerRef} className="flex flex-wrap justify-center gap-8">
          {MENTORS.map((mentor, index) => (
            <div
              key={index}
              className="mentor-card w-full max-w-[320px]"
            >
              <div 
                className="group relative h-[400px] w-full bg-[#1a1a1a] rounded-2xl p-8 border-2 border-transparent hover:border-[#FF6B35] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* 3D Container */}
                <div className="relative w-full h-full flex flex-col items-center transform transition-transform duration-400 group-hover:-translate-y-4 group-hover:translate-z-20 group-hover:rotate-x-5 group-hover:-rotate-y-5">
                  <div className="relative w-[180px] h-[200px] mb-6 rounded-lg overflow-hidden p-[3px] bg-gradient-to-br from-[#FF6B35] to-orange-600">
                    <div className="w-full h-full rounded-lg overflow-hidden bg-black relative">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        className="object-cover transition-all duration-400 group-hover:scale-110 group-hover:brightness-110"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    {mentor.name}
                  </h3>
                  
                  <div className="w-12 h-0.5 bg-[#FF6B35] mb-3 mx-auto" />
                  
                  <p className="text-[#FF6B35] font-medium text-center">
                    {mentor.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
