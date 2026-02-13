"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Atom, Rocket } from "lucide-react";

type Pillar = {
  key: string;
  icon: React.ReactNode;
  title: string;
  brief: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    key: "genie",
    icon: <Lightbulb className="w-12 h-12 text-[#FF6B35]" />,
    title: "GENIE",
    brief:
      "GLAU Ecosystem for Nurturing Innovation & Entrepreneurship.",
    description:
      "GLAU Ecosystem for Nurturing Innovation & Entrepreneurship will be an overarching ecosystem. It will have a new structure and a new Governance Model, to include all the entrepreneurship and innovation-based organizations launched and nurtured at GLA University.",
  },
  {
    key: "newgen-iedc",
    icon: <Atom className="w-12 h-12 text-[#FF6B35]" />,
    title: "NewGen IEDC",
    brief:
      "Programme by NSTEDB, DST to inculcate innovation & entrepreneurship among young students.",
    description:
      "New Generation Innovation and Entrepreneurship Development Centre is a programme launched by NSTEDB, DST, Govt. of India. NewGen IEDC aims to inculcate the spirit of innovation and entrepreneurship amongst the young S&T students, encourage and support start-up creation through guidance, mentorship and support.",
  },
  {
    key: "iic",
    icon: <Lightbulb className="w-12 h-12 text-[#FF6B35]" />,
    title: "IIC",
    brief:
      "Established as per the norms of Innovation Cell, Ministry of HRD, Govt. Of India.",
    description:
      "GLA University, Mathura has established Institution Innovation Council (IIC) as per the norms of Innovation Cell, Ministry of HRD, Govt. Of India during IIC Calendar year 2018-19.",
  },
  {
    key: "startup-launchpad",
    icon: <Rocket className="w-12 h-12 text-[#FF6B35]" />,
    title: "StartUp LaunchPad",
    brief:
      "Established to encourage students to start their own venture with currently 21 active teams.",
    description:
      "StartUp LaunchPad was established at GLA University, Mathura with the aim of encouraging students to start their own venture. Currently 21 different teams are working on different startups, out of these 12 are Physical Startups and 09 are working in virtual mode.",
  },
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      className="relative w-full h-full focus-visible:outline-none"
      aria-label={`${pillar.title} details`}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className="absolute inset-0 p-8 rounded-2xl bg-[#1a1a1a] border-2 border-transparent text-white flex flex-col items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>{pillar.icon}</div>
          <h3 className="mt-4 text-xl font-bold text-center">{pillar.title}</h3>
          <p className="mt-3 text-sm text-neutral-400 text-center max-w-prose">
            {pillar.brief}
          </p>
        </div>
        <div
          className="absolute inset-0 p-8 rounded-2xl text-white flex flex-col items-center justify-between"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            backgroundImage: "var(--gradient)",
          }}
        >
          <div className="text-center text-sm sm:text-base">{pillar.description}</div>
          <div>
            <span className="inline-block px-5 py-2 rounded border border-white text-white hover:bg-white hover:text-black transition-colors">Learn More</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Pillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll("[data-pillar]");
      if (!items) return;
      gsap.set(items, { autoAlpha: 0, y: 60 });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="genie" ref={sectionRef} className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-white text-3xl sm:text-4xl font-bold">E-CELL GLAU & ITS PILLARS</h2>
        <div ref={gridRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <div key={p.key} data-pillar className="h-[260px]">
              <PillarCard pillar={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}