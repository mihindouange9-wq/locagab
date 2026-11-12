import { useRef } from "react";
import { ScrollTrigger, setupReveals, useGSAP } from "./lib/motion";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Problem from "./sections/Problem";
import Solution from "./sections/Solution";
import Trust from "./sections/Trust";
import HowItWorks from "./sections/HowItWorks";
import Showcase from "./sections/Showcase";
import Owners from "./sections/Owners";
import Why from "./sections/Why";
import Gabon from "./sections/Gabon";
import Faq from "./sections/Faq";
import Download from "./sections/Download";
import Footer from "./sections/Footer";

export default function App() {
  const main = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stop = setupReveals(main.current!);
      // les polices et les images déplacent les sections : on recalcule les déclencheurs une fois tout chargé
      // Arrivée par une adresse avec ancre (…/#faq) : la page est montée après la tentative du navigateur,
      // on rejoint donc la section nous-mêmes, tant que la personne n'a pas commencé à défiler.
      let touched = false;
      const touch = () => (touched = true);
      const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      events.forEach((e) => window.addEventListener(e, touch, { once: true, passive: true }));
      const toHash = () => {
        if (touched || location.hash.length < 2) return;
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      };
      const refresh = () => {
        ScrollTrigger.refresh();
        toHash();
      };
      toHash();
      document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => {
        stop?.();
        window.removeEventListener("load", refresh);
        events.forEach((e) => window.removeEventListener(e, touch));
      };
    },
    { scope: main },
  );

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" ref={main}>
        <Hero />
        <Problem />
        <Solution />
        <Trust />
        <HowItWorks />
        <Showcase />
        <Owners />
        <Why />
        <Gabon />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
