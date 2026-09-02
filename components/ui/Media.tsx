import Image from 'next/image';
import { cn } from '@/lib/utils';

type MediaProps = {
  src: string;
  alt: string;
  className?: string;
  /** `fill` pour un conteneur en position relative, sinon dimensions explicites. */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * Enveloppe next/image tolérante aux placeholders.
 *
 * Les visuels de démonstration sont des .svg : ils sont servis tels quels
 * (`unoptimized`), car l'optimiseur d'images ne traite pas le SVG.
 * Dès que tu déposes un vrai .jpg / .webp à la place, l'optimisation
 * automatique (AVIF/WebP, redimensionnement, lazy loading) s'active seule —
 * aucun changement de code n'est nécessaire.
 */
export default function Media({
  src,
  alt,
  className,
  fill,
  width = 1400,
  height = 900,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: MediaProps) {
  const isPlaceholder = src.endsWith('.svg');

  const common = {
    src,
    alt,
    sizes,
    priority,
    unoptimized: isPlaceholder,
    className: cn('object-cover', className),
    loading: priority ? ('eager' as const) : ('lazy' as const),
  };

  // `alt` est bien fourni : il fait partie de l'objet `common` ci-dessus.
  // La règle jsx-a11y/alt-text ne sait pas suivre un spread, d'où la dérogation.
  /* eslint-disable jsx-a11y/alt-text */
  return fill ? <Image {...common} fill /> : <Image {...common} width={width} height={height} />;
  /* eslint-enable jsx-a11y/alt-text */
}
