# DESIGN.md — Klaas Leeck, persönliches Portfolio

**Mode:** 1 Improve-in-place (Pivot: Klaas, 16, extreme Farbe — nicht Steinpapier-Broschüre).  
**Architecture type:** A Static  
**Primary language:** de-DE · **Anrede:** Du  
**Ausbau:** **voll** — Onboarding-Wizard + Feld, mit Werten.

Heiligtümer: Marke Klaas Leeck, drei echte Sites (redesigner.lol, WhyNelo, Essentialz), ehrliche Platzhalter. Kein redesigner-Nachtrosa (`#0C0B0A`/`#FF2B8A`), kein Jober-Blau, keine Essentialz-Pille als Haut.

QUALITY-BAR: Atmosphäre in Stills · benannter Moment · Möbel mit Werten · Choreografie · QA **dark hero** + **Onboarding**.

---

## Point of view

This site should feel like: **ein 16-Jähriger, der laut baut** — warmes Dunkel, ein Signal-Orange, ein Einstiegs-Wizard.  
It must **not** feel like: Beige-PDF / Corporate Craft / v0-SaaS / redesigner-Klon / Jober-Blau mit fremdem Maskottchen.

**Primitive:** Verzeichnis + Onboarding-Karte.  
**Look:** Dark flare.  
**Mood:** Young builder.  
**Landingpage:** Hero als Fläche mit Still-Peek; Kontakt ist kein Formular, sondern ein Lauf.  
**Signature device:** Type-led **flare-bleed** auf einem Nomen.

---

## Komposition

**Hero-Gitter:** `7fr / 5fr`. Links Typ + Handlung. Rechts Still-Peek (redesigner). Handy: Typ, Peek darunter.

**Home:** Teaser, keine volle IA. Hero → drei Site-Kacheln → Ohne/Mit (QUALITY-BAR) → CTA-Band nach `/anfragen`.

**Onboarding:** eigene Route `/anfragen`. Wizard-Karte zentriert, max 40rem — keine leere Sidekick-Bühne.

**Arbeit:** `/arbeit` — volle Platten, leere Kundenslots. Nicht die Startseite.

**Methode:** `/methode` — hängende Zahlen `4fr / 8fr`, **3px** Schiene, Craft-Absatz pro Schritt.

**Page-Gitter:** `8fr / 4fr`, 72rem, Gutter 1.5rem.

**Type scale:** Laut.

| Token | clamp |
|---|---|
| H1 | `clamp(2.5rem, 1.1rem + 5.2vw, 5rem)` |
| H2 | `clamp(1.5rem, 1.05rem + 1.6vw, 2.25rem)` |
| Body | `clamp(1.0625rem, 1.02rem + 0.18vw, 1.1875rem)` |

**Rhythm:** `100dvh → 6.5rem → 7rem → 4.5rem → 6rem → 8.5rem → 3rem`

| Block | py / Höhe |
|---|---|
| Hero | `100dvh`, Typ ~32–36 % |
| Arbeit | `6.5rem` |
| Methode | `7rem` |
| Nachweise | `4.5rem` |
| FAQ | `6rem` |
| Onboarding | `8.5rem` (min 88dvh) |
| Footer | `3rem` |

**Material:** Korn **5 %** overlay (screen, nicht multiply — sonst stirbt Dunkel) **plus** Ambient-Feld:

- Statische Radials: Accent **48 %** bei `88% / -6%`, Accent **22 %** bei `12% / 108%`, Ink-black **40 %** bei `0% / 0%`.
- Zwei Ellipsen, blur **80px**, Mix Accent **50 %** / **28 %**, Drift 44–58s. Pausiert offscreen.
- Vignette ab **82 %** Höhe → `--bg`.
- Handy: ein Radial + eine Ellipse, still.

**Accent budget:** ≤ 8 % (Orange darf laut sein, aber eine Familie). CTA, Marker, Chips-Aktiv, Fokus, Rail-Fill. Feld zählt nicht.

