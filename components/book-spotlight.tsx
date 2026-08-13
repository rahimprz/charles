import { ArrowRight, Compass, ShoppingCart } from 'lucide-react'

export function BookSpotlight() {
  return (
    <section
      className="relative mx-4 overflow-hidden bg-ink text-primary-foreground sm:mx-6 md:mx-12"
      aria-labelledby="spotlight-title"
    >
      <Compass
        className="pointer-events-none absolute -right-10 top-1/2 hidden size-72 -translate-y-1/2 text-gold/15 lg:block"
        strokeWidth={0.75}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-5 py-12 text-center sm:px-6 sm:py-14 lg:flex-row lg:gap-14 lg:text-left md:px-12">
        <div className="hidden flex-col items-center gap-6 lg:flex" aria-hidden="true">
          <span className="flex size-11 items-center justify-center border border-gold/70 font-serif text-sm text-gold [transform:rotate(45deg)]">
            <span className="[transform:rotate(-45deg)]">01</span>
          </span>
          <span className="font-serif text-sm text-primary-foreground/40">02</span>
          <span className="font-serif text-sm text-primary-foreground/40">03</span>
        </div>

        <img
          src="/images/book-trail.png"
          alt="The Trail book cover featuring two cowboys on horseback"
          className="w-48 shrink-0 shadow-2xl transition-transform duration-500 hover:-translate-y-1.5 hover:scale-[1.02] sm:w-56 md:w-64"
        />

        <div className="flex max-w-xl flex-col items-center lg:items-start">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs">
            Book 1
          </p>
          <h2 id="spotlight-title" className="mt-3 font-serif text-3xl font-medium text-balance sm:text-4xl md:text-5xl">
            The Trail Book #1
          </h2>

          <p className="mt-5 flex items-center gap-3 font-serif text-base italic text-primary-foreground/85 sm:text-lg">
            <span className="hidden h-px w-6 bg-gold sm:inline-block" aria-hidden="true" />
            <span>
              {'Book 1 in '}
              <a href="#books" className="underline underline-offset-4 transition-colors hover:text-gold">
                The Trail Unfolded Book #2
              </a>
            </span>
          </p>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-primary-foreground/80 text-pretty sm:text-lg">
            In Charles David Tebbs&apos; captivating novel, The Trail, 18-year-old
            James Jack embarks on a life-altering journey to claim his inheritance
            in the rugged Wyoming Territory.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 lg:justify-start">
            <a
              href="#"
              className="group inline-flex items-center gap-3 border border-gold/70 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:bg-gold hover:text-ink active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-xs"
            >
              Buy Now
              <ShoppingCart className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#books"
              className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-gold sm:text-xs"
            >
              Learn More
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
