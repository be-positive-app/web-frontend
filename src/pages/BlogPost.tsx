import { ArrowLeft, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { TEAMS_APP_URL } from '../config/teamsPricing'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'
import { localizedPath, useLocalRouteMeta } from '../i18n/paths'
import { POSTS, postBody } from '../lib/blog'
import { NotFound } from './NotFound'

/** Month names by hand: some browsers have no Azerbaijani month names and print "M10". */
const MONTHS: Record<'en' | 'az' | 'ru' | 'tr', string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  az: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
}

export function BlogPost() {
  const { slug = '' } = useParams()
  const { t, lang } = useT()
  const post = POSTS.find((p) => p.slug === slug)
  usePageMeta(useLocalRouteMeta(`/blog/${slug}`))
  if (!post) return <NotFound />
  const [y, m, d] = post.date.split('-').map(Number)
  const date = `${d} ${MONTHS[lang][m - 1]} ${y}`

  return (
    <article className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link to={localizedPath(lang, '/blog')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brandBlue hover:underline focus-ring">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t('blog.all')}
        </Link>
        <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{post.title[lang]}</h1>
        <p className="mt-3 text-sm text-slate-500">{date} · {t('blog.minutes', { n: post.minutes })}</p>
        <div className="prose-blog mt-8">
          <ReactMarkdown>{postBody(post.slug, lang)}</ReactMarkdown>
        </div>
        <div className="mt-12 rounded-3xl bg-brandBlue p-6 text-white sm:p-8">
          <p className="text-xl font-extrabold tracking-tight">{t('blog.ctaTitle')}</p>
          <p className="mt-2 text-sm text-white/85">{t('blog.ctaText')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={TEAMS_APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-brandYellow px-5 py-3 text-sm font-semibold text-brandNavy transition hover:bg-white focus-ring">
              {t('teams.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link to={`${localizedPath(lang, '/teams')}#demo`} className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-brandYellow hover:text-brandYellow focus-ring">
              {t('demo.cta')}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
