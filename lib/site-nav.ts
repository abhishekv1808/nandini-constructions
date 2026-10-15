/** Site structure (CLAUDE.md §5). Not business facts — safe to keep in code. */

export type NavLink = { label: string; href: string };

/** Where every "Get Free Quote" CTA points: the home page's final lead form (until /contact exists). */
export const QUOTE_HREF = '/#quote';
export const CALCULATOR_HREF = '/cost-calculator';

/** CLAUDE.md §4.3 */
export const WHATSAPP_MESSAGE = "Hi Nandini Constructions, I'd like a quote for building on my plot.";

export const SERVICES: NavLink[] = [
  { label: 'Residential construction', href: '/services/residential-construction' },
  { label: 'Commercial construction', href: '/services/commercial-construction' },
  { label: 'Interior design', href: '/services/interior-design' },
  { label: 'Renovation & extension', href: '/services/renovation-and-extension' },
  { label: 'Architectural design & approvals', href: '/services/architectural-design' },
];

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Packages', href: '/packages' },
  { label: 'Projects', href: '/projects' },
  // "Services ▾" is rendered between these from SERVICES
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Cost Calculator', href: CALCULATOR_HREF },
  { label: 'About', href: '/about' },
];

export const FOOTER_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Careers', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  { title: 'Services', links: SERVICES },
  {
    title: 'Resources',
    links: [
      { label: 'Cost Calculator', href: CALCULATOR_HREF },
      { label: 'EMI Calculator', href: '/emi-calculator' },
      { label: 'Packages', href: '/packages' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

/**
 * Places Nandini Constructions' own Instagram posts show active sites in (CLAUDE.md §6.11) —
 * [CONFIRM full service-area list]. Moves to the `service_areas` table in Phase 2/5.
 */
export const SERVICE_AREAS_TENTATIVE: string[] = [
  'Tumakuru',
  'SIT Extension',
  'KR Extension',
  'Kadaba',
  'Nittur',
];

export function areaSlug(area: string): string {
  return `/construction-company-in-${area
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
];
