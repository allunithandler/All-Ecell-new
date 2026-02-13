"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

type Member = {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
};

const placeholderMembers: Member[] = [
  { name: "Member One", role: "Lead", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400" },
  { name: "Member Two", role: "Coordinator", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400" },
  { name: "Member Three", role: "Design", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400" },
  { name: "Member Four", role: "Operations", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400" },
  { name: "Member Five", role: "Marketing", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400" },
  { name: "Member Six", role: "Tech", photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=400&h=400" },
  { name: "Member Seven", role: "Events", photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400&h=400" },
  { name: "Member Eight", role: "Outreach", photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=400" },
];

const tabs = Array.from({ length: 11 }, (_, i) => {
  const version = (i + 1).toFixed(1);
  return {
    key: version,
    label: `Team Council ${version}`,
    data: placeholderMembers.map((m, idx) => ({
      ...m,
      name: `${m.name.split(' ')[0]} ${version}.${idx + 1}`
    }))
  };
});

function Card({ m }: { m: Member }) {
  return (
    <motion.article
      className="group relative w-full h-[350px] rounded-2xl bg-[#1a1a1a] border border-neutral-800 p-6 text-white"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-[#FF6B35] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex flex-col items-center h-full relative z-10">
        <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#f97316]">
          <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-[#1a1a1a]">
            <Image src={m.photo} alt={m.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-center group-hover:text-[#FF6B35] transition-colors">{m.name}</h3>
        <div className="h-[2px] w-[40px] bg-[#FF6B35] rounded-full mt-2 group-hover:w-[60px] transition-all" />
        <p className="mt-2 text-neutral-400 text-sm text-center uppercase tracking-wider">{m.role}</p>
        <div className="mt-auto flex items-center justify-center">
          <a href={m.linkedin || "#"} aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Team() {
  const [active, setActive] = useState(tabs[tabs.length - 1].key);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const activeData = useMemo(() => tabs.find((t) => t.key === active)!, [active]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="bg-transparent py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight">STUDENT COUNCIL</h2>
          <div className="h-1 w-20 bg-[#FF6B35] mx-auto mt-4 rounded-full" />
        </div>

        {/* Sliding Tabs Section */}
        <div className="relative group max-w-4xl mx-auto mb-16">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#1a1a1a] border border-neutral-800 text-white hover:bg-[#FF6B35] transition-colors shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-4 py-4 mask-fade-edges"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex-shrink-0 px-6 py-2 rounded-full border transition-all duration-300 ${
                  active === t.key 
                    ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-[0_0_20px_rgba(255,107,53,0.3)]' 
                    : 'bg-[#1a1a1a] border-neutral-800 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                <span className="text-sm sm:text-base font-medium whitespace-nowrap">{t.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#1a1a1a] border border-neutral-800 text-white hover:bg-[#FF6B35] transition-colors shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Team Grid */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {activeData.data.map((m) => (
                <Card key={`${active}-${m.name}`} m={m} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

