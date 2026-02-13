"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Linkedin, Sparkles, Mountain, Mic, Megaphone, Lightbulb, DoorOpen, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  img: string;
};

const items: Item[] = [
  {
    key: "linkedinlocal",
    title: "LinkedinLocal Mathura",
    desc:
      "Initiative aimed at synergizing with dynamic people passionate about entrepreneurship, leadership and research.",
    icon: <Linkedin className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "sparkl-tbi",
    title: "SPARKL TBI",
    desc:
      "StartUp Empowering Innovation and Entrepreneurship for Economic Growth and Technological Advancement",
    icon: <Sparkles className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "tedxglau",
    title: "TEDxGLAU",
    desc:
      "TED talks and live speakers combine to spark deep discussion and connection at GLA University, Mathura.",
    icon: <Megaphone className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://placehold.co/800x600/FF6B35/white?text=TEDxGLAU",
  },
  {
    key: "e2summit",
    title: "E²Summit (E-Conclave)",
    desc:
      "Flagship 3-day event with talkshows, competitions, and workshops across campus.",
    icon: <Mountain className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "founders-talk",
    title: "Founders Talk",
    desc: "Insights from operators and alumni founders.",
    icon: <Mic className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "pitch-cafe",
    title: "Pitch Cafe",
    desc: "Practice pitching with feedback from mentors and peers.",
    icon: <Megaphone className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "ideathon",
    title: "Ideathon",
    desc: "Generate and refine startup ideas with guided sprints.",
    icon: <Lightbulb className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "open-house",
    title: "Open House",
    desc: "Showcase student projects and startups.",
    icon: <DoorOpen className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "snack-chat",
    title: "Snack Chat",
    desc: "Casual conversations on ideas and execution.",
    icon: <MessageSquare className="w-8 h-8 text-[#FF6B35]" />,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Initiatives() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Fade In Section
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Stagger Cards (Swiper Slides)
      // Note: Swiper renders slides dynamically, but we can target the wrapper or initial slides
      // For Swiper, simple fade in of the container is often safer, but let's try to animate the container
      gsap.from(swiperRef.current, {
        scrollTrigger: {
          trigger: swiperRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="initiatives" ref={sectionRef} className="py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center uppercase tracking-tight">
          Our Initiatives
        </h2>
        
        <div ref={swiperRef} className="relative">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {items.map((item) => (
              <SwiperSlide key={item.key}>
                <div className="group h-full bg-[#1a1a1a] rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#FF6B35] transition-colors">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4">
                      {item.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-neutral-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
