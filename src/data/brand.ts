/**
 * NAP und Marke — eine Quelle für Header, Formular, Footer, Impressum.
 * Telefon und Anschrift bleiben Platzhalter, bis echte Werte existieren.
 */
export const brand = {
  legalName: 'Klaas Leeck',
  displayName: 'Klaas Leeck',
  initials: 'KL',
  role: '16. Sites mit Farbe. DE/EU, remote.',
  serviceArea: 'DE/EU, remote',
  email: 'klaas.leeck@gmail.com',
  phone: 'Platzhalter — Telefon ergänzen',
  phoneHref: '',
  street: 'Platzhalter — Straße ergänzen',
  zip: '00000',
  city: 'Stadt',
  country: 'Deutschland',
  /** Leer lassen, bis die Domain steht. */
  siteUrl: '',
  cta: 'Projekt starten',
  formName: 'projekt',
  /** Netlify Forms auf Netlify; sonst mailto an email. */
  formProvider: 'netlify-or-mailto' as const,
} as const;

export type Brand = typeof brand;

export function mailtoHref(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${brand.email}?${params.toString().replace(/\+/g, '%20')}`;
}

export function addressLines(): string[] {
  return [`${brand.street}`, `${brand.zip} ${brand.city}`, brand.country];
}

export function isPlaceholder(value: string): boolean {
  return value.includes('Platzhalter') || value === '00000' || value === 'Stadt';
}
