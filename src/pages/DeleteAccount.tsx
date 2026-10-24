import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Trash2 } from 'lucide-react'
import { apiV1Url } from '../lib/apiBase'
import { routeMeta } from '../config/routeMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

export function DeleteAccount() {
  usePageMeta(routeMeta('/delete-account'))
  const { t } = useT()

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
            : t('del.failed', { status: res.status })
        throw new Error(msg)
      }
      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('page.wrong'))
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
                {t('del.title')}
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                {t('del.lead')}
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="shrink-0 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            {t('page.backHome')}
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">{t('del.howTitle')}</h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed text-slate-600">
            <li>{t('del.step1')}</li>
            <li>{t('del.step2')}</li>
            <li>{t('del.step3')}</li>
            <li>{t('del.step4')}</li>
          </ol>
        </div>

        {success ? (
          <div
            className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900"
            role="status"
          >
            {t('del.sent')}{' '}
            <Link to="/support" className="font-semibold underline hover:no-underline">
              {t('page.contactSupport')}
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
              {t('del.email')}
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
            {loading ? t('del.sending') : t('del.send')}
          </button>
        </form>

        <p className="mt-10 text-sm leading-relaxed text-slate-600">
          {t('del.help')}{' '}
          <Link to="/support" className="font-semibold text-brandBlue hover:underline">
            {t('page.visitSupport')}
          </Link>{' '}
          {t('page.or')}{' '}
          <Link to="/privacy" className="font-semibold text-brandBlue hover:underline">
            {t('legal.privacy')}
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
