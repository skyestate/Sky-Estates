import type { Dictionary } from '@/content/types';
import fr from '@/content/fr';
import en from '@/content/en';
import es from '@/content/es';
import type { Locale } from './i18n';

const dictionaries: Record<Locale, Dictionary> = { fr, en, es };

/** Récupère le dictionnaire d'une langue. Import statique : rien à charger côté client. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
