"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, CalendarDays, Mic, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Stat = { icon: React.ReactNode; label: string; target: number };

const stats: Stat[] = [
  { icon: <Users className="w-6 h-6" />, label: "Members", target: 2500 },
  { icon: <CalendarDays className="w-6 h-6" />, label: "Events", target: 36 },
  { icon: <Mic className="w-6 h-6" />, label: "Talks", target: 60 },
  { icon: <Rocket className="w-6 h-6" />, label: "StartUps", target: 40 },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Stagger Cards Animation
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Counter Animation
      const counters = document.querySelectorAll('.stat-counter');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
          },
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val).toLocaleString() + "+";
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <article
              key={s.label}
              className="stat-card group p-8 rounded-2xl bg-[#1a1a1a] border border-neutral-800 text-white shadow-[0_0_0_0_rgba(0,0,0,0)] transition-transform duration-300 ease-out hover:-translate-y-[10px] hover:shadow-[0_0_20px_rgba(255,107,53,0.35)]"
            >
              <div className="text-[#FF6B35] mb-4">{s.icon}</div>
              <div className="text-[3rem] leading-none font-bold text-[#FF6B35]">
                <span className="stat-counter" data-target={s.target}>0+</span>
              </div>
              <p className="mt-2 text-base">{s.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
