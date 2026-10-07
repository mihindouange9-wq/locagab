// Contenu de démonstration affiché dans les écrans de l'application.
// Annonces, noms et messages sont fictifs : ils illustrent le fonctionnement de LOCAGAB.
import salon from "../assets/photos/salon.webp";
import sejour from "../assets/photos/sejour.webp";
import chambre from "../assets/photos/chambre.webp";
import cuisine from "../assets/photos/cuisine.webp";
import studio from "../assets/photos/studio.webp";
import villa from "../assets/photos/villa.webp";
import immeuble from "../assets/photos/immeuble.webp";

export const PHOTOS = { salon, sejour, chambre, cuisine, studio, villa, immeuble };

export type Listing = {
  id: string;
  title: string;
  place: string;
  price: string;
  short: string; // prix abrégé pour les marqueurs de carte
  rooms: string;
  baths: string;
  area: string;
  photo: string;
  alt: string;
  available: boolean;
  verified: boolean;
};

export const LISTINGS: Listing[] = [
  {
    id: "appartement-louis",
    title: "Appartement moderne à Libreville",
    place: "Louis, Libreville",
    price: "450 000 FCFA",
    short: "450 k",
    rooms: "2 chambres",
    baths: "2 salles de bain",
    area: "120 m²",
    photo: salon,
    alt: "Salon lumineux d'un appartement moderne, canapés clairs et grandes baies vitrées",
    available: true,
    verified: true,
  },
  {
    id: "villa-akanda",
    title: "Villa avec jardin à Akanda",
    place: "Angondjé, Akanda",
    price: "850 000 FCFA",
    short: "850 k",
    rooms: "4 chambres",
    baths: "3 salles de bain",
    area: "260 m²",
    photo: villa,
    alt: "Villa contemporaine blanche à étage, entourée de palmiers",
    available: true,
    verified: true,
  },
  {
    id: "studio-glass",
    title: "Studio meublé à Glass",
    place: "Glass, Libreville",
    price: "180 000 FCFA",
    short: "180 k",
    rooms: "1 pièce",
    baths: "1 salle d'eau",
    area: "34 m²",
    photo: studio,
    alt: "Studio meublé avec canapé, mur en béton et grande fenêtre",
    available: true,
    verified: true,
  },
  {
    id: "appartement-owendo",
    title: "Appartement 3 pièces à Owendo",
    place: "Owendo",
    price: "320 000 FCFA",
    short: "320 k",
    rooms: "2 chambres",
    baths: "1 salle de bain",
    area: "86 m²",
    photo: sejour,
    alt: "Séjour clair avec canapé gris et rideaux blancs",
    available: false,
    verified: true,
  },
  {
    id: "residence-batterie",
    title: "Appartement en résidence, Batterie IV",
    place: "Batterie IV, Libreville",
    price: "600 000 FCFA",
    short: "600 k",
    rooms: "3 chambres",
    baths: "2 salles de bain",
    area: "145 m²",
    photo: immeuble,
    alt: "Façade d'une résidence aux balcons blancs",
    available: true,
    verified: false,
  },
];

export const MAIN = LISTINGS[0];

export const OWNER = { name: "Sylvie M.", initials: "SM", role: "Propriétaire à Libreville" };
