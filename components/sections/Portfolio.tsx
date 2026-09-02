'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

import SectionHeading from '@/components/ui/SectionHeading';
import Media from '@/components/ui/Media';
import Lightbox from '@/components/ui/Lightbox';
import { portfolio, type PortfolioKind } from '@/content/portfolio';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type Filter = 'all' | PortfolioKind;

const aspectClasses = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

/*
 * La première réalisation occupe deux colonnes et un cadre plus large.
 * Une mosaïque de tuiles toutes identiques se lit comme un catalogue ; donner
 * du poids à la première pose une hiérarchie et guide l'œil à l'entrée de la
 * grille. Le format 16:9 lui va d'autant mieux qu'il correspond au cadrage
 * natif des prises de vue aériennes.
 */
const MISE_EN_AVANT = 'sm:col-span-2 sm:aspect-[16/9]';

/*
 * En trois colonnes, la deuxième tuile partage sa rangée avec la première, qui
 * est bien plus haute. Sans cette règle elle garderait son format 4:3 et
 * laisserait un vide noir sous elle : on lui fait donc remplir la hauteur de
 * la rangée. En dessous de `lg`, la première ne partage sa rangée avec
 * personne et la question ne se pose pas.
 */
const REMPLIT_LA_RANGEE = 'lg:aspect-auto lg:h-full';

/**
 * Galerie filtrable : UNE carte par propriété.
 * Les différentes vues d'un même bien se parcourent dans la visionneuse,
 * elles n'occupent pas plusieurs cases de la mosaïque.
 */
export default function Portfolio({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [filter, setFilter] = useState<Filter>('all');
  /** Index de la propriété ouverte, et index de la vue affichée dans ce bien. */
  const [openProperty, setOpenProperty] = useState<number | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  /*
   * Filtres dynamiques : on n'affiche que les catégories réellement
   * représentées. Un onglet qui ne renvoie rien fait croire à un site cassé —
   * et l'onglet réapparaît de lui-même dès qu'une réalisation de ce type est
   * ajoutée dans content/portfolio.ts.
   */
  const filters = useMemo(() => {
    const presentes = new Set(portfolio.flatMap((item) => item.kinds));
    const ordre: PortfolioKind[] = ['photo', 'video', 'fpv'];
    return [
      { value: 'all' as Filter, label: dict.portfolio.filters.all },
      ...ordre
        .filter((k) => presentes.has(k))
        .map((k) => ({ value: k as Filter, label: dict.portfolio.filters[k] })),
    ];
  }, [dict]);

  const items = useMemo(
    () =>
      filter === 'all'
        ? portfolio
        : portfolio.filter((item) => item.kinds.includes(filter)),
    [filter],
  );

  const open = openProperty !== null ? items[openProperty] : null;

  return (
    <section id="portfolio" className="bg-ink py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow={dict.portfolio.eyebrow}
          title={dict.portfolio.title}
          intro={dict.portfolio.intro}
        />

        {/* Filtres */}
        <div className="mt-12 flex flex-wrap gap-3" role="tablist" aria-label={dict.portfolio.title}>
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => {
                setFilter(f.value);
                setOpenProperty(null);
              }}
              className={cn(
                'rounded-control border px-5 py-2.5 font-sans text-[11px] uppercase tracking-wide2 transition-all duration-500 ease-luxe',
                filter === f.value
                  ? 'border-champagne bg-champagne text-ink'
                  : 'border-graphite text-ivory/60 hover:border-ivory/40 hover:text-ivory',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Mosaïque — une case par propriété */}
        <LayoutGroup>
          <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => {
                const cover = item.media[0];
                const count = item.media.length;

                return (
                  <motion.button
                    key={item.id}
                    layout
                    type="button"
                    onClick={() => {
                      setOpenProperty(i);
                      setMediaIndex(0);
                    }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    aria-label={`${dict.portfolio.open} — ${item.property}, ${item.location}`}
                    className={cn(
                      'group relative w-full overflow-hidden rounded-card bg-charcoal text-left',
                      'ring-1 ring-transparent transition-[box-shadow,transform] duration-500 ease-luxe',
                      'hover:-translate-y-1 hover:ring-champagne/40',
                      'hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.9)]',
                      aspectClasses[item.aspect],
                      i === 0 && MISE_EN_AVANT,
                      i === 1 && REMPLIT_LA_RANGEE,
                    )}
                  >
                    <Media
                      src={cover.src}
                      alt={cover.alt[locale]}
                      fill
                      sizes={
                      i === 0
                        ? '(max-width: 640px) 100vw, 66vw'
                        : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    }
                      className="transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 ease-luxe group-hover:translate-y-0">
                      <p className="text-[10px] uppercase tracking-eyebrow text-champagne">
                        {item.kinds.map((k) => dict.portfolio.filters[k]).join(' · ')}
                      </p>
                      <p
                        className={cn(
                          'mt-1.5 font-serif text-ivory',
                          i === 0 ? 'text-2xl sm:text-3xl' : 'text-xl',
                        )}
                      >
                        {item.property}
                      </p>
                      <p className="text-xs text-ivory/60">{item.location}</p>
                    </div>

                    {/* Pastille lecture sur les vidéos */}
                    {cover.video && (
                      <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 bg-ink/40 backdrop-blur-sm transition-colors duration-500 group-hover:border-champagne">
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-ivory" aria-hidden="true">
                          <path d="M6 4 L20 12 L6 20 Z" />
                        </svg>
                      </span>
                    )}

                    {/*
                      * Nombre de vues, quand le bien en compte plusieurs.
                      * Placé à GAUCHE : la pastille de lecture occupe le coin
                      * droit, et un bien peut avoir les deux à la fois.
                      */}
                    {count > 1 && (
                      <span className="absolute left-5 top-5 border border-ivory/30 bg-ink/50 px-2.5 py-1 text-[10px] tracking-wide2 text-ivory backdrop-blur-sm">
                        {count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {items.length === 0 && (
          <p className="mt-16 text-center text-smoke">{dict.portfolio.empty}</p>
        )}
      </div>

      {open && (
        <Lightbox
          media={open.media}
          index={openProperty !== null ? mediaIndex : null}
          property={open.property}
          location={open.location}
          kinds={open.kinds}
          locale={locale}
          dict={dict}
          onClose={() => setOpenProperty(null)}
          onNavigate={setMediaIndex}
        />
      )}
    </section>
  );
}
