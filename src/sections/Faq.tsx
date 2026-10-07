import { Plus } from "lucide-react";
import { FAQ } from "../content/site";
import "./faq.css";

export default function Faq() {
  return (
    <section id="faq" className="section faq">
      <div className="container faq__grid">
        <h2 className="faq__title" data-title>
          Questions fréquentes
        </h2>
        <div className="faq__list" data-reveal>
          {FAQ.map((item, i) => (
            <details key={item.q} className="faq__item" name="faq" open={i === 0}>
              <summary>
                <h3>{item.q}</h3>
                <span className="faq__icon" aria-hidden="true">
                  <Plus size={18} strokeWidth={2} />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
