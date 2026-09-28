import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LangContext, translate, type Ctx, type Lang } from './index'
import { basePath, langFromPath, localizedPath } from './paths'

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

/**
 * The URL decides first: /az/… is Azerbaijani and /ru/… Russian for everyone,
 * crawlers included. Elsewhere the visitor's choice (or browser language)
 * applies. Switching language on a page that has language editions moves to
 * that edition's URL, so the address bar and what is shown always agree.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const [chosen, setChosen] = useState<Lang>(detect)
  const lang = langFromPath(pathname) ?? chosen

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback(
    (l: Lang) => {
      setChosen(l)
      try {
        localStorage.setItem('bp.lang', l)
      } catch {
        /* storage blocked: the choice lasts for this visit */
      }
      const base = basePath(pathname)
      const target = localizedPath(l, base)
      if (target !== pathname && (target !== base || langFromPath(pathname))) {
        navigate(`${target}${search}${hash}`)
      }
    },
    [pathname, search, hash, navigate],
  )
  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (key, vars) => translate(lang, key, vars) }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
