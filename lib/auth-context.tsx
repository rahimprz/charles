'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from './firebase'

interface AuthContextType {
  currentUser: User | null
  authLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setAuthLoading(false)
    })
    return () => unsubscribe()
  }, [])

  /**
   * Sign in with email and password.
   * Throws a user-friendly error on failure.
   */
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        throw new Error('Incorrect email or password. Please try again.')
      }
      if (code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Account temporarily locked. Please try later or reset your password.')
      }
      if (code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.')
      }
      throw new Error('Sign in failed. Please try again.')
    }
  }

  /**
   * Sign out the current admin user.
   */
  const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth)
  }

  /**
   * Securely change the admin password.
   * SECURITY: Re-authenticates with current password FIRST before allowing
   * any password update. Prevents session-hijacking attacks.
   */
  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    const user = auth.currentUser
    if (!user || !user.email) {
      throw new Error('No authenticated user found. Please sign in again.')
    }

    // Validate new password strength on the client (additional layer)
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long.')
    }
    if (!/[A-Z]/.test(newPassword)) {
      throw new Error('New password must contain at least one uppercase letter.')
    }
    if (!/[0-9]/.test(newPassword)) {
      throw new Error('New password must contain at least one number.')
    }

    // Step 1: Re-authenticate with CURRENT password (REQUIRED for security)
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    try {
      await reauthenticateWithCredential(user, credential)
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        throw new Error('Current password is incorrect. Password was NOT changed.')
      }
      if (code === 'auth/too-many-requests') {
        throw new Error('Too many attempts. Please wait a few minutes before trying again.')
      }
      throw new Error('Re-authentication failed. Please sign out and sign back in.')
    }

    // Step 2: Update password (only reachable after successful re-auth)
    try {
      await updatePassword(user, newPassword)
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/weak-password') {
        throw new Error('New password is too weak. Choose a stronger password.')
      }
      throw new Error('Failed to update password. Please try again.')
    }
  }

  /**
   * Send password reset email (fallback if admin is locked out).
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase())
    } catch (err: any) {
      throw new Error('Failed to send password reset email. Check the email address.')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authLoading,
        signIn,
        signOut,
        changePassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
