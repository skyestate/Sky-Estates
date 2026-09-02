import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Logo Sky Estates — monogramme « SE » + nom.
 *
 * Le monogramme est un PNG à fond transparent, glyphe blanc, détouré depuis
 * le fichier d'origine (JPEG noir sur blanc). Il n'apparaît que sur des fonds
 * sombres (header et footer), d'où le blanc.
 *   · /public/logo-se.png  (235×188)
 *
 * Si tu obtiens une version vectorielle (.svg), remplace simplement le
 * <Image> par le SVG : il sera net à toutes les tailles et pourra prendre la
 * couleur du texte via `currentColor`.
 *
 * Pour n'afficher que le monogramme, sans le nom, supprime le <span> final.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Image
        src="/logo-se.png"
        alt="Sky Estates"
        width={235}
        height={188}
        priority
        className="h-7 w-auto shrink-0 sm:h-8"
      />
      <span className="font-serif text-xl tracking-wide2 sm:text-2xl">
        Sky <span className="text-champagne">Estates</span>
      </span>
    </span>
  );
}
