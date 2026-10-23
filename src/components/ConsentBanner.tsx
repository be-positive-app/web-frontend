import { useState } from 'react'
import { Link } from 'react-router-dom'
import { analyticsConfigured, readConsent, setConsent } from '../lib/analytics'
import { useT } from '../i18n'

/** Asks once before any analytics or ad tags load; hidden when none are configured. */
export function ConsentBanner() {
  const { t } = useT()
  const [open, setOpen] = useState(() => analyticsConfigured && typeof window !== 'undefined' && readConsent() === null)
  if (!open) return null
  const choose = (c: 'granted' | 'denied') => {
    setConsent(c)
    setOpen(false)
  }
  return (
    <div role="region" aria-label={t('consent.title')} className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:inset-x-6 sm:p-5">
      <p className="text-sm font-semibold text-slate-900">{t('consent.title')}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        {t('consent.text')}{' '}
        <Link to="/cookies" className="font-semibold text-brandBlue hover:underline">{t('consent.more')}</Link>
      </p>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <button type="button" onClick={() => choose('denied')} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 focus-ring">
          {t('consent.decline')}
        </button>
        <button type="button" onClick={() => choose('granted')} className="rounded-xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brandNavy focus-ring">
          {t('consent.accept')}
        </button>
      </div>
    </div>
  )
}
