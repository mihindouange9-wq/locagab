import { SYMBOL, WORDMARK } from "./logoPaths";

type Tone = "light" | "dark";

// Couleurs officielles : sur fond clair, vert profond et vert LOCAGAB ; sur fond sombre, ivoire et vert LOCAGAB.
const INK: Record<Tone, string> = { light: "#073B32", dark: "#F7F5EF" };
const GREEN = "#18A957";

function part(box: readonly [number, number, number, number], x: number, y: number, height: number) {
  const s = height / box[3];
  return { width: box[2] * s, transform: `translate(${x - box[0] * s} ${y - box[1] * s}) scale(${s})` };
}

type Props = { tone?: Tone; className?: string; title?: string };

/** Symbole seul : la maison et son repère. */
export function LogoSymbol({ tone = "light", className, title }: Props) {
  const p = part(SYMBOL.box, 0, 0, 100);
  return (
    <svg
      className={className}
      viewBox={`0 0 ${p.width.toFixed(2)} 100`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g transform={p.transform}>
        <path fill={INK[tone]} fillRule="evenodd" d={SYMBOL.house} />
        <path fill={GREEN} fillRule="evenodd" d={SYMBOL.pin} />
      </g>
    </svg>
  );
}

/** Logo horizontal : symbole et mot-symbole, proportions fixes. */
export function Logo({ tone = "light", className, title = "LOCAGAB" }: Props) {
  const s = part(SYMBOL.box, 0, 0, 100);
  const w = part(WORDMARK.box, s.width + 24, 31, 40);
  return (
    <svg className={className} viewBox={`0 0 ${(s.width + 24 + w.width).toFixed(2)} 100`} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true}>
      <g transform={s.transform}>
        <path fill={INK[tone]} fillRule="evenodd" d={SYMBOL.house} />
        <path fill={GREEN} fillRule="evenodd" d={SYMBOL.pin} />
      </g>
      <g transform={w.transform}>
        <path fill={INK[tone]} fillRule="evenodd" d={WORDMARK.loca} />
        <path fill={GREEN} fillRule="evenodd" d={WORDMARK.gab} />
      </g>
    </svg>
  );
}

/** Logo vertical : symbole au-dessus du mot-symbole. */
export function LogoStacked({ tone = "light", className, title = "LOCAGAB" }: Props) {
  const wordHeight = 34;
  const wordWidth = (WORDMARK.box[2] / WORDMARK.box[3]) * wordHeight;
  const symbolWidth = (SYMBOL.box[2] / SYMBOL.box[3]) * 100;
  const s = part(SYMBOL.box, (wordWidth - symbolWidth) / 2, 0, 100);
  const w = part(WORDMARK.box, 0, 120, wordHeight);
  return (
    <svg className={className} viewBox={`0 0 ${wordWidth.toFixed(2)} ${120 + wordHeight}`} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true}>
      <g transform={s.transform}>
        <path fill={INK[tone]} fillRule="evenodd" d={SYMBOL.house} />
        <path fill={GREEN} fillRule="evenodd" d={SYMBOL.pin} />
      </g>
      <g transform={w.transform}>
        <path fill={INK[tone]} fillRule="evenodd" d={WORDMARK.loca} />
        <path fill={GREEN} fillRule="evenodd" d={WORDMARK.gab} />
      </g>
    </svg>
  );
}
