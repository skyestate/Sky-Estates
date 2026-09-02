/**
 * Contrat de traduction.
 * Les trois fichiers de langue (fr.ts, en.ts, es.ts) sont typés `Dictionary` :
 * si une clé manque ou est mal orthographiée dans l'une des langues,
 * TypeScript le signale à la compilation. Aucun texte manquant possible.
 */

export type ServiceItem = {
  id: 'photo' | 'video' | 'fpv';
  number: string;
  title: string;
  tagline: string;
  description: string;
  /** Ce qui est livré — affiché en liste à puces sous la description. */
  deliverables: string[];
};

export type PricingPack = {
  id: string;
  name: string;
  audience: string;
  /** Prix plancher en euros, formaté à l'affichage selon la locale. */
  price: number;
  featured?: boolean;
  features: string[];
};

/** Un secteur d'activité autre que l'immobilier (mariage, yacht, golf…). */
export type SectorItem = {
  id: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Credential = {
  label: string;
  value: string;
};

export type LegalPage = {
  title: string;
  updated: string;
  blocks: { heading: string; body: string[] }[];
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogAlt: string;
  };

  nav: {
    services: string;
    portfolio: string;
    pricing: string;
    process: string;
    sectors: string;
    about: string;
    contact: string;
    cta: string;
    menu: string;
    close: string;
    language: string;
  };

  hero: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    videoFallbackAlt: string;
  };

  services: {
    eyebrow: string;
    title: string;
    intro: string;
    includesLabel: string;
    items: ServiceItem[];
  };

  portfolio: {
    eyebrow: string;
    title: string;
    intro: string;
    filters: { all: string; photo: string; video: string; fpv: string };
    empty: string;
    open: string;
    close: string;
    prev: string;
    next: string;
    counter: string; // ex. "{current} / {total}"
  };

  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    from: string;
    featuredLabel: string;
    packs: PricingPack[];
    option: { title: string; description: string; price: string };
    note: string;
    cta: string;
  };

  /** Bande vidéo pleine largeur — textes propres, distincts de `services`. */
  showcase: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    /** id d'une entrée de content/portfolio.ts */
    itemId: string;
  };

  sectors: {
    eyebrow: string;
    title: string;
    intro: string;
    items: SectorItem[];
    note: string;
    cta: string;
  };

  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: ProcessStep[];
  };

  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    credentials: Credential[];
    imageAlt: string;
  };

  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    directTitle: string;
    whatsappLabel: string;
    whatsappHint: string;
    emailLabel: string;
    instagramLabel: string;
    areasLabel: string;
    form: {
      name: string;
      email: string;
      phone: string;
      phoneOptional: string;
      propertyType: string;
      propertyTypes: { value: string; label: string }[];
      address: string;
      addressHint: string;
      surface: string;
      surfaceHint: string;
      services: string;
      serviceOptions: { value: string; label: string }[];
      date: string;
      dateHint: string;
      message: string;
      messageHint: string;
      submit: string;
      sending: string;
      required: string;
      successTitle: string;
      successBody: string;
      errorTitle: string;
      errorBody: string;
      fallbackCta: string;
      /** Message pré-rempli du lien WhatsApp de repli. */
      whatsappPrefill: string;
      selectPlaceholder: string;
      consent: string;
    };
  };

  footer: {
    tagline: string;
    areasTitle: string;
    navTitle: string;
    contactTitle: string;
    legalNotice: string;
    privacy: string;
    rights: string;
    credit: string;
  };

  legal: {
    notice: LegalPage;
    privacy: LegalPage;
  };

  notFound: {
    title: string;
    body: string;
    cta: string;
  };
};
