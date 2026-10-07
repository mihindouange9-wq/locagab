import type { ReactNode } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Bell,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  House,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Plus,
  Ruler,
  Search,
  Send,
  Share2,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import { LogoStacked, LogoSymbol } from "../brand/Logo";
import { LISTINGS, MAIN, OWNER, PHOTOS, type Listing } from "../content/demo";
import type { ScreenId } from "../content/site";

/* ───────────── Éléments communs de l'application ───────────── */

function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className={`app-status app-status--${tone}`}>
      <span>9:41</span>
      <span className="app-status__icons">
        <svg viewBox="0 0 18 12" width="16" height="11">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg viewBox="0 0 26 12" width="23" height="11">
          <rect x="0.6" y="0.6" width="21.8" height="10.8" rx="3.2" fill="none" stroke="currentColor" opacity="0.4" />
          <rect x="2.2" y="2.2" width="18.6" height="7.6" rx="1.8" />
          <rect x="23.6" y="4" width="1.8" height="4" rx="0.9" opacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

const TABS = [
  { id: "home", label: "Accueil", Icon: House },
  { id: "map", label: "Carte", Icon: MapIcon },
  { id: "favorites", label: "Favoris", Icon: Heart },
  { id: "messages", label: "Messages", Icon: MessageCircle },
  { id: "profile", label: "Profil", Icon: UserRound },
] as const;

function TabBar({ active }: { active: (typeof TABS)[number]["id"] }) {
  return (
    <div className="app-tabs">
      {TABS.map(({ id, label, Icon }) => (
        <span key={id} className={`app-tab ${id === active ? "is-active" : ""}`}>
          <Icon size={17} strokeWidth={id === active ? 2.3 : 1.8} />
          {label}
        </span>
      ))}
    </div>
  );
}

function Available({ on = true }: { on?: boolean }) {
  return on ? (
    <span className="app-badge app-badge--available">
      <i className="app-dot" />
      Disponible maintenant
    </span>
  ) : (
    <span className="app-badge app-badge--off">Déjà loué</span>
  );
}

function Verified({ short }: { short?: boolean }) {
  return (
    <span className="app-badge app-badge--verified">
      <i className="app-seal">
        <Check size={8} strokeWidth={3.5} />
      </i>
      {short ? "Vérifiée" : "Annonce vérifiée"}
    </span>
  );
}

function Specs({ l }: { l: Listing }) {
  return (
    <p className="app-specs">
      <span>{l.rooms}</span>
      <span>{l.baths}</span>
      <span>{l.area}</span>
    </p>
  );
}

function Price({ value }: { value: string }) {
  return (
    <p className="app-price">
      {value} <small>/ mois</small>
    </p>
  );
}

function Shell({ children, tab }: { children: ReactNode; tab?: (typeof TABS)[number]["id"] }) {
  return (
    <div className="app">
      <StatusBar />
      <div className="app-body">{children}</div>
      {tab && <TabBar active={tab} />}
    </div>
  );
}

/* ───────────── Écran 1 — Accueil ───────────── */

function HomeScreen() {
  const next = LISTINGS[1];
  return (
    <Shell tab="home">
      <div className="app-top">
        <span className="app-brand">
          <LogoSymbol className="app-brand__symbol" />
          LOCAGAB
        </span>
        <span className="app-round">
          <Bell size={15} />
        </span>
      </div>
      <div className="app-search">
        <Search size={15} />
        Que recherchez-vous ?
      </div>
      <div className="app-where">
        <MapPin size={14} />
        <strong>Libreville</strong>
        <ChevronDown size={14} />
      </div>
      <div className="app-chips">
        <span className="app-chip is-active">Appartement</span>
        <span className="app-chip">Maison</span>
        <span className="app-chip">Studio</span>
      </div>
      <div className="app-heading">
        <strong>Sélection</strong>
        <span>Voir tout</span>
      </div>
      <div className="app-card">
        <div className="app-card__photo">
          <img src={MAIN.photo} alt="" width="900" height="610" fetchPriority="high" />
          <Available />
          <span className="app-heart">
            <Heart size={14} />
          </span>
        </div>
        <div className="app-card__text">
          <strong>{MAIN.title}</strong>
          <Price value={MAIN.price} />
          <Specs l={MAIN} />
        </div>
      </div>
      <div className="app-card app-card--peek">
        <div className="app-card__photo">
          <img src={next.photo} alt="" width="900" height="580" loading="lazy" />
        </div>
      </div>
    </Shell>
  );
}

/* ───────────── Écran 2 — Carte ───────────── */

const MARKERS = [
  { l: LISTINGS[1], x: 64, y: 21 },
  { l: LISTINGS[4], x: 47, y: 31 },
  { l: LISTINGS[0], x: 56, y: 45, active: true },
  { l: LISTINGS[2], x: 49, y: 58 },
  { l: LISTINGS[3], x: 66, y: 71 },
];

