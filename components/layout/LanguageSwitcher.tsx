'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Sélecteur de langue.
 * Conserve la page courante en changeant uniquement le préfixe de langue,
 * et mémorise le choix dans un cookie lu par le middleware aux visites suivantes.
 */
export default function LanguageSwitcher({
  locale,
  label,
  onLight = false,
}: {
  locale: Locale;
  label: string;
  onLight?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu au clic extérieur et à la touche Échap.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    document.cookie = `sky-locale=${next}; path=/; max-age=31536000; samesite=lax`;
    const rest = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${next}${rest}`);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          'flex items-center gap-1.5 px-2 py-1.5 font-sans text-[12px] tracking-wide2 transition-colors duration-300',
          onLight ? 'text-ink/70 hover:text-ink' : 'text-ivory/70 hover:text-ivory',
        )}
      >
        {localeNames[locale].short}
        <svg
          viewBox="0 0 12 8"
          className={cn('h-2 w-3 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden="true"
        >
          <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[9rem] border border-graphite bg-ink/95 py-1 backdrop-blur-md"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className={cn(
                  'w-full px-4 py-2.5 text-left font-sans text-[13px] transition-colors duration-200',
                  l === locale ? 'text-champagne' : 'text-ivory/70 hover:text-ivory',
                )}
              >
                {localeNames[l].long}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
