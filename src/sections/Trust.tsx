import { useRef } from "react";
import { TRUST_CHECKS } from "../content/site";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/motion";
import "./trust.css";

const STEP = 19; // chaque vérification apporte 19 points : cinq vérifications, 95 %

export default function Trust() {
  const root = useRef<HTMLElement>(null);
  const value = useRef<HTMLSpanElement>(null);

  // Le score se construit sous les yeux : une vérification après l'autre, le chiffre suit.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const counter = { n: 0 };
      const show = () => (value.current!.textContent = String(Math.round(counter.n)));
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: ".score", start: "top 72%", once: true },
      });

      gsap.set(".score__check", { opacity: 0.35 });
      gsap.set(".score__seal path", { strokeDashoffset: 1 });
      gsap.set(".score__seal", { backgroundColor: "rgba(24,169,87,0)" });
      gsap.set(".score__bar i", { scaleX: 0 });
      gsap.set(".score__status", { autoAlpha: 0, x: -8 });
      show();

      TRUST_CHECKS.forEach((_, i) => {
        const at = 0.25 + i * 0.5;
        const row = `.score__check:nth-child(${i + 1})`;
        tl.to(row, { opacity: 1, duration: 0.35 }, at)
          .to(`${row} .score__seal`, { backgroundColor: "rgba(24,169,87,1)", duration: 0.3 }, at)
          .to(`${row} .score__seal path`, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" }, at + 0.1)
          .to(`.score__bar i:nth-child(${i + 1})`, { scaleX: 1, duration: 0.5, ease: "power3.out" }, at)
          .to(counter, { n: STEP * (i + 1), duration: 0.5, onUpdate: show }, at);
      });
      tl.to(".score__status", { autoAlpha: 1, x: 0, duration: 0.6 }, ">-0.1");
    },
    { scope: root },
  );

  return (
    <section id="securite" className="section trust" data-tone="forest" ref={root}>
      <div className="container trust__grid">
        <div className="trust__copy">
          <h2 data-title>Plus qu'une annonce. Une information fiable.</h2>
          <p className="lead" data-reveal>
            Ni note de solvabilité ni jugement sur les personnes : c'est le relevé de ce qui a été vérifié, point par
            point. Le LOCAGAB Trust Score le résume d'un regard, avant même de contacter qui que ce soit.
          </p>
        </div>

        <div className="score" data-reveal>
          <p className="label score__name">
            <i className="ring" />
            LOCAGAB Trust Score
            <span className="score__ref">Réf. LBV-2041 · vérifiée le 3 oct. 2026</span>
          </p>
          <p className="score__value" aria-label="95 %, vérifié">
            <span className="score__number">
              <span ref={value}>95</span>
              <small>%</small>
            </span>
            <span className="score__status">Vérifié</span>
          </p>
          <div className="score__bar" aria-hidden="true">
            {TRUST_CHECKS.map((c) => (
              <i key={c} />
            ))}
          </div>
          <ul className="score__list">
            {TRUST_CHECKS.map((c) => (
              <li key={c} className="score__check">
                <span className="score__seal">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 8.4l2.6 2.6L12 5.6" pathLength="1" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
