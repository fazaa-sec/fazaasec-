'use client';

import { useState } from 'react';
import { useLang } from './LanguageContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const isAr = lang === 'ar';

  const LINKS = [
    { label: isAr ? 'خدماتي' : 'Services', href: '#services' },
    { label: isAr ? 'أعمالي' : 'Projects', href: '#projects' },
    { label: isAr ? 'قصص نجاح' : 'Case Studies', href: '#case-studies' },
    { label: isAr ? 'قوالب جاهزة' : 'Templates', href: '#templates' },
    { label: isAr ? 'عني' : 'About', href: '#about' },
    { label: isAr ? 'تواصل' : 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="text-neon">🛡️</span>
          <span>
            FAZAA <span className="text-neon">SEC</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-neon">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm font-bold"
          >
            {lang === 'en' ? 'عربي | EN' : 'EN | عربي'}
          </button>
          <a href="#contact" className="btn-primary hidden !py-2 md:inline-flex">
            {isAr ? 'اطلب فحص أمني' : 'Get a security audit'}
          </a>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm font-bold w-fit"
          >
            {lang === 'en' ? 'عربي | EN' : 'EN | عربي'}
          </button>
        </div>
      )}
    </header>
  );
}
