"use client";
import Image from "next/image";

const partners = [
  { name: "GLA University", src: "/images/logo tagline (png).png" },
  { name: "NewGen IEDC GLAU", src: "/images/WhatsApp_Image_2019-11-26_at_10.33.01_PM-removebg-preview.png" },
  { name: "Up² StartInUp", src: "/images/upstart_logo (1).png" },
  { name: "Institution's Innovation Council", src: "/images/IIC LOGO.png" },
  { name: "StartUp LaunchPad", src: "/images/upstart_logo (1).png" },
  { name: "Genie", src: "/images/GenieLogo-01.png" },
  { name: "WLCM", src: "/images/wlcm-logo.png" },
  { name: "MeitY Startup Hub", src: "/images/WhatsApp Image 2026-03-06 at 12.53.57 AM-Photoroom.png" },
];

export default function Partners() {
  return (
    <section id="partners" className="py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-white">OUR PARTNERS</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Wrapper for the animation */}
        <div className="flex w-max animate-marquee items-center">
          {/* We repeat the list twice to create the seamless loop effect */}
          {[...partners, ...partners].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex-shrink-0 mx-8 sm:mx-16 w-[240px] h-[120px] relative transition-all duration-300 bg-card rounded-xl shadow-sm hover:shadow-md p-4 flex items-center justify-center border border-border"
            >
              <div className="relative w-full h-full">
                <Image 
                  src={p.src} 
                  alt={p.name} 
                  fill 
                  className="object-contain" 
                  unoptimized
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
