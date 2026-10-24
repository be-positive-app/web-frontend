import { ArrowRight, Building2, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { localizedPath } from '../i18n/paths'

/**
 * Two products live on one domain: the personal planner app and Be Positive
 * Teams for companies. This band sits right under the personal hero so a
 * visitor who came for the company product finds the door in one glance.
 */
export function AudienceSplit() {
  const { t, lang } = useT()
  return (
    <section aria-labelledby="audience-title" className="border-t border-slate-100 bg-slate-50/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <h2 id="audience-title" className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          {t('split.kicker')}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <a href="#home" className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:border-brandBlue">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brandYellow text-brandNavy">
              <Smartphone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-semibold tracking-tight text-slate-900">{t('split.person.title')}</span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600">{t('split.person.text')}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brandBlue">
                {t('split.person.cta')} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </a>
          <Link to={localizedPath(lang, '/teams')} className="group flex items-start gap-4 rounded-3xl border-2 border-brandBlue surface-blue p-6 text-white shadow-card transition hover:bg-[#1b2563]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brandBlue text-white">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-semibold tracking-tight">{t('split.company.title')}</span>
              <span className="mt-1 block text-sm leading-relaxed text-white/85">{t('split.company.text')}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brandYellow">
                {t('split.company.cta')} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
