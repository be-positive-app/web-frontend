import { useLocation } from 'react-router-dom'
import { ROUTES, routeMeta, type RouteMeta } from '../config/routeMeta'
import type { Lang } from './index'

/**
 * Pages published in every language under their own URL: English at the bare
 * path, Azerbaijani and Russian under /az and /ru. Each edition is prerendered
 * with its own title, description, <html lang> and hreflang links, so search
 * engines index all three instead of only the English one.
 */
export const LOCALIZED_PATHS = ['/', '/teams'] as const

/** The language a URL is published in, or null for a page with no language prefix. */
export function langFromPath(pathname: string): Lang | null {
  const m = /^\/(az|ru)(?=\/|$)/.exec(pathname)
  return m ? (m[1] as Lang) : null
}

/** "/az/teams" → "/teams", "/ru" → "/". */
export function basePath(pathname: string): string {
  const rest = pathname.replace(/^\/(az|ru)(?=\/|$)/, '')
  return rest === '' ? '/' : rest
}

/** The URL of `path` in `lang`: English stays at the bare path. Non-localized pages are returned as-is. */
export function localizedPath(lang: Lang, path: string): string {
  if (lang === 'en' || !(LOCALIZED_PATHS as readonly string[]).includes(path)) return path
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}

/** Meta for the page being shown: the language edition's own entry when it has one. */
export function useLocalRouteMeta(fallback: string): RouteMeta {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '') || '/'
  return ROUTES.some((r) => r.path === path) ? routeMeta(path) : routeMeta(fallback)
}
