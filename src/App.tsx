import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { POLICY_PAGES } from './lib/policyPages'

const Landing = lazy(() => import('./pages/Landing').then((m) => ({ default: m.Landing })))
const PolicyDocumentPage = lazy(() =>
  import('./pages/PolicyDocumentPage').then((m) => ({ default: m.PolicyDocumentPage })),
)
const Support = lazy(() => import('./pages/Support').then((m) => ({ default: m.Support })))
const DeleteAccount = lazy(() =>
  import('./pages/DeleteAccount').then((m) => ({ default: m.DeleteAccount })),
)
const DeleteAccountVerify = lazy(() =>
  import('./pages/DeleteAccountVerify').then((m) => ({ default: m.DeleteAccountVerify })),
)
const ResetPassword = lazy(() =>
  import('./pages/ResetPassword').then((m) => ({ default: m.ResetPassword })),
)

export default function App() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brandBlue focus:shadow-soft focus-ring"
        href="#main"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Landing />} />
            {POLICY_PAGES.map(({ slug, path }) => (
              <Route
                key={slug}
                path={path}
                element={<PolicyDocumentPage slug={slug} />}
              />
            ))}
            <Route path="/support" element={<Support />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/delete-account/verify/:token" element={<DeleteAccountVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
