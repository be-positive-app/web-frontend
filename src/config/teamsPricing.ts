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
  price: string | null
  cadence: string
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
  { id: 'starter', name: 'Starter', sub: 'For teams of up to 10 people', price: '$24.90', cadence: '/ month', features: CORE_FEATURES },
  { id: 'team', name: 'Team', sub: 'For companies of up to 50 people, flat price', price: '$69.90', cadence: '/ month', recommended: true, features: CORE_FEATURES },
  { id: 'enterprise', name: 'Enterprise', sub: '51+ people, contract and invoice', price: null, cadence: '', features: [...CORE_FEATURES, 'Bank transfer, annual invoice', 'Dedicated onboarding'] },
]

/** Where "Start free trial" sends a company — the Teams product itself, not this marketing site. */
export const TEAMS_APP_URL = 'https://web.bepositive.cc'
