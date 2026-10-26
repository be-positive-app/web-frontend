import { Compass, LifeBuoy, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routeMeta } from '../config/routeMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { SUPPORT_PAGE } from '../lib/policyPages'
import { useT } from '../i18n'

export function NotFound() {
  // noindex comes from routes.json. Google treats a noindex "not found" view as
  // a 404 signal for client-rendered apps, which the SPA fallback cannot give
  // us with a real status code.
  usePageMeta(routeMeta('/404'))
  const { t } = useT()

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue">
          {t('nf.eyebrow')}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {t('nf.title')}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-600">
          {t('nf.text')}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-brandBlue px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            {t('page.backHome')}
          </Link>
          <Link
            to={SUPPORT_PAGE.path}
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:text-brandBlue hover:ring-brandYellow/50 focus-ring"
          >
            <LifeBuoy className="h-4 w-4" aria-hidden="true" />
            {t('legal.support')}
          </Link>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
          <div className="flex items-center gap-2 text-brandBlue">
            <Compass className="h-5 w-5" aria-hidden="true" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              {t('nf.lookingTitle')}
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {t('nf.lookingA')}{' '}
            <Link className="font-semibold text-brandBlue hover:underline" to="/">
              {t('nf.homeLink')}
            </Link>
            {t('nf.lookingB')}{' '}
            <Link
              className="font-semibold text-brandBlue hover:underline"
              to={SUPPORT_PAGE.path}
            >
              {t('nf.supportLink')}
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
