'use client'

import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { useAuthorData } from '@/lib/author-context'
import { Award, BookOpen, ChevronRight, Heart, Mail, Medal, Shield, Sparkles, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const { data } = useAuthorData()
  const { author } = data

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
              <span className="text-ink font-semibold">About Author</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Biography & Legacy
              </span>
              <span className="inline-block size-1 rotate-45 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                Frontier Storyteller
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl lg:text-6xl">
              About Charles David Tebbs
            </h1>
            <p className="mt-2 font-serif text-lg italic text-gold-light">
              Known simply as &quot;{author.penName}&quot; — Veteran, Industry Leader & Author
            </p>
          </div>
        </section>

        {/* Main Bio Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left Column: Portrait & Highlights Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative overflow-hidden rounded-xl border-2 border-gold/50 bg-card p-3 shadow-2xl">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-stone-900">
                    <img
                      src={author.portraitImage || 'https://i.ibb.co/G48X1zLC/single-person-portra-084ef648f4.webp'}
                      alt="Charles David Tebbs Portrait"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-4 text-center py-2 border-t border-border">
                    <h2 className="font-serif text-xl font-bold text-ink">
                      {author.name}
                    </h2>
                    <p className="text-xs font-serif italic text-gold">
                      &quot;{author.penName}&quot; • {author.roleTitle}
                    </p>
                  </div>
                </div>

                {/* Military Service & Career Highlights Card */}
                <div className="rounded-xl border border-border bg-parchment p-6 space-y-5 shadow-sm">
                  <h3 className="font-serif text-base font-bold uppercase tracking-wider text-ink border-b border-border/80 pb-2 flex items-center gap-2">
                    <Medal className="size-4 text-gold" />
                    <span>Honorable Milestones</span>
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <p className="font-bold uppercase tracking-wider text-gold">
                        Military Service
                      </p>
                      <p className="mt-1 text-foreground/90 font-medium">
                        U.S. Army • Specialist 5
                      </p>
                      <p className="text-muted-foreground">
                        Korean Conflict Veteran — Honorable Discharge
                      </p>
                    </div>

                    <div className="border-t border-border/60 pt-3">
                      <p className="font-bold uppercase tracking-wider text-gold">
                        Education & Roots
                      </p>
                      <p className="mt-1 text-foreground/90 font-medium">
                        Plainfield High School, New Jersey
                      </p>
                    </div>

                    <div className="border-t border-border/60 pt-3">
                      <p className="font-bold uppercase tracking-wider text-gold">
                        Professional Career
                      </p>
                      <p className="mt-1 text-foreground/90 font-medium">
                        Over 50 Years in the Lighting Industry
                      </p>
                      <p className="text-muted-foreground">
                        Career spanning New Jersey, Pennsylvania, and Texas
                      </p>
                    </div>

                    <div className="border-t border-border/60 pt-3">
                      <p className="font-bold uppercase tracking-wider text-gold">
                        Family & Retirement
                      </p>
                      <p className="mt-1 text-foreground/90 font-medium">
                        Wife Lynda • Daughter Bonnie • Son Robert
                      </p>
                      <p className="text-muted-foreground">
                        Retired to the New Jersey Shore
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Button */}
                <div className="rounded-xl border border-gold/40 bg-ink p-6 text-center text-primary-foreground">
                  <h4 className="font-serif text-lg font-medium text-white">
                    Have feedback or a question?
                  </h4>
                  <p className="mt-2 text-xs text-stone-300">
                    David values reviews and feedback from every reader.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-gold py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-gold-light hover:shadow-lg active:scale-95"
                  >
                    <Mail className="size-4" />
                    <span>Get in Touch</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Full Narrative Biography */}
              <div className="lg:col-span-7 space-y-8">
                {/* Intro Quote */}
                <div className="rounded-xl border-l-4 border-gold bg-parchment p-6 italic font-serif text-lg text-ink leading-relaxed">
                  &ldquo;{author.quote || "The frontier doesn't forgive the weak, but it always remembers the brave."}&rdquo;
                  <span className="block mt-2 font-script text-xl not-italic text-gold text-right">
                    — C. David Tebbs
                  </span>
                </div>

                {/* Paragraphs */}
                <div className="space-y-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {author.fullBioParagraphs && author.fullBioParagraphs.length > 0 ? (
                    author.fullBioParagraphs.map((para, idx) => (
                      <p key={idx} className="text-pretty">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p>{author.shortBio}</p>
                  )}
                </div>

                {/* The Trail Unfolded Series Feature */}
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-5 text-gold" />
                    <h3 className="font-serif text-xl font-medium text-ink sm:text-2xl">
                      The Inspiration Behind <em>The Trail Unfolded</em>
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                    Drawing from deep historical research, family legacy, and a profound respect for early pioneers, Charles David Tebbs brings 19th-century America to life. Whether tracking 18-year-old James Jack through Wyoming’s rugged territories or sailing aboard the daring <em>Black Shadow</em> to liberate the oppressed, his novels explore themes of justice, honor, and raw courage.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4">
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-gold hover:text-ink transition-colors"
                    >
                      <span>Explore Books</span>
                      <ChevronRight className="size-3.5" />
                    </Link>
                    <Link
                      href="/series"
                      className="inline-flex items-center gap-2 border border-ink/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink hover:border-gold hover:text-gold transition-colors"
                    >
                      <span>Learn About Series</span>
                    </Link>
                  </div>
                </div>

                {/* Family & Community Dedication */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/80 bg-parchment/60 p-5">
                    <Heart className="size-5 text-rose-700" />
                    <h4 className="mt-2 font-serif text-base font-bold text-ink">
                      Family Support
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      David attributes much of his writing inspiration to his beloved wife Lynda, his daughter Bonnie, and his son Robert, who remain his greatest champions.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border/80 bg-parchment/60 p-5">
                    <Sparkles className="size-5 text-gold" />
                    <h4 className="mt-2 font-serif text-base font-bold text-ink">
                      Looking Forward
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      With <em>The Trail Rendezvous</em> on the horizon, David continues to write daily from his home on the New Jersey Shore, eager to hear readers&apos; reviews and reactions.
                    </p>
                  </div>
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
