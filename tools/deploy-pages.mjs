// Publie le site sur GitHub Pages : construit dist/ avec le chemin de base /locagab/, puis copie le résultat
// dans la branche gh-pages (arbre de travail .gh-pages/, hors dépôt principal) et la pousse.
// Les réglages Pages du dépôt pointent sur cette branche. Historique linéaire : jamais de poussée forcée.
// node tools/deploy-pages.mjs
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const tree = path.join(root, ".gh-pages");
const BRANCH = "gh-pages";
const BASE_PATH = "/locagab/";
const SITE_URL = "https://mihindouange9-wq.github.io/locagab";

const env = { ...process.env, MSYS_NO_PATHCONV: "1", BASE_PATH, SITE_URL };
const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: "inherit", env });
const out = (cmd, cwd = root) => execSync(cmd, { cwd, encoding: "utf8", env }).trim();

const commit = out("git rev-parse --short HEAD");
console.log(`Construction (${commit}) pour ${SITE_URL}/`);
run("npm run build");
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
fs.writeFileSync(path.join(dist, ".nojekyll"), "");

// Arbre de travail de la branche de publication
if (!fs.existsSync(tree)) {
  const remote = out(`git ls-remote --heads origin ${BRANCH}`);
  if (remote) {
    run(`git fetch -q origin ${BRANCH}`);
    run(`git worktree add -q ${JSON.stringify(tree)} ${BRANCH}`);
  } else {
    run(`git worktree add -q --orphan -b ${BRANCH} ${JSON.stringify(tree)}`);
  }
  run('git config user.name "MÉTHODE AURA"', tree);
  run('git config user.email "mihindouange9@gmail.com"', tree);
}

// Remplacement du contenu publié par le nouveau build
for (const entry of fs.readdirSync(tree)) {
  if (entry !== ".git") fs.rmSync(path.join(tree, entry), { recursive: true, force: true });
}
fs.cpSync(dist, tree, { recursive: true });

run("git add -A", tree);
const changed = out("git status --porcelain", tree);
if (!changed) {
  console.log("Aucun changement à publier.");
} else {
  run(`git commit -q -m "Site construit depuis ${commit}"`, tree);
  run(`git push -q -u origin ${BRANCH}`, tree);
  console.log(`Publié : ${SITE_URL}/ (le CDN de Pages met jusqu'à une minute à se mettre à jour)`);
}
