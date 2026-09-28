import { LANGS, useT } from '../i18n'

/** EN / AZ / RU pills; the choice is remembered in the browser. */
export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useT()
  return (
    <div className={`inline-flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50 p-0.5 ${className}`} role="radiogroup" aria-label={t('nav.language')}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          role="radio"
          aria-checked={lang === l.code}
          lang={l.code}
          title={l.native}
          onClick={() => setLang(l.code)}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition focus-ring motion-reduce:transition-none ${
            lang === l.code ? 'bg-white text-brandBlue shadow-sm' : 'text-slate-500 hover:text-brandBlue'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
