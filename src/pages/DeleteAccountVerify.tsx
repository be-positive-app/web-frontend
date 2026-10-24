import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { apiV1Url } from '../lib/apiBase'
import { routeMeta } from '../config/routeMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

type Phase = 'loading' | 'confirmed' | 'cancelled' | 'error'

export function DeleteAccountVerify() {
  const { t, lang } = useT()
  usePageMeta(routeMeta('/delete-account/verify'))

  const { token } = useParams<{ token: string }>()
  const ranRef = useRef(false)

  const [phase, setPhase] = useState<Phase>('loading')
  const [message, setMessage] = useState<string | null>(null)
  const [scheduledDeletionAt, setScheduledDeletionAt] = useState<string | null>(null)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)

  const confirmOnce = useCallback(async () => {
    if (!token?.trim()) {
      setPhase('error')
      setMessage(t('delv.invalid'))
      return
    }
    try {
      const res = await fetch(apiV1Url(`/account/confirm-deletion/${encodeURIComponent(token)}`), {
        method: 'POST',
        headers: { Accept: 'application/json' },
      })
      const body = (await res.json().catch(() => null)) as {
        message?: string
        scheduledDeletionAt?: string
      } | null
      if (!res.ok) {
        const msg =
          typeof body?.message === 'string'
            ? body.message
            : res.status === 404
              ? t('delv.expired')
              : t('delv.confirmFailed', { status: res.status })
        setPhase('error')
        setMessage(msg)
        return
      }
      setScheduledDeletionAt(body?.scheduledDeletionAt ?? null)
      setMessage(typeof body?.message === 'string' ? body.message : null)
      setPhase('confirmed')
    } catch {
      setPhase('error')
      setMessage(t('page.network'))
    }
  }, [token, t])

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true
    void confirmOnce()
  }, [confirmOnce])

  async function handleCancel() {
    if (!token?.trim()) return
    setCancelError(null)
    setCancelLoading(true)
    try {
      const res = await fetch(apiV1Url(`/account/cancel-deletion/${encodeURIComponent(token)}`), {
        method: 'POST',
        headers: { Accept: 'application/json' },
      })
      const body = (await res.json().catch(() => null)) as { message?: string } | null
      if (!res.ok) {
        const msg =
          typeof body?.message === 'string'
            ? body.message
            : t('delv.cancelFailed', { status: res.status })
        setCancelError(msg)
        return
      }
      setPhase('cancelled')
      setMessage(typeof body?.message === 'string' ? body.message : t('delv.cancelledText'))
    } catch {
      setCancelError(t('page.network'))
    } finally {
      setCancelLoading(false)
    }
  }

  const formattedDate =
    scheduledDeletionAt != null
      ? new Date(scheduledDeletionAt).toLocaleString(lang, {
          dateStyle: 'long',
          timeStyle: 'short',
        })
      : null

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t('delv.title')}
          </h1>
          <Link
            to="/"
            className="shrink-0 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            {t('page.backHome')}
          </Link>
        </div>

        {phase === 'loading' ? (
          <div className="mt-10 flex items-center gap-3 text-slate-600">
            <Loader2 className="h-6 w-6 shrink-0 animate-spin text-brandBlue" aria-hidden />
            <p>{t('delv.confirming')}</p>
          </div>
        ) : null}

        {phase === 'error' ? (
          <div className="mt-10 flex gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900">
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">{t('page.wrong')}</p>
              <p className="mt-1">{message}</p>
              <p className="mt-3">
                <Link to="/delete-account" className="font-semibold text-brandBlue hover:underline">
                  {t('delv.startOver')}
                </Link>{' '}
                {t('page.or')}{' '}
                <Link to="/support" className="font-semibold text-brandBlue hover:underline">
                  {t('page.contactSupport')}
                </Link>
                .
              </p>
            </div>
          </div>
        ) : null}

        {phase === 'confirmed' ? (
          <div className="mt-10 space-y-6">
            <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-950">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-700" aria-hidden />
              <div>
                <p className="font-semibold">{t('delv.scheduled')}</p>
                {message ? <p className="mt-1">{message}</p> : null}
                {formattedDate ? (
                  <p className="mt-2 font-medium">
                    {t('delv.after')} <time dateTime={scheduledDeletionAt ?? undefined}>{formattedDate}</time>
                  </p>
                ) : null}
              </div>
            </div>
            <p className="text-sm text-slate-600">
              {t('delv.changed')}
            </p>
            {cancelError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                {cancelError}
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => void handleCancel()}
              disabled={cancelLoading}
              className="rounded-2xl border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brandBlue hover:text-brandBlue focus-ring disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelLoading ? t('delv.cancelling') : t('delv.cancel')}
            </button>
          </div>
        ) : null}

        {phase === 'cancelled' ? (
          <div className="mt-10 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">{t('delv.cancelledTitle')}</p>
              <p className="mt-1">{message}</p>
              <p className="mt-3">
                <Link to="/" className="font-semibold text-brandBlue hover:underline">
                  {t('page.backHome')}
                </Link>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
