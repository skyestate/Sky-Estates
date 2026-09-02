'use client';

import { useState } from 'react';
import Media from './Media';
import Lightbox from './Lightbox';
import type { PortfolioItem } from '@/content/portfolio';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Vignette vidéo cliquable, réutilisant la visionneuse du portfolio.
 *
 * Sert dans la section Services : le visuel d'une prestation n'est plus une
 * simple image mais la vidéo réelle, qui s'ouvre en plein écran au clic —
 * exactement comme dans le portfolio (navigation clavier, fermeture par Échap).
 *
 * La vidéo n'est montée qu'à l'ouverture : rien n'est téléchargé avant le clic.
 */
export default function VideoThumb({
  item,
  locale,
  dict,
  label,
  className,
}: {
  item: PortfolioItem;
  locale: Locale;
  dict: Dictionary;
  /** Texte alternatif de la vignette (le titre de la prestation). */
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${dict.portfolio.open} — ${item.property}, ${item.location}`}
        className={cn('group/thumb absolute inset-0 h-full w-full', className)}
      >
        <Media
          src={item.media[0].src}
          alt={label}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="transition-transform duration-[1200ms] ease-luxe group-hover/thumb:scale-[1.04]"
        />

        {/* Assombrissement léger au survol, pour détacher la pastille */}
        <span className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover/thumb:bg-ink/25" />

        {/* Pastille de lecture */}
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/50 bg-ink/40 backdrop-blur-sm transition-all duration-500 ease-luxe group-hover/thumb:scale-110 group-hover/thumb:border-champagne">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-ivory" aria-hidden="true">
            <path d="M6 4 L20 12 L6 20 Z" />
          </svg>
        </span>
      </button>

      <Lightbox
        media={item.media}
        index={open ? 0 : null}
        property={item.property}
        location={item.location}
        kinds={item.kinds}
        locale={locale}
        dict={dict}
        onClose={() => setOpen(false)}
        onNavigate={() => undefined}
      />
    </>
  );
}
