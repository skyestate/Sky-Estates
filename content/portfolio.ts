import type { Locale } from '@/lib/i18n';

export type PortfolioKind = 'photo' | 'video' | 'fpv';

/** Un média : une photo, ou une vidéo avec son image d'attente. */
export type PortfolioMedia = {
  /** Image affichée. Pour une vidéo, c'est l'image d'attente (poster). */
  src: string;
  /** Fichier .mp4 — présent uniquement si ce média est une vidéo. */
  video?: string;
  /** Texte alternatif traduit — obligatoire pour l'accessibilité. */
  alt: Record<Locale, string>;
};

/**
 * Une propriété = UNE carte dans la grille, quel que soit le nombre de photos.
 * Le premier média sert de vignette ; les suivants se parcourent dans la
 * visionneuse avec les flèches.
 */
export type PortfolioItem = {
  id: string;
  property: string;
  location: string;
  /**
   * Prestations réalisées sur ce bien. Un même bien peut relever de
   * plusieurs catégories : il apparaît alors sous chacun des filtres
   * correspondants, mais ne compte jamais que pour une seule carte.
   */
  kinds: PortfolioKind[];
  /** Ratio de la vignette dans la mosaïque. */
  aspect: 'portrait' | 'landscape' | 'square';
  media: PortfolioMedia[];
};

/**
 * ══════════════════════════════════════════════════════════════════════════
 *  PORTFOLIO
 * ══════════════════════════════════════════════════════════════════════════
 *  Une entrée par PROPRIÉTÉ, pas par photo. Pour ajouter des vues à un bien
 *  existant, ajoute des objets dans son tableau `media` — la grille continue
 *  de n'afficher qu'une seule carte.
 *
 *  ⚠️ NE JAMAIS réutiliser un nom de fichier pour une autre photo.
 *     Les images sont mises en cache par leur URL, côté navigateur et côté
 *     CDN : réemployer `villa-01.jpg` pour un autre bien ferait afficher
 *     l'ancienne photo aux visiteurs déjà venus. Donne toujours un nom neuf.
 *
 *  Pour publier une nouvelle propriété :
 *  1. Dépose les fichiers dans /public/media/portfolio/
 *     · photos → .jpg ou .webp, 1600 px de large minimum
 *     · vidéos → .mp4 (H.264) + une image poster .jpg
 *  2. Ajoute une entrée ci-dessous avec `property`, `location`, `kind`
 *     et un `media` par vue, chacun avec ses trois textes `alt`.
 * ══════════════════════════════════════════════════════════════════════════
 */
