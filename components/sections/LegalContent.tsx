import Reveal from '@/components/ui/Reveal';
import type { LegalPage } from '@/content/types';

/** Gabarit commun aux pages Mentions légales et Politique de confidentialité. */
export default function LegalContent({ page }: { page: LegalPage }) {
  return (
    <article className="container-page py-40 sm:py-48">
      <div className="max-w-prose2">
        <Reveal>
          <h1 className="display-section text-ivory">{page.title}</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-xs uppercase tracking-eyebrow text-smoke">{page.updated}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 h-px w-16 bg-champagne" />
        </Reveal>

        <div className="mt-14 space-y-12">
          {page.blocks.map((block, i) => (
            <Reveal key={block.heading} delay={0.06 * i}>
              <section>
                <h2 className="text-2xl text-ivory">{block.heading}</h2>
                <div className="mt-4 space-y-3">
                  {block.body.map((paragraph, j) => (
                    <p key={j} className="text-sm leading-relaxed text-smoke">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
