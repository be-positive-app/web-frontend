import { useState } from 'react'
import { Check } from 'lucide-react'
import { SITE_META } from '../config/siteMeta'
import { TEAMS_APP_URL, TEAMS_PLANS, teamsMaxSaving } from '../config/teamsPricing'

type Cycle = 'monthly' | 'yearly'

const CYCLES: Cycle[] = ['monthly', 'yearly']

/**
 * The Teams (B2B) pricing cards with a monthly/yearly switch, shared by the
 * /teams page and the "For companies" block on the personal-app homepage —
 * `compact` trims padding and type size for the smaller homepage placement.
 */
export function TeamsPricingCards({ compact = false }: { compact?: boolean }) {
  const [cycle, setCycle] = useState<Cycle>('yearly')
  const saving = teamsMaxSaving()

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
          {CYCLES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCycle(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-ring ${
                cycle === c ? 'bg-white text-brandBlue shadow-sm' : 'text-slate-600 hover:text-brandBlue'
              }`}
            >
              {c === 'monthly' ? 'Monthly' : 'Yearly'}
              {c === 'yearly' && <span className="ml-1.5 text-xs text-[#1f9e5a]">Save {saving}%</span>}
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-8 grid gap-5 lg:grid-cols-3 ${compact ? '' : 'mx-auto max-w-5xl'}`}>
        {TEAMS_PLANS.map((p) => {
          const amount = p[cycle]
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-3xl border shadow-card ${compact ? 'p-6' : 'p-8'} ${
                p.recommended ? 'border-2 border-brandBlue' : 'border-slate-200'
              }`}
            >
              {p.recommended && (
                <span className={`absolute -top-3 rounded-full bg-brandYellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy ${compact ? 'left-6' : 'left-8'}`}>
                  Most popular
                </span>
              )}
              <p className={`text-sm font-semibold ${p.recommended ? 'text-brandBlue' : 'text-slate-600'}`}>{p.name}</p>
              <p className="mt-1 text-xs text-slate-500">{p.sub}</p>
              <div className="mt-4 flex items-baseline gap-2">
                {amount !== null ? (
                  <>
                    <span className={`font-extrabold tracking-tight text-slate-900 ${compact ? 'text-3xl' : 'text-4xl'}`}>
                      ${amount.toFixed(2)}
                    </span>
                    <span className={`text-slate-500 ${compact ? 'text-sm' : 'text-base'}`}>
                      / {cycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </>
                ) : (
                  <span className={`font-extrabold tracking-tight text-slate-900 ${compact ? 'text-xl' : 'text-2xl'}`}>
                    Contact us
                  </span>
                )}
              </div>
              {!compact && (
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandBlue" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={p.id === 'enterprise' ? `mailto:${SITE_META.supportEmail}` : TEAMS_APP_URL}
                target={p.id === 'enterprise' ? undefined : '_blank'}
                rel={p.id === 'enterprise' ? undefined : 'noreferrer'}
                className={`mt-6 inline-flex items-center justify-center rounded-2xl px-5 text-sm font-semibold transition focus-ring ${compact ? 'py-2.5' : 'py-3'} ${
                  p.recommended
                    ? 'bg-brandBlue text-white shadow-soft hover:shadow-md hover:shadow-brandYellow/25'
                    : 'border border-slate-300 text-slate-800 hover:border-brandBlue hover:text-brandBlue'
                }`}
              >
                {p.id === 'enterprise' ? 'Contact sales' : 'Start free trial'}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