export const portfolio: PortfolioItem[] = [
  {
    id: 'be-aloha',
    property: 'Be Aloha',
    location: 'Nueva Andalucía',
    kinds: ['fpv'],
    aspect: 'landscape',
    media: [
      {
        src: '/media/portfolio/be-aloha-fpv-poster.jpg',
        video: '/media/portfolio/be-aloha-fpv-1080.mp4',
        alt: {
          fr: 'Visite FPV d’un appartement à Be Aloha : approche des terrasses puis traversée des pièces',
          en: 'FPV tour of an apartment at Be Aloha: terrace approach, then a flight through the rooms',
          es: 'Recorrido FPV de un apartamento en Be Aloha: aproximación a las terrazas y paso por las estancias',
        },
      },
    ],
  },

  {
    id: 'villa-benahavis',
    property: 'Villa Benahavís',
    location: 'Benahavís',
    kinds: ['fpv', 'photo'],
    aspect: 'landscape',
    media: [
      {
        src: '/media/portfolio/benahavis-fpv-poster.jpg',
        video: '/media/portfolio/benahavis-fpv-musique.mp4',
        alt: {
          fr: 'Visite FPV de la Villa Benahavís : approche extérieure, puis traversée des pièces jusqu’à la terrasse',
          en: 'FPV tour of Villa Benahavís: exterior approach, then a flight through the rooms out to the terrace',
          es: 'Recorrido FPV de Villa Benahavís: aproximación exterior y paso por las estancias hasta la terraza',
        },
      },
      {
        src: '/media/portfolio/benahavis-01.jpg',
        alt: {
          fr: 'La Villa Benahavís sur sa crête, piscine et jardin, la sierra en arrière-plan',
          en: 'Villa Benahavís on its ridge, pool and garden, with the sierra behind',
          es: 'Villa Benahavís en su cresta, piscina y jardín, con la sierra al fondo',
        },
      },
      {
        src: '/media/portfolio/benahavis-02.jpg',
        alt: {
          fr: 'Vue aérienne de la propriété, de son jardin en terrasses et des routes en lacets',
          en: 'Aerial view of the property, its terraced garden and the winding roads',
          es: 'Vista aérea de la propiedad, su jardín aterrazado y las carreteras en curva',
        },
      },
      {
        src: '/media/portfolio/benahavis-03.jpg',
        alt: {
          fr: 'Vue à la verticale de la Villa Benahavís : toitures, piscine et pelouse',
          en: 'Top-down view of Villa Benahavís: roofs, pool and lawn',
          es: 'Vista cenital de Villa Benahavís: cubiertas, piscina y césped',
        },
      },
      {
        src: '/media/portfolio/benahavis-04.jpg',
        alt: {
          fr: 'La villa et sa piscine vues du ciel, jardin clos sur un promontoire',
          en: 'The villa and its pool from above, walled garden on a promontory',
          es: 'La villa y su piscina desde el cielo, jardín cerrado sobre un promontorio',
        },
      },
      {
        src: '/media/portfolio/benahavis-05.jpg',
        alt: {
          fr: 'Façade sud de la villa : arcades, pergola et piscine au premier plan',
          en: 'South façade of the villa: arcades, pergola and pool in the foreground',
          es: 'Fachada sur de la villa: arcadas, pérgola y piscina en primer plano',
        },
      },
      {
        src: '/media/portfolio/benahavis-06.jpg',
        alt: {
          fr: 'La propriété dans son quartier résidentiel, collines et villas voisines',
          en: 'The property within its residential neighbourhood, hills and neighbouring villas',
          es: 'La propiedad en su urbanización, colinas y villas vecinas',
        },
      },
      {
        src: '/media/portfolio/benahavis-07.jpg',
        alt: {
          fr: 'Entrée et cour pavée de la villa, la vallée boisée en contrebas',
          en: 'Entrance and paved courtyard of the villa, the wooded valley below',
          es: 'Entrada y patio empedrado de la villa, con el valle boscoso abajo',
        },
      },
      {
        src: '/media/portfolio/benahavis-08.jpg',
        alt: {
          fr: 'La Villa Benahavís dominant la vallée, la Méditerranée à l’horizon',
          en: 'Villa Benahavís overlooking the valley, the Mediterranean on the horizon',
          es: 'Villa Benahavís dominando el valle, con el Mediterráneo en el horizonte',
        },
      },
    ],
  },

  {
    id: 'great-villa',
    property: 'Great Villa',
    location: 'Marbella',
    kinds: ['photo'],
    aspect: 'landscape',
    media: [
      {
        src: '/media/portfolio/great-villa-01.jpg',
        alt: {
          fr: 'La Great Villa dans son environnement : la sierra derrière, la Méditerranée à droite',
          en: 'Great Villa in its setting: the sierra behind, the Mediterranean to the right',
          es: 'Great Villa en su entorno: la sierra detrás y el Mediterráneo a la derecha',
        },
      },
      {
        src: '/media/portfolio/great-villa-02.jpg',
        alt: {
          fr: 'La villa vue du ciel, jardin et piscine, la mer à l’horizon',
          en: 'The villa from above, garden and pool, with the sea on the horizon',
          es: 'La villa desde el cielo, jardín y piscina, con el mar en el horizonte',
        },
      },
      {
        src: '/media/portfolio/great-villa-03.jpg',
        alt: {
          fr: 'Vue à la verticale de la Great Villa : toitures en tuiles, terrasses et piscine',
          en: 'Top-down view of Great Villa: tiled roofs, terraces and pool',
          es: 'Vista cenital de Great Villa: cubiertas de teja, terrazas y piscina',
        },
      },
      {
        src: '/media/portfolio/great-villa-04.jpg',
        alt: {
          fr: 'Façade principale de la Great Villa, terrasses en terre cuite et piscine',
          en: 'Main façade of Great Villa, terracotta terraces and pool',
          es: 'Fachada principal de Great Villa, terrazas de barro cocido y piscina',
        },
      },
      {
        src: '/media/portfolio/great-villa-05.jpg',
        alt: {
          fr: 'La villa et son jardin planté de palmiers, montagnes en arrière-plan',
          en: 'The villa and its palm-planted garden, mountains in the background',
          es: 'La villa y su jardín de palmeras, con las montañas al fondo',
        },
      },
    ],
  },


  {
    id: 'villa-magna',
    property: 'Villa Magna',
    location: 'Nueva Andalucía',
    kinds: ['photo'],
    aspect: 'landscape',
    media: [
      {
        src: '/media/portfolio/villa-magna-01.jpg',
        alt: {
          fr: 'La Villa Magna vue du ciel : terrasses, piscine et paillote au premier plan',
          en: 'Villa Magna from above: terraces, pool and thatched cabana in the foreground',
          es: 'Villa Magna desde el cielo: terrazas, piscina y chiringuito de paja en primer plano',
        },
      },
      {
        src: '/media/portfolio/villa-magna-02.jpg',
        alt: {
          fr: 'La propriété en bordure de parcours de golf, entrée et cour pavée',
          en: 'The property bordering the golf course, entrance and paved courtyard',
          es: 'La propiedad junto al campo de golf, entrada y patio empedrado',
        },
      },
      {
        src: '/media/portfolio/villa-magna-03.jpg',
        alt: {
          fr: 'Vue à la verticale de la Villa Magna, toiture d’ardoise et piscines voisines',
          en: 'Top-down view of Villa Magna, slate roof and neighbouring pools',
          es: 'Vista cenital de Villa Magna, cubierta de pizarra y piscinas vecinas',
        },
      },
    ],
  },

  {
    id: 'marbs-view',
    property: 'Marbs View',
    location: 'Marbella',
    kinds: ['photo'],
    aspect: 'landscape',
    media: [
      {
        src: '/media/portfolio/marbs-view-01.jpg',
        alt: {
          fr: 'Villa contemporaine vue du ciel : piscine à couloir, terrasses et toit-terrasse',
          en: 'Contemporary villa from above: lap pool, terraces and roof terrace',
          es: 'Villa contemporánea desde el cielo: piscina de nado, terrazas y azotea',
        },
      },
      {
        src: '/media/portfolio/marbs-view-02.jpg',
        alt: {
          fr: 'Vue à la verticale de la propriété, de son jardin et de la route en contrebas',
          en: 'Top-down view of the property, its garden and the road below',
          es: 'Vista cenital de la propiedad, su jardín y la carretera de abajo',
        },
      },
      {
        src: '/media/portfolio/marbs-view-03.jpg',
        alt: {
          fr: 'Vue à la verticale rapprochée : piscine, solarium et panneaux solaires en toiture',
          en: 'Close top-down view: pool, sun deck and rooftop solar panels',
          es: 'Vista cenital cercana: piscina, solárium y placas solares en cubierta',
        },
      },
    ],
  },
];
