export type NavItem = {
  label: string;
  path: string;
};

// Single source of truth for the desktop tabs AND the mobile menu.
// Placeholder entries: replace with the real routes later.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Discover', path: '/discover' },
  { label: 'Dens', path: '/dens' },
  { label: 'Events', path: '/events' },
  { label: 'Venues', path: '/venues' },
  { label: 'Collection', path: '/collection' },
];
