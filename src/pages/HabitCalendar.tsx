import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, Download, Printer, Share2 } from 'lucide-react'
import { StoreButtons } from '../components/StoreButtons'
import { SITE_META } from '../config/siteMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT, type Key } from '../i18n'
import { useLocalRouteMeta } from '../i18n/paths'
import { track } from '../lib/analytics'

const CAMPAIGN = 'habit_calendar'
const STORE_KEY = 'bp_habit_calendar'
const PRESETS: Key[] = ['habit.preset1', 'habit.preset2', 'habit.preset3', 'habit.preset4']

/** Where the QR code on the printed sheet and the app buttons lead, tagged so the funnel shows this tool. */
const appLanding = (source: string) =>
  `${SITE_META.siteUrl}/app?utm_source=${source}&utm_medium=tool&utm_campaign=${CAMPAIGN}`
const googlePlay = `${SITE_META.googlePlayUrl}&referrer=${encodeURIComponent(
  `utm_source=tool&utm_medium=web&utm_campaign=${CAMPAIGN}`,
)}`

type Saved = { habit: string; start: string; done: number[] }

// Spelled out here: some browsers have no Azerbaijani month names and print "M10".
const MONTHS: Record<string, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  az: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
}

function longDate(d: Date, lang: string) {
  const m = (MONTHS[lang] ?? MONTHS.en)[d.getMonth()]
  return lang === 'en' ? `${m} ${d.getDate()}, ${d.getFullYear()}` : `${d.getDate()} ${m} ${d.getFullYear()}`
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function load(): Saved | null {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? 'null') as Saved | null
  } catch {
    return null
  }
}

/**
 * Free tool: a printable 30-day habit tracker. Type a habit, pick a start
 * day, tick the days on screen or download the sheet as a PDF to print.
 * Everything stays in the visitor's browser.
 */
