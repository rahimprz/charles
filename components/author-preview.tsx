'use client'

import { ArrowRight, Award, Heart, Medal, Shield } from 'lucide-react'
import Link from 'next/link'
import { useAuthorData } from '@/lib/author-context'

export function AuthorPreview() {
  const { data } = useAuthorData()
  const { author } = data

  return (
    <section id="about" className="relative mx-4 my-10 overflow-hidden rounded-xl border border-border bg-card p-6 sm:mx-6 sm:p-10 md:mx-12 lg:my-16 lg:p-14 shadow-sm" aria-labelledby="author-preview-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Portrait Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-3 rounded-2xl bg-gold/20 blur-lg -z-10" />
              <div className="overflow-hidden rounded-xl border-2 border-gold/50 bg-parchment p-2 shadow-2xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-stone-900">
                  <img
                    src={author.portraitImage || 'https://i.ibb.co/G48X1zLC/single-person-portra-084ef648f4.webp'}
                    alt="Charles David Tebbs Portrait"
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center py-1">
                  <p className="font-serif text-base font-bold text-ink">
                    {author.name}
                  </p>
                  <p className="text-xs font-serif italic text-gold">
                    Known simply as &quot;{author.penName}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Story Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                About the Author
              </span>
              <span className="inline-block size-1 rotate-45 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                Story Behind the Stories
              </span>
            </div>

            <h2 id="author-preview-title" className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">
              Charles David Tebbs
            </h2>

            <p className="mt-4 text-base leading-relaxed text-foreground/85 sm:text-lg text-pretty">
              {author.shortBio}
            </p>

            {/* Credential Pills */}
            <div className="mt-6 grid w-full gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border/80 bg-parchment/60 p-3.5 flex items-center gap-3">
                <Medal className="size-5 text-gold shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink">
                    U.S. Army Veteran
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Korean Conflict • Spec 5
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-parchment/60 p-3.5 flex items-center gap-3">
                <Award className="size-5 text-gold shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink">
                    50+ Year Career
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Lighting Industry
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-parchment/60 p-3.5 flex items-center gap-3">
                <Heart className="size-5 text-gold shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink">
                    Family & Life
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Lynda, Bonnie & Robert
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow transition-all hover:bg-gold hover:text-ink active:scale-95"
              >
                <span>Read Full Biography</span>
                <ArrowRight className="size-4 text-gold group-hover:text-ink transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-ink/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold"
              >
                <span>Send David a Message</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
