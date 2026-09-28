import { Bell, Brain, Clock3 } from 'lucide-react'
import { useT } from '../i18n'

const PROBLEMS = [
  { icon: Brain, title: 'problem.p1.title', body: 'problem.p1.body' },
  { icon: Clock3, title: 'problem.p2.title', body: 'problem.p2.body' },
  { icon: Bell, title: 'problem.p3.title', body: 'problem.p3.body' },
] as const

/** Answers the visitor's own complaint before the feature list makes its case. */
export function Problem() {
  const { t } = useT()
  return (
    <section className="border-t border-slate-100 bg-slate-50/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
            {t('problem.kicker')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t('problem.title')}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {t('problem.text')}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brandYellow">
                <Icon className="h-5 w-5 text-brandBlue" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                {t(title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
