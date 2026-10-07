/* Couverture, sommaire, 01 La marque, 02 Le logo. */
import { planche, pied, symbole, logoHorizontal, logoVertical, motSymbole, anneau, LOGO, FOREST, GREEN, IVORY, CHARCOAL, GREEN_LIGHT } from '../lib.mjs';

const S1 = '01 — La marque', S2 = '02 — Le logo';

/* anneaux concentriques (le motif des fonds du site) */
const anneaux = (couleur, n = 5) => `<svg class="anneaux" viewBox="0 0 900 900" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<circle cx="450" cy="450" r="${150 + i * 72}" fill="none" stroke="${couleur}" stroke-width="1"/>`).join('')}</svg>`;
const sansSvg = (s) => s.replace(/^<svg[^>]*>|<\/svg>$/g, '');

export default function () {
  const p = [];

  /* couverture */
  p.push(`<section class="planche planche--forest couverture" data-section="Couverture">
  <header class="planche-tete" style="border-color:var(--line-on-forest-strong)"><span class="planche-section">${anneau({ taille: 10, epaisseur: 3 })}Charte graphique · version 1.0 · octobre 2026</span><span>Libreville, Gabon</span></header>
  <div class="planche-corps">
    <div class="colonne" style="gap:40px">
      ${logoHorizontal({ encre: IVORY, hauteur: 96 })}
      <h1>Trouvez votre logement, <em>simplement.</em></h1>
      <p class="intro" style="color:var(--muted-on-forest);max-width:54ch">Ce document fixe l'identité visuelle de LOCAGAB, l'application immobilière du Gabon : la marque, le logo, les couleurs, la typographie, le système graphique, la photographie et leurs applications. Il s'adresse à toute personne qui produit un support LOCAGAB.</p>
    </div>
    <div></div>
    ${anneaux('rgba(247,245,239,0.16)', 6)}
  </div>
  ${pied({ sombre: true })}
