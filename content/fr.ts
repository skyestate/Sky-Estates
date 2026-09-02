import type { Dictionary } from './types';

/**
 * 🇫🇷 TOUT LE TEXTE FRANÇAIS DU SITE EST ICI.
 * Tarifs inclus. Modifie librement : aucune chaîne n'est codée en dur ailleurs.
 */
const fr: Dictionary = {
  meta: {
    title: 'Sky Estates — Photographie & vidéo drone immobilier à Marbella',
    description:
      "Photographie et vidéographie par drone pour l'immobilier de prestige à Marbella, Puerto Banús, Benahavís et Estepona. Photos aériennes, vidéos cinématiques et visites FPV intérieures livrées sous 48 h.",
    keywords: [
      'drone Marbella',
      'photographe immobilier drone Costa del Sol',
      'vidéo drone villa Marbella',
      'photographie aérienne Puerto Banús',
      'FPV immobilier Marbella',
      'drone Benahavís',
      'vidéo immobilier de luxe Estepona',
    ],
    ogAlt: 'Vue aérienne d’une villa de prestige sur la Costa del Sol',
  },

  nav: {
    services: 'Services',
    portfolio: 'Portfolio',
    pricing: 'Tarifs',
    process: 'Processus',
    sectors: 'Autres secteurs',
    about: 'À propos',
    contact: 'Contact',
    cta: 'Demander un devis',
    menu: 'Ouvrir le menu',
    close: 'Fermer le menu',
    language: 'Changer de langue',
  },

  hero: {
    eyebrow: 'Marbella · Costa del Sol',
    titleTop: 'L’immobilier de prestige',
    titleBottom: 'vu du ciel',
    subtitle:
      'Photographie et vidéographie par drone pour les villas, penthouses et propriétés d’exception de la Costa del Sol. Livraison sous 48 heures.',
    ctaPrimary: 'Demander un devis',
    ctaSecondary: 'Voir le portfolio',
    scroll: 'Découvrir',
    videoFallbackAlt: 'Survol au drone d’une villa de luxe à Marbella',
  },

  services: {
    eyebrow: 'Ce que nous réalisons',
    title: 'Trois façons de sublimer un bien',
    intro:
      'Chaque prestation est pensée pour un seul objectif : donner envie de visiter. Prises de vue, étalonnage et montage inclus.',
    includesLabel: 'Ce qui est livré',
    items: [
      {
        id: 'photo',
        number: '01',
        title: 'Photographie aérienne',
        tagline: 'Extérieur & environnement',
        description:
          'Des vues aériennes qui révèlent ce qu’aucune photo au sol ne montre : l’implantation du bien, la piscine, le jardin, la vue mer et la qualité du quartier. Cadrages travaillés à la golden hour lorsque la lumière le permet.',
        deliverables: [
          '15 à 40 photos retouchées selon le pack',
          'Format horizontal 4:3 + recadrages verticaux pour Instagram',
          'Retouche professionnelle : exposition, couleurs, ciel, perspective',
          'Livraison en pleine résolution + versions web optimisées',
          'Droits d’utilisation commerciale inclus (portails, brochures, réseaux)',
        ],
      },
      {
        id: 'video',
        number: '02',
        title: 'Vidéo aérienne',
        tagline: 'Plans cinématiques',
        description:
          'Un film court et rythmé qui raconte la propriété : approche aérienne, révélation de la façade, orbite autour de la piscine, ouverture sur la mer et les montagnes. Montage monté sur musique, étalonnage cinéma.',
        deliverables: [
          'Vidéo montée de 45 s à 2 min selon le pack',
          'Résolution 4K · 30 fps (export 1080p inclus)',
          'Étalonnage colorimétrique et montage sur musique libre de droits',
          'Version verticale 9:16 pour Reels et Stories',
          'Deux allers-retours de retouches inclus',
        ],
      },
      {
        id: 'fpv',
        number: '03',
        title: 'Vidéo FPV intérieure',
        tagline: 'Visite immersive en un plan',
        description:
          'Le plan-séquence qui fait la différence : un drone FPV traverse la propriété sans coupure, de l’entrée au salon, franchit les baies vitrées et s’élève au-dessus de la piscine. L’acheteur ressent le volume avant même d’avoir visité.',
        deliverables: [
          'Un plan-séquence continu de 30 à 60 s',
          'Repérage et répétitions sur place avant la prise réelle',
          'Stabilisation et étalonnage cinéma',
          'Sound design sur mesure',
          'Version verticale 9:16 incluse',
        ],
      },
    ],
  },

  portfolio: {
    eyebrow: 'Réalisations',
    title: 'Portfolio',
    intro: 'Une sélection de propriétés récentes. Filtrez par type de prestation.',
    filters: { all: 'Tout', photo: 'Photo', video: 'Vidéo', fpv: 'FPV' },
    empty: 'Aucune réalisation dans cette catégorie pour le moment.',
    open: 'Agrandir',
    close: 'Fermer',
    prev: 'Précédent',
    next: 'Suivant',
    counter: '{current} sur {total}',
  },

  pricing: {
    eyebrow: 'Tarifs',
    title: 'Paiement à la propriété, sans abonnement',
    intro:
      'Un tarif par bien, réglé une seule fois. Pas de forfait mensuel, pas d’engagement. Le prix dépend du type de propriété et de sa taille.',
    from: 'à partir de',
    featuredLabel: 'Le plus demandé',
    packs: [
      {
        id: 'apartment',
        name: 'Appartement / Penthouse',
        audience: 'Biens en résidence, penthouses, duplex',
        price: 250,
        features: [
          '15 photos aériennes retouchées',
          '1 vidéo drone extérieure de 45 à 60 s',
          'Version verticale 9:16 pour les réseaux',
          'Livraison sous 48 h',
          'Droits d’utilisation commerciale inclus',
        ],
      },
      {
        id: 'villa',
        name: 'Villa standard',
        audience: 'Jusqu’à environ 400 m²',
        price: 350,
        featured: true,
        features: [
          '25 photos aériennes retouchées',
          '1 vidéo drone extérieure de 60 à 90 s',
          'Version verticale 9:16 pour les réseaux',
          'Plans du jardin, de la piscine et de l’environnement',
          'Livraison sous 48 h',
          'Droits d’utilisation commerciale inclus',
        ],
      },
      {
        id: 'estate',
        name: 'Villa de prestige',
        audience: 'Grandes propriétés, 400 m² et plus',
        price: 500,
        features: [
          '40 photos aériennes retouchées',
          '1 vidéo drone extérieure de 90 s à 2 min',
          'Version verticale 9:16 pour les réseaux',
          'Couverture complète du domaine et des extérieurs',
          'Prises de vue à la golden hour si les conditions le permettent',
          'Livraison sous 48 h',
          'Droits d’utilisation commerciale inclus',
        ],
      },
    ],
    option: {
      title: 'Option — Vidéo FPV intérieure',
      description:
        'Ajoutez un plan-séquence immersif à travers la propriété, sur n’importe quel pack.',
      price: '+100 à 150 €',
    },
    note: 'Tarif sur devis pour les propriétés d’exception ou les besoins spécifiques.',
    cta: 'Réserver ce pack',
  },

  showcase: {
    eyebrow: 'Le plan signature',
    title: 'Du portail à la terrasse, sans une seule coupe',
    lead:
      'Deux minutes de vol continu à travers la Villa Benahavís. C’est le format qui retient un acheteur sur une annonce, là où une galerie de photos se parcourt en dix secondes.',
    cta: 'Voir la visite',
    itemId: 'villa-benahavis',
  },

  sectors: {
    eyebrow: 'Au-delà de l’immobilier',
    title: 'Le même regard, d’autres terrains de jeu',
    intro:
      'L’immobilier de prestige est notre cœur de métier, mais un drone raconte aussi bien un domaine viticole qu’un yacht en navigation. Voici ce que nous filmons régulièrement en dehors des biens immobiliers.',
    items: [
      {
        id: 'wedding',
        title: 'Mariages & événements',
        description:
          'Le plan d’ouverture que personne n’oublie : la cérémonie vue du ciel, le domaine dans son décor, l’arrivée des mariés en travelling aérien. Nous travaillons en complément de votre vidéaste, sans jamais gêner la cérémonie.',
      },
      {
        id: 'yacht',
        title: 'Yachts & bateaux',
        description:
          'Un bateau ne se photographie bien que depuis les airs. Suivi en navigation, orbites au mouillage, plans de coque et de pont : de quoi vendre, louer ou promouvoir une unité à sa juste valeur.',
      },
      {
        id: 'golf',
        title: 'Golfs & domaines',
        description:
          'Signature holes, parcours complets, clubhouses et resorts. Des vues aériennes qui donnent enfin à voir le dessin d’un parcours et la qualité d’un domaine.',
      },
    ],
    note: 'Un autre projet en tête ? Hôtellerie, chantier, événement sportif, tournage publicitaire — parlons-en.',
    cta: 'Demander un devis',
  },

  process: {
    eyebrow: 'Comment ça se passe',
    title: 'Quatre étapes, quarante-huit heures',
    intro: 'De la première prise de contact aux fichiers livrés, sans friction.',
    steps: [
      {
        number: '01',
        title: 'Contact & devis',
        description:
          'Vous décrivez le bien en deux minutes via le formulaire ou WhatsApp. Vous recevez un devis ferme dans la journée.',
      },
      {
        number: '02',
        title: 'Réservation d’un créneau',
        description:
          'On cale une date en fonction de la météo et de l’orientation du bien, pour une lumière optimale.',
      },
      {
        number: '03',
        title: 'Tournage sur place',
        description:
          'Une à deux heures sur site selon la taille de la propriété. Votre présence n’est pas nécessaire.',
      },
      {
        number: '04',
        title: 'Livraison sous 48 h',
        description:
          'Photos retouchées et vidéo montée, transmises par lien de téléchargement. Retouches incluses.',
      },
    ],
  },

  about: {
    eyebrow: 'À propos',
    title: 'Deux frères, une exigence : que le bien donne envie',
    paragraphs: [
      'Sky Estates, c’est nous deux. Basés à Marbella, nous réalisons les prises de vue aériennes des agences immobilières, des promoteurs et des propriétaires de la Costa del Sol. Chaque tournage est préparé en amont — orientation du bien, heure de lumière, plan de vol — et nous sommes tous les deux sur place le jour J : l’un pilote, l’autre cadre et repère les axes.',
      'Le montage et l’étalonnage sont faits par nos soins, jamais sous-traités : c’est là que se joue l’écart entre des images correctes et des images qui donnent envie de visiter. Vous recevez les fichiers sous 48 heures, droits d’utilisation commerciale compris.',
      'Nous intervenons à Marbella, Puerto Banús, Benahavís, Estepona et Nueva Andalucía. Déplacement possible ailleurs sur la Costa del Sol, sur devis.',
    ],
    credentials: [
      { label: 'Matériel', value: 'Drone 4K stabilisé + drone FPV cinéma' },
      { label: 'Délai', value: 'Livraison garantie sous 48 h' },
    ],
    imageAlt: 'Les deux frères fondateurs de Sky Estates, en chemise blanche',
  },

  contact: {
    eyebrow: 'Parlons de votre bien',
    title: 'Demander un devis',
    intro:
      'Décrivez la propriété en quelques champs. Vous recevez une réponse chiffrée dans la journée, du lundi au samedi.',
    directTitle: 'Ou directement',
    whatsappLabel: 'WhatsApp',
    whatsappHint: 'Réponse en général sous une heure',
    emailLabel: 'E-mail',
    instagramLabel: 'Instagram',
    areasLabel: 'Zone d’intervention',
    form: {
      name: 'Nom complet',
      email: 'E-mail',
      phone: 'Téléphone',
      phoneOptional: 'facultatif',
      propertyType: 'Type de bien',
      propertyTypes: [
        { value: 'apartment', label: 'Appartement / Penthouse' },
        { value: 'villa', label: 'Villa (jusqu’à 400 m²)' },
        { value: 'estate', label: 'Villa de prestige (400 m²+)' },
        { value: 'other', label: 'Autre / Projet spécifique' },
      ],
      address: 'Adresse ou secteur du bien',
      addressHint: 'Ex. Nueva Andalucía, La Zagaleta, Puerto Banús…',
      surface: 'Surface approximative',
      surfaceHint: 'En m², une estimation suffit',
      services: 'Prestations souhaitées',
      serviceOptions: [
        { value: 'photo', label: 'Photographie aérienne' },
        { value: 'video', label: 'Vidéo aérienne' },
        { value: 'fpv', label: 'Vidéo FPV intérieure' },
      ],
      date: 'Date souhaitée',
      dateHint: 'Modifiable ensuite selon la météo',
      message: 'Précisions',
      messageHint: 'Contraintes d’accès, délai serré, usage prévu des images…',
      submit: 'Envoyer la demande',
      sending: 'Envoi en cours…',
      required: 'Champ obligatoire',
      successTitle: 'Demande envoyée',
      successBody:
        'Merci. Votre demande est bien arrivée — vous recevrez un devis chiffré dans la journée.',
      errorTitle: 'L’envoi a échoué',
      errorBody:
        'Le formulaire n’a pas pu être transmis. Écrivez-nous directement sur WhatsApp, la réponse sera aussi rapide.',
      fallbackCta: 'Écrire sur WhatsApp',
      whatsappTitle: 'Terminons sur WhatsApp',
      whatsappBody:
        'Votre demande est prête : le bouton ci-dessous ouvre WhatsApp avec toutes vos informations déjà saisies. Il ne vous reste qu’à l’envoyer — réponse en général sous une heure.',
      whatsappPrefill:
        'Bonjour Sky Estates, je souhaite un devis pour une prise de vue drone. Voici mon bien : ',
      selectPlaceholder: 'Sélectionner…',
      consent:
        'Vos informations servent uniquement à établir le devis et ne sont jamais transmises à des tiers.',
    },
  },

  footer: {
    tagline: 'Photographie & vidéographie par drone pour l’immobilier de prestige.',
    areasTitle: 'Zone couverte',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    legalNotice: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    rights: 'Tous droits réservés.',
    credit: 'Marbella · Costa del Sol · Espagne',
  },

  legal: {
    notice: {
      title: 'Mentions légales',
      updated: 'Dernière mise à jour : septembre 2026',
      blocks: [
        {
          heading: 'Éditeur du site',
          body: [
            'Sky Estates — photographie et vidéographie par drone, Marbella (Espagne).',
            'E-mail : skyestates0@gmail.com',
            'Téléphone : +34 610 188 793',
          ],
        },
        {
          heading: 'Hébergement',
          body: [
            'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.',
          ],
        },
        {
          heading: 'Propriété intellectuelle',
          body: [
            'L’ensemble des photographies et vidéos présentées sur ce site est la propriété de Sky Estates. Toute reproduction sans autorisation écrite est interdite.',
            'Les droits d’utilisation commerciale des images livrées sont cédés au client dans le cadre défini au devis.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      updated: 'Dernière mise à jour : septembre 2026',
      blocks: [
        {
          heading: 'Données collectées',
          body: [
            'Le formulaire de devis collecte uniquement les informations que vous saisissez : nom, e-mail, téléphone, description du bien et date souhaitée.',
            'Aucun cookie de mesure d’audience ou de publicité n’est déposé sur ce site.',
          ],
        },
        {
          heading: 'Utilisation',
          body: [
            'Ces données servent exclusivement à répondre à votre demande de devis et à organiser la prestation. Elles ne sont ni vendues, ni transmises à des tiers à des fins commerciales.',
          ],
        },
        {
          heading: 'Conservation',
          body: [
            'Les demandes sont conservées le temps nécessaire au traitement commercial, puis pendant la durée légale applicable aux documents comptables.',
          ],
        },
        {
          heading: 'Vos droits',
          body: [
            'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Adressez votre demande à skyestates0@gmail.com.',
          ],
        },
      ],
    },
  },

  notFound: {
    title: 'Page introuvable',
    body: 'Cette page n’existe pas ou a été déplacée.',
    cta: 'Retour à l’accueil',
  },
};

export default fr;
