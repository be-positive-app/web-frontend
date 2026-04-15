/**
 * Ensures API base is an absolute URL. Values without `http://` or `https://` are treated
 * as hostnames (e.g. Railway) and get `https://` prepended — otherwise the browser resolves
 * them as paths on the current origin (`http://localhost:5173/...`).
 */
function normalizeApiBase(raw: string): string {
  const t = raw.trim().replace(/\/$/, '')
  if (!t) return ''

  if (/^https?:\/\//i.test(t)) return t

  // Same-origin absolute path (advanced / rare)
  if (t.startsWith('/')) return t

  const isLocal =
    t.startsWith('localhost') ||
    t.startsWith('127.0.0.1') ||
    t.startsWith('[::1]')
  return `${isLocal ? 'http' : 'https'}://${t}`
}

export function apiV1Url(path: string): string {
  const segment = path.startsWith('/') ? path : `/${path}`
  const raw = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ?? ''
  if (!raw) return `/api/v1${segment}`

  const base = normalizeApiBase(raw)
  if (base.startsWith('/')) {
    if (base.endsWith('/api/v1')) return `${base}${segment}`
    return `${base}/api/v1${segment}`
  }

  if (base.endsWith('/api/v1')) return `${base}${segment}`
  return `${base}/api/v1${segment}`
}
