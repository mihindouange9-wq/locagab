import { useRef, useState } from "react";
import Phone from "../components/Phone";
import { STEPS } from "../content/site";
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "../lib/motion";
import "./how.css";

const SCREENS = STEPS.map((s) => s.screen);

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Ordinateur : l'appareil reste en place, son écran suit l'étape qui passe au centre de la fenêtre.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 960px)", () => {
        gsap.utils.toArray<HTMLElement>(".step").forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
        if (!prefersReducedMotion()) {
          gsap.fromTo(
            ".how__progress i",
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: ".how__steps", start: "top 55%", end: "bottom 55%", scrub: 0.4 },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section id="comment-ca-marche" className="section how" ref={root}>
      <div className="container">
        <header className="how__head">
          <h2 data-title>Comment ça marche</h2>
          <p className="lead" data-reveal>
            De la première recherche à la demande de visite, tout se passe dans l'application, en quatre étapes.
          </p>
        </header>

        <div className="how__grid">
          <div className="how__device" aria-hidden="true">
            <Phone screens={SCREENS} active={active} />
          </div>

          <div className="how__steps">
            <span className="how__progress" aria-hidden="true">
              <i />
            </span>
            <ol className="how__list">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`step ${i === active ? "is-active" : ""}`}>
                <div className="step__text">
                  <span className="step__n">
                    <i className="ring" />
                    {s.n}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                {/* mobile : chaque étape montre le haut de son écran */}
                <div className="step__peek" aria-hidden="true">
                  <Phone screens={[s.screen]} />
                </div>
              </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
