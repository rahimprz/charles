import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { ChevronRight, Download, ExternalLink, FileText, Mail, Newspaper } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Press & Media | Charles David Tebbs',
  description:
    'Press release: The Trail puts an inheritance quest to the test on the Wyoming frontier. Media contact and downloadable press materials for Charles David Tebbs.',
}

const PDF_URL = '/press/the-trail-press-release.pdf'
const MEDIA_EMAIL = 'media@brightkeypr.com'
const AMAZON_URL = 'https://www.amazon.com/dp/B0DM9VMN88'

export default function PressPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb & Hero Header */}
        <section className="border-b border-border/60 bg-parchment/60 py-10 sm:py-14">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-ink font-semibold">Press</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Press & Media
              </span>
              <span className="inline-block size-1 rotate-45 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                News Releases
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl lg:text-6xl">
              Press Room
            </h1>
            <p className="mt-2 font-serif text-lg italic text-gold-light">
              Official announcements, press materials & media contact
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Press Release */}
              <article className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] sm:text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-parchment px-3 py-1 text-gold">
                    <Newspaper className="size-3.5" />
                    For Immediate Release
                  </span>
                  <time dateTime="2026-10-15" className="text-muted-foreground">
                    October 15, 2026
                  </time>
                </div>

                <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl md:text-4xl text-balance">
                  <em>The Trail</em> Puts an Inheritance Quest to the Test on the Wyoming Frontier
                </h2>
                <p className="font-serif text-lg italic text-foreground/80 border-l-4 border-gold pl-4">
                  Charles David Tebbs&rsquo; historical fiction novel brings a young war veteran and three companions together through danger, loyalty and a westward journey.
                </p>

                <div className="space-y-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  <p className="text-pretty">
                    <strong className="font-semibold text-ink">NEW YORK, NY, October 15, 2026</strong> — An inheritance awaits 18-year-old James Jack in the Wyoming Territory, but reaching it demands more than a claim to a family legacy. In <em>The Trail</em>, Charles David Tebbs follows a young man whose background combines a pirate father with experience in the Mexican-American War. His westward undertaking places a personal ambition against the hazards of the American frontier, where survival depends on the people traveling beside him.
                  </p>
                  <p className="text-pretty">
                    James begins the journey with Mo, a formidable warrior whose mysterious past adds another dimension to their partnership. Their path crosses those of Rose and Mabel, two women whose strength and resilience become invaluable to the group. Rather than leaving James to confront the trail alone, the story brings together four travelers whose courage and resourcefulness are tested by the country they must cross.
                  </p>
                  <p className="text-pretty">
                    Outlaws, hostile Native American tribes and the forces of nature threaten their progress. The dangers make the journey more than a straightforward passage toward an inheritance: tragedy and triumph accompany the travelers as they press westward. Shared experience gradually binds them into a family, giving their effort to stake a claim in the West a collective significance beyond the goal that first set James in motion.
                  </p>
                  <p className="text-pretty">
                    Partnership is a central interest Tebbs identifies for the book, and the novel gives that subject a concrete frontier context. Loyalty matters alongside individual courage, while Rose and Mabel&rsquo;s contributions make resilience a shared resource rather than the preserve of a single hero. For readers interested in relationships forged under pressure, the group&rsquo;s growing bond offers a point of engagement distinct from the question of whether James will reach his destination.
                  </p>
                  <p className="text-pretty">
                    <em>The Trail</em> also brings together several specific elements for readers of historical adventure: a territorial setting, a protagonist with wartime experience, a pirate&rsquo;s legacy and a companion with an unexplained past. James&rsquo; age stands in contrast to the experiences he already carries. That combination places youth and an eventful personal history at the center of the novel, while the frontier supplies threats from both human adversaries and the natural world.
                  </p>
                  <p className="text-pretty">
                    Tebbs&rsquo; interest in researching early nineteenth-century America helped provide a direction for his fiction project. He describes an approach that brings American history together with invention, and his plans extend to a three-book sequence. Within <em>The Trail</em>, the historical setting supports a story concerned with both claiming an inheritance and forming a family through shared experience. Its focus on interdependence gives the westward adventure a relationship-centered dimension alongside its physical dangers.
                  </p>
                  <p className="text-pretty">
                    Charles David Tebbs is retired and turned to writing while seeking projects to pursue. His interests include early American history and further fictional adventures in that setting.
                  </p>
                  <p className="text-center text-muted-foreground tracking-[0.5em]">###</p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={PDF_URL}
                    download
                    className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-gold hover:text-ink transition-colors"
                  >
                    <Download className="size-3.5" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-ink/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink hover:border-gold hover:text-gold transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Open in New Tab</span>
                  </a>
                </div>

                {/* Embedded original PDF */}
                <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
                  <div className="flex items-center gap-2 px-2 pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <FileText className="size-4 text-gold" />
                    <span>Original Press Release (PDF)</span>
                  </div>
                  <object
                    data={PDF_URL}
                    type="application/pdf"
                    className="h-[70vh] min-h-[480px] w-full rounded-lg border border-border/60 bg-white"
                    aria-label="The Trail press release PDF"
                  >
                    <p className="p-6 text-sm text-muted-foreground">
                      Your browser can&rsquo;t display PDFs inline.{' '}
                      <a href={PDF_URL} className="text-gold underline underline-offset-4">
                        Download the press release
                      </a>{' '}
                      instead.
                    </p>
                  </object>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                <div className="rounded-xl border border-gold/40 bg-ink p-6 text-primary-foreground">
                  <h3 className="font-serif text-lg font-medium text-white">Media Inquiries</h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300">
                    For interviews, review copies, or media inquiries, please contact:
                  </p>
                  <p className="mt-4 font-serif text-base text-white">Charles David Tebbs</p>
                  <a
                    href={`mailto:${MEDIA_EMAIL}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-gold py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-gold-light hover:shadow-lg active:scale-95"
                  >
                    <Mail className="size-4" />
                    <span>{MEDIA_EMAIL}</span>
                  </a>
                </div>

                <div className="rounded-xl border border-border bg-parchment p-6 space-y-4 shadow-sm">
                  <h3 className="font-serif text-base font-bold uppercase tracking-wider text-ink border-b border-border/80 pb-2">
                    About the Book
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    <em>The Trail</em> — the first book in The Trail Series. Available now.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={AMAZON_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-gold hover:text-ink transition-colors"
                    >
                      <span>Get Your Copy on Amazon</span>
                    </a>
                    <Link
                      href="/books/the-trail-book-1"
                      className="inline-flex items-center justify-center gap-2 border border-ink/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink hover:border-gold hover:text-gold transition-colors"
                    >
                      <span>Book Details</span>
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  )
}
