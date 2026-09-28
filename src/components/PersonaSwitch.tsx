import { Link, useLocation } from 'react-router-dom'
import { useT } from '../i18n'

/**
 * Two audiences, two very different products and price points (a $2.99/mo
 * personal app vs a per-company Teams subscription) — kept as separate pages
 * rather than one pricing table, so each keeps its own hero, features and
 * SEO metadata. This switch is the one place that links them together.
 */
export function PersonaSwitch({ className = '', onNavigate }: { className?: string; onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const { t } = useT()
  const isTeams = pathname.startsWith('/teams')
  const base = 'whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition focus-ring motion-reduce:transition-none'

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 ${className}`}>
      <Link
        to="/"
        onClick={onNavigate}
        aria-current={!isTeams ? 'page' : undefined}
        className={`${base} ${!isTeams ? 'bg-brandBlue text-white shadow-sm' : 'text-slate-600 hover:text-brandBlue'}`}
      >
        {t('persona.person')}
      </Link>
      <Link
        to="/teams"
        onClick={onNavigate}
        aria-current={isTeams ? 'page' : undefined}
        className={`${base} ${isTeams ? 'bg-brandBlue text-white shadow-sm' : 'text-slate-600 hover:text-brandBlue'}`}
      >
        {t('persona.company')}
      </Link>
    </div>
  )
}
