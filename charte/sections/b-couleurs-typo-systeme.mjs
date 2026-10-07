/* 03 Les couleurs, 04 La typographie, 05 Le système graphique, 06 La photographie. */
import { planche, anneau, sceau, lucide, cmyk, rgb, contraste, FOREST, FOREST_DEEP, FOREST_SOFT, GREEN, GREEN_HOVER, GREEN_INK, GREEN_DISPLAY, GREEN_LIGHT, ON_GREEN, IVORY, SAND, WHITE, CHARCOAL, MUTED, MUTED_ON_FOREST } from '../lib.mjs';

const S3 = '03 — Les couleurs', S4 = '04 — La typographie', S5 = '05 — Le système graphique', S6 = '06 — La photographie';
const a = (opts = {}) => anneau({ taille: 10, epaisseur: 3, ...opts });

export default function () {
  const p = [];

  /* 03 — palette principale */
  const principale = [
    { nom: 'Vert profond', hex: FOREST, fg: IVORY, role: 'L\'encre forte de la marque. Titres, logo sur fond clair, filets de tête, champs de section (confiance, téléchargement, pied de page).' },
    { nom: 'Vert LOCAGAB', hex: GREEN, fg: ON_GREEN, role: 'L\'accent. Bouton principal, anneau du repère, sceau de vérification, GAB du logo. Jamais en aplat de section, jamais sur du texte courant.' },
    { nom: 'Ivoire chaud', hex: IVORY, fg: FOREST, role: 'Le fond du site et des documents. Texte sur vert profond, boutons de store, onglet actif.' },
    { nom: 'Charbon', hex: CHARCOAL, fg: IVORY, role: 'Le texte courant sur fond clair. Un noir réchauffé de vert, jamais un noir pur.' },
  ];
  p.push(planche({ section: S3, titre: 'Deux terres et un seul accent.', sur: 'Palette principale', corps: `
    <div class="pastilles">
      ${principale.map((c) => `<div class="pastille" style="background:${c.hex};color:${c.fg}"><div><span class="etiquette" style="color:${c.fg};opacity:.85">${a({ couleur: c.hex === GREEN ? ON_GREEN : GREEN })}${c.nom}</span><h3 style="color:${c.fg};margin-top:12px">${c.hex}</h3></div><p class="role">${c.role}</p><dl><dt>HEX</dt><dd class="tabulaire">${c.hex}</dd><dt>RVB</dt><dd class="tabulaire">${rgb(c.hex)}</dd><dt>CMJN</dt><dd class="tabulaire">${cmyk(c.hex)}</dd></dl></div>`).join('')}
    </div>` }));

  /* 03 — nuances et proportions */
  const nuances = [
    ['Vert profond sombre', FOREST_DEEP, IVORY, 'fond du pied de page'],
    ['Vert profond doux', FOREST_SOFT, IVORY, 'panneau Trust Score sur fond sombre'],
    ['Vert survol', GREEN_HOVER, ON_GREEN, 'seul état de survol du bouton'],
    ['Vert encre', GREEN_INK, WHITE, 'texte vert sur fond clair'],
    ['Vert d\'affichage', GREEN_DISPLAY, WHITE, 'grands titres verts sur fond clair, dès 32 px'],
    ['Vert clair', GREEN_LIGHT, ON_GREEN, 'texte vert sur vert profond'],
    ['Encre sur vert', ON_GREEN, GREEN_LIGHT, 'texte et coche sur vert LOCAGAB'],
    ['Sable', SAND, FOREST, 'bande des écrans, cadres photo'],
    ['Blanc', WHITE, FOREST, 'surface de l\'application, sections blanches'],
    ['Gris vert', MUTED, WHITE, 'texte secondaire sur fond clair'],
    ['Gris vert sur profond', MUTED_ON_FOREST, FOREST, 'texte secondaire sur fond sombre'],
    ['Filets', '#D3DAD7', FOREST, 'vert profond à 14 % et 28 %'],
  ];
  p.push(planche({ section: S3, titre: 'Les nuances servent des rôles ; les proportions tiennent la marque calme.', sur: 'Nuances dérivées et proportions', ton: 'blanc', corps: `
    <div class="colonne" style="gap:30px;height:100%">
      <div class="nuances">
        ${nuances.map(([n, h, f, r]) => `<div class="nuance" style="background:${h};color:${f}"><b>${n}</b><span><code>${h}</code><br>${r}</span></div>`).join('')}
      </div>
      <div class="grille-3-2" style="height:auto">
        <div class="colonne" style="gap:14px">
          <span class="etiquette">${a()}Proportions d'usage sur une page ou un support</span>
          <div class="proportions">
            <span style="flex:45;background:${IVORY};color:${FOREST}">45 % ivoire</span>
            <span style="flex:25;background:${WHITE};color:${FOREST}">25 % blanc</span>
            <span style="flex:20;background:${FOREST};color:${IVORY}">20 % vert profond</span>
            <span style="flex:7;background:${GREEN};color:${ON_GREEN}">7 %</span>
            <span style="flex:3;background:${SAND};color:${FOREST}"></span>
          </div>
          <p class="note">Ivoire 45 %, surfaces blanches 25 %, vert profond 20 %, vert LOCAGAB 7 %, sable et accents secondaires 3 %. Le vert LOCAGAB est rare par construction : c'est ce qui le rend lisible comme signal.</p>
        </div>
        <ul class="liste-filets liste-filets--simple">
          <li><b>${a()}Règle du vert unique</b><span>Le vert LOCAGAB ne se pose que sur une action ou une marque de vérification.</span></li>
          <li><b>${a()}Règle du ton par section</b><span>Un fond change par section entière ; texte, filets et accent suivent.</span></li>
          <li><b>${a()}Règle de l'échelle de contraste</b><span>Trois verts de texte, trois usages. Pas d'autre vert pour du texte.</span></li>
        </ul>
      </div>
    </div>` }));

  /* 03 — contrastes */
  const paires = [
    [CHARCOAL, IVORY, 'Texte courant', false], [FOREST, IVORY, 'Titres', false], [MUTED, IVORY, 'Texte secondaire', false], [GREEN_INK, IVORY, 'Texte vert, liens', false],
    [GREEN_DISPLAY, IVORY, 'Grands titres verts', true], [IVORY, FOREST, 'Texte sur vert profond', false], [GREEN_LIGHT, FOREST, 'Vert sur vert profond', false], [ON_GREEN, GREEN, 'Texte sur bouton', false],
  ];
  p.push(planche({ section: S3, titre: 'Chaque paire de couleurs a été mesurée. On s\'en tient à celles-ci.', sur: 'Contrastes autorisés', corps: `
    <div class="colonne" style="gap:28px;height:100%">
      <div class="paires">
        ${paires.map(([fg, bg, usage, grand]) => { const c = contraste(fg, bg); const seuil = grand ? 3 : 4.5; return `<div class="paire" style="background:${bg};color:${fg};border-color:${bg === IVORY ? 'var(--line)' : bg}"><span class="ex">${usage}</span><span class="ex ex--petit">Appartement moderne à Libreville, 450 000 FCFA / mois.</span><span class="ratio"><b class="tabulaire">${c.toFixed(1).replace('.', ',')}:1</b> ${c >= seuil ? (grand ? 'AA grands textes' : (c >= 7 ? 'AAA' : 'AA')) : 'insuffisant'} · ${fg} sur ${bg}</span></div>`; }).join('')}
      </div>
      <div class="grille-2" style="height:auto">
        <p class="intro" style="font-size:18px">Toutes les paires de texte atteignent au moins <strong>4,5:1</strong>, le niveau AA des recommandations d'accessibilité ; le vert d'affichage, réservé aux titres de 32 px et plus, atteint 3,5:1, le seuil des grands textes. Le vert LOCAGAB pur n'est jamais une couleur de texte : il ne contraste ni sur l'ivoire ni sur le vert profond.</p>
        <ul class="liste-filets liste-filets--simple">
          <li><b>${a()}Sur fond clair</b><span>charbon pour le courant, vert profond pour les titres, gris vert pour le secondaire, vert encre pour les liens.</span></li>
          <li><b>${a()}Sur vert profond</b><span>ivoire pour le courant et les titres, gris vert clair pour le secondaire, vert clair pour l'accent.</span></li>
          <li><b>${a({ vide: true })}Exclu</b><span>vert LOCAGAB en texte, ivoire sur vert LOCAGAB, gris sur sable pour un texte long.</span></li>
        </ul>
      </div>
    </div>` }));

  /* 04 — Manrope */
  p.push(planche({ section: S4, titre: 'Manrope, seule. La hiérarchie vient de la graisse, de la taille et du serrage.', sur: 'La famille', ton: 'blanc', corps: `
    <div class="grille-3-2">
      <div class="colonne" style="justify-content:space-between">
        <p class="specimen">Aa Gg<br>Qq 450</p>
        <p class="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 FCFA m² % « » — ; ? !</p>
      </div>
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:18px">Manrope est une linéale géométrique à l'œil généreux, dessinée par Mikhail Sharanda et publiée sous licence libre (SIL Open Font License). Sa version variable permet des graisses intermédiaires précises : la marque en utilise quatre.</p>
        <div class="graisses">
          <div><small>450 · Corps<br>texte courant</small><span style="font-weight:450">Trouvez votre logement, simplement.</span></div>
          <div><small>600 · Demi-gras<br>navigation, métadonnées</small><span style="font-weight:600">Trouvez votre logement, simplement.</span></div>
          <div><small>680 · Titres<br>H2, H3, boutons</small><span style="font-weight:680;letter-spacing:-.03em">Trouvez votre logement, simplement.</span></div>
          <div><small>700 · Affichage<br>H1, score, étiquettes</small><span style="font-weight:700;letter-spacing:-.04em">Trouvez votre logement, simplement.</span></div>
        </div>
        <p class="note">Substitution autorisée quand Manrope est indisponible (courriels, documents bureautiques) : Inter, puis la police système. Aucune police décorative, aucune seconde famille.</p>
      </div>
    </div>` }));

  /* 04 — hiérarchie */
  p.push(planche({ section: S4, titre: 'Huit niveaux, du titre d\'affichage à l\'étiquette.', sur: 'Hiérarchie', corps: `
    <ul class="hierarchie">
      <li><p class="h-display">Trouvez votre logement, <span class="accent">simplement.</span></p><p class="spec"><b>Display · H1</b>700 · 44 à 88 px fluide · interligne 0,98 · interlettrage −0,04 em · dernier mot en vert d'affichage</p></li>
      <li><p class="h-headline">Plus qu'une annonce. Une information fiable.</p><p class="spec"><b>Headline · H2</b>680 · 32 à 56 px fluide · interligne 1,04 · −0,035 em · 12 à 21 caractères par ligne</p></li>
      <li><p class="h-title">Annonces vérifiées</p><p class="spec"><b>Title · H3</b>680 · 20 à 24 px · interligne 1,2 · −0,02 em</p></li>
      <li><p class="h-lead">Identifiez les logements et profils ayant passé les étapes de vérification.</p><p class="spec"><b>Lead · chapeau</b>450 · 18 à 21 px · interligne 1,5 · gris vert · 34 rem de large au plus</p></li>
      <li><p class="h-body">Chaque fiche indique sa disponibilité. Les logements disponibles sont signalés clairement, et vous pouvez limiter votre recherche à ceux-là depuis les filtres.</p><p class="spec"><b>Body · courant</b>450 · 17 px · interligne 1,6 · charbon · 26 à 40 rem de large</p></li>
      <li><p class="h-small">Louis, Libreville · 2 chambres · 2 salles de bain · 120 m²</p><p class="spec"><b>Small</b>450 · 15 px · interligne 1,5 · navigation, métadonnées</p></li>
      <li><p class="h-label">${a()}Annonce vérifiée</p><p class="spec"><b>Label · étiquette</b>700 · 12 px · capitales · interlettrage 0,14 em · toujours précédée du repère</p></li>
      <li><p class="h-score">95<small>%</small></p><p class="spec"><b>Score</b>700 · 72 à 100 px · interligne 0,9 · chiffres tabulaires · le seul chiffre géant</p></li>
    </ul>` }));

  /* 04 — règles de composition */
  p.push(planche({ section: S4, titre: 'Serré en haut, posé en bas, tabulaire partout où l\'on compte.', sur: 'Règles de composition', ton: 'blanc', corps: `
    <div class="grille-3">
      <div class="surface surface--ivoire">
        <span class="etiquette">${a()}Titres</span>
        <p class="h-headline" style="font-size:38px">Chercher un logement ne devrait pas être compliqué.</p>
        <p>Interlettrage négatif (−0,035 à −0,04 em), interligne bas (0,98 à 1,04), largeur bornée en caractères, équilibrage des lignes. Un titre dit une chose ; il n'est jamais précédé d'une étiquette en capitales.</p>
      </div>
      <div class="surface surface--ivoire">
        <span class="etiquette">${a()}Chiffres</span>
        <p class="h-headline tabulaire" style="font-size:38px">450 000 FCFA<br><span style="font-size:20px;color:var(--muted);font-weight:600;letter-spacing:0">Réf. LBV-2041 · vérifiée le 3 oct. 2026</span></p>
        <p>Prix, surfaces, références, dates, numéros d'étape et score se composent en <b>chiffres tabulaires</b> pour s'aligner en colonne. Espace insécable entre les groupes de trois chiffres et avant l'unité.</p>
      </div>
      <div class="surface surface--ivoire">
        <span class="etiquette">${a()}Étiquettes et listes</span>
        <p class="h-label">${a()}Carte interactive</p>
        <ul class="liste-filets liste-filets--simple" style="margin-top:6px"><li>Identité vérifiée</li><li>Téléphone vérifié</li><li>Localisation vérifiée</li></ul>
        <p>L'étiquette nomme un état ou une métadonnée, en capitales espacées de 0,14 em, précédée du repère à 0,6 em. Les listes s'ouvrent par un filet vert profond plein et séparent leurs lignes par un filet à 14 % : jamais de carte autour.</p>
      </div>
    </div>` }));

  /* 05 — le repère */
  p.push(planche({ section: S5, titre: 'Un seul signe pour toute la marque : le repère.', sur: 'Le repère', corps: `
    <div class="colonne" style="gap:28px;height:100%">
      <div class="grille-3-2" style="height:auto">
        <p class="intro">Pris dans l'œil du repère du logo, l'<strong>anneau</strong> est le signe de LOCAGAB. Vide, il dit « rien n'est encore vérifié » ; plein de vert, il dit « vérifié » ; devenu point, il marque la position ou la disponibilité. Il précède chaque étiquette, chaque numéro d'étape, chaque nom de lieu. Il se dimensionne avec le texte qu'il accompagne et ne porte jamais de décor.</p>
        <ul class="liste-filets liste-filets--simple" style="font-size:15px">
          <li><b>${a()}Forme</b><span>cercle de 0,72 em, bordure 0,2 em en vert LOCAGAB ; variante petite 0,5 em, bordure 0,14 em.</span></li>
          <li><b>${a()}Position</b><span>à gauche du texte, centré sur la hauteur d'x, écart 0,6 em.</span></li>
          <li><b>${a({ vide: true })}Jamais</b><span>rempli d'une autre couleur, ombré, dédoublé, utilisé comme puce décorative dans un paragraphe.</span></li>
        </ul>
      </div>
      <div class="reperes">
        <div class="repere"><div class="cadre">${anneau({ taille: 56, epaisseur: 15 })}</div><div><h4>Le repère</h4><p>Devant les étiquettes de statut, les numéros d'étape, les lieux.</p></div></div>
        <div class="repere"><div class="cadre">${anneau({ taille: 56, epaisseur: 15, vide: true })}</div><div><h4>Le repère vide</h4><p>« Disponibilité inconnue », « Prix non précisé » : l'état avant vérification.</p></div></div>
        <div class="repere"><div class="cadre">${sceau({ taille: 56 })}</div><div><h4>Le sceau</h4><p>Cercle plein, coche encre sur vert : une vérification accomplie.</p></div></div>
        <div class="repere"><div class="cadre"><span style="display:inline-grid;place-items:center;width:64px;height:40px;border-radius:999px;background:${FOREST};color:${IVORY};font-weight:700;font-size:14px" class="tabulaire">450 k</span></div><div><h4>Le marqueur</h4><p>Pilule vert profond sur la carte, prix abrégé en tabulaire ; actif : vert LOCAGAB.</p></div></div>
        <div class="repere"><div class="cadre"><span style="width:16px;height:16px;border-radius:50%;background:${GREEN};box-shadow:0 0 0 6px rgb(24 169 87 / .22)"></span></div><div><h4>Le point</h4><p>Disponibilité dans l'application, navigation active sur le site.</p></div></div>
      </div>
    </div>` }));

  /* 05 — filets, formes, tons */
  p.push(planche({ section: S5, titre: 'Pilule pour l\'action, cercle pour le signal, grand rayon pour la surface, filet pour la structure.', sur: 'Formes, filets et tons', ton: 'blanc', corps: `
    <div class="colonne" style="gap:28px;height:100%">
      <div class="formes">
        <div class="forme"><div class="cadre"><span class="bouton">Télécharger l'application</span></div><p><b>Pilule, 999 px.</b> Boutons (52 px de haut), boutons de store, puces, champs. Texte 680, encre sur vert ; survol en vert survol, jamais d'ombre.</p></div>
        <div class="forme"><div class="cadre"><span class="bouton bouton--fantome">Découvrir LOCAGAB</span></div><p><b>Bouton fantôme.</b> Contour à 28 %, texte vert profond ; sur fond sombre, ivoire. Pour l'action secondaire, une seule par section.</p></div>
        <div class="forme"><div class="cadre"><div style="width:150px;height:110px;border-radius:28px;background:${WHITE};border:1px solid var(--line-strong)"></div></div><p><b>Surfaces, 20 et 28 px.</b> Panneaux, cadres photo, onglets. Posées à plat, délimitées par leur ton ou un filet ; aucune ombre portée hors de l'appareil.</p></div>
        <div class="forme"><div class="cadre"><div style="width:200px;display:grid;gap:14px"><div style="height:1px;background:${FOREST}"></div><div style="height:1px;background:var(--line)"></div><div style="height:1px;background:var(--line)"></div><div style="height:2px;background:${GREEN};width:60%"></div></div></div><p><b>Filets, 1 px.</b> Vert profond plein pour ouvrir une liste, 14 % pour séparer, 28 % pour les contours fantômes ; 2 px en vert pour la progression.</p></div>
      </div>
      <div class="tons">
        <div class="ton" style="background:${IVORY};color:${CHARCOAL}"><span class="etiquette">${a()}Ton ivoire</span><span><b style="color:${FOREST}">Le fond par défaut.</b>Hero, problème, étapes, principes, FAQ. Texte charbon, titres vert profond.</span></div>
        <div class="ton" style="background:${WHITE};color:${CHARCOAL};border-color:var(--line)"><span class="etiquette">${a()}Ton blanc</span><span><b style="color:${FOREST}">La surface de l'application.</b>Fonctionnalités, propriétaires, Gabon. Mêmes rôles que l'ivoire.</span></div>
        <div class="ton" style="background:${SAND};color:${CHARCOAL}"><span class="etiquette">${a()}Ton sable</span><span><b style="color:${FOREST}">Un sol pour les appareils.</b>Une seule bande par page : la rangée des sept écrans.</span></div>
        <div class="ton" style="background:${FOREST};color:${IVORY}"><span class="etiquette" style="color:${MUTED_ON_FOREST}">${a()}Ton vert profond</span><span><b style="color:${IVORY}">Le champ de confiance.</b>Trust Score, téléchargement, pied de page. Texte ivoire, accent vert clair.</span></div>
      </div>
    </div>` }));

  /* 05 — pictogrammes et mouvement */
  const icones = [['search', 'Recherche'], ['map', 'Carte'], ['badge-check', 'Vérifié'], ['calendar-check', 'Disponibilité'], ['message-circle', 'Messagerie'], ['heart', 'Favoris'], ['map-pin', 'Lieu'], ['bed-double', 'Chambres'], ['bath', 'Salles de bain'], ['ruler', 'Surface'], ['arrow-down', 'Aller à'], ['plus', 'Ouvrir']];
  p.push(planche({ section: S5, titre: 'Des pictogrammes au trait, un mouvement lent et exact.', sur: 'Pictogrammes et mouvement', corps: `
    <div class="grille-2">
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:18px">Les pictogrammes viennent de la bibliothèque <strong>Lucide</strong> (licence ISC) : trait de 1,9, bouts ronds, grille de 24. Ils se posent dans un cercle de 64 px au contour à 28 % ; l'état actif remplit le cercle de vert LOCAGAB avec le pictogramme en encre sur vert. Jamais d'icône pleine, jamais d'icône géante, jamais d'illustration.</p>
        <div class="icones">
          ${icones.map(([n, l], i) => `<div class="icone"><span class="rond ${i === 2 ? 'rond--actif' : ''}">${lucide(n, { taille: 26 })}</span>${l}</div>`).join('')}
        </div>
      </div>
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:18px">Le mouvement est <strong>lent, exact, sans rebond</strong>. Il révèle, il ne décore pas : les titres se posent ligne par ligne derrière un masque, les blocs montent de quelques pixels, le Trust Score s'assemble vérification après vérification. Tout s'arrête quand l'utilisateur demande moins de mouvement.</p>
        <ul class="mouvement">
          <li><b>180 ms</b><span>changement d'état : survol d'un bouton, d'un lien, d'un onglet.</span></li>
          <li><b>420 ms</b><span>transitions d'interface : onglet, accordéon, soulignement, point de navigation.</span></li>
          <li><b>800 ms</b><span>changement de ton ou d'emphase : étape active, écran qui change dans le téléphone.</span></li>
          <li><b>1 à 1,6 s</b><span>révélations à l'arrivée : titres, blocs, appareils (courbes power3.out, power4.out).</span></li>
          <li><b>Courbe</b><span>cubic-bezier(0.22, 1, 0.36, 1). Aucun rebond, aucune élasticité, aucune rotation continue.</span></li>
          <li><b>Interdits</b><span>clignotement, défilement détourné, parallaxe forte, effets 3D, confettis, compteurs sans objet.</span></li>
        </ul>
      </div>
    </div>` }));

  /* 06 — photographie */
  p.push(planche({ section: S6, titre: 'Gabonaise par le contexte, jamais par le cliché.', sur: 'Direction photographique', ton: 'blanc', corps: `
    <div class="grille-3-2">
      <div class="photos">
        <figure><img src="assets/photos/libreville-front-de-mer-960.webp" alt="Front de mer de Libreville vu du ciel"><figcaption>${a({ taille: 8, epaisseur: 2 })}Libreville</figcaption></figure>
        <figure><img src="assets/photos/salon.webp" alt="Salon lumineux aux canapés clairs"><figcaption>${a({ taille: 8, epaisseur: 2 })}Intérieur</figcaption></figure>
        <figure><img src="assets/photos/villa.webp" alt="Villa blanche entourée de palmiers"><figcaption>${a({ taille: 8, epaisseur: 2 })}Façade</figcaption></figure>
        <figure><img src="assets/photos/libreville-bord-de-mer-720.webp" alt="Bord de mer de Libreville"><figcaption>${a({ taille: 8, epaisseur: 2 })}Littoral</figcaption></figure>
        <figure><img src="assets/photos/chambre.webp" alt="Chambre claire"><figcaption>${a({ taille: 8, epaisseur: 2 })}Chambre</figcaption></figure>
      </div>
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:17px">Trois sujets : la <strong>ville</strong> (Libreville, Akanda, Owendo, vues d'ensemble, architecture, littoral), le <strong>logement</strong> (intérieurs lumineux, façades, pièces réelles) et, avec parcimonie, les <strong>personnes</strong> dans leur quotidien. Lumière naturelle, cadrage droit, couleurs fidèles.</p>
        <ul class="liste-filets liste-filets--etroite" style="font-size:14px">
          <li><b>${a()}Traitement</b><span>aucun filtre, aucune saturation forcée. Sous un texte, un voile vert profond à 55 % ; jamais de dégradé coloré.</span></li>
          <li><b>${a()}Cadres</b><span>coins arrondis à 20 ou 28 px sur fond sable ; légende en étiquette avec le repère.</span></li>
          <li><b>${a()}Dans l'application</b><span>les photos d'annonce sont montrées telles quelles, au format 3:2, avec le statut et le badge « vérifiée » par-dessus.</span></li>
          <li><b>${a({ vide: true })}Exclus</b><span>banques d'images génériques, drapeau, illustrations cartoon, rendus 3D, intérieurs de luxe hors de la réalité du marché.</span></li>
          <li><b>${a()}Crédits</b><span>toute photo tierce est créditée (auteur, licence). Les vues de Libreville de cette charte : Shirmy25, CC BY-SA 4.0, Wikimedia Commons.</span></li>
        </ul>
      </div>
    </div>` }));

  return p;
}
