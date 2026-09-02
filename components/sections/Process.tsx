import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import type { Dictionary } from '@/content/types';

/** Les quatre étapes, reliées par un filet horizontal sur écran large. */
export default function Process({ dict }: { dict: Dictionary }) {
  return (
    <Section id="process" tone="ink">
      <SectionHeading
        index="05"
        eyebrow={dict.process.eyebrow}
        title={dict.process.title}
        intro={dict.process.intro}
      />

      <div className="relative mt-20">
        {/* Ligne de liaison, purement décorative */}
        <div
          className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-graphite to-transparent lg:block"
          aria-hidden="true"
        />

        <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {dict.process.steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.12} className="relative">
              {/* Pastille numérotée */}
              <div className="relative flex h-[52px] w-[52px] items-center justify-center border border-champagne/50 bg-ink">
                <span className="font-serif text-lg text-champagne">{step.number}</span>
              </div>

              <h3 className="display-card mt-7 text-ivory">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-smoke">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
