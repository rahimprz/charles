'use client'

import { ArrowRight, ExternalLink, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuthorData } from '@/lib/author-context'

export function AllBooks() {
  const { data } = useAuthorData()
  const { books } = data

  return (
    <section id="books" className="px-5 py-12 sm:px-6 sm:py-16 md:px-12" aria-labelledby="all-books-title">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
              Complete Works
            </span>
            <h2 id="all-books-title" className="mt-1 font-serif text-2xl font-medium uppercase tracking-[0.1em] text-ink sm:text-3xl">
              Books by Charles David Tebbs
            </h2>
          </div>
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-ink"
          >
            <span>View All Details</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => {
            const isAvailable = book.status.toLowerCase().includes('available')

            return (
              <article
                key={book.id}
                className="group/card flex flex-col justify-between rounded-xl border border-border bg-parchment p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl sm:p-6"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
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

                  {/* Book Image */}
                  <div className="mt-4 flex justify-center">
                    <Link
                      href={`/books/${book.slug}`}
                      className="relative block w-36 overflow-hidden rounded-md border border-gold/40 shadow-lg transition-transform duration-500 group-hover/card:scale-105 sm:w-44"
                    >
                      <img
                        src={book.coverImage || '/placeholder.svg'}
                        alt={book.title}
                        className="h-auto w-full object-cover"
                      />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="mt-5 text-center">
                    <h3 className="font-serif text-xl font-medium leading-tight text-ink sm:text-2xl">
                      <Link href={`/books/${book.slug}`} className="hover:text-gold transition-colors">
                        {book.title}
                      </Link>
                    </h3>
                    <p className="mt-1 font-serif text-xs italic text-gold-light">
                      {book.subtitle}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-foreground/80 line-clamp-3 text-pretty">
                      {book.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-4">
                  {book.amazonUrl && (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded bg-ink px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-gold hover:text-ink active:scale-98 shadow-sm"
                    >
                      <ShoppingBag className="size-3.5 text-gold" />
                      <span>{isAvailable ? 'Buy on Amazon' : 'View on Amazon'}</span>
                      <ExternalLink className="size-3 opacity-60" />
                    </a>
                  )}

                  <Link
                    href={`/books/${book.slug}`}
                    className="group/link inline-flex w-full items-center justify-center gap-2 rounded border border-ink/20 bg-background/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-all hover:border-gold hover:bg-background hover:text-gold"
                  >
                    <span>Learn More & Synopsis</span>
                    <ArrowRight className="size-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
