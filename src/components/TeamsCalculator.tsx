import { Calculator } from 'lucide-react'
import { useState } from 'react'
import { TEAMS_PLANS, defaultTeamsCurrency, formatTeamsPrice, TEAMS_SYMBOL, type TeamsCurrency } from '../config/teamsPricing'
import { useT } from '../i18n'

const CAPS: Record<string, number> = { starter: 10, team: 20, business: 50 }
/** An illustration, labelled as such on the page: what a per-seat tool at this price costs the same team. */
const PER_SEAT_USD = 10
// The manat is pegged to the dollar (1 USD = 1.70 AZN), so the comparison is shown in the visitor's currency.
const PER_SEAT = { USD: PER_SEAT_USD, AZN: PER_SEAT_USD * 1.7 } as const

/** "How many people?" slider: the package that fits, its price, and what per-seat pricing would cost. */
export function TeamsCalculator() {
  const { t } = useT()
  const [people, setPeople] = useState(12)
  const [currency] = useState<TeamsCurrency>(() => defaultTeamsCurrency())
  const plan = TEAMS_PLANS.find((p) => p.prices && CAPS[p.id] >= people)
  const monthly = plan?.prices ? plan.prices[currency].monthly : null
  const perPerson = monthly !== null ? monthly / people : null

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-brandBlue">
        <Calculator className="h-4 w-4" aria-hidden="true" /> {t('calc.title')}
      </div>
      <label htmlFor="calc-people" className="mt-4 flex items-baseline justify-between gap-3 text-base font-semibold text-slate-900">
        <span>{t('calc.question')}</span>
        <span className="text-3xl font-extrabold tracking-tight text-brandBlue">{people}</span>
      </label>
      <input
        id="calc-people"
        type="range"
        min={1}
        max={60}
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))}
        className="mt-3 w-full accent-brandBlue"
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          {plan && monthly !== null ? (
            <>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('calc.fits', { plan: t(plan.name) })}</div>
              <div className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                {formatTeamsPrice(currency, monthly)}
                <span className="text-sm font-semibold text-slate-500"> {t('home.companies.perMonth')}</span>
              </div>
              <div className="mt-1 text-sm text-slate-600">{t('calc.perPerson', { price: formatTeamsPrice(currency, perPerson ?? 0) })}</div>
            </>
          ) : (
            <>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('calc.fits', { plan: 'Enterprise' })}</div>
              <div className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">{t('calc.enterprise')}</div>
            </>
          )}
        </div>
        <div className="rounded-2xl border border-dashed border-slate-300 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('calc.perSeatTitle')}</div>
          <div className="mt-1 text-3xl font-extrabold tracking-tight text-slate-500">
            <span className="line-through decoration-slate-500/70 decoration-2">{TEAMS_SYMBOL[currency]}{(PER_SEAT[currency] * people).toFixed(0)}</span>
            <span className="text-sm font-semibold"> {t('home.companies.perMonth')}</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">{t('calc.perSeatNote', { price: `${TEAMS_SYMBOL[currency]}${PER_SEAT[currency].toFixed(0)}` })}</div>
        </div>
      </div>
    </div>
  )
}
