'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: easing, delay: d } }),
};

const comparisons = {
  NL: [
    {
      id: 'engine',
      label: 'Motorruimte',
      before: { src: '/img/engine-before.png', desc: 'Jaren van vuil, olie en oxidatie' },
      after:  { src: '/img/engine-after.png',  desc: 'Volledig gereinigd & geprotecteerd' },
    },
    {
      id: 'headlight',
      label: 'Koplamp Herstel',
      before: { src: '/img/headlight-before.png', desc: 'Vergeeld & geoxideerd plastic' },
      after:  { src: '/img/headlight-after.png',  desc: 'Kristalhelder — als nieuw' },
    },
  ],
  EN: [
    {
      id: 'engine',
      label: 'Engine Bay',
      before: { src: '/img/engine-before.png', desc: 'Years of dirt, oil and oxidation' },
      after:  { src: '/img/engine-after.png',  desc: 'Fully cleaned & protected' },
    },
    {
      id: 'headlight',
      label: 'Headlight Restore',
      before: { src: '/img/headlight-before.png', desc: 'Yellowed & oxidized plastic' },
      after:  { src: '/img/headlight-after.png',  desc: 'Crystal clear — like new' },
    },
  ],
};

export default function BeforeAfter() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);

  const pairs = comparisons[lang];
  const current = pairs[active];

  const labels = {
    NL: { tag: 'VOOR & NA', title: 'Het verschil is onmiskenbaar.', before: 'VOOR', after: 'NA' },
    EN: { tag: 'BEFORE & AFTER', title: 'The difference is undeniable.', before: 'BEFORE', after: 'AFTER' },
  };
  const t = labels[lang];

  return (
    <section className="bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            {t.tag}
          </motion.p>
          <motion.h2 custom={0.1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-white font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            {t.title}
          </motion.h2>

          {/* Toggle tabs */}
          <motion.div custom={0.2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="inline-flex gap-px bg-zinc-800 rounded-sm overflow-hidden p-0">
            {pairs.map((p, i) => (
              <button key={p.id} onClick={() => setActive(i)}
                className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer
                  ${active === i ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-500 hover:text-white'}`}>
                {p.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Comparison panels */}
        <motion.div key={current.id}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-px bg-zinc-800 rounded-sm overflow-hidden">

          {/* BEFORE */}
          <div className="relative group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={current.before.src} alt={`${current.label} before`} fill
                className="object-cover object-center grayscale-[25%] brightness-85 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />
            </div>
            <div className="absolute top-5 left-5">
              <span className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 text-zinc-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm">
                {t.before}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
              <p className="text-zinc-400 text-xs font-light">{current.before.desc}</p>
            </div>
          </div>

          {/* AFTER */}
          <div className="relative group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={current.after.src} alt={`${current.label} after`} fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />
            </div>
            <div className="absolute top-5 left-5">
              <span className="bg-white text-black text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm shadow-lg">
                {t.after}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
              <p className="text-white text-xs font-light">{current.after.desc}</p>
            </div>
          </div>
        </motion.div>

        <motion.p custom={0.5} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center text-zinc-700 text-xs tracking-[0.3em] uppercase mt-10 font-medium">
          {lang === 'NL' ? 'Professionele reiniging · Eindhoven' : 'Professional detailing · Eindhoven'}
        </motion.p>
      </div>
    </section>
  );
}
