# Mise en ligne sur Render

Le site est un site statique : Render exécute `npm ci && npm run build` puis sert le dossier `dist/` depuis son CDN.
Tout est décrit dans `render.yaml` (Blueprint) : build, dossier publié, réécriture d'adresses, en-têtes de cache et de
sécurité, variables d'environnement.

## 1. Dépôt Git

Le dépôt local est initialisé avec un premier commit. Publier sur GitHub (compte `mihindouange9-wq`) :

```bash
gh repo create locagab --private --source=. --remote=origin --push
```

Ou, si le dépôt distant existe déjà :

```bash
git remote add origin https://github.com/mihindouange9-wq/locagab.git
git push -u origin main
```

## 2. Service Render

1. Tableau de bord Render → **New** → **Blueprint** → choisir le dépôt `locagab`.
2. Render lit `render.yaml` et propose le service `locagab` (site statique, plan gratuit). Valider.
3. Premier déploiement : deux à trois minutes. Le site répond sur `https://locagab.onrender.com`
   (le nom peut varier si `locagab` est déjà pris : adapter `SITE_URL`, voir ci-dessous).

Chaque push sur `main` redéploie automatiquement.

## 3. Adresse publique (`SITE_URL`)

La variable `SITE_URL` (dans `render.yaml`, modifiable aussi dans l'onglet *Environment* du service) alimente la
balise `canonical`, les balises Open Graph (`og:url`, `og:image` en adresse absolue), `robots.txt`, `sitemap.xml`
et les données structurées. Elle doit être l'adresse exacte sous laquelle le site est visité, sans barre oblique
finale.

Quand le domaine définitif est rattaché (**Settings → Custom Domains**, puis enregistrements DNS indiqués par
Render) :

1. mettre `SITE_URL` à jour avec ce domaine, par exemple `https://www.locagab.com` ;
2. redéployer (*Manual Deploy → Deploy latest commit*, ou un push).

## 4. Vérifications après déploiement

- Page d'accueil, menu, ancres et FAQ fonctionnent ; aucune erreur dans la console du navigateur.
- `https://<domaine>/robots.txt` et `https://<domaine>/sitemap.xml` répondent et pointent vers le bon domaine.
- Partage sur WhatsApp, Facebook ou LinkedIn : l'aperçu montre l'image `og-image.png`
  (vérifier avec le [débogueur de partage Facebook](https://developers.facebook.com/tools/debug/)
  ou [opengraph.xyz](https://www.opengraph.xyz/)).
- Données structurées : [validator.schema.org](https://validator.schema.org/) avec l'adresse du site.
- En-têtes : `curl -I https://<domaine>/` doit afficher `content-security-policy`, `x-frame-options: DENY`,
  `strict-transport-security` ; `curl -I https://<domaine>/assets/<fichier>` doit afficher
  `cache-control: public, max-age=31536000, immutable`.
- Lighthouse (Chrome → Outils de développement → Lighthouse) en mobile et ordinateur.

## 5. Contenu à renseigner avant l'annonce publique

Tout se trouve dans `src/content/site.ts` (voir README) :

| Clé | État au déploiement |
|---|---|
| `STORES.appStore`, `STORES.googlePlay` | vides : boutons « Bientôt sur » |
| `SOCIALS[].href` | vides : noms affichés sans lien |
| `LEGAL[].href` | vides : politique de confidentialité, conditions, mentions légales à produire |
| `CONTACT_EMAIL` | vide : « Contact » renvoie au pied de page |

Renseigner une valeur, commiter, pousser : Render redéploie.

## 6. Mises à jour et retour arrière

- **Mettre à jour** : modifier, `npm run build` en local pour vérifier, commiter, pousser.
- **Revenir en arrière** : dans Render, onglet *Events* → *Rollback* sur un déploiement précédent, ou
  `git revert` puis push.
- Le CDN de Render garde `index.html` quelques minutes : un changement peut mettre jusqu'à cinq minutes à apparaître.
  Les fichiers de `assets/` portent une empreinte dans leur nom, ils sont donc toujours à jour.

## Notes techniques

- `package.json` fige `rollup` et `esbuild` par `overrides` à cause de la stratégie de contrôle d'application du poste
  de développement ; sur Render ces versions fonctionnent normalement.
- Node : `22.12.0` (`.node-version` et variable `NODE_VERSION`).
- Aucune dépendance réseau au chargement : polices, images et scripts sont servis par le site lui-même, ce que la
  politique de sécurité du contenu (CSP) impose. Si un service tiers est ajouté un jour (statistiques, formulaire),
  ajouter son domaine à la CSP dans `render.yaml`.
