// Génère les déclinaisons du logo à partir du tracé vectoriel (tools/logo-trace.json) :
// SVG clairs et sombres, symbole seul, favicon, icône d'application, PNG, image de partage.
// node tools/build-brand.mjs        (les PNG demandent Chrome ; ajouter --no-png pour s'en passer)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trace = JSON.parse(fs.readFileSync(path.join(root, "tools/logo-trace.json"), "utf8"));
const out = path.join(root, "public/brand");
fs.mkdirSync(out, { recursive: true });

const FOREST = "#073B32", GREEN = "#18A957", IVORY = "#F7F5EF";
const PAD = 16; // marge du tracé, en unités

// Boîtes utiles (sans la marge du tracé)
const sym = { x: PAD, y: PAD, w: trace.symbol.w - PAD * 2, h: trace.symbol.h - PAD * 2 };
const wm = { x: PAD, y: PAD, w: trace.wordmark.w - PAD * 2, h: trace.wordmark.h - PAD * 2 };

const paths = (part, main, accent) =>
  `<path fill="${main}" fill-rule="evenodd" d="${trace[part].dark}"/><path fill="${accent}" fill-rule="evenodd" d="${trace[part].green}"/>`;

// Place une partie dans une boîte (x, y, hauteur), renvoie le groupe et sa largeur
function place(part, box, x, y, h, main, accent) {
  const s = h / box.h;
  return {
    w: box.w * s,
    g: `<g transform="translate(${r(x - box.x * s)} ${r(y - box.y * s)}) scale(${s.toFixed(5)})">${paths(part, main, accent)}</g>`,
  };
}
const r = (n) => Math.round(n * 100) / 100;
const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

function symbolSvg(main, accent) {
  const p = place("symbol", sym, 0, 0, 100, main, accent);
  return svg(p.w, 100, p.g, "LOCAGAB");
}
function horizontalSvg(main, accent) {
  const s = place("symbol", sym, 0, 0, 100, main, accent);
  const w = place("wordmark", wm, s.w + 24, 31, 40, main, accent);
  return svg(s.w + 24 + w.w, 100, s.g + w.g, "LOCAGAB");
}
function verticalSvg(main, accent) {
  const wHeight = 34;
  const wWidth = (wm.w / wm.h) * wHeight;
  const sWidth = (sym.w / sym.h) * 100;
  const s = place("symbol", sym, (wWidth - sWidth) / 2, 0, 100, main, accent);
  const w = place("wordmark", wm, 0, 120, wHeight, main, accent);
  return svg(wWidth, 120 + wHeight, s.g + w.g, "LOCAGAB");
}
function wordmarkSvg(main, accent) {
  const w = place("wordmark", wm, 0, 0, 40, main, accent);
  return svg(w.w, 40, w.g, "LOCAGAB");
}
// Icône d'application : symbole ivoire et repère vert sur vert profond
function iconSvg(size, radius) {
  const h = size * 0.56;
  const w = (sym.w / sym.h) * h;
  const p = place("symbol", sym, (size - w) / 2, (size - h) / 2 - size * 0.01, h, IVORY, GREEN);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${FOREST}"/>${p.g}</svg>\n`;
}

const files = {
  "locagab-symbole.svg": symbolSvg(FOREST, GREEN),
  "locagab-symbole-sombre.svg": symbolSvg(IVORY, GREEN),
  "locagab-logo-horizontal.svg": horizontalSvg(FOREST, GREEN),
  "locagab-logo-horizontal-sombre.svg": horizontalSvg(IVORY, GREEN),
  "locagab-logo-vertical.svg": verticalSvg(FOREST, GREEN),
  "locagab-logo-vertical-sombre.svg": verticalSvg(IVORY, GREEN),
  "locagab-mot-symbole.svg": wordmarkSvg(FOREST, GREEN),
  "locagab-mot-symbole-sombre.svg": wordmarkSvg(IVORY, GREEN),
  "locagab-icone-application.svg": iconSvg(1024, 0),
};
for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(out, name), content);
fs.writeFileSync(path.join(root, "public/favicon.svg"), iconSvg(64, 14));

// Tracés pour le composant React <Logo />
fs.mkdirSync(path.join(root, "src/brand"), { recursive: true });
fs.writeFileSync(
  path.join(root, "src/brand/logoPaths.ts"),
  `// Généré par tools/build-brand.mjs à partir du logo officiel. Ne pas modifier à la main.
export const SYMBOL = {
  box: [${sym.x}, ${sym.y}, ${sym.w}, ${sym.h}] as const,
  house: "${trace.symbol.dark}",
  pin: "${trace.symbol.green}",
};
export const WORDMARK = {
  box: [${wm.x}, ${wm.y}, ${wm.w}, ${wm.h}] as const,
  loca: "${trace.wordmark.dark}",
  gab: "${trace.wordmark.green}",
};
`,
);
console.log("SVG :", Object.keys(files).length + 1, "fichiers");

if (!process.argv.includes("--no-png")) {
  const { default: puppeteer } = await import("puppeteer-core");
  let browser;
  for (let i = 0; i < 3 && !browser; i++) {
    try {
      browser = await puppeteer.launch({
        executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless: "new",
        args: ["--allow-file-access-from-files"],
      });
    } catch {}
  }
  if (!browser) throw new Error("Chrome introuvable : relancer avec --no-png");
  const page = await browser.newPage();
  const shoot = async (html, w, h, file) => {
    await page.setViewport({ width: w, height: h });
    // fichier temporaire : une page sans origine ne peut pas charger la police locale
    const tmp = path.join(root, "tools/.tmp-brand.html");
    fs.writeFileSync(tmp, "<!doctype html><meta charset=utf-8>" + html);
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(root, file) });
    fs.rmSync(tmp);
    console.log("PNG :", file);
  };
  const full = (inner, bg = FOREST) => `<body style="margin:0;background:${bg}">${inner}</body>`;
  const icon = (size) => iconSvg(size, 0).replace("<svg ", `<svg width="${size}" height="${size}" style="display:block" `);
  await shoot(full(icon(180)), 180, 180, "public/apple-touch-icon.png");
  await shoot(full(icon(192)), 192, 192, "public/icon-192.png");
  await shoot(full(icon(512)), 512, 512, "public/icon-512.png");

  // Image de partage (Open Graph) 1200 × 630
  const font = pathToFileURL(
    path.join(root, "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"),
  ).href;
  const logo = horizontalSvg(IVORY, GREEN).replace("<svg ", `<svg height="92" width="${r((92 * 409) / 100)}" style="display:block;flex:none;align-self:flex-start" `);
  await shoot(
    `<style>@font-face{font-family:Manrope;src:url("${font}");font-weight:200 800}
      body{margin:0;width:1200px;height:630px;background:${FOREST};color:${IVORY};font-family:Manrope,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box}
      h1{margin:0;font-size:92px;line-height:1;letter-spacing:-0.035em;font-weight:700}
      h1 span{color:#3FCB7D}
      p{margin:0;font-size:22px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#A9C4BC}</style>
     ${logo}<div><p>L'application immobilière du Gabon</p><h1 style="margin-top:22px">Trouvez votre logement,<br><span>simplement.</span></h1></div>`,
    1200,
    630,
    "public/og-image.png",
  );
  await browser.close();
}
