/**
 * Be Positive Teams (B2B) pricing — shared by the /teams page and the
 * combined pricing section on the personal-app homepage, so the two never
 * drift apart. Mirrors the numbers shown in the Teams product's own billing
 * page (web-app's src/pages/Billing.tsx, USD prices).
 */
export type TeamsPlan = {
  id: 'starter' | 'team' | 'enterprise'
  name: string
  sub: string
  /** null on Enterprise: shown as "Contact us" instead of a price. */
  monthly: number | null
  yearly: number | null
  recommended?: boolean
  features: string[]
}

const CORE_FEATURES = [
  'Shared tasks and calendar',
  'Task assignment and reminders',
  'Workflow board per department',
  'Google Meet and Zoom links on tasks',
  'Priority support',
  'Mobile app included',
]

export const TEAMS_PLANS: TeamsPlan[] = [
  { id: 'starter', name: 'Starter', sub: 'For teams of up to 10 people', monthly: 24.9, yearly: 199.9, features: CORE_FEATURES },
  { id: 'team', name: 'Team', sub: 'For companies of up to 50 people, flat price', monthly: 69.9, yearly: 699.9, recommended: true, features: CORE_FEATURES },
  { id: 'enterprise', name: 'Enterprise', sub: '51+ people, contract and invoice', monthly: null, yearly: null, features: [...CORE_FEATURES, 'Bank transfer, annual invoice', 'Dedicated onboarding'] },
]

/** Biggest yearly saving across the priced plans, for the cycle switch label. */
export function teamsMaxSaving(): number {
  const priced = TEAMS_PLANS.filter((p): p is TeamsPlan & { monthly: number; yearly: number } => p.monthly !== null && p.yearly !== null)
  return Math.round(Math.max(...priced.map((p) => 1 - p.yearly / (p.monthly * 12))) * 100)
}

/** Where "Start free trial" sends a company — the Teams product itself, not this marketing site. */
export const TEAMS_APP_URL = 'https://web.bepositive.cc'