function MapScreen() {
  return (
    <div className="app app--map">
      {/* Libreville : le littoral de l'estuaire d'abord, les voies et les quartiers ensuite */}
      <svg className="app-map" viewBox="0 0 282 600" preserveAspectRatio="xMidYMid slice">
        <rect width="282" height="600" fill="#d9e8e3" />
        <path
          d="M118 0C104 46 78 86 84 132c5 40 34 66 38 104 4 36-22 62-18 100 4 40 40 62 46 104 5 36-14 66-6 160h144V0z"
          fill="#f4f1e9"
        />
        <path d="M196 0c-8 40 22 70 14 112-7 36-40 50-44 84" fill="none" stroke="#e3ebd9" strokeWidth="26" strokeLinecap="round" />
        <g fill="none" stroke="#fff" strokeLinecap="round">
          <path d="M134 0c-14 46-38 86-32 130 6 40 34 64 38 104 4 36-22 62-18 100 4 40 40 62 46 104 5 34-12 66-6 162" strokeWidth="7" />
          <path d="M104 132c60-10 110 8 178 0M140 236c50 12 96-6 142 10M122 336c56 14 104-10 160 6M168 440c40-12 76 6 114-4" strokeWidth="5" />
          <path d="M210 0c-10 90 24 150 4 236s20 150 6 204 10 110 2 160" strokeWidth="5" />
          <path d="M160 60c30 20 70 16 122 30M150 290c40-18 86-8 132-24M176 520c36-10 70 0 106-10" strokeWidth="3" />
        </g>
        <g fill="#7b8a85" fontSize="8.5" fontWeight="600" letterSpacing="0.4">
          <text x="206" y="66">AKANDA</text>
          <text x="150" y="210">Louis</text>
          <text x="226" y="262">Nzeng-Ayong</text>
          <text x="148" y="318">Centre-ville</text>
          <text x="134" y="398">Glass</text>
          <text x="212" y="486">OWENDO</text>
        </g>
        <text x="22" y="300" fill="#8fb0a7" fontSize="8.5" fontWeight="600" letterSpacing="1.2" transform="rotate(-90 22 300)">
          ESTUAIRE DU GABON
        </text>
      </svg>
      <StatusBar />
      <div className="app-map__top">
        <span className="app-search app-search--float">
          <Search size={15} />
          Libreville
        </span>
        <span className="app-round app-round--float">
          <SlidersHorizontal size={15} />
        </span>
      </div>
      {MARKERS.map((m) => (
        <span
          key={m.l.id}
          className={`app-marker ${m.active ? "is-active" : ""}`}
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          {m.l.short}
        </span>
      ))}
      <div className="app-sheet">
        <img src={MAIN.photo} alt="" width="900" height="610" />
        <div>
          <strong>{MAIN.title}</strong>
          <Price value={MAIN.price} />
          <Verified short />
        </div>
      </div>
      <TabBar active="map" />
    </div>
  );
}

/* ───────────── Écran 3 — Fiche logement ───────────── */

function ListingScreen() {
  return (
    <div className="app app--listing">
      <div className="app-hero">
        <img src={MAIN.photo} alt={MAIN.alt} width="900" height="610" />
        <StatusBar tone="light" />
        <div className="app-hero__bar">
          <span className="app-round app-round--float">
            <ArrowLeft size={15} />
          </span>
          <span className="app-hero__actions">
            <span className="app-round app-round--float">
              <Share2 size={14} />
            </span>
            <span className="app-round app-round--float">
              <Heart size={14} />
            </span>
          </span>
        </div>
        <span className="app-count">1 / 12</span>
      </div>
      <div className="app-body app-body--sheet">
        <div className="app-row">
          <Verified />
          <Available />
        </div>
        <strong className="app-title">{MAIN.title}</strong>
        <p className="app-place">
          <MapPin size={12} />
          {MAIN.place}
          <span className="app-ref-no">Réf. LBV-2041 · vérifiée le 3 oct.</span>
        </p>
        <Price value={MAIN.price} />
        <div className="app-facts">
          <span>
            <BedDouble size={15} />
            {MAIN.rooms}
          </span>
          <span>
            <Bath size={15} />
            {MAIN.baths}
          </span>
          <span>
            <Ruler size={15} />
            {MAIN.area}
          </span>
        </div>
        <div className="app-trust">
          <span>
            Trust Score
            <strong>95 %</strong>
          </span>
          <i>
            <b />
            <b />
            <b />
            <b />
            <b />
          </i>
        </div>
        <div className="app-owner">
          <span className="app-avatar">{OWNER.initials}</span>
          <span>
            <strong>{OWNER.name}</strong>
            <small>Identité vérifiée</small>
          </span>
          <ChevronRight size={15} />
        </div>
      </div>
      <div className="app-cta">
        <span className="app-btn">Demander une visite</span>
      </div>
    </div>
  );
}

