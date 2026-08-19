'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'
import {
  AuthorDataStore,
  Book,
  ContactMessage,
  DEFAULT_AUTHOR_DATA,
} from './author-data'

// ─── Firestore collection/document paths ────────────────────────────────────
const SITE_DOC_PATH = 'site/config'
const MESSAGES_COLLECTION = 'messages'
const SUBSCRIBERS_COLLECTION = 'subscribers'

// ─── Context type ────────────────────────────────────────────────────────────
interface AuthorContextType {
  data: AuthorDataStore
  isLoaded: boolean
  updateAuthor: (author: Partial<AuthorDataStore['author']>) => Promise<void>
  updateSeries: (series: Partial<AuthorDataStore['series']>) => Promise<void>
  updateSettings: (settings: Partial<AuthorDataStore['settings']>) => Promise<void>
  addBook: (book: Omit<Book, 'id'>) => Promise<Book>
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>
  deleteBook: (id: string) => Promise<void>
  addMessage: (msg: { name: string; email: string; website?: string; subject?: string; message: string }) => Promise<void>
  markMessageRead: (id: string, read: boolean) => Promise<void>
  deleteMessage: (id: string) => Promise<void>
  addSubscriber: (email: string) => Promise<boolean>
  deleteSubscriber: (id: string) => Promise<void>
  resetData: () => Promise<void>
}

