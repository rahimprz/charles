'use client'

import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { useAuthorData } from '@/lib/author-context'
import { ArrowRight, BookOpen, Check, ChevronRight, Compass, ExternalLink, Layers, Map, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function SeriesPage() {
  const { data } = useAuthorData()
  const { series, books } = data

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="border-b border-border/60 bg-parchment/60 py-10 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-ink font-semibold">Series</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Official Book Series
              </span>
              <span className="inline-block size-1 rotate-45 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                {series.badge || 'Western Saga'}
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl lg:text-6xl">
              {series.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-foreground/80 sm:text-lg">
              {series.tagline || 'A coming-of-age western saga of courage, identity, and heritage set against the unforgiving American frontier.'}
            </p>
          </div>
        </section>

        {/* Series Showcase */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Stacked Boxset Image Column */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-4 rounded-3xl bg-gold/15 blur-2xl -z-10" />
                  <div className="overflow-hidden rounded-xl border-2 border-gold/60 bg-parchment p-3 shadow-2xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-900">
                      <img
                        src={series.stackedImage || 'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg'}
                        alt={series.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center py-2">
                      <p className="font-serif text-base font-bold text-ink">
                        {series.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {books.length} Books in Series Chronology
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Series Overview Description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                  <Layers className="size-3.5" />
                  <span>Series Chronology & Reading Order</span>
                </div>

                <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl lg:text-4xl">
                  The Epic Saga of James Jack, Mo & Mabel
                </h2>

                <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
                  {series.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-lg border border-border bg-parchment/60 p-4">
                    <Compass className="size-5 text-gold mb-2" />
                    <p className="font-bold text-ink">The Wyoming Frontier</p>
                    <p className="text-muted-foreground mt-1">
                      Explore the treacherous trails, mountain passes, and raw settlements of the early American West.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-parchment/60 p-4">
                    <Map className="size-5 text-gold mb-2" />
                    <p className="font-bold text-ink">The Maritime Crusade</p>
                    <p className="text-muted-foreground mt-1">
                      Sail aboard the <em>Black Shadow</em> on a high-seas mission of liberation, valor, and brotherhood.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reading Order Timeline */}
        <section className="border-t border-border bg-parchment/30 py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Suggested Reading Order
              </span>
              <h2 className="mt-1 font-serif text-3xl font-medium text-ink sm:text-4xl">
                Books in The Trail Series Sequence
              </h2>
            </div>

            <div className="mt-12 space-y-8">
              {books.map((book, index) => {
                const isAvailable = book.status.toLowerCase().includes('available')

                return (
                  <div
                    key={book.id}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:border-gold/60 hover:shadow-xl"
                  >
                    <div className="grid gap-8 md:grid-cols-12 md:items-center">
                      {/* Left: Number & Cover */}
                      <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center sm:flex-row sm:gap-6 md:flex-col md:gap-4">
                        <div className="w-36 shrink-0 overflow-hidden rounded-lg border border-gold/40 shadow-lg sm:w-40">
                          <img
                            src={book.coverImage || '/placeholder.svg'}
                            alt={book.title}
                            className="h-auto w-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Middle: Details */}
                      <div className="md:col-span-5 lg:col-span-6 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                            Book #{book.seriesOrder || index + 1}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isAvailable
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            {book.status}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
                          {book.title}
                        </h3>

                        <p className="font-serif text-xs italic text-gold">
                          {book.subtitle}
                        </p>

                        <p className="text-sm leading-relaxed text-foreground/80 line-clamp-3">
                          {book.shortDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                          <span>Genre: {book.genre}</span>
                          <span>•</span>
                          <span>Year: {book.publicationDate}</span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-3 justify-center">
                        {book.amazonUrl && (
                          <a
                            href={book.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-ink shadow transition-all hover:bg-gold-light active:scale-95"
                          >
                            <ShoppingBag className="size-4" />
                            <span>{isAvailable ? 'Buy on Amazon' : 'View on Amazon'}</span>
                            <ExternalLink className="size-3.5 opacity-60" />
                          </a>
                        )}

                        <Link
                          href={`/books/${book.slug}`}
                          className="inline-flex w-full items-center justify-center gap-2 rounded border border-ink/30 bg-background/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-all hover:border-gold hover:text-gold"
                        >
                          <span>Learn More</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  )
}
