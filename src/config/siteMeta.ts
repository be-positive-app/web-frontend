/**
 * Site SEO & browser title
 *
 * Edit the strings below, commit, and deploy — no other files need changing for
 * basic SEO (title, description, keywords, social preview, sitemap). Values are
 * injected into index.html when you run `npm run dev` or `npm run build`.
 *
 * Per-page titles and descriptions live in src/config/routes.json.
 */
export const SITE_META = {
  /** Production origin, no trailing slash. Used for canonical/OG URLs and sitemap.xml. */
  siteUrl: 'https://bepositive.cc',
  title: 'Be Positive — Life Planner',
  description:
    'Plan your day, stay focused, and track your progress with Be Positive Life Planner',
  /**
   * Comma-separated phrases. Google has ignored this tag since 2009 and long
   * lists get flagged as keyword stuffing by audit tools — keep it short and
   * put the real keywords in the page copy instead.
   */
  keywords:
    'daily planner app, life planner app, task manager app, habit tracker app, goal tracking app, productivity app, time management app, daily reminders, progress tracking, to do list app',
  /** BCP 47 locale, mirrored into <html lang> and og:locale. */
  locale: 'en_US',
  /** Social share preview image, 1200x630, path relative to the site root. */
  ogImage: '/og-image.png',
  ogImageAlt: 'Be Positive — Life Planner: plan your day, stay focused, feel positive.',
  /** Store listings. Overridable per environment via VITE_APP_STORE_URL / VITE_GOOGLE_PLAY_URL. */
  appStoreUrl: 'https://apps.apple.com/app/be-positive-life-planner/id6760747846',
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.bepositive.mobile',
  supportEmail: 'info@bepositive.cc',
} as const
