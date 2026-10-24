import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { SITE_META } from '../config/siteMeta'
import { apiV1Url } from '../lib/apiBase'
import { usePageMeta } from '../hooks/usePageMeta'
import { policyMetaForSlug, type PolicySlug } from '../lib/policyPages'
import { useT } from '../i18n'

type PolicyApiResponse = {
  id: string
  type: string
  slug: string
  title: string
  content: string
  version: number
  publishedAt: string | null
  updatedAt: string
}

type LoadState =
  | { status: 'loading' }
  | { status: 'ok'; data: PolicyApiResponse }
  | { status: 'fallback'; reason: 'not_found' | 'error' }

type PolicyDocumentPageProps = {
  slug: PolicySlug
}

export function PolicyDocumentPage({ slug }: PolicyDocumentPageProps) {
  const meta = policyMetaForSlug(slug)
  const { t, lang } = useT()
  const defaultTitle = t(`legal.${slug}`)

  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    const ac = new AbortController()
    const url = apiV1Url(`/policy/${slug}`)

    void (async () => {
      try {
        const res = await fetch(url, {
          signal: ac.signal,
          headers: { Accept: 'application/json' },
        })
        if (res.status === 404) {
          setState({ status: 'fallback', reason: 'not_found' })
          return
        }
        if (!res.ok) {
          setState({ status: 'fallback', reason: 'error' })
          return
        }
        const data = (await res.json()) as PolicyApiResponse
        setState({ status: 'ok', data })
      } catch {
        if (ac.signal.aborted) return
        setState({ status: 'fallback', reason: 'error' })
      }
    })()

    return () => ac.abort()
  }, [slug])

  const heading = state.status === 'ok' ? state.data.title : defaultTitle

  usePageMeta({
    title: heading,
    description: `${heading} for Be Positive Life Planner.`,
    path: meta?.path ?? `/${slug}`,
  })

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {heading}
          </h1>
          <Link
            to="/"
            className="shrink-0 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            {t('page.backHome')}
          </Link>
        </div>

        {state.status === 'loading' ? (
          <p className="mt-6 text-base text-slate-600">{t('pol.loading')}</p>
        ) : null}

        {state.status === 'ok' ? (
          <>
            <p className="mt-4 text-sm text-slate-500">
              {t('pol.updated')}{' '}
              {new Intl.DateTimeFormat(lang, {
                dateStyle: 'long',
              }).format(new Date(state.data.updatedAt))}
            </p>
            <article className="prose prose-slate prose-headings:scroll-mt-24 prose-h1:text-2xl prose-a:text-brandBlue hover:prose-a:text-brandBlue/80 mt-8 max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children, ...props }) => (
                    <h2 {...props}>{children}</h2>
                  ),
                }}
              >
                {state.data.content}
              </ReactMarkdown>
            </article>
          </>
        ) : null}

        {state.status === 'fallback' ? (
          <Fallback reason={state.reason} slug={slug} defaultTitle={defaultTitle} />
        ) : null}
      </div>
    </section>
  )
}

function Fallback({
  reason,
  slug,
  defaultTitle,
}: {
  reason: 'not_found' | 'error'
  slug: PolicySlug
  defaultTitle: string
}) {
  const { t } = useT()
  const intro = t(reason === 'not_found' ? 'pol.notPublished' : 'pol.loadFailed', { title: defaultTitle })

  return (
    <>
      <p className="mt-5 text-base leading-relaxed text-slate-600">
        {intro}{' '}
        <a
          href={`mailto:${SITE_META.supportEmail}`}
          className="font-semibold text-brandBlue hover:underline"
        >
          {SITE_META.supportEmail}
        </a>
      </p>

      {slug === 'privacy' ? (
        <div className="mt-10 space-y-8">
          <Section
            title={t('pol.s1t')}
            body={t('pol.s1b')}
          />
          <Section
            title={t('pol.s2t')}
            body={t('pol.s2b')}
          />
          <Section
            title={t('pol.s3t')}
            body={t('pol.s3b')}
          />
          <Section
            title={t('pol.s4t')}
            body={t('pol.s4b', { email: SITE_META.supportEmail })}
          />
        </div>
      ) : null}
    </>
  )
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  )
}
