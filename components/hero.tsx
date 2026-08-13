import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="relative z-10 flex-1 px-5 pb-10 pt-6 sm:px-6 sm:pt-8 md:px-12 lg:pb-24">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs">
            Stories of Courage. Legacy. Frontier.
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.05] text-ink text-balance sm:mt-6 sm:text-6xl md:text-7xl lg:text-8xl">
            Charles
            <br />
            David Tebbs
          </h1>

          <div className="mt-6 flex items-center gap-2 sm:mt-8" aria-hidden="true">
            <span className="inline-block size-2 rotate-45 border border-gold" />
            <span className="inline-block h-px w-20 bg-gold/60 sm:w-24" />
          </div>

          <p className="mt-6 max-w-xs text-base leading-relaxed text-foreground/85 text-pretty sm:mt-8 sm:text-lg">
            Step into the untamed frontier where legacy is earned, not given.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10 sm:gap-8">
            <a
              href="#books"
              className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:bg-gold hover:text-ink active:scale-[0.98] sm:px-8 sm:py-4 sm:text-xs"
            >
              Explore Books
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold sm:text-xs"
            >
              About the Author
            </a>
          </div>
        </div>

        <div className="relative order-first min-h-[260px] flex-1 self-stretch sm:min-h-[320px] lg:order-none lg:min-h-[560px]">
          <img
            src="/images/hero-cowboy.png"
            alt="Painting of a lone cowboy on horseback overlooking a golden mountain valley at sunset"
            className="absolute inset-0 h-full w-full object-cover [mask-image:linear-gradient(to_top,transparent_0%,black_30%)] lg:[mask-image:radial-gradient(120%_120%_at_75%_40%,black_55%,transparent_78%)]"
          />
        </div>
      </div>
    </section>
  )
}
