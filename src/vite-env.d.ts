/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  /** Dev-only: read in vite.config for /api proxy target (optional in client). */
  readonly VITE_DEV_PROXY_TARGET?: string
  /** App Store product page, e.g. https://apps.apple.com/app/id123456789 */
  readonly VITE_APP_STORE_URL?: string
  /** Google Play listing URL */
  readonly VITE_GOOGLE_PLAY_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