**Named signature moment:** **Flare-Bleed** (`flare-bleed`) — Nomen im H1 (`Farbe`)

- **Wahrnehmung:** Das Wort steht in warmem Weiß 28 %, dann füllt Signal-Orange von links. Ein 0.18em-Underline wächst mit. Halo 18px Accent 35 % (nur Desktop).
- **Bau:** Load, **1.9s linear**, Delay **70ms**. `background-clip: text`, size 0→100 %. Nicht `view()` — Hero ist schon im Viewport.
- **QA:** Desktop-Hero bei **~450ms** (Mitte des Fills).
- **Reduced-motion / Handy:** Endzustand, volles Orange, Underline 100 %, kein Halo-Puls.

**Viewport layers:**

1. Canvas `--bg` 100dvh.
2. Ambient-Feld (Radials + Ellipsen).
3. Korn 5 % screen.
4. Vignette.
5. Typ: Kicker, H1 mit Flare, Fakt, CTA.
6. Rechts: ein Still-Peek (redesigner).

---

## Palette

| Token | Hex | Role | Warum |
|---|---|---|---|
| `--bg` | `#141210` | Warm charcoal | Nicht `#0C0B0A` (redesigner-Nacht). Braun-Schwarz, damit Orange warm sitzt. |
| `--surface` | `#1E1A17` | Karten | Eine Stufe hoch. |
| `--raised` | `#28231E` | Inputs, Chips-Ruhe | |
| `--ink` | `#F7F0E8` | Text | Warm, kein kühles #FAFAFA. |
| `--ink-muted` | `#A89F93` | Sekundär | |
| `--accent` | `#FF471A` | **Flare Orange** | Signal/Safety, röter als Tailwind `orange-500` `#F97316`. Extreme, aber lesbar auf Charcoal. Kein Magenta, kein Amber-SaaS. |
| `--accent-hot` | `#FF6A3D` | Hover / Glow-Kern | |
| `--accent-deep` | `#C2300E` | Pressed, Rail-Track | |
| `--accent-ink` | `#140E0C` | Text auf Orange | |
| `--rule` | `#3A342E` | Haarlinie | |
| `--focus` | `#FF471A` | Ring | |
| `--danger` | `#FF6B4A` | Fehler | |

Eine Akzent-Familie. Kein Zweit-Neon.

---

## Type

Self-host woff2:

- Display: **Syne** Variable (geometrisch, leicht schräg — jung, nicht Fraunces-Werkstatt).
- Sans: **Outfit** 400/500/600/700 (klar, modern).
- Mono: IBM Plex Mono 400/500 (Labels, Tags, URL).

---

## Radius / shadow / space

- Control `12px`. Chip `999px` (nur Auswahl, nicht CTA). CTA `12px` (kein Full-Pill-Button).
- **Eine Karten-Sprache: Tile**
  - Fill `--surface`
  - Rand: `1px solid --rule`
  - Ruhe: `0 18px 40px rgba(0,0,0,.35)`
  - Hover: `translateY(-3px)`, `0 22px 48px rgba(0,0,0,.45)`, `0 0 0 1px color-mix(accent 45%, transparent)`
  - Radius `16px`
- Onboarding-Karte: dieselbe Sprache, Padding `1.5rem 1.6rem`.
- Prozess Methode: hängende Zahlen `4fr / 8fr`, **3px** Schiene Accent.

---

## Motion

- **Primär:** `flare-bleed` im ersten Viewport.
- **Ambient:** Feld-Drift.
- **Struktur:** 3px Fortschritt links, `scroll()`.
- **Onboarding:** Rail-Fill 400ms, Chip-Press `scale(0.96)` 80ms. Watermelon-Checklist/Pager: Spring nur ohne `prefers-reduced-motion`.
- **Arbeit:** Swipe/Navigator als Möbel, nicht zweites Wow.
- **Micro:** Tile-Lift .28s; CTA Shine 2.8s; FAQ 200ms.
- Reduced-motion: Endzustand, Shine aus, Swipe ohne Drag.
- Kein Lenis. Scroll-CSS nur in `@supports (animation-timeline: view())`.