</section>`);

  /* sommaire */
  p.push(planche({ section: 'Sommaire', titre: 'Neuf chapitres, une seule grammaire : celle de la preuve.', sur: 'Ce que contient cette charte', corps: `
    <ol class="sommaire">
      <li><b>01</b> La marque <small>mission, signature, valeurs, personnalité, ton de voix</small></li>
      <li><b>02</b> Le logo <small>construction, déclinaisons, versions couleur, protection, tailles, interdits</small></li>
      <li><b>03</b> Les couleurs <small>palette principale, nuances dérivées, proportions, contrastes autorisés</small></li>
      <li><b>04</b> La typographie <small>Manrope, graisses, hiérarchie, règles de composition</small></li>
      <li><b>05</b> Le système graphique <small>le repère, les filets, les formes, les tons, les pictogrammes, le mouvement</small></li>
      <li><b>06</b> La photographie <small>direction, sujets, lumière, traitement, crédits</small></li>
      <li><b>07</b> Les applications <small>site, icône et écran d'ouverture, boutons, réseaux sociaux, papeterie</small></li>
      <li><b>08</b> Faire / Ne pas faire <small>les règles qui protègent la marque au quotidien</small></li>
      <li><b>09</b> Fichiers et contacts <small>livrables, formats, où trouver quoi</small></li>
    </ol>` }));

  /* 01 — mission et signature */
  p.push(planche({ section: S1, titre: 'Une nouvelle façon de trouver son logement au Gabon.', sur: 'Mission', corps: `
    <div class="grille-2">
      <div class="colonne" style="gap:26px">
        <p class="intro">LOCAGAB est une <strong>application mobile</strong> qui aide les habitants du Gabon à trouver, comparer et contacter des propriétaires et des agences <strong>en toute confiance</strong>. Aujourd'hui, la recherche est dispersée entre WhatsApp, Facebook, le bouche-à-oreille et les agences ; on ne sait ni si l'annonce est réelle, ni si le logement est encore libre.</p>
        <p class="intro">La marque répond par une idée simple : <strong>chaque annonce devient un dossier vérifié</strong>. Identité, téléphone, localisation, logement, disponibilité : ce qui a été contrôlé est montré, point par point, et résumé par le LOCAGAB Trust Score.</p>
        <ul class="liste-filets liste-filets--simple" style="margin-top:8px">
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Marché</b>Gabon, de Libreville (Akanda, Owendo) à l'ensemble du territoire. Langue : français. Monnaie : franc CFA.</li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Publics</b>Les personnes qui cherchent un logement ; les propriétaires et agences qui en proposent un.</li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Promesse</b>Comprendre en cinq secondes qu'il s'agit d'une application pour se loger au Gabon, lui faire confiance, la télécharger.</li>
        </ul>
      </div>
      <div class="surface surface--forest" style="justify-content:space-between;padding:48px">
        <span class="etiquette" style="color:var(--muted-on-forest)">${anneau({ taille: 10, epaisseur: 3 })}Signature</span>
        <p class="enorme" style="color:var(--ivory);font-size:84px">Trouvez votre logement, <span style="color:${GREEN_LIGHT}">simplement.</span></p>
        <p class="note" style="color:var(--muted-on-forest)">La signature accompagne le logo sur les supports de présentation. Elle se compose en Manrope 700, serrée, avec le dernier mot en vert clair sur fond sombre ou en vert d'affichage sur fond clair. Elle ne se traduit pas et ne se raccourcit pas.</p>
      </div>
    </div>` }));

  /* 01 — valeurs et personnalité */
  p.push(planche({ section: S1, titre: 'Trois valeurs, une personnalité.', sur: 'Valeurs', ton: 'blanc', corps: `
    <div class="grille-3-2">
      <div class="colonne" style="gap:0">
        ${[['Confiance', 'Des informations plus claires et des profils mieux identifiés. La marque montre ce qui a été vérifié, elle ne promet pas plus.'], ['Simplicité', 'Une expérience pensée pour aller rapidement à l\'essentiel : une idée par écran, une action par section, pas de bruit.'], ['Proximité', 'Des logements et des opportunités proches de la réalité des gens : Libreville, Akanda, Owendo, les quartiers, les prix en FCFA.']].map(([m, t], i) => `
        <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:30px;align-items:center;padding:26px 0;border-top:1px solid ${i ? 'var(--line)' : 'var(--forest)'}">
          <p class="enorme" style="font-size:76px">${m}</p>
          <p style="font-size:17px;line-height:1.5;display:flex;gap:14px"><span style="padding-top:7px">${anneau({ taille: 12, epaisseur: 3 })}</span><span>${t}</span></p>
        </div>`).join('')}
      </div>
      <div class="colonne">
        <div class="surface surface--ivoire surface--contour" style="height:100%;justify-content:space-between">
          <div>
            <span class="etiquette">${anneau({ taille: 10, epaisseur: 3 })}Personnalité</span>
            <h3 style="font-size:30px;margin-top:14px">Sérieuse sans être froide. Précise sans être technique.</h3>
          </div>
          <ul class="liste-filets liste-filets--simple">
            <li>Elle parle comme un conseiller de confiance : calme, direct, concret.</li>
            <li>Elle préfère montrer que dire : un statut, une référence, une date, un filet.</li>
            <li>Elle est gabonaise par le contexte, jamais par le cliché : pas de drapeau, pas de folklore, des lieux réels.</li>
            <li>Elle refuse le look interchangeable des applications : pas de cartes flottantes, pas d'icônes géantes, pas de dégradés.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 01 — ton de voix */
  p.push(planche({ section: S1, titre: 'Le ton : vouvoyer, dire peu, dire juste.', sur: 'Ton de voix', corps: `
    <div class="grille-2">
      <div class="colonne">
        <p class="intro">LOCAGAB vouvoie, écrit des phrases courtes et nomme les choses par leur nom. Un chiffre vaut mieux qu'un adjectif ; un statut vérifié vaut mieux qu'une promesse. Aucun point d'exclamation, aucun émoji, aucun texte de remplissage.</p>
        <ul class="liste-filets liste-filets--large" style="margin-top:10px">
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Registre</b><span>Vouvoiement, présent de l'indicatif, verbes d'action en tête des boutons : « Télécharger l'application », « Demander une visite », « Publier un logement ».</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Preuve avant promesse</b><span>On écrit « Identité vérifiée », « Disponible maintenant », « vérifiée le 3 oct. », jamais « 100 % fiable » ni « le meilleur ».</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Étiquettes</b><span>Capitales espacées réservées aux statuts et métadonnées : ANNONCE VÉRIFIÉE, CARTE INTERACTIVE. Jamais pour un titre.</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Chiffres</b><span>Prix en FCFA avec espace fine : 450 000 FCFA / mois. Surfaces en m². Dates abrégées en français.</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Typographie du texte</b><span>Guillemets français « », apostrophe typographique, espace insécable avant : ; ? ! et dans les nombres.</span></li>
        </ul>
      </div>
      <div class="colonne">
        <div class="surface surface--blanc surface--contour">
          <span class="etiquette" style="color:var(--green-ink)">${anneau({ taille: 10, epaisseur: 3 })}On écrit</span>
          <p class="grand" style="font-size:28px">« Chaque fiche indique sa disponibilité. Les logements disponibles sont signalés clairement. »</p>
          <p class="grand" style="font-size:28px">« Demandez une visite directement depuis l'application. »</p>
        </div>
        <div class="surface surface--sable">
          <span class="etiquette">${anneau({ taille: 10, vide: true, epaisseur: 3 })}On n'écrit pas</span>
          <p class="grand" style="font-size:28px;color:var(--muted)">« Le logement de vos rêves vous attend !!! »</p>
          <p class="grand" style="font-size:28px;color:var(--muted)">« La plateforme n°1 de l'immobilier au Gabon. »</p>
          <p class="note">Superlatifs, promesses invérifiables, exclamations et émojis sont exclus. Le mot « plateforme » aussi : LOCAGAB est une application.</p>
        </div>
      </div>
    </div>` }));

  /* 02 — le logo et sa construction */
  const sym = LOGO.symbole, mot = LOGO.mot;
  const totalW = sym.w + LOGO.ecart + mot.w;
  p.push(planche({ section: S2, titre: 'Une maison, un repère : le logo dit où l\'on habite.', sur: 'Le logo principal', ton: 'blanc', corps: `
    <div class="grille-3-2">
      <div class="colonne" style="justify-content:space-between">
        <figure class="vitrine vitrine--ivoire" style="height:430px">${logoHorizontal({ hauteur: 190 })}</figure>
        <div class="construction" style="height:230px;display:grid;place-items:center">
          <svg viewBox="-60 -50 ${totalW + 130} 210" style="height:230px" aria-label="Construction du logo">
            ${sansSvg(logoHorizontal({ hauteur: 100 }))}
            <g stroke="${GREEN}" stroke-width="1" fill="none" stroke-dasharray="4 4">
              <rect x="0" y="0" width="${sym.w}" height="100"/>
              <rect x="${sym.w + LOGO.ecart}" y="${LOGO.motY}" width="${mot.w}" height="${mot.h}"/>
              <line x1="0" y1="120" x2="${sym.w}" y2="120"/><line x1="${sym.w + LOGO.ecart}" y1="120" x2="${totalW}" y2="120"/>
              <line x1="${sym.w}" y1="-20" x2="${sym.w + LOGO.ecart}" y2="-20"/>
              <line x1="-20" y1="0" x2="-20" y2="100"/><line x1="${totalW + 12}" y1="${LOGO.motY}" x2="${totalW + 12}" y2="${LOGO.motY + mot.h}"/>
            </g>
            <g fill="${GREEN}" font-family="Manrope, sans-serif" font-weight="700" font-size="11" letter-spacing="0.5">
              <text x="${sym.w / 2}" y="136" text-anchor="middle">1 H</text>
              <text x="${sym.w + LOGO.ecart + mot.w / 2}" y="136" text-anchor="middle">${(mot.w / 100).toFixed(2).replace('.', ',')} H</text>
              <text x="${sym.w + LOGO.ecart / 2}" y="-28" text-anchor="middle">0,24 H</text>
              <text x="-30" y="54" text-anchor="end">H</text>
              <text x="${totalW + 20}" y="${LOGO.motY + mot.h / 2 + 4}">0,40 H</text>
            </g>
          </svg>
        </div>
      </div>
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:18px">Le logo associe un <strong>symbole</strong>, la maison traversée d'un repère de localisation, et un <strong>mot-symbole</strong>, LOCAGAB, dont la syllabe GAB prend le vert LOCAGAB. Le repère reprend la forme de l'épingle de carte : il dit « ici », et son œil rond devient le signe graphique de toute la marque.</p>
        <ul class="liste-filets liste-filets--simple">
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Unité de construction</b><span>H, la hauteur du symbole. Le mot-symbole mesure 0,40 H de haut, posé à 0,31 H du sommet ; l'espace entre les deux vaut 0,24 H.</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Deux encres, jamais plus</b><span>Vert profond pour la maison et LOCA, vert LOCAGAB pour le repère et GAB. Sur fond sombre, le vert profond devient ivoire ; le vert LOCAGAB ne change pas.</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Fichier de référence</b><span>Le logo est vectoriel (SVG) : il est net à toutes les tailles. Les proportions sont figées dans le fichier et ne se recomposent pas à la main.</span></li>
        </ul>
      </div>
    </div>` }));

  /* 02 — déclinaisons */
  p.push(planche({ section: S2, titre: 'Quatre déclinaisons, une seule marque.', sur: 'Déclinaisons', corps: `
    <div class="grille-4">
      <figure class="colonne"><div class="vitrine vitrine--blanc" style="height:520px">${logoHorizontal({ hauteur: 72 })}</div><figcaption><b>Horizontal</b> · version principale. En-tête du site, documents, signatures, partenariats.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--blanc" style="height:520px">${logoVertical({ hauteur: 240 })}</div><figcaption><b>Vertical</b> · formats carrés ou étroits : réseaux sociaux, affiches, écran d'ouverture.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--blanc" style="height:520px">${symbole({ hauteur: 220 })}</div><figcaption><b>Symbole</b> · seul quand le nom est déjà présent : icône d'application, favicon, avatar, repère de carte.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--blanc" style="height:520px">${motSymbole({ hauteur: 52 })}</div><figcaption><b>Mot-symbole</b> · usage rare, dans la barre d'un écran d'application ou en pied d'un document où le symbole figure déjà.</figcaption></figure>
    </div>` }));

  /* 02 — versions couleur */
  p.push(planche({ section: S2, titre: 'Sur fond clair, vert profond. Sur fond sombre, ivoire. Le repère reste vert.', sur: 'Versions couleur', ton: 'blanc', corps: `
    <div class="grille-4">
      <figure class="colonne"><div class="vitrine vitrine--ivoire" style="height:290px">${logoHorizontal({ hauteur: 64 })}</div><figcaption><b>Sur ivoire</b> · la version de référence du site et des documents.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--forest" style="height:290px">${logoHorizontal({ encre: IVORY, hauteur: 64 })}</div><figcaption><b>Sur vert profond</b> · ivoire + vert LOCAGAB. Pied de page, écran d'ouverture, cartes de visite.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--blanc" style="height:290px">${logoHorizontal({ hauteur: 64 })}</div><figcaption><b>Sur blanc</b> · même version que sur ivoire ; surfaces de l'application et documents imprimés.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--photo" style="height:290px">${logoHorizontal({ encre: IVORY, hauteur: 64 })}</div><figcaption><b>Sur photographie</b> · toujours la version ivoire, sur une zone calme assombrie d'un voile vert profond à 55 %.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--ivoire" style="height:210px">${logoHorizontal({ accent: FOREST, hauteur: 56 })}</div><figcaption><b>Monochrome vert profond</b> · gravure, tampon, broderie, impression une couleur.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--forest" style="height:210px">${logoHorizontal({ encre: IVORY, accent: IVORY, hauteur: 56 })}</div><figcaption><b>Monochrome ivoire</b> · même usage, sur fond sombre.</figcaption></figure>
      <figure class="colonne"><div class="vitrine vitrine--blanc" style="height:210px">${logoHorizontal({ encre: CHARCOAL, accent: CHARCOAL, hauteur: 56 })}</div><figcaption><b>Noir</b> · documents administratifs, télécopie, photocopie.</figcaption></figure>
      <figure class="colonne"><div class="vitrine" style="height:210px;background:${GREEN}">${logoHorizontal({ encre: '#04241E', accent: '#04241E', hauteur: 56 })}</div><figcaption><b>Sur vert LOCAGAB</b> · exception rare, encre sur vert uniquement ; jamais la bichromie sur ce fond.</figcaption></figure>
    </div>` }));

  /* 02 — zone de protection et tailles */
  p.push(planche({ section: S2, titre: 'De l\'air autour du logo, et jamais plus petit que lisible.', sur: 'Protection et tailles minimales', corps: `
    <div class="grille-3-2">
      <div class="colonne">
        <div class="vitrine vitrine--blanc" style="height:100%">
          <svg viewBox="-110 -110 ${totalW + 220} 320" style="height:420px" aria-label="Zone de protection">
            <rect x="-100" y="-100" width="${totalW + 200}" height="300" fill="none" stroke="${GREEN}" stroke-width="1" stroke-dasharray="6 6"/>
            <g opacity="0.12" fill="${GREEN}"><rect x="-100" y="-100" width="100" height="100"/><rect x="${totalW}" y="100" width="100" height="100"/></g>
            ${sansSvg(logoHorizontal({ hauteur: 100 }))}
            <g fill="${GREEN}" font-family="Manrope, sans-serif" font-weight="700" font-size="12" letter-spacing="0.5">
              <text x="-50" y="-44" text-anchor="middle">H</text><text x="${totalW + 50}" y="156" text-anchor="middle">H</text>
            </g>
          </svg>
        </div>
      </div>
      <div class="colonne" style="gap:20px">
        <p class="intro" style="font-size:18px">La <strong>zone de protection</strong> mesure H, la hauteur du symbole, de chaque côté. Aucun texte, aucune image, aucun bord de page n'y entre. Elle s'applique à toutes les déclinaisons, dans toutes les couleurs.</p>
        <ul class="liste-filets liste-filets--large">
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Écran, horizontal</b><span>24 px de haut au minimum (hauteur du symbole). En dessous, utiliser le symbole seul, 16 px au minimum.</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Écran, vertical</b><span>64 px de haut au minimum, pour que le mot-symbole reste lisible sous le symbole.</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Impression</b><span>Horizontal : 8 mm de haut au minimum. Symbole seul : 5 mm. Toujours à partir du fichier vectoriel.</span></li>
          <li><b>${anneau({ taille: 10, epaisseur: 3 })}Icône d'application</b><span>Le symbole en ivoire et vert LOCAGAB sur un carré vert profond aux coins arrondis à 22 %. Jamais le logo horizontal dans l'icône.</span></li>
        </ul>
        <div style="display:flex;gap:28px;align-items:flex-end;padding-top:6px">
          <div style="display:grid;gap:8px;justify-items:center">${logoHorizontal({ hauteur: 24 })}<span class="note tabulaire">24 px</span></div>
          <div style="display:grid;gap:8px;justify-items:center">${symbole({ hauteur: 16 })}<span class="note tabulaire">16 px</span></div>
          <div style="display:grid;gap:8px;justify-items:center">${logoVertical({ hauteur: 64 })}<span class="note tabulaire">64 px</span></div>
        </div>
      </div>
    </div>` }));

  /* 02 — interdits */
  const logoNu = logoHorizontal({ hauteur: 44 });
  const interdit = (titre, texte, style, fond = '') => `<div class="interdit"><div class="cadre" style="${fond}"><div style="${style}">${logoNu}</div></div><p><b>${titre}</b> ${texte}</p></div>`;
  p.push(planche({ section: S2, titre: 'Ce que l\'on ne fait jamais au logo.', sur: 'Interdits', ton: 'sable', corps: `
    <div class="interdits">
      ${interdit('Déformer.', 'Ni étirement, ni compression : le fichier vectoriel garde ses proportions.', 'transform:scaleX(1.45)')}
      ${interdit('Recolorer.', 'Aucune autre couleur que celles de la planche précédente, même celles de la palette.', 'filter:hue-rotate(160deg) saturate(1.6)')}
      ${interdit('Incliner.', 'Le logo est toujours horizontal. Pas de rotation, pas de perspective.', 'transform:rotate(-12deg)')}
      ${interdit('Ombrer ou détourer.', 'Pas d\'ombre portée, pas de contour, pas de relief, pas de lueur.', 'filter:drop-shadow(0 10px 10px rgba(0,0,0,.45))')}
      ${interdit('Dégrader.', 'Aucun dégradé dans le logo, aucun dégradé derrière lui.', 'opacity:.9', 'background:linear-gradient(135deg,#18A957,#073B32)')}
      ${interdit('Recomposer.', 'Ne pas changer la place ni la taille du symbole par rapport au mot-symbole.', 'transform:scale(.8) skewX(-8deg)')}
      ${interdit('Poser sur une image chargée.', 'Jamais sur une zone de photographie dense ou claire sans voile vert profond.', '', 'background:url(assets/photos/salon.webp) center/cover')}
      ${interdit('Bichromie sur vert.', 'Sur un fond vert LOCAGAB, seule la version encre sur vert est permise.', '', `background:${GREEN}`)}
    </div>` }));

  return p;
}
