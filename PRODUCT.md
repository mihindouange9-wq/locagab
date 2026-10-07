# Product

<!-- impeccable:product-schema 1 -->

Source: the client's written brief of 2026-10-06 (28 sections). No interview round was run; every fact below is taken from that brief, and open points are listed as undecided rather than filled in.

## Platform

web

## Stack

Recommended by the brief: React, Vite, TypeScript, modern CSS, GSAP + ScrollTrigger, Lucide icons, reusable components. Tailwind was offered as an option and not taken: its native binary is blocked on the development machine, and plain CSS with custom properties covers the need.

## Users

- **People looking for housing in Gabon** (tenants first): they search today across WhatsApp groups, Facebook, word of mouth and agencies, and cannot tell which listings are real or still available.
- **Owners and agencies** with a property to rent: they want to present it properly and receive requests from people who are really interested.
- Secondary readers of the website: investors, partners, agencies, media.

Market: Gabon, starting from Libreville (Akanda, Owendo), then the whole territory. Interface language: French. Currency: franc CFA (FCFA).

## Product Purpose

LOCAGAB is a **mobile application** for finding housing in Gabon. The website is not a property portal: it is the product site that presents, explains and promotes the app and leads to its download. Success for the site: a visitor understands within five seconds that this is a mobile app for finding housing in Gabon, trusts it, and goes to download it.

## Positioning

« Une nouvelle façon de trouver son logement au Gabon. » Signature: **« Trouvez votre logement, simplement. »** Three values: simplicité, confiance, rapidité. The differentiating mechanism is verification: the LOCAGAB Trust Score (identity, phone, location, property, recent availability) and the visible availability status of each listing.

## Operating Context

The search for housing happens on a phone. Problems named by the brief: unreliable listings, properties already rented but still advertised, incomplete information, too few photos, fake owners, unclear prices, difficulty comparing, offers scattered across channels.

## Capabilities and Constraints

App capabilities to present (and no others): search by city and district, budget filter, property types (apartment, house, studio, others), photos and videos, map view, direct contact with the owner or agency, favourites, alerts, verified profiles, availability status, trust and verification system, visit request, listing publication and request management for owners.

Hard constraints from the brief:
- The site must never become a marketplace: no listings page, no dominant search bar.
- No invented features, no lorem ipsum, no generic filler copy.
- Listings, names and messages shown inside the phone screens are demonstration content and are labelled as such.

Undecided (not provided): store URLs and release date, social network URLs, contact address, legal texts, pricing of the app for owners or tenants, exact city coverage at launch.

## Brand Commitments

- Name LOCAGAB; official logo supplied (`logo.png`): a house combined with a location pin; wordmark LOCAGAB (LOCA dark, GAB green). Never distorted.
- Palette (binding): Deep Forest #073B32, LOCAGAB Green #18A957, Warm Ivory #F7F5EF, Charcoal #17211F. Approximate ratio 45 % ivory, 25 % white surfaces, 20 % deep green, 7 % LOCAGAB green, 3 % secondary accents. Never the Gabonese flag colours used literally.
- Typography (binding): Manrope (or Inter); labels in uppercase with slight letter-spacing; no decorative face.
- Gabonese by context, not by cliché: architecture, urban landscape, Libreville, Akanda, Owendo.
- Explicit bans: excessive gradients, gratuitous 3D, clichéd animation, floating cards everywhere, cartoon illustration, oversized generic icons, interchangeable SaaS look, loud colours, overloaded interfaces, emojis, too much green.
- iPhone mockups are central and their screens are built in HTML/CSS/React, not flattened images.

## Evidence on Hand

- The logo. Nothing else.
- No live app, no user figures, no testimonials, no partners, no press. None may be invented. Sample values given by the brief and usable as demonstration: « Appartement moderne à Libreville », 450 000 FCFA / mois, 2 chambres, 2 salles de bain, 120 m², « 95 % — Vérifié ».

## Product Principles

1. Application first: the site sells the experience of the app, never a web search.
2. Trust is shown through what is verified, not claimed.
3. Go straight to the essential: one idea per section, one primary action.
4. Anchored in Gabon by places and reality, not by symbols.

## Accessibility & Inclusion

WCAG 2.1 AA: contrast, visible focus, keyboard navigation, alt text, `prefers-reduced-motion` path. Must stay fast on mid-range Android phones and slow networks.
