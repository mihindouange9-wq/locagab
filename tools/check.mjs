// Contrôles d'interaction : onglets de fonctionnalités, FAQ, menu mobile, score, mouvement réduit.
// node tools/check.mjs [url]
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://127.0.0.1:5180";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
for (let i = 0; i < 3 && !browser; i++) {
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: "new",
    });
  } catch {}
}
const results = [];
const ok = (name, pass, detail = "") => results.push(`${pass ? "OK   " : "ÉCHEC"} ${name}${detail ? " — " + detail : ""}`);

// ── Ordinateur
let page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });
await sleep(2500);

const fontOk = await page.evaluate(() => document.fonts.check('700 40px "Manrope Variable"'));
ok("police Manrope chargée", fontOk);
ok("un seul h1", (await page.$$eval("h1", (n) => n.length)) === 1);
const noAlt = await page.$$eval("img", (imgs) => imgs.filter((i) => !i.hasAttribute("alt")).length);
ok("toutes les images ont un attribut alt", noAlt === 0, `${noAlt} sans alt`);

await page.evaluate(() => document.querySelector("#fonctionnalites").scrollIntoView({ behavior: "instant" }));
await sleep(900);
await page.click("#fonction-carte");
await sleep(900);
const tab = await page.evaluate(() => ({
  selected: document.querySelector("#fonction-carte").getAttribute("aria-selected"),
  visible: [...document.querySelectorAll("#fonction-ecran .phone__layer")].findIndex((l) => l.classList.contains("is-active")),
}));
ok("onglet « Carte interactive » : écran carte affiché", tab.selected === "true" && tab.visible === 1, JSON.stringify(tab));
await page.keyboard.press("ArrowDown");
await sleep(400);
ok("flèche bas : onglet suivant", (await page.$eval("#fonction-verifiees", (b) => b.getAttribute("aria-selected"))) === "true");

await page.evaluate(() => document.querySelector("#securite").scrollIntoView({ behavior: "instant" }));
await sleep(4200);
const score = await page.$eval(".score__number span", (s) => s.textContent);
ok("Trust Score : le compteur termine à 95", score === "95", score);

await page.evaluate(() => document.querySelector("#faq").scrollIntoView({ behavior: "instant" }));
await sleep(900);
const summaries = await page.$$(".faq__item summary");
await summaries[2].click();
await sleep(700);
const open = await page.$$eval(".faq__item", (d) => d.map((x) => x.open));
ok("FAQ : une seule réponse ouverte à la fois", open.filter(Boolean).length === 1 && open[2], JSON.stringify(open));

await page.evaluate(() => window.scrollTo(0, 0));
await sleep(300);
await page.click('.header__nav a[href="#securite"]');
await sleep(1600);
const top = await page.$eval("#securite", (s) => Math.round(s.getBoundingClientRect().top));
ok("navigation : « Sécurité » amène à la section", Math.abs(top - 88) < 40, `haut à ${top} px`);
ok("aucune erreur console (ordinateur)", errors.length === 0, errors.join(" | "));
await page.close();

// ── Mobile
page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: "networkidle0" });
await sleep(2200);
await page.tap(".header__toggle");
await sleep(600);
const menu = await page.evaluate(() => ({
  expanded: document.querySelector(".header__toggle").getAttribute("aria-expanded"),
  links: [...document.querySelectorAll("#menu-mobile a")].filter((a) => a.offsetParent).length,
}));
ok("menu mobile : ouvert, six liens", menu.expanded === "true" && menu.links === 6, JSON.stringify(menu));
await page.screenshot({ path: ".impeccable/review/menu-mobile.png" });
await page.tap('#menu-mobile a[href="#faq"]');
await sleep(1500);
ok("menu mobile : se referme après un choix", (await page.$eval(".header__toggle", (b) => b.getAttribute("aria-expanded"))) === "false");
const small = await page.evaluate(() =>
  [...document.querySelectorAll("a, button, summary")]
    .filter((el) => el.offsetParent && !el.closest(".phone"))
    .map((el) => ({ t: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 28), h: Math.round(el.getBoundingClientRect().height) }))
    .filter((x) => x.h < 40),
);
ok("cibles tactiles d'au moins 40 px", small.length === 0, JSON.stringify(small));
await page.close();

// ── Mouvement réduit : tout le contenu est visible sans animation
page = await browser.newPage();
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });
await sleep(800);
const hidden = await page.evaluate(
  () => [...document.querySelectorAll("[data-reveal], [data-title], h1, .hero__phone")].filter((el) => getComputedStyle(el).opacity === "0" || getComputedStyle(el).visibility === "hidden").length,
);
ok("mouvement réduit : aucun contenu masqué", hidden === 0, `${hidden} éléments masqués`);
await page.close();

await browser.close();
console.log(results.join("\n"));