export function HabitCalendar() {
  usePageMeta(useLocalRouteMeta('/tools/habit-calendar'))
  const { t, lang } = useT()
  const saved = useMemo(load, [])
  const [habit, setHabit] = useState(saved?.habit ?? t('habit.preset1'))
  const [start, setStart] = useState(saved?.start ?? today())
  const [done, setDone] = useState<Set<number>>(new Set(saved?.done ?? []))
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ habit, start, done: [...done] }))
    } catch {
      /* storage blocked */
    }
  }, [habit, start, done])

  const startDate = useMemo(() => {
    const [y, m, d] = start.split('-').map(Number)
    return y && m && d ? new Date(y, m - 1, d) : new Date()
  }, [start])
  const fmt = useMemo(() => ({ format: (d: Date) => longDate(d, lang) }), [lang])
  const days = Array.from({ length: 30 }, (_, i) => new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i))
  const title = habit.trim() || t('habit.preset1')

  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  async function downloadPdf() {
    setBusy(true)
    try {
      const { sheetPdf } = await import('../lib/habitPdf')
      const blob = await sheetPdf(
        {
          kicker: t('habit.kicker'),
          habit: title,
          dates: t('habit.dates', { from: fmt.format(days[0]), to: fmt.format(days[29]) }),
          why: t('habit.why'),
          reward: t('habit.reward'),
          longest: t('habit.longest'),
          days: t('habit.daysUnit'),
          ctaTitle: t('habit.ctaTitle'),
          ctaBody: t('habit.pdfBody'),
          url: 'bepositive.cc',
        },
        startDate,
        appLanding('tool_pdf'),
      )
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `habit-calendar-${start}.pdf`
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 1000)
      track('tool_download', { tool: CAMPAIGN, lang })
    } finally {
      setBusy(false)
    }
  }

  async function share() {
    const url = `${location.origin}${location.pathname}?utm_source=share&utm_medium=tool&utm_campaign=${CAMPAIGN}`
    try {
      if (navigator.share) await navigator.share({ title: t('habit.h1'), url })
      else {
        await navigator.clipboard.writeText(url)
        alert(t('habit.copied'))
      }
      track('tool_share', { tool: CAMPAIGN, lang })
    } catch {
      /* cancelled */
    }
  }

  const btn =
    'inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-bold transition focus-ring disabled:opacity-60'

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-brandYellow px-3 py-1 text-xs font-extrabold text-brandNavy">
          {t('habit.badge')}
        </span>
        <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-brandNavy sm:text-5xl">
          {t('habit.h1')}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">{t('habit.lead')}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-5 rounded-3xl bg-[#f4f6fe] p-5 sm:p-6 print:hidden">
          <div className="flex flex-col gap-2">
            <label htmlFor="habit" className="text-[15px] font-extrabold text-brandNavy">
              {t('habit.label')}
            </label>
            <input
              id="habit"
              value={habit}
              maxLength={60}
              onChange={(e) => setHabit(e.target.value)}
              className="h-12 rounded-2xl border-[1.5px] border-[#c9d2f5] bg-white px-4 text-[16px] font-semibold text-brandNavy focus-ring"
            />
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setHabit(t(k))}
                  className="h-9 rounded-full border-[1.5px] border-[#e3e8fb] bg-white px-3 text-[13px] font-bold text-brandNavy focus-ring"
                >
                  {t(k)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="start" className="text-[15px] font-extrabold text-brandNavy">
              {t('habit.start')}
            </label>
            <input
              id="start"
              type="date"
              value={start}
              onChange={(e) => e.target.value && setStart(e.target.value)}
              className="h-12 rounded-2xl border-[1.5px] border-[#c9d2f5] bg-white px-4 text-[16px] font-semibold text-brandNavy focus-ring"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={downloadPdf} disabled={busy} className={`${btn} bg-brandBlue text-white hover:bg-[#3a50d9]`}>
              <Download className="h-4 w-4" aria-hidden="true" />
              {busy ? t('habit.preparing') : t('habit.download')}
            </button>
            <button type="button" onClick={() => window.print()} className={`${btn} border-[1.5px] border-[#c9d2f5] bg-white text-brandNavy`}>
              <Printer className="h-4 w-4" aria-hidden="true" />
              {t('habit.print')}
            </button>
            <button type="button" onClick={share} className={`${btn} border-[1.5px] border-[#c9d2f5] bg-white text-brandNavy`}>
              <Share2 className="h-4 w-4" aria-hidden="true" />
              {t('habit.share')}
            </button>
          </div>
        </div>

        <section
          aria-label={title}
          className="min-w-0 flex-[999_1_560px] rounded-3xl border-[1.5px] border-[#e3e8fb] p-5 sm:p-8 print:border-0 print:p-0"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-brandNavy sm:text-3xl">{title}</h2>
            <span className="text-sm font-bold text-slate-600">{t('habit.progress', { n: done.size })}</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            {t('habit.dates', { from: fmt.format(days[0]), to: fmt.format(days[29]) })}
          </p>
          <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-6 sm:gap-3">
            {days.map((d, i) => {
              const on = done.has(i)
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  aria-label={t('habit.day', { n: i + 1 })}
                  onClick={() => toggle(i)}
                  className={`flex aspect-square flex-col items-center justify-center rounded-2xl border-2 text-brandNavy transition focus-ring ${
                    on ? 'border-[#e6d800] bg-brandYellow' : 'border-[#e3e8fb] bg-white hover:border-[#c9d2f5]'
                  }`}
                >
                  {on ? <Check className="h-6 w-6" aria-hidden="true" /> : <span className="text-lg font-extrabold">{i + 1}</span>}
                  <span className="text-[11px] font-bold text-slate-600">
                    {String(d.getDate()).padStart(2, '0')}.{String(d.getMonth() + 1).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-brandYellow p-6 sm:p-8 print:hidden">
        <div className="max-w-2xl">
          <p className="text-2xl font-extrabold text-brandNavy">{t('habit.ctaTitle')}</p>
          <p className="mt-1 text-base leading-relaxed text-brandNavy">{t('habit.ctaBody')}</p>
        </div>
        <StoreButtons appStoreHref={SITE_META.appStoreUrl} googlePlayHref={googlePlay} />
      </div>

      <article className="mt-12 max-w-3xl space-y-4 text-[17px] leading-relaxed text-slate-700 print:hidden">
        <h2 className="text-2xl font-extrabold text-brandNavy">{t('habit.howH')}</h2>
        <p>{t('habit.howP1')}</p>
        <p>{t('habit.howP2')}</p>
        <h2 className="pt-4 text-2xl font-extrabold text-brandNavy">{t('habit.faqH')}</h2>
        <h3 className="text-lg font-extrabold text-brandNavy">{t('habit.faq1q')}</h3>
        <p>{t('habit.faq1a')}</p>
        <h3 className="text-lg font-extrabold text-brandNavy">{t('habit.faq2q')}</h3>
        <p>{t('habit.faq2a')}</p>
        <h3 className="text-lg font-extrabold text-brandNavy">{t('habit.faq3q')}</h3>
        <p>{t('habit.faq3a')}</p>
        <a
          href={appLanding('tool_page')}
          className="inline-flex items-center gap-2 font-extrabold text-brandBlue hover:underline focus-ring"
        >
          {t('habit.more')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </article>
    </div>
  )
}
