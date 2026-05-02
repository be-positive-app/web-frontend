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
          let next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
          next = next.replace(
            /<meta[^>]*name=["']description["'][^>]*\/?>/i,
            `<meta name="description" content="${description}" />`,
          )
          if (/name=["']keywords["']/i.test(next)) {
            next = next.replace(
              /<meta[^>]*name=["']keywords["'][^>]*\/?>/i,
              `<meta name="keywords" content="${keywords}" />`,
            )
          } else {
            next = next.replace(
              '</head>',
              `    <meta name="keywords" content="${keywords}" />\n  </head>`,
            )
          }
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
