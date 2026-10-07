// Assemble des captures en une planche-contact.
// node tools/sheet.mjs <sortie.png> <colonnes> <largeur de vignette> <fichiers…>
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const [out, cols, thumb, ...files] = process.argv.slice(2);
const cells = files
  .map(
    (f) =>
      `<figure style="margin:0"><img src="${pathToFileURL(path.resolve(f))}" style="width:${thumb}px;display:block"><figcaption>${path.basename(f, ".png")}</figcaption></figure>`,
  )
  .join("");
const html = `<body style="margin:0;background:#1c1c1c;color:#ddd;font:12px sans-serif"><div style="display:grid;grid-template-columns:repeat(${cols},${thumb}px);gap:8px;padding:8px;align-items:start">${cells}</div></body>`;

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
await page.setViewport({ width: cols * thumb + (Number(cols) + 1) * 8, height: 600 });
await page.goto(pathToFileURL(path.resolve("tools/sheet.mjs")).href.replace("sheet.mjs", ""), { waitUntil: "load" }).catch(() => {});
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
await page.screenshot({ path: out, fullPage: true });
await browser.close();
