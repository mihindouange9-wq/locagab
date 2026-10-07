import { PRINCIPLES } from "../content/site";
import "./why.css";

export default function Why() {
  return (
    <section id="pourquoi" className="section why">
      <div className="container">
        <h2 className="why__title" data-title>
          Pourquoi LOCAGAB ?
        </h2>
        <ul className="why__list">
          {PRINCIPLES.map((p) => (
            <li key={p.word} className="why__row" data-reveal>
              <h3 className="why__word">{p.word}</h3>
              <p className="why__text">
                <i className="ring" />
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
