---
name: LOCAGAB
description: Site vitrine de l'application immobilière du Gabon ; chaque section parle la grammaire de la preuve.
colors:
  forest: "#073b32"
  forest-deep: "#052c26"
  forest-soft: "#0f4a40"
  green: "#18a957"
  green-hover: "#1dbb62"
  green-ink: "#0c7f3f"
  green-display: "#12964b"
  green-light: "#3fcb7d"
  on-green: "#04241e"
  ivory: "#f7f5ef"
  sand: "#efebe1"
  white: "#ffffff"
  charcoal: "#17211f"
  muted: "#55625e"
  muted-on-forest: "#a9c4bc"
  line: "rgb(7 59 50 / 0.14)"
  line-strong: "rgb(7 59 50 / 0.28)"
  line-on-forest: "rgb(247 245 239 / 0.16)"
  line-on-forest-strong: "rgb(247 245 239 / 0.32)"
typography:
  display:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.75rem, 1.35rem + 5.1vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.9vw, 3.5rem)"
    fontWeight: 680
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.55vw, 1.5rem)"
    fontWeight: 680
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.125rem, 1.02rem + 0.45vw, 1.3125rem)"
    fontWeight: 450
    lineHeight: 1.5
  body:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 450
    lineHeight: 1.6
  small:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 450
    lineHeight: 1.5
  label:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.14em"
  score:
    fontFamily: "Manrope Variable, Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(4.5rem, 3rem + 7vw, 6.25rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
rounded:
  focus: "6px"
  md: "20px"
  lg: "28px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "1.75rem"
  xl: "3rem"
  gutter: "clamp(1.25rem, 0.4rem + 3.6vw, 3rem)"
  section: "clamp(5rem, 3rem + 8vw, 9.5rem)"
  max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    rounded: "{rounded.pill}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
    textColor: "{colors.on-green}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-small:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    rounded: "{rounded.pill}"
    padding: "0 1.2rem"
    height: "2.75rem"
  label:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  store-button:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.5rem 0.5rem 1.25rem"
    height: "3.75rem"
  store-button-soon:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.5rem 0.5rem 1.25rem"
    height: "3.75rem"
  score-panel:
    backgroundColor: "{colors.forest-soft}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.5rem, 1rem + 2.5vw, 2.75rem)"
  feature-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "1.4rem 1.5rem"
  feature-tab-active:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.md}"
    padding: "1.4rem 1.5rem"
  nav-link:
    textColor: "{colors.forest}"
    padding: "0.75rem 0"
---

# Design System: LOCAGAB

## Overview

**Creative North Star : « Le dossier vérifié »**

