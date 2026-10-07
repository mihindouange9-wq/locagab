/* LOCAGAB — bibliothèque de la charte : couleurs, logos (depuis le tracé officiel), repère, planche, pied de page,
   lockup MÉTHODE AURA, conversions de couleur. Importée par les sections et par build.mjs. */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');

/* ---------- couleurs de la charte ---------- */
export const FOREST = '#073B32';
export const GREEN = '#18A957';
export const IVORY = '#F7F5EF';
export const CHARCOAL = '#17211F';
export const WHITE = '#FFFFFF';
export const SAND = '#EFEBE1';
export const FOREST_DEEP = '#052C26';
export const FOREST_SOFT = '#0F4A40';
export const GREEN_HOVER = '#1DBB62';
export const GREEN_INK = '#0C7F3F';
export const GREEN_DISPLAY = '#12964B';
export const GREEN_LIGHT = '#3FCB7D';
export const ON_GREEN = '#04241E';
export const MUTED = '#55625E';
export const MUTED_ON_FOREST = '#A9C4BC';

export const echapper = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const r = (n) => Math.round(n * 100) / 100;

/* ---------- logo LOCAGAB : tracé officiel (tools/logo-trace.json) ---------- */
const trace = JSON.parse(readFileSync(join(RACINE, 'tools', 'logo-trace.json'), 'utf8'));
const PAD = 16;
const BOX = {
  symbol: { x: PAD, y: PAD, w: trace.symbol.w - PAD * 2, h: trace.symbol.h - PAD * 2 },
  wordmark: { x: PAD, y: PAD, w: trace.wordmark.w - PAD * 2, h: trace.wordmark.h - PAD * 2 },
};
function place(part, x, y, h, encre, accent) {
  const b = BOX[part];
  const s = h / b.h;
  return {
    w: b.w * s,
    g: `<g transform="translate(${r(x - b.x * s)} ${r(y - b.y * s)}) scale(${s.toFixed(5)})"><path fill="${encre}" fill-rule="evenodd" d="${trace[part].dark}"/><path fill="${accent}" fill-rule="evenodd" d="${trace[part].green}"/></g>`,
  };
}
const svg = (w, h, corps, { classe = '', style = '', titre = 'LOCAGAB' } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-label="${titre}"${classe ? ` class="${classe}"` : ''}${style ? ` style="${style}"` : ''}>${corps}</svg>`;

/** Symbole seul : la maison et son repère. Hauteur 100 unités. */
export function symbole({ encre = FOREST, accent = GREEN, hauteur = 100, classe = '', style = '' } = {}) {
  const p = place('symbol', 0, 0, 100, encre, accent);
  return svg(p.w, 100, p.g, { classe, style: style || `height:${hauteur}px`, titre: 'Symbole LOCAGAB' });
}
/** Logo horizontal : symbole (100) + mot-symbole (40) espacés de 24, comme sur le site. */
export function logoHorizontal({ encre = FOREST, accent = GREEN, hauteur = 100, classe = '', style = '' } = {}) {
  const s = place('symbol', 0, 0, 100, encre, accent);
  const w = place('wordmark', s.w + 24, 31, 40, encre, accent);
  return svg(s.w + 24 + w.w, 100, s.g + w.g, { classe, style: style || `height:${hauteur}px` });
}
/** Logo vertical : symbole au-dessus du mot-symbole. */
export function logoVertical({ encre = FOREST, accent = GREEN, hauteur = 154, classe = '', style = '' } = {}) {
  const motH = 34;
  const motW = (BOX.wordmark.w / BOX.wordmark.h) * motH;
  const symW = (BOX.symbol.w / BOX.symbol.h) * 100;
  const s = place('symbol', (motW - symW) / 2, 0, 100, encre, accent);
  const w = place('wordmark', 0, 120, motH, encre, accent);
  return svg(motW, 154, s.g + w.g, { classe, style: style || `height:${hauteur}px` });
}
/** Mot-symbole seul. */
export function motSymbole({ encre = FOREST, accent = GREEN, hauteur = 40, classe = '', style = '' } = {}) {
  const w = place('wordmark', 0, 0, 100, encre, accent);
  return svg(w.w, 100, w.g, { classe, style: style || `height:${hauteur}px`, titre: 'LOCAGAB' });
}
/** Proportions utiles pour les planches de construction. */
export const LOGO = {
  symbole: { w: r((BOX.symbol.w / BOX.symbol.h) * 100), h: 100 },
  mot: { w: r((BOX.wordmark.w / BOX.wordmark.h) * 40), h: 40 },
  ecart: 24,
  motY: 31,
};

/* ---------- le repère : anneau de la charte ---------- */
export function anneau({ taille = 14, couleur = GREEN, epaisseur, vide = false, style = '' } = {}) {
  const e = epaisseur ?? Math.max(2, Math.round(taille * 0.27));
  return `<i class="anneau" style="width:${taille}px;height:${taille}px;border:${e}px solid ${vide ? 'rgba(7,59,50,.28)' : couleur};${style}"></i>`;
}
export function sceau({ taille = 24, fond = GREEN, coche = ON_GREEN } = {}) {
  return `<span class="sceau" style="width:${taille}px;height:${taille}px;background:${fond}"><svg viewBox="0 0 16 16" aria-hidden="true" style="width:${Math.round(taille * 0.6)}px;height:${Math.round(taille * 0.6)}px"><path d="M4 8.4l2.6 2.6L12 5.6" fill="none" stroke="${coche}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
}

