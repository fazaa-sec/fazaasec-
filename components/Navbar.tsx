'use client';

import { useState } from 'react';
import { Icon } from './Icons';
import { useLang } from './LanguageContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const isAr = lang === 'ar';

  const LINKS = [
    { label: isAr ? 'خدماتي' : 'Services', href: '#services' },
    { label: isAr ? 'أعمالي' : 'Projects', href: '#projects' },
    { label: isAr ? 'صفحات جاهزة' : 'Templates', href: '#templates' },
    { label: isAr ? 'عني' : 'About', href: '#about' },
    { label: isAr ? 'تواصل' : 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Icon name="shield" className="h-5 w-5 text-neon" />
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

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm font-bold"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-white/15"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-ink md:hidden">
          <ul className="flex flex-col px-5 py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 text-white/80 last:border-0"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                {isAr ? 'اطلب فحص أمني' : 'Get a security audit'}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
