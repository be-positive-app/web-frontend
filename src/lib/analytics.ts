/**
 * Google Analytics 4 and Meta Pixel, loaded only after the visitor accepts
 * cookies and only when their IDs are set (VITE_GA4_ID, VITE_META_PIXEL_ID
 * in Vercel). Without IDs nothing loads and the consent banner stays hidden.
 */
const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined)?.trim() || ''
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || ''
const CONSENT_KEY = 'bp.consent'

export const analyticsConfigured = Boolean(GA4_ID || PIXEL_ID)

type Gtag = (...args: unknown[]) => void
type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown; callMethod?: (...a: unknown[]) => void }
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    fbq?: Fbq
    _fbq?: Fbq
  }
}

export type Consent = 'granted' | 'denied' | null

export function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

let loaded = false

function addScript(src: string) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  if (GA4_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID)
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`)
  }
  if (PIXEL_ID) {
    // Meta's standard stub: calls queue up until fbevents.js arrives and replaces callMethod.
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue!.push(args)
    }) as Fbq
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    window.fbq = fbq
    window._fbq = fbq
    addScript('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', PIXEL_ID)
    fbq('track', 'PageView')
  }
}

export function setConsent(c: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, c)
  } catch {
    /* storage blocked: asks again next visit */
  }
  if (c === 'granted') load()
}

/** Call once at start: loads the tags for someone who already said yes. */
export function initAnalytics() {
  if (typeof window === 'undefined' || !analyticsConfigured) return
  if (readConsent() === 'granted') load()
  document.addEventListener('click', onClick, true)
}

/** A page change inside the single-page site. */
export function trackPageView(path: string) {
  if (!loaded) return
  window.gtag?.('event', 'page_view', { page_path: path })
  window.fbq?.('track', 'PageView')
}

export type EventName =
  | 'generate_lead'
  | 'start_trial_click'
  | 'app_store_click'
  | 'google_play_click'
  | 'sign_in_click'
  | 'tool_download'
  | 'tool_share'

export function track(name: EventName, params: Record<string, string> = {}) {
  if (!loaded) return
  window.gtag?.('event', name, params)
  if (name === 'generate_lead') window.fbq?.('track', 'Lead', params)
  else if (name === 'start_trial_click') window.fbq?.('track', 'StartTrial', params)
  else window.fbq?.('trackCustom', name, params)
}

/** Outbound clicks are recognised by where they go, so no link needs extra markup. */
function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!a) return
  const href = a.href
  const place = location.pathname
  if (href.includes('apps.apple.com')) track('app_store_click', { place })
  else if (href.includes('play.google.com')) track('google_play_click', { place })
  else if (href.includes('web.bepositive.cc')) {
    const label = (a.textContent || '').trim().slice(0, 60)
    track(/sign in|daxil|войти|giriş/i.test(label) ? 'sign_in_click' : 'start_trial_click', { place, label })
  }
}
