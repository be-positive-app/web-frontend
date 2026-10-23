/**
 * Vercel Edge Middleware: a first-time visitor lands on the edition in their
 * own language, decided by the country Vercel reads from their IP.
 *
 * Rules, in order:
 *  - Only the three localized pages (/, /app, /teams) are touched, and only
 *    when they are opened without a language prefix.
 *  - A visitor who already chose a language (bp_lang cookie, set by the
 *    language picker) goes to that edition; an explicit "EN" stays at the
 *    bare URL, so nobody is bounced against their choice.
 *  - Crawlers are never redirected: every edition stays indexable at its own
 *    URL, and hreflang links tie them together.
 *  - Everything else falls through to the static files.
 */
export const config = { matcher: ['/', '/app', '/teams'] }

type Lang = 'en' | 'az' | 'ru' | 'tr'

/** Countries where most visitors read the site in Azerbaijani, Russian or Turkish. */
const BY_COUNTRY: Record<string, Lang> = {
  AZ: 'az',
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  KG: 'ru',
  UZ: 'ru',
  TJ: 'ru',
  TM: 'ru',
  MD: 'ru',
  TR: 'tr',
}

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|lighthouse|pagespeed/i

function cookieLang(header: string | null): Lang | null {
  const m = header && /(?:^|;\s*)bp_lang=(en|az|ru|tr)(?:;|$)/.exec(header)
  return m ? (m[1] as Lang) : null
}

export default function middleware(request: Request): Response | undefined {
  const url = new URL(request.url)
  const ua = request.headers.get('user-agent') ?? ''
  if (BOT.test(ua)) return undefined

  const chosen = cookieLang(request.headers.get('cookie'))
  const country = (request.headers.get('x-vercel-ip-country') ?? '').toUpperCase()
  const lang: Lang = chosen ?? BY_COUNTRY[country] ?? 'en'
  if (lang === 'en') return undefined

  const target = new URL(url)
  target.pathname = url.pathname === '/' ? `/${lang}` : `/${lang}${url.pathname}`
  const res = Response.redirect(target.toString(), 302)
  if (!chosen) {
    // Remember the guess so the next visit does not depend on the IP again; the picker overwrites it.
    const headers = new Headers(res.headers)
    headers.append('Set-Cookie', `bp_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`)
    return new Response(null, { status: 302, headers })
  }
  return res
}
