"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import LightGallery from 'lightgallery/react';
import { NoiseBackground } from "@/components/ui/noise-background";

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if needed
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  title: string;
  width: number;
  height: number;
}

const CATEGORIES = [
  "All",
  "Events",
  "Workshops",
  "Competitions",
  "TEDx",
  "Meetings",
];

// Placeholder data - replace with actual images
const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", category: "Events", title: "Tech Summit 2024", width: 800, height: 600 },
  { id: 2, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800", category: "Meetings", title: "Core Team Meet", width: 800, height: 1200 },
  { id: 3, src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800", category: "Workshops", title: "Design Workshop", width: 800, height: 800 },
  { id: 4, src: "https://placehold.co/800x600/FF6B35/white?text=TEDxGLAU", category: "TEDx", title: "TEDxGLAU 2023", width: 800, height: 1000 },
  { id: 5, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", category: "Competitions", title: "Hackathon Finals", width: 800, height: 600 },
  { id: 6, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800", category: "Events", title: "Guest Lecture", width: 800, height: 1200 },
  { id: 7, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800", category: "Meetings", title: "Brainstorming Session", width: 800, height: 800 },
  { id: 8, src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800", category: "Events", title: "Networking Night", width: 800, height: 600 },
  { id: 9, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800", category: "Workshops", title: "Coding Bootcamp", width: 800, height: 1000 },
  { id: 10, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800", category: "Competitions", title: "Pitch Deck Day", width: 800, height: 600 },
  { id: 11, src: "https://images.unsplash.com/photo-1560523159-4a9692d222ef?auto=format&fit=crop&q=80&w=800", category: "TEDx", title: "Speaker Series", width: 800, height: 1200 },
  { id: 12, src: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800", category: "Meetings", title: "Annual General Meeting", width: 800, height: 800 },
];

interface LightGalleryInstance {
  refresh: () => void;
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(GALLERY_ITEMS);
  const lightGalleryRef = useRef<LightGalleryInstance | null>(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredItems(GALLERY_ITEMS);
    } else {
      setFilteredItems(GALLERY_ITEMS.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.refresh();
    }
  }, [filteredItems]);

  const onInit = (detail: { instance: LightGalleryInstance }) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
    }
  };

  return (
    <section className="py-20" id="gallery">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12 uppercase tracking-tight"
        >
          Gallery
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NoiseBackground
                containerClassName="w-fit p-1 rounded-full"
                gradientColors={
                  activeCategory === category
                    ? [
                        "rgb(255, 107, 53)", // Orange
                        "rgb(255, 140, 66)",
                        "rgb(255, 200, 100)",
                      ]
                    : [
                        "rgb(255, 100, 150)",
                        "rgb(100, 150, 255)",
                        "rgb(255, 200, 100)",
                      ]
                }
              >
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`h-full w-full cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-all duration-100 active:scale-95 ${
                    activeCategory === category
                      ? "bg-[#FF6B35] text-white shadow-md"
                      : "bg-linear-to-r from-neutral-100 via-neutral-100 to-white text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]"
                  }`}
                >
                  {category}
                </button>
              </NoiseBackground>
            </motion.div>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="min-h-[500px]">
             {/* Using LightGallery Component */}
             <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
                {filteredItems.map((item, index) => (
                    <a
                        key={`${item.id}-${activeCategory}`} // Force re-render for animation when category changes
                        href={item.src}
                        className="block break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in"
                        data-lg-size={`${item.width}-${item.height}`}
                        data-src={item.src}
                        data-sub-html={`<h4>${item.title}</h4>`}
                    >
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full"
                        >
                            <Image
                                src={item.src}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCABLAEsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z"
                                quality={75}
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }} // This might trigger incorrectly inside hidden overflow, simpler to just use CSS for hover state child
                                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center"
                                >
                                    <Eye className="w-8 h-8 mb-2" />
                                    <span className="font-semibold text-center">{item.title}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </a>
                ))}
             </LightGallery>
        </div>

        <div className="mt-12 flex justify-center">
          <NoiseBackground
            containerClassName="w-fit p-2 rounded-full mx-auto"
            gradientColors={[
              "rgb(255, 100, 150)",
              "rgb(100, 150, 255)",
              "rgb(255, 200, 100)",
            ]}
          >
            <button className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-5 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
              View All Photos &rarr;
            </button>
          </NoiseBackground>
        </div>
      </div>
    </section>
  );
}
