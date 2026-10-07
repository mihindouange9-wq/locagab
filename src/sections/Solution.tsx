import { useEffect, useRef, useState } from "react";
import { BadgeCheck, CalendarCheck, Heart, Map as MapIcon, MessageCircle, Search } from "lucide-react";
import Phone from "../components/Phone";
import { FEATURES } from "../content/site";
import { prefersReducedMotion } from "../lib/motion";
import "./solution.css";

const ICONS = [Search, MapIcon, BadgeCheck, CalendarCheck, MessageCircle, Heart];
const SCREENS = FEATURES.map((f) => f.screen);

export default function Solution() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);

  // La démonstration tourne seule tant que la section est à l'écran et que personne n'y a touché
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(root.current!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || prefersReducedMotion()) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % FEATURES.length), 4200);
    return () => window.clearInterval(id);
  }, [auto, visible]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const feature = (i: number) => {
    const f = FEATURES[i];
    const Icon = ICONS[i];
    return (
      <button
        key={f.id}
        type="button"
        role="tab"
        id={`fonction-${f.id}`}
        aria-selected={active === i}
        aria-controls="fonction-ecran"
        tabIndex={active === i ? 0 : -1}
        className={`feature ${active === i ? "is-active" : ""}`}
        onClick={() => select(i)}
        onKeyDown={(e) => {
          const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
          if (!step) return;
          e.preventDefault();
          const next = (i + step + FEATURES.length) % FEATURES.length;
          select(next);
          document.getElementById(`fonction-${FEATURES[next].id}`)?.focus();
        }}
      >
        <span className="feature__icon">
          <Icon size={20} strokeWidth={1.9} />
        </span>
        <span className="feature__text">
          <strong>{f.title}</strong>
          <span>{f.text}</span>
        </span>
      </button>
    );
  };

  return (
    <section id="fonctionnalites" className="section solution" data-tone="white" ref={root}>
      <div className="container">
        <header className="solution__head">
          <h2 data-title>Tout ce dont vous avez besoin, au même endroit.</h2>
        </header>

        <div className="solution__stage" role="tablist" aria-label="Fonctionnalités de l'application" aria-orientation="vertical">
          <div className="solution__col">{[0, 1, 2].map(feature)}</div>
          <div
            className="solution__phone"
            id="fonction-ecran"
            role="tabpanel"
            aria-labelledby={`fonction-${FEATURES[active].id}`}
            data-reveal
          >
            <Phone screens={SCREENS} active={active} label={`Écran de l'application : ${FEATURES[active].title}`} />
          </div>
          <div className="solution__col">{[3, 4, 5].map(feature)}</div>
        </div>

        {/* sur mobile, le texte de la fonctionnalité choisie s'affiche sous l'appareil */}
        <p className="solution__current" aria-hidden="true">
          <strong>{FEATURES[active].title}</strong>
          {FEATURES[active].text}
        </p>
      </div>
    </section>
  );
}
