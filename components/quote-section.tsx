export function QuoteSection() {
  return (
    <section className="px-5 py-12 sm:px-6 sm:py-14 md:px-12" aria-label="Author quote">
      <figure className="mx-auto flex max-w-4xl flex-col items-center gap-5 sm:gap-8 md:flex-row md:items-center md:gap-12">
        <span
          className="font-serif text-6xl leading-none text-gold sm:text-8xl"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote className="flex-1 text-center font-serif text-xl italic leading-relaxed text-ink text-balance sm:text-2xl md:text-left md:text-[1.7rem]">
          The frontier doesn&apos;t forgive the weak,
          <br className="hidden md:block" /> but it always remembers the brave.
        </blockquote>
        <figcaption className="font-script text-2xl text-ink sm:text-3xl md:text-4xl">
          C. David Tebbs
        </figcaption>
      </figure>
    </section>
  )
}
