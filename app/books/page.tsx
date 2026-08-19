'use client'

import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { useAuthorData } from '@/lib/author-context'
import { ArrowRight, BookOpen, ChevronRight, ExternalLink, Search, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function BooksPage() {
  const { data } = useAuthorData()
  const { books } = data

  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'upcoming'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBooks = books.filter((book) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'available' && book.status.toLowerCase().includes('available')) ||
      (activeFilter === 'upcoming' && book.status.toLowerCase().includes('upcoming'))

    const matchesSearch =
      searchQuery.trim() === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.series.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Banner */}
        <section className="border-b border-border/60 bg-parchment/60 py-10 sm:py-14">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-ink font-semibold">All Books</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Author Catalog
              </span>
              <span className="inline-block size-1 rotate-45 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                Western Historical Fiction
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl lg:text-6xl">
              Books by Charles David Tebbs
            </h1>
            <p className="mt-2 max-w-2xl text-base text-foreground/80 sm:text-lg">
              Explore the complete reading list of <em>The Trail Unfolded</em> series. Available in paperback and digital formats on Amazon.
            </p>
          </div>
        </section>

        {/* Filters and Search Bar */}
        <section className="border-b border-border/40 bg-card py-6">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFilter === 'all'
                      ? 'bg-ink text-primary-foreground shadow'
                      : 'bg-parchment text-ink hover:bg-gold/20'
                  }`}
                >
                  All Books ({books.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('available')}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFilter === 'available'
                      ? 'bg-ink text-primary-foreground shadow'
                      : 'bg-parchment text-ink hover:bg-gold/20'
                  }`}
                >
                  Available Now ({books.filter((b) => b.status.toLowerCase().includes('available')).length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('upcoming')}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFilter === 'upcoming'
                      ? 'bg-ink text-primary-foreground shadow'
                      : 'bg-parchment text-ink hover:bg-gold/20'
                  }`}
                >
                  Upcoming Sequels ({books.filter((b) => b.status.toLowerCase().includes('upcoming')).length})
                </button>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, characters..."
                  className="w-full rounded-full border border-border bg-background py-2 pl-10 pr-4 text-xs text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Books List Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            {filteredBooks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-12 text-center">
                <BookOpen className="mx-auto size-12 text-muted-foreground" />
                <p className="mt-3 font-serif text-lg text-ink">No books matched your criteria</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('all')
                    setSearchQuery('')
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-gold hover:underline"
                >
                  Reset search & filters
                </button>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.map((book, index) => {
                  const isAvailable = book.status.toLowerCase().includes('available')

                  return (
                    <article
                      key={book.id}
                      className="group/card flex flex-col justify-between rounded-xl border border-border bg-parchment p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-xl"
                    >
                      <div>
                        {/* Status / Series badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                            <span className="inline-block size-1.5 rotate-45 bg-gold" />
                            Book #{book.seriesOrder || index + 1}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isAvailable
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            <Sparkles className="size-2.5" />
                            {book.status}
                          </span>
                        </div>

                        {/* Cover Display */}
                        <div className="mt-5 flex justify-center">
                          <Link
                            href={`/books/${book.slug}`}
                            className="relative block w-40 overflow-hidden rounded-md border border-gold/40 shadow-xl transition-transform duration-500 group-hover/card:scale-105 sm:w-48"
                          >
                            <img
                              src={book.coverImage || '/placeholder.svg'}
                              alt={book.title}
                              className="h-auto w-full object-cover"
                            />
                          </Link>
                        </div>

                        {/* Text details */}
                        <div className="mt-6 text-center">
                          <h2 className="font-serif text-2xl font-medium leading-tight text-ink">
                            <Link href={`/books/${book.slug}`} className="hover:text-gold transition-colors">
                              {book.title}
                            </Link>
                          </h2>
                          <p className="mt-1 font-serif text-xs italic text-gold-light">
                            {book.subtitle}
                          </p>
                          <p className="mt-4 text-xs leading-relaxed text-foreground/80 line-clamp-4 text-pretty text-left">
                            {book.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-8 flex flex-col gap-3 border-t border-border/80 pt-5">
                        {book.amazonUrl && (
                          <a
                            href={book.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded bg-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-gold hover:text-ink active:scale-95 shadow"
                          >
                            <ShoppingBag className="size-4 text-gold" />
                            <span>{isAvailable ? 'Buy on Amazon' : 'View on Amazon'}</span>
                            <ExternalLink className="size-3.5 opacity-60" />
                          </a>
                        )}

                        <Link
                          href={`/books/${book.slug}`}
                          className="group/link inline-flex w-full items-center justify-center gap-2 rounded border border-ink/30 bg-background/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-all hover:border-gold hover:bg-background hover:text-gold"
                        >
                          <span>Learn More & Full Synopsis</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  )
}
