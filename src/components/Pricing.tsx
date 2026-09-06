import { Check } from 'lucide-react'
import { SITE_META } from '../config/siteMeta'

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
      </div>
    </section>
  )
}
