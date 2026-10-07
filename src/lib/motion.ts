import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Grammaire de mouvement de LOCAGAB : lent, exact, sans rebond.
gsap.defaults({ ease: "power3.out", duration: 1.1 });

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Révélations communes à toute la page, déclenchées une seule fois à l'entrée dans l'écran :
 * `data-title` (titres, ligne par ligne) et `data-reveal` (blocs, montée courte).
 * Le contenu reste visible sans JavaScript et en mouvement réduit.
 */
export function setupReveals(scope: HTMLElement) {
  if (prefersReducedMotion()) return;

  // Titres : la découpe en lignes mesure la mise en page, ce qui coûte cher au chargement.
  // Chaque titre n'est donc découpé qu'à l'approche de l'écran, puis animé aussitôt.
  const titles = gsap.utils.toArray<HTMLElement>("[data-title]", scope);
  const splits: SplitText[] = [];
  const titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        titleObserver.unobserve(el);
        splits.push(
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 108,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          }),
        );
      });
    },
    // la découpe précède l'arrivée du titre d'un tiers d'écran : l'animation part toujours de l'état masqué
    { rootMargin: "35% 0px 35% 0px" },
  );
  titles.forEach((el) => titleObserver.observe(el));

  // Blocs : un observateur d'intersection, fiable même quand on saute à une section par un lien
  const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
  gsap.set(blocks, { autoAlpha: 0, y: 26 });
  const observer = new IntersectionObserver(
    (entries) => {
      const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target);
      if (!seen.length) return;
      seen.forEach((el) => observer.unobserve(el));
      gsap.to(seen, { autoAlpha: 1, y: 0, stagger: 0.08, overwrite: true });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  blocks.forEach((el) => observer.observe(el));

  return () => {
    titleObserver.disconnect();
    observer.disconnect();
    splits.forEach((s) => s.revert());
  };
}

export { gsap, ScrollTrigger, useGSAP };
