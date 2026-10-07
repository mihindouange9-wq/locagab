import { ArrowDown } from "lucide-react";
import Phone from "../components/Phone";
import { OWNER_TASKS } from "../content/site";
import "./owners.css";

export default function Owners() {
  return (
    <section id="proprietaires" className="section owners" data-tone="white">
      <div className="container owners__grid">
        <div className="owners__copy">
          <h2 data-title>Vous avez un logement à louer ?</h2>
          <p className="lead" data-reveal>
            Publiez votre logement, présentez-le correctement et recevez des demandes de personnes réellement
            intéressées.
          </p>
          <ul className="owners__tasks" data-reveal>
            {OWNER_TASKS.map((t) => (
              <li key={t}>
                <i className="ring" />
                {t}
              </li>
            ))}
          </ul>
          <div data-reveal>
            <a className="btn" href="#telecharger">
              Publier un logement
              <ArrowDown />
            </a>
          </div>
        </div>
        <div className="owners__device" data-reveal>
          <span className="owners__plate" />
          <Phone
            screens={["publish"]}
            label="Écran de création d'annonce : photos, type de bien, loyer, localisation, disponibilité et demandes reçues"
          />
        </div>
      </div>
    </section>
  );
}
