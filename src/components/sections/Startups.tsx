"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { NoiseBackground } from "@/components/ui/noise-background";

type Startup = {
  key: string;
  name: string;
  founder: string;
  desc: string;
  img?: string;
  tags: string[];
};

const startups: Startup[] = [
  {
    key: "tredmolen",
    name: "Tredmolen E-Cycle Pvt. Ltd",
    founder: "Mr. Sachin Singh Sengar",
    desc:
      "This is a manufacturing unit, blending three products into a single convertible bike, giving rise a product which can be used as Treadmill, Cycle, E-bike, sold under the name 'Tred-E-cycle'. The company is registered as Tredmolen -E-Cycle Pvt. Ltd. This is a perfect amalgamation of useful products to create something extraordinary.",
    img: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&q=80&w=800",
    tags: ["Manufacturing", "Fitness", "Mobility"],
  },
  {
    key: "merikitaab",
    name: "Meri Kitaab Pvt. Ltd.",
    founder: "Mr. Shiv Kumar Sharma",
    desc:
      "A comprehensive approach to make learning easier and interesting, by providing school books and stationery online, a one-stop online shop for all your school-related stuff. This start-up is supporting the new, better way of buying school products and has proven to be trustworthy and convenient in school learning.",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    tags: ["EdTech", "E-commerce", "Stationery"],
  },
  {
    key: "heptism",
    name: "Heptism",
    founder: "Mr. Atul Maurya",
    desc:
      "A start-up providing IT services and IT consulting, using technology to assist their clients in establishing a brand identity for their ventures. Be it website development, application development or digital marketing, they provide exclusive solutions to their clients, as per their requirements.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["IT Services", "Consulting", "Marketing"],
  },
];

export default function Startups() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Section Fade In
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Stagger Cards
      const cards = gridRef.current?.querySelectorAll("[data-card]");
      if (!cards) return;
      
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      cards.forEach((c) => {
        c.addEventListener("mouseenter", () => {
          gsap.to(c, {
            y: -15,
            rotateX: 5,
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
          const border = c.querySelector("[data-border]");
          if (border) gsap.to(border, { opacity: 1, duration: 0.3 });
        });
        c.addEventListener("mouseleave", () => {
          gsap.to(c, {
            y: 0,
            rotateX: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.4,
            ease: "power2.out",
          });
          const border = c.querySelector("[data-border]");
          if (border) gsap.to(border, { opacity: 0, duration: 0.3 });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="startups" ref={sectionRef} className="py-20">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="section-title text-center text-foreground text-4xl sm:text-5xl font-bold">STARTUPS</h2>
        <div ref={gridRef} className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {startups.map((s) => (
            <article
              key={s.key}
              data-card
              className="relative p-8 rounded-2xl bg-card border border-border"
            >
              <div data-border className="absolute inset-0 rounded-2xl p-[2px] bg-[var(--gradient)] opacity-0 pointer-events-none" />
              {s.img && (
                <div className="relative h-[140px] w-full rounded-xl overflow-hidden mb-4">
                  <Image src={s.img} alt={s.name} fill className="object-cover" />
                </div>
              )}
              <h3 className="text-xl font-bold text-card-foreground">{s.name}</h3>
              <p className="mt-1 text-sm text-[#FF6B35]">By {s.founder}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full border border-[#FF6B35] text-[#FF6B35]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <NoiseBackground
                  containerClassName="w-fit p-2 rounded-full"
                  gradientColors={[
                    "rgb(255, 100, 150)",
                    "rgb(100, 150, 255)",
                    "rgb(255, 200, 100)",
                  ]}
                >
                  <button className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-5 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
                    Learn More
                  </button>
                </NoiseBackground>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}