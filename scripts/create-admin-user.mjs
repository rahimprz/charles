/**
 * One-time script to create the Firebase admin user for Charles David Tebbs website.
 * Run with: node scripts/create-admin-user.mjs
 *
 * Requirements:
 *   - Firebase project must have Email/Password auth enabled
 *   - Run this once, then delete or secure this file
 */

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA-zlS88YVf0IFzSLse4LZtdQ4k45XhWCM',
  authDomain: 'tess-d8c42.firebaseapp.com',
  projectId: 'tess-d8c42',
  storageBucket: 'tess-d8c42.firebasestorage.app',
  messagingSenderId: '377379473939',
  appId: '1:377379473939:web:c7f6c13cfaa6c3c52a0de6',
}

const ADMIN_EMAIL = 'admin@charlesdavidtebbsauthor.com'
const ADMIN_PASSWORD = 'David@Author2024'

async function createAdmin() {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  try {
    const { user } = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
    console.log('✅ Admin user created successfully!')
    console.log(`   Email:    ${user.email}`)
    console.log(`   UID:      ${user.uid}`)
    console.log('')
    console.log('🔐 Login credentials for the Admin Portal:')
    console.log(`   Email:    ${ADMIN_EMAIL}`)
    console.log(`   Password: ${ADMIN_PASSWORD}`)
    console.log('')
    console.log('⚠️  Change your password in Admin → Settings → Change Password after first login!')
    process.exit(0)
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      console.log('ℹ️  Admin user already exists — you can log in with:')
      console.log(`   Email:    ${ADMIN_EMAIL}`)
      console.log(`   Password: ${ADMIN_PASSWORD}`)
      console.log('   (If you changed the password before, use your new password.)')
    } else {
      console.error('❌ Error creating admin:', err.message)
    }
    process.exit(0)
  }
}

createAdmin()
