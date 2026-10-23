import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PersonaSwitch } from './PersonaSwitch'
import { LangSwitch } from './LangSwitch'
import { useT } from '../i18n'
import { localizedPath } from '../i18n/paths'
import { TEAMS_APP_URL } from '../config/teamsPricing'
import appLogoPng from '../assets/logo-128.png'
import appLogoWebp from '../assets/logo-128.webp'

const SECTIONS = ['features', 'screens', 'pricing', 'teams-faq', 'demo'] as const
type Section = (typeof SECTIONS)[number]
const LABEL: Record<Section, 'teams.nav.features' | 'teams.nav.screens' | 'teams.nav.pricing' | 'teams.nav.faq' | 'teams.nav.demo'> = {
  features: 'teams.nav.features',
  screens: 'teams.nav.screens',
  pricing: 'teams.nav.pricing',
  'teams-faq': 'teams.nav.faq',
  demo: 'teams.nav.demo',
}

/**
 * The menu of the company product: its own sections, a "start free" button
 * instead of the app-store download, and a navy accent so a visitor can tell
 * at a glance they are on the Teams side of the site.
 */
export function TeamsNavbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const { t, lang } = useT()
  const teamsHome = localizedPath(lang, '/teams')

  const [menuPath, setMenuPath] = useState(location.pathname)
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname)
    setOpen(false)
  }

  const onTeams = /^\/(?:(?:az|ru|tr)\/)?teams/.test(location.pathname)
  function go(id: Section) {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      setOpen(false)
      // From the blog the section links lead to the Teams page itself.
      if (!onTeams) return
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const link = 'whitespace-nowrap rounded-xl px-3 py-2 text-[15px] font-semibold text-slate-700 transition hover:text-brandBlue focus-ring motion-reduce:transition-none'
  const mobileLink = 'rounded-2xl px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-100 focus-ring motion-reduce:transition-none'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="h-1 bg-brandBlue" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to={teamsHome} className="group inline-flex items-center gap-2.5 rounded-xl px-1 py-0.5 focus-ring" aria-label="Be Positive Teams">
          <picture className="contents">
            <source srcSet={appLogoWebp} type="image/webp" />
            <img src={appLogoPng} alt="Be Positive" width={40} height={40} decoding="async" className="h-9 w-9 shrink-0 rounded-2xl object-contain shadow-sm ring-1 ring-slate-200/50 sm:h-10 sm:w-10" />
          </picture>
          <span className="hidden items-baseline gap-1.5 2xl:inline-flex">
            <span className="text-base font-extrabold tracking-tight text-slate-900">Be Positive</span>
            <span className="rounded-md bg-brandBlue px-1.5 py-0.5 text-xs font-extrabold uppercase tracking-wide text-brandYellow">Teams</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <PersonaSwitch className="mr-2" />
          {SECTIONS.map((id) => (
            <a key={id} href={onTeams ? `#${id}` : `${teamsHome}#${id}`} onClick={go(id)} className={link}>
              {t(LABEL[id])}
            </a>
          ))}
          <Link to={localizedPath(lang, '/blog')} className={link}>{t('blog.nav')}</Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl p-2 text-slate-700 transition hover:bg-slate-100 focus-ring motion-reduce:transition-none lg:hidden"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <a href={TEAMS_APP_URL} className="hidden whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-brandBlue focus-ring xl:inline-flex">
            {t('teams.nav.login')}
          </a>
          <a
            href={TEAMS_APP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brandNavy focus-ring motion-reduce:transition-none"
          >
            {t('teams.nav.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200/70 bg-white/95 backdrop-blur lg:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-4">
            <div className="grid gap-2">
              <PersonaSwitch className="mb-1 w-full justify-center" onNavigate={() => setOpen(false)} />
              <LangSwitch className="mb-1 justify-self-center" />
              {SECTIONS.map((id) => (
                <a key={id} href={onTeams ? `#${id}` : `${teamsHome}#${id}`} onClick={go(id)} className={mobileLink}>
                  {t(LABEL[id])}
                </a>
              ))}
              <Link to={localizedPath(lang, '/blog')} className={mobileLink}>{t('blog.nav')}</Link>
              <a href={TEAMS_APP_URL} className={mobileLink}>{t('teams.nav.login')}</a>
              <a href={TEAMS_APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brandBlue px-4 py-3 text-sm font-semibold text-white shadow-soft focus-ring">
                {t('teams.nav.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
