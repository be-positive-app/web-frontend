import { Compass, LifeBuoy, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routeMeta } from '../config/routeMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { SUPPORT_PAGE } from '../lib/policyPages'

export function NotFound() {
  // noindex comes from routes.json. Google treats a noindex "not found" view as
  // a 404 signal for client-rendered apps, which the SPA fallback cannot give
  // us with a real status code.
  usePageMeta(routeMeta('/404'))

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
          Error 404
        </p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          This page doesn’t exist
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-600">
          The link may be out of date, or the address may have a typo. Everything below
          still works.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-brandBlue px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
          <Link
            to={SUPPORT_PAGE.path}
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:text-brandBlue hover:ring-brandYellow/50 focus-ring"
          >
            <LifeBuoy className="h-4 w-4" aria-hidden="true" />
            {SUPPORT_PAGE.label}
          </Link>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
          <div className="flex items-center gap-2 text-brandBlue">
            <Compass className="h-5 w-5" aria-hidden="true" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Looking for something specific?
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Download links and the full feature list are on the{' '}
            <Link className="font-semibold text-brandBlue hover:underline" to="/">
              home page
            </Link>
            . Account help, password resets and deletion requests all start from{' '}
            <Link
              className="font-semibold text-brandBlue hover:underline"
              to={SUPPORT_PAGE.path}
            >
              support
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
