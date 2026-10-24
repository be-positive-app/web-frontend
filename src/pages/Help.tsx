import { useMemo, useState } from 'react'
import { ArrowUpRight, LifeBuoy, Search, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routeMeta } from '../config/routeMeta'
import { TEAMS_APP_URL } from '../config/teamsPricing'
import { HELP_ARTICLES, type HelpGroup } from '../content/help'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT, type Key } from '../i18n'

const GROUPS: HelpGroup[] = ['start', 'daily', 'manage']

/** The panel opens `path` and frames the `spot` control in yellow. */
function panelLink(path: string, spot: string): string {
  return `${TEAMS_APP_URL}${path}${path.includes('?') ? '&' : '?'}spot=${spot}`
}

export function Help() {
  usePageMeta(routeMeta('/help'))
  const { t, lang } = useT()
  const [query, setQuery] = useState('')

  const found = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return HELP_ARTICLES
    return HELP_ARTICLES.filter((a) => {
      const x = a.text[lang]
      return [x.title, x.summary, ...x.steps].join(' ').toLowerCase().includes(q)
    })
  }, [query, lang])

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="inline-flex items-center gap-2 rounded-full bg-brandBlue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brandBlue">
          <LifeBuoy className="h-4 w-4" aria-hidden /> {t('help.eyebrow')}
        </p>
        <h1 className="mt-4 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t('help.title')}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">{t('help.lead')}</p>

        <label className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-brandBlue">
          <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('help.search')}
            aria-label={t('help.search')}
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </label>

        {GROUPS.map((g) => {
          const list = found.filter((a) => a.group === g)
          if (!list.length) return null
          return (
            <div key={g} className="mt-12">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t(`help.group.${g}` as Key)}</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {list.map((a) => {
                  const x = a.text[lang]
                  return (
                    <article key={a.slug} id={a.slug} className="scroll-mt-24 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-card">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{x.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{x.summary}</p>
                      <ol className="mt-4 space-y-2.5">
                        {x.steps.map((s, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brandBlue/10 text-xs font-bold text-brandBlue">{i + 1}</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                      {a.panel ? (
                        <a
                          href={panelLink(a.panel.path, a.panel.spot)}
                          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3a4ee6] focus-ring"
                        >
                          {t('help.show')} <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                      ) : (
                        <Link to="/app" className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-brandBlue focus-ring">
                          <Smartphone className="h-4 w-4" aria-hidden /> {t('help.getApp')}
                        </Link>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          )
        })}

        {found.length === 0 && <p className="mt-10 text-sm text-slate-600">{t('help.none')}</p>}

        <div className="mt-14 flex flex-col gap-4 rounded-3xl surface-blue p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{t('help.more.t')}</h2>
            <p className="mt-1 max-w-xl text-sm text-white/85">{t('help.more.b')}</p>
          </div>
          <Link to="/support" className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-brandYellow px-5 py-3 text-sm font-semibold text-brandNavy focus-ring">
            {t('help.contact')}
          </Link>
        </div>
      </div>
    </section>
  )
}
