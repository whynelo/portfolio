/** Echte Routen — Nav macht Multipage sichtbar, keine reinen Anker. */

export const routes = {
  home: '/',
  arbeit: '/arbeit',
  methode: '/methode',
  ueber: '/ueber',
  anfragen: '/anfragen',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  danke: '/danke',
} as const;

export const primaryNav = [
  { href: routes.arbeit, label: 'Sites' },
  { href: routes.methode, label: 'So bau ich' },
  { href: routes.ueber, label: 'Über' },
  { href: routes.anfragen, label: 'Schreib mir' },
] as const;

export function currentPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}
