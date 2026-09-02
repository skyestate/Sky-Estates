import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Les visuels de démonstration sont des SVG placeholders : ils sont servis
    // sans passer par l'optimiseur (prop `unoptimized` du composant <Media />).
    // Dès que tu remplaces un fichier par un .jpg/.webp réel, l'optimisation
    // next/image s'active automatiquement, sans changement de code.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 828, 1080, 1200, 1600, 1920, 2560],
  },
  async headers() {
    return [
      {
        /*
         * Les médias sont remplacés en gardant le même nom de fichier
         * (voir README §2) : un cache « immutable » d'un an empêcherait les
         * visiteurs déjà venus de voir la nouvelle version. On garde donc un
         * cache court côté navigateur, avec revalidation, et un cache long
         * côté CDN qui se purge à chaque déploiement Vercel.
         */
        source: '/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate, s-maxage=31536000',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
