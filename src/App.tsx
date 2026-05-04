import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { POLICY_PAGES } from './lib/policyPages'
import { Landing } from './pages/Landing'
import { PolicyDocumentPage } from './pages/PolicyDocumentPage'
import { Support } from './pages/Support'
import { DeleteAccount } from './pages/DeleteAccount'
import { DeleteAccountVerify } from './pages/DeleteAccountVerify'
import { ResetPassword } from './pages/ResetPassword'

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
      </main>

      <Footer />
    </div>
  )
}
