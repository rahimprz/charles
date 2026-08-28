'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useAuthorData } from '@/lib/author-context'
import { Book } from '@/lib/author-data'
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Edit3,
  Eye,
  EyeOff,
  Feather,
  Key,
  Layers,
  Loader2,
  LogOut,
  Mail,
  MailOpen,
  MessageSquare,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  User,
  Users,
  X,
} from 'lucide-react'

// ─── Tiny reusable loading skeleton ──────────────────────────────────────────
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-stone-200 ${className}`}
      aria-hidden="true"
    />
  )
}

// ─── Password strength meter ──────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  const checks = [
    { label: '8+ chars', pass: password.length >= 8 },
    { label: 'Uppercase', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Symbol', pass: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter((c) => c.pass).length
  const colors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500', 'bg-emerald-600']
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= score ? colors[score] : 'bg-stone-200'
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`text-[10px] font-semibold ${c.pass ? 'text-emerald-700' : 'text-stone-400'}`}
          >
            {c.pass ? '✓' : '○'} {c.label}
          </span>
        ))}
        {score > 0 && (
          <span className={`ml-auto text-[10px] font-bold ${score >= 3 ? 'text-emerald-700' : 'text-orange-600'}`}>
            {labels[score]}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({
  message,
  type = 'success',
  onClose,
}: {
  message: string
  type?: 'success' | 'error'
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [message, onClose])

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold shadow-2xl border animate-in slide-in-from-bottom-4 fade-in ${
        type === 'success'
          ? 'bg-ink text-white border-gold/40'
          : 'bg-red-700 text-white border-red-500'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="size-5 text-red-300 shrink-0" />
      )}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="shrink-0 opacity-70 hover:opacity-100">
        <X className="size-4" />
      </button>
    </div>
  )
}

// ─── Login screen ─────────────────────────────────────────────────────────────
function LoginScreen() {
  const { signIn, resetPassword } = useAuth()
  const [email, setEmail] = useState('admin@charlesdavidtebbsauthor.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('admin@charlesdavidtebbsauthor.com')
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const targetEmail = (email.trim() || 'admin@charlesdavidtebbsauthor.com').toLowerCase()
    const rawPassword = password.trim()
    if (!rawPassword) return

    setLoading(true)
    setError('')

    // Handle legacy simple passwords seamlessly (david, author, admin, 1234, tebbs)
    const legacyPasswords = ['david', 'author', 'admin', '1234', 'tebbs']
    const isLegacy = legacyPasswords.includes(rawPassword.toLowerCase())
    const firstAttemptPassword = isLegacy ? 'David@Author2024' : rawPassword

    try {
      await signIn(targetEmail, firstAttemptPassword)
    } catch (err: any) {
      // If legacy attempt failed (e.g., user changed password to something else), try raw input
      if (firstAttemptPassword !== rawPassword) {
        try {
          await signIn(targetEmail, rawPassword)
          return
        } catch {
          // fall through
        }
      }
      setError(
        err.message ||
          'Sign in failed. Default email is admin@charlesdavidtebbsauthor.com with password David@Author2024.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail.trim()) return
    setResetLoading(true)
    try {
      await resetPassword(resetEmail.trim())
      setResetSent(true)
    } catch (err: any) {
      setError(err.message || 'Reset failed.')
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-parchment via-background to-parchment/80 selection:bg-gold selection:text-primary-foreground">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/90 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Feather className="size-5 text-gold transition-transform group-hover:-rotate-12" />
            <span className="font-serif text-lg font-bold text-ink">Charles David Tebbs</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-ink"
          >
            ← Back to Website
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-5">
        <div className="w-full max-w-md space-y-4">
          {/* Card */}
          <div className="overflow-hidden rounded-2xl border-2 border-gold/40 bg-card shadow-2xl">
            {/* Top Banner */}
            <div className="bg-ink px-8 py-6 text-center">
              <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-gold/20 shadow-inner">
                <ShieldCheck className="size-7 text-gold" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-white">Author Admin Portal</h1>
              <p className="mt-1 text-xs text-stone-400">
                Manage books, bio, messages &amp; newsletter
              </p>
            </div>

            <div className="px-8 py-8">
              {!showReset ? (
                <form onSubmit={handleLogin} className="space-y-5" noValidate>
                  {/* Email */}
                  <div>
                    <label htmlFor="admin-email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                      Admin Email
                    </label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="admin-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@charlesdavidtebbsauthor.com"
                        disabled={loading}
                        className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                      Password
                    </label>
                    <div className="relative mt-1.5">
                      <Key className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        ref={passwordRef}
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password (e.g. David@Author2024 or david)"
                        disabled={loading}
                        className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-12 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                      <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !password.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition-all hover:bg-gold hover:text-ink active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-4" />
                        <span>Sign In to Admin</span>
                      </>
                    )}
                  </button>

                  {/* Quick Access Helper */}
                  <div className="rounded-lg border border-gold/40 bg-parchment/60 p-3 text-[11px] text-muted-foreground space-y-1">
                    <p className="font-bold text-ink flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-gold" />
                      <span>Author Login Credentials:</span>
                    </p>
                    <p className="text-foreground/80">
                      Email: <span className="font-mono font-semibold text-ink select-all">admin@charlesdavidtebbsauthor.com</span>
                    </p>
                    <p className="text-foreground/80">
                      Password: <span className="font-mono font-semibold text-ink select-all">David@Author2024</span> <span className="text-[10px] text-muted-foreground">(or simply &ldquo;david&rdquo;)</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setShowReset(true); setError('') }}
                    className="w-full text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-gold transition-colors"
                  >
                    Forgot password? Reset via email
                  </button>
                </form>
              ) : (
                /* Password Reset Form */
                <form onSubmit={handleReset} className="space-y-4" noValidate>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink">Reset Password</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Enter your admin email to receive a reset link from Firebase.
                    </p>
                  </div>

                  {resetSent ? (
                    <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs text-emerald-800">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      <span>Reset email sent! Check your inbox and follow the link to reset your password.</span>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="reset-email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                          Admin Email
                        </label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            id="reset-email"
                            type="email"
                            required
                            autoFocus
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="your-email@example.com"
                            className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                      </div>
                      {error && (
                        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                          <AlertCircle className="mt-0.5 size-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={resetLoading || !resetEmail.trim()}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-gold hover:text-ink disabled:opacity-50"
                      >
                        {resetLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                        <span>{resetLoading ? 'Sending...' : 'Send Reset Link'}</span>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => { setShowReset(false); setError(''); setResetSent(false) }}
                    className="w-full text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-ink transition-colors"
                  >
                    ← Back to sign in
                  </button>
                </form>
              )}
            </div>
          </div>

          <p className="text-center text-[11px] text-muted-foreground">
            Secured by Firebase Authentication • Session persists until you sign out
          </p>
        </div>
      </main>
    </div>
  )
}

// ─── Dashboard loading skeleton ───────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="sticky top-0 z-40 border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-52" />
          <div className="flex gap-3">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-md" />
          ))}
        </div>
      </div>
      {/* Content skeleton */}
      <div className="p-8 space-y-6">
        <Skeleton className="h-9 w-72" />
        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-12 gap-6">
          <Skeleton className="col-span-7 h-72 rounded-xl" />
          <Skeleton className="col-span-5 h-72 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// ─── Change Password Panel ────────────────────────────────────────────────────
function ChangePasswordPanel({ onSuccess }: { onSuccess: (msg: string) => void; onError: (msg: string) => void }) {
  const { changePassword } = useAuth()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [show, setShow] = useState({ current: false, next: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.current) errs.current = 'Current password is required.'
    if (!form.next) errs.next = 'New password is required.'
    else if (form.next.length < 8) errs.next = 'Must be at least 8 characters.'
    else if (!/[A-Z]/.test(form.next)) errs.next = 'Must contain an uppercase letter.'
    else if (!/[0-9]/.test(form.next)) errs.next = 'Must contain a number.'
    if (form.next && form.confirm !== form.next) errs.confirm = 'Passwords do not match.'
    if (form.current && form.next && form.current === form.next) errs.next = 'New password must differ from current.'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const errs = validate()
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      await changePassword(form.current, form.next)
      setForm({ current: '', next: '', confirm: '' })
      setFieldErrors({})
      onSuccess('Password changed successfully! Use your new password next time you sign in.')
    } catch (err: any) {
      setError(err.message || 'Failed to change password.')
    } finally {
      setLoading(false)
    }
  }

  const Field = ({
    id, label, value, field, placeholder, autoComplete
  }: {
    id: string; label: string; value: string; field: 'current' | 'next' | 'confirm'; placeholder: string; autoComplete: string
  }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-1.5">
        <Key className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={id}
          type={show[field] ? 'text' : 'password'}
          required
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => {
            setForm((f) => ({ ...f, [field]: e.target.value }))
            setFieldErrors((fe) => ({ ...fe, [field]: '' }))
            setError('')
          }}
          placeholder={placeholder}
          disabled={loading}
          className={`w-full rounded-md border py-3 pl-10 pr-12 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-60 bg-background ${
            fieldErrors[field] ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-gold'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => ({ ...s, [field]: !s[field] }))}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
          aria-label={show[field] ? 'Hide' : 'Show'}
        >
          {show[field] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {fieldErrors[field] && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="size-3" />
          {fieldErrors[field]}
        </p>
      )}
      {field === 'next' && <PasswordStrength password={value} />}
    </div>
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
          <Key className="size-5 text-gold" />
          Change Admin Password
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          You must enter your <strong>current password</strong> to confirm your identity before setting a new one. This prevents unauthorized changes even if your session is compromised.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field
          id="pw-current"
          label="Current Password"
          value={form.current}
          field="current"
          placeholder="Your current password"
          autoComplete="current-password"
        />
        <Field
          id="pw-new"
          label="New Password"
          value={form.next}
          field="next"
          placeholder="Min 8 chars, uppercase, number"
          autoComplete="new-password"
        />
        <Field
          id="pw-confirm"
          label="Confirm New Password"
          value={form.confirm}
          field="confirm"
          placeholder="Repeat new password"
          autoComplete="new-password"
        />

        {/* General error */}
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Security note */}
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-amber-600" />
          <span>
            Firebase re-authenticates with your <strong>current password</strong> before allowing this change.
            If you enter the wrong current password, the request is immediately rejected.
          </span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={loading || !form.current || !form.next || !form.confirm}
            className="flex items-center gap-2 rounded-lg bg-ink px-7 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow transition-all hover:bg-gold hover:text-ink active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            <span>{loading ? 'Changing Password...' : 'Change Password'}</span>
          </button>
          {loading && (
            <span className="text-xs text-muted-foreground animate-pulse">
              Verifying with Firebase...
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const { currentUser, authLoading, signOut } = useAuth()
  const {
    data, isLoaded,
    updateAuthor, updateSeries, updateSettings,
    addBook, updateBook, deleteBook,
    markMessageRead, deleteMessage,
    deleteSubscriber, resetData,
  } = useAuthorData()

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const showToast = (message: string, type: 'success' | 'error' = 'success') => setToast({ message, type })

  // Active tab
  type Tab = 'overview' | 'books' | 'about' | 'series' | 'messages' | 'subscribers' | 'settings'
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  // Books state
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isAddingBook, setIsAddingBook] = useState(false)
  const [bookForm, setBookForm] = useState<Omit<Book, 'id'>>({} as Omit<Book, 'id'>)
  const [bookSaving, setBookSaving] = useState(false)

  // About form
  const [aboutForm, setAboutForm] = useState(data.author)
  const [aboutSaving, setAboutSaving] = useState(false)
  useEffect(() => { setAboutForm(data.author) }, [data.author])

  // Series form
  const [seriesForm, setSeriesForm] = useState(data.series)
  const [seriesSaving, setSeriesSaving] = useState(false)
  useEffect(() => { setSeriesForm(data.series) }, [data.series])

  // Settings form
  const [settingsForm, setSettingsForm] = useState(data.settings)
  const [settingsSaving, setSettingsSaving] = useState(false)
  useEffect(() => { setSettingsForm(data.settings) }, [data.settings])

  // Messages
  const [msgFilter, setMsgFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [msgSearch, setMsgSearch] = useState('')
  const unreadCount = data.messages.filter((m) => !m.read).length

  // Subscribers
  const [subSearch, setSubSearch] = useState('')

  // Signing out loading
  const [signingOut, setSigningOut] = useState(false)

  // ── Auth guard ─────────────────────────────────────────────────────────────
  if (authLoading) return <DashboardSkeleton />
  if (!currentUser) return <LoginScreen />

  // ── Book helpers ───────────────────────────────────────────────────────────
  const defaultBookForm = (): Omit<Book, 'id'> => ({
    slug: `the-trail-book-${data.books.length + 1}`,
    title: `New Book #${data.books.length + 1}`,
    subtitle: `Book ${data.books.length + 1} in ${data.series.title || 'The Trail Series'}`,
    series: data.series.title || 'The Trail Series',
    seriesOrder: data.books.length + 1,
    status: 'Available now',
    coverImage: '',
    shortDescription: '',
    fullDescription: '',
    amazonUrl: 'https://www.amazon.com',
    pageCount: 320,
    publicationDate: new Date().getFullYear().toString(),
    genre: 'Western Historical Fiction',
    isbn: '',
    featured: true,
    quote: '',
  })

  const openAddBook = () => {
    setEditingBook(null)
    setBookForm(defaultBookForm())
    setIsAddingBook(true)
  }

  const openEditBook = (book: Book) => {
    setEditingBook(book)
    setBookForm({ ...book })
    setIsAddingBook(false)
  }

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookForm.title?.trim() || !bookForm.slug?.trim()) return
    setBookSaving(true)
    try {
      if (editingBook) {
        await updateBook(editingBook.id, bookForm)
        showToast(`"${bookForm.title}" updated!`)
      } else {
        await addBook(bookForm)
        showToast(`"${bookForm.title}" added!`)
      }
      setEditingBook(null)
      setIsAddingBook(false)
    } catch {
      showToast('Failed to save book. Please try again.', 'error')
    } finally {
      setBookSaving(false)
    }
  }

  const handleDeleteBook = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await deleteBook(id)
      showToast(`"${title}" deleted.`)
    } catch {
      showToast('Failed to delete book.', 'error')
    }
  }

  // ── Sign out ───────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
    } finally {
      setSigningOut(false)
    }
  }

  // ── Export CSV ─────────────────────────────────────────────────────────────
  const exportCSV = () => {
    if (!data.subscribers.length) { showToast('No subscribers to export.', 'error'); return }
    const rows = ['ID,Email,Date Subscribed', ...data.subscribers.map((s) =>
      `"${s.id}","${s.email}","${new Date(s.createdAt).toLocaleDateString()}"`
    )].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([rows], { type: 'text/csv;charset=utf-8;' }))
    a.download = `cdt_subscribers_${Date.now()}.csv`
    a.click()
    showToast('Subscribers exported as CSV!')
  }

  // ── Filtered messages ──────────────────────────────────────────────────────
  const filteredMessages = data.messages.filter((m) => {
    const filterMatch = msgFilter === 'all' || (msgFilter === 'unread' && !m.read) || (msgFilter === 'read' && m.read)
    const searchMatch = !msgSearch.trim() ||
      m.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(msgSearch.toLowerCase())
    return filterMatch && searchMatch
  })

  const filteredSubscribers = data.subscribers.filter((s) =>
    s.email.toLowerCase().includes(subSearch.toLowerCase())
  )

  // ── Nav tabs config ────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <ShieldCheck className="size-3.5" /> },
    { id: 'books', label: `Books (${data.books.length})`, icon: <BookOpen className="size-3.5" /> },
    { id: 'about', label: 'About Me', icon: <User className="size-3.5" /> },
    { id: 'series', label: 'Series', icon: <Layers className="size-3.5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="size-3.5" />, badge: unreadCount },
    { id: 'subscribers', label: `Subscribers (${data.subscribers.length})`, icon: <Users className="size-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="size-3.5" /> },
  ]

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 sm:px-6 md:px-10">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Feather className="size-5 text-gold transition-transform group-hover:-rotate-12" />
              <span className="hidden font-serif text-base font-bold text-ink sm:block">
                Charles David Tebbs
              </span>
            </Link>
            <span className="rounded-md bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold shrink-0">
              Admin Portal
            </span>
            {/* User badge */}
            <span className="hidden min-w-0 truncate text-[11px] text-muted-foreground sm:block">
              • {currentUser.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-gold hover:text-gold sm:flex"
            >
              <Eye className="size-3.5" />
              <span>View Site</span>
            </Link>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-red-700 disabled:opacity-60"
            >
              {signingOut ? <Loader2 className="size-3.5 animate-spin" /> : <LogOut className="size-3.5" />}
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="mx-auto max-w-[1400px] overflow-x-auto">
          <nav className="flex gap-1 border-t border-border/40 px-5 py-1 sm:px-6 md:px-10" aria-label="Admin sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-ink text-primary-foreground shadow-sm'
                    : 'text-foreground/60 hover:bg-parchment hover:text-ink'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id.charAt(0).toUpperCase()}</span>
                {tab.badge != null && tab.badge > 0 && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-5 py-8 sm:px-6 md:px-10">

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                Welcome back, David 👋
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                &nbsp;•&nbsp;Signed in as <strong>{currentUser.email}</strong>
              </p>
            </div>

            {/* Metric Cards */}
            {!isLoaded ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Total Books', value: data.books.length, sub: 'The Trail Unfolded', icon: <BookOpen className="size-6" />, color: 'bg-gold/15 text-gold' },
                  { label: 'Reader Messages', value: data.messages.length, sub: `${unreadCount} unread`, icon: <MessageSquare className="size-6" />, color: 'bg-blue-100 text-blue-800' },
                  { label: 'Newsletter Readers', value: data.subscribers.length, sub: 'Active audience', icon: <Users className="size-6" />, color: 'bg-emerald-100 text-emerald-800' },
                  { label: 'Series Status', value: 'Active', sub: `${data.books.length} books connected`, icon: <Layers className="size-6" />, color: 'bg-purple-100 text-purple-800' },
                ].map((card) => (
                  <div key={card.label} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{card.label}</p>
                      <p className="mt-1 font-serif text-3xl font-bold text-ink">{card.value}</p>
                      <p className={`mt-1 text-[11px] font-semibold ${unreadCount > 0 && card.label === 'Reader Messages' ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {card.sub}
                      </p>
                    </div>
                    <div className={`flex size-12 items-center justify-center rounded-xl ${card.color}`}>
                      {card.icon}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-12">
              {/* Recent Messages Preview */}
              <div className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-7">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
                    <MessageSquare className="size-4 text-gold" /> Recent Reader Feedback
                  </h2>
                  <button onClick={() => setActiveTab('messages')} className="text-xs font-bold text-gold hover:underline">
                    View all ({data.messages.length}) →
                  </button>
                </div>
                {!isLoaded ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
                  </div>
                ) : data.messages.length === 0 ? (
                  <p className="py-6 text-center text-xs text-muted-foreground">No messages yet. Reader feedback will appear here.</p>
                ) : (
                  <div className="space-y-3">
                    {data.messages.slice(0, 3).map((msg) => (
                      <div key={msg.id} className={`rounded-lg border p-4 ${!msg.read ? 'border-gold/60 bg-parchment/60' : 'border-border bg-background'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-bold text-ink">{msg.name}</span>
                            {!msg.read && <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">New</span>}
                          </div>
                          <span className="text-[10px] text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1 text-xs text-foreground/80 line-clamp-2">{msg.message}</p>
                        <div className="mt-2 flex gap-3 text-[11px]">
                          <a href={`mailto:${msg.email}`} className="font-bold text-gold hover:underline flex items-center gap-1"><Mail className="size-3" /> Reply</a>
                          <button onClick={() => markMessageRead(msg.id, !msg.read)} className="text-muted-foreground hover:text-ink">
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-border bg-parchment p-6 shadow-sm lg:col-span-5 space-y-4">
                <h2 className="border-b border-border pb-3 font-serif text-lg font-bold text-ink">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  {[
                    { label: 'Add a New Book or Sequel', icon: <Plus className="size-4 text-gold" />, onClick: () => { setActiveTab('books'); openAddBook() } },
                    { label: 'Edit About Me Biography', icon: <Edit3 className="size-4 text-gold" />, onClick: () => setActiveTab('about') },
                    { label: 'Update Series Info', icon: <Layers className="size-4 text-gold" />, onClick: () => setActiveTab('series') },
                    { label: 'Change Admin Password', icon: <Key className="size-4 text-gold" />, onClick: () => setActiveTab('settings') },
                    { label: `Export Subscriber List (${data.subscribers.length})`, icon: <Download className="size-4 text-emerald-700" />, onClick: exportCSV },
                  ].map((a) => (
                    <button
                      key={a.label}
                      onClick={a.onClick}
                      className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-3 text-xs font-bold text-ink hover:border-gold hover:bg-gold/10 transition-all text-left"
                    >
                      <span className="flex items-center gap-2">{a.icon}{a.label}</span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKS ── */}
        {activeTab === 'books' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Books Manager</h1>
                <p className="mt-1 text-xs text-muted-foreground">Manage titles, covers, Amazon links, synopses, and publication status.</p>
              </div>
              <button
                onClick={openAddBook}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink shadow hover:bg-gold-light active:scale-95 transition-all"
              >
                <Plus className="size-4" /> Add New Book
              </button>
            </div>

            {/* Book Form */}
            {(isAddingBook || editingBook) && (
              <div className="animate-in fade-in rounded-2xl border-2 border-gold bg-card p-6 shadow-2xl sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h2 className="font-serif text-xl font-bold text-ink">
                    {editingBook ? `Edit: ${editingBook.title}` : 'Add New Book'}
                  </h2>
                  <button onClick={() => { setEditingBook(null); setIsAddingBook(false) }} className="rounded-full p-1.5 hover:bg-parchment">
                    <X className="size-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveBook} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { label: 'Book Title *', key: 'title', placeholder: 'The Trail Book #1', required: true },
                      { label: 'Subtitle', key: 'subtitle', placeholder: 'Book 1 in The Trail Unfolded Series' },
                      { label: 'URL Slug *', key: 'slug', placeholder: 'the-trail-book-1', required: true },
                      { label: 'Genre', key: 'genre', placeholder: 'Western Historical Fiction' },
                      { label: 'Publication Year', key: 'publicationDate', placeholder: '2024' },
                      { label: 'ISBN / ASIN', key: 'isbn', placeholder: 'B0DM9VMN88' },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">{f.label}</label>
                        <input
                          type="text"
                          required={f.required}
                          value={(bookForm as any)[f.key] || ''}
                          onChange={(e) => setBookForm((b) => ({ ...b, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Status</label>
                      <select
                        value={bookForm.status || 'Available now'}
                        onChange={(e) => setBookForm((b) => ({ ...b, status: e.target.value as Book['status'] }))}
                        className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      >
                        <option value="Available now">Available now</option>
                        <option value="Upcoming sequel">Upcoming sequel</option>
                        <option value="Pre-order">Pre-order</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Series Order #</label>
                      <input
                        type="number" min={1}
                        value={bookForm.seriesOrder || 1}
                        onChange={(e) => setBookForm((b) => ({ ...b, seriesOrder: parseInt(e.target.value) || 1 }))}
                        className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Amazon Link */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Amazon Buy URL *</label>
                    <div className="relative mt-1.5">
                      <ShoppingBag className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="url" required
                        value={bookForm.amazonUrl || ''}
                        onChange={(e) => setBookForm((b) => ({ ...b, amazonUrl: e.target.value }))}
                        placeholder="https://www.amazon.com/dp/B0DM9VMN88"
                        className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-ink focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Cover Image URL</label>
                    <input
                      type="url"
                      value={bookForm.coverImage || ''}
                      onChange={(e) => setBookForm((b) => ({ ...b, coverImage: e.target.value }))}
                      placeholder="https://cdn.example.com/cover.jpg"
                      className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                    />
                    {bookForm.coverImage && (
                      <img src={bookForm.coverImage} alt="Preview" className="mt-2 size-16 rounded border border-border object-cover" />
                    )}
                  </div>

                  {/* Descriptions */}
                  {[
                    { label: 'Short Description (cards & homepage)', key: 'shortDescription', rows: 3 },
                    { label: 'Full Description (book detail page)', key: 'fullDescription', rows: 5 },
                    { label: 'Book Quote / Excerpt', key: 'quote', rows: 2 },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">{f.label}</label>
                      <textarea
                        rows={f.rows}
                        value={(bookForm as any)[f.key] || ''}
                        onChange={(e) => setBookForm((b) => ({ ...b, [f.key]: e.target.value }))}
                        className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      />
                    </div>
                  ))}

                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <button
                      type="submit"
                      disabled={bookSaving}
                      className="flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-gold hover:text-ink transition-all shadow disabled:opacity-50"
                    >
                      {bookSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                      {editingBook ? 'Save Changes' : 'Create Book'}
                    </button>
                    <button type="button" onClick={() => { setEditingBook(null); setIsAddingBook(false) }}
                      className="rounded-lg border border-border px-5 py-3 text-xs font-semibold text-foreground/80 hover:bg-parchment">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Books list */}
            {!isLoaded ? (
              <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
            ) : (
              <div className="space-y-4">
                {data.books.map((book) => (
                  <div key={book.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm hover:border-gold/50 transition-all sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img src={book.coverImage || '/placeholder.svg'} alt={book.title} className="size-16 shrink-0 rounded object-cover border border-border shadow-sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-ink px-2 py-0.5 text-[9px] font-bold text-gold uppercase">Book #{book.seriesOrder}</span>
                          <span className={`text-[10px] font-semibold uppercase ${book.status.includes('Available') ? 'text-emerald-700' : 'text-amber-700'}`}>{book.status}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-ink">{book.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{book.shortDescription}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/books/${book.slug}`} target="_blank" className="inline-flex items-center gap-1 rounded border border-border bg-background px-3 py-1.5 text-xs font-semibold text-ink hover:border-gold hover:text-gold">
                        <Eye className="size-3.5" /> Preview
                      </Link>
                      <button onClick={() => openEditBook(book)} className="inline-flex items-center gap-1 rounded bg-ink px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-gold hover:text-ink transition-colors">
                        <Edit3 className="size-3.5" /> Edit
                      </button>
                      {data.books.length > 1 && (
                        <button onClick={() => handleDeleteBook(book.id, book.title)} className="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs text-red-700 hover:bg-red-600 hover:text-white transition-colors">
                          <Trash2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ABOUT ME ── */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">About Me & Author Profile</h1>
              <p className="mt-1 text-xs text-muted-foreground">Updates are saved to Firestore and reflected live across the entire website.</p>
            </div>

            {!isLoaded ? (
              <Skeleton className="h-[600px] rounded-2xl" />
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setAboutSaving(true)
                  try {
                    await updateAuthor(aboutForm)
                    showToast('Author profile saved!')
                  } catch { showToast('Save failed.', 'error') }
                  finally { setAboutSaving(false) }
                }}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm"
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { label: 'Full Name', key: 'name', ph: 'Charles David Tebbs' },
                    { label: 'Known As / Pen Name', key: 'penName', ph: 'David' },
                    { label: 'Role Title', key: 'roleTitle', ph: 'AUTHOR' },
                    { label: 'Website Tagline', key: 'tagline', ph: 'Stories of Courage. Legacy. Frontier.' },
                    { label: 'Hero Description', key: 'heroDescription', ph: 'Step into the untamed frontier...' },
                    { label: 'Author Quote', key: 'quote', ph: "The frontier doesn't forgive..." },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">{f.label}</label>
                      <input
                        type="text"
                        value={(aboutForm as any)[f.key] || ''}
                        onChange={(e) => setAboutForm((a) => ({ ...a, [f.key]: e.target.value }))}
                        placeholder={f.ph}
                        className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Portrait URL with preview */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Author Portrait Image URL</label>
                  <input
                    type="url"
                    value={aboutForm.portraitImage || ''}
                    onChange={(e) => setAboutForm((a) => ({ ...a, portraitImage: e.target.value }))}
                    className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                  {aboutForm.portraitImage && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={aboutForm.portraitImage} alt="Preview" className="size-20 rounded-lg border border-gold object-cover" />
                      <span className="text-xs text-muted-foreground">Live preview</span>
                    </div>
                  )}
                </div>

                {/* Contact greeting */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Contact Page Greeting (David's Note)</label>
                  <textarea rows={2} value={aboutForm.contactGreeting || ''}
                    onChange={(e) => setAboutForm((a) => ({ ...a, contactGreeting: e.target.value }))}
                    className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                </div>

                {/* Short Bio */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Short Bio (Homepage Card)</label>
                  <textarea rows={4} value={aboutForm.shortBio || ''}
                    onChange={(e) => setAboutForm((a) => ({ ...a, shortBio: e.target.value }))}
                    className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                </div>

                {/* Full Bio */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Full Biography (separate paragraphs with blank line)</label>
                  <textarea rows={8}
                    value={aboutForm.fullBioParagraphs?.join('\n\n') || ''}
                    onChange={(e) => setAboutForm((a) => ({ ...a, fullBioParagraphs: e.target.value.split('\n\n').filter((p) => p.trim()) }))}
                    className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                </div>

                <div className="border-t border-border pt-4">
                  <button type="submit" disabled={aboutSaving}
                    className="flex items-center gap-2 rounded-lg bg-gold px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:bg-gold-light transition-all shadow disabled:opacity-50">
                    {aboutSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                    {aboutSaving ? 'Saving to Firestore...' : 'Save Author Profile'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ── SERIES ── */}
        {activeTab === 'series' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Series Configuration</h1>
              <p className="mt-1 text-xs text-muted-foreground">Update The Trail Series title, description, and stacked 3-book image.</p>
            </div>
            {!isLoaded ? <Skeleton className="h-96 rounded-2xl" /> : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setSeriesSaving(true)
                  try {
                    await updateSeries(seriesForm)
                    showToast('Series info saved!')
                  } catch { showToast('Save failed.', 'error') }
                  finally { setSeriesSaving(false) }
                }}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-sm"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Series Title', key: 'title', ph: 'The Trail Series' },
                    { label: 'Badge Label', key: 'badge', ph: 'Western Saga' },
                    { label: 'Genre', key: 'genre', ph: 'Western Adventure / Historical Fiction' },
                    { label: 'Tagline', key: 'tagline', ph: 'A coming-of-age western saga...' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">{f.label}</label>
                      <input type="text" value={(seriesForm as any)[f.key] || ''} placeholder={f.ph}
                        onChange={(e) => setSeriesForm((s) => ({ ...s, [f.key]: e.target.value }))}
                        className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Stacked 3-Book Image URL</label>
                  <input type="url" value={seriesForm.stackedImage || ''}
                    onChange={(e) => setSeriesForm((s) => ({ ...s, stackedImage: e.target.value }))}
                    className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                  {seriesForm.stackedImage && (
                    <img src={seriesForm.stackedImage} alt="Preview" className="mt-2 h-20 rounded border border-border object-cover" />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Series Description</label>
                  <textarea rows={4} value={seriesForm.description || ''}
                    onChange={(e) => setSeriesForm((s) => ({ ...s, description: e.target.value }))}
                    className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                </div>

                <div className="border-t border-border pt-4">
                  <button type="submit" disabled={seriesSaving}
                    className="flex items-center gap-2 rounded-lg bg-gold px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:bg-gold-light transition-all shadow disabled:opacity-50">
                    {seriesSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                    {seriesSaving ? 'Saving...' : 'Save Series Info'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Reader Messages & Reviews</h1>
                <p className="mt-1 text-xs text-muted-foreground">Direct feedback from readers — stored live in Firestore.</p>
              </div>
              <div className="flex gap-2">
                {(['all', 'unread', 'read'] as const).map((f) => (
                  <button key={f} onClick={() => setMsgFilter(f)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${msgFilter === f ? 'bg-ink text-primary-foreground' : 'bg-parchment text-ink hover:bg-gold/20'}`}>
                    {f === 'unread' ? `Unread (${unreadCount})` : f === 'all' ? `All (${data.messages.length})` : 'Read'}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={msgSearch} onChange={(e) => setMsgSearch(e.target.value)}
                placeholder="Search sender, email, keywords..."
                className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-4 text-xs text-ink focus:border-gold focus:outline-none" />
            </div>

            {!isLoaded ? (
              <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)}</div>
            ) : filteredMessages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-12 text-center">
                <MessageSquare className="mx-auto size-10 text-muted-foreground" />
                <p className="mt-3 font-serif text-base text-ink">No messages found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((msg) => (
                  <div key={msg.id} className={`rounded-xl border p-6 shadow-sm transition-all ${!msg.read ? 'border-gold/70 bg-parchment/60' : 'border-border bg-card'}`}>
                    <div className="flex flex-col gap-1 border-b border-border/60 pb-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-ink">{msg.name}</span>
                        {!msg.read && <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">New</span>}
                        <span className="text-xs text-muted-foreground">&lt;{msg.email}&gt;</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    {msg.website && (
                      <p className="mt-2 text-xs text-muted-foreground">Website: <a href={msg.website} target="_blank" rel="noopener noreferrer" className="text-gold underline">{msg.website}</a></p>
                    )}
                    {msg.subject && <p className="mt-2 font-serif text-sm font-semibold text-ink">Subject: {msg.subject}</p>}
                    <div className="mt-3 rounded-lg border border-border/40 bg-background/80 p-4 text-sm text-foreground/90 whitespace-pre-wrap">{msg.message}</div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-3">
                        <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Charles David Tebbs')}`}
                          className="inline-flex items-center gap-1.5 rounded bg-ink px-4 py-1.5 text-xs font-bold text-primary-foreground hover:bg-gold hover:text-ink transition-colors">
                          <Mail className="size-3.5" /> Reply via Email
                        </a>
                        <button onClick={async () => { await markMessageRead(msg.id, !msg.read); showToast(msg.read ? 'Marked unread' : 'Marked read') }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/70 hover:text-ink">
                          {msg.read ? <Mail className="size-3.5" /> : <MailOpen className="size-3.5" />}
                          {msg.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                      </div>
                      <button onClick={async () => { if (confirm(`Delete message from ${msg.name}?`)) { await deleteMessage(msg.id); showToast('Message deleted.') } }}
                        className="text-red-600 hover:text-red-800 p-1" title="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SUBSCRIBERS ── */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Newsletter Subscribers ({data.subscribers.length})</h1>
                <p className="mt-1 text-xs text-muted-foreground">Readers who signed up for news — stored live in Firestore.</p>
              </div>
              <button onClick={exportCSV}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700 transition-all shadow">
                <Download className="size-4" /> Export CSV
              </button>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={subSearch} onChange={(e) => setSubSearch(e.target.value)}
                placeholder="Filter subscriber emails..."
                className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-4 text-xs text-ink focus:border-gold focus:outline-none" />
            </div>

            {!isLoaded ? (
              <Skeleton className="h-48 rounded-xl" />
            ) : (
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-parchment/80 font-serif font-bold text-ink">
                    <tr>
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4 hidden sm:table-cell">Date Subscribed</th>
                      <th className="py-3.5 px-4 text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredSubscribers.length === 0 ? (
                      <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">No subscribers found.</td></tr>
                    ) : filteredSubscribers.map((sub, i) => (
                      <tr key={sub.id} className="hover:bg-parchment/40">
                        <td className="py-3 px-4 text-muted-foreground">{i + 1}</td>
                        <td className="py-3 px-4 font-semibold text-ink">{sub.email}</td>
                        <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{new Date(sub.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={async () => { if (confirm(`Remove ${sub.email}?`)) { await deleteSubscriber(sub.id); showToast('Subscriber removed.') } }}
                            className="text-red-600 hover:text-red-800 p-1"><Trash2 className="size-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Settings & Security</h1>
              <p className="mt-1 text-xs text-muted-foreground">Manage site metadata, admin password, and data backup.</p>
            </div>

            {/* Site Settings */}
            {!isLoaded ? <Skeleton className="h-64 rounded-2xl" /> : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setSettingsSaving(true)
                  try { await updateSettings(settingsForm); showToast('Settings saved!') }
                  catch { showToast('Save failed.', 'error') }
                  finally { setSettingsSaving(false) }
                }}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-sm"
              >
                <h2 className="font-serif text-lg font-bold text-ink border-b border-border pb-3">Site Settings</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Site Title</label>
                    <input type="text" value={settingsForm.siteTitle || ''}
                      onChange={(e) => setSettingsForm((s) => ({ ...s, siteTitle: e.target.value }))}
                      className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Amazon Author URL</label>
                    <input type="url" value={settingsForm.amazonAuthorUrl || ''}
                      onChange={(e) => setSettingsForm((s) => ({ ...s, amazonAuthorUrl: e.target.value }))}
                      className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Meta Description</label>
                  <textarea rows={3} value={settingsForm.metaDescription || ''}
                    onChange={(e) => setSettingsForm((s) => ({ ...s, metaDescription: e.target.value }))}
                    className="mt-1.5 w-full rounded-md border border-border bg-background py-2.5 px-3.5 text-sm text-ink focus:border-gold focus:outline-none" />
                </div>
                <div className="border-t border-border pt-4">
                  <button type="submit" disabled={settingsSaving}
                    className="flex items-center gap-2 rounded-lg bg-gold px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:bg-gold-light transition-all shadow disabled:opacity-50">
                    {settingsSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                    {settingsSaving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </form>
            )}

            {/* Change Password Section */}
            <ChangePasswordPanel
              onSuccess={(msg) => showToast(msg, 'success')}
              onError={(msg) => showToast(msg, 'error')}
            />

            {/* Danger Zone */}
            <div className="rounded-2xl border border-red-300 bg-red-50/50 p-6 space-y-3">
              <h3 className="font-serif text-base font-bold text-red-900 flex items-center gap-2">
                <RefreshCw className="size-4 text-red-700" /> Restore Default Content
              </h3>
              <p className="text-xs text-red-800">
                Resets all books, biography, and series data in Firestore back to the original defaults. Reader messages and subscribers are <strong>not affected</strong>.
              </p>
              <button
                onClick={async () => {
                  if (confirm('Reset all content to defaults? This cannot be undone.')) {
                    await resetData()
                    showToast('Content reset to defaults!')
                  }
                }}
                className="rounded-lg bg-red-700 px-4 py-2 text-xs font-bold text-white hover:bg-red-800 transition-colors">
                Reset to Default Data
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