/* ---------- pictogrammes Lucide (lus dans node_modules, trait 1,9) ---------- */
export function lucide(nom, { taille = 24, couleur = 'currentColor', trait = 1.9 } = {}) {
  const src = readFileSync(join(RACINE, 'node_modules', 'lucide-react', 'dist', 'esm', 'icons', `${nom}.js`), 'utf8');
  const noeuds = [...src.matchAll(/\["(\w+)",\s*(\{[^}]*\})\]/g)].map((m) => {
    const attrs = [...m[2].matchAll(/(\w+):\s*"([^"]*)"/g)].map((a) => `${a[1]}="${a[2]}"`).join(' ');
    return `<${m[1]} ${attrs}/>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${taille}" height="${taille}" fill="none" stroke="${couleur}" stroke-width="${trait}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${noeuds.join('')}</svg>`;
}

/* ---------- MÉTHODE AURA : lockup horizontal (marque tracée + MÉTHODE en Sora 300, AURA en Sora 800) ----------
   Couleurs autorisées par la charte du studio : Ivoire #F5F2EA ou Obsidienne #0B0B0D. */
const MARQUE_AURA = `<path d="M2964 4857 c-56 -95 -147 -251 -204 -347 -56 -96 -134 -229 -173 -295 -39 -66 -104 -176 -145 -245 -345 -572 -428 -709 -487 -805 -70 -113 -372 -612 -800 -1320 -132 -220 -346 -573 -474 -785 -180 -297 -536 -888 -568 -942 -2 -5 238 -8 534 -7 l538 0 67 102 c293 449 599 924 935 1452 128 201 678 1085 868 1395 76 124 190 308 253 410 64 102 127 205 142 230 15 25 68 112 119 193 80 131 89 151 79 170 -6 12 -56 96 -111 187 -55 91 -121 201 -147 245 -26 44 -91 152 -145 240 -54 88 -115 188 -136 223 -20 35 -39 65 -41 67 -2 2 -49 -73 -104 -168z"/><path d="M5206 4913 c-38 -60 -86 -135 -106 -168 -20 -33 -89 -143 -152 -245 -63 -102 -149 -241 -191 -310 -45 -72 -75 -131 -72 -139 3 -8 95 -164 204 -346 180 -301 334 -560 721 -1210 75 -126 170 -286 210 -355 40 -69 116 -199 170 -290 53 -91 134 -230 180 -310 46 -80 111 -192 145 -250 34 -58 80 -136 102 -175 118 -208 475 -814 531 -902 l64 -103 569 0 c313 0 569 4 569 8 0 10 -107 198 -225 397 -46 77 -154 262 -241 410 -86 149 -193 331 -237 405 -141 240 -211 359 -412 705 -109 187 -219 376 -245 420 -244 418 -508 869 -675 1155 -111 190 -245 419 -297 510 -325 564 -525 900 -537 900 -4 0 -38 -48 -75 -107z"/><path d="M4099 2337 c-36 -56 -100 -154 -141 -217 -41 -63 -121 -187 -178 -275 -56 -88 -123 -190 -147 -228 -74 -115 -76 -94 22 -268 48 -85 109 -190 135 -234 26 -44 82 -143 125 -220 109 -194 245 -436 334 -592 42 -72 84 -145 93 -162 l17 -31 576 0 c316 0 575 3 575 6 0 8 -114 218 -185 339 -29 50 -78 135 -110 190 -160 277 -465 803 -525 905 -37 63 -109 187 -160 275 -52 88 -139 237 -195 330 -56 94 -116 196 -134 228 -18 31 -33 57 -34 57 -1 0 -32 -46 -68 -103z"/>`;
export const AURA_OBSIDIENNE = '#0B0B0D';
export const AURA_IVOIRE = '#F5F2EA';
export function logoAura({ couleur = AURA_OBSIDIENNE, hauteur = 40, style = '' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 300" role="img" aria-label="MÉTHODE AURA" class="logo-aura" style="${style || `height:${hauteur}px`}">
    <g transform="scale(0.6104)"><g transform="translate(-11.314923,502.531334) scale(0.1,-0.1)" fill="${couleur}">${MARQUE_AURA}</g></g>
    <text x="560" y="98" font-family="Sora, Arial, sans-serif" font-weight="300" font-size="72" letter-spacing="14" fill="${couleur}">MÉTHODE</text>
    <text x="552" y="280" font-family="Sora, Arial, sans-serif" font-weight="800" font-size="196" letter-spacing="-2" fill="${couleur}">AURA</text>
  </svg>`;
}

/* ---------- planche 1600 × 1000 ---------- */
export const MARQUE_DOC = 'LOCAGAB · Charte graphique · v1.0 · octobre 2026';

/** Pied de planche : partenariat MÉTHODE AURA sur chaque page. */
export function pied({ sombre = false } = {}) {
  return `<footer class="planche-pied">
    <span class="pied-marque">${MARQUE_DOC}</span>
    <span class="pied-partenaire"><span class="pied-label">En partenariat avec</span>${logoAura({ couleur: sombre ? AURA_IVOIRE : AURA_OBSIDIENNE, hauteur: 26 })}<span class="pied-role">Conception et réalisation</span></span>
    <span class="planche-num" data-num></span>
  </footer>`;
}

/**
 * Planche standard : tête (section), titre, corps, pied.
 * ton : 'ivoire' (défaut), 'blanc', 'sable', 'forest'.
 */
export function planche({ section, titre, sur = '', corps, classe = '', ton = 'ivoire', sansTitre = false }) {
  const sombre = ton === 'forest';
  return `<section class="planche planche--${ton} ${classe}" data-section="${echapper(section)}">
  <header class="planche-tete"><span class="planche-section">${anneau({ taille: 10, couleur: GREEN, epaisseur: 3 })}${echapper(section)}</span></header>
  ${sansTitre ? '' : `<div class="planche-titre">${sur ? `<p class="planche-sur">${sur}</p>` : ''}<h2>${titre}</h2></div>`}
  <div class="planche-corps">${corps}</div>
  ${pied({ sombre })}
</section>`;
}

/* ---------- couleurs : conversions et contraste ---------- */
export const cmyk = (hex) => {
  const v = parseInt(hex.slice(1), 16), R = ((v >> 16) & 255) / 255, G = ((v >> 8) & 255) / 255, B = (v & 255) / 255;
  const k = 1 - Math.max(R, G, B); if (k === 1) return 'C0 M0 J0 N100';
  return `C${Math.round(((1 - R - k) / (1 - k)) * 100)} M${Math.round(((1 - G - k) / (1 - k)) * 100)} J${Math.round(((1 - B - k) / (1 - k)) * 100)} N${Math.round(k * 100)}`;
};
export const rgb = (hex) => { const v = parseInt(hex.slice(1), 16); return `${(v >> 16) & 255} / ${(v >> 8) & 255} / ${v & 255}`; };
const lum = (hex) => { const v = parseInt(hex.slice(1), 16); const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f((v >> 16) & 255) + 0.7152 * f((v >> 8) & 255) + 0.0722 * f(v & 255); };
export const contraste = (a, b) => { const l1 = lum(a), l2 = lum(b); const x = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); return Math.round(x * 10) / 10; };
