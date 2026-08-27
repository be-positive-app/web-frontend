/**
 * Site SEO & browser title
 *
 * Edit the strings below, commit, and deploy — no other files need changing for
 * basic SEO (title, description, keywords, social preview, sitemap). Values are
 * injected into index.html when you run `npm run dev` or `npm run build`.
 */
export const SITE_META = {
  /** Production origin, no trailing slash. Used for canonical/OG URLs and sitemap.xml. */
  siteUrl: 'https://bepositive.cc',
  title: 'Be Positive — Life Planner',
  description:
    'Plan your day, stay focused, and track your progress with Be Positive Life Planner',
  /** Comma-separated phrases search engines may read (Google largely ignores this; others may use it). */
  keywords:
    'best daily planner, daily planner app, weekly planner app, monthly planner app, life planner app, routine planner, schedule planner, daily goal tracker, goal tracking app, best goal tracker app, productivity app, best productivity apps, productivity planner, improve productivity, increase productivity, daily motivation app, motivation app, track daily progress, performance tracking app, daily success tracker, goal achievement app, productivity app for entrepreneurs, daily planner for freelancers, focus app for work, time management app, time management for business, organize your life, take control of your day, better habits app, change your life app, to do list app, reminder app, smart reminder app, task manager app, personal productivity app, discipline app, daily performance tracker, habit tracker app, focus and discipline app,',
  /** Social share preview image, 1200x630, path relative to the site root. */
  ogImage: '/og-image.png',
} as const
