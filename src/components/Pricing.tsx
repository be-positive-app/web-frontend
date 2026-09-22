import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SITE_META } from '../config/siteMeta'
import { TEAMS_APP_URL, TEAMS_PLANS } from '../config/teamsPricing'

/** Everything the subscription includes. There is no free tier. */
const INCLUDED = [
  'Smart task management',
  'Calendar planning',
  'Daily reminders',
  'Progress tracking',
] as const

const { currency, monthly, yearly, monthlyAmount, yearlyAmount } = SITE_META.pricing

/** Derived here so the discount can never drift from the two prices above. */
const monthlyPerYear = Number(monthlyAmount) * 12
const savingPercent = Math.round((1 - Number(yearlyAmount) / monthlyPerYear) * 100)
const yearlyPerMonth = (Number(yearlyAmount) / 12).toFixed(2)

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-slate-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            One subscription. Everything included.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Subscribe in the app. Cancel any time from the store that manages it.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <p className="text-sm font-semibold text-slate-600">Monthly</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                {monthly}
              </span>
              <span className="text-base text-slate-500">/ month</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Month to month, billed in {currency}.
            </p>
          </div>

          <div className="relative rounded-3xl border-2 border-brandBlue bg-white p-8 shadow-card">
            <span className="absolute -top-3 left-8 rounded-full bg-brandYellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy">
              Save {savingPercent}%
            </span>
            <p className="text-sm font-semibold text-brandBlue">Yearly</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                {yearly}
              </span>
              <span className="text-base text-slate-500">/ year</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Works out at ${yearlyPerMonth} a month.
            </p>
          </div>
        </div>

        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="h-4 w-4 shrink-0 text-brandBlue" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-16 max-w-5xl border-t border-slate-100 pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
              For companies
            </p>
            <h3 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Running a team instead? See Be Positive Teams.
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              A flat price per company, not per seat — hiring someone mid-year never means a billing surprise.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {TEAMS_PLANS.map((p) => (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-3xl border p-6 shadow-card ${
                  p.recommended ? 'border-2 border-brandBlue' : 'border-slate-200'
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brandYellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy">
                    Most popular
                  </span>
                )}
                <p className={`text-sm font-semibold ${p.recommended ? 'text-brandBlue' : 'text-slate-600'}`}>{p.name}</p>
                <p className="mt-1 text-xs text-slate-500">{p.sub}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  {p.price ? (
                    <>
                      <span className="text-3xl font-extrabold tracking-tight text-slate-900">{p.price}</span>
                      <span className="text-sm text-slate-500">{p.cadence}</span>
                    </>
                  ) : (
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">Contact us</span>
                  )}
                </div>
                <a
                  href={p.id === 'enterprise' ? `mailto:${SITE_META.supportEmail}` : TEAMS_APP_URL}
                  target={p.id === 'enterprise' ? undefined : '_blank'}
                  rel={p.id === 'enterprise' ? undefined : 'noreferrer'}
                  className={`mt-5 inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition focus-ring ${
                    p.recommended
                      ? 'bg-brandBlue text-white shadow-soft hover:shadow-md hover:shadow-brandYellow/25'
                      : 'border border-slate-300 text-slate-800 hover:border-brandBlue hover:text-brandBlue'
                  }`}
                >
                  {p.id === 'enterprise' ? 'Contact sales' : 'Start free trial'}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/teams"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brandBlue hover:underline"
            >
              See full company pricing and features
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
