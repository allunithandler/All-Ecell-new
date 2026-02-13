"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validators/contact";
import { Mail, Phone, MapPin, Check, Loader2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

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

        // Fade in form (left)
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        });

        // Fade in info (right)
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%',
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.4
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactInput) => {
    try {
      // Send email via API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <section className="py-20" id="contact" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2
          className="section-title text-4xl md:text-5xl font-bold text-center text-orange-500 mb-16 uppercase tracking-tight"
        >
          Contact
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Side: Contact Form */}
          <div
            className="contact-form w-full lg:w-1/2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name <span className="text-orange-500">*</span></label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 outline-none bg-neutral-900 text-white placeholder:text-neutral-500
                    ${errors.name 
                      ? "border-red-500 bg-red-900/20" 
                      : "border-neutral-800 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)]"
                    }`}
                />
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email <span className="text-orange-500">*</span></label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 outline-none bg-neutral-900 text-white placeholder:text-neutral-500
                    ${errors.email 
                      ? "border-red-500 bg-red-900/20" 
                      : "border-neutral-800 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)]"
                    }`}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject <span className="text-orange-500">*</span></label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  {...register("subject")}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 outline-none bg-neutral-900 text-white placeholder:text-neutral-500
                    ${errors.subject 
                      ? "border-red-500 bg-red-900/20" 
                      : "border-neutral-800 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)]"
                    }`}
                />
                {errors.subject && (
                  <span className="text-xs text-red-500 mt-1">{errors.subject.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message <span className="text-orange-500">*</span></label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Your message here..."
                  {...register("message")}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 outline-none resize-none bg-neutral-900 text-white placeholder:text-neutral-500
                    ${errors.message 
                      ? "border-red-500 bg-red-900/20" 
                      : "border-neutral-800 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)]"
                    }`}
                />
                {errors.message && (
                  <span className="text-xs text-red-500 mt-1">{errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {isSuccess && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2" role="alert">
                  <Check size={20} /> Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Right Side: Info & Map */}
          <div
            className="contact-info w-full lg:w-1/2 space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 flex items-center gap-6 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</h3>
                  <p className="text-lg font-medium text-white">ecell@gla.ac.in</p>
                </div>
              </div>

              <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 flex items-center gap-6 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</h3>
                  <p className="text-lg font-medium text-white">+91 8076527770</p>
                </div>
              </div>

              <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 flex items-center gap-6 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</h3>
                  <p className="text-lg font-medium text-white leading-snug">
                    GLA University, 17km Stone, NH-19<br />
                    Mathura-Delhi Road, Chaumuhan<br />
                    Bharthia, Uttar Pradesh 281406
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-sm border border-neutral-800 bg-neutral-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6077314065445!2d77.5933257!3d27.6056887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bffc039%3A0xfe5fc3da92c6341!2sGLA%20University!5e0!3m2!1sen!2sin!4v1707474427402!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
