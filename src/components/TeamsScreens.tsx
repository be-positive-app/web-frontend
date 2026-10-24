import { useState } from 'react'
import { useT, type Key, type Lang } from '../i18n'

// Current panel screens with the demo workspace, one set per site language: teams/<screen>-<lang>.webp.
const SHOTS = import.meta.glob('../assets/teams/*.webp', { eager: true, import: 'default' }) as Record<string, string>
const shot = (id: string, lang: Lang) => SHOTS[`../assets/teams/${id}-${lang}.webp`] ?? SHOTS[`../assets/teams/${id}-en.webp`]

const SCREENS: { id: string; label: Key; alt: Key }[] = [
  { id: 'dashboard', label: 'teams.screen.dashboard', alt: 'teams.screen.dashboard.alt' },
  { id: 'tasks', label: 'teams.screen.tasks', alt: 'teams.screen.tasks.alt' },
  { id: 'director', label: 'teams.screen.director', alt: 'teams.screen.director.alt' },
  { id: 'people', label: 'teams.screen.people', alt: 'teams.screen.people.alt' },
  { id: 'recognition', label: 'teams.screen.recognition', alt: 'teams.screen.recognition.alt' },
  { id: 'calendar', label: 'teams.screen.calendar', alt: 'teams.screen.calendar.alt' },
  { id: 'reports', label: 'teams.screen.reports', alt: 'teams.screen.reports.alt' },
]

/** Real screens of the Teams web panel behind a three-tab switch. */
export function TeamsScreens() {
  const { t, lang } = useT()
  const [active, setActive] = useState(0)
  const screen = SCREENS[active]

  return (
    <div>
      <div className="flex justify-center" role="tablist" aria-label={t('teams.screens.kicker')}>
        <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-3xl border border-slate-200 bg-slate-50 p-1">
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
        <img src={shot(screen.id, lang)} alt={t(screen.alt)} width={1360} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
      </figure>
    </div>
  )
}
