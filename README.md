# Sky Estates

Site vitrine — photographie & vidéographie par drone pour l'immobilier de prestige
à Marbella, Costa del Sol.

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Resend
Trilingue **FR / EN / ES** · pensé pour un déploiement Vercel.

---

## 1. Démarrer

Node.js 18.18 ou plus est requis (à installer depuis [nodejs.org](https://nodejs.org)).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Le site tourne sur http://localhost:3000 — la redirection vers `/fr`, `/en` ou `/es`
est automatique selon la langue du navigateur.

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run typecheck` | Vérifie le typage sans compiler |
| `npm run lint` | ESLint (CLI + flat config — `next lint` est déprécié depuis Next 15.5) |

---

## 2. Ce qu'il reste à remplacer

Tous les éléments à fournir sont marqués `PLACEHOLDER` ou `[À REMPLIR]` dans le code.

### Les textes et les tarifs

Un seul fichier par langue, tout y est :

- `content/fr.ts` · `content/en.ts` · `content/es.ts`

Les trois fichiers sont typés par `content/types.ts` : si une clé manque dans une
langue, `npm run typecheck` le signale. Aucun texte n'est codé en dur ailleurs.

À traiter en priorité — les paragraphes `[PLACEHOLDER]` de la section **À propos**
et les mentions `[À REMPLIR]` (n° opérateur AESA, assureur, NIE/NIF, adresse) dans
`legal` et dans `lib/site.ts`.

### Les coordonnées

`lib/site.ts` est le point unique de vérité : téléphone, WhatsApp, e-mail,
Instagram, zone couverte, coordonnées légales. Une modification s'y propage
partout (header, footer, formulaire, JSON-LD).

### Les médias

Tous les visuels actuels sont des **SVG de démonstration** portant la mention
`PLACEHOLDER` en clair. Dépose tes fichiers dans `public/media/` :

| Emplacement | Fichier attendu | Spécification |
|---|---|---|
| `public/media/hero/` | `hero-still.webp` | Image de fond du hero, 2000 px de large minimum |
| `public/media/portfolio/` | photos `.jpg` / `.webp` | 1600 px de large minimum |
| `public/media/portfolio/` | vidéos `.mp4` + poster `.jpg` | **< 8 Mo** par vidéo |
| `public/media/about/` | `portrait.jpg` | Format portrait 4:5 |
| `public/media/og/` | `og-image.jpg` | 1200×630 — image de partage réseaux |

Puis mets à jour `content/portfolio.ts` : `src`, `video`, `property`, `location`
et les trois textes `alt` (obligatoires pour l'accessibilité et le référencement).

Le composant `components/ui/Media.tsx` détecte l'extension : les `.svg` sont servis
tels quels, les vrais fichiers passent par l'optimisation `next/image`
(AVIF/WebP, redimensionnement, lazy loading) **sans aucun changement de code**.

### ⚠️ La vidéo FPV Be Aloha doit être ré-encodée

`public/media/portfolio/be-aloha-fpv.mp4` est un encodage **provisoire** en
568×320 (7,7 Mo), produit depuis ton master 4K de 1,4 Go avec `avconvert`, le
seul encodeur présent sur la machine. Il fonctionne, mais la définition est
trop faible pour un site haut de gamme.

Pour la version définitive, avec [HandBrake](https://handbrake.fr) (gratuit) :

| Réglage | Valeur |
|---|---|
| Preset | Web → Vimeo YouTube HQ 1080p60 |
| Video codec | H.264 (x264) |
| Quality | Constant Quality, RF **24** |
| Web Optimized | coché |

Tu obtiendras environ 20 à 25 Mo en 1080p pour les 77 s. Pour descendre sous
10 Mo, coupe la séquence à 30 s (onglet *Dimensions* → *Range*).

Enregistre le résultat sous le même nom, au même endroit : **aucune
modification de code n'est nécessaire**, la page le prendra tel quel.

Le hero fonctionne même sans la vidéo : l'image poster occupe l'écran tant que le
`.mp4` est absent, et un badge « Placeholder » le rappelle.

### Le hero doit rester léger

Le fond du hero est une image fixe (`hero-still.webp`), marquée `priority` : c'est
le LCP de la page. Garde-la sous ~600 Ko en JPEG qualité 85.

Si tu veux y remettre une vidéo, remplace le `<Image>` par un
`<video muted loop playsInline>` dans `components/sections/Hero.tsx` et garde le
fichier sous 6 Mo — au-delà, le score Lighthouse s'effondre.

---

## 3. Le formulaire de devis

`components/sections/Contact.tsx` envoie vers `app/api/contact/route.ts`, qui
transmet un e-mail via [Resend](https://resend.com).

1. Crée un compte Resend (gratuit jusqu'à 3 000 e-mails/mois)
2. Vérifie ton domaine, ou garde `onboarding@resend.dev` pour tester
3. Renseigne `RESEND_API_KEY`, `CONTACT_FROM` et `CONTACT_TO` dans `.env.local`
4. Ajoute les mêmes variables dans Vercel → Settings → Environment Variables

**Sans clé API, rien ne casse** : la route répond `503` et le formulaire affiche
immédiatement un repli WhatsApp pré-rempli. Aucune demande n'est perdue.

Protections incluses : validation Zod côté serveur, champ piège anti-robots,
limitation à 5 envois par IP toutes les 15 minutes, échappement HTML des valeurs.

---

## 4. Structure

```
app/
  [locale]/          Layout racine (<html lang>), page d'accueil, pages légales, 404
  api/contact/       Réception des demandes de devis
  sitemap.ts         Sitemap trilingue avec alternates hreflang
  robots.ts
components/
  layout/            Header, sélecteur de langue, Footer, bouton WhatsApp flottant
  sections/          Hero · Services · Portfolio · Pricing · Process · About · Contact
  ui/                Reveal (apparition au scroll), Section, SectionHeading,
                     Media, Lightbox, Field
content/             Textes et tarifs par langue + données du portfolio
lib/                 i18n, dictionnaires, coordonnées, JSON-LD, utilitaires
middleware.ts        Détection de langue et redirection /fr /en /es
```

### Multilingue

Le préfixe de langue est un segment d'URL (`/fr`, `/en`, `/es`). Le middleware lit
l'en-tête `Accept-Language` à la première visite, puis un cookie mémorise le choix
fait dans le header. Les trois versions sont générées statiquement à la compilation.

Les URL des pages légales gardent leurs slugs français dans les trois langues
(`/en/mentions-legales`). Pour les traduire, duplique les dossiers correspondants
sous `app/[locale]/` et ajuste les liens dans `components/layout/Footer.tsx`.

### Design

Palette et typographies : `tailwind.config.ts`. Classes partagées
(`.btn-primary`, `.eyebrow`, `.container-page`, `.hairline`) : `app/globals.css`.

Toutes les animations n'agissent que sur `opacity` et `transform`, et se coupent
si le visiteur a activé « réduire les animations » dans son système.

---

## 5. Déploiement

1. Pousser le dossier sur un dépôt GitHub
2. Importer le dépôt sur [vercel.com](https://vercel.com) — le framework est détecté seul
3. Renseigner les variables d'environnement (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
   `CONTACT_FROM`, `CONTACT_TO`)
4. Brancher le nom de domaine

`NEXT_PUBLIC_SITE_URL` alimente les URL canoniques, le sitemap et le JSON-LD :
il doit contenir le domaine définitif, sans slash final.

---

## 6. Référencement

Déjà en place : `title` / `description` par langue ciblant « drone Marbella » et
« photographe immobilier drone Costa del Sol », alternates `hreflang` (avec
`x-default`), Open Graph et Twitter Card, sitemap trilingue, `robots.txt`, et un
balisage `schema.org` **LocalBusiness + ProfessionalService** incluant la zone
d'intervention, les coordonnées géographiques et le catalogue tarifaire
(`lib/schema.ts`).

Restent à faire hors du code : créer la fiche **Google Business Profile** et y
faire pointer le domaine — c'est le principal levier de visibilité locale.
