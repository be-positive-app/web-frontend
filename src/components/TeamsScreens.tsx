import { useT, type Lang } from '../i18n'

// The panel's dashboard with the demo workspace, one image per site language: teams/dashboard-<lang>.webp.
const SHOTS = import.meta.glob('../assets/teams/dashboard-*.webp', { eager: true, import: 'default' }) as Record<string, string>
const shot = (lang: Lang) => SHOTS[`../assets/teams/dashboard-${lang}.webp`] ?? SHOTS['../assets/teams/dashboard-en.webp']

/** One real screen of the Teams web panel: the dashboard the owner opens every morning. */
export function TeamsScreens() {
  const { t, lang } = useT()
  return (
    <figure className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <img src={shot(lang)} alt={t('teams.screen.dashboard.alt')} width={1360} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
    </figure>
  )
}
