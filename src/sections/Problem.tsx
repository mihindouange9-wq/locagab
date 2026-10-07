import { PROBLEMS } from "../content/site";
import "./problem.css";

// Ce que l'on voit aujourd'hui sur une annonce : des états sans preuve (anneau vide).
const STATES = ["Disponibilité inconnue", "Prix non précisé", "Profil non identifié", "Offres dispersées"];

export default function Problem() {
  return (
    <section id="probleme" className="section problem">
      <div className="container problem__grid">
        <h2 className="problem__title" data-title>
          Chercher un logement ne devrait pas être compliqué.
        </h2>
        <ul className="problem__list">
          {PROBLEMS.map((p, i) => (
            <li key={p.title} className="problem__item" data-reveal>
              <p className="label problem__state">
                <i className="ring ring--empty" />
                {STATES[i]}
              </p>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <p className="problem__answer" data-reveal>
          <i className="ring" />
          LOCAGAB centralise tout.
        </p>
      </div>
    </section>
  );
}
