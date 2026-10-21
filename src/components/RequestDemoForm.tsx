import { useState, type FormEvent } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { apiV1Url } from '../lib/apiBase'
import { useT, type Key } from '../i18n'

const SIZES = ['1-10', '11-50', '51-200', '200+'] as const
const INDUSTRIES: { value: string; key: Key }[] = [
  { value: 'Restaurant', key: 'teams.ind.restaurant' },
  { value: 'Retail', key: 'teams.ind.retail' },
  { value: 'Agency', key: 'teams.ind.agency' },
  { value: 'Clinic', key: 'teams.ind.clinic' },
  { value: 'Education', key: 'teams.ind.education' },
  { value: 'Beauty', key: 'teams.ind.beauty' },
  { value: 'Services', key: 'teams.ind.services' },
  { value: 'Other', key: 'teams.ind.other' },
]

const field = 'mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20'
const label = 'block text-sm font-semibold text-slate-700'

/**
 * "Request a demo": posts to the public demo-requests endpoint. The team
 * approves it in the admin panel, the company is opened on a trial and the
 * person gets the sign-in e-mail.
 */
export function RequestDemoForm() {
  const { t, lang } = useT()
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [teamSize, setTeamSize] = useState<(typeof SIZES)[number]>('11-50')
  const [industry, setIndustry] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(false)
    try {
      const res = await fetch(apiV1Url('/organizations/demo-requests'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          company: company.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          teamSize,
          industry: industry || undefined,
          note: note.trim() || undefined,
          language: lang,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setSentTo(email.trim())
    } catch {
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  if (sentTo) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
        <div>
          <p className="text-base font-bold text-slate-900">{t('demo.successTitle')}</p>
          <p className="mt-1 text-sm text-slate-600">{t('demo.successText', { email: sentTo })}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          {t('form.company')}
          <input className={field} value={company} onChange={(e) => setCompany(e.target.value)} required maxLength={120} autoComplete="organization" />
        </label>
        <label className={label}>
          {t('form.name')}
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} autoComplete="name" />
        </label>
        <label className={label}>
          {t('form.email')}
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} autoComplete="email" />
        </label>
        <label className={label}>
          {t('form.phone')} <span className="font-normal text-slate-400">({t('form.optional')})</span>
          <input className={field} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} autoComplete="tel" />
        </label>
        <label className={label}>
          {t('demo.industry')}
          <select className={field} value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option value="">{t('demo.pickIndustry')}</option>
            {INDUSTRIES.map((i) => <option key={i.value} value={i.value}>{t(i.key)}</option>)}
          </select>
        </label>
        <fieldset>
          <legend className={label}>{t('form.teamSize')}</legend>
          <div className="mt-1.5 inline-flex flex-wrap items-center gap-1 rounded-3xl border border-slate-200 bg-slate-50 p-1">
            {SIZES.map((s) => (
              <button key={s} type="button" role="radio" aria-checked={teamSize === s} onClick={() => setTeamSize(s)} className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-ring ${teamSize === s ? 'bg-white text-brandBlue shadow-sm' : 'text-slate-600 hover:text-brandBlue'}`}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <label className={label}>
        {t('demo.note')} <span className="font-normal text-slate-400">({t('form.optional')})</span>
        <textarea className={`${field} min-h-[80px] resize-y`} value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} />
      </label>
      {error && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{t('form.error')}</p>
      )}
      <button type="submit" disabled={busy} className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-brandBlue px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring disabled:opacity-60">
        <Send className="h-4 w-4" aria-hidden="true" />
        {busy ? t('form.sending') : t('demo.submit')}
      </button>
      <p className="text-xs text-slate-500">{t('demo.privacy')}</p>
    </form>
  )
}
