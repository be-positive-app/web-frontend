import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { POLICY_PAGES } from './lib/policyPages'
import { useT } from './i18n'
import { ConsentBanner } from './components/ConsentBanner'
import { trackPageView } from './lib/analytics'

const Landing = lazy(() => import('./pages/Landing').then((m) => ({ default: m.Landing })))
import { Home } from './pages/Home'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
const Teams = lazy(() => import('./pages/Teams').then((m) => ({ default: m.Teams })))
const PolicyDocumentPage = lazy(() =>
  import('./pages/PolicyDocumentPage').then((m) => ({ default: m.PolicyDocumentPage })),
)
const Support = lazy(() => import('./pages/Support').then((m) => ({ default: m.Support })))
const Security = lazy(() => import('./pages/Security').then((m) => ({ default: m.Security })))
const Help = lazy(() => import('./pages/Help').then((m) => ({ default: m.Help })))
const DeleteAccount = lazy(() =>
  import('./pages/DeleteAccount').then((m) => ({ default: m.DeleteAccount })),
)
const DeleteAccountVerify = lazy(() =>
  import('./pages/DeleteAccountVerify').then((m) => ({ default: m.DeleteAccountVerify })),
)
const ResetPassword = lazy(() =>
  import('./pages/ResetPassword').then((m) => ({ default: m.ResetPassword })),
)
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

/** Tells analytics about page changes inside the single-page site (the first view is counted on load). */
function PageViews() {
  const { pathname } = useLocation()
  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])
  return null
}

export default function App() {
  const { t } = useT()
  return (
    <div className="flex min-h-dvh flex-col bg-white text-slate-900">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brandBlue focus:shadow-soft focus-ring"
        href="#main"
      >
        {t('app.skip')}
      </a>

      <Navbar />
      <PageViews />

      <main id="main" className="flex-1">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<Landing />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {['az', 'ru', 'tr'].map((l) => [
              <Route key={`${l}-blog`} path={`/${l}/blog`} element={<Blog />} />,
              <Route key={`${l}-post`} path={`/${l}/blog/:slug`} element={<BlogPost />} />,
            ])}
            {/* Azerbaijani, Russian and Turkish editions: same pages, own URLs so search engines index each language. */}
            <Route path="/az" element={<Home />} />
            <Route path="/ru" element={<Home />} />
            <Route path="/az/app" element={<Landing />} />
            <Route path="/ru/app" element={<Landing />} />
            <Route path="/tr/app" element={<Landing />} />
            <Route path="/az/teams" element={<Teams />} />
            <Route path="/ru/teams" element={<Teams />} />
            <Route path="/tr" element={<Home />} />
            <Route path="/tr/teams" element={<Teams />} />
            {POLICY_PAGES.map(({ slug, path }) => (
              <Route
                key={slug}
                path={path}
                element={<PolicyDocumentPage slug={slug} />}
              />
            ))}
            <Route path="/support" element={<Support />} />
            <Route path="/security" element={<Security />} />
            <Route path="/help" element={<Help />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/delete-account/verify/:token" element={<DeleteAccountVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ConsentBanner />
    </div>
  )
}
