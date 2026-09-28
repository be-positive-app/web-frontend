/**
 * Be Positive Teams (B2B) pricing — shared by the /teams page and the
 * combined pricing section on the personal-app homepage, so the two never
 * drift apart. Mirrors the numbers in the Teams product's own billing page
 * (web-app's src/lib/pricing.ts): Azerbaijani companies pay in manat,
 * everyone else in US dollars.
 */
import type { Key } from '../i18n'

export type TeamsCurrency = 'AZN' | 'USD'
export type TeamsPrice = { monthly: number; yearly: number }

export type TeamsPlan = {
  id: 'starter' | 'team' | 'enterprise'
  /** i18n keys: the cards render them in the visitor's language. */
  name: Key
  sub: Key
  /** null on Enterprise: shown as "Contact us" instead of a price. */
  prices: Record<TeamsCurrency, TeamsPrice> | null
  recommended?: boolean
  features: Key[]
}

export const TEAMS_CURRENCIES: TeamsCurrency[] = ['AZN', 'USD']
export const TEAMS_SYMBOL: Record<TeamsCurrency, string> = { AZN: '₼', USD: '$' }

const CORE_FEATURES: Key[] = [
  'feature.tasks',
  'feature.assign',
  'feature.board',
  'feature.meet',
  'feature.support',
  'feature.mobile',
]

export const TEAMS_PLANS: TeamsPlan[] = [
  {
    id: 'starter',
    name: 'plan.starter.name',
    sub: 'plan.starter.sub',
    prices: { AZN: { monthly: 29.9, yearly: 199.9 }, USD: { monthly: 24.9, yearly: 199.9 } },
    features: CORE_FEATURES,
  },
  {
    id: 'team',
    name: 'plan.team.name',
    sub: 'plan.team.sub',
    prices: { AZN: { monthly: 99.9, yearly: 999.9 }, USD: { monthly: 69.9, yearly: 699.9 } },
    recommended: true,
    features: CORE_FEATURES,
  },
  {
    id: 'enterprise',
    name: 'plan.enterprise.name',
    sub: 'plan.enterprise.sub',
    prices: null,
    features: [...CORE_FEATURES, 'feature.invoice', 'feature.onboarding'],
  },
]

/** "₼29.90" / "$24.90". */
export function formatTeamsPrice(currency: TeamsCurrency, amount: number): string {
  return `${TEAMS_SYMBOL[currency]}${amount.toFixed(2)}`
}

/** Biggest yearly saving across the priced plans in a currency, for the cycle switch label. */
export function teamsMaxSaving(currency: TeamsCurrency): number {
  const priced = TEAMS_PLANS.flatMap((p) => (p.prices ? [p.prices[currency]] : []))
  return Math.round(Math.max(...priced.map((p) => 1 - p.yearly / (p.monthly * 12))) * 100)
}

/**
 * The currency a visitor most likely pays in, same guess the Teams app makes
 * for a new company: manat when the browser sits in Baku or speaks
 * Azerbaijani, dollars otherwise. Safe during prerender (no window).
 */
export function defaultTeamsCurrency(): TeamsCurrency {
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Baku') return 'AZN'
    if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('az')) return 'AZN'
  } catch {
    /* ignore */
  }
  return 'USD'
}

/** Where "Start free trial" sends a company — the Teams product itself, not this marketing site. */
export const TEAMS_APP_URL = 'https://web.bepositive.cc'