Le site est l'endroit où une annonce devient un fait vérifié. Tout ce qui s'y affiche emprunte la grammaire de la preuve : un repère rond, un statut, une référence, une date, un filet. Il refuse la forme par défaut de sa catégorie (une barre de recherche au-dessus d'une grille de cartes) parce que le site n'est pas une plateforme ; c'est le dossier de présentation d'une application, et l'application est montrée telle qu'elle est, en HTML dans des iPhone dessinés en CSS.

La matière est calme : un fond ivoire chaud, une seule bande de sable pour la rangée des sept écrans, des champs de vert profond qui occupent des sections entières (confiance, téléchargement, pied de page), et le blanc réservé à la surface de l'application elle-même. Le vert LOCAGAB est rare : il n'apparaît que sur les actions et sur la marque de vérification. Les filets en vert profond font office de règles de formulaire ; aucune carte ne flotte. La densité est aérée, une idée par section, une action principale par section.

Le mouvement est lent, exact, sans rebond. Les titres se posent ligne par ligne derrière un masque, les blocs montent de quelques pixels, les écrans changent dans le téléphone en posant leurs rangées une à une (pas de glissement), et le Trust Score s'assemble vérification après vérification pendant que le chiffre monte à 95 %.

**Key Characteristics:**
- Un seul signe pour tout le site : l'anneau, pris de l'œil du pictogramme (point de disponibilité, sceau de vérification, marqueur de carte, marqueur d'étape).
- Trois tons de section (ivoire, blanc, vert profond) plus une bande de sable ; chaque ton redéfinit texte, filet et accent par `data-tone`.
- Manrope seule, graisses variables fines (450 corps, 680 titres, 700 étiquettes), interlettrage serré sur les titres.
- Filets de 1 px en vert profond comme structure ; pas de carte flottante, pas d'ombre décorative hors de l'appareil.
- Chiffres tabulaires pour prix, références, dates et score.

## Colors

Une palette à un seul accent sur deux terres : le vert profond de la marque et l'ivoire chaud, avec le vert LOCAGAB utilisé avec parcimonie.

### Primary
- **Vert profond** (`forest`) : couleur d'encre forte. Titres sur fond clair, liens de navigation, logo en version claire, filets de tête de liste, et fond des sections « Plus qu'une annonce », « Votre prochain logement » et du pied de page.
- **Vert profond sombre** (`forest-deep`) : fond du pied de page uniquement ; il assombrit la fin de page sous la section de téléchargement.
- **Vert profond doux** (`forest-soft`) : fond du panneau Trust Score, posé sur le champ vert profond ; c'est le seul « niveau » tonal sur fond sombre.
- **Vert LOCAGAB** (`green`) : l'accent. Bouton principal, anneau du repère, sceau de vérification, segments du score, point de navigation active, bulle d'onglet actif, sélection de texte. Jamais en aplat de section, jamais sur de grands textes.
- **Vert LOCAGAB survol** (`green-hover`) : seul état de survol du bouton principal.
- **Vert encre** (`green-ink`) : vert pour texte sur fond clair (4,6:1). Numéros d'étape, anneau de focus, liens dans les écrans de l'application.
- **Vert d'affichage** (`green-display`) : vert pour grands titres sur fond clair (3,5:1). Le mot « simplement. » du H1 et les principes « Confiance / Simplicité / Proximité » au survol. Réservé aux corps de 2 rem et plus.
- **Vert clair** (`green-light`) : vert pour texte sur fond vert profond (6:1). Statut « Vérifié » du score, liens survolés du pied de page, focus sur fond sombre.
- **Encre sur vert** (`on-green`) : texte et coche sur fond vert LOCAGAB ; jamais ailleurs.

### Neutral
- **Ivoire chaud** (`ivory`) : fond du site, du header solidifié, de l'onglet actif, des boutons de store, de la planche sous l'appareil propriétaires ; texte sur fond vert profond.
- **Sable** (`sand`) : bande de la rangée des sept écrans et fond des cadres photo, pour que les appareils aient un sol à eux.
- **Blanc** (`white`) : surface de l'application dans les téléphones et fond des sections « Tout ce dont vous avez besoin », « Vous avez un logement à louer ? » et « Pensé pour le Gabon ».
- **Charbon** (`charcoal`) : texte courant sur fond clair.
- **Gris vert** (`muted`) : texte secondaire, chapeaux, étiquettes, onglets inactifs sur fond clair ; **gris vert sur vert profond** (`muted-on-forest`) joue le même rôle sur les champs sombres.
- **Filet** (`line`, `line-strong`) : vert profond à 14 % et 28 %, pour les séparateurs, contours fantômes et anneaux de fond ; **filet sur vert profond** (`line-on-forest`, `line-on-forest-strong`) en ivoire à 16 % et 32 %.

### Named Rules
**The One Green Rule.** Le vert LOCAGAB (`green`) ne se pose que sur une action ou sur une marque de vérification. Le texte vert emprunte `green-ink`, `green-display` ou `green-light` selon le fond et la taille ; un aplat de section n'est jamais vert LOCAGAB.

**The Tone Field Rule.** Un ton de section (`data-tone` ivoire, blanc, sable, vert profond) se change par section entière. Les rôles `--bg`, `--fg`, `--fg-muted`, `--rule`, `--accent-text` suivent ; un composant ne force jamais sa couleur de texte en dur quand un rôle existe.

**The Contrast Ladder Rule.** Trois verts de texte, trois usages : `green-ink` pour le texte courant sur clair, `green-display` à partir de 2 rem sur clair, `green-light` sur vert profond. Pas d'autre vert pour du texte.

## Typography

**Display Font :** Manrope Variable (avec Manrope, system-ui)
**Body Font :** Manrope Variable (même famille)
**Label Font :** Manrope Variable, capitales espacées

**Character :** une seule famille, modulée par la graisse variable et l'interlettrage. Les titres sont serrés (−0,035 à −0,04 em) et bas (interligne 0,98 à 1,04), le corps est posé à 450, les étiquettes à 700 en capitales très espacées (0,14 em). Rien de décoratif ; la hiérarchie vient de la taille et du serrage.

### Hierarchy
- **Display** (700, `clamp(2.75rem, 1.35rem + 5.1vw, 5.5rem)`, 0,98) : le H1 du hero, sur trois lignes, dernière ligne en `green-display`. Le hero plafonne le H1 à 5,25 rem sur grand écran et à 4,5 rem entre 520 et 1024 px.
- **Headline** (680, `clamp(2rem, 1.25rem + 2.9vw, 3.5rem)`, 1,04) : H2 de section, limité à 12–21 ch par `max-width` ; aussi la réponse « LOCAGAB centralise tout. » et, en plus grand (`clamp(3rem, 1.2rem + 9vw, 8.5rem)`, 700, 0,95), les trois principes.
- **Title** (680, `clamp(1.25rem, 1.1rem + 0.55vw, 1.5rem)`, 1,2) : H3 génériques, statut « Vérifié » du score ; les titres d'étape montent à `clamp(1.75rem, 1.3rem + 2vw, 2.75rem)`, les questions de la FAQ à `clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem)` en 660.
- **Lead** (450, `clamp(1.125rem, 1.02rem + 0.45vw, 1.3125rem)`, 1,5) : chapeau en gris vert, au plus 34 rem de large.
- **Body** (450, 1,0625 rem, 1,6) : texte courant ; les paragraphes de liste sont bornés à 26–40 rem.
- **Small** (450, 0,9375 rem, 1,5) : navigation, numéros d'étape, texte secondaire d'onglet.
- **Label** (700, 0,75 rem, 0,14 em, CAPITALES) : statuts et métadonnées uniquement ; toujours précédé de l'anneau.
- **Score** (700, `clamp(4.5rem, 3rem + 7vw, 6.25rem)`, 0,9, chiffres tabulaires) : le seul chiffre géant du site, dans le panneau Trust Score.

### Named Rules
**The Status-Only Label Rule.** L'étiquette en capitales espacées nomme un état ou une métadonnée (« Annonce vérifiée », « Carte interactive », le nom d'un écran, le nom du score, les intitulés de colonnes du pied de page). Elle n'introduit pas un H2 de section.

**The Tabular Figures Rule.** Prix, références, dates, numéros d'étape et score sont composés en `font-variant-numeric: tabular-nums`.

**The Balanced Heading Rule.** Les titres portent `text-wrap: balance` et une largeur maximale en `ch` ; les paragraphes portent `text-wrap: pretty`.

## Layout

Un conteneur centré de 1240 px plus deux gouttières fluides (`clamp(1.25rem, 0.4rem + 3.6vw, 3rem)`). Les sections empilent un `padding-block` fluide (`clamp(5rem, 3rem + 8vw, 9.5rem)`) ; le hero est plus serré (7 rem / 3,5 rem sur mobile, 8,5 rem / 5 rem à partir de 768 px) et la section « Chercher un logement » commence à `clamp(4rem, 2rem + 6vw, 7rem)`.

Les sections sont des grilles à deux colonnes à partir de 900–960 px (5fr/6fr pour le problème, 5fr/7fr pour la FAQ, 1fr/1.2fr pour le hero à 1024 px, 1fr/1fr pour la confiance et les étapes), à une colonne en dessous. Les titres de la colonne gauche sont collants (`top: 8rem`) sur ordinateur dans le problème et la FAQ ; l'appareil des étapes est collant au centre de l'écran pendant que les quatre étapes défilent à sa droite, avec un filet de progression vertical qui se remplit en vert.

Le header est fixe (4,75 rem), transparent sur le hero puis ivoire avec un filet quand la page défile ; la navigation horizontale n'apparaît qu'à partir de 1100 px, sinon un menu en feuille plein écran ivoire avec des liens en 1,5 rem séparés par des filets.

Les écrans de téléphone se mettent à l'échelle avec `zoom` via `--z` (0,58 à 1,06 selon le contexte et le point de rupture) ; le téléphone de référence fait 300 × 620 px. La rangée des sept écrans défile au doigt avec aimantation sur mobile, et se déploie en pleine largeur avec un appareil sur deux décalé de 4 rem sur ordinateur. Les points de rupture en usage : 480, 520, 620, 768, 900, 960, 1024, 1100, 1160, 1280 et 1400 px.

Rythme interne observé : 0,5 rem entre numéro et titre, 0,75 rem entre liens d'une liste, 1,5 rem entre les blocs d'un en-tête de section, 1,75 rem entre les blocs du panneau de score et de la colonne de texte, 3 à 3,5 rem entre colonnes empilées sur mobile.

## Elevation & Depth

Le site est plat. La profondeur vient des tons de section et des filets, pas des ombres : les listes commencent par un filet vert profond plein (1 px) et séparent leurs lignes par un filet à 14 % ; les contours de boutons fantômes et d'icônes rondes sont à 28 %. Les anneaux concentriques derrière les appareils du hero et de la section de téléchargement sont des cercles de 1 px au ton du filet, jamais remplis.

Les seules ombres portées appartiennent à l'appareil : le corps de l'iPhone porte une ombre teintée vert profond, et à l'intérieur de l'application, les éléments qui flottent réellement (marqueur de carte, feuille de résultat, bouton rond flottant, curseur de plage) portent une ombre courte, elle aussi teintée vert profond.

### Shadow Vocabulary
- **Appareil** (`box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.14), inset 0 0 0 3px #0a0e0d, 0 46px 70px -34px rgb(7 59 50 / 0.5), 0 18px 32px -20px rgb(7 59 50 / 0.4)`) : le corps du téléphone, partout sauf en bas de page.
- **Appareil de clôture** (`box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.2), inset 0 0 0 3px #0a0e0d, 0 -30px 80px -30px rgb(0 0 0 / 0.5)`) : le téléphone qui sort du bas de la section de téléchargement, éclairé par le haut.
- **Flottant d'application** (`box-shadow: 0 6px 16px -8px rgb(7 59 50 / 0.5)` à `0 14px 30px -14px rgb(7 59 50 / 0.55)`) : marqueur, feuille, bouton rond et champ de recherche flottants à l'intérieur de l'écran ; marqueur actif avec un halo `0 0 0 6px rgb(24 169 87 / 0.25)`.
- **Point de disponibilité** (`box-shadow: 0 0 0 2.5px rgb(24 169 87 / 0.22)`) : halo du point vert de disponibilité dans l'application.

### Named Rules
**The Device-Only Shadow Rule.** Une ombre portée n'existe que sur le téléphone ou dans son écran. Les surfaces du site (panneau de score, planche propriétaires, cadres photo, onglets) sont posées à plat, délimitées par leur ton ou un filet.

**The Tinted Shadow Rule.** Toute ombre est teintée en vert profond (`rgb(7 59 50 / α)`), jamais en noir neutre, sauf le halo inversé de l'appareil de clôture.

## Shapes

Deux familles de formes : la pilule et le cercle pour tout ce qui est actif ou signal, le rectangle à grands coins pour les surfaces. Les boutons, boutons de store, lien d'évitement, puces de l'application et champ de saisie sont des pilules (999 px). Le repère, le sceau, les icônes de fonctionnalité, l'icône d'ouverture de FAQ, les boutons ronds et les avatars sont des cercles. Les surfaces larges prennent 20 px (onglet de fonctionnalité) ou 28 px (panneau de score, planche propriétaires, cadres photo). Le focus visible arrondit à 6 px.

Le téléphone est dessiné avec 50 px de rayon extérieur et 41 px pour l'écran, 9 px de bordure, île dynamique 82 × 24 px arrondie à 14 px, barre d'accueil 96 × 4 px. À l'intérieur de l'application, les cartes prennent 18 px, les champs et tuiles 12 à 14 px, les bulles de messagerie 16 px avec un coin à 5 px vers l'émetteur.

Les filets sont toujours de 1 px (2 px pour la progression des étapes et le trait du menu). Les callouts du hero relient l'étiquette à l'appareil par un filet vertical de 1 px et 1,7 rem.

## Components

### L'anneau (le repère)
Caractère : un seul signe, répété, jamais décoré.
- **Forme :** cercle vide de 0,72 em, bordure de 0,2 em en vert LOCAGAB ; il se dimensionne avec le texte qu'il précède.
- **Usages :** devant chaque étiquette de statut, devant les numéros d'étape, devant les noms de lieux (0,5 em, bordure 0,14 em), devant les principes, et dans la réponse « LOCAGAB centralise tout. » (0,5 em, bordure 0,13 em).
- **Variante vide** (`ring--empty`) : bordure au ton `line-strong` pour « rien n'est vérifié » dans la liste des problèmes.
- **Dérivés :** le point de navigation active (5 px plein vert sous le lien), le sceau (cercle plein vert avec coche en `on-green`), le point de disponibilité et le marqueur de carte dans l'application.

### Buttons
- **Shape :** pilule (999 px), hauteur minimale 3,25 rem, padding horizontal 1,6 rem, 1 rem en 680, interlettrage −0,01 em.
- **Primary :** fond vert LOCAGAB, texte `on-green`. Survol : fond `green-hover` (180 ms linéaire). Actif : `scale(0.98)`. L'icône éventuelle (1,1 em) descend de 2 px au survol en 420 ms.
- **Ghost :** fond transparent, texte `fg-strong`, contour `rule-strong` ; au survol le contour prend la couleur du texte. Sur fond vert profond il devient ivoire avec contour ivoire à 32 %.
- **Small :** 2,75 rem de haut, padding 1,2 rem, 0,9375 rem (bouton du header).
- **Focus :** contour 2 px `green-ink` décalé de 3 px (`green-light` sur fond vert profond).

### Lien fléché
- Lien d'action discret : texte 680 en `fg-strong` souligné par un dégradé de 1 px qui se retire vers la droite au survol (420 ms), flèche de 1,1 em qui descend de 3 px. Hauteur de cible 2,75 rem.

### Étiquette de statut
- Capitales espacées (0,75 rem, 700, 0,14 em), gris vert, précédée de l'anneau avec un écart de 0,6 em. Sur la bande de sable et dans les callouts du hero elle passe en vert profond. Le nom du score porte à sa droite une référence et une date en minuscules, 600, interlettrage 0,04 em, chiffres tabulaires.

### Navigation
- Liens 0,9375 rem en 600, vert profond, sans soulignement. L'état survolé ou courant pose un point vert de 5 px sous le lien (fondu et montée de 4 px en 420 ms). Le header devient ivoire avec filet quand il est solidifié. Sous 1100 px : bouton rond 2,75 rem à deux traits qui se croisent, puis feuille plein écran avec liens 1,5 rem en 650 séparés par des filets.

### Boutons de store
- Pilule ivoire sur fond vert profond, 3,75 rem de haut, 12,25 rem de large minimum, icône 1,6 rem, deux lignes (« Télécharger sur » en 0,75 rem 600, nom du store en 1,1875 rem 720). Survol : fond blanc. Actif : `scale(0.98)`.
- **Bientôt** (`store--soon`) : contour ivoire à 32 %, fond transparent, texte ivoire ; rendu comme `<span>`, ce n'est pas un lien tant que l'adresse est vide.

### Panneau Trust Score
- Surface `forest-soft` arrondie à 28 px avec un filet ivoire à 16 %, padding fluide (1,5 à 2,75 rem), grille à 1,75 rem d'écart.
- Contenu : étiquette avec référence et date ; chiffre géant 95 avec « % » en 0,45 em ; statut « Vérifié » en `green-light` précédé d'un trait de 1,5 rem ; barre de cinq segments de 6 px sur une piste au ton du filet ; liste de cinq vérifications séparées par des filets, chacune avec un sceau de 1,5 rem.
- Mouvement : au premier passage à 72 % de l'écran, chaque vérification s'allume toutes les 0,5 s (ligne 0,35 → 1 d'opacité, sceau qui se remplit, coche tracée en 0,45 s, segment qui s'étire en 0,5 s), le chiffre monte de 19 en 19 ; le statut apparaît en dernier. Rien ne bouge en mouvement réduit.

### Onglets de fonctionnalité
- Bouton transparent arrondi (16 px sur mobile, 20 px sur ordinateur), texte gris vert, icône dans un cercle 2,75 rem au contour `line-strong`. Survol : texte charbon, contour vert profond. Actif : fond ivoire, texte charbon, cercle d'icône plein vert LOCAGAB avec icône `on-green`. Transitions 420 ms. Sur mobile, les six onglets forment une grille de trois colonnes et le texte de l'onglet choisi s'affiche sous l'appareil.

### Liste d'étapes
- Chaque étape : numéro en `green-ink` (0,9375 rem, 700, 0,06 em, chiffres tabulaires) précédé de l'anneau, titre en 680 serré, paragraphe gris vert en taille lead, 26 rem de large maximum. Sur mobile, un filet vert profond ouvre chaque étape et un aperçu du haut de l'écran se fond vers le bas (masque à 72 %). Sur ordinateur, les étapes inactives sont à 32 % d'opacité (800 ms), le filet de progression à gauche se remplit en vert.

### Accordéon FAQ
- `<details>` natif. Liste ouverte par un filet vert profond, lignes séparées par des filets à 14 %. Résumé : question en 660, icône plus dans un cercle 2,5 rem au contour `line-strong`. Survol : contour vert profond. Ouvert : cercle plein vert LOCAGAB, icône `on-green`, rotation 45°. Le contenu s'ouvre en hauteur sur 420 ms là où `::details-content` est animable ; réponse en gris vert, 40 rem de large maximum.

### Listes à filets
- Motif récurrent (problèmes, tâches propriétaires, lieux, principes, FAQ) : filet d'ouverture vert profond plein, lignes séparées par un filet à 14 %, pas de fond, pas de carte. Les lieux sont en 660 serré de 1,5 à 2 rem ; les principes en très grand (jusqu'à 8,5 rem) passent en `green-display` et glissent de 0,12 em au survol.

