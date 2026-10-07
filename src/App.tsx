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
      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => {
        stop?.();
        window.removeEventListener("load", refresh);
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
