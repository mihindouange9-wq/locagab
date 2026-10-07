import { useEffect, useState } from "react";
import { Logo } from "../brand/Logo";
import { NAV } from "../content/site";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [current, setCurrent] = useState("#accueil");

  // Au défilement : la barre prend un fond, et la rubrique en cours est la dernière section
  // dont le haut a passé le tiers supérieur de l'écran.
  useEffect(() => {
    const targets = NAV.map((n) => document.querySelector<HTMLElement>(n.href)).filter((el) => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      setSolid(window.scrollY > 16);
      const line = window.innerHeight * 0.35;
      let last = targets[0];
      let best = -Infinity;
      for (const el of targets) {
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > best) {
          best = top;
          last = el;
        }
      }
      if (last) setCurrent("#" + last.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Menu mobile : pas de défilement derrière, fermeture au clavier
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`header ${solid || open ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__bar">
        <a className="header__logo" href="#accueil" aria-label="LOCAGAB, retour à l'accueil" onClick={() => setOpen(false)}>
          <Logo title="" />
        </a>
        <nav className="header__nav" aria-label="Navigation principale">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} aria-current={current === n.href ? "true" : undefined}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--small header__cta" href="#telecharger" onClick={() => setOpen(false)}>
          <span>
            Télécharger<span className="header__cta-more"> l'application</span>
          </span>
        </a>
        <button
          className="header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <i />
          <i />
        </button>
      </div>
      <nav id="menu-mobile" className="header__sheet" aria-label="Menu" hidden={!open}>
        <div className="container">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
