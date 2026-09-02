import type { Dictionary } from './types';

/** 🇬🇧 ALL ENGLISH COPY LIVES HERE — pricing included. */
const en: Dictionary = {
  meta: {
    title: 'Sky Estates — Real estate drone photography & video in Marbella',
    description:
      'Aerial photography and videography for luxury real estate in Marbella, Puerto Banús, Benahavís and Estepona. Drone stills, cinematic films and immersive FPV interior tours delivered within 48 hours.',
    keywords: [
      'drone Marbella',
      'real estate drone photographer Costa del Sol',
      'villa drone video Marbella',
      'aerial photography Puerto Banús',
      'FPV real estate Marbella',
      'drone Benahavís',
      'luxury property video Estepona',
    ],
    ogAlt: 'Aerial view of a luxury villa on the Costa del Sol',
  },

  nav: {
    services: 'Services',
    portfolio: 'Portfolio',
    pricing: 'Pricing',
    process: 'Process',
    sectors: 'Other sectors',
    about: 'About',
    contact: 'Contact',
    cta: 'Request a quote',
    menu: 'Open menu',
    close: 'Close menu',
    language: 'Change language',
  },

  hero: {
    eyebrow: 'Marbella · Costa del Sol',
    titleTop: 'Luxury property',
    titleBottom: 'seen from above',
    subtitle:
      'Drone photography and videography for the villas, penthouses and landmark estates of the Costa del Sol. Delivered within 48 hours.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'View portfolio',
    scroll: 'Explore',
    videoFallbackAlt: 'Drone flight over a luxury villa in Marbella',
  },

  services: {
    eyebrow: 'What we shoot',
    title: 'Three ways to make a property sell itself',
    intro:
      'Every service is built around one goal: making people want to visit. Shooting, colour grading and editing included.',
    includesLabel: 'What you receive',
    items: [
      {
        id: 'photo',
        number: '01',
        title: 'Aerial photography',
        tagline: 'Exterior & surroundings',
        description:
          'Aerial stills reveal what ground-level photography never can: how the property sits on its plot, the pool, the gardens, the sea view and the quality of the neighbourhood. Framed at golden hour whenever the light allows.',
        deliverables: [
          '15 to 40 retouched images depending on the package',
          'Landscape 4:3 files plus vertical crops for Instagram',
          'Professional retouching: exposure, colour, sky, perspective',
          'Full-resolution files plus web-optimised versions',
          'Commercial usage rights included (portals, brochures, social)',
        ],
      },
      {
        id: 'video',
        number: '02',
        title: 'Aerial video',
        tagline: 'Cinematic footage',
        description:
          'A short, well-paced film that tells the story of the property: the aerial approach, the façade reveal, an orbit around the pool, then the opening onto the sea and the mountains. Cut to music, graded for cinema.',
        deliverables: [
          'Edited film from 45 s to 2 min depending on the package',
          '4K · 30 fps (1080p export included)',
          'Colour grading and edit set to royalty-free music',
          'Vertical 9:16 cut for Reels and Stories',
          'Two rounds of revisions included',
        ],
      },
      {
        id: 'fpv',
        number: '03',
        title: 'Interior FPV video',
        tagline: 'One unbroken immersive take',
        description:
          'The shot that sets a listing apart: an FPV drone flies through the property in a single continuous take — from the entrance through the living room, out across the terrace doors and up over the pool. Buyers feel the volume before they ever set foot inside.',
        deliverables: [
          'One continuous 30 to 60 s take',
          'On-site scouting and rehearsal before the real run',
          'Stabilisation and cinema-grade colour',
          'Custom sound design',
          'Vertical 9:16 version included',
        ],
      },
    ],
  },

  portfolio: {
    eyebrow: 'Selected work',
    title: 'Portfolio',
    intro: 'A selection of recent properties. Filter by type of work.',
    filters: { all: 'All', photo: 'Photo', video: 'Video', fpv: 'FPV' },
    empty: 'No work in this category yet.',
    open: 'Enlarge',
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    counter: '{current} of {total}',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Per property, no subscription',
    intro:
      'One fee per property, paid once. No monthly plan, no commitment. Pricing depends on the type of property and its size.',
    from: 'from',
    featuredLabel: 'Most requested',
    packs: [
      {
        id: 'apartment',
        name: 'Apartment / Penthouse',
        audience: 'Resort apartments, penthouses, duplexes',
        price: 250,
        features: [
          '15 retouched aerial images',
          '1 exterior drone film, 45 to 60 s',
          'Vertical 9:16 cut for social media',
          'Delivered within 48 hours',
          'Commercial usage rights included',
        ],
      },
      {
        id: 'villa',
        name: 'Standard villa',
        audience: 'Up to approx. 400 m²',
        price: 350,
        featured: true,
        features: [
          '25 retouched aerial images',
          '1 exterior drone film, 60 to 90 s',
          'Vertical 9:16 cut for social media',
          'Garden, pool and surroundings coverage',
          'Delivered within 48 hours',
          'Commercial usage rights included',
        ],
      },
      {
        id: 'estate',
        name: 'Prestige villa',
        audience: 'Large estates, 400 m² and above',
        price: 500,
        features: [
          '40 retouched aerial images',
          '1 exterior drone film, 90 s to 2 min',
          'Vertical 9:16 cut for social media',
          'Full coverage of the grounds and exteriors',
          'Golden-hour shoot when conditions allow',
          'Delivered within 48 hours',
          'Commercial usage rights included',
        ],
      },
    ],
    option: {
      title: 'Add-on — Interior FPV video',
      description: 'Add an immersive one-take flight through the property to any package.',
      price: '+€100 to €150',
    },
    note: 'Bespoke quote for landmark properties or specific requirements.',
    cta: 'Book this package',
  },

  showcase: {
    eyebrow: 'The signature shot',
    title: 'From the gate to the terrace, without a single cut',
    lead:
      'Two minutes of continuous flight through Villa Benahavís. This is the format that holds a buyer on a listing, where a photo gallery is scrolled past in ten seconds.',
    cta: 'Watch the tour',
    itemId: 'villa-benahavis',
  },

  sectors: {
    eyebrow: 'Beyond real estate',
    title: 'The same eye, other playing fields',
    intro:
      'Luxury property is our core business, but a drone tells the story of a vineyard or a yacht under sail just as well. Here is what we regularly shoot outside real estate.',
    items: [
      {
        id: 'wedding',
        title: 'Weddings & events',
        description:
          'The opening shot nobody forgets: the ceremony from above, the estate in its setting, the couple’s arrival in an aerial tracking shot. We work alongside your videographer, never in the way of the ceremony.',
      },
      {
        id: 'yacht',
        title: 'Yachts & boats',
        description:
          'A boat only photographs well from the air. Tracking under way, orbits at anchor, hull and deck coverage — everything needed to sell, charter or promote a vessel properly.',
      },
      {
        id: 'golf',
        title: 'Golf courses & estates',
        description:
          'Signature holes, full layouts, clubhouses and resorts. Aerial views that finally reveal the design of a course and the quality of an estate.',
      },
    ],
    note: 'Another project in mind? Hospitality, construction, sporting events, commercial shoots — let’s talk.',
    cta: 'Request a quote',
  },

  process: {
    eyebrow: 'How it works',
    title: 'Four steps, forty-eight hours',
    intro: 'From first message to delivered files, without friction.',
    steps: [
      {
        number: '01',
        title: 'Contact & quote',
        description:
          'Describe the property in two minutes via the form or WhatsApp. You get a firm quote the same day.',
      },
      {
        number: '02',
        title: 'Book a slot',
        description:
          'We set a date around the weather and the orientation of the property, for the best possible light.',
      },
      {
        number: '03',
        title: 'On-site shoot',
        description:
          'One to two hours on location depending on the size of the estate. You do not need to be there.',
      },
      {
        number: '04',
        title: 'Delivery within 48 h',
        description:
          'Retouched stills and the edited film, sent as a download link. Revisions included.',
      },
    ],
  },

  about: {
    eyebrow: 'About',
    title: 'Two brothers, one standard: the property has to sell itself',
    paragraphs: [
      'Sky Estates is the two of us. Based in Marbella, we shoot aerial content for estate agencies, developers and private owners across the Costa del Sol. Every shoot is planned in advance — orientation of the property, hour of light, flight plan — and we are both on site on the day: one flies, the other frames the shots and scouts the angles.',
      'Editing and colour grading are done by us, never outsourced: that is where the gap opens between images that are merely correct and images that make people want to visit. You receive the files within 48 hours, commercial usage rights included.',
      'We cover Marbella, Puerto Banús, Benahavís, Estepona and Nueva Andalucía. Travel elsewhere on the Costa del Sol available on request.',
    ],
    credentials: [
      { label: 'Equipment', value: 'Stabilised 4K drone + cinema FPV drone' },
      { label: 'Turnaround', value: 'Guaranteed delivery within 48 hours' },
    ],
    imageAlt: 'The two brothers who founded Sky Estates, in white shirts',
  },

  contact: {
    eyebrow: 'Tell us about the property',
    title: 'Request a quote',
    intro:
      'Describe the property in a few fields. You get a priced answer the same day, Monday to Saturday.',
    directTitle: 'Or reach us directly',
    whatsappLabel: 'WhatsApp',
    whatsappHint: 'Usually answered within the hour',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    areasLabel: 'Areas covered',
    form: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      phoneOptional: 'optional',
      propertyType: 'Property type',
      propertyTypes: [
        { value: 'apartment', label: 'Apartment / Penthouse' },
        { value: 'villa', label: 'Villa (up to 400 m²)' },
        { value: 'estate', label: 'Prestige villa (400 m²+)' },
        { value: 'other', label: 'Other / Specific project' },
      ],
      address: 'Address or area',
      addressHint: 'e.g. Nueva Andalucía, La Zagaleta, Puerto Banús…',
      surface: 'Approximate size',
      surfaceHint: 'In m², an estimate is fine',
      services: 'Services required',
      serviceOptions: [
        { value: 'photo', label: 'Aerial photography' },
        { value: 'video', label: 'Aerial video' },
        { value: 'fpv', label: 'Interior FPV video' },
      ],
      date: 'Preferred date',
      dateHint: 'Can be adjusted later depending on weather',
      message: 'Anything else',
      messageHint: 'Access constraints, tight deadline, intended use of the images…',
      submit: 'Send request',
      sending: 'Sending…',
      required: 'Required field',
      successTitle: 'Request sent',
      successBody: 'Thank you. Your request came through — you will receive a priced quote today.',
      errorTitle: 'Sending failed',
      errorBody:
        'The form could not be submitted. Message us on WhatsApp instead — the answer will be just as fast.',
      fallbackCta: 'Message on WhatsApp',
      whatsappPrefill:
        'Hello Sky Estates, I would like a quote for a drone shoot. Here is my property: ',
      selectPlaceholder: 'Select…',
      consent:
        'Your details are used only to prepare the quote and are never shared with third parties.',
    },
  },

  footer: {
    tagline: 'Drone photography & videography for luxury real estate.',
    areasTitle: 'Areas covered',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    legalNotice: 'Legal notice',
    privacy: 'Privacy policy',
    rights: 'All rights reserved.',
    credit: 'Marbella · Costa del Sol · Spain',
  },

  legal: {
    notice: {
      title: 'Legal notice',
      updated: 'Last updated: September 2026',
      blocks: [
        {
          heading: 'Site owner',
          body: [
            'Sky Estates — drone photography and videography, Marbella (Spain).',
            'Email: skyestates0@gmail.com',
            'Phone: +34 610 188 793',
          ],
        },
        {
          heading: 'Hosting',
          body: [
            'This site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'All photographs and films shown on this site are the property of Sky Estates. Reproduction without written permission is prohibited.',
            'Commercial usage rights for delivered images are transferred to the client within the scope set out in the quote.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      updated: 'Last updated: September 2026',
      blocks: [
        {
          heading: 'Data collected',
          body: [
            'The quote form collects only what you type into it: name, email, phone, property details and preferred date.',
            'No analytics or advertising cookies are set on this site.',
          ],
        },
        {
          heading: 'Use',
          body: [
            'This data is used solely to answer your request and organise the shoot. It is never sold or passed to third parties for commercial purposes.',
          ],
        },
        {
          heading: 'Retention',
          body: [
            'Requests are kept for as long as needed to handle the enquiry, then for the statutory retention period applicable to accounting records.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'Under the GDPR you have the right to access, correct and delete your data. Write to skyestates0@gmail.com.',
          ],
        },
      ],
    },
  },

  notFound: {
    title: 'Page not found',
    body: 'This page does not exist or has been moved.',
    cta: 'Back to home',
  },
};

export default en;
