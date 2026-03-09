'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../utils/content';

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easing, delay: i * 0.08 } }),
};

const galleryItems = [
  {
    src: '/img/bmw-m4-workshop.png',
    alt: 'BMW M4 Competition in Car Cleaning Eindhoven workshop',
    label: 'Exterieur Detailing',
    objectPosition: 'object-center',
  },
  {
    src: '/img/mercedes-sl-interior.png',
    alt: 'Mercedes-AMG SL — red leather interior detailing',
    label: 'Interieur Detailing',
    objectPosition: 'object-center',
  },
  {
    src: '/img/porsche-cayenne-black.png',
    alt: 'Porsche Cayenne Techart — full black exterior',
    label: 'Exterieur Coating',
    objectPosition: 'object-center',
  },
  {
    src: '/img/mercedes-amg-interior.png',
    alt: 'Mercedes-AMG E-Class — premium interior treatment',
    label: 'Interieur Detailing',
    objectPosition: 'object-center',
  },
];

export default function Gallery() {
  const { lang } = useLanguage();
  const t = content.gallery[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="gallery" className="bg-zinc-950 py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t.tag}</motion.p>
          <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-white font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>{t.title}</motion.h2>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-zinc-500 text-base font-light">{t.sub}</motion.p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-zinc-800 rounded-sm overflow-hidden">

          {/* Feature: Rolls Royce Phantom — tall, spans 2 rows */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="lg:row-span-2 relative group overflow-hidden">
            <div className="relative w-full h-[340px] lg:h-full min-h-[420px] overflow-hidden">
              <Image src="/img/rolls-royce-phantom.png"
                alt="Rolls Royce Phantom — detailing at Car Cleaning Eindhoven"
                fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-sm border border-zinc-700">
                  Rolls Royce Phantom
                </span>
              </div>
            </div>
          </motion.div>

          {/* Grid items */}
          {galleryItems.map((item, i) => (
            <motion.div key={item.src} custom={i + 4} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="relative group overflow-hidden">
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image src={item.src} alt={item.alt} fill
                  className={`object-cover ${item.objectPosition} group-hover:scale-105 transition-transform duration-700`}
                  sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-sm border border-zinc-700">
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Atmospheric banner with CTA */}
        <motion.div custom={8} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="relative mt-px overflow-hidden rounded-sm">
          <div className="relative w-full h-[220px] overflow-hidden">
            <Image src="/img/caspar-polishing.png" alt="Expert detailer at work" fill
              className="object-cover object-[center_40%] brightness-40 blur-[2px] scale-105"
              sizes="100vw" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-zinc-300 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
                  {lang === 'NL' ? 'MEER DAN 40 JAAR VAKMANSCHAP' : 'OVER 40 YEARS OF CRAFTSMANSHIP'}
                </p>
                <a href="#booking"
                  className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-zinc-100 transition-colors duration-200">
                  {lang === 'NL' ? 'Plan een afspraak' : 'Book an Appointment'}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
