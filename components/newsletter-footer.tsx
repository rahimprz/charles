'use client'

import { BookOpen, CheckCircle2, Compass, Feather, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useAuthorData } from '@/lib/author-context'

export function NewsletterFooter() {
  const { data, addSubscriber } = useAuthorData()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    addSubscriber(email.trim())
    setSubmitted(true)
    setEmail('')
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-border bg-ink text-primary-foreground">
      {/* Newsletter Strip */}
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:px-12">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 p-8 border border-gold/30 shadow-2xl sm:p-12">
          <Compass
            className="pointer-events-none absolute -right-8 -top-8 size-48 text-gold/10 lg:size-64"
            strokeWidth={0.75}
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Join David&apos;s Readers Circle
              </span>
              <h3 className="mt-2 font-serif text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
                Sign up for my Newsletter
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-300 sm:text-base">
                Signup for news, upcoming releases like <em>The Trail Rendezvous</em>, and special offers directly from Charles David Tebbs.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full rounded-none border border-gold/40 bg-stone-950/80 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-stone-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all hover:bg-gold-light hover:shadow-lg active:scale-95 sm:shrink-0"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-800" />
                      Subscribed!
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
              {submitted && (
                <p className="mt-2 text-xs text-gold">
                  Thank you! You have been successfully added to David&apos;s readers list.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-[1400px] border-t border-stone-800 px-5 py-12 sm:px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Author info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Feather className="size-5 text-gold" />
              <span className="font-serif text-lg font-bold tracking-wide text-white">
                Charles David Tebbs
              </span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400">
              Known simply as &quot;David&quot; — U.S. Army Korean Conflict veteran, 50-year lighting industry career, and author of <em>The Trail Unfolded</em> western historical series.
            </p>
            <div className="pt-2">
              <a
                href={data.settings.amazonAuthorUrl || 'https://www.amazon.com/dp/B0DM9VMN88'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gold transition-colors hover:text-gold-light underline underline-offset-4"
              >
                <span>View Author Page on Amazon</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-gold">
                  About Charles David Tebbs
                </Link>
              </li>
              <li>
                <Link href="/books" className="transition-colors hover:text-gold">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/series" className="transition-colors hover:text-gold">
                  The Trail Unfolded Series
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-gold">
                  Contact & Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Books in Series */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Trail Series
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
              {data.books.map((book) => (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.slug}`}
                    className="flex items-center gap-2 transition-colors hover:text-gold"
                  >
                    <BookOpen className="size-3 text-gold/60 shrink-0" />
                    <span className="truncate">{book.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Author Portal */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Information & Admin
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-gold">
                  Terms of Service
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded bg-stone-850 px-3 py-2 text-xs font-semibold text-gold border border-gold/30 hover:bg-gold hover:text-ink transition-all"
                >
                  <ShieldCheck className="size-3.5" />
                  <span>Author Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 text-center text-xs text-stone-400 sm:flex-row sm:text-left">
          <p>
            © {currentYear} Charles David Tebbs. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