/* ───────────── Filtres ───────────── */

function FiltersScreen() {
  return (
    <Shell>
      <div className="app-top">
        <span className="app-round">
          <ArrowLeft size={15} />
        </span>
        <strong className="app-screen-title">Filtres</strong>
        <span className="app-link">Effacer</span>
      </div>
      <div className="app-field">
        <small>Ville</small>
        <span className="app-select">
          <MapPin size={14} />
          Libreville
          <ChevronDown size={14} />
        </span>
      </div>
      <div className="app-field">
        <small>Quartier</small>
        <div className="app-chips app-chips--wrap">
          <span className="app-chip is-active">Louis</span>
          <span className="app-chip">Glass</span>
          <span className="app-chip is-active">Batterie IV</span>
          <span className="app-chip">Akanda</span>
          <span className="app-chip">Owendo</span>
        </div>
      </div>
      <div className="app-field">
        <small>Budget mensuel</small>
        <strong className="app-range__value">150 000 – 500 000 FCFA</strong>
        <div className="app-range">
          <i />
          <b style={{ left: "18%" }} />
          <b style={{ left: "64%" }} />
        </div>
      </div>
      <div className="app-field">
        <small>Type de bien</small>
        <div className="app-chips">
          <span className="app-chip is-active">Appartement</span>
          <span className="app-chip">Maison</span>
          <span className="app-chip">Studio</span>
        </div>
      </div>
      <div className="app-field">
        <small>Chambres</small>
        <div className="app-steps">
          <span>1</span>
          <span className="is-active">2</span>
          <span>3</span>
          <span>4+</span>
        </div>
      </div>
      <div className="app-toggle">
        Disponible maintenant
        <i className="is-on" />
      </div>
      <div className="app-toggle">
        Annonces vérifiées uniquement
        <i className="is-on" />
      </div>
      <span className="app-btn app-btn--bottom">Voir les logements</span>
    </Shell>
  );
}

/* ───────────── Résultats ───────────── */

function ResultRow({ l }: { l: Listing }) {
  return (
    <div className="app-result">
      <img src={l.photo} alt="" width="900" height="610" loading="lazy" />
      <div>
        <strong>{l.title}</strong>
        <Price value={l.price} />
        <Specs l={l} />
        <div className="app-row">
          {l.verified && <Verified short />}
          <Available on={l.available} />
        </div>
      </div>
    </div>
  );
}

function ResultsScreen() {
  return (
    <Shell tab="home">
      <div className="app-top">
        <span className="app-round">
          <ArrowLeft size={15} />
        </span>
        <span className="app-search app-search--inline">
          <Search size={14} />
          Libreville · 2 chambres
        </span>
        <span className="app-round">
          <SlidersHorizontal size={15} />
        </span>
      </div>
      <div className="app-heading">
        <strong>Résultats</strong>
        <span>Prix croissant</span>
      </div>
      <ResultRow l={LISTINGS[3]} />
      <ResultRow l={LISTINGS[0]} />
      <ResultRow l={LISTINGS[4]} />
    </Shell>
  );
}

/* ───────────── Profil propriétaire ───────────── */

function OwnerScreen() {
  return (
    <Shell>
      <div className="app-top">
        <span className="app-round">
          <ArrowLeft size={15} />
        </span>
        <strong className="app-screen-title">Profil</strong>
        <span className="app-round">
          <Share2 size={14} />
        </span>
      </div>
      <div className="app-profile">
        <span className="app-avatar app-avatar--lg">{OWNER.initials}</span>
        <strong>{OWNER.name}</strong>
        <small>{OWNER.role}</small>
      </div>
      <ul className="app-checks">
        <li>
          <i className="app-seal">
            <Check size={8} strokeWidth={3.5} />
          </i>
          Identité vérifiée
        </li>
        <li>
          <i className="app-seal">
            <Check size={8} strokeWidth={3.5} />
          </i>
          Téléphone vérifié
        </li>
      </ul>
      <div className="app-heading">
        <strong>Ses logements</strong>
        <span>2 annonces</span>
      </div>
      <div className="app-grid">
        {[LISTINGS[0], LISTINGS[2]].map((l) => (
          <div key={l.id} className="app-mini">
            <img src={l.photo} alt="" width="900" height="610" loading="lazy" />
            <strong>{l.place}</strong>
            <small>{l.price}</small>
          </div>
        ))}
      </div>
      <span className="app-btn app-btn--bottom">Envoyer un message</span>
    </Shell>
  );
}

/* ───────────── Favoris ───────────── */

