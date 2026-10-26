import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Flag } from './Flag'
import { LANGS, useT } from '../i18n'

/** One button with the current flag and code; opens a list of the four languages, like a filter. */
export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t('nav.language')}: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-brandBlue focus-ring motion-reduce:transition-none"
      >
        <Flag code={current.code} />
        <span>{current.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open ? (
        <ul role="listbox" aria-label={t('nav.language')} className="absolute right-0 z-50 mt-2 min-w-[11rem] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang === l.code}
                lang={l.code}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition focus-ring motion-reduce:transition-none ${
                  lang === l.code ? 'bg-slate-100 text-brandBlue' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Flag code={l.code} />
                <span className="flex-1">{l.native}</span>
                <span className="text-xs text-slate-400">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
