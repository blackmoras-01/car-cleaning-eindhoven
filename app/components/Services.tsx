'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Car, Shield, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../utils/content';

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const icons = [Car, Shield, Sparkles];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
      delay: i * 0.12,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easing, delay },
  }),
};

export default function Services() {
  const { lang } = useLanguage();
  const t = content.services[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium"
          >
            {t.tag}
          </motion.p>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-white font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            {t.title}
          </motion.h2>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-zinc-500 text-base font-light max-w-md mx-auto"
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-zinc-800 rounded-sm overflow-hidden">
          {t.cards.map((card, i) => {
            const Icon = icons[i];
            const isPremium = i === 2;

            return (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative flex flex-col p-8 lg:p-10 cursor-default transition-all duration-300
                  ${isPremium ? 'bg-zinc-900' : 'bg-zinc-950'}
                `}
              >
                {/* Premium badge */}
                {isPremium && (
                  <div className="absolute top-6 right-6 bg-white text-black text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">
                    Flagship
                  </div>
                )}

                {/* Hover border overlay */}
                <div className="absolute inset-0 border border-transparent group-hover:border-zinc-600 transition-colors duration-300 pointer-events-none" />

                {/* Icon */}
                <div className={`mb-8 p-3 w-fit rounded-sm border transition-colors duration-300
                  ${isPremium
                    ? 'bg-white/5 border-zinc-600 group-hover:border-zinc-400'
                    : 'bg-zinc-900 border-zinc-800 group-hover:border-zinc-600'
                  }`}
                >
                  <Icon
                    size={20}
                    className={isPremium ? 'text-white' : 'text-zinc-400 group-hover:text-white transition-colors'}
                  />
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl tracking-tight mb-3">{card.title}</h3>

                {/* Description */}
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light flex-1">{card.desc}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={13}
                        className={`mt-0.5 flex-shrink-0 ${isPremium ? 'text-white' : 'text-zinc-500'}`}
                      />
                      <span className="text-zinc-400 text-sm font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-zinc-700 text-white text-xs font-semibold tracking-[0.2em] uppercase px-10 py-4 rounded-sm hover:bg-zinc-900 hover:border-zinc-500 transition-all duration-300"
          >
            Plan een afspraak
          </a>
        </motion.div>
      </div>
    </section>
  );
}
