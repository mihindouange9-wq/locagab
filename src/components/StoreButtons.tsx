import { STORES } from "../content/site";
import BrandIcon from "./BrandIcon";
import "./store-buttons.css";

const ITEMS = [
  { id: "appStore", icon: "apple", name: "App Store" },
  { id: "googlePlay", icon: "googleplay", name: "Google Play" },
] as const;

/**
 * Boutons de téléchargement. Un bouton devient un lien dès que son adresse est renseignée
 * dans `src/content/site.ts` ; d'ici là, il annonce simplement l'arrivée sur la plateforme.
 */
export default function StoreButtons() {
  return (
    <div className="stores">
      {ITEMS.map((s) => {
        const href = STORES[s.id];
        const body = (
          <>
            <BrandIcon name={s.icon} className="store__icon" />
            <span className="store__text">
              <small>{href ? "Télécharger sur" : "Bientôt sur"}</small>
              <strong>{s.name}</strong>
            </span>
          </>
        );
        return href ? (
          <a key={s.id} className="store" href={href} rel="noopener">
            {body}
          </a>
        ) : (
          <span key={s.id} className="store store--soon">
            {body}
          </span>
        );
      })}
    </div>
  );
}
