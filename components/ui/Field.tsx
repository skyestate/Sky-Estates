import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Classes partagées par tous les champs du formulaire (fond sombre). */
export const fieldClass =
  'w-full rounded-control border border-graphite bg-ink px-4 py-3.5 font-sans text-sm text-ivory ' +
  'placeholder:text-smoke/60 transition-colors duration-300 ' +
  'focus:border-champagne focus:outline-none';

export default function Field({
  id,
  label,
  hint,
  optional,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="font-sans text-[11px] uppercase tracking-wide2 text-ivory/70">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal text-smoke">({optional})</span>}
      </label>

      {children}

      {hint && !error && <p className="text-xs text-smoke">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-champagne">
          {error}
        </p>
      )}
    </div>
  );
}