---

## Kein Mascot

Kein Sidekick, keine Figur, keine leere Bühne. Hero-Rechts ist ein Still. Onboarding ist die Karte.

---

## Onboarding (ersetzt Kontakt-Formular)

Architektur (studiert, nicht geklont): Step-Karte, Chip-Auswahl, Progress-Rail, Checklist. Kein Jober-Blau, kein Maskottchen.

| Step | Inhalt |
|---|---|
| 01 Wer | Name + Chips: Gründerin/Gründer, Agentur, Privat, Team, Noch offen |
| 02 Was | Chips: Neue Site, Redesign, Produkt, Unklar |
| 03 Umfang | Chips: Klein, Mittel, Groß, Weiß ich noch nicht |
| 04 Reach | E-Mail, optional Notiz, Consent, Senden |

Hidden fields + Honeypot für Netlify Forms. Mailto-Fallback. Consent Pflicht. Fortschritt: 4 Segmente, Fill Accent. Rezepte: `onboarding-checklist`, `step-pager`.

---

## Marks

Kein Streamline-Freehand, kein zweites Icon-Set. Wo ein Control einen Pfeil braucht: eine geometrische Stroke-Marke (Chevron/Check), 1.75px, `currentColor`. Hero-Kicker und CTA ohne Marke.

---

## Watermelon (Rezept)

Install-Quelle: `npx shadcn@latest add https://registry.watermelon.sh/r/<slug>.json`  
Auf Dark-Flare-Tokens umgefärbt, Demo-Copy raus, Lucide/Hugeicons/next-themes nicht mitgenommen.

Genutzt: `onboarding-checklist`, `step-pager`, `card-swipe`, `card-split-accordian`, `activities-card`, `carousel-navigator`.  
Ausgelassen: Crypto/Aave, Fund/Cash, Kalorien-Slider, AI-Bar, Emoji-Spree.

---

## Ausstattung — voll

- [x] Dark-only Canvas + Orange-Feld
- [x] Flare-Bleed Moment
- [x] Onboarding 4 Steps, Chips, Rail, Checklist — Route `/anfragen`
- [x] Header milchig (dark blur), Multipage-Nav
- [x] Sticky mobile CTA → `/anfragen`
- [x] Arbeit volle Platten + leere Slots
- [x] Methode hängende Zahlen, Craft
- [x] Ohne/Mit (Mit auf Accent-Deep Tile) auf Home
- [x] FAQ auf `/anfragen`
- [x] Shine CTA
- [ ] Vertrauenszeile* cut
- [ ] Logo-Marquee* cut

---

## IA

1. `/` Hero, Site-Teaser, Ohne/Mit, CTA-Band
2. `/arbeit` drei Platten + leere Kundenslots
3. `/methode` sieben Schritte, dicht
4. `/ueber` Person, leere Partner/Zert-Slots
5. `/anfragen` Onboarding-Wizard + FAQ
6. `/impressum` `/datenschutz` `/danke`

Nav: Sites · So bau ich · Über · Schreib mir — echte Routen, keine Anker-only-IA.

---

## Copy voice

Du, gesprochen, kurz. CTA **Projekt starten**. Kein Portfolio-Deutsch („Zu den Fällen“). Jung, konkret, ohne „Welcome to your app“, ohne Metriken.

---

## Cut list

Steinpapier, Patina-Grün, Fraunces-Werkstatt, Druckmarken, Register-Kreuz, drei Featurekarten, Ghost-Wort KLAAS, Magenta-Feld, Jober-Blau, Command-Bar-Dock, Countdown, Lenis, Glut-Mascot, Streamline-Freehand.

---

## Legal stack

§ 5 DDG. Klaas ist **16** — NAP Platzhalter, kein erfundener HRB, keine erfundene Vormund-Adresse. README: echte NAP / ggf. Erziehungsberechtigte prüfen. Consent + Honeypot. Kein ODR, kein Art. 50.
