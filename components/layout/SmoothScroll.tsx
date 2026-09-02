'use client';

import { useEffect } from 'react';

/**
 * Défilement amorti vers les ancres.
 *
 * `scroll-behavior: smooth` en CSS applique une vitesse constante et s'arrête
 * net : sur une page longue, le mouvement paraît mécanique. On le remplace ici
 * par une courbe qui démarre franchement et se pose en douceur — la même que
 * celle des transitions du site (`ease-luxe`).
 *
 * La durée s'adapte à la distance : un saut vers la section voisine ne doit pas
 * prendre le même temps qu'un aller jusqu'au bas de la page.
 *
 * Se désactive entièrement si le visiteur a demandé moins d'animations, et
 * l'URL est mise à jour à l'arrivée pour que le bouton retour reste cohérent.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduit.matches) return;

    // On désactive le lissage natif : les deux se combattraient.
    const racine = document.documentElement;
    const lissageNatif = racine.style.scrollBehavior;
    racine.style.scrollBehavior = 'auto';

    let animation = 0;

    const courbe = (t: number) =>
      // cubic-bezier(0.22, 1, 0.36, 1) approximée : départ vif, arrivée posée.
      1 - Math.pow(1 - t, 3.2);

    const allerVers = (cible: HTMLElement, hash: string) => {
      const decalage =
        parseFloat(getComputedStyle(racine).getPropertyValue('--header-h')) || 76;
      const depart = window.scrollY;
      const arrivee = cible.getBoundingClientRect().top + depart - decalage;
      const distance = arrivee - depart;
      if (Math.abs(distance) < 2) return;

      // 450 ms minimum, 1100 ms maximum, proportionnel à la distance parcourue.
      const duree = Math.min(1100, Math.max(450, Math.abs(distance) * 0.42));
      const debut = performance.now();

      cancelAnimationFrame(animation);
      const pas = (maintenant: number) => {
        const t = Math.min(1, (maintenant - debut) / duree);
        window.scrollTo(0, depart + distance * courbe(t));
        if (t < 1) {
          animation = requestAnimationFrame(pas);
        } else {
          history.replaceState(null, '', hash);
        }
      };
      animation = requestAnimationFrame(pas);
    };

    const auClic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const lien = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!lien) return;

      const hash = lien.getAttribute('href');
      if (!hash || hash === '#') return;

      const cible = document.querySelector<HTMLElement>(hash);
      if (!cible) return;

      e.preventDefault();
      allerVers(cible, hash);
    };

    document.addEventListener('click', auClic);
    return () => {
      document.removeEventListener('click', auClic);
      cancelAnimationFrame(animation);
      racine.style.scrollBehavior = lissageNatif;
    };
  }, []);

  return null;
}
