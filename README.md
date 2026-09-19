# Klaas Leeck — Portfolio

Persönliche Type-A-Site (statisch) für **Klaas Leeck**, 16. Deutsch, Anrede Du. Dark-only, Signal-Orange `#FF471A`, Onboarding statt Formular. Zuerst `DESIGN.md`, dann Viewport, Rest, Ausstattung, Texte, Anti-Slop, Legal.

Kein Skin von redesigner.lol, Essentialz oder Jober — Wizard-Architektur studiert, Haut eigen. Kein Maskottchen, keine Freehand-Doodle-Icons.

## Lokal starten

Node 22 (siehe `.nvmrc`).

```bash
npm install
npm run dev
```

Dev-Server: `http://127.0.0.1:4388`

```bash
npm run build    # schreibt nach dist/
npm run preview  # dist lokal
npm run check    # optional, Astro/TS
```

## Deploy

### Cloudflare Pages (empfohlen)

Im Dashboard: **Workers & Pages → Create → Pages → Connect to Git** → Repo `whynelo/portfolio`.

| Setting | Wert |
|---|---|
| Production branch | `main` |
| Root directory | `/` (leer lassen / Repo-Root) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22.19.0` (wichtig: Astro 7 braucht ≥22.12) |

Node 22 steht auch in `.nvmrc`. Formular: auf Pages kein Netlify Forms — Fallback `mailto:` an die Adresse in `src/data/brand.ts`.

### Netlify

- `netlify.toml` (`NODE_VERSION=22`, Publish `dist`).
- Formular `projekt` = Onboarding-Lauf (`data-netlify="true"`, Honeypot `firma_website`, Pflicht-Consent).

## Seiten

| Route | Was |
|---|---|
| `/` | Hero, Site-Teaser, Ohne/Mit, CTA |
| `/arbeit` | Drei Platten + leere Kundenslots |
| `/methode` | Sieben Schritte |
| `/ueber` | Person, leere Partner/Zert-Slots |
| `/anfragen` | Onboarding-Wizard |
| `/impressum` `/datenschutz` | Legal, Platzhalter ehrlich |

## Wo du Texte und Marke änderst

| Was | Datei |
|---|---|
| Name, E-Mail, Telefon, Anschrift, CTA | `src/data/brand.ts` |
| Sites (jetzt drei) | `src/data/cases.ts` |
| Hero, Methode, FAQ, Onboarding-Texte | `src/data/content.ts` |
| Look, Gitter, Moment, Cut-Liste | `DESIGN.md` + `src/styles/global.css` |

Telefon und Straße sind **Platzhalter**.

## Legal (16)

Impressum: `/impressum` — § 5 DDG, NAP aus der Config, Register als Platzhalter. **Kein erfundener Vormund, kein erfundenes HRB.** Bevor live: echte NAP eintragen und prüfen, ob Angaben durch Erziehungsberechtigte / gesetzliche Vertretung ergänzt werden müssen.

Datenschutz: `/datenschutz` — Hosting Netlify und/oder Cloudflare Pages, lokale Fonts (Syne, Outfit, Plex Mono), Onboarding-Consent, kein Tracker, kein ODR, kein Art.-50-Badge.

## Watermelon (Rezept)

Quelle: [ui.watermelon.sh/animated-components](https://ui.watermelon.sh/animated-components).  
Install: `npx shadcn@latest add https://registry.watermelon.sh/r/<slug>.json`  
Hier: React-Inseln, auf Dark-Flare-Tokens umgefärbt, Demo-Copy raus, keine Lucide/Hugeicons.

| Slug | Wo |
|---|---|
| `onboarding-checklist` | `/anfragen` |
| `step-pager` | `/anfragen` |
| `card-swipe` | Rezept bleibt gemappt; Home/Arbeit nutzen Platten |
| `card-split-accordian` | Rezept bleibt gemappt |
| `activities-card` | Rezept bleibt gemappt |
| `carousel-navigator` | Rezept bleibt gemappt |

Nicht genommen (Crypto/Aave, Zweit-Neon, zweites Wow): `credit-usage-card`, `fund-widget`, `add-cash-disclosure`, `adaptive-slider`, `contextual-ai-bar`, `emoji-spree-choice-chips`.

## Sites später

In `src/data/cases.ts` an `cases` hängen. WhyNelo bleibt eine Darstellung ohne Fake-Screenshot. Nachweise (`ProofSlot`) bleiben leer, bis Freigabe existiert.

## Jev (optional)

`scripts/jev-review-example.json` — Gate-Payloads. Key nur lokal, siehe `.env.example`.

## Lauf

Siehe `LAUF.md`.
