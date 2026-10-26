import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../config/testimonials'
import { useT } from '../i18n'

/** Real customer quotes; renders nothing until src/config/testimonials.ts has some. */
export function Testimonials() {
  const { t, lang } = useT()
  if (TESTIMONIALS.length === 0) return null
  return (
    <section className="border-t border-slate-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue">{t('quotes.kicker')}</p>
        <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{t('quotes.title')}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((q) => (
            <figure key={q.name} className="flex flex-col rounded-3xl border border-slate-200 p-6 shadow-card">
              <Quote className="h-6 w-6 text-brandYellow" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-slate-700">{q.quote[lang]}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {q.logo ? <img src={q.logo} alt="" className="h-10 w-10 rounded-xl object-contain ring-1 ring-slate-200" /> : null}
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{q.name}</span>
                  <span className="block text-xs text-slate-500">{q.role[lang]}, {q.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
