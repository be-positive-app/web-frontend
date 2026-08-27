import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE_META } from './src/config/siteMeta'

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const proxyTarget =
    env.VITE_DEV_PROXY_TARGET?.trim() || 'http://localhost:3000'

  return {
    plugins: [
      react(),
      {
        name: 'inject-site-meta',
        transformIndexHtml(html) {
          const title = escapeAttr(SITE_META.title)
          const description = escapeAttr(SITE_META.description)
          const keywords = escapeAttr(SITE_META.keywords)
          const siteUrl = SITE_META.siteUrl.replace(/\/$/, '')
          const canonicalUrl = escapeAttr(`${siteUrl}/`)
          const ogImage = escapeAttr(
            SITE_META.ogImage.startsWith('http')
              ? SITE_META.ogImage
              : `${siteUrl}${SITE_META.ogImage.startsWith('/') ? '' : '/'}${SITE_META.ogImage}`,
          )

          let next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
          next = next.replace(
            /<meta[^>]*name=["']description["'][^>]*\/?>/i,
            `<meta name="description" content="${description}" />`,
          )
          next = next.replace(
            /<meta[^>]*name=["']keywords["'][^>]*\/?>/i,
            `<meta name="keywords" content="${keywords}" />`,
          )
          next = next.replace(
            /<link[^>]*rel=["']canonical["'][^>]*\/?>/i,
            `<link rel="canonical" href="${canonicalUrl}" />`,
          )
          next = next.replace(
            /<meta[^>]*property=["']og:url["'][^>]*\/?>/i,
            `<meta property="og:url" content="${canonicalUrl}" />`,
          )
          next = next.replace(
            /<meta[^>]*property=["']og:title["'][^>]*\/?>/i,
            `<meta property="og:title" content="${title}" />`,
          )
          next = next.replace(
            /<meta[^>]*property=["']og:description["'][^>]*\/?>/i,
            `<meta property="og:description" content="${description}" />`,
          )
          next = next.replace(
            /<meta[^>]*property=["']og:image["'][^>]*\/?>/i,
            `<meta property="og:image" content="${ogImage}" />`,
          )
          next = next.replace(
            /<meta[^>]*name=["']twitter:title["'][^>]*\/?>/i,
            `<meta name="twitter:title" content="${title}" />`,
          )
          next = next.replace(
            /<meta[^>]*name=["']twitter:description["'][^>]*\/?>/i,
            `<meta name="twitter:description" content="${description}" />`,
          )
          next = next.replace(
            /<meta[^>]*name=["']twitter:image["'][^>]*\/?>/i,
            `<meta name="twitter:image" content="${ogImage}" />`,
          )
          next = next.replace(
            /"name":\s*"[^"]*"/,
            `"name": "${title}"`,
          )
          next = next.replace(
            /"description":\s*"[^"]*"(?=[\s\S]*"applicationCategory")/,
            `"description": "${description}"`,
          )
          next = next.replace(
            /"url":\s*"[^"]*"/,
            `"url": "${canonicalUrl}"`,
          )
          next = next.replace(
            /"image":\s*"[^"]*"/,
            `"image": "${ogImage}"`,
          )
          return next
        },
      },
    ],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
