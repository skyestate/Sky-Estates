import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import VideoThumb from '@/components/ui/VideoThumb';
import LoopingClip from '@/components/ui/LoopingClip';
import { portfolio } from '@/content/portfolio';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Trois prestations en lignes alternées (visuel / texte), façon éditorial.
 * ⚠️ VISUELS À REMPLACER : voir le tableau `visuals` ci-dessous.
 */
/*
 * Visuels des trois prestations. Le cadre est en 4:3 paysage : une photo
 * presque carrée est rognée d'environ 13 % en haut et en bas.
 * ⚠️ Pour en changer un, dépose ta photo sous un nom NEUF (les images sont
 *    mises en cache par leur URL) et mets à jour la ligne correspondante.
 */
const visuals: Record<string, string> = {
  photo: '/media/services/aerial-photo.jpg',
  video: '/media/services/aerial-video-poster.jpg',
  // Image extraite à 58 s de la vidéo Be Aloha : ligne d'horizon droite.
  // L'ancienne était prise pendant une inclinaison du drone, l'image penchait.
  fpv: '/media/services/fpv-poster.jpg',
};

/**
 * Prestations illustrées par une boucle vidéo silencieuse plutôt qu'une image
 * fixe. Elle tourne seule, sans contrôle et sans clic — c'est un visuel, pas
 * un lecteur. Pour en ajouter une : dépose le .mp4 et son image d'attente dans
 * /public/media/services/ et ajoute une ligne ici avec l'`id` de la prestation.
 */
const serviceLoops: Record<string, string> = {
  video: '/media/services/aerial-video-loop-1080.mp4',
};

/**
 * Prestations illustrées par une vidéo réelle plutôt qu'une image fixe.
 * La valeur est l'`id` d'une entrée de content/portfolio.ts : la vignette
 * devient cliquable et ouvre la même visionneuse que le portfolio.
 * Pour illustrer une autre prestation par une vidéo, ajoute une ligne ici.
 */
const serviceVideos: Record<string, string> = {
  fpv: 'be-aloha',
};

export default function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="services" tone="charcoal">
      <SectionHeading
        index="01"
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        intro={dict.services.intro}
      />

      <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
        {dict.services.items.map((service, index) => {
          const reversed = index % 2 === 1;
          const video = portfolio.find((p) => p.id === serviceVideos[service.id]);
          const boucle = serviceLoops[service.id];

          return (
            <article
              key={service.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Visuel */}
              <Reveal
                variant="wipe"
                className={cn('relative', reversed && 'lg:order-2')}
              >
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-card bg-ink ring-1 ring-ivory/10">
                  {boucle ? (
                    <LoopingClip
                      src={boucle}
                      poster={visuals[service.id]}
                      alt={`${service.title} — ${service.tagline}`}
                      className="transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                    />
                  ) : video ? (
                    <VideoThumb
                      item={video}
                      locale={locale}
                      dict={dict}
                      label={`${service.title} — ${service.tagline}`}
                    />
                  ) : (
                    <Media
                      src={visuals[service.id]}
                      alt={`${service.title} — ${service.tagline}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                    />
                  )}
                  {/* Numéro de service en filigrane */}
                  <span className="pointer-events-none absolute bottom-4 left-6 font-serif text-7xl leading-none text-ivory/15 sm:text-8xl">
                    {service.number}
                  </span>
                </div>
              </Reveal>

              {/* Texte */}
              <div className={cn(reversed && 'lg:order-1')}>
                <Reveal delay={0.1}>
                  <p className="eyebrow">{service.tagline}</p>
                </Reveal>

                <Reveal delay={0.16}>
                  <h3 className="display-card mt-4 text-ivory">{service.title}</h3>
                </Reveal>

                <Reveal delay={0.22}>
                  <p className="mt-6 text-base leading-relaxed text-smoke">{service.description}</p>
                </Reveal>

                <Reveal delay={0.28}>
                  <div className="mt-8 border-t border-graphite pt-8">
                    <p className="eyebrow">{dict.services.includesLabel}</p>
                    <ul className="mt-5 space-y-3">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ivory/75">
                          <svg
                            viewBox="0 0 16 16"
                            className="mt-[6px] h-3 w-3 shrink-0 text-champagne"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 8.5 L6 12.5 L14 3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
