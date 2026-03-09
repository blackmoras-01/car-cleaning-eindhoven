'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Car, Shield, Sparkles, MapPin, Phone, Mail, Clock, ExternalLink, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../utils/content';

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easing, delay: d } }),
};

const SERVICE_ICONS = [Car, Shield, Sparkles];
const TIME_SLOTS = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'];

export default function BookingSection() {
  const { lang } = useLanguage();
  const t = content.booking[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calendar helpers
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayRaw = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const firstDay = (firstDayRaw + 6) % 7; // Shift to Mon=0

  const calCells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (calCells.length % 7 !== 0) calCells.push(null);

  const isPast = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };
  const isSunday = (d: number) => new Date(viewYear, viewMonth, d).getDay() === 0;
  const isToday = (d: number) =>
    d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null); setSelectedTime(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null); setSelectedTime(null);
  };

  const canGoBack = !(viewYear === today.getFullYear() && viewMonth === today.getMonth());
  const stepDone = (n: number) => {
    if (n === 1) return selectedService !== null;
    if (n === 2) return selectedDate !== null;
    if (n === 3) return selectedTime !== null;
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService !== null && selectedDate && selectedTime && name && contact) {
      setSubmitted(true);
    }
  };

  const selectedDateStr = selectedDate
    ? `${selectedDate} ${t.months[viewMonth]} ${viewYear}`
    : null;

  return (
    <section id="booking" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            {t.tag}
          </motion.p>
          <motion.h2 custom={0.1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-white font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            {t.title}
          </motion.h2>
          <motion.p custom={0.2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-zinc-500 text-base font-light max-w-lg mx-auto">
            {t.sub}
          </motion.p>
        </div>

        <motion.div custom={0.3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-[1fr_340px] gap-px bg-zinc-800 rounded-sm overflow-hidden">

          {/* ── LEFT: Booking form ── */}
          <div className="bg-zinc-950 p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                    <Check size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">
                      {lang === 'NL' ? 'Aanvraag ontvangen!' : 'Request received!'}
                    </p>
                    <p className="text-zinc-500 text-sm font-light max-w-xs mx-auto">{t.ctaNote}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5 text-left w-full max-w-xs space-y-2">
                    <p className="text-zinc-400 text-xs"><span className="text-zinc-600 uppercase tracking-widest text-[10px]">{t.step1}</span><br />{t.services[selectedService!]}</p>
                    <p className="text-zinc-400 text-xs"><span className="text-zinc-600 uppercase tracking-widest text-[10px]">{t.step2}</span><br />{selectedDateStr}</p>
                    <p className="text-zinc-400 text-xs"><span className="text-zinc-600 uppercase tracking-widest text-[10px]">{t.step3}</span><br />{selectedTime}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-10">

                  {/* Step 1: Service */}
                  <div>
                    <p className="text-zinc-500 text-[10px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold transition-colors ${stepDone(1) ? 'bg-white border-white text-black' : 'border-zinc-700 text-zinc-600'}`}>1</span>
                      {t.step1}
                    </p>
                    <div className="grid sm:grid-cols-3 gap-px bg-zinc-800 rounded-sm overflow-hidden">
                      {t.services.map((svc, i) => {
                        const Icon = SERVICE_ICONS[i];
                        const active = selectedService === i;
                        return (
                          <button key={svc} type="button" onClick={() => setSelectedService(i)}
                            className={`group relative flex flex-col items-start gap-3 p-5 text-left transition-all duration-200 cursor-pointer
                              ${active ? 'bg-white' : 'bg-zinc-950 hover:bg-zinc-900'}`}>
                            <Icon size={16} className={active ? 'text-black' : 'text-zinc-500 group-hover:text-zinc-300'} />
                            <div>
                              <p className={`text-sm font-semibold ${active ? 'text-black' : 'text-white'}`}>{svc}</p>
                              <p className={`text-[10px] mt-0.5 ${active ? 'text-zinc-600' : 'text-zinc-600'}`}>{t.serviceDesc[i]}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Calendar */}
                  <div>
                    <p className="text-zinc-500 text-[10px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold transition-colors ${stepDone(2) ? 'bg-white border-white text-black' : 'border-zinc-700 text-zinc-600'}`}>2</span>
                      {t.step2}
                    </p>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5">
                      {/* Month nav */}
                      <div className="flex items-center justify-between mb-5">
                        <button type="button" onClick={prevMonth} disabled={!canGoBack}
                          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                          <ChevronLeft size={16} />
                        </button>
                        <p className="text-white text-sm font-semibold tracking-wide">
                          {t.months[viewMonth]} {viewYear}
                        </p>
                        <button type="button" onClick={nextMonth}
                          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* Day headers */}
                      <div className="grid grid-cols-7 mb-2">
                        {t.days.map(d => (
                          <div key={d} className="text-center text-[10px] text-zinc-600 tracking-wider uppercase pb-2">{d}</div>
                        ))}
                      </div>

                      {/* Day cells */}
                      <div className="grid grid-cols-7 gap-0.5">
                        {calCells.map((day, idx) => {
                          if (!day) return <div key={idx} />;
                          const disabled = isPast(day) || isSunday(day);
                          const active = selectedDate === day && viewMonth === today.getMonth() || selectedDate === day;
                          const todayCell = isToday(day);
                          return (
                            <button key={idx} type="button"
                              disabled={disabled}
                              onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                              className={`relative h-8 w-full flex items-center justify-center text-xs rounded-sm transition-all duration-150 font-medium
                                ${disabled ? 'text-zinc-800 cursor-not-allowed' : 'cursor-pointer'}
                                ${active && !disabled ? 'bg-white text-black' : ''}
                                ${!active && !disabled ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : ''}
                                ${todayCell && !active ? 'ring-1 ring-zinc-600' : ''}
                              `}>
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Time slots */}
                  <AnimatePresence>
                    {selectedDate && (
                      <motion.div key="timeslots"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}>
                        <p className="text-zinc-500 text-[10px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold transition-colors ${stepDone(3) ? 'bg-white border-white text-black' : 'border-zinc-700 text-zinc-600'}`}>3</span>
                          {t.step3}
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-zinc-800 rounded-sm overflow-hidden">
                          {TIME_SLOTS.map(slot => (
                            <button key={slot} type="button" onClick={() => setSelectedTime(slot)}
                              className={`py-3 text-sm font-medium transition-all duration-150 cursor-pointer
                                ${selectedTime === slot ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}>
                              {slot}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 4: Details */}
                  <AnimatePresence>
                    {selectedTime && (
                      <motion.div key="details"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}>
                        <p className="text-zinc-500 text-[10px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full border border-zinc-700 text-zinc-600 flex items-center justify-center text-[9px] font-bold">4</span>
                          {t.step4}
                        </p>
                        <div className="space-y-3 mb-6">
                          <input value={name} onChange={e => setName(e.target.value)} required
                            placeholder={t.namePlaceholder}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors" />
                          <input value={contact} onChange={e => setContact(e.target.value)} required
                            placeholder={t.phonePlaceholder}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors" />
                        </div>

                        {/* Summary */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 mb-6 grid grid-cols-3 gap-4">
                          {[
                            [t.step1, t.services[selectedService!]],
                            [t.step2, selectedDateStr],
                            [t.step3, selectedTime],
                          ].map(([label, val]) => (
                            <div key={label}>
                              <p className="text-zinc-600 text-[9px] tracking-widest uppercase mb-1">{label}</p>
                              <p className="text-white text-xs font-medium">{val}</p>
                            </div>
                          ))}
                        </div>

                        <button type="submit"
                          className="w-full bg-white text-black text-xs font-bold tracking-[0.2em] uppercase py-4 rounded-sm hover:bg-zinc-100 transition-colors duration-200">
                          {t.cta}
                        </button>
                        <p className="text-zinc-700 text-xs text-center mt-3">{t.ctaNote}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Directions + Info ── */}
          <div className="bg-zinc-950 border-l border-zinc-800 p-8 lg:p-10 flex flex-col gap-8">
            {/* Tag */}
            <div>
              <p className="text-zinc-600 text-[10px] tracking-[0.25em] uppercase mb-5">{t.dirTag}</p>

              {/* Address */}
              <div className="flex items-start gap-3 mb-6">
                <MapPin size={14} className="text-zinc-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.dirTitle}</p>
                  <p className="text-zinc-500 text-sm">{t.dirSub}</p>
                </div>
              </div>

              {/* Google Maps link */}
              <a href="https://maps.google.com/?q=Broekakkerseweg+30,+5641+PC+Eindhoven" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-xs tracking-widest uppercase transition-colors duration-200 border border-zinc-800 hover:border-zinc-600 px-4 py-2.5 rounded-sm mb-8 w-full justify-center">
                <ExternalLink size={12} />
                {t.routeLabel}
              </a>

              {/* Opening hours */}
              <p className="text-zinc-600 text-[10px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                <Clock size={11} /> {t.hoursTitle}
              </p>
              <div className="space-y-2.5 mb-8">
                {t.hours.map(h => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="text-zinc-500 text-xs font-light">{h.day}</span>
                    <span className={`text-xs font-medium ${h.time === t.sunday || h.time === 'Closed' ? 'text-zinc-700' : 'text-white'}`}>{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="space-y-3 pt-6 border-t border-zinc-900">
                <a href="tel:0402116211" className="flex items-center gap-3 text-zinc-500 hover:text-white text-xs transition-colors duration-200">
                  <Phone size={13} className="text-zinc-600" /> 040 211 6211
                </a>
                <a href="mailto:planning@carcleaningeindhoven.nl" className="flex items-center gap-3 text-zinc-500 hover:text-white text-xs transition-colors duration-200 break-all">
                  <Mail size={13} className="text-zinc-600" /> planning@carcleaningeindhoven.nl
                </a>
              </div>
            </div>

            {/* How to reach us note */}
            <div className="mt-auto pt-6 border-t border-zinc-900">
              <p className="text-zinc-700 text-[10px] leading-relaxed">
                {lang === 'NL'
                  ? 'Gelegen op het bedrijventerrein Goederen­centrum Eindhoven. Parkeren voor de deur. Wij zijn goed bereikbaar via de A2 en A67.'
                  : 'Located on the Goederencentrum Eindhoven business park. Free parking in front. Easily accessible via the A2 and A67 motorways.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
