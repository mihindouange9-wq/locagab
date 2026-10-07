// Produit public/favicon.ico pour les navigateurs qui ignorent le SVG, à partir des icônes PNG existantes.
// Le format ICO accepte des entrées PNG telles quelles : aucune bibliothèque d'image n'est nécessaire.
// node tools/make-ico.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sources = ["public/icon-192.png"].map((p) => path.join(root, p));

const pngSize = (buf) => ({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) });

const entries = sources.map((file) => {
  const data = fs.readFileSync(file);
  if (data.toString("ascii", 1, 4) !== "PNG") throw new Error(`${file} n'est pas un PNG`);
  return { data, ...pngSize(data) };
});

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // réservé
header.writeUInt16LE(1, 2); // type : icône
header.writeUInt16LE(entries.length, 4);

const dirSize = 16 * entries.length;
let offset = 6 + dirSize;
const dir = Buffer.alloc(dirSize);
entries.forEach((e, i) => {
  const o = i * 16;
  dir.writeUInt8(e.w >= 256 ? 0 : e.w, o);
  dir.writeUInt8(e.h >= 256 ? 0 : e.h, o + 1);
  dir.writeUInt8(0, o + 2); // palette
  dir.writeUInt8(0, o + 3); // réservé
  dir.writeUInt16LE(1, o + 4); // plans
  dir.writeUInt16LE(32, o + 6); // bits par pixel
  dir.writeUInt32LE(e.data.length, o + 8);
  dir.writeUInt32LE(offset, o + 12);
  offset += e.data.length;
});

const out = path.join(root, "public/favicon.ico");
fs.writeFileSync(out, Buffer.concat([header, dir, ...entries.map((e) => e.data)]));
console.log(`${path.relative(root, out)} : ${entries.map((e) => `${e.w}×${e.h}`).join(", ")}, ${fs.statSync(out).size} octets`);
