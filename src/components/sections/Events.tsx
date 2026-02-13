"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  {
    title: "PitchCafe",
    desc: "Practice pitching with feedback from mentors and peers.",
    img: "/images/event-1.jpg",
  },
  {
    title: "Ideathon",
    desc: "Generate and refine startup ideas with guided sprints.",
    img: "/images/event-2.jpg",
  },
  {
    title: "ScaleUp",
    desc: "Workshops on scaling products, teams, and GTM.",
    img: "/images/event-3.jpg",
  },
];

export default function Events() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Fade in title
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

      // Fade in swiper container (staggering slides inside swiper can be tricky, so we fade the whole block or try targeting visible slides)
      gsap.from('.swiper-wrapper', {
        scrollTrigger: {
          trigger: '.swiper-container-wrapper',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      });
      
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="events" ref={sectionRef} className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-3xl sm:text-4xl font-bold text-white">Featured Events</h2>
        <p className="section-title mt-2 text-neutral-300">
        Join our talks, workshops, and competitions built to nurture founders.
      </p>
      <div className="swiper-container-wrapper mt-8">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            1024: { slidesPerView: 2.2 },
            1440: { slidesPerView: 3 },
          }}
        >
          {items.map((it) => (
            <SwiperSlide key={it.title}>
              <article className="rounded-lg overflow-hidden border border-transparent bg-[#1a1a1a]">
                <div className="aspect-[16/9] bg-neutral-800" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{it.title}</h3>
                  <p className="text-sm text-neutral-400 mt-1">{it.desc}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
    </section>
  );
}