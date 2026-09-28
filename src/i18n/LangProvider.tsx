import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LangContext, translate, type Ctx, type Lang } from './index'

function isLang(v: unknown): v is Lang {
  return v === 'en' || v === 'az' || v === 'ru'
}

/** ?lang= wins, then the visitor's saved choice, then the browser language, else English. */
function detect(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (isLang(q)) return q
    const saved = localStorage.getItem('bp.lang')
    if (isLang(saved)) return saved
    const browser = (navigator.language || '').slice(0, 2).toLowerCase()
    if (isLang(browser)) return browser
  } catch {
    /* prerender or storage blocked */
  }
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect)
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('bp.lang', l)
    } catch {
      /* storage blocked: the choice lasts for this visit */
    }
  }, [])
  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (key, vars) => translate(lang, key, vars) }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
