import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  children: ReactNode;
  /** `ink` = noir profond, `charcoal` = anthracite, `ivory` = fond clair. */
  tone?: 'ink' | 'charcoal' | 'ivory';
  className?: string;
  /** Retire le padding horizontal (sections pleine largeur, ex. portfolio). */
  bleed?: boolean;
};

const tones = {
  ink: 'bg-ink text-ivory',
  charcoal: 'bg-charcoal text-ivory',
  ivory: 'bg-ivory text-ink',
};

/** Enveloppe commune à toutes les sections : rythme vertical et fond unifiés. */
export default function Section({ id, children, tone = 'ink', className, bleed }: SectionProps) {
  return (
    <section id={id} className={cn('py-24 sm:py-32 lg:py-40', tones[tone], className)}>
      <div className={bleed ? 'w-full' : 'container-page'}>{children}</div>
    </section>
  );
}
