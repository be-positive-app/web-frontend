import { CreditCard, Database, Download, KeyRound, Lock, Mail, ScrollText, ShieldCheck, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routeMeta } from '../config/routeMeta'
import { SITE_META } from '../config/siteMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT, type Key } from '../i18n'

/** Each block states only what the product actually does; no certifications or regions we cannot back up. */
const BLOCKS: { key: string; icon: LucideIcon }[] = [
  { key: 'auth', icon: KeyRound },
  { key: 'tls', icon: Lock },
  { key: 'roles', icon: Users },
  { key: 'audit', icon: ScrollText },
  { key: 'pay', icon: CreditCard },
  { key: 'data', icon: Download },
  { key: 'infra', icon: Database },
]

export function Security() {
  usePageMeta(routeMeta('/security'))
  const { t } = useT()

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brandBlue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brandBlue">
              <ShieldCheck className="h-4 w-4" aria-hidden /> {t('sec.eyebrow')}
            </p>
            <h1 className="mt-4 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t('sec.title')}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">{t('sec.lead')}</p>
          </div>
          <Link to="/" className="hidden shrink-0 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md focus-ring sm:inline-flex">
            {t('page.backHome')}
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map(({ key, icon: Icon }) => (
            <div key={key} className={`rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-card ${key === 'infra' ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brandBlue/10 text-brandBlue"><Icon className="h-5 w-5" aria-hidden /></span>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">{t(`sec.${key}.t` as Key)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(`sec.${key}.b` as Key)}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-3xl surface-blue p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{t('sec.report.t')}</h2>
            <p className="mt-1 max-w-xl text-sm text-white/85">{t('sec.report.b')}</p>
          </div>
          <a href={`mailto:${SITE_META.supportEmail}?subject=Security`} className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-brandYellow px-5 py-3 text-sm font-semibold text-brandNavy focus-ring">
            <Mail className="h-4 w-4" aria-hidden /> {SITE_META.supportEmail}
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          {t('sec.more')}{' '}
          <Link to="/privacy" className="font-semibold text-brandBlue hover:underline">{t('legal.privacy')}</Link>
          {' · '}
          <Link to="/terms" className="font-semibold text-brandBlue hover:underline">{t('legal.terms')}</Link>
          {' · '}
          <Link to="/cookies" className="font-semibold text-brandBlue hover:underline">{t('legal.cookies')}</Link>
        </p>
      </div>
    </section>
  )
}
