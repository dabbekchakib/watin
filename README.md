# WATIN — Agence digitale (Next.js)

Refonte production du site `watin.html` : site vitrine trilingue **FR / AR / EN** (arabe RTL), App Router, animations Motion + GSAP + Lenis, fond WebGL léger, formulaire avec envoi Resend et repli WhatsApp.

## Sommaire

- [Stack](#stack)
- [Installation](#installation)
- [Variables d’environnement](#variables-denvironnement)
- [Commandes](#commandes)
- [Structure](#structure)
- [i18n et RTL](#i18n-et-rtl)
- [Animations et garde-fous](#animations-et-garde-fous)
- [Formulaire de contact](#formulaire-de-contact)
- [SEO](#seo)
- [Déploiement Vercel](#déploiement-vercel)
- [Logo et polices](#logo-et-polices)

## Stack

- Next.js 16 (App Router, TypeScript strict, Turbopack)
- Tailwind CSS v4 (`@theme` + variables CSS, tokens navy → teal)
- next-intl 4 (routage `/fr`, `/ar`, `/en`, défaut `/fr`)
- Motion 14 (interface, scroll, transitions)
- GSAP 3 + ScrollTrigger (séquences pinnées, scrub, parallaxe)
- Lenis 1 (scroll fluide, synchronisé avec GSAP)
- Three.js / React Three Fiber (fond hero en particules, chargé en `dynamic` sans SSR)
- react-hook-form + zod, Resend
- ESLint 9 + Prettier 3, pnpm

## Installation

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Ouvrir <http://localhost:3000> : la racine redirige automatiquement vers `/fr`.

Node.js 22+ recommandé.

## Variables d’environnement

| Variable               | Rôle                                                                    | Requis                               |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------ |
| `RESEND_API_KEY`       | Clé API Resend pour l’envoi d’e-mail depuis `/api/contact`              | Non                                  |
| `CONTACT_TO_EMAIL`     | Adresse de destination des demandes de contact                          | Non                                  |
| `CONTACT_FROM_EMAIL`   | Expéditeur vérifié Resend (défaut : `WATIN <onboarding@resend.dev>`)    | Non                                  |
| `NEXT_PUBLIC_SITE_URL` | URL publique utilisée pour la canonical, l’OG, le sitemap et le JSON-LD | Non (défaut `http://localhost:3000`) |

**Si `RESEND_API_KEY` ou `CONTACT_TO_EMAIL` est absent** (ou si l’envoi échoue), l’API renvoie une URL WhatsApp pré-remplie vers `+216 96 584 737` : le formulaire l’ouvre dans un nouvel onglet. Le comportement historique de `watin.html` est donc conservé sans configuration.

## Commandes

```bash
pnpm dev           # serveur de développement
pnpm build         # build de production (43 pages statiques générées)
pnpm start         # serveur de production
pnpm lint          # ESLint
pnpm typecheck     # tsc --noEmit
pnpm format        # Prettier (écrit)
pnpm format:check  # Prettier (vérifie)
```

## Structure

```
app/[locale]/            layouts, accueil, services, détail, à propos, contact, 404
app/api/contact/         route POST (Resend + repli WhatsApp)
app/sitemap.ts           sitemap trilingue avec hreflang
app/robots.ts            robots.txt
app/opengraph-image.tsx  image OG générée (1200x630)
app/icon.png             favicon généré depuis public/watin.webp
components/animations/   SplitReveal, GrowthArrow, Preloader, GSAP, Lenis, Three, etc.
components/layout/       header, footer, sélecteur de langue, shell
components/sections/     sections de l’accueil et des pages
components/ui/           Button, BlurImage, SectionHeading
content/services.ts      8 services + textes FR/AR/EN (source : watin.html)
messages/{fr,ar,en}.json textes d’interface et SEO
i18n/                    routing, navigation, request config
lib/, hooks/             utilitaires, store de scroll, média queries
public/                  watin.webp (source), watin-brand.jpg (logo du header extrait du base64 de watin.html), watin-logo.png (fond transparent), watin-icon.png, favicon.ico, icon.png, images/ (9 photos locales)
```

## i18n et RTL

- `dir="rtl"` et `lang="ar"` sont appliqués sur `<html>` pour `/ar`.
- Toutes les orientations utilisent des propriétés logiques Tailwind (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `origin-start`).
- Les variables CSS `--dir-sign`, `--w-clip`, `--panel-radius` et `--form-radius` inversent les coupes en biais du W, la flèche de croissance, les clips de transition, le marquee et le scroll horizontal en arabe.
- Aucun `letter-spacing` négatif en arabe (`[dir='rtl'] h1,h2,h3,h4 { letter-spacing: 0 }`).
- Le sélecteur de langue est un bouton icône avec dropdown : drapeau France pour le français, Tunisie pour l’arabe et Amérique pour l’anglais (SVG intégrés, indépendants du rendu emoji de l’OS ; le drapeau tunisien reprend les tracés officiels du SVG Wikimedia). Il conserve la page courante (et le hash) et émet `hreflang` via `alternates` + sitemap.
- La transition de page et le rideau du préloader se lèvent en biais dans le sens opposé en RTL.

## Animations et garde-fous

- Préloader une seule fois par session (`sessionStorage`), 600 ms maximum (désactivé sur mobile et si `prefers-reduced-motion`).
- Révélation mot par mot (`<SplitReveal>`), tracé SVG de la flèche de croissance, marquee lié à la vélocité Lenis.
- Services : section pinnée scrubée au scroll sur desktop (GSAP ScrollTrigger + parallaxe des images), carrousel `scroll-snap` natif sur mobile.
- Méthode : ligne de croissance tracée au scroll qui allume les quatre marches.
- CTA : coloration mot à mot au scroll, boutons magnétiques, tilt 3D léger, curseur personnalisé desktop, barre de progression.
- `prefers-reduced-motion` : toutes les animations sont désactivées ou statiques ; le fond WebGL est remplacé par un repli CSS ; Lenis/GSAP ne sont pas initialisés.
- Seuls `transform`, `opacity` et `clip-path` sont animés ; tous les ScrollTrigger sont tués au démontage (`gsap.context().revert()`, `gsap.matchMedia().revert()`).
- Aucun contenu n’est masqué de façon permanente : les états initiaux des animations sont rétablis si le JavaScript ne s’exécute pas.

## Formulaire de contact

Champs conservés de la source : nom, service (8 métiers + « Autre »), message. Validation zod côté client et côté API, `aria-invalid` / `aria-describedby` / `role="alert"` sur les erreurs, statut annoncé via `aria-live="polite"`.

## SEO

- `generateMetadata` par page et par langue, Open Graph, Twitter Card, canonical et `hreflang` alternates.
- `opengraph-image.tsx` généré à la volée, `sitemap.ts`, `robots.ts`.
- JSON-LD `Organization` + `LocalBusiness` avec adresse, téléphones et direction.

## Déploiement Vercel

1. Importer le dépôt dans Vercel (framework : Next.js, build `pnpm build`).
2. Définir les variables d’environnement ci-dessus dans _Project Settings → Environment Variables_.
3. Renseigner `NEXT_PUBLIC_SITE_URL` avec le domaine de production (ex. `https://exemple.vercel.app`) avant le build.
4. Déployer. Le proxy next-intl gère la redirection `/` → `/fr` et les 404 localisées.

## Logo et polices

- `public/watin.webp` est le logo officiel fourni (1092×1092, fond blanc). Il sert de source unique.
- `public/watin-logo.png` en est la version améliorée : fond blanc retiré (alpha anti-aliased), recadrage sur le logo, agrandissement ×4 en Lanczos et recoloriage exact aux tokens `--navy #133a6f` / `--teal #14998f`. C’est cette version qui est utilisée dans le header, le footer et la section À propos.
- `public/watin-icon.png` est le recadrage du seul symbole W + flèche ; il sert à générer `app/icon.png`, `public/icon.png`, `public/favicon.ico` et `public/apple-touch-icon.png`.
- Les anciens `logo.jpg`, `logo.png`, `logo.svg` et `logo-icon.svg` extraits du HTML restent présents à titre de référence mais ne sont plus utilisés par l’interface.
- Les 9 photos (hero + 8 services) sont hébergées dans `public/images/` : aucun appel réseau externe n’est nécessaire au rendu ou à l’optimisation `next/image`.
- Les polices Sora (latin) et Cairo (arabe) sont auto-hébergées dans `app/fonts` et chargées via `next/font/local` (aucune balise `<link>` Google Fonts). Les paquets `@fontsource-variable/{sora,cairo}` permettent de les mettre à jour.
