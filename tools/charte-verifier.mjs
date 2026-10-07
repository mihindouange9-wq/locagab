// Vérification de la charte dans Chrome sans interface : polices, console, débordement de chaque planche,
// textes trop petits ; capture de chaque planche dans tools/charte-captures/.
// node tools/charte-verifier.mjs [--sans-captures]
import { spawn } from "node:child_process";
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { setTimeout as attendre } from "node:timers/promises";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const captures = !process.argv.includes("--sans-captures");
const chromes = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", process.env.CHROME].filter(Boolean);
let CHROME = null;
for (const c of chromes) { try { await access(c); CHROME = c; break; } catch { /* suivant */ } }
if (!CHROME) { console.error("Chrome introuvable"); process.exit(1); }
const port = 9800 + Math.floor(Math.random() * 100);
const chrome = spawn(CHROME, ["--headless=new", "--hide-scrollbars", "--no-first-run", "--disable-extensions", `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/chrome-lg-${port}`, "--window-size=1700,1100", "about:blank"], { stdio: "ignore" });
let cible = null;
for (let i = 0; i < 60 && !cible; i++) { await attendre(250); try { cible = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch { /* attente */ } }
const ws = new WebSocket(cible.webSocketDebuggerUrl);
await new Promise((ok) => { ws.onopen = ok; });
let n = 0; const attentes = new Map(); const journal = [];
ws.onmessage = (m) => {
  const t = JSON.parse(m.data);
  if (t.id && attentes.has(t.id)) { attentes.get(t.id)(t); attentes.delete(t.id); return; }
  if (t.method === "Runtime.exceptionThrown") journal.push("exception : " + (t.params.exceptionDetails?.exception?.description || "").split("\n")[0]);
  if (t.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(t.params.type)) journal.push(t.params.type + " : " + t.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 200));
  if (t.method === "Network.loadingFailed") journal.push("chargement échoué : " + t.params.errorText);
};
const envoyer = (method, params = {}) => new Promise((ok) => { const id = ++n; attentes.set(id, ok); ws.send(JSON.stringify({ id, method, params })); });
const evaluer = async (e) => { const r = await envoyer("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true }); return r.result?.exceptionDetails ? "ERREUR " + r.result.exceptionDetails.exception?.description : r.result?.result?.value; };
await envoyer("Page.enable"); await envoyer("Runtime.enable"); await envoyer("Network.enable");
await envoyer("Emulation.setDeviceMetricsOverride", { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
await envoyer("Page.navigate", { url: pathToFileURL(join(RACINE, "public", "charte", "index.html")).href });
await attendre(1500);
await evaluer("document.fonts.ready");
const polices = await evaluer(`[document.fonts.check('700 20px Manrope'), document.fonts.check('800 20px Sora')]`);
let anomalies = 0;
if (!(polices[0] && polices[1])) { anomalies += 1; console.log("✗ polices non chargées :", JSON.stringify(polices)); } else console.log("✓ polices Manrope et Sora chargées");
await evaluer(`document.querySelector('.barre-lecteur').style.display = 'none'; document.documentElement.style.setProperty('--echelle', 1); document.querySelectorAll('.planche-cadre').forEach((c) => { c.style.marginBottom = '0'; })`);
const nb = await evaluer("document.querySelectorAll('.planche').length");
console.log(`${nb} planches`);
if (captures) await mkdir(join(RACINE, "tools", "charte-captures"), { recursive: true });
for (let i = 0; i < nb; i++) {
  const mesure = await evaluer(`(() => {
    const p = document.querySelectorAll('.planche')[${i}];
    p.scrollIntoView({ block: 'start', behavior: 'instant' });
    const r = p.getBoundingClientRect();
    const deb = [...p.querySelectorAll('*')].filter((el) => { const b = el.getBoundingClientRect(); if (b.width === 0 || b.height === 0) return false; if (el.closest('.anneaux, .vitrine, .interdit .cadre, .navigateur, .mobile, .photos figure, .story, .post')) return false; return b.right > r.right + 1 || b.bottom > r.bottom + 1 || b.left < r.left - 1; }).slice(0, 3).map((el) => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ')[0] : ''));
    const corps = p.querySelector('.planche-corps');
    const trop = corps ? Math.round(corps.scrollHeight - corps.clientHeight) : 0;
    const petits = [...p.querySelectorAll('p, li, dd, dt, span, small, a, figcaption, b, code')].filter((el) => el.textContent.trim().length > 12 && parseFloat(getComputedStyle(el).fontSize) < 11 && !el.closest('svg')).map((el) => (el.className || el.tagName) + ' ' + getComputedStyle(el).fontSize).slice(0, 3);
    return { titre: (p.querySelector('h2') || p.querySelector('h1') || {}).textContent || p.dataset.section, deb, trop, petits };
  })()`);
  const problemes = [];
  if (mesure.deb.length) problemes.push(`éléments hors planche : ${mesure.deb.join(", ")}`);
  if (mesure.trop > 4) problemes.push(`corps trop haut de ${mesure.trop}px`);
  if (mesure.petits.length) problemes.push(`textes < 11 px : ${mesure.petits.join(", ")}`);
  if (problemes.length) { anomalies += problemes.length; console.log(`✗ ${String(i + 1).padStart(2, "0")} ${mesure.titre.slice(0, 60)} : ${problemes.join(" | ")}`); }
  else console.log(`✓ ${String(i + 1).padStart(2, "0")} ${mesure.titre.slice(0, 70)}`);
  if (captures) {
    await attendre(120);
    const { data } = (await envoyer("Page.captureScreenshot", { format: "png" })).result;
    await writeFile(join(RACINE, "tools", "charte-captures", `planche-${String(i + 1).padStart(2, "0")}.png`), Buffer.from(data, "base64"));
  }
}
if (journal.length) { anomalies += journal.length; console.log("✗ console :", [...new Set(journal)].slice(0, 6).join(" | ")); } else console.log("✓ console propre");
console.log(anomalies ? `${anomalies} anomalie(s)` : "aucune anomalie");
try { ws.close(); } catch { /* fermé */ }
chrome.kill();
process.exit(anomalies ? 1 : 0);
