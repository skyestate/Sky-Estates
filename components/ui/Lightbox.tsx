'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Media from './Media';
import type { PortfolioMedia, PortfolioKind } from '@/content/portfolio';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { interpolate } from '@/lib/utils';

type LightboxProps = {
  /** Les médias d'UNE propriété : on navigue à l'intérieur d'un même bien. */
  media: PortfolioMedia[];
  index: number | null;
  property: string;
  location: string;
  kinds: PortfolioKind[];
  locale: Locale;
  dict: Dictionary;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Visionneuse plein écran.
 * - Navigation clavier : ← → entre les vues du bien, Échap pour fermer
 * - Le focus est déplacé dans la fenêtre à l'ouverture puis rendu à la page
 * - Les vidéos ne sont montées qu'à l'ouverture : rien n'est téléchargé avant
 */
export default function Lightbox({
  media,
  index,
  property,
  location,
  kinds,
  locale,
  dict,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const isOpen = index !== null;
  const current = isOpen ? media[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % media.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + media.length) % media.length);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus();
    };
  }, [isOpen, index, media.length, onClose, onNavigate]);

  /*
   * Lecture avec le son.
   *
   * L'attribut `autoPlay` seul ne suffit pas : les navigateurs coupent
   * systématiquement le son d'une vidéo qui démarre d'elle-même. Comme la
   * visionneuse s'ouvre sur un clic, l'activation utilisateur est récente et
   * la lecture sonore est presque toujours acceptée — on la demande donc
   * explicitement, et on ne retombe en muet que si le navigateur refuse,
   * plutôt que de laisser une vidéo figée.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {
        /* refus total : les contrôles natifs restent disponibles */
      });
    });
  }, [isOpen, current?.video]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${property}, ${location}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Barre supérieure */}
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            <div>
              <p className="font-serif text-lg text-ivory">{property}</p>
              <p className="mt-0.5 text-xs uppercase tracking-eyebrow text-champagne">
                {location} · {kinds.map((k) => dict.portfolio.filters[k]).join(' · ')}
              </p>
            </div>

            <div className="flex items-center gap-6">
              {media.length > 1 && (
                <span className="hidden text-xs tracking-wide2 text-smoke sm:block">
                  {interpolate(dict.portfolio.counter, {
                    current: index + 1,
                    total: media.length,
                  })}
                </span>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={dict.portfolio.close}
                className="flex h-10 w-10 items-center justify-center text-ivory/70 transition-colors hover:text-champagne"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path d="M5 5 L19 19 M19 5 L5 19" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
          </div>

          {/*
            Média — occupe toute la zone disponible.
            ⚠️ Ne pas replafonner la largeur (un max-w-5xl y bridait la vidéo à
               1024 px) : sur un grand écran elle n'occupait plus qu'un quart de
               la surface. `object-contain` garantit qu'elle reste entière et
               centrée, quelle que soit la taille de la fenêtre.
          */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full w-full items-center justify-center"
            >
              {current.video ? (
                <video
                  ref={videoRef}
                  key={current.video}
                  className="h-full w-full rounded-card object-contain"
                  poster={current.src}
                  controls
                  playsInline
                  preload="auto"
                  aria-label={current.alt[locale]}
                >
                  <source src={current.video} type="video/mp4" />
                </video>
              ) : (
                <div className="relative h-full w-full">
                  <Media
                    src={current.src}
                    alt={current.alt[locale]}
                    fill
                    sizes="90vw"
                    className="!object-contain rounded-card"
                  />
                </div>
              )}
            </motion.div>

            {/* Flèches — uniquement s'il y a plusieurs vues du bien */}
            {media.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate((index - 1 + media.length) % media.length)}
                  aria-label={dict.portfolio.prev}
                  className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory/60 transition-colors hover:text-champagne sm:left-2"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                    <path d="M15 4 L7 12 L15 20" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate((index + 1) % media.length)}
                  aria-label={dict.portfolio.next}
                  className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory/60 transition-colors hover:text-champagne sm:right-2"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                    <path d="M9 4 L17 12 L9 20" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
