import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import Phone from "../components/Phone";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/motion";
import "./hero.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Entrée : le titre se pose ligne par ligne, puis les trois appareils montent sur leur axe
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero__label", { autoAlpha: 0, y: 14, duration: 0.9 }, 0.1)
        .from(".hero__line > span", { yPercent: 108, duration: 1.25, stagger: 0.1 }, 0.15)
        .from(".hero__lead, .hero__actions", { autoAlpha: 0, y: 18, duration: 1, stagger: 0.1 }, 0.65)
        .from(".hero__rings", { autoAlpha: 0, scale: 0.92, duration: 1.6 }, 0.3)
        .from(".hero__phone--center", { autoAlpha: 0, y: 70, duration: 1.5 }, 0.35)
        .from(".hero__phone--left, .hero__phone--right", { autoAlpha: 0, y: 110, duration: 1.6, stagger: 0.12 }, 0.5)
        .from(".hero__note", { autoAlpha: 0, y: 10, duration: 0.9, stagger: 0.15 }, 1.5);

      // Défilement : parallaxe très légère, les appareils latéraux glissent un peu plus que le central
      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(".hero__phone--center .hero__float", { y: -20, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero__phone--left .hero__float, .hero__phone--right .hero__float", { y: -60, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero__rings", { y: 40, ease: "none", scrollTrigger: scrub });
    },
    { scope: root },
  );

  return (
    <section id="accueil" className="hero" ref={root}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="label hero__label">
            <i className="ring" />
            L'application immobilière du Gabon
          </p>
          <h1 className="hero__title">
            <span className="hero__line">
              <span>Trouvez votre</span>
            </span>{" "}
            <span className="hero__line">
              <span>logement,</span>
            </span>{" "}
            <span className="hero__line hero__line--accent">
              <span>simplement.</span>
            </span>
          </h1>
          <p className="lead hero__lead">
            LOCAGAB vous aide à trouver, comparer et contacter des propriétaires et agences en toute confiance.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#telecharger">
              Télécharger l'application
            </a>
            <a className="link-arrow" href="#probleme">
              <span>Découvrir LOCAGAB</span>
              <ArrowDown />
            </a>
          </div>
        </div>

        <div
          className="hero__stage"
          role="img"
          aria-label="Trois iPhone affichent l'application LOCAGAB : l'accueil avec un appartement disponible à Libreville, la carte des logements et une fiche d'annonce vérifiée."
        >
          <span className="hero__rings" />
          <div className="hero__phone hero__phone--left">
            <div className="hero__float">
              <p className="label hero__note">
                <i className="ring" />
                Carte interactive
              </p>
              <Phone screens={["map"]} />
            </div>
          </div>
          <div className="hero__phone hero__phone--right">
            <div className="hero__float">
              <p className="label hero__note">
                <i className="ring" />
                Annonce vérifiée
              </p>
              <Phone screens={["listing"]} />
            </div>
          </div>
          <div className="hero__phone hero__phone--center">
            <div className="hero__float">
              <Phone screens={["home"]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
