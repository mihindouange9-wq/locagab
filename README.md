# LOCAGAB — site vitrine de l'application mobile

Site officiel de LOCAGAB, l'application immobilière pensée pour le Gabon. Le site présente l'application, explique
son fonctionnement et conduit au téléchargement ; il n'est pas une plateforme de recherche de logements.

Signature : **« Trouvez votre logement, simplement. »**

## Démarrer

```bash
npm install
npm run dev        # http://127.0.0.1:5180
npm run build      # vérification TypeScript puis build de production dans dist/
npm run preview    # sert dist/ sur http://127.0.0.1:5181
```

## Mise en ligne

Site en ligne : **https://locagab.onrender.com** (Render redéploie à chaque push sur `main`). Le site est prévu pour Render (site statique) : `render.yaml` décrit le build, le dossier publié, la réécriture
d'adresses, les en-têtes de cache et de sécurité et la variable `SITE_URL` (adresse publique utilisée par la balise
canonical, Open Graph, `robots.txt`, `sitemap.xml` et les données structurées). La marche à suivre complète est dans
`DEPLOIEMENT.md`.

Stack : Vite 6 · React 19 · TypeScript · CSS moderne (variables, grilles, container de section) · GSAP 3
(ScrollTrigger, SplitText) · Lucide · Manrope auto-hébergée (`@fontsource-variable/manrope`).

Sur ce poste de développement, `rollup` et `esbuild` sont figés par `overrides` dans `package.json` : les versions plus
récentes sont bloquées par la stratégie de contrôle d'application de Windows. Ailleurs, ces overrides sont sans effet.

## À renseigner avant la mise en ligne

Tout est centralisé dans `src/content/site.ts` :

| Clé | Rôle | État |
|---|---|---|
| `STORES.appStore`, `STORES.googlePlay` | adresses des fiches sur les stores | vides : les boutons affichent « Bientôt sur » et ne sont pas des liens |
| `SOCIALS[].href` | Instagram, Facebook, LinkedIn, X | vides : les noms s'affichent sans lien |
| `LEGAL[].href` | politique de confidentialité, conditions, mentions légales | vides : les textes sont à produire |
| `CONTACT_EMAIL` | adresse de contact | vide : « Contact » renvoie au pied de page |

Dès qu'une valeur est renseignée, l'élément devient un lien, sans autre modification.

Le reste du contenu (navigation, problèmes, fonctionnalités, étapes, FAQ, principes, lieux) est dans le même fichier ;
les données de démonstration des écrans (annonces, prix, propriétaire) sont dans `src/content/demo.ts` et sont
signalées comme fictives dans le pied de page.

## Charte graphique

La charte graphique (27 planches 1600 × 1000, PDF) est générée depuis `charte/` et publiée avec le site à
`https://locagab.onrender.com/charte/` (PDF : `/charte/LOCAGAB-charte.pdf`). Sources : `charte/lib.mjs` (couleurs, logos
depuis le tracé officiel, repère, planche, lockup MÉTHODE AURA), `charte/style.css`, `charte/sections/*.mjs`,
`charte/build.mjs`. Commandes : `npm run charte` (génération, vérification des planches dans Chrome, export PDF) ou
les trois étapes séparément (`charte:build`, `charte:check`, `charte:pdf`). Le partenariat MÉTHODE AURA figure en pied
de chaque planche.

## Film de 30 secondes

Un film de présentation (1920 × 1080, 30 i/s, H.264 + AAC) est produit depuis `video/` : `build-scene.mjs` génère une
scène HTML animée par une ligne de temps GSAP déterministe, `tools/video-render.mjs` capture les 900 images dans Chrome
et les encode par WebCodecs (`video/encodeur.html`, muxeur MP4), avec une bande-son générée. Commandes : `npm run
video:apercu` (planche-contact des images clés), `npm run video` (rendu complet), `npm run video:check` (contrôle du
fichier). Sorties ignorées par Git : `video/LOCAGAB-30s.mp4`, affiche et planches.

## Organisation

