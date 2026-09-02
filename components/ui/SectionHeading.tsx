import { cn } from '@/lib/utils';
import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Numéro d'ordre affiché avant le label. Purement structurel. */
  index?: string;
  intro?: string;
  align?: 'left' | 'center';
  /** Inverse les couleurs sur les sections à fond clair. */
  onLight?: boolean;
  className?: string;
};

/** Bloc titre standard : label champagne, titre serif, chapô. */
export default function SectionHeading({
  eyebrow,
  title,
  index,
  intro,
  align = 'left',
  onLight = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-prose2',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            'eyebrow flex items-center gap-3',
            align === 'center' && 'justify-center',
            onLight && 'text-champagne-dark',
          )}
        >
          {index && (
            <>
              <span className="font-serif text-[13px] tabular-nums">{index}</span>
              <span
                className={cn('h-px w-8', onLight ? 'bg-champagne-dark/40' : 'bg-champagne/40')}
                aria-hidden="true"
              />
            </>
          )}
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={cn(
            'display-section mt-5',
            onLight ? 'text-ink' : 'text-ivory',
          )}
        >
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'lede mt-6',
              onLight ? 'text-ink/65' : 'text-smoke',
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.2}>
        <div
          className={cn(
            'mt-8 h-px w-16 bg-champagne',
            align === 'center' && 'mx-auto',
          )}
        />
      </Reveal>
    </div>
  );
}
