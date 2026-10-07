/* LOCAGAB — génère public/charte/index.html et public/charte/assets/style.css à partir des sections.
   Lancer : node charte/build.mjs   (depuis le dossier locagab) */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import a from './sections/a-marque-logo.mjs';
import b from './sections/b-couleurs-typo-systeme.mjs';
import c from './sections/c-applications-regles.mjs';

const ICI = dirname(fileURLToPath(import.meta.url));
const SORTIE = join(ICI, '..', 'public', 'charte');
await mkdir(join(SORTIE, 'assets'), { recursive: true });

await writeFile(join(SORTIE, 'assets', 'style.css'), await readFile(join(ICI, 'style.css'), 'utf8'));
await writeFile(join(SORTIE, 'assets', 'lecteur.js'), await readFile(join(ICI, 'lecteur.js'), 'utf8'));

const planches = [...a(), ...b(), ...c()];
const sections = [...new Set(planches.map((p) => /data-section="([^"]+)"/.exec(p)[1]))].filter((s) => /^\d\d/.test(s));
const premiere = (s) => planches.findIndex((q) => /data-section="([^"]+)"/.exec(q)[1] === s);

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LOCAGAB — Charte graphique</title>
<meta name="description" content="Charte graphique de LOCAGAB, l'application immobilière du Gabon : marque, logo, couleurs, typographie, système graphique, photographie et applications.">
<meta name="robots" content="noindex">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
</head>
<body>
<div class="barre-lecteur">
  <strong>LOCAGAB · Charte graphique</strong>
  <nav aria-label="Chapitres">${sections.map((s, i) => `<a href="#s-${i + 1}">${s.replace(/ — /, ' ')}</a>`).join('')}</nav>
  <a class="telecharger" href="LOCAGAB-charte.pdf" download>PDF</a>
</div>
<main class="lecteur">
${planches.map((p, i) => {
  const s = /data-section="([^"]+)"/.exec(p)[1];
  const k = sections.indexOf(s);
  const ancre = k >= 0 && premiere(s) === i ? ` id="s-${k + 1}"` : '';
  return `<div class="planche-cadre"${ancre}>${p.replace('data-num></span>', `data-num>${String(i + 1).padStart(2, '0')} / ${planches.length}</span>`)}</div><div class="planche-espace" aria-hidden="true"></div>`;
}).join('\n')}
</main>
<script src="assets/lecteur.js"></script>
</body>
</html>`;
await writeFile(join(SORTIE, 'index.html'), html);
console.log(`${planches.length} planches → public/charte/index.html`);
