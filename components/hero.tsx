'use client'

import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuthorData } from '@/lib/author-context'

export function Hero() {
  const { data } = useAuthorData()

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
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Background Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gold/15 blur-2xl -z-10" />

            <div className="relative overflow-hidden rounded-xl border-2 border-gold/40 bg-parchment p-3 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-lg bg-stone-900">
                <img
                  src={data.author.stackedBooksImage || 'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg'}
                  alt="Charles David Tebbs Three Books Stacked - The Trail Series"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Badge */}
              <div className="mt-3 flex items-center justify-between px-2 py-1">
                <div>
                  <p className="font-serif text-sm font-bold text-ink">
                    The Trail Unfolded Series
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Books 1, 2 & Upcoming Sequel #3
                  </p>
                </div>
                <Link
                  href="/series"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-ink transition-colors"
                >
                  <span>View Series</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
