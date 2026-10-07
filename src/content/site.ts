// Tous les textes et liens du site. Les valeurs vides sont à fournir par LOCAGAB (voir README).

export const SITE = {
  name: "LOCAGAB",
  signature: "Trouvez votre logement, simplement.",
  year: 2026,
};

/** Liens de téléchargement. Tant qu'une adresse est vide, le bouton affiche « Bientôt sur ». */
export const STORES = {
  appStore: "",
  googlePlay: "",
};

/** Adresse de contact : si elle est renseignée, « Contact » ouvre un courriel. */
export const CONTACT_EMAIL = "";

export const NAV = [
  { label: "Accueil", href: "#accueil" },
  { label: "L'application", href: "#application" },
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Sécurité", href: "#securite" },
  { label: "FAQ", href: "#faq" },
];

/** Réseaux et pages légales : renseigner `href` pour activer le lien. */
export const SOCIALS = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "X", href: "" },
];

export const LEGAL = [
  { label: "Politique de confidentialité", href: "" },
  { label: "Conditions d'utilisation", href: "" },
  { label: "Mentions légales", href: "" },
];

export const PROBLEMS = [
  {
    title: "Annonces peu fiables",
    text: "Un logement peut être déjà loué alors que l'annonce est toujours en ligne.",
  },
  {
    title: "Informations incomplètes",
    text: "Difficile de connaître le prix réel, la localisation ou les caractéristiques.",
  },
  {
    title: "Manque de confiance",
    text: "Il n'est pas toujours facile de savoir à qui l'on parle.",
  },
  {
    title: "Trop de recherches",
    text: "WhatsApp, Facebook, bouche-à-oreille, agences… L'offre est dispersée partout.",
  },
];

export type ScreenId =
  | "home"
  | "map"
  | "listing"
  | "filters"
  | "results"
  | "owner"
  | "favorites"
  | "messages"
  | "publish"
  | "splash";

export const FEATURES: { id: string; title: string; text: string; screen: ScreenId }[] = [
  {
    id: "recherche",
    title: "Recherche intelligente",
    text: "Trouvez rapidement selon votre budget, votre quartier et vos besoins.",
    screen: "filters",
  },
  {
    id: "carte",
    title: "Carte interactive",
    text: "Visualisez les logements directement autour de vous.",
    screen: "map",
  },
  {
    id: "verifiees",
    title: "Annonces vérifiées",
    text: "Identifiez les logements et profils ayant passé les étapes de vérification.",
    screen: "listing",
  },
  {
    id: "disponibilite",
    title: "Disponibilité",
    text: "Identifiez facilement les logements disponibles.",
    screen: "home",
  },
  {
    id: "contact",
    title: "Contact direct",
    text: "Discutez directement avec le propriétaire ou l'agence.",
    screen: "messages",
  },
  {
    id: "favoris",
    title: "Favoris",
    text: "Sauvegardez les logements qui vous intéressent.",
    screen: "favorites",
  },
];

export const TRUST_CHECKS = [
  "Identité vérifiée",
  "Téléphone vérifié",
  "Localisation vérifiée",
  "Logement vérifié",
  "Disponibilité récente",
];

export const STEPS: { n: string; title: string; text: string; screen: ScreenId }[] = [
  { n: "01", title: "Recherchez", text: "Indiquez votre ville, quartier et budget.", screen: "filters" },
  {
    n: "02",
    title: "Comparez",
    text: "Découvrez les logements qui correspondent à vos critères.",
    screen: "results",
  },
  {
    n: "03",
    title: "Vérifiez",
    text: "Consultez les informations et le niveau de confiance.",
    screen: "listing",
  },
  {
    n: "04",
    title: "Contactez",
    text: "Demandez une visite directement depuis l'application.",
    screen: "messages",
  },
];

export const SHOWCASE: { label: string; screen: ScreenId }[] = [
  { label: "Recherche", screen: "home" },
  { label: "Filtres", screen: "filters" },
  { label: "Carte", screen: "map" },
  { label: "Fiche logement", screen: "listing" },
  { label: "Profil propriétaire", screen: "owner" },
  { label: "Favoris", screen: "favorites" },
  { label: "Messagerie", screen: "messages" },
];

export const OWNER_TASKS = [
  "Créer une annonce",
  "Ajouter des photos",
  "Définir le prix",
  "Choisir la localisation",
  "Indiquer la disponibilité",
  "Gérer les demandes",
];

export const PRINCIPLES = [
  { word: "Confiance", text: "Des informations plus claires et des profils mieux identifiés." },
  { word: "Simplicité", text: "Une expérience pensée pour aller rapidement à l'essentiel." },
  { word: "Proximité", text: "Des logements et des opportunités proches de votre réalité." },
];

export const PLACES = ["Libreville", "Akanda", "Owendo"];

export const FAQ = [
  {
    q: "LOCAGAB est-il un site ou une application ?",
    a: "LOCAGAB est une application mobile. Ce site la présente : la recherche de logement, les fiches, la carte et les échanges avec les propriétaires se font dans l'application.",
  },
  {
    q: "Que signifie « annonce vérifiée » ?",
    a: "Une annonce vérifiée a passé les étapes de vérification de LOCAGAB : identité et téléphone de la personne qui publie, localisation et existence du logement, disponibilité confirmée récemment. Le Trust Score résume ces vérifications sur chaque fiche.",
  },
  {
    q: "Comment savoir si un logement est encore disponible ?",
    a: "Chaque fiche indique sa disponibilité. Les logements disponibles sont signalés clairement, et vous pouvez limiter votre recherche à ceux-là depuis les filtres.",
  },
  {
    q: "Comment contacter un propriétaire ou une agence ?",
    a: "Directement depuis la fiche du logement : vous échangez dans la messagerie de l'application et vous pouvez demander une visite sans passer par un intermédiaire.",
  },
  {
    q: "Dans quelles villes puis-je chercher ?",
    a: "LOCAGAB est conçu pour le marché immobilier gabonais, de Libreville à l'ensemble du territoire. La recherche se fait par ville et par quartier.",
  },
  {
    q: "J'ai un logement à louer. Puis-je publier une annonce ?",
    a: "Oui. Propriétaires et agences créent leur annonce dans l'application : photos, prix, localisation, disponibilité, puis suivi des demandes reçues.",
  },
];
