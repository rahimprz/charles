import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA-zlS88YVf0IFzSLse4LZtdQ4k45XhWCM',
  authDomain: 'tess-d8c42.firebaseapp.com',
  projectId: 'tess-d8c42',
  storageBucket: 'tess-d8c42.firebasestorage.app',
  messagingSenderId: '377379473939',
  appId: '1:377379473939:web:c7f6c13cfaa6c3c52a0de6',
  measurementId: 'G-CX8WPGC5Q5',
}

// Prevent duplicate initialization in Next.js dev hot-reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
export const auth = getAuth(app)

// Persist auth session across page reloads (localStorage-based browser session)
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch(() => {
    // Non-critical: silently ignore persistence errors
  })
}

export default app
