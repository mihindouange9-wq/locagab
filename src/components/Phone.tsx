import type { CSSProperties } from "react";
import type { ScreenId } from "../content/site";
import { Screen } from "./Screens";
import "./phone.css";

type Props = {
  /** Un écran, ou plusieurs empilés dont un seul est visible. */
  screens: ScreenId[];
  active?: number;
  /** Échelle de l'appareil (1 = 300 × 620 px). */
  scale?: number;
  className?: string;
  /** Décrit l'appareil pour les lecteurs d'écran ; sinon il est décoratif. */
  label?: string;
};

/** iPhone dessiné en CSS ; l'écran est une vraie interface HTML, pas une image. */
export default function Phone({ screens, active = 0, scale, className, label }: Props) {
  const style = scale ? ({ "--z": scale } as CSSProperties) : undefined;
  return (
    <div
      className={`phone ${className ?? ""}`}
      style={style}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div className="phone__screen">
        <span className="phone__island" />
        {screens.map((id, i) => (
          <div key={id} className={`phone__layer ${i === active ? "is-active" : ""}`} inert>
            <Screen id={id} />
          </div>
        ))}
        <span className="phone__home" />
      </div>
    </div>
  );
}
