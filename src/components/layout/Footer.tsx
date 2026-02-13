"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Twitter, Facebook, Instagram, Linkedin, ArrowRight, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('Subscribed!');
        setEmail('');
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Error. Try again.');
      }
    } catch (error) {
      setStatus('Error. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col gap-2" aria-labelledby="newsletter-heading">
      <div className="flex gap-2">
        <label htmlFor="email-newsletter" className="sr-only">Email address</label>
        <input
          id="email-newsletter"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <button 
          type="submit"
          disabled={isLoading || status === 'Subscribed!'}
          className="bg-[var(--accent)] hover:bg-[#e65a2a] text-white p-2 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          aria-label="Subscribe"
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : status === 'Subscribed!' ? <Check size={20} /> : <ArrowRight size={20} />}
        </button>
      </div>
      {status && <span className={`text-xs ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{status}</span>}
    </form>
  );
}

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const initiatives = [
    "Founders Talk",
    "Pitch Cafe",
    "Ideathon",
    "Open House",
    "Snack Chat",
  ];

  const usefulLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Initiatives", href: "/initiatives" },
    { name: "StartUps", href: "/startups" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const moreLinks = [
    "Resources",
    "FAQs",
    "Video Highlights",
    "Important Links",
    "Calendar",
    "Planned Events",
  ];

  return (
    <footer className="bg-black text-white pt-16 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/Gemini_Generated_Image_f3trmmf3trmmf3tr (1).png"
                  alt="E-Cell GLAU Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold">E-Cell GLAU</span>
            </div>
            <p className="text-gray-400 text-sm">
              Entrepreneurship Cell of GLA University, Mathura
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <h3 className="text-white font-medium" id="newsletter-heading">Subscribe to Our Newsletter</h3>
              <NewsletterForm />
            </div>

            {/* Animated Text Scroll */}
            <div className="overflow-hidden whitespace-nowrap py-2 opacity-80" aria-hidden="true">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="inline-block text-[var(--accent)] uppercase font-bold tracking-wider"
              >
                Explore • Encounter • Endeavour • Explore • Encounter • Endeavour • Explore • Encounter • Endeavour •
              </motion.div>
            </div>
          </div>

          {/* Column 2: Our Initiatives */}
          <nav aria-label="Our initiatives">
            <h3 className="text-lg font-bold mb-6">Our Initiatives</h3>
            <ul className="space-y-3">
              {initiatives.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors relative group block w-fit">
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Useful Links */}
          <nav aria-label="Useful links">
            <h3 className="text-lg font-bold mb-6">Useful Links</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[var(--accent)] transition-colors relative group block w-fit">
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: More Links */}
          <nav aria-label="More resources">
            <h3 className="text-lg font-bold mb-6">More</h3>
            <ul className="space-y-3">
              {moreLinks.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors relative group block w-fit">
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} E-Cell GLA University. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
