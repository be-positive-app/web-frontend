import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { apiV1Url } from '../lib/apiBase'
import { policyMetaForSlug, type PolicySlug } from '../lib/policyPages'

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
  const defaultTitle = meta?.label ?? 'Policy'

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
            Back home
          </Link>
        </div>

        {state.status === 'loading' ? (
          <p className="mt-6 text-base text-slate-600">Loading…</p>
        ) : null}

        {state.status === 'ok' ? (
          <>
            <p className="mt-4 text-sm text-slate-500">
              Last updated:{' '}
              {new Intl.DateTimeFormat(undefined, {
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
  const intro =
    reason === 'not_found'
      ? `${defaultTitle} is not published yet. Please check back later or contact us.`
      : `We could not load ${defaultTitle.toLowerCase()}. Please try again later or contact us.`

  return (
    <>
      <p className="mt-5 text-base leading-relaxed text-slate-600">
        {intro}{' '}
        <a
          href="mailto:info@bepositive.cc"
          className="font-semibold text-brandBlue hover:underline"
        >
          info@bepositive.cc
        </a>
      </p>

      {slug === 'privacy' ? (
        <div className="mt-10 space-y-8">
          <Section
            title="Information we collect"
            body="Be Positive may collect basic app usage data to improve performance and reliability. The full policy will list what is collected and why once it is published."
          />
          <Section
            title="How we use information"
            body="We use information to provide and improve the app, keep it secure, and understand what features are most helpful."
          />
          <Section
            title="Data sharing"
            body="We do not sell your data. Third-party services used by the app (such as analytics or crash reporting) will be described in the published policy."
          />
          <Section
            title="Contact"
            body="Questions about privacy: info@bepositive.cc"
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
