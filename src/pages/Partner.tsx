import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlertCircle, Loader2 } from 'lucide-react'
import { apiV1Url } from '../lib/apiBase'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

type Stats = {
  name: string
  counts: 'users' | 'companies'
  days: number
  since: string
  totals: { clicks: number; people: number; signups: number; paying: number; signupRate: number | null }
  platforms: { ios: number; android: number; desktop: number }
  daily: { date: string; clicks: number; signups: number }[]
  updatedAt: string
}

const TEXT = {
  en: {
    title: 'Link results',
    sub: 'What happened after people opened your Be Positive link.',
    clicks: 'Opens',
    people: 'People',
    signups: 'Sign-ups',
    companies: 'Companies',
    paying: 'Bought premium',
    payingB2b: 'Paying companies',
    rate: 'of opens signed up',
    phones: 'Where they opened it',
    byDay: 'By day',
    days: (n: number) => `Last ${n} days`,
    updated: 'Updated',
    gone: 'This page is not shared any more. Ask Be Positive for a new link.',
    error: 'Could not load the results. Try again in a minute.',
    privacy: 'Counts only: no names, e-mails or anything that identifies a person.',
  },
  az: {
    title: 'Linkin nəticələri',
    sub: 'İnsanlar Be Positive linkinizi açandan sonra nə baş verdi.',
    clicks: 'Açılış',
    people: 'İnsan',
    signups: 'Qeydiyyat',
    companies: 'Şirkət',
    paying: 'Premium alan',
    payingB2b: 'Ödəyən şirkət',
    rate: 'açanlardan qeydiyyatdan keçdi',
    phones: 'Harada açıblar',
    byDay: 'Günlər üzrə',
    days: (n: number) => `Son ${n} gün`,
    updated: 'Yeniləndi',
    gone: 'Bu səhifə artıq paylaşılmır. Be Positive-dən yeni link istəyin.',
    error: 'Nəticələr yüklənmədi. Bir dəqiqədən sonra yenidən yoxlayın.',
    privacy: 'Yalnız saylar: ad, e-poçt və ya insanı tanıdan heç nə yoxdur.',
  },
}

export function Partner() {
  const { lang } = useT()
  const L = lang === 'az' ? TEXT.az : TEXT.en
  usePageMeta({ title: L.title, path: '/partner', noindex: true })
  const { token = '' } = useParams<{ token: string }>()
  const [days, setDays] = useState(30)
  const [state, setState] = useState<{ key: string; data?: Stats; gone?: boolean; error?: boolean } | null>(null)
  const key = `${token}:${days}`

  useEffect(() => {
    let live = true
    fetch(apiV1Url(`/partner-stats/${encodeURIComponent(token)}?days=${days}`), {
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        if (!live) return
        if (res.status === 404) return setState({ key, gone: true })
        if (!res.ok) return setState({ key, error: true })
        setState({ key, data: (await res.json()) as Stats })
      })
      .catch(() => live && setState({ key, error: true }))
    return () => {
      live = false
    }
  }, [token, days, key])

  const current = state?.key === key ? state : null
  const d = current?.data
  const n = (v: number) => v.toLocaleString(lang === 'az' ? 'az-AZ' : 'en-US')

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:py-14">
      <p className="text-sm font-semibold text-brandBlue">Be Positive</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{d?.name ?? L.title}</h1>
      <p className="mt-2 text-slate-600">{L.sub}</p>

      <div className="mt-6 inline-flex rounded-xl bg-slate-100 p-1" role="tablist">
        {[7, 30, 90].map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={days === v}
            onClick={() => setDays(v)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition focus-ring ${
              days === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {L.days(v)}
          </button>
        ))}
      </div>

      {!current && (
        <div className="mt-10 flex items-center gap-2 text-slate-500" aria-busy="true">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      )}

      {(current?.gone || current?.error) && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 p-5 text-slate-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <p>{current.gone ? L.gone : L.error}</p>
        </div>
      )}

      {d && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: L.clicks, value: n(d.totals.clicks) },
              { label: L.people, value: n(d.totals.people) },
              {
                label: d.counts === 'companies' ? L.companies : L.signups,
                value: n(d.totals.signups),
                sub: d.totals.signupRate !== null ? `${d.totals.signupRate}% ${L.rate}` : undefined,
              },
              { label: d.counts === 'companies' ? L.payingB2b : L.paying, value: n(d.totals.paying) },
            ].map((t) => (
              <div key={t.label} className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-medium text-slate-500">{t.label}</div>
                <div className="mt-1 text-2xl font-bold tracking-tight">{t.value}</div>
                {t.sub && <div className="mt-0.5 text-xs text-slate-500">{t.sub}</div>}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-5">
            <div className="text-sm font-semibold">{L.byDay}</div>
            <DailyBars daily={d.daily} />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-5">
            <div className="text-sm font-semibold">{L.phones}</div>
            <div className="mt-3 space-y-2">
              {(
                [
                  ['iPhone', d.platforms.ios],
                  ['Android', d.platforms.android],
                  ['Desktop', d.platforms.desktop],
                ] as const
              ).map(([label, v]) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span className="w-20 text-slate-600">{label}</span>
                  <div className="h-2 flex-1 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-brandBlue"
                      style={{ width: `${d.totals.clicks ? (v / d.totals.clicks) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="w-12 text-right tabular-nums">{n(v)}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            {L.privacy} {L.updated} {new Date(d.updatedAt).toLocaleString(lang === 'az' ? 'az-AZ' : 'en-US')}.
          </p>
        </>
      )}
    </section>
  )
}

function DailyBars({ daily }: { daily: Stats['daily'] }) {
  const max = Math.max(1, ...daily.map((x) => x.clicks))
  return (
    <div className="mt-3">
      <div className="flex h-32 items-end gap-[2px]" role="img" aria-label="Opens by day">
        {daily.map((x) => (
          <div
            key={x.date}
            title={`${x.date}: ${x.clicks} / ${x.signups}`}
            className="relative flex-1 rounded-t bg-brandBlue/25"
            style={{ height: `${Math.max(2, (x.clicks / max) * 100)}%` }}
          >
            {x.signups > 0 && (
              <div
                className="absolute inset-x-0 bottom-0 rounded-t bg-brandBlue"
                style={{ height: `${Math.min(100, (x.signups / Math.max(1, x.clicks)) * 100)}%` }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-slate-500">
        <span>{daily[0]?.date}</span>
        <span>{daily[daily.length - 1]?.date}</span>
      </div>
    </div>
  )
}
