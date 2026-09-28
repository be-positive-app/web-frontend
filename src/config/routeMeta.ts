/**
 * Typed access to the shared route manifest (src/config/routes.json).
 *
 * The same JSON drives scripts/prerender.mjs, so the meta a crawler reads from
 * the static HTML and the meta usePageMeta sets at runtime cannot drift apart.
 */
import routes from './routes.json'

export type RouteMeta = {
  path: string
  title: string
  description: string
  noindex?: boolean
  /** Filename to prerender into, relative to dist. Defaults to <path>/index.html. */
  output?: string
  changefreq?: string
  priority?: string
  /** Language of a translated edition (az, ru); English pages leave it out. */
  lang?: string
  /** The English path this edition translates; ties the editions together for hreflang. */
  alternateOf?: string
}

export const ROUTES: readonly RouteMeta[] = routes.routes

/** Throws at module load if a page asks for a path missing from routes.json. */
export function routeMeta(path: string): RouteMeta {
  const found = ROUTES.find((r) => r.path === path)
  if (!found) throw new Error(`No entry for "${path}" in src/config/routes.json`)
  return found
}
