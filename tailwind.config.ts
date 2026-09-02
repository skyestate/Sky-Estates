import type { Config } from 'tailwindcss';

/**
 * Palette Sky Estates — noir / anthracite / blanc cassé,
 * avec un unique accent champagne réservé aux CTA et aux détails fins.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',        // noir profond — fonds pleine page
        charcoal: '#141414',   // anthracite — sections alternées
        graphite: '#232323',   // bordures et surfaces sur fond sombre
        smoke: '#8A8A8A',      // texte secondaire sur fond sombre
        ivory: '#FAF9F6',      // blanc cassé — fonds clairs
        sand: '#EDE9E1',       // séparateurs sur fond clair
        champagne: {
          DEFAULT: '#C5A572',  // accent principal
          light: '#DCC69B',
          dark: '#A8874F',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
        wide2: '0.12em',
      },
      borderRadius: {
        /*
         * Deux rayons, pas plus. `card` pour tout ce qui porte une image ou
         * délimite un bloc ; `control` pour ce qui se clique ou se saisit.
         * Un rayon franc mais discret : assez pour casser l'angle vif, trop
         * peu pour verser dans le style « application mobile ».
         */
        card: '14px',
        control: '6px',
      },
      maxWidth: {
        content: '1280px',
        prose2: '68ch',
      },
      transitionTimingFunction: {
        // Courbe « premium » : départ franc, arrivée très douce.
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
