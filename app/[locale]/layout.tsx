import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

import Header from '@/components/layout/Header';
import ScrollProgress from '@/components/layout/ScrollProgress';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Footer from '@/components/layout/Footer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';

import { locales, localeHtmlLang, isLocale, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { localBusinessSchema } from '@/lib/schema';
import { siteUrl, site } from '@/lib/site';

/**
 * Ce layout est la racine de l'application : il est placé sous le segment
 * dynamique [locale] afin que <html lang> reflète la langue réellement servie
 * (approche officielle Next.js pour l'i18n en App Router).
 */

// Serif fine et élégante — réservée aux titres.
const serif = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-serif',
  display: 'swap',
});

// Sans-serif nette — texte courant, navigation, formulaires.
const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Seuls fr / en / es sont des segments valides : toute autre langue renvoie
 * un 404 au niveau du routage, sans passer par le rendu.
 */
export const dynamicParams = false;

/** Pré-génère les trois langues à la compilation : pages 100 % statiques. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s · ${site.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
        es: '/es',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteUrl}/${locale}`,
      locale: localeHtmlLang[locale].replace('-', '_'),
      images: [
        {
          url: '/media/og/og-image.jpg',
          width: 1200,
          height: 630,
          alt: dict.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <html lang={localeHtmlLang[typedLocale]} className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ink">
        {/* Lien d'évitement — accessibilité clavier */}
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] bg-champagne px-4 py-2 text-sm text-ink"
        >
          {locale === 'fr' ? 'Aller au contenu' : locale === 'es' ? 'Ir al contenido' : 'Skip to content'}
        </a>

        <SmoothScroll />
        <ScrollProgress />
        <Header locale={typedLocale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={typedLocale} dict={dict} />
        <WhatsAppFab dict={dict} />

        {/* Balisage schema.org LocalBusiness — SEO local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(typedLocale)) }}
        />
      </body>
    </html>
  );
}
