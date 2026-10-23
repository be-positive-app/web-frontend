/**
 * First-touch attribution: the UTM tags, referring site and landing page of
 * the visit that brought someone here. Kept for 90 days in a cookie on
 * .bepositive.cc, so the web panel (web.bepositive.cc) can read it too when
 * the visitor signs up there, and mirrored in localStorage for local dev.
 */
export type Attribution = Partial<Record<'source' | 'medium' | 'campaign' | 'term' | 'content' | 'referrer' | 'landing', string>>

const KEY = 'bp_attr'
const DAYS = 90

function readCookie(): Attribution | null {
  try {
    const m = new RegExp(`(?:^|;\\s*)${KEY}=([^;]+)`).exec(document.cookie)
    return m ? (JSON.parse(decodeURIComponent(m[1])) as Attribution) : null
  } catch {
    return null
  }
}

function write(a: Attribution) {
  const value = encodeURIComponent(JSON.stringify(a))
  const domain = location.hostname.endsWith('bepositive.cc') ? '; Domain=.bepositive.cc' : ''
  document.cookie = `${KEY}=${value}; Path=/; Max-Age=${DAYS * 86400}; SameSite=Lax${domain}`
  try {
    localStorage.setItem(KEY, JSON.stringify(a))
  } catch {
    /* storage blocked */
  }
}

/** Records the visit if it carries UTM tags, or if it is the first one and came from another site. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    const q = new URLSearchParams(location.search)
    const utm: Attribution = {}
    for (const k of ['source', 'medium', 'campaign', 'term', 'content'] as const) {
      const v = q.get(`utm_${k}`)
      if (v) utm[k] = v.slice(0, 200)
    }
    const ref = document.referrer && !document.referrer.includes(location.hostname) ? document.referrer.slice(0, 200) : ''
    const existing = readCookie()
    // A new campaign link wins; otherwise the first touch stays.
    if (Object.keys(utm).length === 0 && existing) return
    if (Object.keys(utm).length === 0 && !ref) return
    write({ ...utm, ...(ref ? { referrer: ref } : {}), landing: location.pathname.slice(0, 200) })
  } catch {
    /* prerender or storage blocked */
  }
}

/** What to send with a form, or undefined when nothing is known. */
export function getAttribution(): Attribution | undefined {
  if (typeof window === 'undefined') return undefined
  const a = readCookie() ?? (() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? 'null') as Attribution | null
    } catch {
      return null
    }
  })()
  return a && Object.keys(a).length ? a : undefined
}
