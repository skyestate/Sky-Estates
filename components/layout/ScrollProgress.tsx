'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Filet de progression en haut de page.
 *
 * Un site d'une seule page très longue prive le visiteur de tout repère : il
 * ne sait pas s'il lui reste deux sections ou dix. Ce filet le lui dit sans
 * ajouter le moindre élément d'interface visible.
 *
 * Le ressort évite l'à-coup d'un scroll à la molette. Il disparaît si le
 * visiteur a demandé moins d'animations.
 */
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const largeur = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: largeur }}
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-gradient-to-r from-champagne-dark via-champagne to-champagne-light"
    />
  );
}
