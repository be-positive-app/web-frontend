/**
 * Post-build prerender.
 *
 * The app is a client-rendered SPA: the shipped index.html body is just
 * `<div id="root"></div>` and usePageMeta patches the meta tags after React
 * mounts. Google renders JS, but the social crawlers (Facebook, WhatsApp,
 * LinkedIn, Telegram, X) do not — so without this step every route shares the
 * homepage title, description and canonical when it is shared as a link.
 *
 * This writes one static HTML file per route, each carrying its own meta, and
 * regenerates sitemap.xml from the same manifest. Routes and their copy live in
 * src/config/routes.json, which src/config/routeMeta.ts also feeds to
 * usePageMeta — so the crawler-visible meta and the runtime meta cannot drift.
 *
 * Apache serves these files directly; the SPA fallback in public/.htaccess only
 * kicks in for paths with no prerendered file (e.g. /delete-account/verify/:token).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const indexPath = join(distDir, 'index.html')

const { routes } = JSON.parse(
  readFileSync(join(root, 'src/config/routes.json'), 'utf8'),
)
const baseHtml = readFileSync(indexPath, 'utf8')

// siteUrl is already baked into the built HTML by the inject-site-meta plugin,
// so it is read back here instead of being configured a second time.
const canonicalMatch = baseHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
if (!canonicalMatch) {
  throw new Error('No <link rel="canonical"> in dist/index.html — cannot resolve the site origin.')
}
const origin = canonicalMatch[1].replace(/\/$/, '')

function escapeAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Mirrors the title rule in src/hooks/usePageMeta.ts. */
function fullTitle(route) {
  return route.path === '/' || route.title.includes('Be Positive')
    ? route.title
    : `${route.title} | Be Positive`
}

/**
 * Language editions of one page: the English route plus every route whose
 * alternateOf points at it. Only pages that actually have translations get
 * hreflang links.
 */
function editionsOf(route) {
  const base = route.alternateOf ?? route.path
  const group = routes.filter((r) => r.path === base || r.alternateOf === base)
  return group.length > 1 ? group : []
}

function hreflangLinks(route) {
  const editions = editionsOf(route)
  if (!editions.length) return ''
  const english = editions.find((r) => !r.lang) ?? editions[0]
  return [
    ...editions.map(
      (r) =>
        `<link rel="alternate" hreflang="${r.lang ?? 'en'}" href="${escapeAttr(`${origin}${r.path}`)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(`${origin}${english.path}`)}" />`,
  ].join('\n    ')
}

/** The FAQPage node describes the English FAQ; a translated edition shows other words, so it goes. */
function withoutFaqStructuredData(html) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i,
    (whole, json) => {
      try {
        const data = JSON.parse(json)
        if (Array.isArray(data['@graph'])) {
          data['@graph'] = data['@graph'].filter((n) => n['@type'] !== 'FAQPage')
        }
        return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`
      } catch {
        return whole
      }
    },
  )
}


/** Minimal markdown for blog articles (## headings, paragraphs, - and 1. lists, **bold**), escaped. */
function articleHtml(slug, lang) {
  const file = join(root, 'src/content/blog', slug, `${lang ?? 'en'}.md`)
  let md
  try {
    md = readFileSync(file, 'utf8')
  } catch {
    md = readFileSync(join(root, 'src/content/blog', slug, 'en.md'), 'utf8')
  }
  const inline = (t) => escapeAttr(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  return md
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split('\n')
      if (block.startsWith('## ')) return `<h2>${inline(block.slice(3))}</h2>`
      if (lines.every((l) => /^- /.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`
      if (lines.every((l) => /^\d+\. /.test(l))) return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`
      return `<p>${lines.map(inline).join('<br>')}</p>`
    })
    .join('\n')
}

function renderRoute(route) {
  const title = escapeAttr(fullTitle(route))
  const description = escapeAttr(route.description)
  const url = escapeAttr(`${origin}${route.path}`)
  const robots = route.noindex ? 'noindex, nofollow' : 'index, follow'

  const replacements = [
    [/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`],
    [
      /<meta[^>]*name=["']robots["'][^>]*\/?>/i,
      `<meta name="robots" content="${robots}" />`,
    ],
    [
      /<meta[^>]*name=["']description["'][^>]*\/?>/i,
      `<meta name="description" content="${description}" />`,
    ],
    [
      /<link[^>]*rel=["']canonical["'][^>]*\/?>/i,
      `<link rel="canonical" href="${url}" />`,
    ],
    [
      /<meta[^>]*property=["']og:url["'][^>]*\/?>/i,
      `<meta property="og:url" content="${url}" />`,
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
      /<meta[^>]*property=["']og:image:alt["'][^>]*\/?>/i,
      `<meta property="og:image:alt" content="${title}" />`,
    ],
    [
      /<meta[^>]*name=["']twitter:title["'][^>]*\/?>/i,
      `<meta name="twitter:title" content="${title}" />`,
    ],
    [
      /<meta[^>]*name=["']twitter:description["'][^>]*\/?>/i,
      `<meta name="twitter:description" content="${description}" />`,
    ],
  ]

  let html = replacements.reduce((page, [from, to]) => {
    if (!from.test(page)) {
      throw new Error(`Prerender: no match for ${from} while building ${route.path}`)
    }
    return page.replace(from, to)
  }, baseHtml)

  if (route.lang) {
    html = html.replace(/<html lang="[^"]*"/i, `<html lang="${route.lang}"`)
    html = withoutFaqStructuredData(html)
  }
  if (route.article) {
    // Crawlers get the article text without running JavaScript; the app replaces it on load.
    html = html.replace(
      /<div id="root"><\/div>/,
      `<div id="root"><article class="prose-blog" style="max-width:48rem;margin:0 auto;padding:3rem 1rem"><h1>${escapeAttr(route.title)}</h1>\n${articleHtml(route.article, route.lang)}</article></div>`,
    )
  }
  const alternates = hreflangLinks(route)
  if (alternates) html = html.replace('</head>', `    ${alternates}\n  </head>`)
  return html
}

let written = 0
for (const route of routes) {
  const html = renderRoute(route)
  const outPath = route.output
    ? join(distDir, route.output)
    : route.path === '/'
      ? indexPath
      : join(distDir, route.path.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  written += 1
}

const lastmod = new Date().toISOString().slice(0, 10)
const urls = routes
  .filter((route) => !route.noindex)
  .map((route) =>
    [
      '  <url>',
      `    <loc>${origin}${route.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      route.changefreq ? `    <changefreq>${route.changefreq}</changefreq>` : null,
      route.priority ? `    <priority>${route.priority}</priority>` : null,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')

writeFileSync(
  join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

console.log(
  `prerender: ${written} route${written === 1 ? '' : 's'}, sitemap with ${
    routes.filter((r) => !r.noindex).length
  } urls (${origin})`,
)
