import type { Dictionary } from './types';

/** 🇪🇸 TODO EL TEXTO EN ESPAÑOL ESTÁ AQUÍ — tarifas incluidas. */
const es: Dictionary = {
  meta: {
    title: 'Sky Estates — Fotografía y vídeo con dron inmobiliario en Marbella',
    description:
      'Fotografía y vídeo aéreo con dron para inmuebles de lujo en Marbella, Puerto Banús, Benahavís y Estepona. Fotos aéreas, vídeos cinematográficos y recorridos FPV de interior entregados en 48 horas.',
    keywords: [
      'dron Marbella',
      'fotógrafo inmobiliario dron Costa del Sol',
      'vídeo dron villa Marbella',
      'fotografía aérea Puerto Banús',
      'FPV inmobiliario Marbella',
      'dron Benahavís',
      'vídeo inmobiliario de lujo Estepona',
    ],
    ogAlt: 'Vista aérea de una villa de lujo en la Costa del Sol',
  },

  nav: {
    services: 'Servicios',
    portfolio: 'Portfolio',
    pricing: 'Tarifas',
    process: 'Proceso',
    sectors: 'Otros sectores',
    about: 'Sobre mí',
    contact: 'Contacto',
    cta: 'Pedir presupuesto',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Cambiar de idioma',
  },

  hero: {
    eyebrow: 'Marbella · Costa del Sol',
    titleTop: 'El inmueble de lujo',
    titleBottom: 'visto desde el cielo',
    subtitle:
      'Fotografía y vídeo con dron para villas, áticos y propiedades excepcionales de la Costa del Sol. Entrega en 48 horas.',
    ctaPrimary: 'Pedir presupuesto',
    ctaSecondary: 'Ver portfolio',
    scroll: 'Descubrir',
    videoFallbackAlt: 'Vuelo de dron sobre una villa de lujo en Marbella',
  },

  services: {
    eyebrow: 'Lo que grabamos',
    title: 'Tres formas de realzar una propiedad',
    intro:
      'Cada servicio persigue un solo objetivo: que den ganas de visitarla. Grabación, etalonaje y montaje incluidos.',
    includesLabel: 'Lo que recibes',
    items: [
      {
        id: 'photo',
        number: '01',
        title: 'Fotografía aérea',
        tagline: 'Exterior y entorno',
        description:
          'Las tomas aéreas muestran lo que ninguna foto a pie de calle consigue: la implantación de la propiedad, la piscina, el jardín, las vistas al mar y la calidad de la zona. Encuadres trabajados a la golden hour siempre que la luz lo permite.',
        deliverables: [
          'De 15 a 40 fotos retocadas según el pack',
          'Formato horizontal 4:3 y recortes verticales para Instagram',
          'Retoque profesional: exposición, color, cielo, perspectiva',
          'Entrega en alta resolución y versiones optimizadas para web',
          'Derechos de uso comercial incluidos (portales, folletos, redes)',
        ],
      },
      {
        id: 'video',
        number: '02',
        title: 'Vídeo aéreo',
        tagline: 'Planos cinematográficos',
        description:
          'Un vídeo corto y con ritmo que cuenta la propiedad: aproximación aérea, revelado de la fachada, órbita alrededor de la piscina y apertura hacia el mar y la montaña. Montaje con música y etalonaje de cine.',
        deliverables: [
          'Vídeo montado de 45 s a 2 min según el pack',
          'Resolución 4K · 30 fps (exportación 1080p incluida)',
          'Etalonaje de color y montaje con música libre de derechos',
          'Versión vertical 9:16 para Reels y Stories',
          'Dos rondas de correcciones incluidas',
        ],
      },
      {
        id: 'fpv',
        number: '03',
        title: 'Vídeo FPV de interior',
        tagline: 'Recorrido inmersivo en un solo plano',
        description:
          'El plano que marca la diferencia: un dron FPV atraviesa la propiedad sin cortes, desde la entrada hasta el salón, sale por los ventanales y se eleva sobre la piscina. El comprador percibe los volúmenes antes incluso de visitarla.',
        deliverables: [
          'Un plano secuencia continuo de 30 a 60 s',
          'Reconocimiento y ensayos en el sitio antes de la toma real',
          'Estabilización y etalonaje de cine',
          'Diseño sonoro a medida',
          'Versión vertical 9:16 incluida',
        ],
      },
    ],
  },

  portfolio: {
    eyebrow: 'Trabajos',
    title: 'Portfolio',
    intro: 'Una selección de propiedades recientes. Filtra por tipo de servicio.',
    filters: { all: 'Todo', photo: 'Foto', video: 'Vídeo', fpv: 'FPV' },
    empty: 'Todavía no hay trabajos en esta categoría.',
    open: 'Ampliar',
    close: 'Cerrar',
    prev: 'Anterior',
    next: 'Siguiente',
    counter: '{current} de {total}',
  },

  pricing: {
    eyebrow: 'Tarifas',
    title: 'Pago por propiedad, sin suscripción',
    intro:
      'Una tarifa por inmueble, pagada una sola vez. Sin cuota mensual ni permanencia. El precio depende del tipo de propiedad y de su tamaño.',
    from: 'desde',
    featuredLabel: 'El más solicitado',
    packs: [
      {
        id: 'apartment',
        name: 'Piso / Ático',
        audience: 'Viviendas en residencial, áticos, dúplex',
        price: 250,
        features: [
          '15 fotos aéreas retocadas',
          '1 vídeo exterior con dron de 45 a 60 s',
          'Versión vertical 9:16 para redes',
          'Entrega en 48 horas',
          'Derechos de uso comercial incluidos',
        ],
      },
      {
        id: 'villa',
        name: 'Villa estándar',
        audience: 'Hasta unos 400 m²',
        price: 350,
        featured: true,
        features: [
          '25 fotos aéreas retocadas',
          '1 vídeo exterior con dron de 60 a 90 s',
          'Versión vertical 9:16 para redes',
          'Cobertura del jardín, la piscina y el entorno',
          'Entrega en 48 horas',
          'Derechos de uso comercial incluidos',
        ],
      },
      {
        id: 'estate',
        name: 'Villa de prestigio',
        audience: 'Grandes propiedades, 400 m² o más',
        price: 500,
        features: [
          '40 fotos aéreas retocadas',
          '1 vídeo exterior con dron de 90 s a 2 min',
          'Versión vertical 9:16 para redes',
          'Cobertura completa de la finca y los exteriores',
          'Grabación a la golden hour si las condiciones lo permiten',
          'Entrega en 48 horas',
          'Derechos de uso comercial incluidos',
        ],
      },
    ],
    option: {
      title: 'Opción — Vídeo FPV de interior',
      description: 'Añade un plano secuencia inmersivo por la propiedad a cualquier pack.',
      price: '+100 a 150 €',
    },
    note: 'Presupuesto a medida para propiedades excepcionales o necesidades específicas.',
    cta: 'Reservar este pack',
  },

  showcase: {
    eyebrow: 'El plano que firma',
    title: 'De la entrada a la terraza, sin un solo corte',
    lead:
      'Dos minutos de vuelo continuo por Villa Benahavís. Es el formato que retiene a un comprador en un anuncio, donde una galería de fotos se pasa en diez segundos.',
    cta: 'Ver el recorrido',
    itemId: 'villa-benahavis',
  },

  sectors: {
    eyebrow: 'Más allá del inmobiliario',
    title: 'La misma mirada, otros terrenos de juego',
    intro:
      'El inmobiliario de lujo es nuestro oficio principal, pero un dron cuenta igual de bien una finca vinícola o un yate navegando. Esto es lo que grabamos habitualmente fuera del sector inmobiliario.',
    items: [
      {
        id: 'wedding',
        title: 'Bodas y eventos',
        description:
          'El plano de apertura que nadie olvida: la ceremonia desde el cielo, la finca en su entorno, la llegada de los novios en travelling aéreo. Trabajamos junto a vuestro videógrafo, sin interferir nunca en la ceremonia.',
      },
      {
        id: 'yacht',
        title: 'Yates y barcos',
        description:
          'Un barco solo se fotografía bien desde el aire. Seguimiento en navegación, órbitas al ancla, planos de casco y cubierta: lo necesario para vender, alquilar o promocionar una embarcación como merece.',
      },
      {
        id: 'golf',
        title: 'Campos de golf y fincas',
        description:
          'Hoyos emblemáticos, recorridos completos, casas club y resorts. Vistas aéreas que por fin muestran el trazado de un campo y la calidad de una finca.',
      },
    ],
    note: '¿Otro proyecto en mente? Hostelería, obra, evento deportivo, rodaje publicitario: hablemos.',
    cta: 'Pedir presupuesto',
  },

  process: {
    eyebrow: 'Cómo funciona',
    title: 'Cuatro pasos, cuarenta y ocho horas',
    intro: 'Del primer mensaje a los archivos entregados, sin fricción.',
    steps: [
      {
        number: '01',
        title: 'Contacto y presupuesto',
        description:
          'Describes la propiedad en dos minutos por el formulario o por WhatsApp. Recibes un presupuesto cerrado el mismo día.',
      },
      {
        number: '02',
        title: 'Reserva de fecha',
        description:
          'Fijamos el día según la meteorología y la orientación del inmueble, para tener la mejor luz posible.',
      },
      {
        number: '03',
        title: 'Grabación en el sitio',
        description:
          'Entre una y dos horas en la propiedad según su tamaño. No hace falta que estés presente.',
      },
      {
        number: '04',
        title: 'Entrega en 48 h',
        description:
          'Fotos retocadas y vídeo montado, enviados por enlace de descarga. Correcciones incluidas.',
      },
    ],
  },

  about: {
    eyebrow: 'Sobre mí',
    title: 'Dos hermanos, una exigencia: que la propiedad se venda sola',
    paragraphs: [
      'Sky Estates somos los dos. Con base en Marbella, realizamos las tomas aéreas de agencias inmobiliarias, promotoras y propietarios de toda la Costa del Sol. Preparamos cada grabación de antemano —orientación del inmueble, hora de luz, plan de vuelo— y el día de la sesión estamos los dos en el sitio: uno pilota, el otro encuadra y busca los ángulos.',
      'El montaje y el etalonaje los hacemos nosotros, nunca se subcontratan: ahí está la diferencia entre unas imágenes correctas y unas imágenes que dan ganas de visitar la propiedad. Recibes los archivos en 48 horas, con los derechos de uso comercial incluidos.',
      'Cubrimos Marbella, Puerto Banús, Benahavís, Estepona y Nueva Andalucía. Desplazamientos a otros puntos de la Costa del Sol bajo presupuesto.',
    ],
    credentials: [
      { label: 'Equipo', value: 'Dron 4K estabilizado + dron FPV de cine' },
      { label: 'Plazo', value: 'Entrega garantizada en 48 horas' },
    ],
    imageAlt: 'Los dos hermanos fundadores de Sky Estates, en camisa blanca',
  },

  contact: {
    eyebrow: 'Hablemos de tu propiedad',
    title: 'Pedir presupuesto',
    intro:
      'Describe el inmueble en unos pocos campos. Recibes una respuesta con precio el mismo día, de lunes a sábado.',
    directTitle: 'O directamente',
    whatsappLabel: 'WhatsApp',
    whatsappHint: 'Normalmente respondemos en menos de una hora',
    emailLabel: 'Correo',
    instagramLabel: 'Instagram',
    areasLabel: 'Zona de trabajo',
    form: {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      phoneOptional: 'opcional',
      propertyType: 'Tipo de inmueble',
      propertyTypes: [
        { value: 'apartment', label: 'Piso / Ático' },
        { value: 'villa', label: 'Villa (hasta 400 m²)' },
        { value: 'estate', label: 'Villa de prestigio (400 m²+)' },
        { value: 'other', label: 'Otro / Proyecto específico' },
      ],
      address: 'Dirección o zona del inmueble',
      addressHint: 'Ej. Nueva Andalucía, La Zagaleta, Puerto Banús…',
      surface: 'Superficie aproximada',
      surfaceHint: 'En m², basta con una estimación',
      services: 'Servicios deseados',
      serviceOptions: [
        { value: 'photo', label: 'Fotografía aérea' },
        { value: 'video', label: 'Vídeo aéreo' },
        { value: 'fpv', label: 'Vídeo FPV de interior' },
      ],
      date: 'Fecha deseada',
      dateHint: 'Ajustable después según la meteorología',
      message: 'Detalles',
      messageHint: 'Restricciones de acceso, plazo ajustado, uso previsto de las imágenes…',
      submit: 'Enviar solicitud',
      sending: 'Enviando…',
      required: 'Campo obligatorio',
      successTitle: 'Solicitud enviada',
      successBody:
        'Gracias. Tu solicitud ha llegado correctamente — recibirás un presupuesto hoy mismo.',
      errorTitle: 'El envío ha fallado',
      errorBody:
        'No se ha podido enviar el formulario. Escríbenos por WhatsApp, la respuesta será igual de rápida.',
      fallbackCta: 'Escribir por WhatsApp',
      whatsappPrefill:
        'Hola Sky Estates, quisiera un presupuesto para una grabación con dron. Mi propiedad: ',
      selectPlaceholder: 'Seleccionar…',
      consent:
        'Tus datos se usan únicamente para preparar el presupuesto y nunca se comparten con terceros.',
    },
  },

  footer: {
    tagline: 'Fotografía y vídeo con dron para inmuebles de lujo.',
    areasTitle: 'Zona cubierta',
    navTitle: 'Navegación',
    contactTitle: 'Contacto',
    legalNotice: 'Aviso legal',
    privacy: 'Política de privacidad',
    rights: 'Todos los derechos reservados.',
    credit: 'Marbella · Costa del Sol · España',
  },

  legal: {
    notice: {
      title: 'Aviso legal',
      updated: 'Última actualización: septiembre de 2026',
      blocks: [
        {
          heading: 'Titular del sitio',
          body: [
            'Sky Estates — fotografía y vídeo con dron, Marbella (España).',
            'Correo: skyestates0@gmail.com',
            'Teléfono: +34 610 188 793',
          ],
        },
        {
          heading: 'Alojamiento',
          body: [
            'Este sitio está alojado por Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Estados Unidos.',
          ],
        },
        {
          heading: 'Propiedad intelectual',
          body: [
            'Todas las fotografías y vídeos mostrados en este sitio son propiedad de Sky Estates. Queda prohibida su reproducción sin autorización escrita.',
            'Los derechos de uso comercial de las imágenes entregadas se ceden al cliente en los términos fijados en el presupuesto.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Política de privacidad',
      updated: 'Última actualización: septiembre de 2026',
      blocks: [
        {
          heading: 'Datos recogidos',
          body: [
            'El formulario de presupuesto recoge únicamente lo que tú escribes: nombre, correo, teléfono, datos del inmueble y fecha deseada.',
            'Este sitio no instala cookies de analítica ni de publicidad.',
          ],
        },
        {
          heading: 'Uso',
          body: [
            'Estos datos se utilizan exclusivamente para responder a tu solicitud y organizar el servicio. Nunca se venden ni se ceden a terceros con fines comerciales.',
          ],
        },
        {
          heading: 'Conservación',
          body: [
            'Las solicitudes se conservan el tiempo necesario para gestionar la consulta y, después, durante el plazo legal aplicable a la documentación contable.',
          ],
        },
        {
          heading: 'Tus derechos',
          body: [
            'Conforme al RGPD, tienes derecho de acceso, rectificación y supresión de tus datos. Escribe a skyestates0@gmail.com.',
          ],
        },
      ],
    },
  },

  notFound: {
    title: 'Página no encontrada',
    body: 'Esta página no existe o ha sido movida.',
    cta: 'Volver al inicio',
  },
};

export default es;
