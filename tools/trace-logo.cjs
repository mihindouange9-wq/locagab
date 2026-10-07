// Vectorise le logo officiel : symbole (maison + repère) et mot-symbole (LOCA + GAB).
// node trace2.cjs <logo.png> <outDir>
const fs = require("node:fs");
const path = require("node:path");
const { PNG } = require("pngjs");
const potrace = require("potrace");

const [src, outDir] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const png = PNG.sync.read(fs.readFileSync(src));
const { width: W, height: H, data } = png;
const clamp = (v) => Math.max(0, Math.min(1, v));

const luma = new Float32Array(W * H);
const chroma = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) {
  // fond transparent : on compose sur blanc
  const a = data[i * 4 + 3] / 255;
  const r = data[i * 4] * a + 255 * (1 - a), g = data[i * 4 + 1] * a + 255 * (1 - a), b = data[i * 4 + 2] * a + 255 * (1 - a);
  luma[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  chroma[i] = g - r;
}
const ink = (i) => clamp((0.92 - luma[i]) / 0.72); // couverture d'encre, toutes teintes
const SCALE = 4, PAD = 4;

// Bandes horizontales encrées : symbole, mot-symbole, signature
const bands = [];
let start = -1;
for (let y = 0; y < H; y++) {
  let n = 0;
  for (let x = 0; x < W; x++) if (ink(y * W + x) >= 0.5) n++;
  if (n > 2 && start < 0) start = y;
  if ((n <= 2 || y === H - 1) && start >= 0) {
    if (y - start > 12) bands.push([start, y]);
    start = -1;
  }
}
console.log("bandes:", JSON.stringify(bands));

function bboxOf(y0, y1) {
  let minX = W, maxX = 0;
  for (let y = y0; y < y1; y++)
    for (let x = 0; x < W; x++)
      if (ink(y * W + x) >= 0.5) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
  return { x: minX, y: y0, w: maxX - minX + 1, h: y1 - y0 };
}

// Rend un masque agrandi (bilinéaire puis seuil) à partir d'une carte de couverture
// Flou gaussien séparable, limité à la boîte : efface l'escalier des diagonales avant le seuil
function blur(box, src) {
  const k = [0.06, 0.24, 0.4, 0.24, 0.06];
  const tmp = new Float32Array(W * H), out = new Float32Array(W * H);
  const xa = Math.max(2, box.x - 8), xb = Math.min(W - 2, box.x + box.w + 8), ya = Math.max(2, box.y - 8), yb = Math.min(H - 2, box.y + box.h + 8);
  for (let y = ya; y < yb; y++) for (let x = xa; x < xb; x++) { let v = 0; for (let d = -2; d <= 2; d++) v += src[y * W + x + d] * k[d + 2]; tmp[y * W + x] = v; }
  for (let y = ya; y < yb; y++) for (let x = xa; x < xb; x++) { let v = 0; for (let d = -2; d <= 2; d++) v += tmp[(y + d) * W + x] * k[d + 2]; out[y * W + x] = v; }
  return out;
}

function maskPng(box, raw) {
  const cov = blur(box, blur(box, raw));
  const w = (box.w + PAD * 2) * SCALE, h = (box.h + PAD * 2) * SCALE;
  const out = new PNG({ width: w, height: h });
  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : cov[y * W + x]);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const fx = (x + 0.5) / SCALE - 0.5 - PAD + box.x, fy = (y + 0.5) / SCALE - 0.5 - PAD + box.y;
      const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
      const v =
        at(x0, y0) * (1 - tx) * (1 - ty) + at(x0 + 1, y0) * tx * (1 - ty) + at(x0, y0 + 1) * (1 - tx) * ty + at(x0 + 1, y0 + 1) * tx * ty;
      const o = (y * w + x) * 4;
      out.data[o] = out.data[o + 1] = out.data[o + 2] = v >= 0.5 ? 0 : 255;
      out.data[o + 3] = 255;
    }
  return { buf: PNG.sync.write(out), w, h };
}

function trace(buf) {
  return new Promise((res, rej) =>
    potrace.trace(buf, { threshold: 128, turdSize: 300, optTolerance: 1.0, alphaMax: 1.2 }, (e, svg) => {
      if (e) return rej(e);
      const d = [...svg.matchAll(/ d="([^"]+)"/g)]
        .map((m) => m[1])
        .join(" ")
        .replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n))))
        .replace(/,\s*/g, " ")
        .replace(/\s+/g, " ");
      res(d);
    }),
  );
}

(async () => {
  const result = {};

  // ── Symbole : le repère est la composante connexe centrale, le reste est la maison ──
  {
    const [y0, y1] = bands[0];
    const box = bboxOf(y0, y1);
    const label = new Uint8Array(W * H); // 1 = repère
    const cx = Math.round(box.x + box.w / 2);
    let seed = -1;
    for (let y = y1 - 1; y > y0 && seed < 0; y--) if (ink(y * W + cx) >= 0.5) seed = y * W + cx;
    const stack = [seed];
    label[seed] = 1;
    while (stack.length) {
      const i = stack.pop();
      const x = i % W, y = (i - x) / W;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < y0 - 2 || nx >= W || ny >= y1 + 2) continue;
        const j = ny * W + nx;
        if (!label[j] && ink(j) >= 0.22) {
          label[j] = 1;
          stack.push(j);
        }
      }
    }
    const covPin = new Float32Array(W * H), covHouse = new Float32Array(W * H);
    for (let y = y0 - 2; y < y1 + 2; y++)
      for (let x = 0; x < W; x++) {
        const i = y * W + x;
        if (label[i]) covPin[i] = clamp((chroma[i] - 10) / 130);
        else covHouse[i] = ink(i);
      }
    const mh = maskPng(box, covHouse), mp = maskPng(box, covPin);
    result.symbol = { w: mh.w, h: mh.h, dark: await trace(mh.buf), green: await trace(mp.buf) };
  }

  // ── Mot-symbole : LOCA en vert profond, GAB en vert LOCAGAB (séparés par la teinte) ──
  {
    const [y0, y1] = bands[1];
    const box = bboxOf(y0, y1);
    const covDark = new Float32Array(W * H), covGreen = new Float32Array(W * H);
    for (let y = y0 - 2; y < y1 + 2; y++)
      for (let x = 0; x < W; x++) {
        const i = y * W + x;
        covGreen[i] = clamp((chroma[i] - 10) / 130);
        covDark[i] = chroma[i] > 68 ? 0 : ink(i);
      }
    const md = maskPng(box, covDark), mg = maskPng(box, covGreen);
    result.wordmark = { w: md.w, h: md.h, dark: await trace(md.buf), green: await trace(mg.buf) };
  }

  for (const [k, v] of Object.entries(result))
    console.log(k, v.w + "x" + v.h, "dark", v.dark.length, "green", v.green.length, "segments", (v.dark + v.green).match(/[CL]/g).length);
  fs.writeFileSync(path.join(outDir, "trace.json"), JSON.stringify(result));

  let y = 40;
  const parts = [];
  for (const k of ["symbol", "wordmark"]) {
    const p = result[k];
    parts.push(
      `<g transform="translate(${(4000 - p.w) / 2},${y})"><path d="${p.dark}" fill="#073B32" fill-rule="evenodd"/><path d="${p.green}" fill="#18A957" fill-rule="evenodd"/></g>`,
    );
    y += p.h + 80;
  }
  fs.writeFileSync(
    path.join(outDir, "preview.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 ${y}"><rect width="4000" height="${y}" fill="#F7F5EF"/>${parts.join("")}</svg>`,
  );
})();
