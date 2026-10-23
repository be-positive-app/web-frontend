import type { Lang } from '../i18n'

/**
 * Customer quotes for the Teams page. The section stays hidden while this
 * list is empty: only real quotes, with the person's written permission.
 * Logo: put the file in public/logos/ and give its path, or leave it out.
 */
export type Testimonial = {
  quote: Record<Lang, string>
  name: string
  role: Record<Lang, string>
  company: string
  logo?: string
}

export const TESTIMONIALS: Testimonial[] = []
