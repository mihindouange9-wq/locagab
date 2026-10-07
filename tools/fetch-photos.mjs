// Télécharge les photographies libres de droits et les convertit en WebP (via Chrome, sans dépendance native).
// node tools/fetch-photos.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "src/assets/photos");
fs.mkdirSync(out, { recursive: true });
const UA = { headers: { "User-Agent": "locagab-site-build/1.0" } };

// name, largeur(s) cible(s), source. Les crédits complets sont dans CREDITS.md.
const PHOTOS = [
  { name: "salon", widths: [900], url: "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2ZsMTk2ODk3Mjc5MjItaW1hZ2Uta3liZW5oaDQuanBn.jpg" },
  { name: "sejour", widths: [900], url: "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHUyMzM1NDY2LWltYWdlLWt3dnk3Y2M2LmpwZw.jpg" },
  { name: "chambre", widths: [900], url: "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJob3RlbF9ndWVzdF9yb29tX25ldy1pbWFnZS1reWJkZ20yNC5qcGc.jpg" },
  { name: "cuisine", widths: [900], url: "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2ZsMzczMDYxMzMwNTUtaW1hZ2Uta3liZWp0NDYuanBn.jpg" },
  { name: "studio", widths: [900], url: "https://cdn.stocksnap.io/img-thumbs/960w/YED8JWCWVB.jpg" },
  { name: "villa", widths: [900], url: "https://cdn.stocksnap.io/img-thumbs/960w/Y9D6WGJ7KF.jpg" },
  { name: "immeuble", widths: [900], url: "https://cdn.stocksnap.io/img-thumbs/960w/0IBRE3AARG.jpg" },
  { name: "libreville-front-de-mer", widths: [1920, 960], commons: "File:Libreville frond de mer.jpg" },
  { name: "libreville-bord-de-mer", widths: [1280, 720], commons: "File:Libreville bord de mer.jpg" },
];

async function commonsUrl(title) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|extmetadata&format=json`;
  const j = await (await fetch(api, UA)).json();
  const info = Object.values(j.query.pages)[0].imageinfo[0];
  const m = info.extmetadata;
  console.log("  ", title, "|", m.LicenseShortName?.value, "|", (m.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim(), "|", info.descriptionurl);
  return info.url;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "locagab-photos-"));
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
const page = await browser.newPage();
const blank = path.join(tmp, "blank.html");
fs.writeFileSync(blank, "<!doctype html><title>conversion</title>");
await page.goto(pathToFileURL(blank).href);

for (const p of PHOTOS) {
  const url = p.url ?? (await commonsUrl(p.commons));
  const res = await fetch(url, UA);
  if (!res.ok) {
    console.log("ÉCHEC", p.name, res.status);
    continue;
  }
  const src = path.join(tmp, p.name + ".jpg");
  fs.writeFileSync(src, Buffer.from(await res.arrayBuffer()));
  for (const [i, width] of p.widths.entries()) {
    const b64 = await page.evaluate(
      async (href, width) => {
        const img = new Image();
        img.src = href;
        await img.decode();
        const w = Math.min(width, img.naturalWidth);
        const h = Math.round((img.naturalHeight * w) / img.naturalWidth);
        const c = new OffscreenCanvas(w, h);
        const ctx = c.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);
        const blob = await c.convertToBlob({ type: "image/webp", quality: 0.76 });
        const buf = new Uint8Array(await blob.arrayBuffer());
        let s = "";
        for (let k = 0; k < buf.length; k += 0x8000) s += String.fromCharCode(...buf.subarray(k, k + 0x8000));
        return btoa(s) + "|" + w + "x" + h;
      },
      pathToFileURL(src).href,
      width,
    );
    const [data, dims] = b64.split("|");
    const file = `${p.name}${i === 0 ? "" : "-" + width}.webp`;
    fs.writeFileSync(path.join(out, file), Buffer.from(data, "base64"));
    console.log(file, dims, Math.round(fs.statSync(path.join(out, file)).size / 1024) + " Ko");
  }
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
