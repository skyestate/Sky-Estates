import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { siteUrl } from '@/lib/site';

const routes = ['', '/mentions-legales', '/politique-confidentialite'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? ('monthly' as const) : ('yearly' as const),
      priority: route === '' ? 1 : 0.3,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${route}`])),
      },
    })),
  );
}
