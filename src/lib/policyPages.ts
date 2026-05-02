/**
 * Policy documents loaded from `GET /api/v1/policy/:slug` (published pages only).
 * Support is a static page — see `Support.tsx` and `/support` route.
 */
export const POLICY_PAGES = [
  { slug: 'privacy', path: '/privacy', label: 'Privacy Policy', shortLabel: 'Privacy' },
  { slug: 'terms', path: '/terms', label: 'Terms of Service', shortLabel: 'Terms' },
  { slug: 'refunds', path: '/refunds', label: 'Refund Policy', shortLabel: 'Refunds' },
  { slug: 'cookies', path: '/cookies', label: 'Cookie Policy', shortLabel: 'Cookies' },
] as const

export type PolicySlug = (typeof POLICY_PAGES)[number]['slug']

export const SUPPORT_PAGE = {
  path: '/support',
  label: 'Support',
} as const

/** Footer and any combined legal nav: API policies + static support. */
export const FOOTER_LEGAL_LINKS = [
  ...POLICY_PAGES.map((p) => ({ path: p.path, label: p.label })),
  { path: SUPPORT_PAGE.path, label: SUPPORT_PAGE.label },
] as const

export function policyMetaForSlug(slug: string) {
  return POLICY_PAGES.find((p) => p.slug === slug)
}
