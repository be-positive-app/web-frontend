/**
 * Site SEO & browser title
 *
 * Edit the strings below, commit, and deploy — no other files need changing for
 * basic SEO (title, description, keywords, social preview, sitemap). Values are
 * injected into index.html when you run `npm run dev` or `npm run build`.
 *
 * Per-page titles and descriptions live in src/config/routes.json.
 */
import routes from './routes.json'

/**
 * The homepage entry doubles as the site-level default: it is what og:description
 * and the JSON-LD fall back to, so it is defined once in routes.json rather than
 * repeated here.
 */
const homeRoute = routes.routes.find((route) => route.path === '/')
if (!homeRoute) throw new Error('src/config/routes.json has no "/" route')

export const SITE_META = {
  /** Production origin, no trailing slash. Used for canonical/OG URLs and sitemap.xml. */
  siteUrl: 'https://bepositive.cc',
  title: homeRoute.title,
  description: homeRoute.description,
  /**
   * Comma-separated phrases. Google has ignored this tag since 2009 and long
   * lists get flagged as keyword stuffing by audit tools — keep it short and
   * put the real keywords in the page copy instead.
   */
  keywords: [
    // Brand — the one group worth owning outright.
    'be positive app',
    'be positive life planner',
    // What the app is.
    'daily planner app',
    'life planner app',
    'task manager app',
    'to do list app',
    'habit tracker app',
    'goal tracking app',
    // Mirrors the four feature cards on the landing page.
    'calendar planning app',
    'daily reminders app',
    'daily progress tracker',
    'focus app for work',
    // Category terms.
    'productivity app',
    'time management app',
  ].join(', '),
  /** BCP 47 locale, mirrored into <html lang> and og:locale. */
  locale: 'en_US',
  /** Social share preview image, 1200x630, path relative to the site root. */
  ogImage: '/og-image.png',
  ogImageAlt: 'Be Positive — Life Planner: plan your day, stay focused, feel positive.',
  /** Store listings. Overridable per environment via VITE_APP_STORE_URL / VITE_GOOGLE_PLAY_URL. */
  appStoreUrl: 'https://apps.apple.com/app/be-positive-life-planner/id6760747846',
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.bepositive.mobile',
  supportEmail: 'info@bepositive.cc',
  /**
   * Where the "how did you find us?" answers are posted. A Formspree form that
   * mails them to supportEmail.
   *
   * Not a secret: the endpoint ships in the browser bundle either way, which is
   * how the service is meant to be used — the form is public and Formspree does
   * its own spam filtering. Overridable per environment via
   * VITE_SURVEY_ENDPOINT; empty it to take the section off the page.
   */
  surveyEndpoint: 'https://formspree.io/f/moeqnoqn',
  /** Store downloads to date. Shown as social proof — keep it truthful. */
  downloads: '400+',
  /**
   * The real store rating, or null while there is not one worth quoting.
   * Use the exact figures from App Store Connect and the Play Console: an
   * invented score breaks both stores' marketing rules and Google's
   * structured-data policy.
   *
   * `count` is the number of ratings behind the score. It is optional because
   * the band can state a score without it, but the JSON-LD cannot — schema.org
   * requires ratingCount on an aggregateRating, so the rating is left out of
   * the structured data entirely until this is filled in.
   */
  rating: { value: '5.0' } as { value: string; count?: number } | null,
  /** Subscription prices, shared by the FAQ copy and the JSON-LD offers. */
  pricing: {
    currency: 'USD',
    monthly: '$2.99',
    yearly: '$19.99',
    monthlyAmount: '2.99',
    yearlyAmount: '19.99',
  },
} as const
