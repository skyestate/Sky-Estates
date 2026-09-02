'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { Dictionary } from '@/content/types';

/**
 * Hero plein écran.
 *
 * Fond : image fixe — monogramme SE lumineux sur fond noir.
 *   · /public/media/hero/hero-still.png  (1536×1024)
 *
 * Traitement : `object-contain` plutôt que `cover` — en plein écran vertical,
 * `cover` agrandit démesurément une image 3:2 et le « S » vient traverser le
 * titre. Le fond noir de l'image se confond avec celui de la section, donc le
 * letterboxing est invisible.
 * L'opacité réduite transforme le monogramme en filigrane : il reste présent
 * mais laisse le titre dominer, ce qui est le rôle d'un fond.
 *
 * next/image sert automatiquement une version AVIF/WebP redimensionnée selon
 * l'écran : le poids réellement téléchargé est bien inférieur au fichier source.
 *
 * Pour changer le fond, remplace ce fichier en gardant le même nom.
 * L'image est marquée `priority` : c'est le LCP de la page, elle doit être
 * chargée sans attendre. Un léger parallax la fait remonter au scroll.
 *
 * Pour repasser à une vidéo de fond, remets un <video muted loop playsInline>
 * à la place du <Image> ci-dessous — le reste de la section ne change pas.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax léger : le fond remonte moins vite que le texte au scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink">
      {/* Fond */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/media/hero/hero-still.jpg"
          alt={dict.hero.videoFallbackAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Voile cinéma — garantit le contraste du texte (accessibilité) */}
      <div className="absolute inset-0 overlay-cinema" aria-hidden="true" />

      {/* Contenu */}
      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-page relative z-10 flex h-full flex-col justify-center pb-20 pt-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          {dict.hero.eyebrow}
        </motion.p>

        <h1 className="display-hero mt-6 max-w-4xl text-ivory">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {dict.hero.titleTop}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="block italic text-champagne"
          >
            {dict.hero.titleBottom}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lede mt-8 max-w-xl text-ivory/80"
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <a href="#contact" className="btn-primary">
            {dict.hero.ctaPrimary}
          </a>
          <a href="#portfolio" className="btn-ghost">
            {dict.hero.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/60 transition-colors hover:text-champagne sm:flex"
      >
        <span className="text-[10px] uppercase tracking-eyebrow">{dict.hero.scroll}</span>
        <span className="block h-10 w-px animate-scroll-hint bg-gradient-to-b from-champagne to-transparent" />
      </a>
    </section>
  );
}
