'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Boucle vidéo silencieuse, façon GIF — mais en MP4.
 *
 * Un vrai GIF de 7 s en 568×320 pèserait plusieurs mégaoctets et serait limité
 * à 256 couleurs ; le même extrait en H.264 fait 610 Ko et garde toutes ses
 * nuances. Le rendu pour le visiteur est identique : ça tourne tout seul, en
 * boucle, sans son et sans contrôle.
 *
 * Deux garde-fous :
 * · la lecture ne démarre que lorsque le bloc entre dans l'écran, et se met en
 *   pause dès qu'il en sort — inutile de faire tourner un décodeur vidéo pour
 *   une image que personne ne regarde ;
 * · si le visiteur a demandé moins d'animations, seule l'image fixe s'affiche.
 */
export default function LoopingClip({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduceMotion) return;

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          video.play().catch(() => {
            /* refus du navigateur : l'image d'attente reste affichée */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observateur.observe(video);
    return () => observateur.disconnect();
  }, [reduceMotion]);

  // Préférence « moins d'animations » : on s'en tient à l'image fixe.
  if (reduceMotion) {
    return <Image src={poster} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className={cn('object-cover', className)} />;
  }

  return (
    <video
      ref={ref}
      className={cn('h-full w-full object-cover', className)}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      /* Purement décoratif : aucun contrôle, aucun clic. */
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
