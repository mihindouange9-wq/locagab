import { useRef } from "react";
import Phone from "../components/Phone";
import StoreButtons from "../components/StoreButtons";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/motion";
import "./download.css";

export default function Download() {
  const root = useRef<HTMLElement>(null);

  // L'appareil monte sur l'axe de la page pendant que la section arrive
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".download__device .phone",
        { y: 90 },
        { y: 0, ease: "none", scrollTrigger: { trigger: ".download__device", start: "top bottom", end: "top 35%", scrub: 0.8 } },
      );
      gsap.fromTo(
        ".download__rings",
        { scale: 0.86 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".download__device", start: "top bottom", end: "top 30%", scrub: 0.8 } },
      );
    },
    { scope: root },
  );

  return (
    <section id="telecharger" className="section download" data-tone="forest" ref={root}>
      <div className="container download__inner">
        <h2 data-title>Votre prochain logement est peut-être déjà sur LOCAGAB.</h2>
        <p className="lead" data-reveal>
          Téléchargez l'application et commencez votre recherche.
        </p>
        <div data-reveal>
          <StoreButtons />
        </div>
        <div className="download__device">
          <span className="download__rings" />
          <Phone screens={["splash"]} label="iPhone affichant l'écran d'ouverture de LOCAGAB avec son logo" />
        </div>
      </div>
    </section>
  );
}
