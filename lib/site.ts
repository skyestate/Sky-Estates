/**
 * Coordonnées et constantes de l'entreprise.
 * ⚠️ Point unique de vérité : modifie ici, ça se propage partout (header,
 * footer, formulaire, JSON-LD, liens WhatsApp).
 */
export const site = {
  name: 'Sky Estates',
  legalName: 'Sky Estates',

  // Téléphone / WhatsApp
  phone: '+34610188793',                 // format E.164, pour les liens tel:
  phoneDisplay: '+34 610 188 793',       // format affiché
  whatsapp: 'https://wa.me/34610188793', // sans le +

  email: 'skyestates0@gmail.com',

  instagramHandle: '@skybyview_aerial',
  instagram: 'https://instagram.com/skybyview_aerial',

  // Zone d'intervention
  city: 'Marbella',
  region: 'Costa del Sol',
  country: 'ES',
  areas: ['Marbella', 'Puerto Banús', 'Benahavís', 'Estepona', 'Nueva Andalucía'],

  // Coordonnées géographiques de Marbella — utilisées par le JSON-LD LocalBusiness
  geo: { lat: 36.5101, lng: -4.8825 },
  serviceRadiusKm: 40,

  /*
   * Informations légales espagnoles.
   * ⚠️ À compléter avant toute activité commerciale déclarée : la loi
   *    espagnole (LSSI-CE) impose que les mentions légales portent le nom
   *    de l'exploitant, son NIF et son adresse. Renseigne-les ici, puis
   *    ajoute-les dans le bloc `legal.notice` de content/{fr,en,es}.ts.
   */
  legal: {
    nif: '',
    address: '',
    droneOperatorId: '',
    insurer: '',
  },
} as const;

/** URL canonique du site (surchargée par NEXT_PUBLIC_SITE_URL en production). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skyestates.es').replace(/\/$/, '');

/** Construit un lien WhatsApp pré-rempli. */
export function whatsappLink(message: string): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
