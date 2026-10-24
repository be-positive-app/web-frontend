import { ArrowRight, Building2, Check, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'
import { localizedPath, useLocalRouteMeta } from '../i18n/paths'

/**
 * The front door. Two products share the domain, so the home page does one
 * job: tell a personal user and a company owner apart in one glance and send
 * each to their own page (/app for the personal planner, /teams for the
 * company product). Nothing else competes for attention here.
 */
export function Home() {
  const { t, lang } = useT()
  usePageMeta(useLocalRouteMeta('/'))
  const bullet = (text: string, tone: 'light' | 'dark') => (
    <li key={text} className="flex items-start gap-2.5 text-sm leading-relaxed">
      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone === 'dark' ? 'text-brandYellow' : 'text-brandBlue'}`} aria-hidden="true" />
      <span className={tone === 'dark' ? 'text-white/80' : 'text-slate-600'}>{text}</span>
    </li>
  )

  return (
    <div>
      <section className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
        {/* Personal */}
        <div className="flex flex-col justify-center bg-hero-gradient px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm">
              <Smartphone className="h-4 w-4 text-brandBlue" aria-hidden="true" />
              {t('hub.person.kicker')}
            </div>
            <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl xl:text-5xl">
              {t('hub.person.title')}
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">{t('hub.person.lead')}</p>
            <ul className="mt-6 grid gap-2.5">
              {[t('hub.person.b1'), t('hub.person.b2'), t('hub.person.b3')].map((x) => bullet(x, 'light'))}
            </ul>
            <div className="mt-8">
              <Link to={localizedPath(lang, '/app')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brandBlue px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-[#0606a0] focus-ring">
                {t('hub.person.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 text-xs font-semibold text-slate-500">{t('hub.person.price')}</p>
          </div>
        </div>

        {/* Company */}
        <div className="flex flex-col justify-center surface-blue px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
              <Building2 className="h-4 w-4 text-brandYellow" aria-hidden="true" />
              {t('hub.company.kicker')}
            </div>
            <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl">
              {t('hub.company.title')}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/80 sm:text-lg">{t('hub.company.lead')}</p>
            <ul className="mt-6 grid gap-2.5">
              {[t('hub.company.b1'), t('hub.company.b2'), t('hub.company.b3')].map((x) => bullet(x, 'dark'))}
            </ul>
            <div className="mt-8">
              <Link to={localizedPath(lang, '/teams')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brandYellow px-6 py-3.5 text-base font-semibold text-brandNavy shadow-soft transition hover:bg-white focus-ring">
                {t('hub.company.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 text-xs font-semibold text-white/70">{t('hub.company.price')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
