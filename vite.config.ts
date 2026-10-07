import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { FAQ, SITE } from "./src/content/site";

/**
 * Adresse publique du site, sans barre oblique finale.
 * Render la fournit par la variable SITE_URL (voir render.yaml) ; à défaut, l'adresse par défaut du service.
 * Elle sert aux balises absolues (canonical, Open Graph), au plan du site et aux données structurées.
 */
const SITE_URL = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || "https://locagab.onrender.com").replace(
  /\/+$/,
  "",
);

const DESCRIPTION =
  "L'application immobilière pensée pour trouver un logement au Gabon simplement, rapidement et en toute confiance.";

/** Données structurées schema.org : organisation, site, application mobile et questions fréquentes. */
function structuredData() {
  const org = `${SITE_URL}/#organisation`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: SITE.name,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon-512.png`,
        slogan: SITE.signature,
        areaServed: { "@type": "Country", name: "Gabon" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: `${SITE_URL}/`,
        name: SITE.name,
        description: DESCRIPTION,
        inLanguage: "fr",
        publisher: { "@id": org },
      },
      {
        "@type": "MobileApplication",
        name: SITE.name,
        description: DESCRIPTION,
        operatingSystem: "iOS, Android",
        applicationCategory: "LifestyleApplication",
        inLanguage: "fr",
        author: { "@id": org },
        offers: { "@type": "Offer", price: "0", priceCurrency: "XAF" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  // « < » est échappé pour qu'aucun contenu ne puisse fermer la balise script
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Remplit les adresses absolues de index.html et produit robots.txt et sitemap.xml. */
function seo(): Plugin {
  return {
    name: "locagab-seo",
    transformIndexHtml(html) {
      return html
        .split("__SITE_URL__")
        .join(SITE_URL)
        .replace("<!--@jsonld-->", `<script type="application/ld+json">${structuredData()}</script>`);
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          `</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
    },
  };
}

/** Chemin de base : "/" sur un domaine dédié (Render), "/locagab/" sur GitHub Pages. */
const BASE_PATH = process.env.BASE_PATH || "/";

export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), seo()],
  // Aucun fichier incorporé en data: (la politique de sécurité du contenu n autorise que le domaine du site)
  build: { target: "es2022", cssMinify: "esbuild", assetsInlineLimit: 0 },
});
