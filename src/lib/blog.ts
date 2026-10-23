import index from '../content/blog/index.json'
import type { Lang } from '../i18n'

export type Post = {
  slug: string
  date: string
  minutes: number
  title: Record<Lang, string>
  description: Record<Lang, string>
}

export const POSTS: Post[] = (index as { posts: Post[] }).posts

const BODIES = import.meta.glob('../content/blog/*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

/** The article text in a language, falling back to English. */
export function postBody(slug: string, lang: Lang): string {
  return BODIES[`../content/blog/${slug}/${lang}.md`] ?? BODIES[`../content/blog/${slug}/en.md`] ?? ''
}
