/* LOCAGAB — film de 30 s : génère video/scene.html, une scène 1920 × 1080 animée par une ligne de temps GSAP
   déterministe (window.seek(t) place la scène à l'instant t ; tools/video-render.mjs capture image par image).
   node video/build-scene.mjs */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { logoHorizontal, symbole, anneau, FOREST, GREEN, IVORY, CHARCOAL, GREEN_LIGHT, GREEN_DISPLAY, MUTED, MUTED_ON_FOREST, FOREST_SOFT, ON_GREEN } from '../charte/lib.mjs';

const ICI = dirname(fileURLToPath(import.meta.url));
const lettres = (t) => [...t].map((c) => `<span class="l">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
const lignes = (arr, classe = '') => arr.map((l) => `<span class="mask"><span class="ln ${classe}">${l}</span></span>`).join('');

/* ---------- écran d'accueil et fiche (HTML, pas d'image) ---------- */
const coche = `<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 8.4l2.6 2.6L12 5.6" fill="none" stroke="${ON_GREEN}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ecranAccueil = `
<div class="app">
  <div class="app-top"><span class="app-brand">${symbole({ hauteur: 22 })}<b>LOCAGAB</b></span><span class="app-bell"></span></div>
  <div class="app-search"><i></i>Que recherchez-vous ?</div>
  <div class="app-lieu"><i class="pin"></i>Libreville</div>
  <div class="app-chips"><span class="on">Appartement</span><span>Maison</span><span>Studio</span></div>
  <div class="app-heading"><b>Sélection</b><span>Voir tout</span></div>
  <div class="app-card">
    <div class="app-photo"><img src="assets/photos/salon.webp" alt=""><span class="dispo"><i></i>Disponible maintenant</span></div>
    <div class="app-body"><b>Appartement moderne à Libreville</b><span class="prix">450 000 FCFA <small>/ mois</small></span><span class="meta">2 chambres · 2 salles de bain · 120 m²</span></div>
  </div>
  <div class="app-card app-card--2"><div class="app-photo"><img src="assets/photos/villa.webp" alt=""></div></div>
  <div class="app-tabs"><span class="on">Accueil</span><span>Carte</span><span>Favoris</span><span>Messages</span><span>Profil</span></div>
</div>`;
const ecranFiche = `
<div class="app app--fiche">
  <div class="fiche-photo"><img src="assets/photos/salon.webp" alt=""><span class="n">1 / 12</span></div>
  <div class="fiche-body">
    <div class="fiche-badges"><span class="ok">${coche}Annonce vérifiée</span><span class="dispo"><i></i>Disponible maintenant</span></div>
    <b class="fiche-titre">Appartement moderne à Libreville</b>
    <span class="fiche-lieu"><i class="pin"></i>Louis, Libreville</span>
    <span class="fiche-ref">Réf. LBV-2041 · vérifiée le 3 oct.</span>
    <span class="prix">450 000 FCFA <small>/ mois</small></span>
    <div class="fiche-tuiles"><span>2 chambres</span><span>2 salles de bain</span><span>120 m²</span></div>
    <div class="fiche-score"><span>Trust Score</span><i><b></b></i><span class="v">95 %</span></div>
    <span class="fiche-btn">Demander une visite</span>
  </div>
</div>`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>LOCAGAB — film 30 s</title>
<style>
@font-face { font-family: "Manrope"; src: url("assets/fonts/manrope-latin-ext-wght-normal.woff2") format("woff2"); font-weight: 200 800; unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: "Manrope"; src: url("assets/fonts/manrope-latin-wght-normal.woff2") format("woff2"); font-weight: 200 800; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
:root { --forest:${FOREST}; --green:${GREEN}; --ivory:${IVORY}; --charcoal:${CHARCOAL}; --muted:${MUTED}; --muted-f:${MUTED_ON_FOREST}; --gl:${GREEN_LIGHT}; --gd:${GREEN_DISPLAY}; --fs:${FOREST_SOFT}; }
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: #000; }
body { width: 1920px; height: 1080px; overflow: hidden; font-family: "Manrope", sans-serif; color: var(--charcoal); -webkit-font-smoothing: antialiased; }
#stage { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: var(--ivory); }
.scene { position: absolute; inset: 0; }
.fond { position: absolute; inset: 0; }
.fond--forest { background: var(--forest); }
.fond--ivory { background: var(--ivory); }
.mask { display: block; overflow: hidden; padding-bottom: 0.14em; margin-bottom: -0.14em; }
.mask .ln { display: block; will-change: transform; }
.label { display: inline-flex; align-items: center; gap: 14px; font-size: 24px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.label .l { display: inline-block; }
.anneau { display: inline-block; border-radius: 50%; }
.titre { font-weight: 700; letter-spacing: -0.04em; line-height: 0.98; color: var(--forest); }
.rings { position: absolute; pointer-events: none; }
/* S1 */
#s1 .cercle { position: absolute; left: 160px; top: 440px; width: 200px; height: 200px; }
#s1 .cercle circle { fill: none; stroke: var(--green); stroke-width: 26; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 50% 50%; }
#s1 .label { position: absolute; left: 160px; top: 700px; }
/* S2 */
#s2 .titre { position: absolute; left: 160px; top: 250px; font-size: 118px; width: 1000px; }
#s2 .liste { position: absolute; left: 1200px; top: 300px; width: 560px; }
#s2 .item { display: grid; grid-template-columns: 20px 1fr; column-gap: 18px; align-items: center; padding: 24px 0; border-top: 1px solid rgb(7 59 50 / 0.18); font-size: 32px; font-weight: 680; letter-spacing: -0.02em; color: var(--forest); }
#s2 .item .anneau { width: 16px; height: 16px; border: 4px solid rgb(7 59 50 / 0.28); }
#s2 .item:last-child { border-bottom: 1px solid rgb(7 59 50 / 0.18); }
#s2 .item .l2 { grid-column: 2; color: var(--muted); font-weight: 700; font-size: 16px; letter-spacing: 0.14em; text-transform: uppercase; margin-top: 6px; }
/* S3 */
#s3 .panneau { position: absolute; inset: 0; background: var(--forest); clip-path: inset(100% 0 0 0); }
#s3 .centralise { position: absolute; left: 160px; top: 470px; display: flex; align-items: center; gap: 34px; font-size: 104px; font-weight: 700; letter-spacing: -0.04em; color: var(--ivory); }
#s3 .centralise .anneau { width: 44px; height: 44px; border: 11px solid var(--green); }
/* S4 phone */
.phone { position: absolute; width: 420px; height: 868px; border-radius: 70px; background: linear-gradient(160deg, #39423f, #121716 40%, #0b0f0e 70%, #2a3230); padding: 13px; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.14), 0 70px 110px -50px rgb(0 0 0 / 0.7); }
.phone .screen { position: relative; width: 100%; height: 100%; border-radius: 58px; background: #fff; overflow: hidden; }
.phone .island { position: absolute; left: 50%; top: 16px; width: 112px; height: 34px; margin-left: -56px; border-radius: 20px; background: #0b0f0e; z-index: 5; }
.phone .home { position: absolute; left: 50%; bottom: 12px; width: 134px; height: 6px; margin-left: -67px; border-radius: 6px; background: #0b0f0e; z-index: 5; opacity: .9; }
.layer { position: absolute; inset: 0; }
.app { position: absolute; inset: 0; padding: 72px 24px 0; display: flex; flex-direction: column; gap: 14px; font-size: 15px; color: var(--charcoal); background: #fff; }
.app-top { display: flex; justify-content: space-between; align-items: center; }
.app-brand { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; letter-spacing: -0.02em; color: var(--forest); font-size: 17px; }
.app-bell { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgb(7 59 50 / 0.2); }
.app-search { display: flex; align-items: center; gap: 10px; height: 50px; border-radius: 999px; background: var(--ivory); padding: 0 18px; color: var(--muted); font-size: 15px; }
.app-search i, .pin { width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid var(--forest); display: inline-block; }
.pin { border-color: var(--green); width: 12px; height: 12px; margin-right: 6px; vertical-align: -1px; }
.app-lieu { font-weight: 700; color: var(--forest); font-size: 15px; }
.app-chips { display: flex; gap: 8px; }
.app-chips span { padding: 8px 16px; border-radius: 999px; border: 1px solid rgb(7 59 50 / 0.2); font-size: 14px; font-weight: 600; }
.app-chips .on { background: var(--forest); color: var(--ivory); border-color: var(--forest); }
.app-heading { display: flex; justify-content: space-between; align-items: baseline; font-size: 17px; }
.app-heading span { color: ${GREEN_DISPLAY}; font-size: 13px; font-weight: 700; }
.app-card { border-radius: 22px; border: 1px solid rgb(7 59 50 / 0.12); overflow: hidden; background: #fff; }
.app-photo { position: relative; height: 180px; }
.app-photo img, .fiche-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.dispo { position: absolute; left: 12px; top: 12px; display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px; border-radius: 999px; background: rgb(255 255 255 / 0.92); font-size: 12px; font-weight: 700; color: var(--forest); }
.dispo i { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 3px rgb(24 169 87 / 0.22); }
.app-body { padding: 14px 16px 16px; display: grid; gap: 4px; }
.app-body b { font-size: 16px; font-weight: 700; color: var(--forest); }
.prix { font-size: 17px; font-weight: 800; color: var(--forest); font-variant-numeric: tabular-nums; }
.prix small { font-size: 12px; font-weight: 500; color: var(--muted); }
.meta { font-size: 12.5px; color: var(--muted); }
.app-card--2 .app-photo { height: 120px; }
.app-tabs { position: absolute; left: 0; right: 0; bottom: 0; height: 74px; border-top: 1px solid rgb(7 59 50 / 0.1); display: flex; justify-content: space-around; align-items: center; padding-bottom: 14px; font-size: 11px; color: var(--muted); background: #fff; }
.app-tabs .on { color: var(--forest); font-weight: 700; }
.app--fiche { padding: 0; gap: 0; }
.fiche-photo { position: relative; height: 320px; }
.fiche-photo .n { position: absolute; right: 14px; bottom: 14px; padding: 4px 10px; border-radius: 999px; background: rgb(23 33 31 / 0.6); color: #fff; font-size: 11px; font-weight: 700; }
.fiche-body { padding: 18px 22px; display: grid; gap: 8px; }
.fiche-badges { display: flex; gap: 8px; }
.fiche-badges span { display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border-radius: 999px; font-size: 12px; font-weight: 700; }
.fiche-badges .ok { background: #e6f4ec; color: #0a6a34; }
.fiche-badges .dispo { position: static; background: var(--ivory); }
.fiche-titre { font-size: 20px; font-weight: 700; color: var(--forest); letter-spacing: -0.02em; line-height: 1.15; }
.fiche-lieu { font-size: 13px; color: var(--muted); }
.fiche-ref { font-size: 11.5px; color: var(--muted); letter-spacing: 0.02em; }
.fiche-tuiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.fiche-tuiles span { background: var(--ivory); border-radius: 12px; padding: 12px 10px; font-size: 12px; font-weight: 600; color: var(--forest); text-align: center; }
.fiche-score { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; border: 1px solid rgb(7 59 50 / 0.12); border-radius: 14px; padding: 12px 14px; font-size: 12px; color: var(--muted); }
.fiche-score i { display: block; height: 6px; border-radius: 6px; background: rgb(7 59 50 / 0.1); overflow: hidden; }
.fiche-score i b { display: block; height: 100%; width: 95%; background: var(--green); transform-origin: left; }
.fiche-score .v { font-weight: 800; color: var(--forest); font-size: 14px; font-variant-numeric: tabular-nums; }
.fiche-btn { display: grid; place-items: center; height: 50px; border-radius: 999px; background: var(--green); color: ${ON_GREEN}; font-weight: 700; font-size: 15px; margin-top: 4px; }
.row { will-change: transform, opacity; }
.callout { position: absolute; display: flex; align-items: center; gap: 18px; font-size: 26px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ivory); white-space: nowrap; }
.callout .anneau { width: 18px; height: 18px; border: 5px solid var(--green); }
.callout .trait { height: 1px; width: 150px; background: rgb(247 245 239 / 0.4); transform-origin: left; }
.callout--g { flex-direction: row-reverse; }
.callout--g .trait { transform-origin: right; }
/* S5 Trust */
#s5 .score { position: absolute; left: 1000px; top: 170px; width: 760px; padding: 56px; border-radius: 40px; background: var(--fs); color: var(--ivory); box-shadow: inset 0 0 0 1px rgb(247 245 239 / 0.16); display: grid; gap: 30px; }
#s5 .score .nom { display: flex; align-items: center; gap: 14px; font-size: 18px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted-f); }
#s5 .score .nom .anneau { width: 14px; height: 14px; border: 4px solid var(--green); }
#s5 .score .nom small { margin-left: auto; font-size: 15px; letter-spacing: 0.04em; text-transform: none; font-weight: 600; }
#s5 .chiffre { display: flex; align-items: baseline; gap: 26px; }
#s5 .chiffre .n { font-size: 150px; font-weight: 700; letter-spacing: -0.05em; line-height: 0.9; font-variant-numeric: tabular-nums; }
#s5 .chiffre .n small { font-size: 0.42em; margin-left: 4px; }
#s5 .chiffre .statut { font-size: 28px; font-weight: 700; color: var(--gl); display: inline-flex; align-items: center; gap: 14px; }
#s5 .chiffre .statut::before { content: ''; width: 36px; height: 2px; background: var(--gl); }
#s5 .barre { display: flex; gap: 8px; }
#s5 .barre i { flex: 1; height: 8px; border-radius: 8px; background: rgb(247 245 239 / 0.14); position: relative; overflow: hidden; }
#s5 .barre i b { position: absolute; inset: 0; background: var(--green); transform-origin: left; }
#s5 .checks { display: grid; }
#s5 .check { display: flex; align-items: center; gap: 18px; padding: 16px 0; border-top: 1px solid rgb(247 245 239 / 0.14); font-size: 24px; font-weight: 600; }
#s5 .seal { width: 34px; height: 34px; border-radius: 50%; background: rgb(247 245 239 / 0.12); display: grid; place-items: center; }
#s5 .seal svg { width: 20px; height: 20px; }
#s5 .seal path { fill: none; stroke: ${ON_GREEN}; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; }
#s5 .intro { position: absolute; left: 160px; top: 200px; width: 720px; }
#s5 .intro .titre { color: var(--ivory); font-size: 84px; }
#s5 .intro p { font-size: 26px; line-height: 1.45; color: var(--muted-f); margin: 34px 0 0; max-width: 620px; }
/* S6 signature */
#s6 .panneau { position: absolute; inset: 0; background: var(--ivory); clip-path: inset(0 0 100% 0); }
#s6 .sig { position: absolute; left: 160px; top: 330px; font-size: 168px; }
#s6 .sig .ln.vert { color: var(--gd); }
#s6 .rings { left: 1060px; top: -220px; width: 1400px; height: 1400px; }
/* S7 fin */
#s7 .panneau { position: absolute; inset: 0; background: var(--forest); clip-path: inset(0 0 0 100%); }
#s7 .logo { position: absolute; left: 50%; top: 330px; transform: translateX(-50%); }
#s7 .stores { position: absolute; left: 50%; top: 600px; transform: translateX(-50%); display: flex; gap: 20px; }
#s7 .store { display: inline-flex; align-items: center; gap: 14px; height: 72px; padding: 0 30px 0 26px; border-radius: 999px; border: 1px solid rgb(247 245 239 / 0.32); color: var(--ivory); }
#s7 .store small { display: block; font-size: 13px; font-weight: 600; }
#s7 .store b { display: block; font-size: 22px; font-weight: 720; letter-spacing: -0.01em; }
#s7 .url { position: absolute; left: 50%; top: 720px; transform: translateX(-50%); font-size: 24px; font-weight: 600; color: var(--muted-f); letter-spacing: 0.02em; }
#s7 .partenaire { position: absolute; left: 0; right: 0; bottom: 70px; display: flex; justify-content: center; align-items: center; gap: 24px; font-size: 15px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted-f); }
#s7 .partenaire img { height: 40px; }
#s7 .partenaire span.r { font-weight: 500; letter-spacing: 0.02em; text-transform: none; font-size: 15px; }
#s7 .rings { left: 260px; top: -260px; width: 1400px; height: 1400px; }
</style>
</head>
<body>
<div id="stage">
  <!-- S1 : le repère -->
  <div class="scene" id="s1">
    <svg class="cercle" viewBox="0 0 200 200"><circle cx="100" cy="100" r="86" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
    <p class="label">${lettres("L'application immobilière du Gabon")}</p>
  </div>
  <!-- S2 : le problème -->
  <div class="scene" id="s2">
    <h1 class="titre">${lignes(['Chercher un', 'logement ne', 'devrait pas', 'être compliqué.'])}</h1>
    <div class="liste">
      ${[['Annonces peu fiables', 'Disponibilité inconnue'], ['Informations incomplètes', 'Prix non précisé'], ['Manque de confiance', 'Profil non identifié'], ['Trop de recherches', 'Offres dispersées']].map(([a, b]) => `<div class="item"><i class="anneau"></i>${a}<span class="l2">${b}</span></div>`).join('')}
    </div>
  </div>
  <!-- S3 : LOCAGAB centralise tout -->
  <div class="scene" id="s3">
    <div class="panneau"></div>
    <div class="centralise"><i class="anneau"></i><span class="mask"><span class="ln">LOCAGAB centralise tout.</span></span></div>
  </div>
  <!-- S4 : l'application -->
  <div class="scene" id="s4">
    <div class="fond fond--forest"></div>
    <div class="phone" style="left:750px;top:106px">
      <div class="screen"><span class="island"></span>
        <div class="layer layer--accueil">${ecranAccueil}</div>
        <div class="layer layer--fiche">${ecranFiche}</div>
        <span class="home"></span>
      </div>
    </div>
    <div class="callout c1" style="left:270px;top:330px"><i class="anneau"></i>Carte interactive<i class="trait"></i></div>
    <div class="callout callout--g c2" style="right:270px;top:500px"><i class="anneau"></i>Annonces vérifiées<i class="trait"></i></div>
    <div class="callout c3" style="left:300px;top:670px"><i class="anneau"></i>Contact direct<i class="trait"></i></div>
  </div>
  <!-- S5 : le Trust Score -->
  <div class="scene" id="s5">
    <div class="fond fond--forest"></div>
    <div class="intro"><h2 class="titre">${lignes(['Plus qu’une annonce.', 'Une information', 'fiable.'])}</h2><p>Identité, téléphone, localisation, logement, disponibilité : ce qui a été vérifié est montré, point par point.</p></div>
    <div class="score">
      <div class="nom"><i class="anneau"></i>LOCAGAB Trust Score<small>Réf. LBV-2041</small></div>
      <div class="chiffre"><span class="n"><span class="val">0</span><small>%</small></span><span class="statut">Vérifié</span></div>
      <div class="barre">${'<i><b></b></i>'.repeat(5)}</div>
      <div class="checks">${['Identité vérifiée', 'Téléphone vérifié', 'Localisation vérifiée', 'Logement vérifié', 'Disponibilité récente'].map((c) => `<div class="check"><span class="seal"><svg viewBox="0 0 16 16"><path d="M4 8.4l2.6 2.6L12 5.6" pathLength="1"/></svg></span>${c}</div>`).join('')}</div>
    </div>
  </div>
  <!-- S6 : la signature -->
  <div class="scene" id="s6">
    <div class="panneau"></div>
    <svg class="rings" viewBox="0 0 1400 1400">${[220, 340, 460, 580, 700].map((r) => `<circle cx="700" cy="700" r="${r}" fill="none" stroke="rgb(7 59 50 / 0.14)" stroke-width="1"/>`).join('')}</svg>
    <h2 class="titre sig">${lignes(['Trouvez votre', 'logement,'])}<span class="mask"><span class="ln vert">simplement.</span></span></h2>
  </div>
  <!-- S7 : fin -->
  <div class="scene" id="s7">
    <div class="panneau"></div>
    <svg class="rings" viewBox="0 0 1400 1400">${[220, 340, 460, 580, 700].map((r) => `<circle cx="700" cy="700" r="${r}" fill="none" stroke="rgb(247 245 239 / 0.12)" stroke-width="1"/>`).join('')}</svg>
    <div class="logo">${logoHorizontal({ encre: IVORY, hauteur: 150 })}</div>
    <div class="stores">
      <span class="store"><svg viewBox="0 0 24 24" width="30" height="30" fill="${IVORY}"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg><span><small>Bientôt sur</small><b>App Store</b></span></span>
      <span class="store"><svg viewBox="0 0 24 24" width="30" height="30" fill="${IVORY}"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg><span><small>Bientôt sur</small><b>Google Play</b></span></span>
    </div>
    <p class="url">locagab.onrender.com</p>
    <div class="partenaire"><span>En partenariat avec</span><img src="assets/methode-aura.png" alt="MÉTHODE AURA"><span class="r">Conception et réalisation</span></div>
  </div>
</div>
<script src="assets/gsap.min.js"></script>
<script>
/* Ligne de temps déterministe. Tout est positionné en secondes absolues ; window.seek(t) la place à t. */
const S = (q) => document.querySelectorAll(q);
const E = { out: 'power3.out', out4: 'power4.out', inout: 'power3.inOut', exp: 'expo.inOut' };
gsap.set('.scene', { autoAlpha: 0 });
gsap.set('#s1', { autoAlpha: 1 });
const tl = gsap.timeline({ paused: true, defaults: { ease: E.out } });

/* S1 — 0 → 3.4 : le repère se trace, l'étiquette s'écrit */
tl.fromTo('#s1 circle', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: E.inout }, 0.2)
  .fromTo('#s1 .label .l', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.022 }, 0.9)
  .to('#s1 .cercle', { scale: 0.11, x: -82, y: 262, transformOrigin: '50% 50%', duration: 1.1, ease: E.exp }, 2.3)
  .to('#s1 .label', { x: 44, duration: 1.1, ease: E.exp }, 2.3)
  .to('#s1', { autoAlpha: 0, duration: 0.4 }, 3.5);

/* S2 — 3.4 → 8 : le problème */
tl.set('#s2', { autoAlpha: 1 }, 3.4)
  .fromTo('#s2 .titre .ln', { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: E.out4, stagger: 0.12 }, 3.5)
  .fromTo('#s2 .item', { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.16 }, 4.1)
  .to('#s2 .item', { autoAlpha: 0.28, duration: 0.6, stagger: 0.06 }, 6.9)
  .to('#s2 .titre', { autoAlpha: 0.25, duration: 0.6 }, 7.1);

/* S3 — 7.6 → 10.2 : LOCAGAB centralise tout */
tl.set('#s3', { autoAlpha: 1 }, 7.6)
  .to('#s3 .panneau', { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: E.exp }, 7.6)
  .fromTo('#s3 .centralise .anneau', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, ease: E.out4 }, 8.4)
  .fromTo('#s3 .centralise .ln', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: E.out4 }, 8.5)
  .to('#s2', { autoAlpha: 0, duration: 0.1 }, 8.8)
  .to('#s3 .centralise', { autoAlpha: 0, y: -30, duration: 0.6, ease: E.inout }, 10.0);

/* S4 — 10.2 → 17.4 : l'application */
tl.set('#s4', { autoAlpha: 1 }, 10.2)
  .to('#s3', { autoAlpha: 0, duration: 0.1 }, 10.4)
  .fromTo('#s4 .phone', { y: 1100, rotate: -3 }, { y: 0, rotate: 0, duration: 1.7, ease: E.out4 }, 10.2)
  .fromTo('#s4 .layer--accueil .app > *', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: E.out }, 10.4)
  .set('#s4 .layer--fiche', { autoAlpha: 0 }, 10.2)
  .fromTo('#s4 .c1', { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.8 }, 11.6)
  .fromTo('#s4 .c1 .trait', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: E.inout }, 11.7)
  .fromTo('#s4 .c2', { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, duration: 0.8 }, 12.5)
  .fromTo('#s4 .c2 .trait', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: E.inout }, 12.6)
  .fromTo('#s4 .c3', { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.8 }, 13.4)
  .fromTo('#s4 .c3 .trait', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: E.inout }, 13.5)
  .to('#s4 .phone', { y: -14, duration: 6, ease: 'sine.inOut' }, 11.9)
  /* passage à la fiche : les rangées se posent une à une */
  .to('#s4 .callout', { autoAlpha: 0, duration: 0.4 }, 14.6)
  .to('#s4 .layer--accueil', { autoAlpha: 0, duration: 0.3 }, 14.8)
  .set('#s4 .layer--fiche', { autoAlpha: 1 }, 14.9)
  .fromTo('#s4 .layer--fiche .fiche-photo', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 14.9)
  .fromTo('#s4 .layer--fiche .fiche-body > *', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, 15.1)
  .fromTo('#s4 .fiche-score b', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: E.inout }, 15.9)
  /* sortie : l'appareil glisse à gauche et se réduit */
  .to('#s4 .phone', { x: -1500, y: 60, rotate: -4, duration: 1.3, ease: E.exp }, 17.0);

/* S5 — 17.4 → 23.4 : le Trust Score s'assemble */
tl.set('#s5', { autoAlpha: 1 }, 17.4)
  .set('#s5 .fond', { autoAlpha: 0 }, 17.4)
  .to('#s4', { autoAlpha: 0, duration: 0.01 }, 23.3)
  .fromTo('#s5 .intro .ln', { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: E.out4, stagger: 0.11 }, 17.6)
  .fromTo('#s5 .intro p', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 18.3)
  .fromTo('#s5 .score', { autoAlpha: 0, y: 60, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: E.out4 }, 17.7)
  .set('#s5 .check', { opacity: 0.35 }, 17.4)
  .set('#s5 .statut', { autoAlpha: 0, x: -10 }, 17.4)
  .set('#s5 .barre b', { scaleX: 0 }, 17.4);
{
  const compteur = { n: 0 };
  const val = document.querySelector('#s5 .val');
  for (let i = 0; i < 5; i++) {
    const at = 18.6 + i * 0.52;
    tl.to('#s5 .check:nth-child(' + (i + 1) + ')', { opacity: 1, duration: 0.35 }, at)
      .to('#s5 .check:nth-child(' + (i + 1) + ') .seal', { backgroundColor: '${GREEN}', duration: 0.3 }, at)
      .to('#s5 .check:nth-child(' + (i + 1) + ') .seal path', { strokeDashoffset: 0, duration: 0.45, ease: E.inout }, at + 0.1)
      .to('#s5 .barre i:nth-child(' + (i + 1) + ') b', { scaleX: 1, duration: 0.5 }, at)
      .to(compteur, { n: 19 * (i + 1), duration: 0.5, onUpdate: () => { val.textContent = Math.round(compteur.n); } }, at);
  }
  tl.to('#s5 .statut', { autoAlpha: 1, x: 0, duration: 0.6 }, 21.4);
}
tl.to('#s5 .intro, #s5 .score', { autoAlpha: 0, y: -24, duration: 0.6, ease: E.inout }, 22.9);

/* S6 — 23.4 → 27.2 : la signature */
tl.set('#s6', { autoAlpha: 1 }, 23.2)
  .to('#s6 .panneau', { clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: E.exp }, 23.2)
  .to('#s5', { autoAlpha: 0, duration: 0.01 }, 24.3)
  .fromTo('#s6 .rings', { scale: 0.86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 3.6, ease: 'sine.out' }, 23.6)
  .fromTo('#s6 .sig .ln', { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: E.out4, stagger: 0.13 }, 23.9)
  .to('#s6 .sig', { autoAlpha: 0, y: -24, duration: 0.5, ease: E.inout }, 26.9);

/* S7 — 27 → 30 : la marque */
tl.set('#s7', { autoAlpha: 1 }, 27.0)
  .to('#s7 .panneau', { clipPath: 'inset(0 0 0 0%)', duration: 1.0, ease: E.exp }, 27.0)
  .to('#s6', { autoAlpha: 0, duration: 0.01 }, 28.1)
  .fromTo('#s7 .rings', { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.6, ease: 'sine.out' }, 27.4)
  .fromTo('#s7 .logo', { autoAlpha: 0, y: 30, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: E.out4 }, 27.6)
  .fromTo('#s7 .store', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, 28.3)
  .fromTo('#s7 .url', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 28.8)
  .fromTo('#s7 .partenaire', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 29.0);
tl.set({}, {}, 30);

window.DUREE = 30;
window.seek = (t) => { tl.pause(); tl.time(Math.min(t, 30), false); };
window.tl = tl;
/* prêt quand polices et images sont chargées */
Promise.all([document.fonts.ready, ...[...document.images].map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {})))]).then(() => { window.seek(0); window.pret = true; });
</script>
</body>
</html>`;

await writeFile(join(ICI, 'scene.html'), html, 'utf8');
console.log('video/scene.html écrit');
