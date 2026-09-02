'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Header fixe, transparent au-dessus du hero puis fond sombre flouté dès que
 * l'utilisateur scrolle. Menu plein écran sur mobile (le trafic vient surtout
 * d'Instagram : la navigation tactile est prioritaire).
 */
export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const nav = [
    { href: '#services', label: dict.nav.services },
    { href: '#portfolio', label: dict.nav.portfolio },
    { href: '#pricing', label: dict.nav.pricing },
    { href: '#process', label: dict.nav.process },
    { href: '#sectors', label: dict.nav.sectors },
    { href: '#about', label: dict.nav.about },
  ];

  /*
   * Suivi de la section lue.
   * Sur une page unique, le visiteur perd vite le fil : allumer l'entrée de
   * menu correspondant à ce qu'il regarde lui rend ce repère. La marge haute
   * décale la zone de détection sous le header fixe, sinon une section est
   * considérée « active » alors qu'elle est encore cachée derrière lui.
   */
  useEffect(() => {
    const ids = ['services', 'portfolio', 'pricing', 'process', 'sectors', 'about', 'contact'];
    const cibles = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (cibles.length === 0) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        const visible = entrees
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );

    cibles.forEach((el) => observateur.observe(el));
    return () => observateur.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloque le défilement de la page quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          scrolled || menuOpen
            ? 'border-b border-graphite/80 bg-ink/85 backdrop-blur-lg'
            : 'border-b border-transparent bg-transparent',
        )}
        /*
         * Le header se compacte une fois passé le hero : il rend de la place
         * au contenu et signale discrètement que la page a défilé. La variable
         * --header-h reste à sa valeur haute pour le calage des ancres.
         */
        style={{ height: scrolled ? '62px' : 'var(--header-h)' }}
      >
        <div className="container-page flex h-full items-center justify-between">
          <Link
            href={`/${locale}`}
            className={cn(
              'text-ivory transition-all duration-500 ease-luxe hover:opacity-80',
              scrolled && 'scale-[0.92] origin-left',
            )}
          >
            <Logo />
          </Link>

          {/* Navigation bureau */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href.slice(1) ? 'true' : undefined}
                className={cn('nav-link', active === item.href.slice(1) && 'nav-link-active')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <LanguageSwitcher locale={locale} label={dict.nav.language} />

            <a href="#contact" className="btn-primary hidden !py-3 !px-5 text-[11px] sm:inline-flex">
              {dict.nav.cta}
            </a>

            {/* Bouton menu mobile */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={cn(
                  'h-px w-6 bg-ivory transition-all duration-300',
                  menuOpen && 'translate-y-[3px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'h-px w-6 bg-ivory transition-all duration-300',
                  menuOpen && '-translate-y-[3px] -rotate-45',
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink lg:hidden"
            style={{ paddingTop: 'var(--header-h)' }}
          >
            <nav
              className="container-page flex h-full flex-col justify-center gap-2 pb-24"
              aria-label="Mobile"
            >
              {[...nav, { href: '#contact', label: dict.nav.contact }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-graphite py-5 font-serif text-3xl text-ivory transition-colors hover:text-champagne"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="btn-primary mt-10 w-full"
              >
                {dict.nav.cta}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
