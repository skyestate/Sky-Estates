import { site, siteUrl } from './site';
import type { Locale } from './i18n';
import { getDictionary } from './dictionary';

/**
 * Balisage schema.org LocalBusiness + catalogue de services.
 * Injecté dans le <head> — améliore l'affichage dans les résultats Google
 * et le référencement local ("drone Marbella", "photographe immobilier drone").
 */
export function localBusinessSchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#business`,
    name: site.name,
    description: dict.meta.description,
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/media/og/og-image.jpg`,
    telephone: site.phone,
    email: site.email,
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: 'Málaga',
      addressCountry: site.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.areas.map((name) => ({ '@type': 'City', name })),
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      geoRadius: site.serviceRadiusKm * 1000,
    },
    sameAs: [site.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.services.title,
      itemListElement: dict.pricing.packs.map((pack) => ({
        '@type': 'Offer',
        name: pack.name,
        description: pack.features.join(' · '),
        price: pack.price,
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: pack.price,
          priceCurrency: 'EUR',
        },
        itemOffered: {
          '@type': 'Service',
          serviceType: dict.services.items.map((s) => s.title).join(', '),
          provider: { '@id': `${siteUrl}/#business` },
        },
      })),
    },
  };
}
