'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../utils/content';

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easing, delay },
  }),
};

export default function Heritage() {
  const { lang } = useLanguage();
  const t = content.heritage[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: t.stat1, label: t.stat1Label },
    { value: t.stat2, label: t.stat2Label },
    { value: t.stat3, label: t.stat3Label },
  ];

  return (
    <section id="heritage" className="bg-zinc-950 py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section tag */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-16 font-medium text-center"
        >
          {t.tag}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Real action shot of Caspar polishing */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/img/caspar-polishing.png"
                alt="Expert detailer at work — Car Cleaning Eindhoven"
                fill
                className="object-cover object-center grayscale-[15%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle dark vignette on bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Since 1981 floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-zinc-900 border border-zinc-700 px-5 py-4 rounded-sm shadow-2xl">
              <p className="text-white font-bold text-xl tracking-tight">1981</p>
              <p className="text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Opgericht</p>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-zinc-700 pointer-events-none" />
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <motion.h2
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-white font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              {t.title}
            </motion.h2>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-5"
            >
              <p className="text-zinc-400 leading-relaxed text-base font-light">{t.p1}</p>
              <p className="text-zinc-400 leading-relaxed text-base font-light">{t.p2}</p>
              <p className="text-zinc-300 leading-relaxed text-base font-light border-l-2 border-zinc-700 pl-5 italic">
                {t.p3}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-3 gap-px mt-12 border border-zinc-800 bg-zinc-800 rounded-sm overflow-hidden"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="bg-zinc-900 px-6 py-6 text-center">
                  <p className="text-white text-2xl font-bold tracking-tight mb-1">{stat.value}</p>
                  <p className="text-zinc-500 text-[10px] tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