const AuthorContext = createContext<AuthorContextType | null>(null)

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Generate a unique ID client-side (mimics Firestore auto-id format) */
function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/** Ensure the Firestore site/config document exists, seeding defaults if not */
async function ensureSiteDoc(): Promise<void> {
  const ref = doc(db, SITE_DOC_PATH)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      author: DEFAULT_AUTHOR_DATA.author,
      series: DEFAULT_AUTHOR_DATA.series,
      books: DEFAULT_AUTHOR_DATA.books,
      settings: DEFAULT_AUTHOR_DATA.settings,
      seededAt: serverTimestamp(),
    })
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthorProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AuthorDataStore>(DEFAULT_AUTHOR_DATA)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let messagesUnsub: (() => void) | null = null
    let subscribersUnsub: (() => void) | null = null
    let configUnsub: (() => void) | null = null

    // Seed and subscribe to config document
    ensureSiteDoc()
      .then(() => {
        // Real-time listener on site/config
        configUnsub = onSnapshot(
          doc(db, SITE_DOC_PATH),
          (snap) => {
            if (snap.exists()) {
              const d = snap.data()
              setData((prev) => ({
                ...prev,
                author: { ...DEFAULT_AUTHOR_DATA.author, ...(d.author || {}) },
                series: { ...DEFAULT_AUTHOR_DATA.series, ...(d.series || {}) },
                books: Array.isArray(d.books) && d.books.length > 0 ? d.books : DEFAULT_AUTHOR_DATA.books,
                settings: { ...DEFAULT_AUTHOR_DATA.settings, ...(d.settings || {}) },
              }))
            }
          },
          (err) => {
            // If permission denied (logged-out public user), use defaults silently
            console.warn('Firestore config read error (expected for logged-out users):', err.code)
          }
        )

        // Real-time listener on messages (ordered by createdAt desc)
        messagesUnsub = onSnapshot(
          query(collection(db, MESSAGES_COLLECTION), orderBy('createdAt', 'desc')),
          (snap) => {
            const msgs: ContactMessage[] = snap.docs.map((d) => ({
              ...(d.data() as Omit<ContactMessage, 'id'>),
              id: d.id,
              createdAt:
                d.data().createdAt?.toDate?.()?.toISOString?.() || d.data().createdAt || new Date().toISOString(),
            }))
            setData((prev) => ({ ...prev, messages: msgs }))
            setIsLoaded(true)
          },
          () => {
            // Gracefully handle permission errors for public users
            setIsLoaded(true)
          }
        )

        // Real-time listener on subscribers
        subscribersUnsub = onSnapshot(
          query(collection(db, SUBSCRIBERS_COLLECTION), orderBy('createdAt', 'desc')),
          (snap) => {
            const subs = snap.docs.map((d) => ({
              ...(d.data() as any),
              id: d.id,
              createdAt:
                d.data().createdAt?.toDate?.()?.toISOString?.() || d.data().createdAt || new Date().toISOString(),
            }))
            setData((prev) => ({ ...prev, subscribers: subs }))
          },
          () => {
            // Gracefully handle permission errors
          }
        )
      })
      .catch(() => {
        // Firestore unreachable (offline / before auth) — fall back to defaults
        setIsLoaded(true)
      })

    return () => {
      configUnsub?.()
      messagesUnsub?.()
      subscribersUnsub?.()
    }
  }, [])

  // ── Author / Series / Settings updates ──────────────────────────────────
  const updateAuthor = useCallback(async (authorUpdates: Partial<AuthorDataStore['author']>) => {
    const ref = doc(db, SITE_DOC_PATH)
    const snap = await getDoc(ref)
    const current = snap.exists() ? (snap.data().author || {}) : {}
    await updateDoc(ref, { author: { ...current, ...authorUpdates }, updatedAt: serverTimestamp() })
  }, [])

  const updateSeries = useCallback(async (seriesUpdates: Partial<AuthorDataStore['series']>) => {
    const ref = doc(db, SITE_DOC_PATH)
    const snap = await getDoc(ref)
    const current = snap.exists() ? (snap.data().series || {}) : {}
    await updateDoc(ref, { series: { ...current, ...seriesUpdates }, updatedAt: serverTimestamp() })
  }, [])

  const updateSettings = useCallback(async (settingsUpdates: Partial<AuthorDataStore['settings']>) => {
    const ref = doc(db, SITE_DOC_PATH)
    const snap = await getDoc(ref)
    const current = snap.exists() ? (snap.data().settings || {}) : {}
    await updateDoc(ref, { settings: { ...current, ...settingsUpdates }, updatedAt: serverTimestamp() })
  }, [])

  // ── Books CRUD ────────────────────────────────────────────────────────────
  const addBook = useCallback(async (bookData: Omit<Book, 'id'>): Promise<Book> => {
    const newBook: Book = { ...bookData, id: `book-${newId()}` }
    const ref = doc(db, SITE_DOC_PATH)
    const snap = await getDoc(ref)
    const currentBooks: Book[] = snap.exists() ? (snap.data().books || []) : []
    await updateDoc(ref, { books: [...currentBooks, newBook], updatedAt: serverTimestamp() })
    return newBook
  }, [])

  const updateBook = useCallback(async (id: string, updates: Partial<Book>) => {
    const ref = doc(db, SITE_DOC_PATH)
    const snap = await getDoc(ref)
    const currentBooks: Book[] = snap.exists() ? (snap.data().books || []) : []
    const updated = currentBooks.map((b) => (b.id === id ? { ...b, ...updates } : b))
    await updateDoc(ref, { books: updated, updatedAt: serverTimestamp() })
  }, [])

  const deleteBook = useCallback(async (id: string) => {
    const ref = doc(db, SITE_DOC_PATH)
    const snap = await getDoc(ref)
    const currentBooks: Book[] = snap.exists() ? (snap.data().books || []) : []
    await updateDoc(ref, {
      books: currentBooks.filter((b) => b.id !== id),
      updatedAt: serverTimestamp(),
    })
  }, [])

  // ── Messages CRUD ─────────────────────────────────────────────────────────
  const addMessage = useCallback(
    async (msg: { name: string; email: string; website?: string; subject?: string; message: string }) => {
      await addDoc(collection(db, MESSAGES_COLLECTION), {
        name: msg.name,
        email: msg.email,
        website: msg.website || '',
        subject: msg.subject || 'General Inquiry',
        message: msg.message,
        createdAt: serverTimestamp(),
        read: false,
      })
    },
    []
  )

  const markMessageRead = useCallback(async (id: string, read: boolean) => {
    await updateDoc(doc(db, MESSAGES_COLLECTION, id), { read })
  }, [])

  const deleteMessage = useCallback(async (id: string) => {
    await deleteDoc(doc(db, MESSAGES_COLLECTION, id))
  }, [])

  // ── Subscribers CRUD ──────────────────────────────────────────────────────
  const addSubscriber = useCallback(async (email: string): Promise<boolean> => {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !trimmed.includes('@')) return false
    // Prevent duplicate: check in-memory state first (fast path)
    const exists = data.subscribers.some((s) => s.email.toLowerCase() === trimmed)
    if (exists) return true
    await addDoc(collection(db, SUBSCRIBERS_COLLECTION), {
      email: trimmed,
      createdAt: serverTimestamp(),
    })
    return true
  }, [data.subscribers])

  const deleteSubscriber = useCallback(async (id: string) => {
    await deleteDoc(doc(db, SUBSCRIBERS_COLLECTION, id))
  }, [])

  // ── Full reset (seeds Firestore with defaults) ────────────────────────────
  const resetData = useCallback(async () => {
    await setDoc(doc(db, SITE_DOC_PATH), {
      author: DEFAULT_AUTHOR_DATA.author,
      series: DEFAULT_AUTHOR_DATA.series,
      books: DEFAULT_AUTHOR_DATA.books,
      settings: DEFAULT_AUTHOR_DATA.settings,
      resetAt: serverTimestamp(),
    })
  }, [])

  return (
    <AuthorContext.Provider
      value={{
        data,
        isLoaded,
        updateAuthor,
        updateSeries,
        updateSettings,
        addBook,
        updateBook,
        deleteBook,
        addMessage,
        markMessageRead,
        deleteMessage,
        addSubscriber,
        deleteSubscriber,
        resetData,
      }}
    >
      {children}
    </AuthorContext.Provider>
  )
}

export function useAuthorData() {
  const context = useContext(AuthorContext)
  if (!context) {
    throw new Error('useAuthorData must be used within an AuthorProvider')
  }
  return context
}
