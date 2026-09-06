import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { FAQ } from './src/config/faq'
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
          const locale = escapeAttr(SITE_META.locale)
          const siteUrl = SITE_META.siteUrl.replace(/\/$/, '')
          const canonicalUrl = escapeAttr(`${siteUrl}/`)
          const toAbsolute = (path: string) =>
            path.startsWith('http')
              ? path
              : `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`
          const ogImage = escapeAttr(toAbsolute(SITE_META.ogImage))
          const ogImageAlt = escapeAttr(SITE_META.ogImageAlt)

          const appStoreUrl = env.VITE_APP_STORE_URL?.trim() || SITE_META.appStoreUrl
          const googlePlayUrl =
            env.VITE_GOOGLE_PLAY_URL?.trim() || SITE_META.googlePlayUrl

          // Built as an object and serialized, rather than patched with regexes,
          // so adding a node can never make a replacement target the wrong one.
          const jsonLd = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${siteUrl}/#organization`,
                name: 'Be Positive',
                url: `${siteUrl}/`,
                email: SITE_META.supportEmail,
                logo: {
                  '@type': 'ImageObject',
                  url: toAbsolute('/icon-512.png'),
                  width: 512,
                  height: 512,
                },
                sameAs: [appStoreUrl, googlePlayUrl],
              },
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: `${siteUrl}/`,
                name: SITE_META.title,
                description: SITE_META.description,
                inLanguage: locale.replace('_', '-'),
                publisher: { '@id': `${siteUrl}/#organization` },
              },
              {
                '@type': 'MobileApplication',
                '@id': `${siteUrl}/#app`,
                name: SITE_META.title,
                description: SITE_META.description,
                url: `${siteUrl}/`,
                image: toAbsolute(SITE_META.ogImage),
                applicationCategory: 'ProductivityApplication',
                operatingSystem: 'iOS, Android',
                installUrl: [appStoreUrl, googlePlayUrl],
                publisher: { '@id': `${siteUrl}/#organization` },
                offers: [
                  {
                    '@type': 'Offer',
                    name: 'Monthly subscription',
                    price: SITE_META.pricing.monthlyAmount,
                    priceCurrency: SITE_META.pricing.currency,
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: SITE_META.pricing.monthlyAmount,
                      priceCurrency: SITE_META.pricing.currency,
                      billingDuration: 1,
                      billingIncrement: 1,
                      unitCode: 'MON',
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'Yearly subscription',
                    price: SITE_META.pricing.yearlyAmount,
                    priceCurrency: SITE_META.pricing.currency,
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: SITE_META.pricing.yearlyAmount,
                      priceCurrency: SITE_META.pricing.currency,
                      billingDuration: 1,
                      billingIncrement: 1,
                      unitCode: 'ANN',
                    },
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': `${siteUrl}/#faq`,
                mainEntity: FAQ.map((entry) => ({
                  '@type': 'Question',
                  name: entry.question,
                  acceptedAnswer: { '@type': 'Answer', text: entry.answer },
                })),
              },
            ],
          }

          const replacements: [RegExp, string][] = [
            [/<html lang="[^"]*"/i, `<html lang="${locale.split('_')[0]}"`],
            [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
            [
              /<meta[^>]*name=["']description["'][^>]*\/?>/i,
              `<meta name="description" content="${description}" />`,
            ],
            [
              /<meta[^>]*name=["']keywords["'][^>]*\/?>/i,
              `<meta name="keywords" content="${keywords}" />`,
            ],
            [
              /<link[^>]*rel=["']canonical["'][^>]*\/?>/i,
              `<link rel="canonical" href="${canonicalUrl}" />`,
            ],
            [
              /<meta[^>]*property=["']og:locale["'][^>]*\/?>/i,
              `<meta property="og:locale" content="${locale}" />`,
            ],
            [
              /<meta[^>]*property=["']og:url["'][^>]*\/?>/i,
              `<meta property="og:url" content="${canonicalUrl}" />`,
            ],
            [
              /<meta[^>]*property=["']og:title["'][^>]*\/?>/i,
              `<meta property="og:title" content="${title}" />`,
            ],
            [
              /<meta[^>]*property=["']og:description["'][^>]*\/?>/i,
              `<meta property="og:description" content="${description}" />`,
            ],
            [
              /<meta[^>]*property=["']og:image["'](?![^>]*og:image:)[^>]*\/?>/i,
              `<meta property="og:image" content="${ogImage}" />`,
            ],
            [
              /<meta[^>]*property=["']og:image:alt["'][^>]*\/?>/i,
              `<meta property="og:image:alt" content="${ogImageAlt}" />`,
            ],
            [
              /<meta[^>]*name=["']twitter:title["'][^>]*\/?>/i,
              `<meta name="twitter:title" content="${title}" />`,
            ],
            [
              /<meta[^>]*name=["']twitter:description["'][^>]*\/?>/i,
              `<meta name="twitter:description" content="${description}" />`,
            ],
            [
              /<meta[^>]*name=["']twitter:image["'][^>]*\/?>/i,
              `<meta name="twitter:image" content="${ogImage}" />`,
            ],
            [
              /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
              `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`,
            ],
          ]

          return replacements.reduce((acc, [from, to]) => acc.replace(from, to), html)
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
