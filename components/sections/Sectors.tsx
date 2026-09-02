import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import type { Dictionary } from '@/content/types';

/**
 * Secteurs d'activité en dehors de l'immobilier.
 *
 * Placée après les tarifs : le visiteur a vu l'offre immobilière chiffrée, on
 * lui montre ensuite que le même savoir-faire couvre d'autres besoins — tous
 * sur devis, d'où l'absence de prix dans cette section.
 *
 * Visuels : format portrait, 1200 px de large minimum. Pour en changer un,
 * dépose ta photo dans /public/media/sectors/ sous un nom NEUF (jamais réutiliser
 * un nom existant : les images sont mises en cache par leur URL) et mets à jour
 * la ligne correspondante ci-dessous.
 * Si tu ajoutes un secteur dans content/{fr,en,es}.ts, ajoute ici l'image
 * correspondante avec le même `id`.
 */
const visuals: Record<string, string> = {
  wedding: '/media/sectors/wedding.jpg',
  yacht: '/media/sectors/yacht.jpg',
  golf: '/media/sectors/golf.jpg',
};

export default function Sectors({ dict }: { dict: Dictionary }) {
  return (
    <Section id="sectors" tone="charcoal">
      <SectionHeading
        index="04"
        eyebrow={dict.sectors.eyebrow}
        title={dict.sectors.title}
        intro={dict.sectors.intro}
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {dict.sectors.items.map((sector, i) => (
          <Reveal key={sector.id} delay={i * 0.1} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-card border border-graphite bg-ink transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-champagne/50 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Media
                  src={visuals[sector.id] ?? '/media/sectors/wedding.svg'}
                  alt={sector.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.05]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <h3 className="display-card text-ivory">{sector.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-smoke">
                  {sector.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Ouverture vers les autres demandes + rappel de l'appel à l'action */}
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col items-start gap-6 border-t border-graphite pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm italic leading-relaxed text-smoke">
            {dict.sectors.note}
          </p>
          <a href="#contact" className="btn-primary shrink-0">
            {dict.sectors.cta}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