```
index.html                 métadonnées, Open Graph, icônes ; adresses absolues et JSON-LD injectés par vite.config.ts
render.yaml                Blueprint Render (build, en-têtes, réécriture, SITE_URL)
DEPLOIEMENT.md             marche à suivre de mise en ligne et vérifications
public/
  charte/                  charte graphique générée (index.html, assets, PDF)
  brand/                   logo en SVG : horizontal, vertical, symbole, mot-symbole, versions claire et sombre, icône
  favicon.svg, icon-*.png, apple-touch-icon.png, og-image.png, manifest.json ; robots.txt et sitemap.xml générés au build
src/
  main.tsx, App.tsx        montage, ordre des sections, révélations au défilement
  styles/global.css        jetons de la charte, base, boutons, étiquettes, repère
  brand/                   Logo.tsx (composant) et logoPaths.ts (tracés générés)
  components/
    Phone.tsx, phone.css   iPhone dessiné en CSS, écrans empilés
    Screens.tsx            les dix écrans de l'application (HTML/CSS, pas d'images)
    StoreButtons.tsx       boutons App Store / Google Play
    BrandIcon.tsx          pictogrammes des plateformes
  sections/                un composant + une feuille CSS par section
  content/                 textes du site (site.ts) et données de démonstration (demo.ts)
  assets/photos/           photographies WebP (voir CREDITS.md)
tools/
  build-brand.mjs          régénère toutes les déclinaisons du logo depuis logo-trace.json
  trace-logo.cjs           vectorisation du logo PNG d'origine (potrace)
  fetch-photos.mjs         téléchargement et conversion des photographies
  shoot.mjs, fullpage.mjs  captures de vérification (Chrome headless)
  check.mjs                contrôles d'interaction (onglets, FAQ, menu, score, mouvement réduit)
  sheet.mjs                planche-contact de captures
  shrink-photos.mjs        ré-encode les photos des écrans à la taille affichée (Chrome, canvas → WebP)
  make-ico.mjs             produit public/favicon.ico à partir des icônes PNG
  charte-verifier.mjs      contrôle et capture chaque planche de la charte
  charte-pdf.mjs           export PDF de la charte
  deploy-pages.mjs         construit et pousse le site sur la branche gh-pages (GitHub Pages)
  pages-workflow.yml       modèle de workflow GitHub Actions pour publier à chaque push
PRODUCT.md                 vérité produit issue du brief
DESIGN.md                  système visuel documenté depuis le build
CREDITS.md                 crédits photographiques et licences
```

## Logo

`logo.png` est le fichier fourni par le client. Il a été vectorisé (`tools/trace-logo.cjs`) pour obtenir des SVG nets à
toutes les tailles ; `tools/build-brand.mjs` produit les déclinaisons dans `public/brand/` et les tracés du composant
React. Le logo n'est jamais déformé ni recoloré en dehors des deux versions prévues (vert profond sur fond clair, ivoire
sur fond sombre ; le repère reste vert LOCAGAB).

## Partenariat

Le pied de page mentionne MÉTHODE AURA, qui a conçu et réalisé le site (logo ivoire officiel dans `public/partenaires/`, jamais recoloré ni déformé).

## Qualité

- Responsive vérifié à 1440, 1280, 1024, 768, 390 et 375 px, sans débordement horizontal.
- Accessibilité : un seul `h1`, repères de navigation, onglets ARIA pour les fonctionnalités, focus visible, textes
  alternatifs, contrastes AA (vert d'action avec texte sombre, vert de texte assombri sur fond clair), parcours complet
  en `prefers-reduced-motion`.
- Détecteur d'anti-patterns Impeccable : aucune remarque sur le site lui-même ; les seuls écarts signalés sont les
  tailles, rayons et gris propres à l'interface de l'application dans les iPhone (`phone.css`), qui ont leur propre
  échelle. Contrôles `tools/check.mjs` : tous passés. Revue de finition indépendante : correctifs appliqués.
- Poids du build : CSS 13 Ko et JS 142 Ko compressés ; photos des écrans ré-encodées à 640 px (13 à 41 Ko), photos
  de Libreville en deux tailles (32 à 228 Ko).
- Lighthouse sur le build de production (7 oct. 2026) : ordinateur performance 83+, accessibilité 100, bonnes
  pratiques 100, SEO 100 ; mobile (processeur ralenti ×4) performance 69, accessibilité 100, SEO 100. Le poste
  mobile est limité par la mise en page des vingt-six écrans d'iPhone simulés en HTML (2 400 éléments).
- Référencement : canonical, Open Graph et Twitter en adresses absolues, `robots.txt` et `sitemap.xml` générés au
  build, données structurées schema.org (Organization, WebSite, MobileApplication, FAQPage).
