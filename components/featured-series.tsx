import { ArrowRight, BookOpen, Compass, Map } from 'lucide-react'

export function FeaturedSeries() {
  return (
    <section className="relative mx-4 overflow-hidden bg-parchment sm:mx-6 md:mx-12" aria-labelledby="featured-series-title">
      <img
        src="/images/mountain-sketch.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 object-cover object-left opacity-70 mix-blend-multiply [mask-image:linear-gradient(to_left,black_60%,transparent)] lg:block"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-5 py-12 text-center sm:px-6 sm:py-14 lg:flex-row lg:gap-14 lg:text-left md:px-12">
        <div className="hidden flex-col items-center gap-6 self-stretch lg:flex" aria-hidden="true">
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink [writing-mode:vertical-lr]">
            Series
          </span>
          <span className="w-px flex-1 bg-gold/50" />
          <Compass className="size-5 text-gold" />
        </div>

        <img
          src="/images/boxset.png"
          alt="The Trail Unfolded three-book box set"
          className="w-52 shrink-0 mix-blend-multiply transition-transform duration-500 hover:scale-[1.03] sm:w-64 md:w-72"
        />

        <div className="flex max-w-xl flex-col items-center lg:items-start">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs">
            Featured Series
          </p>
          <h2 id="featured-series-title" className="mt-3 font-serif text-3xl font-medium text-ink text-balance sm:text-4xl md:text-5xl">
            The Trail Unfolded
          </h2>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80 sm:text-xs">
              <BookOpen className="size-4 text-gold" aria-hidden="true" />3 Books
            </span>
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80 sm:text-xs">
              <Map className="size-4 text-gold" aria-hidden="true" />
              Western Adventure
            </span>
          </div>

          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/85 text-pretty sm:text-lg">
            A coming-of-age western saga of courage, identity, and heritage set
            against the unforgiving American frontier.
          </p>

          <a
            href="#books"
            className="group mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink sm:text-xs"
          >
            <span className="border-b border-gold pb-1 transition-colors group-hover:text-gold">
              View Series
            </span>
            <ArrowRight className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