function FavoritesScreen() {
  return (
    <Shell tab="favorites">
      <div className="app-top">
        <strong className="app-screen-title app-screen-title--left">Favoris</strong>
        <span className="app-round">
          <Bell size={15} />
        </span>
      </div>
      <div className="app-alert">
        <span>
          <strong>Alerte active</strong>
          <small>Appartement · Louis · jusqu'à 500 000 FCFA</small>
        </span>
        <i className="app-switch is-on" />
      </div>
      <div className="app-grid">
        {[LISTINGS[0], LISTINGS[1], LISTINGS[2], LISTINGS[4]].map((l) => (
          <div key={l.id} className="app-mini">
            <span className="app-mini__photo">
              <img src={l.photo} alt="" width="900" height="610" loading="lazy" />
              <span className="app-heart is-on">
                <Heart size={12} fill="currentColor" />
              </span>
            </span>
            <strong>{l.place}</strong>
            <small>{l.price}</small>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ───────────── Messagerie ───────────── */

function MessagesScreen() {
  return (
    <Shell>
      <div className="app-top app-top--chat">
        <span className="app-round">
          <ArrowLeft size={15} />
        </span>
        <span className="app-avatar">{OWNER.initials}</span>
        <span className="app-chat__who">
          <strong>{OWNER.name}</strong>
          <small>
            <i className="app-seal">
              <Check size={7} strokeWidth={3.5} />
            </i>
            Profil vérifié
          </small>
        </span>
      </div>
      <div className="app-ref">
        <img src={MAIN.photo} alt="" width="900" height="610" loading="lazy" />
        <span>
          <strong>{MAIN.title}</strong>
          <small>{MAIN.price} / mois</small>
        </span>
      </div>
      <p className="app-bubble app-bubble--me">Bonjour, l'appartement est-il toujours disponible ?</p>
      <p className="app-bubble">Bonjour, oui, il est disponible. Vous pouvez le visiter cette semaine.</p>
      <p className="app-bubble app-bubble--me">Parfait. Samedi matin, c'est possible ?</p>
      <div className="app-visit">
        <small>Demande de visite</small>
        <strong>Samedi, 10 h 00</strong>
        <span>
          <i className="app-dot" />
          Confirmée par le propriétaire
        </span>
      </div>
      <div className="app-input">
        Votre message
        <span>
          <Send size={13} />
        </span>
      </div>
    </Shell>
  );
}

/* ───────────── Publier un logement (propriétaire) ───────────── */

function PublishScreen() {
  return (
    <Shell>
      <div className="app-top">
        <span className="app-round">
          <ArrowLeft size={15} />
        </span>
        <strong className="app-screen-title">Nouvelle annonce</strong>
        <span className="app-link">Aperçu</span>
      </div>
      <div className="app-field">
        <small>Photos</small>
        <div className="app-photos">
          <img src={PHOTOS.salon} alt="" width="900" height="610" loading="lazy" />
          <img src={PHOTOS.chambre} alt="" width="900" height="600" loading="lazy" />
          <img src={PHOTOS.cuisine} alt="" width="900" height="600" loading="lazy" />
          <span>
            <Camera size={15} />
            Ajouter
          </span>
        </div>
      </div>
      <div className="app-field">
        <small>Type de bien</small>
        <span className="app-select">
          Appartement
          <ChevronDown size={14} />
        </span>
      </div>
      <div className="app-field">
        <small>Loyer mensuel</small>
        <span className="app-select">450 000 FCFA</span>
      </div>
      <div className="app-field">
        <small>Localisation</small>
        <span className="app-select">
          <MapPin size={14} />
          Louis, Libreville
          <ChevronRight size={14} />
        </span>
      </div>
      <div className="app-toggle">
        Disponible maintenant
        <i className="is-on" />
      </div>
      <div className="app-requests">
        <span>
          <strong>Demandes reçues</strong>
          <small>2 demandes de visite à traiter</small>
        </span>
        <ChevronRight size={15} />
      </div>
      <span className="app-btn app-btn--bottom">
        <Plus size={14} />
        Publier l'annonce
      </span>
    </Shell>
  );
}

/* ───────────── Écran d'ouverture ───────────── */

function SplashScreen() {
  return (
    <div className="app app--splash">
      <StatusBar tone="light" />
      <LogoStacked tone="dark" className="app-splash__logo" />
      <p>Trouvez votre logement, simplement.</p>
    </div>
  );
}

const SCREENS: Record<ScreenId, () => ReactNode> = {
  home: HomeScreen,
  map: MapScreen,
  listing: ListingScreen,
  filters: FiltersScreen,
  results: ResultsScreen,
  owner: OwnerScreen,
  favorites: FavoritesScreen,
  messages: MessagesScreen,
  publish: PublishScreen,
  splash: SplashScreen,
};

export function Screen({ id }: { id: ScreenId }) {
  const Component = SCREENS[id];
  return <Component />;
}
