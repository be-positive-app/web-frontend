import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import appLogoPng from '../assets/logo-128.png'
import appLogoWebp from '../assets/logo-128.webp'
import { SITE_META } from '../config/siteMeta'
import { FOOTER_LEGAL_LINKS } from '../lib/policyPages'
import { useT } from '../i18n'
import { localizedPath } from '../i18n/paths'
import { TEAMS_APP_URL } from '../config/teamsPricing'

/**
 * The MilliNet badge is drawn by the vendor's script where it sits in index.html (under the app).
 * Once the footer is on screen the finished element is moved into its bottom row, so it shares
 * the footer's colour and sits to the right of the legal line instead of in a band of its own.
 */
function useMilliNetInFooter() {
  const slot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const banner = document.getElementById('millinet-banner')
    const target = slot.current
    if (!banner || !target || banner.parentElement === target) return
    target.appendChild(banner)
    return () => {
      // Another page's footer takes it next; put it back under the app meanwhile.
      if (banner.parentElement === target) document.body.appendChild(banner)
    }
  }, [])
  return slot
}

export function Footer() {
  const milliNet = useMilliNetInFooter()
  const location = useLocation()
  const isLanding = /^\/(?:(?:az|ru|tr)\/)?app$/.test(location.pathname)
  const isTeams = /^\/(?:(?:az|ru|tr)\/)?(?:teams|blog)/.test(location.pathname)
  const { t, lang } = useT()

  return (
    <footer className="surface-blue text-white" id="footer-legal">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-start">
          <div className="flex max-w-md items-start gap-4">
            <Link
              to="/"
              className="group shrink-0 rounded-2xl p-0.5 focus-ring focus-visible:ring-offset-[#4660f2]"
              aria-label="Be Positive home"
            >
              <picture className="contents">
                <source srcSet={appLogoWebp} type="image/webp" />
                <img
                  src={appLogoPng}
                  alt="Be Positive"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 rounded-2xl object-contain shadow-lg ring-1 ring-white/20 transition group-hover:ring-brandYellow/50 sm:h-14 sm:w-14"
                />
              </picture>
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div>
                <p className="text-lg font-extrabold tracking-tight">Be Positive{isTeams ? ` ${t('brand.biz')}` : ''}</p>
                <p className="mt-1 text-sm text-white/80">
                  {t(isTeams ? 'footer.teamsTagline' : 'footer.tagline')}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <a
                  href={`mailto:${SITE_META.supportEmail}`}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]"
                >
                  {SITE_META.supportEmail}
                </a>
                {isTeams ? (
                  <>
                    <a href={`${localizedPath(lang, '/teams')}#pricing`} className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]">{t('teams.nav.pricing')}</a>
                    <a href={`${localizedPath(lang, '/teams')}#demo`} className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]">{t('teams.nav.demo')}</a>
                    <Link to={localizedPath(lang, '/blog')} className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]">{t('blog.nav')}</Link>
                    <a href={TEAMS_APP_URL} className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]">{t('teams.nav.login')}</a>
                    <Link to={localizedPath(lang, '/app')} className="rounded-xl px-3 py-2 text-sm font-semibold text-brandYellow transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]">{t('footer.personal')}</Link>
                  </>
                ) : (
                  <>
                    <a
                      href={isLanding ? '#faq' : `${localizedPath(lang, '/app')}#faq`}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]"
                    >
                      {t('footer.faq')}
                    </a>
                    <a
                      href={isLanding ? '#contact' : `${localizedPath(lang, '/app')}#contact`}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]"
                    >
                      {t('footer.contact')}
                    </a>
                    <Link to={localizedPath(lang, '/teams')} className="rounded-xl px-3 py-2 text-sm font-semibold text-brandYellow transition hover:text-white focus-ring focus-visible:ring-offset-[#4660f2]">{t('footer.companies')}</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex items-center gap-2">
              <a href={SITE_META.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 focus-ring focus-visible:ring-offset-[#4660f2]">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href={SITE_META.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 focus-ring focus-visible:ring-offset-[#4660f2]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3v-11zm7 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91H10v-11z" /></svg>
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
                {t('footer.legal')}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
                {FOOTER_LEGAL_LINKS.map(({ path, key }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-sm font-semibold text-white/90 underline-offset-2 transition hover:text-white hover:underline focus-ring focus-visible:ring-offset-[#4660f2]"
                    >
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-white/15 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-xs text-white/70">
              {t('footer.rights')}
            </p>
            <p className="mt-1 text-xs text-white/70">
              {t('footer.voen', { id: SITE_META.taxId })}
            </p>
          </div>
          <div ref={milliNet} className="shrink-0" aria-label="MilliNet 2026" />
        </div>
      </div>
    </footer>
  )
}

