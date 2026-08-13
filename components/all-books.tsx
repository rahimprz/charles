import { ArrowRight, BriefcaseBusiness } from 'lucide-react'

const books = [
  {
    number: 'Book 1',
    title: 'The Trail Book #1',
    seriesNote: 'Book 1 in',
    cover: '/images/book-trail.png',
    alt: 'The Trail book cover',
  },
  {
    number: 'Book 2',
    title: 'The Trail Book #2',
    seriesNote: 'Book 2 in',
    cover: '/images/book-journey.png',
    alt: 'The Journey book cover',
  },
  {
    number: 'Book 3',
    title: 'The Trail Book #3',
    seriesNote: 'Book 3 in',
    cover: '/images/book-legacy.png',
    alt: 'The Legacy book cover',
  },
]

export function AllBooks() {
  return (
    <section id="books" className="px-4 pb-14 sm:px-6 sm:pb-16 md:px-12" aria-labelledby="all-books-title">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="all-books-title" className="flex items-center gap-4 font-serif text-xl font-medium uppercase tracking-[0.15em] text-ink sm:text-2xl">
          All Books
          <span className="hidden items-center gap-1 md:flex" aria-hidden="true">
            <span className="inline-block h-px w-10 bg-gold/60" />
            <span className="inline-block size-1.5 rotate-45 border border-gold" />
            <span className="inline-block h-px w-10 bg-gold/60" />
          </span>
        </h2>
        <a
          href="#"
          className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-ink sm:text-xs"
        >
          View All Books
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <article
            key={book.number}
            className="group/card relative flex gap-4 border border-border bg-parchment p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg sm:gap-5 sm:p-5"
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-md bg-card text-ink shadow-sm transition-all hover:bg-gold hover:text-primary-foreground active:scale-90 sm:right-4 sm:top-4"
              aria-label={`Add ${book.title} to cart`}
            >
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
            </button>

            <div className="w-28 shrink-0 self-start overflow-hidden shadow-lg sm:w-32">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.alt}
                className="w-full transition-transform duration-500 group-hover/card:scale-[1.05]"
              />
            </div>

            <div className="flex flex-col pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                {book.number}
              </p>
              <h3 className="mt-2 font-serif text-xl font-medium leading-tight text-ink text-balance sm:text-2xl">
                {book.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                {book.seriesNote}
                <br />
                <a href="#books" className="underline underline-offset-2 transition-colors hover:text-gold">
                  The Trail Unfolded
                  <br />
                  {'Book #2'}
                </a>
              </p>
              <a
                href="#"
                className="group/link mt-auto inline-flex items-center gap-2 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold"
              >
                Learn More
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
