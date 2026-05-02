import { Link, useLocation } from 'react-router-dom'
import appLogo from '../assets/Be-Positive-App-Logo.png'
import { FOOTER_LEGAL_LINKS } from '../lib/policyPages'

export function Footer() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <footer className="bg-brandNavy text-white" id="footer-legal">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-start">
          <div className="flex max-w-md items-start gap-4">
            <Link
              to="/"
              className="group shrink-0 rounded-2xl p-0.5 focus-ring focus-visible:ring-offset-brandNavy"
              aria-label="Be Positive home"
            >
              <img
                src={appLogo}
                alt=""
                width={48}
                height={48}
                decoding="async"
                className="h-12 w-12 rounded-2xl object-contain shadow-lg ring-1 ring-white/20 transition group-hover:ring-brandYellow/50 sm:h-14 sm:w-14"
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div>
                <p className="text-lg font-extrabold tracking-tight">Be Positive</p>
                <p className="mt-1 text-sm text-white/80">
                  Plan your day. Stay focused. Feel positive.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <a
                  href="mailto:info@bepositive.cc"
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-brandNavy"
                >
                  info@bepositive.cc
                </a>
                <a
                  href={isLanding ? '#contact' : '/#contact'}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-brandNavy"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Legal & policies
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
                {FOOTER_LEGAL_LINKS.map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-sm font-semibold text-white/90 underline-offset-2 transition hover:text-white hover:underline focus-ring focus-visible:ring-offset-brandNavy"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 text-center">
          <p className="text-xs text-white/70">
            © 2026 Be Positive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

