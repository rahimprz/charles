'use client'

import { ArrowRight, Compass, ExternalLink, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuthorData } from '@/lib/author-context'

export function BookSpotlight() {
  const { data } = useAuthorData()
  const spotlightBook = data.books.find((b) => b.id === 'book-1') || data.books[0]

  if (!spotlightBook) return null

  return (
    <section
      className="relative mx-4 my-10 overflow-hidden rounded-xl bg-ink text-primary-foreground sm:mx-6 md:mx-12 lg:my-16 shadow-2xl"
      aria-labelledby="spotlight-title"
    >
      <Compass
        className="pointer-events-none absolute -right-12 top-1/2 hidden size-80 -translate-y-1/2 text-gold/10 lg:block"
        strokeWidth={0.75}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-12 text-center sm:px-8 sm:py-16 lg:flex-row lg:gap-14 lg:text-left md:px-12">
        {/* Book Index Numbers */}
        <div className="hidden flex-col items-center gap-5 lg:flex" aria-hidden="true">
          <span className="flex size-10 items-center justify-center border border-gold font-serif text-sm font-bold text-gold [transform:rotate(45deg)] shadow-sm">
            <span className="[transform:rotate(-45deg)]">01</span>
          </span>
          <span className="font-serif text-xs text-primary-foreground/40">02</span>
          <span className="font-serif text-xs text-primary-foreground/40">03</span>
        </div>

        {/* Book Cover */}
        <div className="relative w-56 shrink-0 sm:w-64 md:w-72">
          <div className="relative overflow-hidden rounded-md border-2 border-gold/60 shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02]">
            <img
              src={spotlightBook.coverImage || 'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg'}
              alt={spotlightBook.title}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-light">
              <Sparkles className="size-3" />
              {spotlightBook.status}
            </span>
          </div>
        </div>

        {/* Book Details */}
        <div className="flex max-w-xl flex-col items-center lg:items-start">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
              Available Now
            </span>
            <span className="inline-block size-1 rotate-45 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 sm:text-xs">
              The Trail Book is now available for purchase
            </span>
          </div>

          <h2 id="spotlight-title" className="mt-3 font-serif text-3xl font-medium text-white text-balance sm:text-4xl md:text-5xl">
            {spotlightBook.title}
          </h2>

          <p className="mt-3 flex items-center gap-2 font-serif text-base italic text-gold-light sm:text-lg">
            <span>Book 1 in</span>
            <Link href="/series" className="underline underline-offset-4 transition-colors hover:text-gold">
              The Trail Series
            </Link>
          </p>

          <p className="mt-5 text-base leading-relaxed text-stone-300 text-pretty sm:text-lg">
            {spotlightBook.shortDescription}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
            <a
              href={spotlightBook.amazonUrl || 'https://www.amazon.com/dp/B0DM9VMN88'}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-lg transition-all duration-300 hover:bg-gold-light hover:shadow-xl active:scale-95"
            >
              <ShoppingBag className="size-4" />
              <span>Buy on Amazon</span>
              <ExternalLink className="size-3.5 opacity-70 group-hover:opacity-100" />
            </a>

            <Link
              href={`/books/${spotlightBook.slug}`}
              className="group inline-flex items-center gap-2 border border-gold/50 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light transition-all hover:bg-gold/10 hover:text-white"
            >
              <span>Learn More</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
