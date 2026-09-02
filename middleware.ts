import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

/**
 * Redirige toute URL sans préfixe de langue vers /en, /fr ou /es.
 *
 * À la première visite, l'anglais est servi à tout le monde — y compris aux
 * navigateurs configurés en français ou en espagnol. C'est un choix
 * commercial : l'anglais est la langue du marché visé.
 *
 * Dès que le visiteur change de langue dans le header, un cookie mémorise son
 * choix pour ses visites suivantes.
 *
 * Pour revenir à la détection automatique de la langue du navigateur,
 * remplace `defaultLocale` ci-dessous par
 *   pickLocale(request.headers.get('accept-language'))
 * et réimporte `pickLocale` depuis @/lib/i18n.
 */
const LOCALE_COOKIE = 'sky-locale';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])
      ? cookieLocale
      : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // On exclut l'API, les fichiers internes Next et tout chemin contenant une
  // extension (/media/*, /favicon.svg, /sitemap.xml…) du routage multilingue.
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
