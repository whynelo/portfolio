/**
 * Öffentliche Arbeiten. Nur echte Dinge — später Clients hier anhängen.
 */
export type CaseStatus = 'live' | 'placeholder';

export type Case = {
  id: string;
  index: string;
  name: string;
  kind: string;
  summary: string;
  href: string | null;
  hrefLabel: string;
  note?: string;
  detail: string;
  status: CaseStatus;
  still: {
    src: string;
    lqip?: string;
    alt: string;
    kind: 'photo' | 'diagram';
  };
};

export const cases: Case[] = [
  {
    id: 'redesigner',
    index: '01',
    name: 'redesigner.lol',
    kind: 'Produkt',
    summary:
      'Site für Sites in der 10k-Klasse. Ohne KI-Gesicht. Sieben Schritte, erst locken, dann Quellen — nicht 45 kb auf einmal.',
    detail:
      'Das Produkt, das ich draußen zeigen kann. Lock, Viewport, Rest — dieselbe Reihenfolge wie hier, nur als Angebot. Kein Chat-Gesicht, keine erfundenen Case-Studies auf der Produktseite.',
    href: 'https://redesigner.lol',
    hrefLabel: 'redesigner.lol öffnen',
    status: 'live',
    still: {
      src: '/cases/redesigner.webp',
      lqip: '/cases/redesigner-lq.webp',
      alt: 'Startseite von redesigner.lol',
      kind: 'photo',
    },
  },
  {
    id: 'whynelo',
    index: '02',
    name: 'WhyNelo',
    kind: 'Methode',
    summary: 'Mein Prompt- und Methodensystem. Kein erfundenes Kundenprojekt.',
    detail:
      'Sieben Schritte, Stop dazwischen. WhyNelo ist kein Kundenjob und keine Public-URL — deshalb kein Fake-Screenshot. Der Lauf steht auf der Methodenseite.',
    href: null,
    hrefLabel: 'Kein Link draußen',
    note: 'Nur der Lauf. Kein Screenshot — gibt keine URL.',
    status: 'live',
    still: {
      src: '/cases/whynelo.svg',
      alt: 'WhyNelo als sieben Schritte, Darstellung ohne Produktfoto',
      kind: 'diagram',
    },
  },
  {
    id: 'essentialz',
    index: '03',
    name: 'Essentialz',
    kind: 'Hinweis',
    summary:
      'redesigner hängt bei Essentialz. Kein HRB, keine Konzernstory — nur der Hinweis, der öffentlich ist.',
    detail:
      'Nur der öffentliche Hinweis. Ob da mehr juristisch dran ist, sag ich nicht, solange ich’s nicht belegen kann. Screenshot von der Seite, die draußen liegt.',
    href: 'https://essentialz.gg',
    hrefLabel: 'essentialz.gg öffnen',
    note: 'Screenshot von der öffentlichen Seite. Ob da mehr juristisch dran ist: Platzhalter.',
    status: 'live',
    still: {
      src: '/cases/essentialz.webp',
      lqip: '/cases/essentialz-lq.webp',
      alt: 'Startseite der Essentialz-Präsenz',
      kind: 'photo',
    },
  },
];

export const deferredCaseSlot = {
  heading: 'Mehr Sites',
  body: 'Kunden-Sites, sobald ich sie zeigen darf. Keine Attrappen.',
} as const;

export const laterClientSlots = [
  { title: 'Kunde 04', state: 'Kommt, wenn ich darf' },
  { title: 'Kunde 05', state: 'Platzhalter' },
  { title: 'Kunde 06', state: 'Platzhalter' },
] as const;
