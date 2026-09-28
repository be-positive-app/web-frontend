import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TeamsPricingCards } from './TeamsPricingCards'
import { SITE_META } from '../config/siteMeta'
import { useT } from '../i18n'
import { localizedPath } from '../i18n/paths'

/** Everything the subscription includes. There is no free tier. */
const INCLUDED = ['b2c.inc1', 'b2c.inc2', 'b2c.inc3', 'b2c.inc4'] as const

const { currency, monthly, yearly, monthlyAmount, yearlyAmount } = SITE_META.pricing

/** Derived here so the discount can never drift from the two prices above. */
const monthlyPerYear = Number(monthlyAmount) * 12
const savingPercent = Math.round((1 - Number(yearlyAmount) / monthlyPerYear) * 100)
const yearlyPerMonth = (Number(yearlyAmount) / 12).toFixed(2)

export function Pricing() {
  const { t, lang } = useT()
  return (
    <section id="pricing" className="border-t border-slate-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
            {t('b2c.kicker')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t('b2c.title')}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {t('b2c.text')}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <p className="text-sm font-semibold text-slate-600">{t('b2c.monthly')}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                {monthly}
              </span>
              <span className="text-base text-slate-500">{t('b2c.perMonth')}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {t('b2c.monthNote', { currency })}
            </p>
          </div>

          <div className="relative rounded-3xl border-2 border-brandBlue bg-white p-8 shadow-card">
            <span className="absolute -top-3 left-8 rounded-full bg-brandYellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy">
              {t('b2c.save', { n: savingPercent })}
            </span>
            <p className="text-sm font-semibold text-brandBlue">{t('b2c.yearly')}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                {yearly}
              </span>
              <span className="text-base text-slate-500">{t('b2c.perYear')}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {t('b2c.yearNote', { n: yearlyPerMonth })}
            </p>
          </div>
        </div>

        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="h-4 w-4 shrink-0 text-brandBlue" aria-hidden="true" />
              {t(item)}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-16 max-w-5xl border-t border-slate-100 pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
              {t('home.companies.kicker')}
            </p>
            <h3 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {t('home.companies.title')}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t('home.companies.text')}
            </p>
          </div>

          <TeamsPricingCards compact />

          <div className="mt-6 text-center">
            <Link
              to={localizedPath(lang, '/teams')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brandBlue hover:underline"
            >
              {t('home.companies.link')}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
