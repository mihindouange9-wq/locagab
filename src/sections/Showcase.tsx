import { useRef } from "react";
import Phone from "../components/Phone";
import { SHOWCASE } from "../content/site";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/motion";
import "./showcase.css";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      // Les appareils se posent un à un à l'arrivée de la rangée
      gsap.from(".showcase__item", {
        autoAlpha: 0,
        y: 60,
        duration: 1.3,
        stagger: 0.09,
        scrollTrigger: { trigger: track.current, start: "top 82%", once: true },
      });

      // Ordinateur : la rangée glisse avec le défilement, sans épingler ni détourner la molette
      mm.add("(min-width: 960px) and (hover: hover)", () => {
        // course mesurée sur la disposition au repos : le dernier appareil s'arrête dans la marge de droite
        const distance = () => {
          const t = track.current!;
          const last = t.lastElementChild as HTMLElement;
          const padding = parseFloat(getComputedStyle(t).paddingRight);
          return Math.max(0, last.offsetLeft - t.offsetLeft + last.offsetWidth + padding - t.clientWidth);
        };
        gsap.to(".showcase__item", {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: track.current,
            start: "top 75%",
            end: "bottom 20%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="application" className="section showcase" data-tone="sand" ref={root}>
      <div className="container showcase__head">
        <h2 data-title>Votre recherche commence ici.</h2>
        <p className="lead" data-reveal>
          Recherche, filtres, carte, fiche, profil, favoris, messagerie : sept écrans, un seul parcours.
        </p>
      </div>
      <ul className="showcase__track" ref={track} tabIndex={0} aria-label="Écrans de l'application LOCAGAB">
        {SHOWCASE.map((s) => (
          <li key={s.screen} className="showcase__item">
            <Phone screens={[s.screen]} label={`Écran ${s.label} de l'application`} />
            <p className="label">
              <i className="ring" />
              {s.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
