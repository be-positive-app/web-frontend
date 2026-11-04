import { apiV1Url } from './apiBase'

/**
 * Google Analytics 4 and Meta Pixel, loaded only after the visitor accepts
 * cookies and only when their IDs are set (VITE_GA4_ID, VITE_META_PIXEL_ID
 * in Vercel). Without IDs nothing loads and the consent banner stays hidden.
 *
 * ChatGPT Ads: a visitor who came from a ChatGPT ad (?oppref=… on the link)
 * has their actions reported through our server, which holds the API key.
 * Also only after they accept cookies.
 */
const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined)?.trim() || ''
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || ''
const CONSENT_KEY = 'bp.consent'
const OPPREF_KEY = 'bp.oppref'
/** ChatGPT's click id is kept this long, like its attribution window. */
const OPPREF_DAYS = 30

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

/** Keeps ChatGPT's click id from the landing URL for later actions on the site. */
function captureOppref() {
  try {
    const v = new URLSearchParams(location.search).get('oppref')?.trim()
    if (v) localStorage.setItem(OPPREF_KEY, JSON.stringify({ v: v.slice(0, 300), at: Date.now() }))
  } catch {
    /* storage blocked: nothing to report later */
  }
}

function oppref(): string | null {
  try {
    const raw = localStorage.getItem(OPPREF_KEY)
    if (!raw) return null
    const { v, at } = JSON.parse(raw) as { v?: string; at?: number }
    if (!v || !at || Date.now() - at > OPPREF_DAYS * 86_400_000) return null
    return v
  } catch {
    return null
  }
}

type ChatGptEvent = 'page_viewed' | 'lead_created' | 'app_store_click' | 'google_play_click' | 'start_trial_click' | 'tool_download'

/** Reports a ChatGPT-ad visitor's action; our server adds the key and sends it to ChatGPT Ads. */
function chatgpt(type: ChatGptEvent) {
  const ref = oppref()
  if (!ref || readConsent() !== 'granted') return
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : null
  if (!id) return
  fetch(apiV1Url('/public/chatgpt-ads/events'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, type, oppref: ref, url: location.href.split('#')[0].slice(0, 500) }),
    keepalive: true,
  }).catch(() => undefined)
}

export function setConsent(c: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, c)
  } catch {
    /* storage blocked: asks again next visit */
  }
  if (c === 'granted') {
    load()
    chatgpt('page_viewed')
  }
}

/** Call once at start: loads the tags for someone who already said yes. */
export function initAnalytics() {
  if (typeof window === 'undefined') return
  captureOppref()
  if (!analyticsConfigured) return
  // The first page view is reported by trackPageView when the router mounts.
  if (readConsent() === 'granted') load()
  document.addEventListener('click', onClick, true)
}

/** A page change inside the single-page site. */
export function trackPageView(path: string) {
  if (!loaded) return
  chatgpt('page_viewed')
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

const CHATGPT: Partial<Record<EventName, ChatGptEvent>> = {
  generate_lead: 'lead_created',
  app_store_click: 'app_store_click',
  google_play_click: 'google_play_click',
  start_trial_click: 'start_trial_click',
  tool_download: 'tool_download',
}

export function track(name: EventName, params: Record<string, string> = {}) {
  if (!loaded) return
  const ce = CHATGPT[name]
  if (ce) chatgpt(ce)
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
