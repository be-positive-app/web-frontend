import { Bell, Brain, Clock3 } from 'lucide-react'

const PROBLEMS = [
  {
    icon: Brain,
    title: 'Lose focus easily?',
    body: 'Too many things compete for your attention.',
  },
  {
    icon: Clock3,
    title: 'Forget important tasks?',
    body: 'Keep everything you need to remember in one place.',
  },
  {
    icon: Bell,
    title: 'Need a little push?',
    body: 'Get timely reminders without the noise.',
  },
] as const

/** Answers the visitor's own complaint before the feature list makes its case. */
export function Problem() {
  return (
    <section className="border-t border-slate-100 bg-slate-50/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
            Struggling to stay organized?
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Can’t plan your work and often forget tasks?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Be Positive works like a personal assistant — planning, reminding and keeping
            your day on track.
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
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
