'use client'

import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuthorData } from '@/lib/author-context'

export function Hero() {
  const { data } = useAuthorData()
  // Sort books by series order so #1, #2, #3 always display correctly
  const sortedBooks = [...data.books].sort((a, b) => a.seriesOrder - b.seriesOrder)
  const book1 = sortedBooks[0]
  const book2 = sortedBooks[1]
  const book3 = sortedBooks[2]

  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-parchment/30 to-background py-8 sm:py-12 lg:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 sm:px-6 md:px-12 lg:flex-row lg:items-center lg:gap-14">
        {/* Left Column: Author Presentation & Copy */}
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-parchment/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold sm:text-xs shadow-sm">
            <Sparkles className="size-3.5 text-gold" />
            <span>{data.author.tagline || 'Stories of Courage. Legacy. Frontier.'}</span>
          </div>

          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            Charles
            <br />
            David Tebbs
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-serif text-base italic text-gold-light sm:text-lg">
              Known simply as &quot;{data.author.penName || 'David'}&quot;
            </span>
            <span className="inline-block h-px w-12 bg-gold/60 sm:w-16" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {data.author.roleTitle || 'AUTHOR'}
            </span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {data.author.heroDescription ||
              'Step into the untamed frontier where legacy is earned, not given. Gripping western historical adventures inspired by valor, heritage, and the American spirit.'}
          </p>

          {/* Quick Stat Pill */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 rounded-md bg-parchment px-3 py-1.5 border border-border/70">
              <span className="size-2 rounded-full bg-emerald-600" />
              <span className="font-semibold text-ink">{data.books[0]?.title}</span>
              <span>Available now</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-parchment px-3 py-1.5 border border-border/70">
              <BookOpen className="size-3.5 text-gold" />
              <span className="font-semibold text-ink">{data.series.title}</span>
              <span>({data.books.length} Books)</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6">
            <Link
              href="/books"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition-all duration-300 hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              Explore All Books
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-ink/40 bg-transparent px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:border-gold hover:bg-parchment hover:text-gold active:scale-[0.98]"
            >
              About David
            </Link>
          </div>
        </div>

        {/* Right Column: Stacked 3 Books Featured Visual */}
        <div className="relative flex-1 flex justify-center items-center">
          <div className="relative w-full max-w-lg lg:max-w-xl">
            {/* Background Glow */}
            <div className="absolute -inset-8 rounded-3xl bg-gold/10 blur-3xl -z-10" />

            <div className="relative">
              {/* Series Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                <div className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 shadow-lg border-2 border-gold/50">
                  <Sparkles className="size-4 text-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Featured Series</span>
                </div>
              </div>

              {/* Stacked Books Container */}
              <div className="relative pt-8 pb-6 px-4">
                {/* Book 1 (Left) */}
                <div className="absolute left-4 top-12 w-[140px] sm:w-[160px] transform -rotate-12 hover:-rotate-8 transition-all duration-500 hover:z-20 hover:scale-105 cursor-pointer group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg transform translate-x-2 translate-y-2 -z-10" />
                    <img
                      src={book1?.coverImage || 'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg'}
                      alt={book1?.title || 'The Trail Book #1'}
                      className="relative w-full h-[220px] sm:h-[250px] object-cover rounded-lg shadow-2xl border-2 border-gold/40 group-hover:border-gold transition-all duration-300"
                    />
                    <div className="absolute -top-3 -left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      #1
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                      <p className="font-serif text-xs font-bold text-white truncate">{book1?.title || 'The Trail Book #1'}</p>
                      <p className="text-[10px] text-emerald-300 font-semibold">{book1?.status || 'Available now'}</p>
                    </div>
                  </div>
                </div>

                {/* Book 2 (Center - Top) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[140px] sm:w-[160px] transform rotate-3 hover:rotate-6 transition-all duration-500 hover:z-30 hover:scale-105 cursor-pointer group z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg transform translate-x-2 translate-y-2 -z-10" />
                    <img
                      src={book2?.coverImage || 'https://d1an6hb2j63rg7.cloudfront.net/c38f9a6d_ce44_481c_9824_273207adfd3f_ca46faaff4.jpeg'}
                      alt={book2?.title || 'The Trail Unfolded Book #2'}
                      className="relative w-full h-[220px] sm:h-[250px] object-cover rounded-lg shadow-2xl border-2 border-gold/60 group-hover:border-gold transition-all duration-300"
                    />
                    <div className="absolute -top-3 -right-3 bg-gold text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      #2
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                      <p className="font-serif text-xs font-bold text-white truncate">{book2?.title || 'The Trail Unfolded Book #2'}</p>
                      <p className="text-[10px] text-emerald-300 font-semibold">{book2?.status || 'Available now'}</p>
                    </div>
                  </div>
                </div>

                {/* Book 3 (Right) */}
                <div className="absolute right-4 top-12 w-[140px] sm:w-[160px] transform rotate-12 hover:rotate-8 transition-all duration-500 hover:z-20 hover:scale-105 cursor-pointer group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg transform translate-x-2 translate-y-2 -z-10" />
                    <img
                      src={book3?.coverImage || 'https://d1an6hb2j63rg7.cloudfront.net/trail_faf4f2bb9d.webp'}
                      alt={book3?.title || 'The Trail Rendezvous #3'}
                      className="relative w-full h-[220px] sm:h-[250px] object-cover rounded-lg shadow-2xl border-2 border-amber-400/40 group-hover:border-amber-400 transition-all duration-300"
                    />
                    <div className="absolute -top-3 -right-3 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      #3
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                      <p className="font-serif text-xs font-bold text-white truncate">{book3?.title || 'The Trail Rendezvous #3'}</p>
                      <p className="text-[10px] text-amber-300 font-semibold">{book3?.status || 'Upcoming'}</p>
                    </div>
                  </div>
                </div>

                {/* Series Info Card */}
                <div className="relative mt-[280px] sm:mt-[310px] bg-gradient-to-br from-parchment to-background rounded-2xl border-2 border-gold/30 p-6 shadow-2xl text-center">
                  <h3 className="font-serif text-xl font-bold text-ink mb-1">{data.series.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{data.series.genre}</p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-4 text-gold" />
                      <span className="text-sm font-semibold text-ink">{data.books.length} Books</span>
                    </div>
                    <div className="h-px w-8 bg-border" />
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-gold" />
                      <span className="text-sm font-semibold text-ink">Western Saga</span>
                    </div>
                  </div>
                  <Link
                    href="/series"
                    className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-white rounded-lg shadow-lg hover:bg-gold hover:text-ink transition-all duration-300 group"
                  >
                    <span>View Complete Series</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
