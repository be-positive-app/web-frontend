import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
}

function assertFirebaseConfig(): void {
  const missing: string[] = []
  if (!firebaseConfig.apiKey) missing.push('VITE_FIREBASE_API_KEY')
  if (!firebaseConfig.authDomain) missing.push('VITE_FIREBASE_AUTH_DOMAIN')
  if (!firebaseConfig.projectId) missing.push('VITE_FIREBASE_PROJECT_ID')
  if (missing.length > 0) {
    throw new Error(`Missing Firebase env: ${missing.join(', ')}. Set VITE_FIREBASE_* for this site.`)
  }
}

export function getFirebaseAuth() {
  assertFirebaseConfig()
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  return getAuth(app)
}
