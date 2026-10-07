import BrandIcon, { type BrandName } from "../components/BrandIcon";
import { Logo } from "../brand/Logo";
import { CONTACT_EMAIL, LEGAL, NAV, SITE, SOCIALS } from "../content/site";
import "./footer.css";

const SOCIAL_ICONS: Record<string, BrandName> = {
  Instagram: "instagram",
  Facebook: "facebook",
  LinkedIn: "linkedin",
  X: "x",
};

/** Un lien si l'adresse est connue ; sinon le libellé seul, sans faux lien. */
function Item({ label, href, icon }: { label: string; href: string; icon?: BrandName }) {
  const content = (
    <>
      {icon && <BrandIcon name={icon} />}
      {label}
    </>
  );
  return href ? (
    <a href={href} rel={href.startsWith("http") ? "noopener" : undefined}>
      {content}
    </a>
  ) : (
    <span>{content}</span>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="footer" data-tone="forest">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#accueil" aria-label="LOCAGAB, retour à l'accueil">
              <Logo tone="dark" title="" className="footer__logo" />
            </a>
            <p className="footer__signature">
              {SITE.name} — {SITE.signature}
            </p>
          </div>

          <nav className="footer__col" aria-label="Pied de page">
            <h2 className="label">Navigation</h2>
            <ul>
              {[...NAV, { label: "Contact", href: CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "#contact" }].map((n) => (
                <li key={n.href}>
                  <Item {...n} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="label">Réseaux</h2>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <Item {...s} icon={SOCIAL_ICONS[s.label]} />
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="label">Informations</h2>
            <ul>
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <Item {...l} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Le partenaire qui a conçu et réalisé le site : logo ivoire, tel que sa charte le fixe sur fond sombre. */}
        <p className="footer__partner">
          <span className="label">En partenariat avec</span>
          <img
            className="footer__partner-logo"
            src={`${import.meta.env.BASE_URL}partenaires/methode-aura.png`}
            alt="MÉTHODE AURA"
            width="800"
            height="246"
            loading="lazy"
            decoding="async"
          />
          <span className="footer__partner-note">Conception et réalisation du site</span>
        </p>

        <div className="footer__bottom">
          <p>
            © {SITE.year} {SITE.name}. Tous droits réservés.
          </p>
          <p>
            Les annonces, noms et messages affichés dans les écrans de l'application sont présentés à titre
            d'illustration.
          </p>
        </div>
      </div>
    </footer>
  );
}
