'use client';

import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../utils/content';

export default function Footer() {
  const { lang } = useLanguage();
  const t = content.footer[lang];

  return (
    <footer id="contact" className="bg-black border-t border-zinc-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="text-white font-semibold tracking-tight text-sm uppercase mb-1">
              Car Cleaning
            </p>
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-6">Eindhoven</p>
            <p className="text-zinc-500 text-sm leading-relaxed font-light max-w-xs">{t.tagline}</p>
            {/* Social Icons */}
            <div className="mt-6">
              <p className="text-zinc-600 text-[10px] tracking-widest uppercase mb-4">{t.follow}</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/carcleaningeindhoven/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-200"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://www.facebook.com/people/Car-Cleaning-Eindhoven/61568140091601/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-200"
                >
                  <Facebook size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-zinc-600 text-[10px] tracking-widest uppercase mb-6">{t.linksTitle}</p>
            <ul className="space-y-3">
              {Object.entries(t.links).map(([key, label]) => (
                <li key={key}>
                  <a
                    href={`#${key === 'book' ? 'contact' : key}`}
                    className="text-zinc-500 hover:text-white text-sm font-light transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-zinc-600 text-[10px] tracking-widest uppercase mb-6">{t.contactTitle}</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-zinc-600 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-500 text-sm font-light leading-relaxed">{t.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-zinc-600 flex-shrink-0" />
                <a
                  href={`tel:${t.phone.replace(/\s/g, '')}`}
                  className="text-zinc-500 hover:text-white text-sm font-light transition-colors duration-200"
                >
                  {t.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-zinc-600 flex-shrink-0" />
                <a
                  href={`mailto:${t.email}`}
                  className="text-zinc-500 hover:text-white text-sm font-light transition-colors duration-200 break-all"
                >
                  {t.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs font-light">{t.rights}</p>
          <p className="text-zinc-700 text-xs font-light tracking-widest uppercase">
            Eindhoven · Nederland
          </p>
        </div>
      </div>
    </footer>
  );
}
