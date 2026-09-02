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

/**
 * URL canonique du site.
 *
 * ⚠️ Cette valeur alimente `metadataBase: new URL(siteUrl)` dans le layout.
 *    `new URL()` lève une exception sur une chaîne mal formée — par exemple
 *    « skyestates.es » sans protocole — et fait alors échouer le prerender de
 *    toutes les pages, avec un message masqué en production. On ne laisse donc
 *    jamais une valeur d'environnement arriver brute jusqu'à `new URL()`.
 *
 * Ordre de préférence :
 *   1. NEXT_PUBLIC_SITE_URL, une fois normalisée et validée
 *   2. le domaine de production Vercel, puis celui du déploiement courant —
 *      ce qui donne des URL canoniques justes tant qu'aucun domaine n'est acheté
 *   3. le domaine par défaut
 */
function resoudreUrlDuSite(): string {
  const candidats = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    'https://skyestates.es',
  ];

  for (const candidat of candidats) {
    const valeur = candidat?.trim();
    if (!valeur) continue;
    // Vercel fournit ses domaines sans protocole : on le rajoute au besoin.
    const avecProtocole = /^https?:\/\//i.test(valeur) ? valeur : `https://${valeur}`;
    try {
      return new URL(avecProtocole).origin;
    } catch {
      // Valeur inexploitable : on passe au candidat suivant plutôt que
      // de laisser l'erreur remonter et casser la compilation.
    }
  }

  return 'https://skyestates.es';
}

export const siteUrl = resoudreUrlDuSite();

/** Construit un lien WhatsApp pré-rempli. */
export function whatsappLink(message: string): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
