import { useRef } from "react";
import frontDeMer from "../assets/photos/libreville-front-de-mer.webp";
import frontDeMer960 from "../assets/photos/libreville-front-de-mer-960.webp";
import bordDeMer from "../assets/photos/libreville-bord-de-mer.webp";
import bordDeMer720 from "../assets/photos/libreville-bord-de-mer-720.webp";
import { PLACES } from "../content/site";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/motion";
import "./gabon.css";

export default function Gabon() {
  const root = useRef<HTMLElement>(null);

  // Parallaxe très légère : la photographie glisse dans son cadre
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".gabon__frame").forEach((frame) => {
        gsap.fromTo(
          frame.querySelector("img"),
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section id="gabon" className="section gabon" data-tone="white" ref={root}>
      <div className="container">
        <header className="gabon__head">
          <h2 data-title>Pensé pour le Gabon.</h2>
          <p className="lead" data-reveal>
            LOCAGAB est conçu autour des réalités du marché immobilier gabonais, de Libreville à l'ensemble du
            territoire.
          </p>
        </header>

        <div className="gabon__grid">
          <figure className="gabon__main" data-reveal>
            <div className="gabon__frame">
              <img
                src={frontDeMer}
                srcSet={`${frontDeMer960} 960w, ${frontDeMer} 1920w`}
                sizes="(min-width: 960px) 66vw, 100vw"
                width="1920"
                height="1080"
                loading="lazy"
                decoding="async"
                alt="Vue aérienne du front de mer de Libreville : le boulevard longe l'estuaire, bordé de palmiers et d'immeubles contemporains."
              />
            </div>
            <figcaption>Front de mer, Libreville. Photographie : Shirmy25, CC BY-SA 4.0, Wikimedia Commons.</figcaption>
          </figure>

          <div className="gabon__side">
            <ul className="gabon__places" data-reveal>
              {PLACES.map((p) => (
                <li key={p}>
                  <i className="ring" />
                  {p}
                </li>
              ))}
            </ul>
            <figure className="gabon__second" data-reveal>
              <div className="gabon__frame">
                <img
                  src={bordDeMer720}
                  srcSet={`${bordDeMer720} 720w, ${bordDeMer} 1280w`}
                  sizes="(min-width: 960px) 30vw, 100vw"
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  alt="Libreville vue du ciel : la ville et ses quartiers s'étendent le long du littoral."
                />
              </div>
              <figcaption>Bord de mer, Libreville. Photographie : Shirmy25, CC BY-SA 4.0, Wikimedia Commons.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
