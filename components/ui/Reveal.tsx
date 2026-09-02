'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Tag = 'div' | 'li' | 'section' | 'article';

type RevealProps = {
  children: ReactNode;
  /** Décalage en secondes — sert à faire apparaître une liste en cascade. */
  delay?: number;
  /** Direction d'entrée. `none` = simple fondu. */
  from?: 'bottom' | 'left' | 'right' | 'none';
  className?: string;
  as?: Tag;
  /**
   * `slide` (défaut) : fondu + léger déplacement, pour le texte.
   * `wipe` : l'image se dévoile par le bas, comme un rideau qui se lève.
   *   Réservé aux visuels — sur du texte l'effet serait pénible à lire.
   */
  variant?: 'slide' | 'wipe';
};

const offsets = {
  bottom: { x: 0, y: 28 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

const motionTags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
};

/**
 * Apparition au scroll : fondu + léger déplacement, une seule fois.
 * N'anime que `opacity` et `transform` (composés par le GPU) pour ne pas
 * déclencher de recalcul de mise en page — indispensable pour le score
 * Lighthouse. Se désactive si l'utilisateur a demandé moins d'animations.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'bottom',
  className,
  as = 'div',
  variant = 'slide',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[from];

  // Rendu statique équivalent quand les animations sont désactivées.
  if (reduceMotion) {
    const StaticTag = as as 'div';
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  // Le cast évite une union de types JSX trop large côté TypeScript ;
  // toutes les balises acceptent les mêmes props ici.
  const MotionTag = motionTags[as] as typeof motion.div;

  if (variant === 'wipe') {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0, clipPath: 'inset(14% 0% 0% 0%)' }}
        whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
