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
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Prof. Anoop Kumar Gupta",
    role: "Chief Patron",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Deepak Sharma",
    role: "Chief Mentor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Abhishek Pratap Gautam",
    role: "StartUp Mentor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Jitendra Sharma",
    role: "Activity Mentor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400"
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
                  
                  {/* E-Cell Badge */}
                  <div className="absolute top-0 left-0 bg-[#FF6B35] text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg">
                    E-Cell
                  </div>

                  {/* Photo Frame */}
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

                  {/* Info */}
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
