import VideoThumb from '@/components/ui/VideoThumb';
import Reveal from '@/components/ui/Reveal';
import { portfolio } from '@/content/portfolio';
import type { Dictionary } from '@/content/types';
import type { Locale } from '@/lib/i18n';

/**
 * Bande vidéo encadrée, entre le portfolio et les tarifs.
 *
 * Elle n'est plus à fond perdu : elle respecte les marges du site et porte le
 * même rayon que les cartes. Un bloc collé aux bords de l'écran tranchait avec
 * le reste de la page, où tout est cadré.
 *
 * ⚠️ Ses textes lui sont propres (`dict.showcase`) et ne reprennent PAS ceux
 * de la section Services : réutiliser le titre d'une prestation ferait
 * apparaître deux fois le même intitulé sur la page.
 *
 * Le bien mis en avant est désigné par `dict.showcase.itemId` ; sa PREMIÈRE
 * entrée `media` doit être une vidéo. Rien n'est téléchargé avant le clic —
 * seule l'image d'attente est chargée.
 */
export default function Showcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const item = portfolio.find((p) => p.id === dict.showcase.itemId);
  if (!item || !item.media[0]?.video) return null;

  return (
    <section className="relative bg-ink py-8 sm:py-12">
      <div className="container-page">
        <div className="relative h-[70vh] min-h-[440px] w-full overflow-hidden rounded-card ring-1 ring-ivory/10">
        <VideoThumb
          item={item}
          locale={locale}
          dict={dict}
          label={`${dict.showcase.title} — ${item.property}, ${item.location}`}
        />

        {/* Voile : lisibilité du texte en bas, raccord avec les sections voisines */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="px-8 pb-10 sm:px-12 sm:pb-12">
            <Reveal>
              <p className="eyebrow">{dict.showcase.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-section mt-4 max-w-3xl text-ivory">
                {dict.showcase.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/70 sm:text-base">
                {dict.showcase.lead}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 text-xs uppercase tracking-eyebrow text-champagne">
                {item.property} · {item.location}
              </p>
            </Reveal>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
