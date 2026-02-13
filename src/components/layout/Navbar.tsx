'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Team', href: '/team' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Planned Events', href: '/events' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const navbarClasses = scrolled
    ? 'fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-lg shadow-lg border-b border-white/10 transition-all duration-300'
    : 'fixed top-0 left-0 right-0 z-[100] bg-black/20 backdrop-blur-md border-b border-white/5 transition-all duration-300';

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-[110]">
            <div className="relative w-10 h-10">
              <Image
                src="/images/Gemini_Generated_Image_f3trmmf3trmmf3tr (1).png"
                alt="E-Cell Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              E-Cell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-orange-200 transition-colors duration-200 font-medium text-sm relative group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-[110] text-white p-2"
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[105] md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl font-bold hover:text-orange-500 transition-all duration-300 text-center w-full py-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
