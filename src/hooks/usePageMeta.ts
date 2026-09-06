import { useEffect } from 'react'
import { SITE_META } from '../config/siteMeta'

type PageMetaOptions = {
  /** Page-specific title. Rendered as-is for the homepage, suffixed with " | Be Positive" elsewhere. */
  title: string
  description?: string
  /** Path starting with "/", e.g. "/support". Used for the canonical & og:url tags. */
  path: string
  /** Keep crawlers away from transactional/utility pages (reset-password, delete-account). */
  noindex?: boolean
  /** Social preview image, absolute URL or site-root path. Defaults to SITE_META.ogImage. */
  image?: string
}

function setContent(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

function absoluteUrl(pathOrUrl: string, origin: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${origin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

export function usePageMeta({
  title,
  description,
  path,
  noindex = false,
  image,
}: PageMetaOptions) {
  useEffect(() => {
    const origin = SITE_META.siteUrl.replace(/\/$/, '')
    const fullTitle = path === '/' ? title : `${title} | Be Positive`
    const desc = description ?? SITE_META.description
    const url = `${origin}${path}`
    const imageUrl = absoluteUrl(image ?? SITE_META.ogImage, origin)

    document.title = fullTitle
    setContent('meta[name="description"]', 'content', desc)
    setContent('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow')
    setContent('link[rel="canonical"]', 'href', url)
    setContent('meta[property="og:url"]', 'content', url)
    setContent('meta[property="og:title"]', 'content', fullTitle)
    setContent('meta[property="og:description"]', 'content', desc)
    setContent('meta[property="og:image"]', 'content', imageUrl)
    setContent('meta[property="og:image:alt"]', 'content', fullTitle)
    setContent('meta[name="twitter:title"]', 'content', fullTitle)
    setContent('meta[name="twitter:description"]', 'content', desc)
    setContent('meta[name="twitter:image"]', 'content', imageUrl)
  }, [title, description, path, noindex, image])
}
