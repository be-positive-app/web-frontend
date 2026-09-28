import { useState, type MouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useT } from '../i18n'
import {
  TEAMS_APP_URL,
  TEAMS_CURRENCIES,
  TEAMS_PLANS,
  TEAMS_SYMBOL,
  defaultTeamsCurrency,
  formatTeamsPrice,
  teamsMaxSaving,
  type TeamsCurrency,
} from '../config/teamsPricing'

type Cycle = 'monthly' | 'yearly'

const CYCLES: Cycle[] = ['monthly', 'yearly']

const pillClass = (on: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition focus-ring ${
    on ? 'bg-white text-brandBlue shadow-sm' : 'text-slate-600 hover:text-brandBlue'
  }`

/**
 * The Teams (B2B) pricing cards with a monthly/yearly switch and a manat/dollar
 * switch, shared by the /teams page and the "For companies" block on the
 * personal-app homepage — `compact` trims padding and type size for the
 * smaller homepage placement. The currency starts on the visitor's likely one
 * (manat in Azerbaijan, dollars elsewhere), the same rule the Teams app bills by.
 */
export function TeamsPricingCards({ compact = false }: { compact?: boolean }) {
  const { t } = useT()
  const { pathname } = useLocation()
  const [cycle, setCycle] = useState<Cycle>('yearly')
  const [currency, setCurrency] = useState<TeamsCurrency>(defaultTeamsCurrency)
  const saving = teamsMaxSaving(currency)
  // Enterprise goes to the contact form on the Teams page; from the homepage that is a page away.
  const onTeamsPage = pathname.startsWith('/teams')
  function toContact(e: MouseEvent<HTMLAnchorElement>) {
    if (!onTeamsPage) return
    const el = document.getElementById('contact')
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
          {CYCLES.map((c) => (
            <button key={c} type="button" onClick={() => setCycle(c)} className={pillClass(cycle === c)}>
              {c === 'monthly' ? t('pricing.monthly') : t('pricing.yearly')}
              {c === 'yearly' && <span className="ml-1.5 text-xs text-[#1f9e5a]">{t('pricing.save', { n: saving })}</span>}
            </button>
          ))}
        </div>
        <div
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1"
          role="radiogroup"
          aria-label={t('pricing.currency')}
        >
          {TEAMS_CURRENCIES.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currency === c}
              onClick={() => setCurrency(c)}
              className={pillClass(currency === c)}
            >
              {TEAMS_SYMBOL[c]} {c}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">
        {t('pricing.currencyNote')}
      </p>

      <div className={`mt-8 grid gap-5 lg:grid-cols-3 ${compact ? '' : 'mx-auto max-w-5xl'}`}>
        {TEAMS_PLANS.map((p) => {
          const amount = p.prices ? p.prices[currency][cycle] : null
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-3xl border shadow-card ${compact ? 'p-6' : 'p-8'} ${
                p.recommended ? 'border-2 border-brandBlue' : 'border-slate-200'
              }`}
            >
              {p.recommended && (
                <span className={`absolute -top-3 rounded-full bg-brandYellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy ${compact ? 'left-6' : 'left-8'}`}>
                  {t('pricing.mostPopular')}
                </span>
              )}
              <p className={`text-sm font-semibold ${p.recommended ? 'text-brandBlue' : 'text-slate-600'}`}>{t(p.name)}</p>
              <p className="mt-1 text-xs text-slate-500">{t(p.sub)}</p>
              <div className="mt-4 flex items-baseline gap-2">
                {amount !== null ? (
                  <>
                    <span className={`font-extrabold tracking-tight text-slate-900 ${compact ? 'text-3xl' : 'text-4xl'}`}>
                      {formatTeamsPrice(currency, amount)}
                    </span>
                    <span className={`text-slate-500 ${compact ? 'text-sm' : 'text-base'}`}>
                      {cycle === 'yearly' ? t('pricing.perYear') : t('pricing.perMonth')}
                    </span>
                  </>
                ) : (
                  <span className={`font-extrabold tracking-tight text-slate-900 ${compact ? 'text-xl' : 'text-2xl'}`}>
                    {t('pricing.contactUs')}
                  </span>
                )}
              </div>
              {!compact && (
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandBlue" aria-hidden="true" />
                      {t(f)}
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={p.id === 'enterprise' ? (onTeamsPage ? '#contact' : '/teams#contact') : TEAMS_APP_URL}
                onClick={p.id === 'enterprise' ? toContact : undefined}
                target={p.id === 'enterprise' ? undefined : '_blank'}
                rel={p.id === 'enterprise' ? undefined : 'noreferrer'}
                className={`mt-6 inline-flex items-center justify-center rounded-2xl px-5 text-sm font-semibold transition focus-ring ${compact ? 'py-2.5' : 'py-3'} ${
                  p.recommended
                    ? 'bg-brandBlue text-white shadow-soft hover:shadow-md hover:shadow-brandYellow/25'
                    : 'border border-slate-300 text-slate-800 hover:border-brandBlue hover:text-brandBlue'
                }`}
              >
                {p.id === 'enterprise' ? t('pricing.contactSales') : t('pricing.startTrial')}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
