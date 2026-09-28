import { useState } from 'react'
import { useT, type Key } from '../i18n'
import dashboardPng from '../assets/teams-dashboard.png'
import dashboardWebp from '../assets/teams-dashboard.webp'
import calendarPng from '../assets/teams-calendar.png'
import calendarWebp from '../assets/teams-calendar.webp'
import reportsPng from '../assets/teams-reports.png'
import reportsWebp from '../assets/teams-reports.webp'

const SCREENS: { id: string; label: Key; alt: Key; png: string; webp: string }[] = [
  { id: 'dashboard', label: 'teams.screen.dashboard', alt: 'teams.screen.dashboard.alt', png: dashboardPng, webp: dashboardWebp },
  { id: 'calendar', label: 'teams.screen.calendar', alt: 'teams.screen.calendar.alt', png: calendarPng, webp: calendarWebp },
  { id: 'reports', label: 'teams.screen.reports', alt: 'teams.screen.reports.alt', png: reportsPng, webp: reportsWebp },
]

/** Real screens of the Teams web panel behind a three-tab switch. */
export function TeamsScreens() {
  const { t } = useT()
  const [active, setActive] = useState(0)
  const screen = SCREENS[active]

  return (
    <div>
      <div className="flex justify-center" role="tablist" aria-label={t('teams.screens.kicker')}>
        <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`screen-${s.id}`}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-ring ${i === active ? 'bg-white text-brandBlue shadow-sm' : 'text-slate-600 hover:text-brandBlue'}`}
            >
              {t(s.label)}
            </button>
          ))}
        </div>
      </div>
      <figure id={`screen-${screen.id}`} role="tabpanel" className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        <picture className="contents">
          <source srcSet={screen.webp} type="image/webp" />
          <img src={screen.png} alt={t(screen.alt)} width={1360} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
        </picture>
      </figure>
    </div>
  )
}
