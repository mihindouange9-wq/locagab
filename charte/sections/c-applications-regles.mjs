/* 07 Les applications, 08 Faire / Ne pas faire, 09 Fichiers et contacts, planche de partenariat. */
import { planche, pied, anneau, sceau, lucide, symbole, logoHorizontal, logoVertical, logoAura, AURA_IVOIRE, FOREST, GREEN, IVORY, GREEN_LIGHT, MUTED_ON_FOREST } from '../lib.mjs';

const S7 = '07 — Les applications', S8 = '08 — Faire / Ne pas faire', S9 = '09 — Fichiers et contacts';
const a = (opts = {}) => anneau({ taille: 10, epaisseur: 3, ...opts });

/* pictogrammes des plateformes (tracés Simple Icons, CC0) */
const APPLE = '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>';
const PLAY = '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>';

export default function () {
  const p = [];

  /* 07 — site web */
  p.push(planche({ section: S7, titre: 'Le site : le dossier de présentation de l\'application.', sur: 'Site web · locagab.onrender.com', corps: `
    <div class="grille-3-2">
      <div class="navigateur"><div class="barre"><i></i><i></i><i></i><span>locagab.onrender.com</span></div><img src="assets/site/accueil-1440.png" alt="Page d'accueil du site LOCAGAB sur ordinateur"></div>
      <div class="grille-2" style="height:100%">
        <div class="colonne" style="gap:18px">
          <p class="intro" style="font-size:17px">Le site n'est pas une plateforme : il présente l'application, explique son fonctionnement et conduit au téléchargement. Pas de barre de recherche dominante, pas de grille de biens. Les écrans de l'application sont montrés en HTML dans des iPhone dessinés, jamais en image aplatie.</p>
          <ul class="liste-filets liste-filets--simple" style="font-size:14px">
            <li><b>${a()}Structure</b><span>une idée par section, une action principale par section, trois tons de fond plus une bande de sable.</span></li>
            <li><b>${a()}Accessibilité</b><span>contrastes AA, focus visible, parcours complet au clavier et en mouvement réduit.</span></li>
            <li><b>${a()}Performance</b><span>police auto-hébergée, images WebP, aucun service tiers.</span></li>
          </ul>
        </div>
        <div class="mobile" style="width:230px;border-radius:36px;padding:8px"><img src="assets/site/accueil-390.png" alt="Page d'accueil du site LOCAGAB sur téléphone" style="border-radius:28px"></div>
      </div>
    </div>` }));

  /* 07 — icône, écran d'ouverture, boutons */
  p.push(planche({ section: S7, titre: 'L\'icône, l\'écran d\'ouverture et les boutons de téléchargement.', sur: 'Application et stores', ton: 'forest', corps: `
    <div class="grille-3">
      <div class="colonne" style="align-items:center;justify-content:center;gap:28px">
        <div class="icone-app">${symbole({ encre: IVORY, hauteur: 120 })}</div>
        <div style="display:flex;gap:16px;align-items:flex-end">
          <div class="icone-app" style="width:96px;height:96px;border-radius:21px;box-shadow:none">${symbole({ encre: IVORY, hauteur: 52 })}</div>
          <div class="icone-app" style="width:60px;height:60px;border-radius:13px;box-shadow:none">${symbole({ encre: IVORY, hauteur: 32 })}</div>
          <div class="icone-app" style="width:32px;height:32px;border-radius:7px;box-shadow:none">${symbole({ encre: IVORY, hauteur: 17 })}</div>
        </div>
        <p class="note" style="text-align:center;max-width:36ch;color:${MUTED_ON_FOREST}"><b style="color:${IVORY}">Icône d'application.</b> Symbole ivoire et vert sur vert profond, coins à 22 %. Fournie en 1024, 512, 192, 180 et 32 px.</p>
      </div>
      <div class="colonne" style="align-items:center;justify-content:center;gap:20px">
        <div class="splash" style="height:520px;width:252px">${logoVertical({ encre: IVORY, hauteur: 150 })}</div>
        <p class="note" style="text-align:center;max-width:36ch;color:${MUTED_ON_FOREST}"><b style="color:${IVORY}">Écran d'ouverture.</b> Logo vertical ivoire centré sur vert profond, sans texte ni animation autre qu'un fondu.</p>
      </div>
      <div class="colonne" style="justify-content:center;gap:22px">
        <p class="intro" style="font-size:17px;color:${IVORY}">Les <strong style="color:${IVORY}">boutons de store</strong> sont des pilules ivoire sur fond vert profond : pictogramme de la plateforme, « Télécharger sur » en petit, nom du store en 720. Tant que l'adresse d'une fiche n'existe pas, le bouton devient un contour « Bientôt sur » et n'est pas un lien.</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap"><span class="store">${APPLE}<span><small>Télécharger sur</small><strong>App Store</strong></span></span><span class="store">${PLAY}<span><small>Télécharger sur</small><strong>Google Play</strong></span></span></div>
        <div style="display:flex;gap:14px;flex-wrap:wrap"><span class="store store--bientot">${APPLE}<span><small>Bientôt sur</small><strong>App Store</strong></span></span><span class="store store--bientot">${PLAY}<span><small>Bientôt sur</small><strong>Google Play</strong></span></span></div>
        <ul class="liste-filets liste-filets--simple" style="font-size:14px;border-color:${IVORY}">
          <li><b>${a()}Taille</b><span>60 px de haut, 196 px de large au minimum, deux boutons côte à côte, App Store en premier.</span></li>
          <li><b>${a()}Marques</b><span>les pictogrammes Apple et Google Play sont ceux des plateformes ; on ne les recolore pas hors ivoire et vert profond.</span></li>
        </ul>
      </div>
    </div>` }));

  /* 07 — réseaux sociaux */
  p.push(planche({ section: S7, titre: 'Sur les réseaux : une idée, un repère, le logo. Rien d\'autre.', sur: 'Réseaux sociaux', ton: 'blanc', corps: `
    <div class="grille-2-3">
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:17px">Trois gabarits suffisent : le <strong>post ivoire</strong> (une phrase, un repère), le <strong>post vert profond</strong> (un chiffre ou un statut vérifié) et la <strong>story photographique</strong> (ville ou logement sous un voile vert profond). Le logo horizontal occupe toujours le même angle ; la signature ferme la série.</p>
        <ul class="liste-filets liste-filets--simple" style="font-size:15px">
          <li><b>${a()}Formats</b><span>post 1080 × 1080, story 1080 × 1920, bannière 1500 × 500. Marges de 64 px, logo de 56 px de haut.</span></li>
          <li><b>${a()}Texte</b><span>une phrase par visuel, 40 à 96 px, Manrope 700 serrée. Pas de titre en capitales, pas d'émoji, pas de hashtag dans l'image.</span></li>
          <li><b>${a()}Avatar</b><span>l'icône d'application (symbole ivoire sur vert profond), identique sur tous les réseaux.</span></li>
          <li><b>${a({ vide: true })}Jamais</b><span>de dégradé, d'ombre, de photo sans voile sous le texte, de vert LOCAGAB en aplat.</span></li>
        </ul>
      </div>
      <div style="display:flex;gap:24px;align-items:flex-start;justify-content:center;padding-top:8px">
        <div class="post post--ivoire"><span class="etiquette">${a()}Annonce vérifiée</span><h4>Un logement<br>déjà loué ne<br>devrait plus<br>être en ligne.</h4>${logoHorizontal({ hauteur: 40 })}</div>
        <div class="post post--forest"><span class="etiquette" style="color:${MUTED_ON_FOREST}">${a()}LOCAGAB Trust Score</span><div><p style="font-size:100px;line-height:.9;font-weight:700;letter-spacing:-.04em" class="tabulaire">95<span style="font-size:.45em">%</span></p><p style="font-size:18px;color:${GREEN_LIGHT};font-weight:680;margin-top:10px">Identité, téléphone, localisation, logement, disponibilité.</p></div>${logoHorizontal({ encre: IVORY, hauteur: 40 })}</div>
        <div class="story"><span class="etiquette" style="color:${IVORY}">${a()}Libreville</span><h4>Pensé pour le Gabon.</h4>${logoHorizontal({ encre: IVORY, hauteur: 32 })}</div>
      </div>
    </div>` }));

  /* 07 — papeterie */
  p.push(planche({ section: S7, titre: 'La papeterie : le vert profond dehors, l\'ivoire dedans.', sur: 'Carte de visite et signature', corps: `
    <div class="grille-2-3">
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:18px">La carte de visite est au format 85 × 55 mm : recto vert profond avec le logo ivoire centré, verso ivoire avec le nom, la fonction et les coordonnées en chiffres tabulaires, le repère devant le nom. Papier non couché 350 g, sans pelliculage brillant, sans dorure.</p>
        <ul class="liste-filets liste-filets--simple" style="font-size:15px">
          <li><b>${a()}Signature de courriel</b><span>logo horizontal 32 px, filet vertical vert profond, nom en 700, coordonnées en gris vert. Pas d'image de fond, pas de citation.</span></li>
          <li><b>${a()}Papier à en-tête</b><span>logo horizontal 10 mm en haut à gauche, coordonnées en pied en 8 pt, filet vert profond au-dessus du pied.</span></li>
          <li><b>${a()}Présentations</b><span>planches 16:9 sur ivoire, titres vert profond, un seul accent vert par diapositive, pied avec logo et numéro tabulaire.</span></li>
        </ul>
      </div>
      <div class="colonne" style="align-items:center;gap:28px;padding-top:8px">
        <div style="display:flex;gap:24px"><div class="carte carte--forest" style="justify-content:center;align-items:center">${logoHorizontal({ encre: IVORY, hauteur: 48 })}</div><div class="carte carte--ivoire"><div>${symbole({ hauteur: 36 })}</div><div><p class="nom" style="display:flex;align-items:center;gap:10px">${a()}Prénom Nom</p><p class="role">Fonction · LOCAGAB</p><p class="coord" style="margin-top:12px">+241 00 00 00 00<br>prenom.nom@locagab.ga<br>locagab.onrender.com</p></div></div></div>
        <div class="signature">${logoHorizontal({ hauteur: 32 })}<span class="sep"></span><div><p class="nom">Prénom Nom</p><p class="coord">Fonction · LOCAGAB<br>+241 00 00 00 00 · prenom.nom@locagab.ga<br>Trouvez votre logement, simplement.</p></div></div>
        <p class="note">Coordonnées fictives : à remplacer par celles de LOCAGAB.</p>
      </div>
    </div>` }));

  /* 08 — faire / ne pas faire */
  p.push(planche({ section: S8, titre: 'Les règles qui protègent la marque au quotidien.', sur: 'Faire / Ne pas faire', ton: 'blanc', corps: `
    <div class="dodont">
      <div class="colonne"><h3>${sceau({ taille: 28 })}Faire</h3><ul class="oui">
        <li>Réserver le vert LOCAGAB aux actions et aux marques de vérification ; prendre vert encre, vert d'affichage ou vert clair pour tout texte vert.</li>
        <li>Changer de ton par section entière ; laisser texte, filets et accent suivre.</li>
        <li>Ouvrir une liste par un filet vert profond plein et séparer ses lignes par un filet à 14 %.</li>
        <li>Faire précéder chaque étiquette de statut par le repère, avec 0,6 em d'écart.</li>
        <li>Composer prix, références, dates, numéros et score en chiffres tabulaires.</li>
        <li>Montrer ce qui a été vérifié : un statut, une référence, une date.</li>
        <li>Utiliser le logo vectoriel fourni, dans ses couleurs, avec sa zone de protection.</li>
        <li>Animer lentement, sans rebond, et tout arrêter en mouvement réduit.</li>
        <li>Photographier le Gabon réel : la ville, les logements, la lumière naturelle.</li>
      </ul></div>
      <div class="colonne"><h3>${anneau({ taille: 28, epaisseur: 7, vide: true })}Ne pas faire</h3><ul class="non">
        <li>Poser une ombre portée sur une surface ; les ombres n'existent que sur le téléphone et dans son écran.</li>
        <li>Utiliser le vert LOCAGAB en aplat de section ou sur du texte courant.</li>
        <li>Employer l'étiquette en capitales comme accroche au-dessus d'un titre.</li>
        <li>Introduire une barre de recherche ou une grille de biens dans un support de marque.</li>
        <li>Ajouter des dégradés, des effets 3D, des cartes flottantes, des icônes géantes.</li>
        <li>Changer de famille typographique ou mélanger plusieurs graisses dans un même titre.</li>
        <li>Recolorer, déformer, incliner le logo ou le poser sur une photo sans voile.</li>
        <li>Écrire des superlatifs, des exclamations, des émojis, des promesses invérifiables.</li>
        <li>Utiliser les couleurs du drapeau de façon littérale ou des images de banque génériques.</li>
      </ul></div>
    </div>` }));

  /* 09 — fichiers */
  p.push(planche({ section: S9, titre: 'Ce qui est livré, et où le trouver.', sur: 'Fichiers', corps: `
    <div class="grille-3-2">
      <ul class="fichiers">
        <li><code>locagab-logo-horizontal.svg</code><span>logo principal, fond clair</span></li>
        <li><code>locagab-logo-horizontal-sombre.svg</code><span>logo principal, fond sombre</span></li>
        <li><code>locagab-logo-vertical.svg</code><span>logo vertical, fond clair</span></li>
        <li><code>locagab-logo-vertical-sombre.svg</code><span>logo vertical, fond sombre</span></li>
        <li><code>locagab-symbole.svg</code><span>symbole seul, fond clair</span></li>
        <li><code>locagab-symbole-sombre.svg</code><span>symbole seul, fond sombre</span></li>
        <li><code>locagab-mot-symbole.svg</code><span>mot-symbole, fond clair</span></li>
        <li><code>locagab-mot-symbole-sombre.svg</code><span>mot-symbole, fond sombre</span></li>
        <li><code>locagab-icone-application.svg</code><span>icône d'application, vectorielle</span></li>
        <li><code>icon-512.png · icon-192.png</code><span>icônes d'application, PNG</span></li>
        <li><code>apple-touch-icon.png</code><span>icône iOS 180 px</span></li>
        <li><code>favicon.svg · favicon.ico</code><span>favicon vectorielle et de secours</span></li>
        <li><code>og-image.png</code><span>image de partage 1200 × 630</span></li>
        <li><code>LOCAGAB-charte.pdf</code><span>ce document</span></li>
      </ul>
      <div class="colonne" style="gap:22px">
        <p class="intro" style="font-size:18px">Les logos sont vectoriels : ils s'ouvrent dans tout logiciel de création et s'exportent à n'importe quelle taille sans perte. Les fichiers de marque sont dans le dossier <strong>brand</strong> du site et publiés à l'adresse <strong>locagab.onrender.com/brand/</strong> ; cette charte est consultable à <strong>locagab.onrender.com/charte/</strong>.</p>
        <ul class="liste-filets liste-filets--simple" style="font-size:15px">
          <li><b>${a()}Police</b><span>Manrope, SIL Open Font License : gratuite, libre d'usage commercial, à installer sur chaque poste qui produit un support.</span></li>
          <li><b>${a()}Pictogrammes</b><span>Lucide (ISC). Pictogrammes de plateformes : Simple Icons (CC0), marques détenues par leurs propriétaires.</span></li>
          <li><b>${a()}Photographies</b><span>créditées dans le fichier CREDITS du site ; toute nouvelle image doit être libre de droits ou achetée.</span></li>
          <li><b>${a()}Mises à jour</b><span>la charte évolue avec la marque ; la version et la date figurent en pied de chaque planche.</span></li>
        </ul>
      </div>
    </div>` }));

  /* partenariat */
  p.push(`<section class="planche planche--forest partenariat" data-section="Partenariat">
  <header class="planche-tete" style="border-color:var(--line-on-forest-strong)"><span class="planche-section">${a()}Conception et réalisation</span><span>Octobre 2026</span></header>
  <div class="planche-corps">
    <div class="colonne" style="gap:30px">
      <span class="etiquette" style="color:${MUTED_ON_FOREST}">${a()}En partenariat avec</span>
      <div class="lockup">${logoHorizontal({ encre: IVORY, hauteur: 72 })}<span class="croix">×</span>${logoAura({ couleur: AURA_IVOIRE, hauteur: 72 })}</div>
      <p class="intro" style="color:${IVORY};max-width:52ch">L'identité visuelle de LOCAGAB, son site et cette charte ont été conçus et réalisés par <strong style="color:${IVORY}">MÉTHODE AURA</strong>, studio de marque et de création numérique. Le partenariat figure en pied de page du site et de chaque planche de ce document.</p>
      <ul class="liste-filets liste-filets--simple" style="border-color:${IVORY};font-size:15px;color:${IVORY}">
        <li><b style="color:${IVORY}">${a()}Mention</b><span style="color:${MUTED_ON_FOREST}">« En partenariat avec MÉTHODE AURA — Conception et réalisation », avec le logo du studio en ivoire sur fond sombre, en obsidienne sur fond clair.</span></li>
        <li><b style="color:${IVORY}">${a()}Règle</b><span style="color:${MUTED_ON_FOREST}">Le logo MÉTHODE AURA n'est jamais déformé ni recoloré hors de ces deux couleurs, et reste séparé du logo LOCAGAB par la croix ou par un filet.</span></li>
      </ul>
    </div>
    <div class="centre"><div class="surface surface--forest-soft" style="width:520px;padding:48px;gap:24px"><span class="etiquette" style="color:${MUTED_ON_FOREST}">${a()}Signature du studio</span><p class="grand" style="color:${IVORY};font-size:40px">Du concept à l'impact.</p><p class="note" style="color:${MUTED_ON_FOREST}">MÉTHODE AURA accompagne LOCAGAB sur la marque, le site et les supports. Pour toute question sur l'application de cette charte, le studio reste l'interlocuteur de référence.</p>${logoAura({ couleur: AURA_IVOIRE, hauteur: 44 })}</div></div>
  </div>
  ${pied({ sombre: true })}
</section>`);

  return p;
}
