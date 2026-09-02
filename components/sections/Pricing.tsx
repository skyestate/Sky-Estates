import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn, formatPrice } from '@/lib/utils';

/**
 * Cartes tarifaires — paiement à la propriété, sans abonnement.
 * Les prix et le contenu des packs se modifient dans content/{fr,en,es}.ts.
 */
export default function Pricing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="pricing" tone="ivory">
      <SectionHeading
        index="03"
        eyebrow={dict.pricing.eyebrow}
        title={dict.pricing.title}
        intro={dict.pricing.intro}
        align="center"
        onLight
      />

      {/* Trois packs comparables */}
      <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {dict.pricing.packs.map((pack, i) => (
          <Reveal key={pack.id} delay={i * 0.1} className="h-full">
            <article
              className={cn(
                'flex h-full flex-col rounded-card border p-8 transition-all duration-500 ease-luxe sm:p-10',
                pack.featured
                  ? /* Le pack le plus demandé se détache : fond sombre, ombre
                       portée plus profonde et léger décalage vers le haut. */
                    'border-champagne bg-ink text-ivory shadow-[0_34px_70px_-32px_rgba(10,10,10,0.65)] lg:-translate-y-4'
                  : 'border-sand bg-white text-ink hover:-translate-y-1 hover:border-champagne/60 hover:shadow-[0_20px_44px_-28px_rgba(10,10,10,0.28)]',
              )}
            >
              {/* En-tête */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={cn(
                      'display-card font-serif',
                      pack.featured ? 'text-ivory' : 'text-ink',
                    )}
                  >
                    {pack.name}
                  </h3>
                  <p
                    className={cn(
                      'mt-2 text-sm',
                      pack.featured ? 'text-smoke' : 'text-ink/55',
                    )}
                  >
                    {pack.audience}
                  </p>
                </div>

                {pack.featured && (
                  <span className="shrink-0 border border-champagne px-3 py-1 text-[10px] uppercase tracking-eyebrow text-champagne">
                    {dict.pricing.featuredLabel}
                  </span>
                )}
              </div>

              {/* Prix */}
              <div className="mt-8">
                <p
                  className={cn(
                    'text-[11px] uppercase tracking-eyebrow',
                    pack.featured ? 'text-champagne' : 'text-champagne-dark',
                  )}
                >
                  {dict.pricing.from}
                </p>
                <p
                  className={cn(
                    'mt-2 font-serif text-5xl',
                    pack.featured ? 'text-champagne' : 'text-ink',
                  )}
                >
                  {formatPrice(pack.price, locale)}
                </p>
              </div>

              <div
                className={cn(
                  'my-8 h-px w-full',
                  pack.featured ? 'bg-graphite' : 'bg-sand',
                )}
              />

              {/* Ce qui est inclus */}
              <ul className="flex-1 space-y-3.5">
                {pack.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      'flex gap-3 text-sm leading-relaxed',
                      pack.featured ? 'text-ivory/80' : 'text-ink/70',
                    )}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className={cn(
                        'mt-[5px] h-3 w-3 shrink-0',
                        pack.featured ? 'text-champagne' : 'text-champagne-dark',
                      )}
                      aria-hidden="true"
                    >
                      <path d="M2 8.5 L6 12.5 L14 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={cn(
                  'mt-10 w-full',
                  pack.featured
                    ? 'btn-primary'
                    : 'inline-flex items-center justify-center rounded-control border border-ink/25 px-8 py-4 font-sans text-[11.5px] uppercase tracking-wide2 text-ink transition-all duration-500 ease-luxe hover:-translate-y-0.5 hover:border-champagne-dark hover:text-champagne-dark active:translate-y-0 active:scale-[0.985]',
                )}
              >
                {dict.pricing.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Option FPV, transversale aux trois packs */}
      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-card border border-dashed border-champagne-dark/40 bg-white px-8 py-7 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-xl text-ink">{dict.pricing.option.title}</h3>
            <p className="mt-1.5 max-w-xl text-sm text-ink/60">{dict.pricing.option.description}</p>
          </div>
          <p className="shrink-0 font-serif text-3xl text-champagne-dark">
            {dict.pricing.option.price}
          </p>
        </div>
      </Reveal>

      {/* Note « sur devis » */}
      <Reveal delay={0.2}>
        <p className="mt-8 text-center text-sm italic text-ink/50">{dict.pricing.note}</p>
      </Reveal>
    </Section>
  );
}
