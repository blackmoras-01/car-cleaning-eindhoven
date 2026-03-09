'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../utils/content';
import Image from 'next/image';

export default function Navbar() {
  const { lang, toggle } = useLanguage();
  const t = content.nav[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.heritage, href: '#heritage' },
      { label: t.services, href: '#services' },
      { label: t.gallery, href: '#gallery' },
      { label: t.bookNow, href: '#booking' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-zinc-800/60 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Car Cleaning Eindhoven logo"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
              <span className="text-white font-semibold tracking-tight text-sm uppercase leading-tight">
                Car Cleaning
                <span className="block text-zinc-500 text-[10px] font-normal tracking-[0.25em]">
                  Eindhoven
                </span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 hover:text-white text-xs tracking-widest uppercase transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggle}
                className="relative flex items-center bg-zinc-900 border border-zinc-700 rounded-full p-0.5 h-8 w-16 cursor-pointer overflow-hidden"
                aria-label="Toggle language"
              >
                <motion.div
                  className="absolute top-0.5 bottom-0.5 w-[28px] rounded-full bg-white"
                  animate={{ left: lang === 'NL' ? 2 : 34 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
                <span
                  className={`relative z-10 text-[10px] font-bold w-8 text-center transition-colors duration-200 ${
                    lang === 'NL' ? 'text-black' : 'text-zinc-500'
                  }`}
                >
                  NL
                </span>
                <span
                  className={`relative z-10 text-[10px] font-bold w-8 text-center transition-colors duration-200 ${
                    lang === 'EN' ? 'text-black' : 'text-zinc-500'
                  }`}
                >
                  EN
                </span>
              </button>

              {/* Book Now CTA */}
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 bg-white text-black text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm hover:bg-zinc-100 transition-colors duration-200"
              >
                {t.bookNow}
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-zinc-400 hover:text-white transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[66px] left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-zinc-800 md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-300 hover:text-white text-sm tracking-widest uppercase transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-white text-black text-xs font-semibold tracking-widest uppercase px-5 py-3 rounded-sm"
              >
                {t.bookNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
