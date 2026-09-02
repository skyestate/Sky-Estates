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

  instagramHandle: '@skyestates_aerial',
  instagram: 'https://instagram.com/skyestates_aerial',

  // Zone d'intervention
  city: 'Marbella',
  region: 'Costa del Sol',
  country: 'ES',
  areas: [
    'Marbella',
    'Puerto Banús',
    'Nueva Andalucía',
    'San Pedro de Alcántara',
    'Benahavís',
    'Estepona',
    'Sotogrande',
    'Mijas',
    'Fuengirola',
  ],

  // Coordonnées géographiques de Marbella — utilisées par le JSON-LD LocalBusiness
  geo: { lat: 36.5101, lng: -4.8825 },
  serviceRadiusKm: 50,

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

/** Domaine de production, acheté et rattaché au projet Vercel. */
const DOMAINE_PRODUCTION = 'https://skyestates.es';

/**
 * URL canonique du site.
 *
 * Elle alimente `metadataBase`, les URL canoniques, les alternates `hreflang`,
 * le sitemap, le robots.txt et le balisage JSON-LD.
 *
 * ⚠️ Le domaine de production passe AVANT les variables Vercel. Sur Vercel,
 *    VERCEL_PROJECT_PRODUCTION_URL est toujours renseignée : la laisser en
 *    tête ferait pointer toutes les URL canoniques vers *.vercel.app, et
 *    Google indexerait ce domaine-là plutôt que skyestates.es.
 *
 * ⚠️ `new URL()` lève une exception sur une chaîne mal formée — « skyestates.es »
 *    sans protocole, par exemple — et ferait alors échouer le prerender de
 *    toutes les pages. Aucune valeur d'environnement n'arrive donc brute
 *    jusqu'à `new URL()`.
 *
 * Ordre : surcharge explicite, puis le domaine de production, puis l'URL du
 * déploiement Vercel en dernier recours (utile en préproduction).
 */
function resoudreUrlDuSite(): string {
  const candidats = [
    process.env.NEXT_PUBLIC_SITE_URL,
    DOMAINE_PRODUCTION,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
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

  return DOMAINE_PRODUCTION;
}

export const siteUrl = resoudreUrlDuSite();

/** Construit un lien WhatsApp pré-rempli. */
export function whatsappLink(message: string): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
