import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'
import { localizedPath, useLocalRouteMeta } from '../i18n/paths'
import { POSTS } from '../lib/blog'

export function Blog() {
  const { t, lang } = useT()
  usePageMeta(useLocalRouteMeta('/blog'))
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">{t('blog.kicker')}</p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t('blog.title')}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{t('blog.lead')}</p>
        <ul className="mt-10 grid gap-5">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link to={localizedPath(lang, `/blog/${p.slug}`)} className="group block rounded-3xl border border-slate-200 p-6 shadow-card transition hover:border-brandBlue focus-ring">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {t('blog.minutes', { n: p.minutes })}
                </div>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 group-hover:text-brandBlue">{p.title[lang]}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description[lang]}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brandBlue">
                  {t('blog.read')} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
