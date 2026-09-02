import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import type { Dictionary } from '@/content/types';

/**
 * Présentation courte + garanties (certification, assurance, matériel, délai).
 *
 * Photo : les deux frères — /public/media/about/brothers.jpg (portrait 3:4).
 * Le cadre est en 4:5, le recadrage est donc minime. Pour la changer, dépose
 * une nouvelle photo sous un nom NEUF et mets à jour le `src` ci-dessous
 * (ne jamais réutiliser un nom de fichier : cache navigateur).
 */
export default function About({ dict }: { dict: Dictionary }) {
  return (
    <Section id="about" tone="charcoal">
      <div className="grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        {/* Portrait */}
        <Reveal variant="wipe">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-ink ring-1 ring-ivory/10">
            <Media
              src="/media/about/brothers.jpg"
              alt={dict.about.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Filet décoratif décalé, signature visuelle discrète */}
            <div
              className="pointer-events-none absolute inset-4 rounded-[6px] border border-champagne/25"
              aria-hidden="true"
            />
          </div>
        </Reveal>

        {/* Texte */}
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="font-serif text-[13px] tabular-nums">06</span>
              <span className="h-px w-8 bg-champagne/40" aria-hidden="true" />
              {dict.about.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display-section mt-5 text-ivory">
              {dict.about.title}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {dict.about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.14 + i * 0.06}>
                <p className="text-base leading-relaxed text-smoke">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* Garanties */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-graphite bg-graphite sm:grid-cols-2">
            {dict.about.credentials.map((credential, i) => (
              <Reveal key={credential.label} delay={0.2 + i * 0.07}>
                <div className="h-full bg-charcoal p-6">
                  <p className="eyebrow">{credential.label}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ivory/85">{credential.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
