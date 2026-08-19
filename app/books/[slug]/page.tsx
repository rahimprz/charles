'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { useAuthorData } from '@/lib/author-context'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Heart,
  Layers,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
} from 'lucide-react'
import { useState } from 'react'

export default function BookDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { data } = useAuthorData()
  const { books, author, series } = data

  const [copied, setCopied] = useState(false)

  const book = books.find((b) => b.slug === slug) || books.find((b) => b.id === slug) || books[0]
  const otherBooks = books.filter((b) => b.id !== book?.id)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center p-12 text-center">
          <div>
            <h1 className="font-serif text-3xl font-bold text-ink">Book Not Found</h1>
            <p className="mt-2 text-muted-foreground">The requested book could not be found.</p>
            <Link
              href="/books"
              className="mt-6 inline-flex items-center gap-2 bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-gold hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>Back to All Books</span>
            </Link>
          </div>
        </main>
        <NewsletterFooter />
      </div>
    )
  }

  const isAvailable = book.status.toLowerCase().includes('available')

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb Navigation Bar */}
        <section className="border-b border-border/60 bg-parchment/60 py-4">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <Link href="/books" className="hover:text-gold transition-colors">
                Books
              </Link>
              <ChevronRight className="size-3" />
              <Link href="/series" className="hover:text-gold transition-colors truncate max-w-[180px]">
                {book.series}
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-ink font-semibold truncate max-w-[220px]">
                {book.title}
              </span>
            </nav>
          </div>
        </section>

        {/* Book Main Stage */}
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left: Book Cover Image & Buy Actions */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative mx-auto max-w-sm lg:max-w-none">
                  {/* Decorative background aura */}
                  <div className="absolute -inset-3 rounded-2xl bg-gold/15 blur-xl -z-10" />

                  <div className="overflow-hidden rounded-xl border-2 border-gold/60 bg-parchment p-3 shadow-2xl">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-stone-900">
                      <img
                        src={book.coverImage || '/placeholder.svg'}
                        alt={book.title}
                        className="h-full w-full object-cover shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Buy CTA Box */}
                <div className="rounded-xl border border-gold/40 bg-card p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                      Official Purchase
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        isAvailable
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      <Sparkles className="size-3" />
                      {book.status}
                    </span>
                  </div>

                  {book.amazonUrl ? (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-3 rounded-lg bg-gold py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-lg transition-all hover:bg-gold-light hover:shadow-xl active:scale-95"
                    >
                      <ShoppingBag className="size-5" />
                      <span>{isAvailable ? 'Buy Now on Amazon' : 'Pre-order / View on Amazon'}</span>
                      <ExternalLink className="size-4 opacity-75 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">Amazon link coming soon</p>
                  )}

                  <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
                    >
                      <Share2 className="size-3.5" />
                      <span>{copied ? 'Link Copied!' : 'Share Book'}</span>
                    </button>
                    <Link
                      href="/contact"
                      className="hover:text-gold transition-colors underline underline-offset-2"
                    >
                      Send David Review
                    </Link>
                  </div>
                </div>

                {/* Book Metadata Quick Specs */}
                <div className="rounded-xl border border-border bg-parchment p-6 space-y-3">
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ink border-b border-border/70 pb-2">
                    Book Specifications
                  </h3>
                  <dl className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Series</dt>
                      <dd className="font-semibold text-ink">{book.series}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Series Order</dt>
                      <dd className="font-semibold text-ink">Book #{book.seriesOrder}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Genre</dt>
                      <dd className="font-semibold text-ink">{book.genre}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Release Year</dt>
                      <dd className="font-semibold text-ink">{book.publicationDate}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Print Length</dt>
                      <dd className="font-semibold text-ink">{book.pageCount} pages</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">ISBN / ASIN</dt>
                      <dd className="font-semibold text-ink">{book.isbn || 'Available on Amazon'}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Language</dt>
                      <dd className="font-semibold text-ink">English</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Formats</dt>
                      <dd className="font-semibold text-ink">Paperback, Kindle eBook</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Right: Synopsis, Story Excerpt, and Author Insights */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                      {book.series}
                    </span>
                    <span className="inline-block size-1 rotate-45 bg-gold" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                      Book #{book.seriesOrder}
                    </span>
                  </div>

                  <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">
                    {book.title}
                  </h1>

                  <p className="mt-2 font-serif text-lg italic text-gold-light">
                    {book.subtitle}
                  </p>
                </div>

                {/* Featured Excerpt Quote */}
                {book.quote && (
                  <div className="rounded-xl border-l-4 border-gold bg-parchment p-6 shadow-sm">
                    <p className="font-serif text-lg italic leading-relaxed text-ink">
                      &ldquo;{book.quote}&rdquo;
                    </p>
                  </div>
                )}

                {/* Full Synopsis */}
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-medium uppercase tracking-wider text-ink sm:text-2xl flex items-center gap-2 border-b border-border/60 pb-2">
                    <FileText className="size-5 text-gold" />
                    <span>Story Synopsis</span>
                  </h2>

                  <div className="space-y-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                    {book.fullDescription.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-pretty">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Key Highlights / Why Readers Love It */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
                    <Sparkles className="size-4 text-gold" />
                    <span>Themes & Highlights</span>
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-gold shrink-0 mt-0.5" />
                      <span>Authentic historical backdrop of the 19th-century American West and maritime frontier</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-gold shrink-0 mt-0.5" />
                      <span>Rich character development highlighting brotherhood, valor, and moral conviction</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-gold shrink-0 mt-0.5" />
                      <span>High-stakes adventure with outlaws, pirate legacies, and untamed terrain</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-gold shrink-0 mt-0.5" />
                      <span>Written with the authentic voice and wisdom of a decorated U.S. veteran</span>
                    </div>
                  </div>
                </div>

                {/* Author Card */}
                <div className="rounded-xl border border-border bg-parchment p-6 flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src={author.portraitImage || 'https://i.ibb.co/G48X1zLC/single-person-portra-084ef648f4.webp'}
                    alt="Charles David Tebbs"
                    className="size-20 rounded-full object-cover border-2 border-gold shrink-0"
                  />
                  <div className="text-center sm:text-left space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
                      About the Author
                    </p>
                    <h4 className="font-serif text-lg font-bold text-ink">
                      {author.name} (David)
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {author.shortBio}
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/about"
                        className="text-xs font-bold text-gold hover:text-ink transition-colors underline underline-offset-2"
                      >
                        Read Full Author Bio →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More in this Series */}
        {otherBooks.length > 0 && (
          <section className="border-t border-border/80 bg-parchment/40 py-12 sm:py-16">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                    More in the Saga
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-ink sm:text-3xl">
                    More Books in <em>{book.series}</em>
                  </h3>
                </div>
                <Link
                  href="/books"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-ink transition-colors"
                >
                  <span>All Books</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherBooks.map((other) => (
                  <Link
                    key={other.id}
                    href={`/books/${other.slug}`}
                    className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
                  >
                    <img
                      src={other.coverImage || '/placeholder.svg'}
                      alt={other.title}
                      className="w-20 shrink-0 rounded object-cover shadow border border-border/60"
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                          Book #{other.seriesOrder} • {other.status}
                        </p>
                        <h4 className="mt-1 font-serif text-base font-medium text-ink group-hover:text-gold transition-colors line-clamp-1">
                          {other.title}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {other.shortDescription}
                        </p>
                      </div>
                      <span className="mt-2 text-[11px] font-bold text-gold inline-flex items-center gap-1">
                        <span>View Book Details</span>
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <NewsletterFooter />
    </div>
  )
}
