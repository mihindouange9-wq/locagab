// Ré-encode les photographies des écrans de démonstration à la taille réellement affichée.
// Les écrans d'iPhone font 300 px de large : une photo n'y dépasse jamais 272 px, soit 544 px en écran Retina.
// Le ré-encodage passe par Chrome (canvas → WebP) : aucune bibliothèque d'image native n'est nécessaire.
// node tools/shrink-photos.mjs [largeur=640] [qualité=0.8]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src/assets/photos");
const width = Number(process.argv[2] ?? 640);
const quality = Number(process.argv[3] ?? 0.8);
const names = ["salon", "sejour", "chambre", "cuisine", "studio", "villa", "immeuble"];

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.goto("about:blank");

for (const name of names) {
  const file = path.join(dir, `${name}.webp`);
  const before = fs.statSync(file).size;
  const dataUrl = `data:image/webp;base64,${fs.readFileSync(file).toString("base64")}`;
  const result = await page.evaluate(
    async (href, width, quality) => {
      const img = new Image();
      img.src = href;
      await img.decode();
      const w = Math.min(width, img.naturalWidth);
      const h = Math.round((img.naturalHeight * w) / img.naturalWidth);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      return { data: canvas.toDataURL("image/webp", quality).split(",")[1], w, h, from: img.naturalWidth };
    },
    dataUrl,
    width,
    quality,
  );
  const buf = Buffer.from(result.data, "base64");
  if (buf.length < before) {
    fs.writeFileSync(file, buf);
    console.log(`${name}.webp : ${result.from} → ${result.w}×${result.h} px, ${before} → ${buf.length} octets`);
  } else {
    console.log(`${name}.webp : conservé (${before} octets, déjà plus léger)`);
  }
}
await browser.close();
