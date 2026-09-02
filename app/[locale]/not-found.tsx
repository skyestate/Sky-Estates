import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { defaultLocale } from '@/lib/i18n';

/**
 * 404 localisée. Le segment [locale] n'étant pas accessible depuis un
 * not-found, on affiche le français par défaut — la langue reste accessible
 * via le sélecteur du header.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-40 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-4xl text-ivory sm:text-5xl">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-md text-smoke">{dict.notFound.body}</p>
      <Link href={`/${defaultLocale}`} className="btn-primary mt-10">
        {dict.notFound.cta}
      </Link>
    </div>
  );
}
