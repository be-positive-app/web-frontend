/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  /** Dev-only: read in vite.config for /api proxy target (optional in client). */
  readonly VITE_DEV_PROXY_TARGET?: string
  /** App Store product page, e.g. https://apps.apple.com/app/be-positive-life-planner/id6760747846 */
  readonly VITE_APP_STORE_URL?: string
  /** Google Play https://play.google.com/store/apps/details?id=com.bepositive.mobile */
  readonly VITE_GOOGLE_PLAY_URL?: string
  /** Firebase Web SDK (same project as the mobile app) — required for /reset-password */
  readonly VITE_FIREBASE_API_KEY?: string
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string
  readonly VITE_FIREBASE_PROJECT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
