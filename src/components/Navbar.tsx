import { Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import appLogo from '../assets/Be-Positive-App-Logo.png'
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  function onHomeClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function onContactClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId('contact'), 0)
      return
    }
    scrollToId('contact')
  }

  function onDownloadClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId('home'), 0)
      return
    }
    scrollToId('home')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group inline-flex items-center rounded-xl px-1 py-0.5 focus-ring"
          aria-label="Be Positive home"
        >
          <img
            src={appLogo}
            alt="Be Positive"
            width={40}
            height={40}
            decoding="async"
            className="h-9 w-9 shrink-0 rounded-2xl object-contain shadow-sm ring-1 ring-slate-200/50 transition group-hover:shadow-md group-hover:ring-brandYellow/40 sm:h-10 sm:w-10"
          />
        </Link>

        <nav className="hidden items-center gap-2 sm:flex" aria-label="Primary">
          <a
            href="#home"
            onClick={onHomeClick}
            className="rounded-xl px-3 py-2 text-base font-semibold text-slate-700 transition hover:text-brandBlue focus-ring motion-reduce:transition-none"
          >
            Home
          </a>
          <Link
            to="/privacy"
            className="rounded-xl px-3 py-2 text-base font-semibold text-slate-700 transition hover:text-brandBlue focus-ring motion-reduce:transition-none"
          >
            Privacy
          </Link>
          <a
            href="#contact"
            onClick={onContactClick}
            className="rounded-xl px-3 py-2 text-base font-semibold text-slate-700 transition hover:text-brandBlue focus-ring motion-reduce:transition-none"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl p-2 text-slate-700 transition hover:bg-slate-100 focus-ring motion-reduce:transition-none sm:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <a
          href="#home"
          onClick={onDownloadClick}
          className="hidden items-center justify-center gap-2 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring motion-reduce:transition-none sm:inline-flex"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download
        </a>
      </div>

      {open ? (
        <div className="border-t border-slate-200/70 bg-white/90 backdrop-blur sm:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-4">
            <div className="grid gap-2">
              <a
                href="#home"
                onClick={onHomeClick}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-100 focus-ring motion-reduce:transition-none"
              >
                Home
              </a>
              <Link
                to="/privacy"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-100 focus-ring motion-reduce:transition-none"
              >
                Privacy
              </Link>
              <a
                href="#contact"
                onClick={onContactClick}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-100 focus-ring motion-reduce:transition-none"
              >
                Contact
              </a>
              <a
                href="#home"
                onClick={onDownloadClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brandBlue px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring motion-reduce:transition-none"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