### Cadre de téléphone
- iPhone dessiné en CSS, 300 × 620 px, zoomé par `--z`. Corps en dégradé graphite (`#39423f → #121716 → #0b0f0e → #2a3230`), bordure 9 px, écran blanc arrondi à 41 px, île et barre d'accueil en noir profond, boutons latéraux de 3 px. Les écrans sont des couches empilées ; une seule visible, l'entrante apparaît en 480 ms avec 120 ms de retard et ses rangées se posent une à une par pas de 60 ms (`steps(1)`), sans glissement.

### Interface de l'application (dans l'écran)
- Encre `#17211f`, vert profond, vert LOCAGAB, `green-ink`, gris `#64716d`, surface ivoire, filet vert profond à 10 %. Corps 11 px en 500, titres 14 à 20 px. Puces pilule au contour filet, actives en vert profond plein. Cartes 18 px avec filet. Badge « vérifié » sur `#e6f4ec` en `#0a6a34` ; badge « loué » sur `#eeece6` en gris. Bouton d'action pilule 44 px vert LOCAGAB. Barre d'onglets avec filet supérieur, onglet actif en vert profond.

## Do's and Don'ts

### Do:
- **Do** réserver le vert LOCAGAB aux actions et aux marques de vérification ; prendre `green-ink`, `green-display` ou `green-light` pour tout texte vert selon le fond et la taille.
- **Do** changer de ton par section entière avec `data-tone` et laisser les rôles (`--fg`, `--fg-muted`, `--rule`, `--accent-text`) suivre.
- **Do** ouvrir une liste par un filet vert profond plein et séparer ses lignes par un filet à 14 % ; aucune carte autour.
- **Do** faire précéder chaque étiquette de statut par l'anneau, avec 0,6 em d'écart.
- **Do** composer prix, références, dates, numéros et score en chiffres tabulaires.
- **Do** animer en 180 / 420 / 800 ms avec `cubic-bezier(0.22, 1, 0.36, 1)` et, en GSAP, `power3.out` ou `power4.out` sur 1 à 1,6 s ; couper toute animation en `prefers-reduced-motion`.
- **Do** faire changer les écrans dans un téléphone par rangées posées en pas (`steps(1)`), jamais par glissement.
- **Do** montrer l'application en HTML/CSS dans le cadre de téléphone, jamais en image aplatie.

### Don't:
- **Don't** poser une ombre portée sur une surface du site : les ombres n'existent que sur le téléphone et dans son écran, et sont teintées en vert profond.
- **Don't** utiliser le vert LOCAGAB en aplat de section ni sur du texte courant.
- **Don't** employer l'étiquette en capitales espacées comme eyebrow au-dessus d'un H2 de section ; elle nomme un état ou une métadonnée.
- **Don't** introduire une barre de recherche ni une grille de biens dans le site : l'application montre la recherche, le site montre l'application.
- **Don't** ajouter de dégradé hors du corps du téléphone et du voile photo de l'écran de fiche, ni de rebond dans les easings.
- **Don't** changer de famille typographique ; Manrope seule, la hiérarchie vient de la graisse, de la taille et du serrage.
- **Don't** renseigner un bouton de store comme lien tant que son adresse est vide ; la variante « Bientôt » reste un contour.
