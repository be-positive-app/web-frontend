import { Clock, HelpCircle, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

const SUPPORT_EMAIL = 'info@bepositive.cc'

export function Support() {
  usePageMeta({
    title: 'Support',
    description:
      'Get help with Be Positive Life Planner. Contact support, see response times, and find what to include in your message.',
    path: '/support',
  })

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Support
          </h1>
          <Link
            to="/"
            className="shrink-0 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            Back home
          </Link>
        </div>

        <p className="mt-5 text-base leading-relaxed text-slate-600">
          Questions, feedback, or account issues? Email us — we read every message and
          do our best to reply quickly.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Be%20Positive%20support`}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brandBlue px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            <Mail className="h-5 w-5 shrink-0" aria-hidden />
            {SUPPORT_EMAIL}
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
            <div className="flex items-center gap-2 text-brandBlue">
              <Clock className="h-5 w-5" aria-hidden />
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Response time
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We typically respond within a few business days. Complex issues may take a
              bit longer — we’ll keep you posted.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
            <div className="flex items-center gap-2 text-brandBlue">
              <HelpCircle className="h-5 w-5" aria-hidden />
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Include in your email
              </h2>
            </div>
            <ul className="mt-2 list-inside list-disc text-sm leading-relaxed text-slate-600">
              <li>What you were trying to do</li>
              <li>Device type (e.g. iPhone / Android) and app version if relevant</li>
              <li>Screenshots if something looks wrong</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-2 text-brandBlue">
            <MessageCircle className="h-5 w-5" aria-hidden />
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Privacy & data
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            For how we handle personal data, see our{' '}
            <Link to="/privacy" className="font-semibold text-brandBlue hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
