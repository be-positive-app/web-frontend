import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Trash2 } from 'lucide-react'
import { apiV1Url } from '../lib/apiBase'

export function DeleteAccount() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setSuccess(false)
    try {
      const res = await fetch(apiV1Url('/account/request-deletion'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null
        const msg = Array.isArray(body?.message)
          ? body.message.join(', ')
          : typeof body?.message === 'string'
            ? body.message
            : `Request failed (${res.status})`
        throw new Error(msg)
      }
      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brandBlue/10 text-brandBlue">
              <Trash2 className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Delete account & data
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Request permanent removal of your Be Positive account and associated data from our
                systems.
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="shrink-0 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            Back home
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">How it works</h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed text-slate-600">
            <li>Enter the email address you use with the app.</li>
            <li>We send a confirmation link (valid 24 hours).</li>
            <li>After you confirm, there is a 30-day grace period before data is permanently deleted.</li>
            <li>During that period you can cancel deletion using the link we show after confirmation.</li>
          </ol>
        </div>

        {success ? (
          <div
            className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900"
            role="status"
          >
            If an account exists for this email, we&apos;ve sent a confirmation link. Check your
            inbox (and spam). If you don&apos;t see it, you can try again or{' '}
            <Link to="/support" className="font-semibold underline hover:no-underline">
              contact support
            </Link>
            .
          </div>
        ) : null}

        {error ? (
          <div
            className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="delete-email" className="block text-sm font-semibold text-slate-800">
              Email address
            </label>
            <div className="relative mt-2">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                id="delete-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brandBlue px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? 'Sending…' : 'Send confirmation link'}
          </button>
        </form>

        <p className="mt-10 text-sm leading-relaxed text-slate-600">
          Need help instead?{' '}
          <Link to="/support" className="font-semibold text-brandBlue hover:underline">
            Visit support
          </Link>{' '}
          or see our{' '}
          <Link to="/privacy" className="font-semibold text-brandBlue hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
