'use client'

import { ArrowRight, BookOpen, Compass, Layers, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuthorData } from '@/lib/author-context'

export function FeaturedSeries() {
  const { data } = useAuthorData()
  const { series, books } = data

  return (
    <section className="relative mx-4 my-10 overflow-hidden rounded-xl border border-border bg-parchment sm:mx-6 md:mx-12 lg:my-16" aria-labelledby="featured-series-title">
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-12 text-center sm:px-8 sm:py-14 lg:flex-row lg:gap-14 lg:text-left md:px-12">
        {/* Left Vertical Ribbon */}
        <div className="hidden flex-col items-center gap-6 self-stretch lg:flex" aria-hidden="true">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink [writing-mode:vertical-lr]">
            Series Spotlight
          </span>
          <span className="w-px flex-1 bg-gold/50" />
          <Compass className="size-5 text-gold" />
        </div>

        {/* Stacked Boxset Image */}
        <div className="relative w-full max-w-sm shrink-0 lg:w-80">
          <div className="overflow-hidden rounded-lg border border-gold/40 bg-card p-2 shadow-xl">
            <img
              src={series.stackedImage || 'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg'}
              alt={`${series.title} stacked three books`}
              className="w-full rounded object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
              <Layers className="size-3" />
              The Trail Series ({books.length} Books)
            </span>
          </div>
        </div>

        {/* Series Content */}
        <div className="flex max-w-2xl flex-col items-center lg:items-start">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs">
              Featured Series
            </span>
            <span className="inline-block size-1 rotate-45 bg-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              The Trail 3-Book Series
            </span>
          </div>

          <h2 id="featured-series-title" className="mt-3 font-serif text-3xl font-medium text-ink text-balance sm:text-4xl md:text-5xl">
            {series.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
              <BookOpen className="size-4 text-gold" aria-hidden="true" />
              {books.length} Books
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
              <Sparkles className="size-4 text-gold" aria-hidden="true" />
              {series.genre || 'Western Adventure / Historical Fiction'}
            </span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-foreground/85 text-pretty sm:text-lg">
            {series.description ||
              'A coming-of-age western saga of courage, identity, and heritage set against the unforgiving American frontier and the high seas.'}
          </p>

          {/* Books in this series mini list */}
          <div className="mt-6 grid w-full gap-2 sm:grid-cols-3">
            {books.slice(0, 3).map((b, idx) => (
              <Link
                key={b.id}
                href={`/books/${b.slug}`}
                className="group rounded-md border border-border/80 bg-background/80 p-3 text-left transition-all hover:border-gold hover:bg-background shadow-xs"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                  Book #{idx + 1}
                </p>
                <p className="mt-1 font-serif text-sm font-semibold text-ink line-clamp-1 group-hover:text-gold transition-colors">
                  {b.title}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {b.status}
                </p>
              </Link>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
            <Link
              href="/series"
              className="group inline-flex items-center gap-3 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow transition-all hover:bg-gold hover:text-ink active:scale-95"
            >
              <span>Go to Series</span>
              <ArrowRight className="size-4 text-gold group-hover:text-ink transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/books"
              className="group inline-flex items-center gap-2 border border-ink/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <span>Browse All Books</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
