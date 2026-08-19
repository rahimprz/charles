'use client'

import { useAuthorData } from '@/lib/author-context'

export function QuoteSection() {
  const { data } = useAuthorData()
  const quote = data.author.quote || "The frontier doesn't forgive the weak, but it always remembers the brave."

  return (
    <section className="px-5 py-12 sm:px-6 sm:py-16 md:px-12" aria-label="Author quote">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gold/40 bg-parchment/60 p-8 sm:p-10 shadow-sm">
        <figure className="flex flex-col items-center gap-5 text-center md:flex-row md:items-center md:gap-10 md:text-left">
          <span
            className="font-serif text-6xl leading-none text-gold sm:text-8xl shrink-0"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="flex-1 font-serif text-xl italic leading-relaxed text-ink sm:text-2xl md:text-[1.65rem]">
            {quote}
          </blockquote>
          <figcaption className="shrink-0 border-t border-gold/40 pt-3 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <span className="font-script text-2xl text-ink sm:text-3xl md:text-4xl block">
              C. David Tebbs
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold block mt-1">
              Author
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
