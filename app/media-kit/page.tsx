'use client'

import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { useAuthorData } from '@/lib/author-context'
import {
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  Globe,
  Mail,
  Mic,
  Newspaper,
  Quote,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react'
import Link from 'next/link'

const MEDIA_KIT_PDF = '/media-kit/Charles-David-Tebbs-Author-Media-Kit.pdf'
const MEDIA_EMAIL = 'media@brightkeypr.com'
// Paste the AP News article link here to show a "Read on AP News" button
const AP_NEWS_URL = ''

const interviewTopics = [
  {
    title: 'The History Behind the Fiction',
    description:
      "Exploring Tebbs' research into early nineteenth-century America and how historical authenticity shapes the world of The Trail.",
  },
  {
    title: 'Inheritance, Legacy & Identity',
    description:
      "How a young man's quest for a family inheritance becomes a deeper journey of self-discovery on the Wyoming frontier.",
  },
  {
    title: 'James Jack: Youth Meets Experience',
    description:
      "Character development of an 18-year-old war veteran whose pirate father's legacy and wartime past stand in striking contrast to his age.",
  },
  {
    title: 'Building a Family Through Hardship',
    description:
      'How four unlikely companions—James, Mo, Rose, and Mabel—become a family through shared danger, loyalty, and resilience on the trail.',
  },
  {
    title: "Women's Strength on the Frontier",
    description:
      "How Rose and Mabel's courage and resourcefulness reframe resilience as a shared resource rather than the preserve of a single hero.",
  },
  {
    title: 'The Future of American Historical Fiction',
    description:
      "Tebbs' vision for a three-book sequence and his approach to weaving American history with compelling human invention.",
  },
]

export default function MediaKitPage() {
  const { data } = useAuthorData()
  const { author, books } = data
  const trail = books.find((b) => b.seriesOrder === 1) || books[0]
  const amazonUrl = trail?.amazonUrl || 'https://www.amazon.com/dp/B0DM9VMN88'

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb & Hero Header */}
        <section className="relative overflow-hidden border-b border-border/60 bg-parchment/60 py-10 sm:py-14">
          <Newspaper
            className="pointer-events-none absolute -right-10 -bottom-10 size-56 text-gold/10 lg:size-72"
            strokeWidth={0.75}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-ink font-semibold">Media Kit</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Press & Media
              </span>
              <span className="inline-block size-1 rotate-45 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                Covered on AP News
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl lg:text-6xl">
              Author Media Kit
            </h1>
            <p className="mt-2 font-serif text-lg italic text-gold-light">
              {author.name || 'Charles David Tebbs'} — Author of <em>The Trail</em>
            </p>

            <p className="mt-6 max-w-3xl border-l-2 border-gold pl-5 font-serif text-base italic leading-relaxed text-foreground/85 sm:text-lg">
              Charles David Tebbs is a historical fiction author whose debut novel brings the Wyoming frontier to life
              through a gripping tale of inheritance, loyalty, and the bonds forged under danger.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MEDIA_KIT_PDF}
                download
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-gold hover:text-ink active:scale-95"
              >
                <Download className="size-4" />
                <span>Download Media Kit (PDF)</span>
              </a>
              <a
                href={`mailto:${MEDIA_EMAIL}`}
                className="inline-flex items-center gap-2 border border-ink/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-gold hover:text-gold"
              >
                <Mic className="size-4" />
                <span>Book an Interview</span>
              </a>
            </div>
          </div>
        </section>

        {/* About & The Book */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="relative mx-auto max-w-sm overflow-hidden rounded-xl border-2 border-gold/50 bg-card p-3 shadow-2xl">
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-stone-900">
                    <img
                      src={trail?.coverImage}
                      alt="The Trail by Charles David Tebbs — book cover"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 border-t border-border py-2 text-center">
                    <p className="font-serif text-lg font-bold text-ink">The Trail</p>
                    <p className="text-xs font-serif italic text-gold">Book 1 of a planned three-book series</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                    Author Biography
                  </span>
                  <h2 className="mt-2 font-serif text-2xl font-medium text-ink sm:text-3xl md:text-4xl">
                    About Charles David Tebbs
                  </h2>
                </div>

                <div className="space-y-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  <p className="text-pretty">
                    Charles David Tebbs is a retired author who turned to writing while seeking new projects to pursue.
                    His passion for early American history and frontier storytelling found a natural home in historical
                    fiction, culminating in his debut novel{' '}<em>The Trail</em>—a sweeping adventure set in the Wyoming
                    Territory.
                  </p>
                  <p className="text-pretty">
                    Drawing inspiration from meticulous research into early nineteenth-century America, Tebbs crafts a
                    story that blends authentic historical detail with vivid invention. His approach brings American
                    history together with compelling human drama, centering on loyalty, resilience, and what it means to
                    forge a family through shared hardship.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 border-gold bg-parchment p-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-5 text-gold" />
                    <h3 className="font-serif text-lg font-medium text-ink sm:text-xl">Behind the Book</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
                    <em>The Trail</em>{' '}marks the beginning of a planned three-book sequence, continuing Charles David
                    Tebbs&apos; fictional adventures in early American frontier settings. An inheritance awaits—if James
                    Jack can survive the Wyoming frontier to claim it.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-gold-light hover:shadow-lg active:scale-95"
                    >
                      <ShoppingBag className="size-3.5" />
                      <span>Order on Amazon</span>
                    </a>
                    {trail && (
                      <Link
                        href={`/books/${trail.slug}`}
                        className="inline-flex items-center gap-2 border border-ink/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-gold hover:text-gold"
                      >
                        <span>Book Details</span>
                        <ChevronRight className="size-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Coverage & Impact */}
        <section className="border-y border-border/60 bg-ink py-12 text-primary-foreground sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Impact & Recognition
              </span>
              <h2 className="mt-2 font-serif text-2xl font-medium text-white sm:text-3xl md:text-4xl">
                Media Coverage
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-gold/30 bg-stone-900/60 p-6 text-center">
                <p className="font-serif text-5xl font-medium text-gold">AP</p>
                <h3 className="mt-3 font-serif text-lg text-white">National News Coverage</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  National press release: &ldquo;<em>The Trail</em>{' '}Puts an Inheritance Quest to the Test on the Wyoming
                  Frontier&rdquo;
                </p>
                {AP_NEWS_URL && (
                  <a
                    href={AP_NEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-gold underline underline-offset-4 transition-colors hover:text-gold-light"
                  >
                    <span>Read on AP News</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>

              <div className="rounded-lg border border-gold/30 bg-stone-900/60 p-6 text-center">
                <Globe className="mx-auto size-12 text-gold" strokeWidth={1.25} />
                <h3 className="mt-3 font-serif text-lg text-white">Wide Media Distribution</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  Featured across major news networks and media outlets, introducing readers to a gripping new voice in
                  American historical frontier fiction.
                </p>
              </div>

              <div className="rounded-lg border border-gold/30 bg-stone-900/60 p-6 text-center">
                <p className="font-serif text-5xl font-medium text-gold">3</p>
                <h3 className="mt-3 font-serif text-lg text-white">Book Series Planned</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  Tebbs&apos; vision extends to a three-book sequence continuing fictional adventures in early American
                  frontier settings.
                </p>
              </div>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-stone-400 sm:text-xs">
              <ShieldCheck className="size-3.5 text-gold" />
              <span>Verified by BrightKey PR • Published October 2026</span>
            </p>
          </div>
        </section>

        {/* Interview Topics */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Let&apos;s Talk About...
              </span>
              <h2 className="mt-2 font-serif text-2xl font-medium text-ink sm:text-3xl md:text-4xl">
                Interview Topics & Talking Points
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {interviewTopics.map((topic, idx) => (
                <div
                  key={topic.title}
                  className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:border-gold/60 hover:shadow-lg"
                >
                  <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-lg bg-gold/70 transition-colors group-hover:bg-gold" />
                  <span className="font-mono text-xs font-semibold text-gold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-medium text-ink">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              Available for podcasts, radio, TV, print interviews, and event appearances. Charles is an engaging speaker
              who connects with audiences interested in American frontier history, historical fiction, and the stories
              of courage that shaped the West.
            </p>
          </div>
        </section>

        {/* Reader Praise */}
        <section className="border-y border-border/60 bg-parchment/60 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 md:px-12">
            <Quote className="mx-auto size-8 text-gold" />
            <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
              What Readers Are Saying
            </span>
            <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-ink sm:text-xl md:text-2xl">
              &ldquo;A gripping frontier adventure that weaves together loyalty, legacy, and the raw dangers of the
              American West. Tebbs brings a rare authenticity to the Wyoming Territory, crafting four unforgettable
              companions whose bond becomes the heart of the story—a bold debut that leaves readers eager for what comes
              next.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* Booking & Download */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="rounded-xl border border-gold/40 bg-ink p-6 text-primary-foreground sm:p-8 lg:col-span-7">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                  Booking & Media Requests
                </span>
                <h2 className="mt-2 font-serif text-2xl font-medium text-white sm:text-3xl">
                  {author.name || 'Charles David Tebbs'}
                </h2>
                <p className="mt-1 font-serif italic text-gold-light">Author & American Frontier Storyteller</p>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  Schedule a 15-minute intro call to discuss coverage, guest features, or speaking opportunities.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-gold" />
                    <a href={`mailto:${MEDIA_EMAIL}`} className="break-all text-white underline-offset-4 hover:text-gold hover:underline">
                      {MEDIA_EMAIL}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="size-4 shrink-0 text-gold" />
                    <span className="text-stone-300">charlesdavidtebbs.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="size-4 shrink-0 text-gold" />
                    <span className="text-stone-300">Verified by BrightKey PR</span>
                  </li>
                </ul>
                <a
                  href={`mailto:${MEDIA_EMAIL}?subject=${encodeURIComponent('Media Request — Charles David Tebbs')}`}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-gold py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-gold-light hover:shadow-lg active:scale-95 sm:w-auto sm:px-8"
                >
                  <Mic className="size-4" />
                  <span>Request an Interview</span>
                </a>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border bg-parchment p-6 sm:p-8 lg:col-span-5">
                <div>
                  <Download className="size-6 text-gold" />
                  <h3 className="mt-3 font-serif text-xl font-medium text-ink sm:text-2xl">Full Media Kit</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Everything on this page in a six-page, print-ready PDF—bio, coverage, talking points, and booking
                    details. Free for press and event use.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <a
                    href={MEDIA_KIT_PDF}
                    download
                    className="inline-flex flex-1 items-center justify-center gap-2 bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-gold hover:text-ink"
                  >
                    <Download className="size-4" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href={MEDIA_KIT_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 border border-ink/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-gold hover:text-gold"
                  >
                    <ExternalLink className="size-4" />
                    <span>View Online</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  )
}
