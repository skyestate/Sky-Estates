export const locales = ['fr', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

/**
 * Langue servie à l'arrivée sur le site, quelle que soit celle du navigateur.
 * L'anglais est la langue de travail du marché immobilier de la Costa del Sol.
 */
export const defaultLocale: Locale = 'en';

/** Libellés affichés dans le sélecteur de langue du header. */
export const localeNames: Record<Locale, { short: string; long: string }> = {
  fr: { short: 'FR', long: 'Français' },
  en: { short: 'EN', long: 'English' },
  es: { short: 'ES', long: 'Español' },
};

/** Codes utilisés par les balises <html lang> et les alternates hreflang. */
export const localeHtmlLang: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Choisit la meilleure langue à partir de l'en-tête Accept-Language.
 *
 * ⚠️ NON UTILISÉE ACTUELLEMENT : le site sert l'anglais à tout le monde à la
 * première visite (voir middleware.ts). Conservée telle quelle — pour activer
 * la détection automatique de la langue du navigateur, il suffit de la
 * rebrancher dans le middleware, l'instruction y est commentée.
 */
export function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}
