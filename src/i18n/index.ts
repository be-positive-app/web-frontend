import { createContext, useContext } from 'react'
import { en, type Dict, type Key } from './en'
import { az } from './az'
import { ru } from './ru'

export type Lang = 'en' | 'az' | 'ru'
export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'az', label: 'AZ', native: 'Azərbaycanca' },
  { code: 'ru', label: 'RU', native: 'Русский' },
]

export const DICTS: Record<Lang, Dict> = { en, az, ru }
export function translate(lang: Lang, key: Key, vars?: Record<string, string | number>): string {
  const raw = DICTS[lang][key] ?? en[key]
  return vars ? raw.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`)) : raw
}

export type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: Key, vars?: Record<string, string | number>) => string }
export const LangContext = createContext<Ctx | null>(null)

export function useT(): Ctx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useT() needs <LangProvider>')
  return ctx
}

export type { Key }
