import { useId, useMemo, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { confirmPasswordReset } from 'firebase/auth'
import { KeyRound } from 'lucide-react'
import { getFirebaseAuth } from '../lib/firebase'
import { StoreButtons } from '../components/StoreButtons'
import { routeMeta } from '../config/routeMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT, type Key } from '../i18n'

/** Firebase minimum is 6; we enforce higher for basic strength. */
const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 128

/** Firebase error code → message key. */
function mapFirebaseAuthError(code: string): Key {
  switch (code) {
    case 'auth/invalid-action-code':
      return 'rp.invalidCode'
    case 'auth/expired-action-code':
      return 'rp.expiredCode'
    case 'auth/weak-password':
      return 'rp.weak'
    case 'auth/user-disabled':
      return 'rp.disabled'
    case 'auth/too-many-requests':
      return 'rp.tooMany'
    case 'auth/network-request-failed':
      return 'rp.network'
    default:
      return 'rp.generic'
  }
}

function parseResetLink(searchParams: URLSearchParams): {
  ok: true
  oobCode: string
} | {
  ok: false
  reason: 'missing_code' | 'wrong_mode' | 'wrong_project'
} {
  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')
  const linkApiKey = searchParams.get('apiKey')
  const expectedKey = import.meta.env.VITE_FIREBASE_API_KEY

  if (mode && mode !== 'resetPassword') {
    return { ok: false, reason: 'wrong_mode' }
  }
  if (!oobCode) {
    return { ok: false, reason: 'missing_code' }
  }
  if (expectedKey && linkApiKey && linkApiKey !== expectedKey) {
    return { ok: false, reason: 'wrong_project' }
  }
  return { ok: true, oobCode }
}

function hasFirebaseWebConfig(): boolean {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
      import.meta.env.VITE_FIREBASE_PROJECT_ID,
  )
}

export function ResetPassword() {
  usePageMeta(routeMeta('/reset-password'))
  const { t } = useT()

  const [searchParams] = useSearchParams()
  const link = useMemo(() => parseResetLink(searchParams), [searchParams])
  const formId = useId()
  const pwdId = `${formId}-pwd`
  const confirmId = `${formId}-confirm`

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const configOk = hasFirebaseWebConfig()
  const canSubmit =
    link.ok && configOk && !done && password.length >= MIN_PASSWORD_LENGTH && password === confirm

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!link.ok || !configOk) return
    setError(null)
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(t('rp.min', { n: MIN_PASSWORD_LENGTH }))
      return
    }
    if (password.length > MAX_PASSWORD_LENGTH) {
      setError(t('rp.max', { n: MAX_PASSWORD_LENGTH }))
      return
    }
    if (password !== confirm) {
      setError(t('rp.mismatch'))
      return
    }
    setLoading(true)
    try {
      const auth = getFirebaseAuth()
      await confirmPasswordReset(auth, link.oobCode, password)
      setPassword('')
      setConfirm('')
      setDone(true)
    } catch (err: unknown) {
      const code =
        err && typeof err === 'object' && 'code' in err && typeof (err as { code: unknown }).code === 'string'
          ? (err as { code: string }).code
          : ''
      setError(t(mapFirebaseAuthError(code || 'unknown')))
    } finally {
      setLoading(false)
    }
  }

  let banner: ReactNode = null
  if (!configOk) {
    banner = (
      <div
        className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-950"
        role="status"
      >
        {t('rp.noConfig')}
      </div>
    )
  } else if (!link.ok) {
    const msg =
      link.reason === 'wrong_mode'
        ? t('rp.wrongMode')
        : link.reason === 'wrong_project'
          ? t('rp.wrongProject')
          : t('rp.missing')
    banner = (
      <div
        className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900"
        role="alert"
      >
        {msg}
      </div>
    )
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brandBlue/10 text-brandBlue">
              <KeyRound className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {t('rp.title')}
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                {t('rp.lead')}
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

        {banner}

        {done ? (
          <div
            className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900"
            role="status"
          >
            <p className="font-semibold">{t('rp.doneTitle')}</p>
            <p className="mt-2">
              {t('rp.doneText')}{' '}
              <Link to="/support" className="font-semibold underline hover:no-underline">
                {t('page.contactSupport')}
              </Link>
              .
            </p>
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-900/80">
                {t('rp.getApp')}
              </p>
              <StoreButtons variant="secondary" />
            </div>
          </div>
        ) : null}

        {!done && link.ok && configOk ? (
          <>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">{t('rp.tips')}</h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-600">
                <li>{t('rp.tip1', { n: MIN_PASSWORD_LENGTH })}</li>
                <li>{t('rp.tip2')}</li>
                <li>{t('rp.tip3')}</li>
              </ul>
            </div>

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
                <label htmlFor={pwdId} className="block text-sm font-semibold text-slate-800">
                  {t('rp.new')}
                </label>
                <input
                  id={pwdId}
                  type="password"
                  name="new-password"
                  autoComplete="new-password"
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  maxLength={MAX_PASSWORD_LENGTH}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20"
                  placeholder={t('rp.newPh')}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor={confirmId} className="block text-sm font-semibold text-slate-800">
                  {t('rp.confirm')}
                </label>
                <input
                  id={confirmId}
                  type="password"
                  name="confirm-new-password"
                  autoComplete="new-password"
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  maxLength={MAX_PASSWORD_LENGTH}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20"
                  placeholder={t('rp.confirmPh')}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !canSubmit}
                className="w-full rounded-2xl bg-brandBlue px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? t('rp.saving') : t('rp.save')}
              </button>
              {password.length > 0 && password !== confirm ? (
                <p className="text-sm text-slate-600">{t('rp.mustMatch')}</p>
              ) : null}
            </form>
          </>
        ) : null}

        <p className="mt-10 text-sm leading-relaxed text-slate-600">
          {t('page.questions')}{' '}
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
